import { Reveal, RevealLines } from "../lib/reveal";

/**
 * Bloco "A DOR REAL" — identidade clara/editorial (blueprint do R$100).
 * Estilos 100% contidos neste componente (valores arbitrários + inline),
 * para não afetar nenhuma outra seção do site (que segue escura).
 * Fundo: public/dor-bg.jpg (desktop) · public/dor-bg-mobile.jpg (mobile).
 */
const pains = [
  {
    n: "01",
    title: "Já contratou agência",
    text: "Pagou por meses, recebeu posts bonitos e relatório nenhum. Quando perguntou por resultado, a resposta foi “alcance”.",
  },
  {
    n: "02",
    title: "Já tentou freelancer",
    text: "Começou bem, depois sumiu. Sem processo e sem prazo, a comunicação da empresa parou junto.",
  },
  {
    n: "03",
    title: "Já impulsionou post",
    text: "Colocou verba esperando cliente e recebeu curtida. Tráfego sem estratégia é doação para a plataforma.",
  },
];

const serif = { fontFamily: "var(--font-serif)", fontStyle: "normal" as const };

/** Rótulo central com barras douradas (│ A DOR REAL │). */
function Eyebrow({ children }: { children: React.ReactNode }) {
  return (
    <span className="inline-flex items-center gap-3">
      <span className="h-3 w-px bg-[#a5822f]/60" aria-hidden />
      <span
        className="text-[0.72rem] font-medium tracking-[0.22em] text-[#8a6c22] uppercase"
        style={{ fontFamily: "var(--font-sans)" }}
      >
        {children}
      </span>
      <span className="h-3 w-px bg-[#a5822f]/60" aria-hidden />
    </span>
  );
}

export default function Thesis() {
  return (
    <section
      id="dor-real"
      className="relative overflow-hidden bg-[#f1eee5] text-[#1c1813]"
    >
      {/* Textura de papel pontilhado */}
      <div
        aria-hidden
        className="pointer-events-none absolute inset-0"
        style={{
          backgroundImage:
            "radial-gradient(circle, rgba(28,24,16,0.07) 1px, transparent 1.4px)",
          backgroundSize: "22px 22px",
        }}
      />

      {/* Blueprint do R$100 — ancorado à esquerda, com fade para o papel */}
      <div
        aria-hidden
        className="pointer-events-none absolute top-0 left-0 h-[70%] w-full opacity-[0.2] sm:w-[45%] sm:opacity-100"
        style={{
          backgroundImage: "image-set(url('/dor-bg.jpg') 1x)",
          backgroundSize: "cover",
          backgroundPosition: "left top",
          backgroundRepeat: "no-repeat",
          WebkitMaskImage:
            "radial-gradient(125% 115% at 0% 4%, #000 32%, transparent 74%)",
          maskImage:
            "radial-gradient(125% 115% at 0% 4%, #000 32%, transparent 74%)",
        }}
      />

      {/* Scrim de legibilidade atrás do texto do topo */}
      <div
        aria-hidden
        className="pointer-events-none absolute inset-x-0 top-0 hidden h-[62%] sm:block"
        style={{
          background:
            "radial-gradient(60% 70% at 62% 34%, rgba(241,238,229,0.9) 0%, rgba(241,238,229,0.55) 45%, transparent 78%)",
        }}
      />

      <div className="relative z-10 mx-auto max-w-6xl px-5 py-24 md:px-8 md:py-32">
        {/* Topo centralizado: eyebrow + headline + sub + CTA */}
        <div className="mx-auto max-w-3xl text-center">
          <Reveal>
            <Eyebrow>A dor real</Eyebrow>
          </Reveal>

          <h2 className="mt-7" style={serif}>
            <RevealLines
              className="text-[9vw] leading-[1.08] tracking-[-0.01em] sm:text-5xl md:text-[3.7rem]"
              lines={[
                <>Marketing sem método vira gasto.</>,
                <>
                  Com método, vira{" "}
                  <span className="text-[#9c7822]">investimento.</span>
                </>,
              ]}
            />
          </h2>

          <Reveal delay={220}>
            <p className="mx-auto mt-7 max-w-xl text-base leading-relaxed text-[#6b6454] md:text-lg">
              Se você já investiu em marketing e se frustrou, o problema não foi
              você — foi a falta de método. A maioria das empresas da região já
              passou por pelo menos um destes cenários:
            </p>
          </Reveal>

          <Reveal delay={320}>
            <a
              href="#diagnostico"
              className="mt-9 inline-flex min-h-13 cursor-pointer items-center justify-center rounded-xl bg-[#16130f] px-8 text-sm font-medium text-[#f1e9d7] transition-transform duration-200 hover:-translate-y-0.5 hover:bg-black"
              style={{ minHeight: "3.25rem" }}
            >
              Solicitar diagnóstico gratuito
            </a>
          </Reveal>
        </div>

        {/* Painel de virada + cards de dor (overlap editorial) */}
        <div className="relative mt-16 md:mt-24">
          <Reveal>
            <div className="rounded-2xl border border-[#e0dacb] bg-white/70 p-8 backdrop-blur-sm md:p-12">
              <div className="grid gap-8 md:grid-cols-2 md:gap-14">
                <div>
                  <Eyebrow>A virada</Eyebrow>
                  <h3
                    className="mt-5 text-3xl leading-[1.1] tracking-[-0.01em] md:text-[2.6rem]"
                    style={serif}
                  >
                    Estratégia que transforma gasto em crescimento.
                  </h3>
                </div>
                <p className="text-base leading-relaxed text-[#5f594b] md:pt-3 md:text-lg">
                  A Cut existe para o cenário oposto: diagnóstico antes de
                  execução, estratégia antes de post e relatório antes de
                  promessa. Método, processo e clareza para profissionalizar a
                  comunicação e crescer com consistência —{" "}
                  <span className="text-[#1c1813]">
                    conversa com quem entende de estratégia, não só de post.
                  </span>
                </p>
              </div>
            </div>
          </Reveal>

          <div className="mt-4 grid gap-4 md:grid-cols-3">
            {pains.map((p, i) => (
              <Reveal
                key={p.n}
                delay={i * 90}
                className="rounded-xl border border-[#e0dacb] bg-white/55 p-7 transition-colors duration-300 hover:border-[#c9a24d]"
              >
                <p className="text-sm tracking-wide">
                  <span className="font-semibold text-[#9c7822]">{p.n}</span>
                  <span className="text-[#b6ae9c]"> / </span>
                  <span className="font-semibold text-[#1c1813]">{p.title}</span>
                </p>
                <p className="mt-3 text-sm leading-relaxed text-[#6b6454]">
                  {p.text}
                </p>
              </Reveal>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
