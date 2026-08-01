import { useRef, useState, type ReactNode } from "react";
import { Reveal } from "../lib/reveal";
import { BtnPrimary, Media } from "./primitives";
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

/** Botão de play sobre a capa do vídeo institucional (card 01). */
function Play() {
  return (
    <span
      className="absolute top-1/2 left-1/2 flex h-16 w-16 -translate-x-1/2 -translate-y-1/2 items-center justify-center rounded-pill bg-paper-0/90"
      aria-hidden
    >
      <svg width="18" height="20" viewBox="0 0 18 20" fill="none">
        <path
          d="M2 1.8v16.4c0 .9 1 1.5 1.8 1l13-8.2c.8-.5.8-1.6 0-2.1L3.8.8C3 .3 2 .9 2 1.8Z"
          fill="#0B0B0B"
        />
      </svg>
    </span>
  );
}

/** Etiqueta de canto (01/ … 04/). */
function Tag({ children }: { children: ReactNode }) {
  return (
    <span className="bento-tag absolute top-4 right-5 text-paper-50/85">{children}</span>
  );
}

/** Slots de mídia — a ordem vale para o desktop e para o carrossel. */
const midias = [
  {
    n: "01/",
    file: "prova-01.webp",
    src: p.card01Imagem,
    srcMobile: p.card01Imagem,
    alt: "Equipe da Cut Creative no estúdio — capa do vídeo institucional",
    play: true,
  },
  {
    n: "02/",
    file: "prova-02.webp",
    src: p.card02Imagem,
    srcMobile: p.card02ImagemMobile,
    alt: "Estúdio da Cut Creative com o time em operação",
    play: false,
  },
  {
    n: "03/",
    file: "prova-03.webp",
    src: p.card03Imagem,
    srcMobile: p.card03Imagem,
    alt: "Bastidores da operação da Cut Creative",
    play: false,
  },
  {
    n: "04/",
    file: "prova-04.webp",
    src: p.card04Imagem,
    srcMobile: p.card04Imagem,
    alt: "+300 marcas atendidas — estratégia, criação e resultados reais",
    play: false,
  },
];

function Seta({ virada = false }: { virada?: boolean }) {
  return (
    <svg
      width="14"
      height="10"
      viewBox="0 0 14 10"
      fill="none"
      aria-hidden
      className={virada ? "rotate-180" : ""}
    >
      <path
        d="M9 1l4 4-4 4M13 5H1"
        stroke="currentColor"
        strokeWidth="1.5"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
}

/** Carrossel do mobile: scroll-snap nativo (arraste) + setas e pontos. */
function CarrosselMobile() {
  const trilha = useRef<HTMLDivElement>(null);
  const [ativo, setAtivo] = useState(0);

  const irPara = (i: number) => {
    const t = trilha.current;
    if (!t) return;
    const alvo = t.children[i] as HTMLElement | undefined;
    if (alvo) t.scrollTo({ left: alvo.offsetLeft - t.offsetLeft, behavior: "smooth" });
  };

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
    setAtivo(melhor);
  };

  return (
    <div className="mt-10 lg:hidden">
      <div
        ref={trilha}
        onScroll={aoRolar}
        role="region"
        aria-label="Carrossel de mídias da Cut Creative"
        className="carrossel -mx-3 flex snap-x snap-mandatory gap-3 overflow-x-auto px-3 pb-1"
      >
        {midias.map((m) => (
          <div key={m.n} className="w-[82%] shrink-0 snap-center">
            <Media
              file={m.file}
              src={m.srcMobile}
              alt={m.alt}
              ratio="1 / 1"
              className="[&_img]:filter-none"
            >
              <Tag>{m.n}</Tag>
              {m.play && (
                <>
                  <div className="absolute inset-0 bg-ink-900/35" aria-hidden />
                  <Play />
                </>
              )}
            </Media>
          </div>
        ))}
      </div>

      {/* controles: setas, dica de arraste e indicadores */}
      <div className="mt-6 flex items-center justify-center gap-4">
        <button
          type="button"
          onClick={() => irPara(Math.max(0, ativo - 1))}
          disabled={ativo === 0}
          aria-label="Mídia anterior"
          className="flex h-11 w-11 items-center justify-center rounded-pill border border-line-light text-ink-900 transition-opacity disabled:opacity-30"
        >
          <Seta virada />
        </button>
        <span className="eyebrow">Arraste para o lado</span>
        <button
          type="button"
          onClick={() => irPara(Math.min(midias.length - 1, ativo + 1))}
          disabled={ativo === midias.length - 1}
          aria-label="Próxima mídia"
          className="flex h-11 w-11 items-center justify-center rounded-pill border border-line-light text-ink-900 transition-opacity disabled:opacity-30"
        >
          <Seta />
        </button>
      </div>

      <div className="mt-4 flex justify-center gap-2">
        {midias.map((m, i) => (
          <button
            key={m.n}
            type="button"
            onClick={() => irPara(i)}
            aria-label={`Ir para a mídia ${i + 1}`}
            aria-current={i === ativo}
            className={`h-1.5 rounded-pill transition-all duration-300 ${
              i === ativo ? "w-6 bg-accent" : "w-1.5 bg-line-light"
            }`}
          />
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
          className="h-sans mx-auto max-w-[20ch] text-center text-balance"
          style={{ fontSize: "var(--fs-h2)" }}
        >
          {p.tituloAntes} <span className="text-accent">{p.tituloDestaque}</span>{" "}
          {p.tituloDepois}
        </h2>

        {/* texto que antes vivia dentro do card 03 */}
        <Reveal delay={80}>
          <p className="text-2nd mx-auto mt-6 max-w-[58ch] text-center leading-relaxed">
            {p.descricao}
          </p>
        </Reveal>

        <Reveal delay={140} className="mt-8 flex justify-center">
          <BtnPrimary href="#diagnostico">{p.cta}</BtnPrimary>
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
              <div className="absolute inset-0 bg-ink-900/35" aria-hidden />
              <Tag>01/</Tag>
              <Play />
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
