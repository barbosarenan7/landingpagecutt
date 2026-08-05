import { mkdirSync, readFileSync, writeFileSync, rmSync } from "node:fs";
import { dirname, join } from "node:path";
import { fileURLToPath } from "node:url";
import { rotas, BASE, type MetaRota } from "../src/lib/rotas";

/**
 * Pré-renderização (SSG).
 *
 * Roda depois do `vite build`. Para cada rota:
 *   1. renderiza a árvore React em Node e injeta o HTML no #root;
 *   2. reescreve title, description, canonical e Open Graph no <head>;
 *   3. acrescenta o JSON-LD específico daquela rota.
 *
 * O passo 2 é essencial: o `<Seo>` roda por useEffect, que não existe
 * fora do navegador. Sem ele, todas as rotas serviriam o title da home
 * para quem não executa JavaScript.
 *
 * Também gera o sitemap a partir da mesma lista de rotas, para não
 * depender de alguém lembrar de editar o XML.
 *
 * Nada aqui altera componente, texto ou estilo: o HTML sai da mesma
 * árvore que o navegador já renderiza hoje.
 */

const DIST = "dist";
// fileURLToPath e não url.pathname: o caminho do projeto tem espaços e o
// pathname os devolveria como %20, quebrando o import
const raiz = fileURLToPath(new URL("..", import.meta.url));

/** Escapa o que vai dentro de um atributo HTML. */
function attr(v: string) {
  return v.replace(/&/g, "&amp;").replace(/"/g, "&quot;").replace(/</g, "&lt;");
}
/** Escapa o que vai dentro de um nó de texto. */
function texto(v: string) {
  return v.replace(/&/g, "&amp;").replace(/</g, "&lt;").replace(/>/g, "&gt;");
}

/** Troca (ou insere) uma <meta> por name/property. */
function trocaMeta(html: string, tipo: "name" | "property", chave: string, valor: string) {
  const tag = `<meta ${tipo}="${chave}" content="${attr(valor)}" />`;
  const re = new RegExp(`<meta\\s+${tipo}="${chave}"[\\s\\S]*?/?>`, "i");
  return re.test(html) ? html.replace(re, tag) : html.replace("</head>", `    ${tag}\n  </head>`);
}

function aplicaMeta(html: string, rota: MetaRota) {
  const url = `${BASE}${rota.path === "/" ? "/" : rota.path}`;

  html = html.replace(/<title>[\s\S]*?<\/title>/i, `<title>${texto(rota.title)}</title>`);
  html = trocaMeta(html, "name", "description", rota.description);
  html = trocaMeta(html, "property", "og:title", rota.title);
  html = trocaMeta(html, "property", "og:description", rota.description);
  html = trocaMeta(html, "property", "og:url", url);

  const canonical = `<link rel="canonical" href="${attr(url)}" />`;
  html = /<link\s+rel="canonical"[\s\S]*?\/?>/i.test(html)
    ? html.replace(/<link\s+rel="canonical"[\s\S]*?\/?>/i, canonical)
    : html.replace("</head>", `    ${canonical}\n  </head>`);

  if (rota.jsonLd) {
    const bloco = `<script type="application/ld+json">${JSON.stringify(rota.jsonLd)}</script>`;
    html = html.replace("</head>", `    ${bloco}\n  </head>`);
  }
  return html;
}

function sitemap(lista: MetaRota[]) {
  const hoje = new Date().toISOString().slice(0, 10);
  const urls = lista
    .filter((r) => !r.semIndex)
    .map((r) => {
      const prioridade = r.path === "/" ? "1.0" : r.path === "/privacidade" ? "0.2" : "0.9";
      const freq = r.path === "/" ? "weekly" : r.path === "/privacidade" ? "yearly" : "monthly";
      return [
        "  <url>",
        `    <loc>${BASE}${r.path}</loc>`,
        `    <lastmod>${hoje}</lastmod>`,
        `    <changefreq>${freq}</changefreq>`,
        `    <priority>${prioridade}</priority>`,
        "  </url>",
      ].join("\n");
    })
    .join("\n");
  return `<?xml version="1.0" encoding="UTF-8"?>\n<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">\n${urls}\n</urlset>\n`;
}

const { render } = (await import(join(raiz, "dist-ssr/entry-server.js"))) as {
  render: (url: string) => string;
};

let molde = readFileSync(join(raiz, DIST, "index.html"), "utf8");
if (!molde.includes('<div id="root"></div>')) {
  throw new Error("Molde inesperado: não achei <div id=\"root\"></div> em dist/index.html");
}

/**
 * Duas otimizações de caminho crítico, medidas no PageSpeed (celular,
 * 4G lento):
 *
 * 1. O CSS entra inline no <head>. Sendo requisição separada, ele
 *    bloqueava a renderização por ~900 ms: o navegador só pintava depois
 *    de baixá-lo. Inline, a página pinta com o próprio HTML. O custo é o
 *    HTML crescer ~55 KB antes do gzip, que comprime junto.
 *
 * 2. As três fontes que a primeira dobra usa ganham preload. Sem isso o
 *    navegador só as descobre depois de processar o CSS, formando a
 *    cadeia html → css → fonte que aparecia como 586 ms de latência.
 */
const reCssLink = /<link[^>]+rel="stylesheet"[^>]+href="(\/assets\/[^"]+\.css)"[^>]*>/i;
const cssMatch = molde.match(reCssLink);
if (cssMatch) {
  const css = readFileSync(join(raiz, DIST, cssMatch[1].replace(/^\//, "")), "utf8");
  molde = molde.replace(reCssLink, `<style>${css}</style>`);
}

const preloadFontes = [
  "/fonts/satoshi-500.woff2",
  "/fonts/satoshi-700.woff2",
]
  .map(
    (f) =>
      `<link rel="preload" href="${f}" as="font" type="font/woff2" crossorigin />`,
  )
  .join("\n    ");
// a serif do Instrument fica no bundle com hash; acha pelo CSS já inline
const serif = molde.match(/\/assets\/instrument-serif-latin-400-normal[^")]+\.woff2/);
const preloadSerif = serif
  ? `<link rel="preload" href="${serif[0]}" as="font" type="font/woff2" crossorigin />\n    `
  : "";
molde = molde.replace(
  "</head>",
  `    ${preloadSerif}${preloadFontes}\n  </head>`,
);

for (const rota of rotas) {
  const corpo = render(rota.path);
  let html = molde.replace('<div id="root"></div>', `<div id="root">${corpo}</div>`);
  html = aplicaMeta(html, rota);

  const destino =
    rota.path === "/"
      ? join(raiz, DIST, "index.html")
      : join(raiz, DIST, rota.path.replace(/^\//, ""), "index.html");
  mkdirSync(dirname(destino), { recursive: true });
  writeFileSync(destino, html);

  const kb = Math.round(html.length / 1024);
  console.log(`  ${rota.path.padEnd(40)} ${String(kb).padStart(4)} KB`);
}

writeFileSync(join(raiz, DIST, "sitemap.xml"), sitemap(rotas));
console.log(`  sitemap.xml gerado com ${rotas.filter((r) => !r.semIndex).length} URLs`);

rmSync(join(raiz, "dist-ssr"), { recursive: true, force: true });
console.log(`\n${rotas.length} páginas pré-renderizadas.`);
