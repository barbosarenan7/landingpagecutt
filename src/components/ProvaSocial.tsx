import { useEffect, useRef, useState, type ReactNode } from "react";
import { Reveal } from "../lib/reveal";
import { BtnPrimary, Media } from "./primitives";
import { site, track } from "../config/site";
import content from "../content/site.json";

const p = content.provaSocial;

/**
 * Prova social. O texto vive FORA dos cards (título, descrição e CTA
 * centralizados); dentro dos cards só entra mídia.
 *
 * Desktop: bento assimétrico preservado (01 alto, 02 largo, 03 e 04
 * lado a lado). Mobile: carrossel horizontal com cards quadrados de
 * mesmo tamanho, arraste por scroll-snap + setas e indicadores.
 */

/**
 * Prévia do perfil no Instagram sobre o card 01 (o vídeo institucional
 * saiu de cena). O card inteiro vira link: no celular o próprio sistema
 * abre o app do Instagram, no desktop abre o perfil no navegador.
 */
function InstagramSelo() {
  return (
    <span
      className="absolute top-1/2 left-1/2 w-[76%] max-w-[15rem] -translate-x-1/2 -translate-y-1/2"
      aria-hidden
    >
      {/* caixa branca com o avatar transbordando o topo, igual à
          caixinha de perguntas dos stories */}
      <span className="relative block rounded-[18px] bg-paper-0 px-4 pt-9 pb-4 shadow-xl">
        <span className="absolute -top-6 left-1/2 block h-12 w-12 -translate-x-1/2 overflow-hidden rounded-pill border-[3px] border-paper-0 bg-ink-900">
          <img
            src="/favicon.png"
            alt=""
            width={192}
            height={192}
            loading="lazy"
            decoding="async"
            className="h-full w-full object-cover"
          />
        </span>
        <span className="block text-center text-[17px] leading-tight font-medium text-ink-900">
          {p.instagramArroba}
        </span>
        {/* onde ficaria "Digite algo…" entra a chamada de clique */}
        <span className="mt-3 block rounded-[10px] bg-ink-900/[0.08] py-2.5 text-center text-[14px] font-medium text-ink-900/55">
          Clique aqui
        </span>
      </span>
    </span>
  );
}

/** Etiqueta de canto (01/ … 04/). */
function Tag({ children }: { children: ReactNode }) {
  return (
    <span className="bento-tag absolute top-4 right-5 text-paper-50/85">{children}</span>
  );
}

/** Legenda no pé do card, sobre o mesmo degradê usado nos Segmentos. */
function Legenda({ children }: { children: ReactNode }) {
  return (
    <div
      className="absolute inset-x-0 bottom-0 p-6 pt-24"
      style={{
        background: "linear-gradient(to top, rgba(11,11,11,.82), transparent 60%)",
      }}
    >
      <p className="max-w-[34ch] text-[13px] leading-relaxed font-medium text-paper-50">
        {children}
      </p>
    </div>
  );
}

/** Slots de mídia — a ordem vale para o desktop e para o carrossel. */
const midias = [
  {
    n: "01/",
    file: "prova-01.webp",
    src: p.card01Imagem,
    srcMobile: p.card01Imagem,
    alt: "Equipe da Cut Creative no estúdio",
    instagram: true,
    legenda: p.card01Legenda,
  },
  {
    n: "02/",
    file: "prova-02.webp",
    src: p.card02Imagem,
    srcMobile: p.card02ImagemMobile,
    alt: "Estúdio da Cut Creative com o time em operação",
    legenda: p.card02Legenda,
  },
  {
    n: "03/",
    file: "prova-03.webp",
    src: p.card03Imagem,
    srcMobile: p.card03Imagem,
    alt: "Bastidores da operação da Cut Creative",
    legenda: p.card03Legenda,
  },
  {
    n: "04/",
    file: "prova-04.webp",
    src: p.card04Imagem,
    srcMobile: p.card04Imagem,
    alt: "+300 marcas atendidas — estratégia, criação e resultados reais",
    legenda: "",
  },
];

const N = midias.length;

/** Três blocos idênticos: o do meio é o "real", as pontas alimentam o loop. */
const trilhaInfinita = [...midias, ...midias, ...midias];

/**
 * Carrossel do mobile: arraste nativo por scroll-snap, com loop infinito
 * e o card central em tamanho cheio (os laterais ficam 20% menores).
 *
 * O loop é feito triplicando a lista e teleportando o scroll de volta ao
 * bloco do meio quando o arraste para numa das pontas. Como o salto tem
 * exatamente a largura de um bloco, a tela não muda — o usuário só sente
 * que o carrossel nunca acaba.
 */
function CarrosselMobile() {
  const trilha = useRef<HTMLDivElement>(null);
  const parada = useRef<number | undefined>(undefined);
  const [foco, setFoco] = useState(N); // índice real do card centralizado

  /** scrollLeft que deixa o card `i` exatamente no centro da janela. */
  const centroDe = (i: number) => {
    const t = trilha.current;
    const el = t?.children[i] as HTMLElement | undefined;
    if (!t || !el) return 0;
    return el.offsetLeft - t.offsetLeft - (t.clientWidth - el.clientWidth) / 2;
  };

  // começa no bloco do meio, para haver conteúdo dos dois lados
  useEffect(() => {
    const t = trilha.current;
    if (t) t.scrollLeft = centroDe(N);
    return () => window.clearTimeout(parada.current);
  }, []);

  const irPara = (i: number) =>
    trilha.current?.scrollTo({ left: centroDe(i), behavior: "smooth" });

  const aoRolar = () => {
    const t = trilha.current;
    if (!t) return;
    const centro = t.scrollLeft + t.clientWidth / 2;
    let melhor = 0;
    let menor = Infinity;
    Array.from(t.children).forEach((filho, i) => {
      const el = filho as HTMLElement;
      const meio = el.offsetLeft - t.offsetLeft + el.clientWidth / 2;
      const d = Math.abs(meio - centro);
      if (d < menor) {
        menor = d;
        melhor = i;
      }
    });
    setFoco(melhor);

    // quando o arraste para, recentra no bloco do meio (salto invisível)
    window.clearTimeout(parada.current);
    parada.current = window.setTimeout(() => {
      if (melhor >= N && melhor < 2 * N) return;
      const destino = melhor < N ? melhor + N : melhor - N;
      t.scrollLeft = centroDe(destino);
      setFoco(destino);
    }, 130);
  };

  const ativo = ((foco % N) + N) % N;

  /** caminho mais curto até o indicador `i`, já contando com o loop. */
  const pularPara = (i: number) => {
    let delta = i - ativo;
    if (delta > N / 2) delta -= N;
    if (delta < -N / 2) delta += N;
    irPara(foco + delta);
  };

  return (
    <div className="mt-10 lg:hidden">
      <div
        ref={trilha}
        onScroll={aoRolar}
        role="region"
        aria-label="Carrossel de mídias da Cut Creative"
        className="carrossel -mx-3 flex snap-x snap-mandatory items-center gap-1.5 overflow-x-auto px-3 py-2"
      >
        {trilhaInfinita.map((m, i) => (
          <div
            key={`${m.n}-${i}`}
            className="w-[82%] shrink-0 snap-center"
            /* só o bloco do meio é anunciado; as cópias são decorativas */
            aria-hidden={i < N || i >= 2 * N}
          >
            <div
              className={`carrossel-card ${i === foco ? "" : "carrossel-card-lateral"}`}
            >
              <Media
                file={m.file}
                src={m.srcMobile}
                alt={m.alt}
                ratio="1 / 1"
                className="[&_img]:filter-none"
              >
                <Tag>{m.n}</Tag>
                {m.instagram && (
                  <>
                    <div className="absolute inset-0 bg-ink-900/45" aria-hidden />
                    <InstagramSelo />
                    {/* o link cobre o card inteiro; no celular o sistema
                        abre direto o app do Instagram */}
                    <a
                      href={site.instagram}
                      target="_blank"
                      rel="noopener noreferrer"
                      onClick={() => track("instagram_click", { origem: "prova_social" })}
                      aria-label={`Ver o perfil ${p.instagramArroba} no Instagram`}
                      className="absolute inset-0 z-[2]"
                    />
                  </>
                )}
                {m.legenda && <Legenda>{m.legenda}</Legenda>}
              </Media>
            </div>
          </div>
        ))}
      </div>

      {/* sem setas: o arraste e os indicadores dão conta da navegação */}
      <div className="mt-3 flex items-center justify-center">
        <span className="eyebrow">Arraste para o lado</span>
      </div>

      <div className="mt-3 flex justify-center gap-1">
        {midias.map((m, i) => (
          // a área de toque tem 24×24 (acessibilidade); a barrinha visível
          // continua com 6px de altura, centralizada dentro do botão
          <button
            key={m.n}
            type="button"
            onClick={() => pularPara(i)}
            aria-label={`Ir para a mídia ${i + 1}`}
            aria-current={i === ativo}
            className="flex h-6 w-6 items-center justify-center"
          >
            <span
              className={`h-1.5 rounded-pill transition-all duration-300 ${
                i === ativo ? "w-6 bg-accent" : "w-1.5 bg-line-light"
              }`}
            />
          </button>
        ))}
      </div>
    </div>
  );
}

export default function ProvaSocial() {
  return (
    <section className="sec-light py-[clamp(40px,5vw,72px)]" aria-labelledby="prova-title">
      <div className="container-cut">
        {/* título na fonte do logotipo, centralizado, destaque no acento */}
        <h2
          id="prova-title"
          className="faixa-leitura h-sans mx-auto max-w-[20ch] text-center text-balance"
          style={{ fontSize: "var(--fs-h2)" }}
        >
          {p.tituloAntes} <span className="text-accent">{p.tituloDestaque}</span>{" "}
          {p.tituloDepois}
        </h2>

        {/* texto que antes vivia dentro do card 03 */}
        <Reveal delay={80}>
          <p className="faixa-leitura text-2nd mx-auto mt-6 max-w-[58ch] text-center leading-relaxed">
            {p.descricao}
          </p>
        </Reveal>

        <Reveal delay={140} className="mt-8 flex justify-center">
          <BtnPrimary href="#formulario">{p.cta}</BtnPrimary>
        </Reveal>

        {/* ===== desktop: bento assimétrico (estrutura preservada) ===== */}
        <div className="mt-12 hidden gap-3 lg:grid lg:grid-cols-12">
          {/* 01 — alto, ocupa as duas linhas; mídia absoluta para não
              inflar a altura das linhas e manter o gap uniforme */}
          <Reveal className="relative col-span-4 row-span-2">
            <Media
              file={midias[0].file}
              src={midias[0].src}
              alt={midias[0].alt}
              hover
              className="absolute inset-0"
            >
              <div className="absolute inset-0 bg-ink-900/45" aria-hidden />
              <Tag>01/</Tag>
              <InstagramSelo />
              <Legenda>{midias[0].legenda}</Legenda>
              <a
                href={site.instagram}
                target="_blank"
                rel="noopener noreferrer"
                onClick={() => track("instagram_click", { origem: "prova_social" })}
                aria-label={`Ver o perfil ${p.instagramArroba} no Instagram`}
                className="absolute inset-0 z-[2]"
              />
            </Media>
          </Reveal>

          {/* 02 — largo */}
          <Reveal delay={90} className="col-span-8">
            <Media
              file={midias[1].file}
              src={midias[1].src}
              alt={midias[1].alt}
              ratio="21 / 9"
              hover
              className="[&_img]:filter-none"
            >
              <Tag>02/</Tag>
              <Legenda>{midias[1].legenda}</Legenda>
            </Media>
          </Reveal>

          {/* 03 e 04 — mesma largura, fechando a segunda linha */}
          <Reveal delay={140} className="col-span-4">
            <Media
              file={midias[2].file}
              src={midias[2].src}
              alt={midias[2].alt}
              hover
              className="h-full [&_img]:filter-none"
            >
              <Tag>03/</Tag>
              <Legenda>{midias[2].legenda}</Legenda>
            </Media>
          </Reveal>

          <Reveal delay={190} className="col-span-4">
            <Media
              file={midias[3].file}
              src={midias[3].src}
              alt={midias[3].alt}
              hover
              className="h-full [&_img]:filter-none"
            >
              <Tag>04/</Tag>
            </Media>
          </Reveal>
        </div>

        {/* ===== mobile: carrossel ===== */}
        <CarrosselMobile />
      </div>
    </section>
  );
}
