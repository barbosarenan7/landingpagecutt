/**
 * Camada de eventos enviada ao dataLayer do GTM (GTM-MQVRD3LX).
 *
 * Todo o rastreamento da página vive aqui. Os componentes não sabem o
 * que é um evento: eles só expõem os ganchos de marcação (data-section,
 * data-cta, data-faq, id="formulario") e, nos poucos casos em que o
 * estado só existe dentro do React (erro de validação, sucesso do envio,
 * card do carrossel), chamam uma função nomeada deste módulo.
 *
 * PRIVACIDADE (LGPD)
 * Nenhum valor digitado em campo de texto livre sai daqui. Dos oito
 * campos do formulário, só `segmento` e `investimento` têm o valor
 * enviado, e ambos são selects de opção fixa. O evento de cópia manda
 * apenas o TIPO do conteúdo copiado, nunca o conteúdo. O seletor do
 * rage click é montado a partir de tag e atributos de marcação, jamais
 * de texto da página.
 *
 * Nada aqui pode quebrar a página: todo push e todo handler passam por
 * try/catch silencioso. Nenhum efeito visual é adicionado, então não há
 * o que condicionar a prefers-reduced-motion.
 */

type Dado = Record<string, unknown>;

/**
 * A página renderiza blocos duplicados. O corte que separa as duas
 * árvores mais pesadas (carrossel × bento da prova social, colunas do
 * hero) é o `lg` do Tailwind, 1024px. É ele que define page_variant.
 * O bloco da dor troca em `md` (768px), então entre 768 e 1023px o
 * page_variant é 'mobile' mas a dor já aparece na versão de desktop.
 */
const CORTE_DESKTOP = 1024;

const ORDEM_CAMPOS = [
  "nome",
  "whatsapp",
  "empresa",
  "cargo",
  "segmento",
  "investimento",
  "desafio",
  "aceite",
] as const;

type Campo = (typeof ORDEM_CAMPOS)[number];

/** Só estes dois são select de opção fixa, então só eles podem ir com valor. */
const CAMPOS_COM_VALOR: readonly string[] = ["segmento", "investimento"];

const indiceDoCampo = (nome: string) => ORDEM_CAMPOS.indexOf(nome as Campo) + 1;

const agora = () => Date.now();

function variante(): "desktop" | "mobile" {
  return window.innerWidth >= CORTE_DESKTOP ? "desktop" : "mobile";
}

/** Push no dataLayer. Silencioso: nunca lança para quem chamou. */
function push(evento: string, dados: Dado = {}) {
  try {
    const w = window as unknown as { dataLayer?: Dado[] };
    w.dataLayer = w.dataLayer || [];
    w.dataLayer.push({ event: evento, page_variant: variante(), ...dados });
  } catch {
    /* rastreamento nunca derruba a página */
  }
}

/** Envolve um handler para que uma exceção nele não vaze para o evento. */
function seguro<T extends unknown[]>(fn: (...args: T) => void) {
  return (...args: T) => {
    try {
      fn(...args);
    } catch {
      /* silencioso */
    }
  };
}

/* ==========================================================
   Estado das seções (compartilhado por vários eventos)
   ========================================================== */

/** Elementos visíveis agora, com quantos pixels de cada um estão na tela. */
const visiveis = new Map<Element, number>();

/**
 * Seção em foco: entre as visíveis, a que ocupa mais pixels da tela.
 * Usada como `secao_atual` / `secao_origem` de outros eventos. O critério
 * é altura visível, e não fração da seção, porque numa seção longa a
 * fração é baixa mesmo quando ela toma a tela inteira.
 */
function secaoAtual(): string | undefined {
  let melhor: string | undefined;
  let maior = 0;
  visiveis.forEach((altura, el) => {
    if (altura > maior) {
      maior = altura;
      melhor = (el as HTMLElement).dataset.section;
    }
  });
  return melhor;
}

/* ==========================================================
   Funções chamadas pelos componentes
   ========================================================== */

let inicioPreenchimento = 0;
let formIniciado = false;
let formConcluido = false;
let abandonoEnviado = false;
let ultimoCampo: string | undefined;
const camposCompletos = new Set<string>();

/** O <form> só existe enquanto não houve sucesso; pode ser null. */
const formEl = () => document.querySelector<HTMLFormElement>("#formulario");

/** Conta quantos dos oito campos estão preenchidos AGORA, lendo o DOM. */
function contarPreenchidos(): number {
  const form = formEl();
  if (!form) return camposCompletos.size;
  let n = 0;
  ORDEM_CAMPOS.forEach((nome) => {
    const campo = form.elements.namedItem(nome) as
      | HTMLInputElement
      | HTMLSelectElement
      | HTMLTextAreaElement
      | null;
    if (!campo) return;
    if (campo instanceof HTMLInputElement && campo.type === "checkbox") {
      if (campo.checked) n++;
      return;
    }
    if (campo.value && campo.value.trim()) n++;
  });
  return n;
}

/**
 * Erros de validação do formulário. Recebe as chaves com erro e um mapa
 * de "o campo estava vazio?" — o valor em si nunca entra aqui.
 */
export const rastrearErrosDeFormulario = seguro(
  (chavesComErro: string[], vazio: Record<string, boolean>) => {
    ORDEM_CAMPOS.forEach((nome) => {
      if (!chavesComErro.includes(nome)) return;
      push("form_field_error", {
        form_id: "diagnostico",
        field_name: nome,
        field_index: indiceDoCampo(nome),
        error_type: vazio[nome] ? "obrigatorio" : "formato_invalido",
      });
    });
  },
);

/** Submit disparado, antes de validar. */
export const rastrearTentativaDeEnvio = seguro(() => {
  push("form_submit_attempt", {
    form_id: "diagnostico",
    fields_completed: contarPreenchidos(),
  });
});

/** Conversão. Só na confirmação de sucesso, nunca no clique do botão. */
export const rastrearLeadGerado = seguro(
  (dados: { segmento?: string; investimento?: string }) => {
    formConcluido = true;
    push("generate_lead", {
      form_id: "diagnostico",
      segmento: dados.segmento || undefined,
      investimento: dados.investimento || undefined,
      tempo_preenchimento: inicioPreenchimento
        ? Math.round((agora() - inicioPreenchimento) / 1000)
        : undefined,
    });
  },
);

/** Falha técnica no envio. A mensagem nunca carrega dado do visitante. */
export const rastrearErroDeEnvio = seguro((mensagem: string) => {
  push("form_submit_error", {
    form_id: "diagnostico",
    error_message: String(mensagem).slice(0, 120),
  });
});

/** Card alcançado no carrossel. Índice de 1 a 4, igual às etiquetas 01/ a 04/. */
const cardsVistos = new Set<string>();
export const rastrearCarrossel = seguro((carrossel: string, indice: number) => {
  const chave = `${carrossel}:${indice}`;
  if (cardsVistos.has(chave)) return;
  cardsVistos.add(chave);
  push("carrossel_interacao", { carrossel, card_index: indice });
});

/* ==========================================================
   B1 — funil interno do formulário (delegado, sem tocar no componente)
   ========================================================== */

function ligarFormulario(limpezas: (() => void)[]) {
  /** O honeypot não existe para o visitante, então também não existe aqui. */
  const rastreavel = (el: Element | null): HTMLElement | null => {
    if (!el || !(el instanceof HTMLElement)) return null;
    if (!el.closest("#formulario")) return null;
    const nome = (el as HTMLInputElement).name;
    if (!nome || !ORDEM_CAMPOS.includes(nome as Campo)) return null;
    return el;
  };

  const aoFocar = seguro((ev: FocusEvent) => {
    const campo = rastreavel(ev.target as Element);
    if (!campo) return;
    ultimoCampo = (campo as HTMLInputElement).name;
    if (formIniciado) return;
    formIniciado = true;
    inicioPreenchimento = agora();
    push("form_start", { form_id: "diagnostico" });
  });

  const concluirCampo = (campo: HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement) => {
    const nome = campo.name;
    if (camposCompletos.has(nome)) return;
    const marcado = campo instanceof HTMLInputElement && campo.type === "checkbox";
    const preenchido = marcado ? campo.checked : !!campo.value.trim();
    if (!preenchido) return;
    camposCompletos.add(nome);
    push("form_field_complete", {
      form_id: "diagnostico",
      field_name: nome,
      field_index: indiceDoCampo(nome),
      // texto livre nunca vai; select de opção fixa vai
      ...(CAMPOS_COM_VALOR.includes(nome) ? { field_value: campo.value } : {}),
    });
  };

  const aoSair = seguro((ev: FocusEvent) => {
    const campo = rastreavel(ev.target as Element);
    if (campo) concluirCampo(campo as HTMLInputElement);
  });

  const aoMudar = seguro((ev: Event) => {
    const campo = rastreavel(ev.target as Element);
    if (!campo) return;
    // checkbox e select confirmam no change, que é quando o valor existe
    const tipo = (campo as HTMLInputElement).type;
    if (tipo === "checkbox" || campo instanceof HTMLSelectElement) {
      concluirCampo(campo as HTMLInputElement);
    }
  });

  document.addEventListener("focusin", aoFocar);
  document.addEventListener("focusout", aoSair);
  document.addEventListener("change", aoMudar);
  limpezas.push(() => {
    document.removeEventListener("focusin", aoFocar);
    document.removeEventListener("focusout", aoSair);
    document.removeEventListener("change", aoMudar);
  });
}

/** Abandono: saiu da aba ou da página com o formulário começado e não enviado. */
function enviarAbandono() {
  if (!formIniciado || formConcluido || abandonoEnviado) return;
  abandonoEnviado = true;
  push("form_abandon", {
    form_id: "diagnostico",
    last_field_name: ultimoCampo,
    last_field_index: ultimoCampo ? indiceDoCampo(ultimoCampo) : undefined,
    fields_completed: contarPreenchidos(),
  });
}

/* ==========================================================
   B2 — leitura real das seções
   ========================================================== */

function ligarSecoes(limpezas: (() => void)[]) {
  const alvos = Array.from(document.querySelectorAll<HTMLElement>("[data-section]"));
  if (alvos.length === 0) return;

  /** Ordem das seções no documento, sem repetir as variantes. */
  const ordem: string[] = [];
  alvos.forEach((el) => {
    const nome = el.dataset.section!;
    if (!ordem.includes(nome)) ordem.push(nome);
  });

  /**
   * `total` conta apenas as visitas que passaram de 1 segundo. Sem esse
   * piso, uma rolagem rápida de volta ao topo marcaria "retorno" em toda
   * seção que ela apenas atravessa, e o evento viraria ruído.
   */
  type Estado = {
    inicio: number | null;
    acumulado: number;
    total: number;
    ehRetorno: boolean;
    confirmacao?: number;
  };
  const estado = new Map<string, Estado>();
  const pegar = (nome: string): Estado => {
    let e = estado.get(nome);
    if (!e) {
      e = { inicio: null, acumulado: 0, total: 0, ehRetorno: false };
      estado.set(nome, e);
    }
    return e;
  };
  const PISO_MS = 1000;

  const vistas = new Set<string>();
  let indiceMaximo = -1;
  let leuAlgumaSecao = false; // alguma seção passou de 3s?

  const iniciarRelogio = (nome: string) => {
    const e = pegar(nome);
    if (e.inicio === null) e.inicio = agora();
  };

  const pararRelogio = (nome: string) => {
    const e = pegar(nome);
    if (e.inicio === null) return;
    e.acumulado += agora() - e.inicio;
    e.inicio = null;
    if (e.acumulado >= 3000) leuAlgumaSecao = true;
  };

  /** Fecha a contagem e envia, se passou de 1 segundo. */
  const fechar = (nome: string) => {
    pararRelogio(nome);
    const e = pegar(nome);
    // saiu antes do piso: a visita não conta e o retorno não é enviado
    if (e.confirmacao) {
      window.clearTimeout(e.confirmacao);
      e.confirmacao = undefined;
    }
    if (e.acumulado >= PISO_MS) {
      push("secao_tempo", { secao: nome, duracao_segundos: Math.round(e.acumulado / 1000) });
    }
    e.acumulado = 0;
  };

  const io = new IntersectionObserver(
    seguro((entradas: IntersectionObserverEntry[]) => {
      entradas.forEach((entrada) => {
        const el = entrada.target as HTMLElement;
        const nome = el.dataset.section!;
        // "Está sendo lida" = metade da SEÇÃO na tela, ou metade da TELA
        // ocupada pela seção. A segunda regra existe porque três seções
        // são mais altas que duas telas de celular (segmentos, método e
        // diagnóstico): elas nunca chegariam a 50% de si mesmas e ficariam
        // sem medição justamente no aparelho onde está o volume.
        const alturaVisivel = entrada.intersectionRect.height;
        const dentro =
          entrada.intersectionRatio >= 0.5 || alturaVisivel >= window.innerHeight * 0.5;

        if (dentro) {
          // ranqueia por altura visível, não por fração: numa seção longa a
          // fração é baixa mesmo quando ela domina a tela
          visiveis.set(el, alturaVisivel);
          const e = pegar(nome);
          const indice = ordem.indexOf(nome);

          if (e.inicio === null && !e.confirmacao) {
            // já tinha sido vista e o visitante já passou dela: é retorno,
            // mas só confirma se ficar na tela pelo piso de 1 segundo
            e.ehRetorno = vistas.has(nome) && indice < indiceMaximo;
            vistas.add(nome);
            if (indice > indiceMaximo) indiceMaximo = indice;
            e.confirmacao = window.setTimeout(() => {
              e.confirmacao = undefined;
              e.total++;
              if (e.ehRetorno) push("retorno_secao", { secao: nome, vezes: e.total });
            }, PISO_MS);
          }
          iniciarRelogio(nome);
        } else {
          visiveis.delete(el);
          // com variantes duplicadas, só fecha quando NENHUMA está visível
          const aindaVisivel = alvos.some(
            (outro) => outro.dataset.section === nome && visiveis.has(outro),
          );
          if (!aindaVisivel) fechar(nome);
        }
      });
    }),
    // passos de 5%: numa seção de três telas de altura, metade da tela
    // equivale a ~17% dela, então a régua precisa ser fina o bastante
    // para a travessia ser percebida
    { threshold: Array.from({ length: 21 }, (_, i) => i / 20) },
  );

  alvos.forEach((el) => io.observe(el));

  /* --- rolagem rápida --- */
  let profundidadeMaxima = 0;
  let rolagemRapidaEnviada = false;
  const inicioDaPagina = agora();
  let agendado = false;

  const medirRolagem = seguro(() => {
    if (agendado) return;
    agendado = true;
    requestAnimationFrame(() => {
      agendado = false;
      const alturaTotal = document.documentElement.scrollHeight;
      if (!alturaTotal) return;
      const pct = ((window.scrollY + window.innerHeight) / alturaTotal) * 100;
      if (pct > profundidadeMaxima) profundidadeMaxima = Math.min(100, pct);
      if (
        !rolagemRapidaEnviada &&
        profundidadeMaxima > 70 &&
        agora() - inicioDaPagina < 10000 &&
        !leuAlgumaSecao
      ) {
        rolagemRapidaEnviada = true;
        push("rolagem_rapida", {
          profundidade_percentual: Math.round(profundidadeMaxima),
        });
      }
    });
  });
  window.addEventListener("scroll", medirRolagem, { passive: true });

  /* --- pausa quando a aba perde o foco, e retorno de aba --- */
  let ocultaEm = 0;
  const aoTrocarVisibilidade = seguro(() => {
    if (document.hidden) {
      ocultaEm = agora();
      estado.forEach((_, nome) => pararRelogio(nome));
      enviarAbandono();
      return;
    }
    if (ocultaEm) {
      const fora = Math.round((agora() - ocultaEm) / 1000);
      ocultaEm = 0;
      if (fora > 30) {
        push("retorno_aba", { tempo_fora_segundos: fora, secao_atual: secaoAtual() });
      }
    }
    // religa o relógio das que continuam na tela
    visiveis.forEach((_, el) => iniciarRelogio((el as HTMLElement).dataset.section!));
  });
  document.addEventListener("visibilitychange", aoTrocarVisibilidade);

  const aoSairDaPagina = seguro(() => {
    enviarAbandono();
    estado.forEach((_, nome) => fechar(nome));
  });
  window.addEventListener("pagehide", aoSairDaPagina);

  limpezas.push(() => {
    io.disconnect();
    estado.forEach((e) => e.confirmacao && window.clearTimeout(e.confirmacao));
    window.removeEventListener("scroll", medirRolagem);
    document.removeEventListener("visibilitychange", aoTrocarVisibilidade);
    window.removeEventListener("pagehide", aoSairDaPagina);
    visiveis.clear();
  });
}

/* ==========================================================
   B3 — interação e atrito
   ========================================================== */

/** Seletor curto e legível, montado só com tag e atributos de marcação. */
function seletorCurto(el: HTMLElement): string {
  const cta = el.closest<HTMLElement>("[data-cta]")?.dataset.cta;
  if (cta) return `[data-cta="${cta}"]`;
  const faq = el.closest<HTMLElement>("[data-faq]")?.dataset.faq;
  if (faq) return `[data-faq="${faq}"]`;
  const secao = el.closest<HTMLElement>("[data-section]")?.dataset.section;
  const tag = el.tagName.toLowerCase();
  return secao ? `[data-section="${secao}"] ${tag}` : tag;
}

function ligarCliques(limpezas: (() => void)[]) {
  let alvoRage: EventTarget | null = null;
  let cliquesRage = 0;
  let primeiroClique = 0;
  let rageEnviado: EventTarget | null = null;

  const aberturasFaq: string[] = [];

  const aoClicar = seguro((ev: MouseEvent) => {
    const alvo = ev.target as HTMLElement | null;
    if (!alvo) return;

    /* --- rage click --- */
    if (alvo === alvoRage && agora() - primeiroClique < 2000) {
      cliquesRage++;
      if (cliquesRage >= 3 && rageEnviado !== alvo) {
        rageEnviado = alvo;
        push("rage_click", { elemento: seletorCurto(alvo), cliques: cliquesRage });
      }
    } else {
      alvoRage = alvo;
      cliquesRage = 1;
      primeiroClique = agora();
      rageEnviado = null;
    }

    /* --- CTA marcado na Fase A --- */
    const cta = alvo.closest<HTMLElement>("[data-cta]");
    if (cta?.dataset.cta) push("clique_cta", { cta: cta.dataset.cta });

    /* --- WhatsApp, de onde quer que parta --- */
    const wa = alvo.closest<HTMLAnchorElement>('a[href*="wa.me"]');
    if (wa) {
      const origem = wa.dataset.cta === "whatsapp-flutuante"
        ? "flutuante"
        : wa.closest("footer")
          ? "rodape"
          : wa.closest("#diagnostico")
            ? "formulario"
            : "outro";
      push("clique_whatsapp", { origem, secao_origem: secaoAtual() });
    }

    /* --- FAQ: só conta quando abre --- */
    const faq = alvo.closest<HTMLElement>("[data-faq]");
    if (faq?.dataset.faq && faq.getAttribute("aria-expanded") === "false") {
      const slug = faq.dataset.faq;
      aberturasFaq.push(slug);
      push("faq_interacao", {
        pergunta: slug,
        ordem_abertura: aberturasFaq.length,
        total_abertas: new Set(aberturasFaq).size,
      });
    }
  });

  /* --- cópia de contato: só o tipo, nunca o conteúdo --- */
  const aoCopiar = seguro(() => {
    const texto = window.getSelection()?.toString() ?? "";
    if (!texto.trim()) return;
    let tipo: string | undefined;
    if (/[\w.+-]+@[\w-]+\.[\w.-]+/.test(texto)) tipo = "email";
    else if (/wa\.me|\(?\d{2}\)?\s?9?\d{4}[-\s]?\d{4}/.test(texto)) tipo = "whatsapp";
    else if (/\d{5}-\d{3}|Norival|sala\s?101/i.test(texto)) tipo = "endereco";
    if (tipo) push("copiou_contato", { tipo });
  });

  document.addEventListener("click", aoClicar);
  document.addEventListener("copy", aoCopiar);
  limpezas.push(() => {
    document.removeEventListener("click", aoClicar);
    document.removeEventListener("copy", aoCopiar);
  });
}

/* ==========================================================
   B4 — intenção de saída (só desktop com ponteiro fino)
   ========================================================== */

function ligarIntencaoDeSaida(limpezas: (() => void)[]) {
  const fino = window.matchMedia("(pointer: fine)").matches;
  if (!fino || window.innerWidth < CORTE_DESKTOP) return;

  let enviado = false;
  const aoSair = seguro((ev: MouseEvent) => {
    if (enviado || ev.clientY > 0 || ev.relatedTarget) return;
    enviado = true;
    push("intencao_saida", { secao_atual: secaoAtual() });
  });
  document.addEventListener("mouseout", aoSair);
  limpezas.push(() => document.removeEventListener("mouseout", aoSair));
}

/* ==========================================================
   Ligação
   ========================================================== */

let ligado = false;

/**
 * Liga a camada de eventos. Chamada uma vez, do Home. Devolve a função
 * de desligamento (usada pelo cleanup do efeito no React 19 em modo
 * estrito, que monta e desmonta duas vezes em desenvolvimento).
 */
export function iniciarRastreamento(): () => void {
  if (typeof window === "undefined" || ligado) return () => {};
  ligado = true;

  const w = window as unknown as { dataLayer?: Dado[] };
  w.dataLayer = w.dataLayer || [];

  const limpezas: (() => void)[] = [];
  try {
    ligarFormulario(limpezas);
    ligarSecoes(limpezas);
    ligarCliques(limpezas);
    ligarIntencaoDeSaida(limpezas);
  } catch {
    /* silencioso */
  }

  return () => {
    limpezas.forEach((fn) => {
      try {
        fn();
      } catch {
        /* silencioso */
      }
    });
    ligado = false;
  };
}
