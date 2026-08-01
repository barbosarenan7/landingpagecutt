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
        {/* título na fonte do logotipo (h-sans), centralizado, com a
            palavra de destaque no acento */}
        <h2
          id="prova-title"
          className="h-sans mx-auto max-w-[20ch] text-center text-balance"
          style={{ fontSize: "var(--fs-h2)" }}
        >
          {p.tituloAntes} <span className="text-accent">{p.tituloDestaque}</span>{" "}
          {p.tituloDepois}
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

          {/* 02 — arte com a informação já embutida; sem título por cima */}
          <Reveal delay={90} className="lg:col-span-8">
            <Media
              file="prova-02.webp"
              src={p.card02Imagem}
              alt="Estúdio da Cut Creative: mais de 30 colaboradores, 5 anos no mercado e atendimento nacional"
              ratio="21 / 9"
              hover
              className="[&_img]:filter-none"
            >
              <div className="absolute inset-x-0 top-0 flex justify-end p-6">
                <span className="bento-tag text-paper-50/85">02/</span>
              </div>
            </Media>
          </Reveal>

          {/* 03 — card em vidro fumê: base escura em degradê, reflexo no
              topo, brilho de acento difuso no canto e hairline de borda.
              O conteúdo fica acima das camadas, com contraste preservado. */}
          <Reveal delay={140} className="lg:col-span-4">
            <div className="relative flex h-full flex-col overflow-hidden rounded-media border border-paper-50/10 p-7 text-paper-50 backdrop-blur-xl">
              <div
                className="absolute inset-0 bg-gradient-to-br from-ink-700 via-ink-900 to-ink-900"
                aria-hidden
              />
              <div
                className="absolute inset-0 bg-gradient-to-b from-paper-50/[0.08] via-transparent to-transparent"
                aria-hidden
              />
              <div
                className="absolute -top-20 -right-20 h-56 w-56 rounded-pill bg-accent/15 blur-3xl"
                aria-hidden
              />

              <div className="relative flex h-full flex-col">
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
            </div>
          </Reveal>

          {/* 04 — arte pronta do cliente preenchendo o card inteiro
              (object-cover), cores originais e o mesmo hover dos demais */}
          <Reveal delay={190} className="lg:col-span-4">
            <Media
              file="prova-04.webp"
              src={p.card04Imagem}
              alt="+300 marcas atendidas — estratégia, criação e resultados reais"
              hover
              className="aspect-square h-full [&_img]:filter-none lg:aspect-auto"
            />
          </Reveal>
        </div>
      </div>
    </section>
  );
}
