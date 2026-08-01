/**
 * Configuração central do site.
 * Tudo que está pendente de confirmação do briefing vive aqui —
 * marcado com [CONFIRMAR]. Trocar o valor aqui atualiza o site inteiro.
 */
import content from "../content/site.json";

/**
 * Os valores editáveis (WhatsApp, e-mail, CNPJ, endereço, região…) vivem
 * em src/content/site.json → seção "contato", para poderem ser alterados
 * pelo editor de conteúdo. Aqui só mapeamos e mantemos os helpers.
 */
const c = content.contato;

export const site = {
  name: "Cut Creative",
  tagline: "Onde a criatividade se une à estratégia.",
  city: "Volta Redonda, RJ",
  region: c.regiao,

  // WhatsApp comercial (formato E.164, só dígitos)
  whatsappNumber: c.whatsapp,
  whatsappMessage: c.whatsappMensagem,

  email: c.email,
  instagram: c.instagram,
  portalUrl: c.portalUrl,

  legalName: c.razaoSocial,
  cnpj: c.cnpj,
  address: c.endereco,

  // Webhook do Make (form → Kommo + notificação WhatsApp do comercial).
  // Vazio = modo demonstração: o form valida e mostra o sucesso inline sem enviar.
  leadWebhookUrl: c.leadWebhookUrl,

  // Métricas de impacto — só entram no ar quando auditadas (v1.1).
  showMetrics: false,

  // Depoimentos do CUT NPS — trocar por respostas reais autorizadas.
  showTestimonialPlaceholders: true,
} as const;

export const whatsappHref = () =>
  `https://wa.me/${site.whatsappNumber}?text=${encodeURIComponent(site.whatsappMessage)}`;

/** Push seguro no dataLayer (GTM). No-op se o GTM ainda não estiver instalado. */
export function track(event: string, data: Record<string, unknown> = {}) {
  const w = window as unknown as { dataLayer?: Record<string, unknown>[] };
  w.dataLayer?.push({ event, ...data });
}
