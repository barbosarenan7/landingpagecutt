import { useRef, useState, type FormEvent } from "react";
import { Link } from "react-router-dom";
import { Arrow } from "./primitives";
import { site, track } from "../config/site";
import content from "../content/site.json";

const f = content.diagnostico.form;

/**
 * Formulário escuro (painel direito do split, ref sign-up): inputs em
 * caixa `.field-box`, labels 11px e botão branco.
 * Destino: webhook do Make (→ Kommo + notificação WhatsApp do comercial).
 * Sem webhook configurado, valida e mostra o sucesso inline (demonstração).
 * Sucesso substitui o formulário inline, sem alert() — evento `lead` dispara aqui.
 * Textos e opções vêm de src/content/site.json → diagnostico.form.
 */
const segmentos = f.segmentos;
const investimentos = f.investimentos;

function maskPhone(v: string) {
  const d = v.replace(/\D/g, "").slice(0, 11);
  if (d.length <= 2) return d;
  if (d.length <= 7) return `(${d.slice(0, 2)}) ${d.slice(2)}`;
  return `(${d.slice(0, 2)}) ${d.slice(2, 7)}-${d.slice(7)}`;
}

type Errors = Partial<Record<string, string>>;

const errCls = "mt-1.5 text-[13px] text-accent";

export default function LeadForm() {
  const [sending, setSending] = useState(false);
  const [errors, setErrors] = useState<Errors>({});
  const [failed, setFailed] = useState(false);
  const [success, setSuccess] = useState(false);
  // anti-spam: instante em que o form montou (bots enviam em <3s)
  const montadoEm = useRef(Date.now());

  function validate(data: FormData): Errors {
    const e: Errors = {};
    if (!String(data.get("nome") || "").trim()) e.nome = "Informe seu nome.";
    const phone = String(data.get("whatsapp") || "").replace(/\D/g, "");
    if (phone.length < 10)
      e.whatsapp = "Informe um WhatsApp válido com DDD — é por ele que retornamos.";
    if (!String(data.get("empresa") || "").trim()) e.empresa = "Informe o nome da empresa.";
    if (!String(data.get("cargo") || "").trim()) e.cargo = "Informe seu cargo na empresa.";
    if (!data.get("segmento")) e.segmento = "Selecione o segmento.";
    if (!String(data.get("desafio") || "").trim())
      e.desafio = "Conte em uma frase o principal desafio.";
    if (!data.get("investimento")) e.investimento = "Selecione uma faixa.";
    if (!data.get("aceite")) e.aceite = "Para retornarmos o contato, é preciso autorizar.";
    return e;
  }

  async function onSubmit(ev: FormEvent<HTMLFormElement>) {
    ev.preventDefault();
    const form = ev.currentTarget;
    const data = new FormData(form);
    const errs = validate(data);
    setErrors(errs);
    if (Object.keys(errs).length > 0) {
      const order = [
        "nome",
        "whatsapp",
        "empresa",
        "cargo",
        "segmento",
        "investimento",
        "desafio",
        "aceite",
      ];
      const firstKey = order.find((k) => errs[k]);
      if (firstKey) form.querySelector<HTMLElement>(`[name='${firstKey}']`)?.focus();
      return;
    }

    // anti-spam silencioso: honeypot preenchido ou envio rápido demais
    // (<3s) mostram o sucesso sem disparar o webhook — humano não cai aqui
    if (String(data.get("website") || "").length > 0 || Date.now() - montadoEm.current < 3000) {
      setSuccess(true);
      return;
    }

    setSending(true);
    setFailed(false);
    const payload = Object.fromEntries(data.entries());
    delete (payload as Record<string, unknown>).website;

    try {
      if (site.leadWebhookUrl) {
        const res = await fetch(site.leadWebhookUrl, {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ ...payload, origem: "site", ts: Date.now() }),
        });
        if (!res.ok) throw new Error(`webhook ${res.status}`);
      }
      track("lead_form_submit", { segmento: payload.segmento });
      track("lead"); // GA4 + Meta Pixel Lead via GTM — sucesso é inline
      setSuccess(true);
    } catch {
      setFailed(true);
      setSending(false);
    }
  }

  return (
    <div className="form-dark text-paper-50" aria-live="polite">
      {success ? (
        <div className="flex h-full flex-col items-start justify-center py-6">
          <p className="eyebrow">Diagnóstico solicitado</p>
          <h3 className="mt-5 text-2xl leading-snug font-bold">{f.sucessoTitulo}</h3>
          <p className="mt-4 leading-relaxed text-text2-dark">{f.sucessoTexto}</p>
          <a
            href={site.instagram}
            target="_blank"
            rel="noopener noreferrer"
            className="btn-white mt-8"
          >
            {f.sucessoCta}
            <Arrow />
          </a>
        </div>
      ) : (
        <>
          <h3 className="text-[22px] leading-snug font-bold text-balance">
            {f.titulo}
          </h3>
          <p className="mt-2 text-sm text-text2-dark">{f.subtitulo}</p>

          <form onSubmit={onSubmit} noValidate className="mt-8 flex flex-col gap-5">
            {/* honeypot: invisível para humanos, irresistível para bots */}
            <div className="hidden" aria-hidden="true">
              <label htmlFor="f-website">Não preencha este campo</label>
              <input
                id="f-website"
                name="website"
                type="text"
                tabIndex={-1}
                autoComplete="off"
              />
            </div>
            <div>
              <label htmlFor="f-nome" className="field-label">
                Seu nome
              </label>
              <input
                id="f-nome"
                name="nome"
                type="text"
                autoComplete="name"
                className="field-box"
                aria-invalid={!!errors.nome}
                aria-describedby={errors.nome ? "e-nome" : undefined}
              />
              {errors.nome && (
                <p id="e-nome" role="alert" className={errCls}>
                  {errors.nome}
                </p>
              )}
            </div>

            <div>
              <label htmlFor="f-whatsapp" className="field-label">
                WhatsApp
              </label>
              <input
                id="f-whatsapp"
                name="whatsapp"
                type="tel"
                inputMode="tel"
                autoComplete="tel-national"
                placeholder="(XX) XXXXX-XXXX"
                className="field-box"
                onChange={(e) => {
                  e.target.value = maskPhone(e.target.value);
                }}
                aria-invalid={!!errors.whatsapp}
                aria-describedby={errors.whatsapp ? "e-whatsapp" : undefined}
              />
              {errors.whatsapp && (
                <p id="e-whatsapp" role="alert" className={errCls}>
                  {errors.whatsapp}
                </p>
              )}
            </div>

            <div>
              <label htmlFor="f-empresa" className="field-label">
                Nome da sua empresa
              </label>
              <input
                id="f-empresa"
                name="empresa"
                type="text"
                autoComplete="organization"
                className="field-box"
                aria-invalid={!!errors.empresa}
                aria-describedby={errors.empresa ? "e-empresa" : undefined}
              />
              {errors.empresa && (
                <p id="e-empresa" role="alert" className={errCls}>
                  {errors.empresa}
                </p>
              )}
            </div>

            <div>
              <label htmlFor="f-cargo" className="field-label">
                Seu cargo na empresa
              </label>
              <input
                id="f-cargo"
                name="cargo"
                type="text"
                autoComplete="organization-title"
                className="field-box"
                aria-invalid={!!errors.cargo}
                aria-describedby={errors.cargo ? "e-cargo" : undefined}
              />
              {errors.cargo && (
                <p id="e-cargo" role="alert" className={errCls}>
                  {errors.cargo}
                </p>
              )}
            </div>

            <div className="grid gap-5 sm:grid-cols-2">
              <div>
                <label htmlFor="f-segmento" className="field-label">
                  Segmento
                </label>
                <select
                  id="f-segmento"
                  name="segmento"
                  defaultValue=""
                  className="field-box"
                  aria-invalid={!!errors.segmento}
                  aria-describedby={errors.segmento ? "e-segmento" : undefined}
                >
                  <option value="" disabled>
                    Selecione…
                  </option>
                  {segmentos.map((o) => (
                    <option key={o} value={o}>
                      {o}
                    </option>
                  ))}
                </select>
                {errors.segmento && (
                  <p id="e-segmento" role="alert" className={errCls}>
                    {errors.segmento}
                  </p>
                )}
              </div>

              <div>
                <label htmlFor="f-investimento" className="field-label">
                  Investimento mensal em marketing
                </label>
                <select
                  id="f-investimento"
                  name="investimento"
                  defaultValue=""
                  className="field-box"
                  aria-invalid={!!errors.investimento}
                  aria-describedby={errors.investimento ? "e-investimento" : undefined}
                >
                  <option value="" disabled>
                    Selecione…
                  </option>
                  {investimentos.map((o) => (
                    <option key={o} value={o}>
                      {o}
                    </option>
                  ))}
                </select>
                {errors.investimento && (
                  <p id="e-investimento" role="alert" className={errCls}>
                    {errors.investimento}
                  </p>
                )}
              </div>
            </div>

            <div>
              <label htmlFor="f-desafio" className="field-label">
                Principal desafio hoje
              </label>
              <textarea
                id="f-desafio"
                name="desafio"
                rows={3}
                className="field-box resize-none"
                aria-invalid={!!errors.desafio}
                aria-describedby={errors.desafio ? "e-desafio" : undefined}
              />
              {errors.desafio && (
                <p id="e-desafio" role="alert" className={errCls}>
                  {errors.desafio}
                </p>
              )}
            </div>

            <div>
              <label className="flex cursor-pointer items-start gap-3 text-sm text-text2-dark">
                <input
                  type="checkbox"
                  name="aceite"
                  className="field-check mt-0.5"
                  aria-invalid={!!errors.aceite}
                  aria-describedby={errors.aceite ? "e-aceite" : undefined}
                />
                <span>Aceito receber contato da Cut Creative</span>
              </label>
              {errors.aceite && (
                <p id="e-aceite" role="alert" className={errCls}>
                  {errors.aceite}
                </p>
              )}
            </div>

            {failed && (
              <p
                role="alert"
                className="rounded-input border border-accent/50 bg-ink-800 px-4 py-3 text-sm text-paper-50"
              >
                Não conseguimos enviar agora. Tente novamente — ou fale direto
                com a gente pelo WhatsApp no canto da tela.
              </p>
            )}

            <button
              type="submit"
              disabled={sending}
              className="btn-white w-full disabled:cursor-default disabled:opacity-50"
            >
              {sending ? "Enviando…" : f.cta}
            </button>
            <p className="text-xs text-text2-dark">
              Seus dados seguem a{" "}
              <Link to="/privacidade" className="underline underline-offset-4">
                política de privacidade
              </Link>
              .
            </p>
          </form>
        </>
      )}
    </div>
  );
}
