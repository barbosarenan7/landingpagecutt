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
  linkedin: c.linkedin,
  behance: c.behance,

  legalName: c.razaoSocial,
  cnpj: c.cnpj,
  address: c.endereco,

  // Métricas de impacto — só entram no ar quando auditadas (v1.1).
  showMetrics: false,

  // Sem depoimento de exemplo: placeholder em depoimento soa falso.
  // O componente já estava fora da home; a trava fica aqui para não voltar.
  showTestimonialPlaceholders: false,
} as const;

/** Link do WhatsApp comercial. Sem argumento usa a mensagem padrão; o
 *  formulário passa uma mensagem com os dados do lead já preenchidos. */
export const whatsappHref = (message: string = site.whatsappMessage) =>
  `https://wa.me/${site.whatsappNumber}?text=${encodeURIComponent(message)}`;

/** Push seguro no dataLayer (GTM). No-op se o GTM ainda não estiver instalado. */
export function track(event: string, data: Record<string, unknown> = {}) {
  const w = window as unknown as { dataLayer?: Record<string, unknown>[] };
  w.dataLayer?.push({ event, ...data });
}
