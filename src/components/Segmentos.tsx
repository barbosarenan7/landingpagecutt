import { Reveal } from "../lib/reveal";
import { BtnPrimary, Media } from "./primitives";
import content from "../content/site.json";

const seg = content.segmentos;

/** Estética fixa de cada card (inclinação, arquivo do slot, alt). O texto
 *  e as imagens vêm de src/content/site.json → "segmentos". */
const style = [
  { file: "seg-saude.webp", alt: "Médica de jaleco branco em corredor de clínica minimalista", tilt: "tilt-l", lift: "" },
  { file: "seg-b2b.webp", alt: "Chão de fábrica de indústria em operação, com equipe técnica", tilt: "", lift: "md:-translate-y-8" },
  { file: "seg-food.webp", alt: "Chef finalizando um prato em cozinha de restaurante em movimento", tilt: "tilt-r", lift: "" },
  { file: "seg-servicos.webp", alt: "Profissional em escritório de serviços especializados durante reunião", tilt: "", lift: "md:-translate-y-8" },
];

const segments = seg.cards.map((c, i) => ({ ...c, ...style[i] }));

export default function Segmentos() {
  return (
    <section id="segmentos" className="sec-dark section" aria-labelledby="seg-title">
      <div className="container-cut">
        <div className="mx-auto max-w-[60rem] text-center">
          <h2 id="seg-title" style={{ fontSize: "var(--fs-h2)" }}>
            <span className="h-serif block">{seg.tituloLinha1}</span>
            <span className="h-sans block">{seg.tituloLinha2}</span>
          </h2>
          <Reveal delay={120}>
            <p className="text-2nd mx-auto mt-6 max-w-[46rem] leading-relaxed">
              {seg.texto}
            </p>
          </Reveal>
        </div>

        <div className="mt-16 grid gap-8 md:mt-24 md:grid-cols-2 lg:grid-cols-4">
          {segments.map((s, i) => (
            <Reveal key={s.titulo} delay={i * 90} className={`${s.tilt} ${s.lift}`}>
              <Media file={s.file} src={s.imagem} alt={s.alt} ratio="3 / 4" hover>
                <span className="badge badge-light absolute top-4 left-4">{s.badge}</span>
                <div
                  className="absolute inset-x-0 bottom-0 p-6 pt-24"
                  style={{
                    background:
                      "linear-gradient(to top, rgba(11,11,11,.78), transparent 55%)",
                  }}
                >
                  <h3 className="text-lg font-bold text-paper-50">{s.titulo}</h3>
                  <p className="mt-2 text-[13px] leading-relaxed text-paper-50/85">
                    {s.texto}
                  </p>
                </div>
              </Media>
            </Reveal>
          ))}
        </div>

        <Reveal delay={120} className="mt-16 flex justify-center md:mt-20">
          <BtnPrimary href="#diagnostico">{seg.cta}</BtnPrimary>
        </Reveal>
      </div>
    </section>
  );
}
