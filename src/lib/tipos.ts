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
  /** aviso interno de revisão: berrante de propósito, não pode ir ao ar */
  | { tipo: "pendencia"; texto: string }
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
  /** frase curta para os cartões de "outros serviços" (ver `servicos-menu.ts`) */
  resumo?: string;
  /**
   * Publicidade médica e odontológica é regulada pelos conselhos de
   * classe. Enquanto `true`, a rota fica fora do sitemap (ver
   * `rotas.ts`). Nenhuma tarja aparece para o visitante: o aviso é
   * interno e vive no arquivo da peça, em `seo-cut/02-conteudo/bofu/`.
   */
  revisaoRegulatoria?: boolean;
  provaSocial: { titulo: string; itens: string[] };
  dor: { titulo: string; paragrafos: string[] };
  entrega: { titulo: string; itens: { titulo: string; texto: string }[] };
  /** As 6 etapas são cópia literal do Método Cut da home: não reescrever. */
  metodo: { titulo: string; etapas: { fase: string; nome: string; texto: string }[] };
  /** opcional: peça sem case real não mostra a seção, em vez de mostrar aviso */
  caseReal?: { titulo: string; paragrafos: string[] };
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
