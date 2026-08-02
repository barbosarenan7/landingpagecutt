import { Reveal } from "../lib/reveal";
import content from "../content/site.json";

const df = content.diferenciais;

/**
 * Diferenciais — entre o Método e o Diagnóstico. Reaproveita a linguagem
 * já existente na página: par tipográfico serifa/sans dos títulos de
 * seção, cards `.card-soft` e a seta de canto `.card-corner` da seção
 * "A dor real". Nenhuma cor, fonte ou classe nova.
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

export default function Diferenciais() {
  return (
    <section
      id="diferenciais"
      className="sec-light pb-[clamp(88px,11vw,176px)]"
      aria-labelledby="dif-title"
    >
      <div className="container-cut">
        <div className="faixa-leitura mx-auto max-w-[60rem] text-center">
          <Reveal>
            <p className="eyebrow mx-auto flex w-fit">{df.eyebrow}</p>
          </Reveal>
          <h2 id="dif-title" className="mt-6" style={{ fontSize: "var(--fs-h2)" }}>
            <span className="h-serif block">{df.tituloLinha1}</span>
            <span className="h-sans block">{df.tituloLinha2}</span>
          </h2>
        </div>

        <div className="mt-12 grid gap-3 md:mt-16 md:grid-cols-2 lg:grid-cols-4">
          {df.itens.map((item, i) => (
            <Reveal
              key={item.titulo}
              delay={i * 90}
              className="card-soft card-dif flex flex-col"
            >
              <Corner />
              {/* no celular o número entra na mesma linha do título, o que
                  encurta o card; de lg pra cima volta a ser uma linha
                  própria acima dele */}
              <span className="step-num hidden text-text3 lg:block" aria-hidden>
                {String(i + 1).padStart(2, "0")}
              </span>
              <h3 className="pr-8 text-lg leading-snug font-bold lg:mt-6">
                <span className="step-num mr-2 text-text3 lg:hidden" aria-hidden>
                  {String(i + 1).padStart(2, "0")}.
                </span>
                {item.titulo}
              </h3>
              <p className="text-2nd mt-2 text-sm leading-relaxed lg:mt-3">
                {item.texto}
              </p>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}
