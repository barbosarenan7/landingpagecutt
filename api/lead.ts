// Função serverless (Vercel) — recebe o lead do formulário e notifica o
// WhatsApp pessoal via API do Botconversa. A chave (BOTCONVERSA_API_KEY)
// vive só aqui, no servidor, nunca no bundle do cliente.
//
// Env vars necessárias (Vercel → Settings → Environment Variables):
//   BOTCONVERSA_API_KEY    — chave "Integração via Webhook" do Botconversa
//   BOTCONVERSA_NOTIFY_PHONE — número que RECEBE a notificação (E.164, só
//                              dígitos, com DDI 55). Ex.: 5524999999999
//
// A notificação é best-effort: se o Botconversa falhar ou não estiver
// configurado, a função ainda responde ok — o lead não se perde porque o
// próprio visitante abre o WhatsApp do comercial já com os dados.

const BC_BASE = "https://backend.botconversa.com.br/api/v1/webhook";

type Lead = {
  nome?: string;
  whatsapp?: string;
  empresa?: string;
  cargo?: string;
  segmento?: string;
  investimento?: string;
  desafio?: string;
  website?: string; // honeypot anti-spam
};

function soDigitos(v: string): string {
  return (v || "").replace(/\D/g, "");
}

function montarMensagem(l: Lead): string {
  return [
    "🔔 Novo diagnóstico solicitado — site Cut Creative",
    "",
    `👤 Nome: ${l.nome || "-"}`,
    `📱 WhatsApp: ${l.whatsapp || "-"}`,
    `🏢 Empresa: ${l.empresa || "-"}`,
    `💼 Cargo: ${l.cargo || "-"}`,
    `🎯 Segmento: ${l.segmento || "-"}`,
    `💰 Investimento/mês: ${l.investimento || "-"}`,
    `📝 Desafio: ${l.desafio || "-"}`,
    "",
    "Entre em contato pelo WhatsApp acima.",
  ].join("\n");
}

async function bcFetch(
  path: string,
  init: RequestInit,
  apiKey: string,
): Promise<Response> {
  const url = `${BC_BASE}/${path.replace(/^\/|\/$/g, "")}/`;
  return fetch(url, {
    ...init,
    headers: {
      "api-key": apiKey,
      accept: "application/json",
      "content-type": "application/json",
      ...(init.headers || {}),
    },
  });
}

async function getSubscriberId(
  phone: string,
  apiKey: string,
): Promise<number | null> {
  const res = await bcFetch(`subscriber/${phone}`, { method: "GET" }, apiKey);
  if (!res.ok) return null;
  const data = (await res.json().catch(() => null)) as { id?: number } | null;
  return data && typeof data.id === "number" ? data.id : null;
}

async function createSubscriber(
  phone: string,
  apiKey: string,
): Promise<number | null> {
  const res = await bcFetch(
    "subscriber",
    {
      method: "POST",
      body: JSON.stringify({
        phone,
        first_name: "Cut",
        last_name: "Leads (site)",
      }),
    },
    apiKey,
  );
  if (!res.ok) return null;
  const data = (await res.json().catch(() => null)) as { id?: number } | null;
  return data && typeof data.id === "number" ? data.id : null;
}

function json(body: unknown, status = 200): Response {
  return new Response(JSON.stringify(body), {
    status,
    headers: { "content-type": "application/json" },
  });
}

export async function POST(request: Request): Promise<Response> {
  let lead: Lead;
  try {
    lead = (await request.json()) as Lead;
  } catch {
    return json({ ok: false, error: "json inválido" }, 400);
  }

  // honeypot: se o campo escondido veio preenchido, é bot — finge sucesso
  if (lead.website) return json({ ok: true, notified: false });

  const apiKey = process.env.BOTCONVERSA_API_KEY;
  const notifyPhone = soDigitos(process.env.BOTCONVERSA_NOTIFY_PHONE || "");

  // sem configuração → não quebra nada; o WhatsApp do cliente é o canal garantido
  if (!apiKey || !notifyPhone) {
    return json({ ok: true, notified: false, reason: "botconversa-off" });
  }

  try {
    let id = await getSubscriberId(notifyPhone, apiKey);
    if (id == null) id = await createSubscriber(notifyPhone, apiKey);
    if (id == null) throw new Error("subscriber não resolvido");

    const res = await bcFetch(
      `subscriber/${id}/send_message`,
      { method: "POST", body: JSON.stringify({ type: "text", value: montarMensagem(lead) }) },
      apiKey,
    );
    if (!res.ok) throw new Error(`send_message ${res.status}`);

    return json({ ok: true, notified: true });
  } catch (err) {
    // best-effort: loga no servidor (Vercel logs) mas não bloqueia o lead
    console.error("[lead] falha ao notificar via Botconversa:", err);
    return json({ ok: true, notified: false });
  }
}
