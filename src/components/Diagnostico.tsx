import { Reveal } from "../lib/reveal";
import { Media } from "./primitives";
import LeadForm from "./LeadForm";
import content from "../content/site.json";

const dg = content.diagnostico;

/**
 * Solicite ref. "sign-up split": card grande dividido em dois painéis.
 * Esquerda: arte do símbolo do grupo como fundo com scrim + título e
 * benefícios. Direita: formulário escuro com inputs em caixa e botão
 * branco. Slot: logo-grupo (arte real em public/logo-grupo.png).
 */
function Check() {
  return (
    <svg
      width="14"
      height="11"
      viewBox="0 0 14 11"
      fill="none"
      aria-hidden
      className="mt-1.5 shrink-0 text-accent"
    >
      <path
        d="M1 5.5L5 9.5 13 1"
        stroke="currentColor"
        strokeWidth="1.8"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
}

export default function Diagnostico() {
  return (
    <section
      id="diagnostico"
      data-section="diagnostico"
      className="sec-dark section"
      aria-labelledby="diag-title"
    >
      <div className="container-cut">
        <Reveal>
          <div className="grid overflow-hidden rounded-card border border-line-dark lg:grid-cols-2">
            {/* painel esquerdo: arte do símbolo do grupo + conteúdo.
                A arte é pronta (já escura), então fica sem dessaturação e
                expandida para cobrir todo o painel; o scrim leve garante
                a leitura do texto por cima. */}
            <div className="relative flex flex-col p-7 md:p-10">
              <Media
                file="logo-grupo.png"
                src={dg.imagem}
                alt="Símbolo da Cut Creative sobre fundo escuro texturizado"
                width={1080}
                height={1080}
                className="absolute inset-0 h-full !rounded-none [&_img]:filter-none"
              />
              <div
                className="absolute inset-0"
                aria-hidden
                style={{
                  background:
                    "linear-gradient(to top, rgba(11,11,11,.85) 0%, rgba(11,11,11,.5) 55%, rgba(11,11,11,.3) 100%)",
                }}
              />

              <div className="relative z-10 flex h-full flex-col">
                <p className="eyebrow">{dg.eyebrow}</p>
                <h2 id="diag-title" className="mt-6" style={{ fontSize: "var(--fs-h2)" }}>
                  <span className="h-serif block">{dg.tituloLinha1}</span>
                  <span className="h-sans block">{dg.tituloLinha2}</span>
                </h2>
                <p className="mt-6 max-w-md text-[15px] leading-relaxed text-paper-50/85">
                  {dg.texto}
                </p>

                {/* no desktop os benefícios descem para a base da foto
                    (mt-auto), deixando o título respirando no topo; no
                    celular seguem logo abaixo do texto */}
                <ul className="mt-7 flex max-w-md flex-col gap-2.5 lg:mt-auto lg:pt-12">
                  {dg.beneficios.map((b) => (
                    <li
                      key={b}
                      className="flex items-start gap-3 text-sm leading-relaxed text-paper-50/85"
                    >
                      <Check />
                      {b}
                    </li>
                  ))}
                </ul>

              </div>
            </div>

            {/* painel direito: formulário escuro. O id #formulario vive no
                <form> lá dentro (LeadForm): a âncora dos CTAs é
                #diagnostico, no topo da oferta, e #formulario existe só
                como gancho de rastreamento. */}
            <div className="bg-ink-900 p-7 md:p-10 lg:border-l lg:border-line-dark">
              <LeadForm />
            </div>
          </div>
        </Reveal>

        <Reveal delay={120}>
          <p className="faixa-leitura mx-auto mt-8 max-w-3xl text-center text-sm leading-relaxed text-text3">
            {dg.regiao}
          </p>
        </Reveal>
      </div>
    </section>
  );
}
