import { useState } from "react";
import { Reveal } from "../lib/reveal";
import content from "../content/site.json";

const fq = content.faq;

/**
 * Perguntas frequentes — mesma linguagem das outras seções claras
 * (par serifa/sans no título, cards `.card-soft`, acento no "+").
 * Além de responder objeções antes do formulário, alimenta o schema
 * FAQPage da home (ver Home.tsx), que o Google pode exibir como
 * resultado rico na busca.
 */
export default function Faq() {
  const [aberta, setAberta] = useState<number | null>(0);

  return (
    <section
      id="faq"
      className="sec-dark section"
      aria-labelledby="faq-title"
    >
      <div className="container-cut">
        <div className="faixa-leitura mx-auto max-w-[60rem] text-center">
          <Reveal>
            <p className="eyebrow mx-auto flex w-fit">{fq.eyebrow}</p>
          </Reveal>
          <h2 id="faq-title" className="mt-6" style={{ fontSize: "var(--fs-h2)" }}>
            <span className="h-serif block">{fq.tituloLinha1}</span>
            <span className="h-sans block">{fq.tituloLinha2}</span>
          </h2>
        </div>

        <div className="mx-auto mt-12 flex max-w-[52rem] flex-col gap-3 md:mt-16">
          {fq.itens.map((item, i) => {
            const aberto = aberta === i;
            return (
              <Reveal key={item.pergunta} delay={i * 60} className="card-soft !p-0">
                <h3>
                  <button
                    type="button"
                    className="flex w-full cursor-pointer items-start justify-between gap-6 px-6 py-5 text-left md:px-7"
                    aria-expanded={aberto}
                    aria-controls={`faq-painel-${i}`}
                    onClick={() => setAberta(aberto ? null : i)}
                  >
                    <span className="text-[15px] leading-snug font-bold md:text-base">
                      {item.pergunta}
                    </span>
                    {/* chevron comunica "abre para baixo" melhor que o +,
                        que era lido como ícone decorativo */}
                    <span
                      className={`flex h-7 w-7 shrink-0 items-center justify-center rounded-pill border border-line text-accent transition-transform duration-300 ${
                        aberto ? "rotate-180" : ""
                      }`}
                      aria-hidden
                    >
                      <svg width="11" height="7" viewBox="0 0 11 7" fill="none">
                        <path
                          d="M1 1l4.5 4.5L10 1"
                          stroke="currentColor"
                          strokeWidth="1.8"
                          strokeLinecap="round"
                          strokeLinejoin="round"
                        />
                      </svg>
                    </span>
                  </button>
                </h3>
                <div
                  id={`faq-painel-${i}`}
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
              </Reveal>
            );
          })}
        </div>
      </div>
    </section>
  );
}
