import { Reveal } from "../lib/reveal";
import { BtnPrimary, fontesOtimizadas } from "./primitives";
import content from "../content/site.json";

const h = content.hero;
const otimMobile = fontesOtimizadas(h.imagemMobile);
const otimDesktop = fontesOtimizadas(h.imagem);

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
        {/* No desktop o card assume a proporção exata do arquivo (2000×1315),
            para o object-cover não cortar nada — é o wordmark embutido que
            vai de ponta a ponta da foto. Abaixo de lg vale a altura de tela. */}
        <div className="relative overflow-hidden rounded-card bg-ink-800 text-paper-50 lg:aspect-[2000/1315]">
          {/* imagem de fundo em bleed total: versão vertical no mobile,
              horizontal no desktop (hero.imagemMobile / hero.imagem) */}
          <div className="media hero-foto absolute inset-0 h-full !rounded-none">
            <picture className="block h-full w-full">
              {otimMobile && (
                <source
                  media="(max-width: 1023px)"
                  type="image/avif"
                  srcSet={otimMobile.avif}
                />
              )}
              {otimMobile && (
                <source
                  media="(max-width: 1023px)"
                  type="image/webp"
                  srcSet={otimMobile.webp}
                />
              )}
              <source media="(max-width: 1023px)" srcSet={h.imagemMobile} />
              {otimDesktop && <source type="image/avif" srcSet={otimDesktop.avif} />}
              {otimDesktop && <source type="image/webp" srcSet={otimDesktop.webp} />}
              <img
                src={h.imagem}
                alt="Retrato editorial no estúdio da Cut Creative"
                className="h-full w-full object-cover"
                width={2000}
                height={1315}
                loading="eager"
                decoding="async"
                fetchPriority="high"
              />
            </picture>
          </div>
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

          <div className="relative z-10 flex min-h-[max(620px,86vh)] flex-col px-6 pt-10 pb-8 md:px-12 md:pt-12 md:pb-12 lg:h-full lg:min-h-0">
            {/* Sem wordmark em HTML: a marca vem das próprias fotos — o
                símbolo atrás do retrato no celular, o lettering "Cut
                Creative®" na versão desktop. */}
            <div className="flex-1" />

            {/* rodapé do card: título + CTA à esquerda, colunas à direita */}
            <div className="grid items-end gap-10 lg:grid-cols-12">
              <div className="lg:col-span-6">
                {/* entrelinha mais fechada no celular; no desktop segue 1.08 */}
                <h1
                  id="hero-title"
                  className="font-bold leading-[1] lg:leading-[1.08]"
                  style={{ fontSize: "clamp(1.75rem, 3.2vw, 2.875rem)" }}
                >
                  {h.titulo}
                </h1>
                <Reveal delay={120}>
                  <p className="mt-4 text-[15px] tracking-[0.08em] text-accent uppercase lg:text-paper-50/70">
                    {h.eyebrow}
                  </p>
                </Reveal>
                {/* no celular o CTA principal vive no header, por isso ele
                    só aparece a partir de sm */}
                <Reveal delay={200} className="mt-7 flex flex-wrap items-center gap-4">
                  <BtnPrimary href="#diagnostico" className="hidden sm:inline-flex">
                    {h.ctaPrimario}
                  </BtnPrimary>
                </Reveal>
              </div>

              {/* No celular estas duas colunas saem do card e vão para a área
                  clara, logo abaixo — assim a foto fica só com o wordmark no
                  topo e o texto principal no pé. De lg pra cima, nada muda. */}
              <div className="hidden gap-8 sm:grid-cols-2 lg:col-span-6 lg:grid lg:grid-cols-2 lg:pl-10">
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

        {/* ===== celular: Estratégia e Resultado na área clara =====
            Mesmo conteúdo das colunas do card, agora sobre o off-white:
            título forte com a régua no acento e texto na cor secundária
            da seção. Some a partir de lg, onde eles voltam para dentro
            da foto. */}
        <div className="mt-12 grid gap-9 sm:grid-cols-2 sm:gap-8 lg:hidden">
          <Reveal>
            <h2 className="flex items-center gap-4 text-[22px] font-bold">
              {h.col1Titulo}
              <span className="h-px min-w-8 flex-1 bg-accent" aria-hidden />
            </h2>
            <p className="text-2nd mt-3 text-[15px] leading-relaxed">{h.col1Texto}</p>
          </Reveal>
          <Reveal delay={90}>
            <h2 className="flex items-center gap-4 text-[22px] font-bold">
              {h.col2Titulo}
              <span className="h-px min-w-8 flex-1 bg-accent" aria-hidden />
            </h2>
            <p className="text-2nd mt-3 text-[15px] leading-relaxed">{h.col2Texto}</p>
          </Reveal>
        </div>
      </div>
    </section>
  );
}
