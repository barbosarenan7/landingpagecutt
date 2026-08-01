import { Reveal } from "../lib/reveal";
import { Media } from "./primitives";
import LeadForm from "./LeadForm";
import content from "../content/site.json";

const dg = content.diagnostico;
/** O 1º chip fica destacado (ativo); os demais, discretos. */
const chips = dg.chips.map((c, i) => ({ ...c, active: i === 0 }));

/**
 * Solicite ref. "sign-up split": card grande dividido em dois painéis.
 * Esquerda: foto da equipe como fundo com scrim + título, benefícios e
 * chips de etapas 1-2-3. Direita: formulário escuro com inputs em caixa
 * e botão branco. Slot: team-g4 (foto real em public/team-g4.jpg).
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
    <section id="diagnostico" className="sec-dark section" aria-labelledby="diag-title">
      <div className="container-cut">
        <Reveal>
          <div className="grid overflow-hidden rounded-card border border-line-dark lg:grid-cols-2">
            {/* painel esquerdo: foto da equipe + conteúdo */}
            <div className="relative flex flex-col p-7 md:p-10">
              <Media
                file="team-g4.webp"
                src={dg.imagem}
                alt="Equipe da Cut Creative reunida no estúdio, no evento G4 Advisor"
                width={1400}
                height={875}
                className="absolute inset-0 h-full !rounded-none"
              />
              <div
                className="absolute inset-0"
                aria-hidden
                style={{
                  background:
                    "linear-gradient(to top, rgba(11,11,11,.92) 0%, rgba(11,11,11,.62) 55%, rgba(11,11,11,.42) 100%)",
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

                <ul className="mt-7 flex max-w-md flex-col gap-2.5">
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

                <p
                  className="h-serif mt-10 max-w-md text-paper-50"
                  style={{ fontSize: "clamp(1.5rem, 2.2vw, 2rem)", lineHeight: 1.15 }}
                >
                  {dg.frase}
                </p>

                {/* chips de etapas (ref sign-up) */}
                <div className="mt-auto grid grid-cols-3 gap-3 pt-12">
                  {chips.map((c) => (
                    <div
                      key={c.n}
                      className={`rounded-cardmd p-4 ${
                        c.active
                          ? "bg-paper-0 text-ink-900"
                          : "bg-paper-0/10 text-paper-50 backdrop-blur-sm"
                      }`}
                    >
                      <span
                        className={`flex h-6 w-6 items-center justify-center rounded-pill text-xs font-bold ${
                          c.active ? "bg-ink-900 text-paper-0" : "bg-paper-0/20 text-paper-50"
                        }`}
                        aria-hidden
                      >
                        {c.n}
                      </span>
                      <p className="mt-3 text-[13px] leading-snug font-medium">{c.label}</p>
                      {/* c.label vem de src/content/site.json → diagnostico.chips */}
                    </div>
                  ))}
                </div>
              </div>
            </div>

            {/* painel direito: formulário escuro */}
            <div className="bg-ink-900 p-7 md:p-10 lg:border-l lg:border-line-dark">
              <LeadForm />
            </div>
          </div>
        </Reveal>

        <Reveal delay={120}>
          <p className="mx-auto mt-8 max-w-3xl text-center text-sm leading-relaxed text-text3">
            {dg.regiao}
          </p>
        </Reveal>
      </div>
    </section>
  );
}
