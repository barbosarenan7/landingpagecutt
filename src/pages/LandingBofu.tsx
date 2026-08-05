import { Link } from "react-router-dom";
import Nav from "../components/Nav";
import Footer from "../components/Footer";
import WhatsAppFloat from "../components/WhatsAppFloat";
import CookieBanner from "../components/CookieBanner";
import ClientesGrid from "../components/ClientesGrid";
import FaqLista from "../components/FaqLista";
import { Blocos, inline } from "../components/BlocosConteudo";
import type { Landing } from "../lib/tipos";
import { BtnPrimary } from "../components/primitives";
import { Reveal } from "../lib/reveal";
import { Seo } from "../lib/seo";
import { metaDaLanding } from "../lib/rotas";
import { site, whatsappHref } from "../config/site";

/**
 * Template das landings BOFU (cidade, segmento e serviço).
 *
 * Segue a estrutura obrigatória de 11 blocos definida no plano. O
 * conteúdo vem de src/content/landings.json; aqui só fica a forma.
 *
 * Reaproveita Nav, Footer, BtnPrimary e Reveal sem alterá-los. O
 * acordeão é a variante `FaqLista`, para não tocar no `Faq.tsx` da home.
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

export default function LandingBofu({ landing: l }: { landing: Landing }) {
  return (
    <>
      <Seo {...metaDaLanding(l.slug)} />
      <Nav />
      <main id="conteudo">
        {/* 1 e 2: H1 + subheadline */}
        <section className="sec-light pt-[clamp(48px,7vw,96px)] pb-[clamp(40px,5vw,72px)]">
          <div className="container-cut">
            <nav aria-label="Você está em" className="faixa-leitura">
              <ol className="text-2nd flex flex-wrap items-center gap-2 text-[13px]">
                <li>
                  <Link to="/" className="underline underline-offset-4 hover:text-ink-900">
                    Início
                  </Link>
                </li>
                <li aria-hidden>/</li>
                <li aria-current="page">{l.titulo}</li>
              </ol>
            </nav>

            <div className="faixa-leitura mt-8 max-w-[52rem]">
              <h1 className="mt-5" style={{ fontSize: "var(--fs-h2)" }}>
                <span className="h-sans block">{l.h1}</span>
              </h1>
              <p className="text-2nd mt-6 max-w-[46rem] text-[17px] leading-relaxed">
                {inline(l.subheadline)}
              </p>
              <div className="mt-9">
                <BtnPrimary href="/#formulario">Solicitar diagnóstico gratuito</BtnPrimary>
              </div>
            </div>
          </div>
        </section>

        {/* 3: prova social */}
        <section className="sec-light pb-[clamp(48px,6vw,88px)]" aria-labelledby="prova">
          <div className="container-cut">
            <h2 id="prova" className="eyebrow">
              {l.provaSocial.titulo}
            </h2>
            <ul className="mt-6 grid gap-3 md:grid-cols-3">
              {l.provaSocial.itens.map((it, i) => (
                <Reveal as="li" key={i} delay={i * 70} className="card-soft card-dif">
                  <p className="text-[15px] leading-relaxed font-medium">{inline(it)}</p>
                </Reveal>
              ))}
            </ul>
          </div>
        </section>

        {/* 3b: as mesmas logos da home, sem lista paralela para manter */}
        <ClientesGrid />

        {/* 4: a dor */}
        <section className="sec-dark section" aria-labelledby="dor">
          <div className="container-cut">
            <div className="faixa-leitura max-w-[46rem]">
              <h2 id="dor" style={{ fontSize: "var(--fs-h3)" }}>
                <span className="h-sans block">{l.dor.titulo}</span>
              </h2>
              {l.dor.paragrafos.map((p, i) => (
                <p key={i} className="text-2nd mt-5 leading-relaxed">
                  {inline(p)}
                </p>
              ))}
            </div>
          </div>
        </section>

        {/* 5: o que a Cut entrega */}
        <section className="sec-light section" aria-labelledby="entrega">
          <div className="container-cut">
            <h2 id="entrega" className="faixa-leitura max-w-[40rem]" style={{ fontSize: "var(--fs-h3)" }}>
              <span className="h-sans block">{l.entrega.titulo}</span>
            </h2>
            <div className="mt-10 grid gap-3 md:grid-cols-2">
              {l.entrega.itens.map((e, i) => (
                <Reveal key={e.titulo} delay={i * 70} className="card-soft card-dif flex flex-col">
                  <Corner />
                  <h3 className="pr-8 text-lg leading-snug font-bold">
                    <span className="step-num mr-2 font-bold text-accent" aria-hidden>
                      {String(i + 1).padStart(2, "0")}.
                    </span>
                    {e.titulo}
                  </h3>
                  <p className="text-2nd mt-2 text-sm leading-relaxed">{inline(e.texto)}</p>
                </Reveal>
              ))}
            </div>
          </div>
        </section>

        {/* 6: método */}
        <section className="sec-light pb-[clamp(72px,9vw,140px)]" aria-labelledby="metodo">
          <div className="container-cut">
            <h2 id="metodo" className="faixa-leitura max-w-[40rem]" style={{ fontSize: "var(--fs-h3)" }}>
              <span className="h-sans block">{l.metodo.titulo}</span>
            </h2>
            <ol className="mt-8 flex flex-col lg:max-w-[52rem]">
              {l.metodo.etapas.map((et, i) => (
                <Reveal
                  as="li"
                  key={et.nome}
                  delay={i * 55}
                  className="faixa-leitura-lista border-t border-line-light py-6"
                >
                  <span className="step-num text-accent">{String(i + 1).padStart(2, "0")}</span>
                  <p className="eyebrow mt-3 flex w-fit">{et.fase}</p>
                  <h3 className="mt-2 text-lg leading-snug font-bold">{et.nome}</h3>
                  <p className="text-2nd mt-2 text-[15px] leading-relaxed">{inline(et.texto)}</p>
                </Reveal>
              ))}
            </ol>
          </div>
        </section>

        {/* 7: case. Peça sem case real não mostra a seção: melhor faltar
            do que inventar cliente ou deixar aviso interno na página. */}
        {l.caseReal && (
          <section className="sec-dark section" aria-labelledby="case">
            <div className="container-cut">
              <div className="faixa-leitura max-w-[46rem]">
                <h2 id="case" style={{ fontSize: "var(--fs-h3)" }}>
                  <span className="h-sans block">{l.caseReal.titulo}</span>
                </h2>
                {l.caseReal.paragrafos.map((p, i) => (
                  <p key={i} className="text-2nd mt-5 leading-relaxed">
                    {inline(p)}
                  </p>
                ))}
              </div>
            </div>
          </section>
        )}

        {/* 8: local com produção própria x agência de fora */}
        <section className="sec-light section" aria-labelledby="local">
          <div className="container-cut">
            <div className="faixa-leitura mx-auto max-w-[46rem]">
              <h2 id="local" style={{ fontSize: "var(--fs-h3)" }}>
                <span className="h-sans block">{l.porqueLocal.titulo}</span>
              </h2>
              <Blocos blocos={l.porqueLocal.blocos} />
            </div>
          </div>
        </section>

        {/* 9: FAQ */}
        <section className="sec-light pb-[clamp(72px,9vw,140px)]" aria-labelledby="faq-landing">
          <div className="container-cut">
            <div className="faixa-leitura mx-auto max-w-[52rem]">
              <h2 id="faq-landing" style={{ fontSize: "var(--fs-h3)" }}>
                <span className="h-sans block">Perguntas frequentes</span>
              </h2>
              <FaqLista itens={l.faq} idBase="faq-landing" />
            </div>
          </div>
        </section>

        {/* 10 e 11: CTA final, região e contato */}
        <section className="sec-dark section" aria-labelledby="cta-final">
          <div className="container-cut">
            <div className="faixa-leitura mx-auto max-w-[46rem] text-center">
              <h2 id="cta-final" style={{ fontSize: "var(--fs-h2)" }}>
                <span className="h-sans block">{l.ctaFinal.titulo}</span>
              </h2>
              <p className="text-2nd mt-6 leading-relaxed">{inline(l.ctaFinal.texto)}</p>
              <div className="mt-9 flex justify-center">
                <BtnPrimary href="/#formulario">Solicitar diagnóstico gratuito</BtnPrimary>
              </div>
              {/* 11: região atendida e formas de contato */}
              <div className="mt-12 border-t border-line-dark pt-8 text-sm leading-relaxed text-text3">
                <p>{site.region}</p>
                <p className="mt-3">
                  WhatsApp{" "}
                  <a
                    href={whatsappHref()}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="underline underline-offset-4"
                  >
                    (24) 99269-7807
                  </a>{" "}
                  e e-mail{" "}
                  <a href={`mailto:${site.email}`} className="underline underline-offset-4">
                    {site.email}
                  </a>
                </p>
                <p className="mt-3">{site.address}</p>
              </div>
            </div>
          </div>
        </section>
      </main>
      <Footer />
      <WhatsAppFloat />
      <CookieBanner />
    </>
  );
}
