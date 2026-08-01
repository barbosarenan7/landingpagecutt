import { Reveal } from "../lib/reveal";
import { Media } from "./primitives";
import content from "../content/site.json";

const p = content.provaSocial;

/**
 * Prova social ref. bento "Perplexity": headline com 2ª linha cinza,
 * card alto 01/ à esquerda, card largo 02/ no topo, card escuro 03/
 * com CTA e card 04/ com número grande.
 * Slots: prova-01.webp (3:4), prova-02.webp (largo), prova-04.webp (4:3).
 */
export default function ProvaSocial() {
  return (
    <section className="sec-light py-[clamp(40px,5vw,72px)]" aria-labelledby="prova-title">
      <div className="container-cut">
        <h2 id="prova-title" className="font-bold" style={{ fontSize: "var(--fs-h2)", lineHeight: 1.15 }}>
          <span className="block">{p.tituloLinha1}</span>
          <span className="block text-text2-light">{p.tituloLinha2}</span>
        </h2>

        <div className="mt-12 grid gap-3 lg:grid-cols-12">
          {/* 01 — card alto ocupando as duas linhas da grade (a grade
              define a altura; ratio só no mobile, onde não há linhas) */}
          <Reveal className="lg:col-span-4 lg:row-span-2">
            <Media
              file="prova-01.webp"
              src={p.card01Imagem}
              alt="Retrato de uma pessoa empreendedora no seu negócio local"
              hover
              className="aspect-[3/4] h-full lg:aspect-auto"
            >
              <div className="absolute inset-x-0 top-0 flex justify-between p-5 text-paper-50/85">
                <span className="bento-tag">01/</span>
                <span className="bento-tag">{p.card01Tag}</span>
              </div>
              <div
                className="absolute inset-x-0 bottom-0 p-6 pt-24"
                style={{
                  background: "linear-gradient(to top, rgba(11,11,11,.78), transparent 55%)",
                }}
              >
                <p className="text-xl leading-snug font-bold text-paper-50">
                  {p.card01Titulo}
                </p>
                <p className="mt-3 border-t border-paper-50/25 pt-3 text-[13px] leading-relaxed text-paper-50/80">
                  {p.card01Texto}
                </p>
              </div>
            </Media>
          </Reveal>

          {/* 02 — card largo com título sobre a imagem */}
          <Reveal delay={90} className="lg:col-span-8">
            <Media
              file="prova-02.webp"
              src={p.card02Imagem}
              alt="Ambiente de trabalho de uma empresa da região em operação"
              ratio="21 / 9"
              hover
            >
              <div
                className="absolute inset-0 flex items-start justify-between p-6"
                style={{
                  background: "linear-gradient(to bottom, rgba(11,11,11,.55), transparent 55%)",
                }}
              >
                <p className="text-2xl font-bold text-paper-50 md:text-3xl">
                  {p.card02Titulo}
                </p>
                <span className="bento-tag text-paper-50/85">02/</span>
              </div>
            </Media>
          </Reveal>

          {/* 03 — card escuro com o texto e CTA */}
          <Reveal delay={140} className="lg:col-span-4">
            <div className="flex h-full flex-col rounded-media bg-ink-900 p-7 text-paper-50">
              <div className="flex justify-between text-text2-dark">
                <span className="bento-tag">{p.card03Tag}</span>
                <span className="bento-tag">03/</span>
              </div>
              <p className="mt-5 text-[15px] leading-relaxed text-paper-50/90">
                {p.card03Texto}
              </p>
              <div className="mt-auto pt-7">
                <a href="#diagnostico" className="btn-white">
                  {p.card03Cta}
                </a>
              </div>
            </div>
          </Reveal>

          {/* 04 — card com número grande sobre imagem */}
          <Reveal delay={190} className="lg:col-span-4">
            <Media
              file="prova-04.webp"
              src={p.card04Imagem}
              alt="Detalhe do estúdio da Cut Creative"
              hover
              className="aspect-[4/3] h-full lg:aspect-auto"
            >
              <div
                className="absolute inset-0 flex flex-col p-6"
                style={{
                  background: "linear-gradient(to top, rgba(11,11,11,.7), rgba(11,11,11,.25))",
                }}
              >
                <div className="flex justify-between text-paper-50/85">
                  <span className="bento-tag">04/</span>
                  <span className="bento-tag">{p.card04Tag}</span>
                </div>
                <p
                  className="h-sans my-auto text-center text-paper-50"
                  style={{ fontSize: "clamp(4rem, 7vw, 6.5rem)" }}
                >
                  {p.card04Numero}
                </p>
                <p className="text-center text-[13px] text-paper-50/85">
                  {p.card04Label}
                </p>
              </div>
            </Media>
          </Reveal>
        </div>
      </div>
    </section>
  );
}
