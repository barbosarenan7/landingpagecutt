import site from "../content/site.json";
import servicos from "../content/servicos.json";

/**
 * Fonte única dos metadados de cada rota.
 *
 * Existe porque o `<Seo>` injeta title/description/canonical/JSON-LD por
 * `useEffect`, que só roda no navegador. Sem um lugar neutro para esses
 * dados, o HTML servido sairia com o title da home em todas as rotas e o
 * pré-renderizador não teria de onde tirar o certo.
 *
 * Consumido por: `src/lib/seo.tsx` (cliente) e `scripts/prerender.ts`
 * (build). Alterar aqui muda os dois de uma vez — nada de duplicar.
 *
 * Só metadados: nenhum texto visível da página passa por este arquivo.
 */

export const BASE = "https://cutcreativee.com.br";

export type MetaRota = {
  /** caminho absoluto, com barra inicial */
  path: string;
  title: string;
  description: string;
  jsonLd?: Record<string, unknown> | Record<string, unknown>[];
  /** fora do sitemap (páginas utilitárias) */
  semIndex?: boolean;
};

const endereco = {
  "@type": "PostalAddress",
  streetAddress: "Rua Norival de Freitas, 52, sala 101",
  addressLocality: "Volta Redonda",
  addressRegion: "RJ",
  postalCode: "27215-100",
  addressCountry: "BR",
};

const areaAtendida = [
  { "@type": "City", name: "Volta Redonda" },
  { "@type": "City", name: "Barra Mansa" },
  { "@type": "City", name: "Resende" },
  { "@type": "City", name: "Angra dos Reis" },
];

/** FAQPage da home, a partir das perguntas de site.json. */
const faqHome = {
  "@context": "https://schema.org",
  "@type": "FAQPage",
  mainEntity: site.faq.itens.map((i) => ({
    "@type": "Question",
    name: i.pergunta,
    acceptedAnswer: { "@type": "Answer", text: i.resposta },
  })),
};

/** Service + FAQPage + BreadcrumbList de uma página de serviço. */
export function jsonLdServico(slug: string) {
  const s = servicos.servicos.find((x) => x.slug === slug);
  if (!s) return [];
  const url = `${BASE}/${s.slug}`;
  return [
    {
      "@context": "https://schema.org",
      "@type": "Service",
      name: s.nome,
      serviceType: s.nome,
      description: s.metaDescricao,
      url,
      provider: {
        "@type": "ProfessionalService",
        name: "Cut Creative",
        telephone: "+55" + site.contato.whatsapp,
        address: endereco,
      },
      areaServed: areaAtendida,
    },
    {
      "@context": "https://schema.org",
      "@type": "FAQPage",
      mainEntity: s.faq.map((f) => ({
        "@type": "Question",
        name: f.pergunta,
        acceptedAnswer: { "@type": "Answer", text: f.resposta },
      })),
    },
    {
      "@context": "https://schema.org",
      "@type": "BreadcrumbList",
      itemListElement: [
        { "@type": "ListItem", position: 1, name: "Início", item: `${BASE}/` },
        { "@type": "ListItem", position: 2, name: s.nome, item: url },
      ],
    },
  ];
}

export const rotaHome: MetaRota = {
  path: "/",
  title: "Cut Creative — Agência de marketing em Volta Redonda, RJ",
  description:
    "Agência de marketing estratégico em Volta Redonda: estratégia, social media, tráfego pago e produção audiovisual própria. Solicite um diagnóstico gratuito.",
  jsonLd: faqHome,
};

export const rotaPrivacidade: MetaRota = {
  path: "/privacidade",
  title: "Política de privacidade | Cut Creative",
  description:
    "Como a Cut Creative trata os dados pessoais coletados neste site, em conformidade com a LGPD.",
};

export const rotasServico: MetaRota[] = servicos.servicos.map((s) => ({
  path: `/${s.slug}`,
  title: s.metaTitulo,
  description: s.metaDescricao,
  jsonLd: jsonLdServico(s.slug),
}));

/** Tudo que deve ser pré-renderizado e entrar no sitemap. */
export const rotas: MetaRota[] = [rotaHome, ...rotasServico, rotaPrivacidade];
