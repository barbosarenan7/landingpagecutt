/**
 * Tipos do conteúdo editorial (artigos e landings BOFU).
 *
 * Vivem aqui, e não dentro das páginas, porque `src/lib/rotas.ts` também
 * precisa deles para montar os metadados: se ficassem na página, o
 * import criaria ciclo (página → rotas → página).
 *
 * Também servem para tipar os JSON de conteúdo enquanto estão vazios:
 * sem a anotação, o TypeScript infere `never[]` e tudo quebra.
 */

export type Bloco =
  | { tipo: "h2"; texto: string }
  | { tipo: "h3"; texto: string }
  | { tipo: "p"; texto: string }
  | { tipo: "lista"; itens: string[]; ordenada?: boolean }
  | { tipo: "tabela"; colunas: string[]; linhas: string[][] }
  | { tipo: "destaque"; texto: string }
  | { tipo: "advertorial"; utm: string };

export type Pergunta = { pergunta: string; resposta: string };

/** Artigo do blog (MOFU e TOFU). */
export type Post = {
  slug: string;
  titulo: string;
  metaTitulo: string;
  metaDescricao: string;
  resumo: string;
  /** aaaa-mm-dd */
  data: string;
  atualizado?: string;
  intencao: string;
  keywordPrincipal: string;
  keywordsSecundarias: string[];
  blocos: Bloco[];
  faq: Pergunta[];
};

/** Landing BOFU de cidade, segmento ou serviço. */
export type Landing = {
  slug: string;
  tipo: string;
  titulo: string;
  metaTitulo: string;
  metaDescricao: string;
  keywordPrincipal: string;
  keywordsSecundarias: string[];
  h1: string;
  subheadline: string;
  provaSocial: { titulo: string; itens: string[] };
  dor: { titulo: string; paragrafos: string[] };
  entrega: { titulo: string; itens: { titulo: string; texto: string }[] };
  metodo: { titulo: string; etapas: { nome: string; texto: string }[] };
  caseReal: { titulo: string; texto: string };
  porqueLocal: { titulo: string; blocos: Bloco[] };
  faq: Pergunta[];
  ctaFinal: { titulo: string; texto: string };
};

export type ConteudoBlog = {
  indice: {
    eyebrow: string;
    tituloLinha1: string;
    tituloLinha2: string;
    descricao: string;
    metaTitulo: string;
    metaDescricao: string;
  };
  posts: Post[];
};

export type ConteudoLandings = { landings: Landing[] };
