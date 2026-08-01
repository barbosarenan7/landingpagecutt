import { Reveal } from "../lib/reveal";
import { site } from "../config/site";

/**
 * Layout pronto desde a v1 (briefing 5.3). Conteúdo abaixo é PLACEHOLDER —
 * substituir pelas melhores respostas abertas do CUT NPS, com nome/empresa
 * autorizados ([CONFIRMAR]).
 */
const placeholders = [
  {
    quote:
      "[PLACEHOLDER — resposta real do CUT NPS entra aqui após autorização do cliente.]",
    name: "Nome do cliente",
    role: "Cargo — Empresa",
  },
  {
    quote:
      "[PLACEHOLDER — resposta real do CUT NPS entra aqui após autorização do cliente.]",
    name: "Nome do cliente",
    role: "Cargo — Empresa",
  },
  {
    quote:
      "[PLACEHOLDER — resposta real do CUT NPS entra aqui após autorização do cliente.]",
    name: "Nome do cliente",
    role: "Cargo — Empresa",
  },
];

export default function Depoimentos() {
  if (!site.showTestimonialPlaceholders) return null;
  return (
    <section id="depoimentos" className="border-t border-line py-24 md:py-32">
      <div className="mx-auto max-w-7xl px-5 md:px-8">
        <Reveal>
          <p className="eyebrow text-gold">Quem já está dentro</p>
        </Reveal>
        <Reveal delay={80}>
          <h2 className="display mt-4 text-4xl sm:text-5xl lg:text-6xl">
            Quem contratou, <em className="serif-accent text-gold">recomenda.</em>
          </h2>
        </Reveal>

        <div className="mt-14 grid gap-8 md:grid-cols-3">
          {placeholders.map((t, i) => (
            <Reveal
              as="blockquote"
              key={i}
              delay={i * 90}
              className="flex flex-col border-t-2 border-gold pt-6"
            >
              <span className="serif-accent text-5xl leading-none text-gold" aria-hidden>
                “
              </span>
              <p className="mt-2 leading-relaxed text-mute italic">{t.quote}</p>
              <footer className="mt-6">
                <p className="display text-sm">{t.name}</p>
                <p className="eyebrow mt-1 text-mute-2">{t.role}</p>
              </footer>
            </Reveal>
          ))}
        </div>

        <Reveal delay={120}>
          <p className="mt-10 text-sm text-mute-2">
            Depoimentos coletados pelo CUT NPS — o sistema próprio de satisfação
            que a Cut roda com todos os clientes ativos.
          </p>
        </Reveal>
      </div>
    </section>
  );
}
