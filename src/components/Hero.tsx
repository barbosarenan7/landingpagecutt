import { Reveal } from "../lib/reveal";
import { BtnPrimary, Media } from "./primitives";
import content from "../content/site.json";

const h = content.hero;

/**
 * Hero ref. "Dominic®": card escuro full-bleed com wordmark gigante
 * sobre a imagem, título + CTA embaixo à esquerda, duas mini-colunas
 * com régua accent à direita e hairline vertical com "2026".
 * Slot de imagem: hero-main.webp (fundo inteiro do card).
 */
export default function Hero() {
  return (
    <section id="top" className="sec-light" aria-labelledby="hero-title">
      <div className="container-cut pt-4 pb-[clamp(40px,5vw,72px)] md:pt-6">
        <div className="relative overflow-hidden rounded-card bg-ink-800 text-paper-50">
          {/* slot: hero-main.webp — imagem de fundo em bleed total */}
          <Media
            file="hero-main.webp"
            src={h.imagem}
            alt="Retrato editorial da equipe criativa da Cut em estúdio escuro"
            eager
            className="absolute inset-0 h-full !rounded-none"
          />
          {/* scrim para legibilidade do texto sobre a imagem */}
          <div
            className="absolute inset-0"
            aria-hidden
            style={{
              background:
                "linear-gradient(to top, rgba(11,11,11,.82) 0%, rgba(11,11,11,.25) 45%, rgba(11,11,11,.18) 100%)",
            }}
          />

          {/* hairline vertical + 2026 (lateral direita) */}
          <div
            className="absolute top-16 right-7 bottom-40 z-10 hidden flex-col items-center gap-4 lg:flex"
            aria-hidden
          >
            <span className="w-px flex-1 bg-paper-50/50" />
            <span className="vert-label !text-paper-50/80">2026</span>
          </div>

          <div className="relative z-10 flex min-h-[max(620px,86vh)] flex-col px-6 pt-10 pb-8 md:px-12 md:pt-12 md:pb-12">
            {/* wordmark gigante cruzando a imagem (ref Dominic®) */}
            <Reveal>
              <p
                className="h-sans select-none"
                aria-hidden
                style={{ fontSize: "clamp(3.25rem, 11.5vw, 10.5rem)", lineHeight: 0.9 }}
              >
                Cut Creative<span className="align-top text-[0.35em]">®</span>
              </p>
            </Reveal>

            <div className="flex-1" />

            {/* rodapé do card: título + CTA à esquerda, colunas à direita */}
            <div className="grid items-end gap-10 lg:grid-cols-12">
              <div className="lg:col-span-6">
                <h1
                  id="hero-title"
                  className="font-bold"
                  style={{ fontSize: "clamp(1.75rem, 3.2vw, 2.875rem)", lineHeight: 1.08 }}
                >
                  {h.titulo}
                </h1>
                <Reveal delay={120}>
                  <p className="mt-4 text-[15px] tracking-[0.08em] text-paper-50/70 uppercase">
                    {h.eyebrow}
                  </p>
                </Reveal>
                <Reveal delay={200} className="mt-7 flex flex-wrap items-center gap-4">
                  <BtnPrimary href="#diagnostico">{h.ctaPrimario}</BtnPrimary>
                  <a
                    href="#como-trabalhamos"
                    className="btn-secondary !border-paper-50/25 text-paper-50"
                  >
                    {h.ctaSecundario}
                  </a>
                </Reveal>
              </div>

              <div className="grid grid-cols-1 gap-8 sm:grid-cols-2 lg:col-span-6 lg:pl-10">
                <Reveal delay={260}>
                  <h2 className="flex items-center gap-4 text-[22px] font-bold">
                    {h.col1Titulo}
                    <span className="h-px min-w-8 flex-1 bg-accent" aria-hidden />
                  </h2>
                  <p className="mt-3 text-sm leading-relaxed text-paper-50/75">
                    {h.col1Texto}
                  </p>
                </Reveal>
                <Reveal delay={340}>
                  <h2 className="flex items-center gap-4 text-[22px] font-bold">
                    {h.col2Titulo}
                    <span className="h-px min-w-8 flex-1 bg-accent" aria-hidden />
                  </h2>
                  <p className="mt-3 text-sm leading-relaxed text-paper-50/75">
                    {h.col2Texto}
                  </p>
                </Reveal>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
