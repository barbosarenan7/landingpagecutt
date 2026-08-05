import { useState } from "react";
import { Link } from "react-router-dom";
import Nav from "../components/Nav";
import Footer from "../components/Footer";
import WhatsAppFloat from "../components/WhatsAppFloat";
import CookieBanner from "../components/CookieBanner";
import { BtnPrimary } from "../components/primitives";
import { Reveal } from "../lib/reveal";
import { Seo } from "../lib/seo";
import { jsonLdServico } from "../lib/rotas";
import dados from "../content/servicos.json";
import { outrosServicos } from "../lib/servicos-menu";

export type Servico = (typeof dados.servicos)[number];

/** Seta ↗ do canto dos cards, igual às seções da home. */
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

/** Acordeão das dúvidas específicas do serviço (mesmo padrão da home). */
function FaqServico({ itens }: { itens: Servico["faq"] }) {
  const [aberta, setAberta] = useState<number | null>(0);
  return (
    <div className="mx-auto mt-10 flex max-w-[52rem] flex-col gap-3">
      {itens.map((item, i) => {
        const aberto = aberta === i;
        return (
          <div key={item.pergunta} className="card-soft !p-0">
            <h3>
              <button
                type="button"
                className="flex w-full cursor-pointer items-start justify-between gap-6 px-6 py-5 text-left md:px-7"
                aria-expanded={aberto}
                aria-controls={`svc-faq-${i}`}
                onClick={() => setAberta(aberto ? null : i)}
              >
                <span className="text-[15px] leading-snug font-bold md:text-base">
                  {item.pergunta}
                </span>
                <span
                  className={`h-sans shrink-0 text-2xl leading-none text-accent transition-transform duration-300 ${
                    aberto ? "rotate-45" : ""
                  }`}
                  aria-hidden
                >
                  +
                </span>
              </button>
            </h3>
            <div
              id={`svc-faq-${i}`}
              className={`grid transition-[grid-template-rows] duration-300 ease-out ${
                aberto ? "grid-rows-[1fr]" : "grid-rows-[0fr]"
              }`}
            >
              <div className="overflow-hidden">
                <p className="text-2nd px-6 pb-6 text-[15px] leading-relaxed md:px-7">
                  {item.resposta}
                </p>
              </div>
            </div>
          </div>
        );
      })}
    </div>
  );
}

/**
 * Página de serviço (ex.: /trafego-pago-volta-redonda). Existe para dar
 * ao Google conteúdo real por serviço + localidade — a home sozinha não
 * ranqueia todos os termos. Layout único alimentado por
 * src/content/servicos.json; as rotas são registradas em App.tsx.
 */
export default function ServicoPage({ servico }: { servico: Servico }) {
  // vem do menu, e não de servicos.json: depois da consolidação de
  // tráfego e social, dois dos serviços viram landing BOFU
  const outros = outrosServicos(servico.slug);

  const jsonLd = jsonLdServico(servico.slug);

  return (
    <>
      <Seo
        title={servico.metaTitulo}
        description={servico.metaDescricao}
        path={`/${servico.slug}`}
        jsonLd={jsonLd}
      />
      <Nav />
      <main id="conteudo">
        {/* cabeçalho */}
        <section className="sec-light pt-[clamp(48px,7vw,96px)] pb-[clamp(48px,6vw,88px)]">
          <div className="container-cut">
            <nav aria-label="Você está em" className="faixa-leitura">
              <ol className="text-2nd flex flex-wrap items-center gap-2 text-[13px]">
                <li>
                  <Link to="/" className="underline underline-offset-4 hover:text-ink-900">
                    Início
                  </Link>
                </li>
                <li aria-hidden>/</li>
                <li aria-current="page">{servico.nome}</li>
              </ol>
            </nav>

            <div className="faixa-leitura mt-8 max-w-[52rem]">
              <p className="eyebrow">{servico.eyebrow}</p>
              <h1 className="mt-5" style={{ fontSize: "var(--fs-h2)" }}>
                <span className="h-serif block">{servico.tituloLinha1}</span>
                <span className="h-sans block">{servico.tituloLinha2}</span>
              </h1>
              <p className="text-2nd mt-6 max-w-[46rem] text-[17px] leading-relaxed">
                {servico.resumo}
              </p>
              <div className="mt-9">
                <BtnPrimary href="/#formulario">Solicitar diagnóstico</BtnPrimary>
              </div>
            </div>
          </div>
        </section>

        {/* introdução */}
        <section className="sec-light pb-[clamp(56px,7vw,104px)]">
          <div className="container-cut">
            <div className="faixa-leitura flex max-w-[46rem] flex-col gap-5">
              {servico.intro.map((p) => (
                <Reveal key={p.slice(0, 24)}>
                  <p className="text-2nd leading-relaxed">{p}</p>
                </Reveal>
              ))}
            </div>
          </div>
        </section>

        {/* entregáveis */}
        <section className="sec-dark section" aria-labelledby="entregaveis-title">
          <div className="container-cut">
            <h2
              id="entregaveis-title"
              className="faixa-leitura max-w-[40rem]"
              style={{ fontSize: "var(--fs-h2)" }}
            >
              <span className="h-serif block">{servico.entregaveisTitulo}</span>
            </h2>
            <div className="mt-12 grid gap-3 md:mt-16 md:grid-cols-2">
              {servico.entregaveis.map((e, i) => (
                <Reveal key={e.titulo} delay={i * 80} className="card-soft card-dif flex flex-col">
                  <Corner />
                  <h3 className="pr-8 text-lg leading-snug font-bold">
                    <span className="step-num mr-2 font-bold text-accent" aria-hidden>
                      {String(i + 1).padStart(2, "0")}.
                    </span>
                    {e.titulo}
                  </h3>
                  <p className="text-2nd mt-2 text-sm leading-relaxed">{e.texto}</p>
                </Reveal>
              ))}
            </div>
          </div>
        </section>

        {/* processo + para quem */}
        <section className="sec-light section">
          <div className="container-cut grid gap-16 lg:grid-cols-12 lg:gap-10">
            <div className="lg:col-span-7">
              <h2 className="faixa-leitura" style={{ fontSize: "var(--fs-h3)" }}>
                <span className="h-sans block">{servico.processoTitulo}</span>
              </h2>
              <ol className="mt-8 flex flex-col">
                {servico.processo.map((p, i) => (
                  <Reveal
                    as="li"
                    key={p.titulo}
                    delay={i * 60}
                    className="faixa-leitura-lista border-t border-line-light py-6"
                  >
                    <span className="step-num text-accent">
                      {String(i + 1).padStart(2, "0")}
                    </span>
                    <h3 className="mt-2 text-lg leading-snug font-bold">{p.titulo}</h3>
                    <p className="text-2nd mt-2 text-[15px] leading-relaxed">{p.texto}</p>
                  </Reveal>
                ))}
              </ol>
            </div>

            <div className="lg:col-span-4 lg:col-start-9">
              <h2 className="faixa-leitura" style={{ fontSize: "var(--fs-h3)" }}>
                <span className="h-sans block">{servico.paraQuemTitulo}</span>
              </h2>
              <ul className="mt-8 flex flex-col">
                {servico.paraQuem.map((p, i) => (
                  <Reveal
                    as="li"
                    key={p}
                    delay={i * 60}
                    className="faixa-leitura-lista border-t border-line-light py-5"
                  >
                    <span className="text-[15px] leading-snug font-medium">{p}</span>
                  </Reveal>
                ))}
              </ul>
            </div>
          </div>
        </section>

        {/* dúvidas do serviço */}
        <section className="sec-light pb-[clamp(88px,11vw,176px)]" aria-labelledby="svc-faq-title">
          <div className="container-cut">
            <div className="faixa-leitura mx-auto max-w-[52rem] text-center">
              <p className="eyebrow mx-auto flex w-fit">Dúvidas</p>
              <h2 id="svc-faq-title" className="mt-6" style={{ fontSize: "var(--fs-h2)" }}>
                <span className="h-serif block">Sobre {servico.nome.toLowerCase()},</span>
                <span className="h-sans block">o que mais perguntam.</span>
              </h2>
            </div>
            <FaqServico itens={servico.faq} />
          </div>
        </section>

        {/* fechamento + outros serviços */}
        <section className="sec-dark section" aria-labelledby="cta-title">
          <div className="container-cut">
            <div className="faixa-leitura mx-auto max-w-[46rem] text-center">
              <h2 id="cta-title" style={{ fontSize: "var(--fs-h2)" }}>
                <span className="h-serif block">Vamos entender o momento</span>
                <span className="h-sans block">da sua empresa.</span>
              </h2>
              <p className="text-2nd mt-6 leading-relaxed">
                Diagnóstico gratuito e sem compromisso. Analisamos onde o
                marketing da sua operação está travando e qual o próximo passo.
              </p>
              <div className="mt-9 flex justify-center">
                <BtnPrimary href="/#formulario">Solicitar diagnóstico</BtnPrimary>
              </div>
            </div>

            <div className="mt-16 border-t border-line-dark pt-10">
              <p className="eyebrow">Outros serviços</p>
              <div className="mt-6 grid gap-3 md:grid-cols-2">
                {outros.map((o) => (
                  <Link key={o.href} to={o.href} className="card-soft card-dif block">
                    <Corner />
                    <h3 className="pr-8 text-lg leading-snug font-bold">{o.nome}</h3>
                    <p className="text-2nd mt-2 text-sm leading-relaxed">{o.resumo}</p>
                  </Link>
                ))}
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
