import { Reveal } from "../lib/reveal";
import { Media } from "./primitives";
import content from "../content/site.json";

const d = content.dorReal;

/**
 * A dor real ref. "FUTURE": título fantasma atrás, cards cinza suaves
 * em três colunas com seta ↗ no canto, imagem central em retrato e
 * lista com hairlines no estilo linhas de dado.
 * Slot: dor-central.webp (3:4).
 */
function Corner() {
  return (
    <span className="card-corner" aria-hidden>
      <svg width="11" height="11" viewBox="0 0 11 11" fill="none">
        <path
          d="M2 9L9 2M9 2H3.5M9 2v5.5"
          stroke="currentColor"
          strokeWidth="1.3"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
      </svg>
    </span>
  );
}

export default function DorReal() {
  return (
    <section
      id="como-trabalhamos"
      className="sec-light relative overflow-hidden pb-16 lg:pb-20"
      aria-labelledby="dor-title"
    >
      {/* título fantasma (ref FUTURE) — só "DOR" recebe o acento laranja */}
      <p
        className="ghost-title absolute inset-x-0 top-[clamp(16px,2vw,32px)]"
        style={{ fontSize: "clamp(3rem, 9vw, 8.5rem)" }}
        aria-hidden
      >
        A <span style={{ color: "var(--color-accent)" }}>dor</span> real
      </p>

      {/* pt = (topo da seção anterior) + 2×(top do fantasma) + altura do
          fantasma → distância acima do título == distância abaixo dele */}
      <div
        className="container-cut relative"
        style={{
          paddingTop:
            "calc(clamp(40px,5vw,72px) + 2 * clamp(16px,2vw,32px) + clamp(3rem,9vw,8.5rem))",
        }}
      >
        <div className="grid gap-3 md:grid-cols-2 lg:grid-cols-12">
          {/* coluna 1: headline + texto */}
          <div className="flex flex-col gap-3 lg:col-span-4">
            <Reveal className="card-soft">
              <Corner />
              <p className="eyebrow">{d.eyebrow}</p>
              <h2 id="dor-title" className="mt-6 pr-8 text-[26px] leading-snug font-bold text-balance">
                {d.titulo}
              </h2>
            </Reveal>
            <Reveal delay={90} className="card-soft flex-1">
              <Corner />
              <p className="text-2nd pr-8 text-[15px] leading-relaxed">
                {d.texto}
              </p>
              <p className="h-sans mt-8" style={{ fontSize: "clamp(3rem, 4.5vw, 4.5rem)" }}>
                {d.statNumero}
                <span className="text-accent">×</span>
              </p>
              <p className="mt-2 text-sm text-text2-light">{d.statLabel}</p>
            </Reveal>
          </div>

          {/* coluna 2: imagem central em retrato */}
          <Reveal delay={120} className="lg:col-span-4">
            <Media
              file="dor-central.webp"
              src={d.imagem}
              alt="Pessoa empreendedora sobrecarregada diante do próprio negócio"
              ratio="3 / 4"
              hover
              className="h-full"
            />
          </Reveal>

          {/* coluna 3: os seis sinais em linhas com hairline */}
          <Reveal delay={160} className="card-soft lg:col-span-4">
            <Corner />
            <p className="eyebrow">{d.sinaisTitulo}</p>
            <ul className="mt-6">
              {d.sinais.map((p, i) => (
                <li
                  key={p}
                  className="flex items-baseline justify-between gap-4 border-b border-line-light py-4 last:border-b-0"
                >
                  <span className="text-[15px] leading-snug font-medium">{p}</span>
                  <span className="step-num shrink-0 text-text3">
                    {String(i + 1).padStart(2, "0")}
                  </span>
                </li>
              ))}
            </ul>
          </Reveal>
        </div>

        <Reveal delay={120} className="mt-16 lg:mt-20">
          <p className="pull-quote">{d.fraseTransicao}</p>
        </Reveal>
      </div>
    </section>
  );
}
