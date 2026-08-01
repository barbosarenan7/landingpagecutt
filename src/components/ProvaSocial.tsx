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
          {/* 01 — card alto ocupando as duas linhas da grade. No desktop a
              mídia é absoluta para a foto não inflar a altura das linhas
              (mantém o gap uniforme de 12px entre todos os cards) */}
          <Reveal className="lg:relative lg:col-span-4 lg:row-span-2">
            <Media
              file="prova-01.webp"
              src={p.card01Imagem}
              alt="Equipe da Cut Creative no estúdio — capa do vídeo institucional"
              hover
              className="aspect-[3/4] h-full lg:absolute lg:inset-0 lg:aspect-auto"
            >
              {/* escurecimento leve para o botão de play (vídeo futuro) */}
              <div className="absolute inset-0 bg-ink-900/35" aria-hidden />
              <div className="absolute inset-x-0 top-0 flex justify-between p-5 text-paper-50/85">
                <span className="bento-tag">01/</span>
                <span className="bento-tag">{p.card01Tag}</span>
              </div>
              {/* ícone de play centralizado */}
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
              className="[&_img]:filter-none"
            >
              <div
                className="absolute inset-0 flex items-start justify-between p-6"
                style={{
                  background: "linear-gradient(to bottom, rgba(11,11,11,.4), transparent 40%)",
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

          {/* 04 — arte pronta do cliente, mesma largura do 03, cores
              originais (sem dessaturação) e preenchendo a célula */}
          <Reveal delay={190} className="lg:col-span-4">
            <Media
              file="prova-04.webp"
              src={p.card04Imagem}
              alt="+300 marcas atendidas — estratégia, criação e resultados reais"
              className="aspect-square h-full [&_img]:filter-none lg:aspect-auto"
            />
          </Reveal>
        </div>
      </div>
    </section>
  );
}
