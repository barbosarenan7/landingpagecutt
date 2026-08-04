import site from "../content/site.json";
import servicos from "../content/servicos.json";
import blogJson from "../content/blog.json";
import landingsJson from "../content/landings.json";
import type { ConteudoBlog, ConteudoLandings } from "./tipos";

const blog = blogJson as ConteudoBlog;
const landings = landingsJson as ConteudoLandings;

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

/* ------------------------------------------------------------------
   Blog
   ------------------------------------------------------------------ */

export const rotaBlog: MetaRota = {
  path: "/blog",
  title: blog.indice.metaTitulo,
  description: blog.indice.metaDescricao,
  jsonLd: {
    "@context": "https://schema.org",
    "@type": "Blog",
    name: "Blog da Cut Creative",
    url: `${BASE}/blog`,
    publisher: { "@type": "Organization", name: "Cut Creative", url: `${BASE}/` },
  },
};

/** BlogPosting + BreadcrumbList + FAQPage de um artigo. */
export function metaDoPost(slug: string): MetaRota {
  const p = blog.posts.find((x) => x.slug === slug);
  const path = `/blog/${slug}`;
  if (!p) return { path, title: blog.indice.metaTitulo, description: blog.indice.metaDescricao };
  const url = `${BASE}${path}`;

  const jsonLd: Record<string, unknown>[] = [
    {
      "@context": "https://schema.org",
      "@type": "BlogPosting",
      headline: p.titulo,
      description: p.metaDescricao,
      url,
      mainEntityOfPage: url,
      datePublished: p.data,
      dateModified: p.atualizado || p.data,
      inLanguage: "pt-BR",
      author: { "@type": "Organization", name: "Cut Creative", url: `${BASE}/` },
      publisher: {
        "@type": "Organization",
        name: "Cut Creative",
        url: `${BASE}/`,
        logo: { "@type": "ImageObject", url: `${BASE}/icon-512.png` },
      },
    },
    {
      "@context": "https://schema.org",
      "@type": "BreadcrumbList",
      itemListElement: [
        { "@type": "ListItem", position: 1, name: "Início", item: `${BASE}/` },
        { "@type": "ListItem", position: 2, name: "Blog", item: `${BASE}/blog` },
        { "@type": "ListItem", position: 3, name: p.titulo, item: url },
      ],
    },
  ];

  if (p.faq.length > 0) {
    jsonLd.push({
      "@context": "https://schema.org",
      "@type": "FAQPage",
      mainEntity: p.faq.map((f) => ({
        "@type": "Question",
        name: f.pergunta,
        acceptedAnswer: { "@type": "Answer", text: f.resposta },
      })),
    });
  }

  return { path, title: p.metaTitulo, description: p.metaDescricao, jsonLd };
}

export const rotasPost: MetaRota[] = blog.posts.map((p) => metaDoPost(p.slug));

/* ------------------------------------------------------------------
   Landings BOFU (cidade, segmento, serviço)
   ------------------------------------------------------------------ */

/** LocalBusiness + Service + FAQPage + BreadcrumbList de uma landing. */
export function metaDaLanding(slug: string): MetaRota {
  const l = landings.landings.find((x) => x.slug === slug);
  const path = `/${slug}`;
  if (!l) return { path, title: rotaHome.title, description: rotaHome.description };
  const url = `${BASE}${path}`;

  const jsonLd: Record<string, unknown>[] = [
    {
      "@context": "https://schema.org",
      "@type": ["ProfessionalService", "LocalBusiness"],
      name: "Cut Creative",
      description: l.metaDescricao,
      url,
      telephone: "+55" + site.contato.whatsapp,
      address: endereco,
      areaServed: areaAtendida,
    },
    {
      "@context": "https://schema.org",
      "@type": "Service",
      name: l.titulo,
      serviceType: l.keywordPrincipal,
      description: l.metaDescricao,
      url,
      provider: { "@type": "ProfessionalService", name: "Cut Creative", url: `${BASE}/` },
      areaServed: areaAtendida,
    },
    {
      "@context": "https://schema.org",
      "@type": "BreadcrumbList",
      itemListElement: [
        { "@type": "ListItem", position: 1, name: "Início", item: `${BASE}/` },
        { "@type": "ListItem", position: 2, name: l.titulo, item: url },
      ],
    },
  ];

  if (l.faq.length > 0) {
    jsonLd.push({
      "@context": "https://schema.org",
      "@type": "FAQPage",
      mainEntity: l.faq.map((f) => ({
        "@type": "Question",
        name: f.pergunta,
        acceptedAnswer: { "@type": "Answer", text: f.resposta },
      })),
    });
  }

  return { path, title: l.metaTitulo, description: l.metaDescricao, jsonLd };
}

export const rotasLanding: MetaRota[] = landings.landings.map((l) => metaDaLanding(l.slug));

/**
 * Tudo que deve ser pré-renderizado e entrar no sitemap.
 *
 * Post e landing novos entram sozinhos: basta acrescentar o item em
 * blog.json ou landings.json. Nada a mexer aqui, no App.tsx nem no
 * sitemap.
 */
export const rotas: MetaRota[] = [
  rotaHome,
  ...rotasServico,
  ...rotasLanding,
  rotaBlog,
  ...rotasPost,
  rotaPrivacidade,
];
