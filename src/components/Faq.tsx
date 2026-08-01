import { useState } from "react";
import { Reveal } from "../lib/reveal";

const faqs = [
  {
    q: "Já tive agência e não deu resultado. Por que com vocês seria diferente?",
    a: "Porque aqui a execução só começa depois do diagnóstico. Você recebe estratégia documentada, relatórios mensais, calls de acompanhamento e um portal onde acompanha tudo — calendário, aprovações e jornada. Método não é promessa: é processo que você consegue ver.",
  },
  {
    q: "Quanto custa?",
    a: "Depende do diagnóstico. Os planos variam por escopo — tráfego, social media, audiovisual ou a operação completa. Por isso a primeira conversa é gratuita e sem compromisso: primeiro entendemos o negócio, depois falamos de investimento.",
  },
  {
    q: "Em quanto tempo vejo resultado?",
    a: "Honestidade: organização e consistência aparecem nas primeiras semanas. Demanda qualificada vem conforme estratégia e verba de mídia. Quem promete resultado mágico em 7 dias está vendendo o que não controla.",
  },
  {
    q: "Preciso aparecer nos vídeos?",
    a: "Não obrigatoriamente. A direção criativa encontra o formato certo para cada negócio — tem marca que pede rosto, tem marca que pede produto, ambiente ou equipe.",
  },
  {
    q: "Vocês atendem minha cidade?",
    a: "Presencialmente: Volta Redonda, Barra Mansa, Resende, Angra dos Reis e região. Fora da região, atendemos via assessoria estratégica remota — o método completo, à distância.",
  },
];

export default function Faq() {
  const [openIndex, setOpenIndex] = useState<number | null>(0);

  return (
    <section id="faq" className="border-t border-line py-24 md:py-36">
      <div className="mx-auto max-w-3xl px-5 md:px-8">
        <Reveal>
          <p className="eyebrow text-gold">Antes de fechar</p>
        </Reveal>
        <Reveal delay={80}>
          <h2 className="display mt-6 text-3xl text-cream sm:text-4xl">
            Perguntas que todo empresário faz antes de fechar.
          </h2>
        </Reveal>

        <div className="mt-12 flex flex-col gap-3">
          {faqs.map((f, i) => {
            const open = openIndex === i;
            return (
              <Reveal
                key={i}
                delay={i * 50}
                className="rounded-2xl border border-line bg-ink-2"
              >
                <h3>
                  <button
                    type="button"
                    className="flex w-full cursor-pointer items-center justify-between gap-6 px-6 py-5 text-left"
                    aria-expanded={open}
                    aria-controls={`faq-panel-${i}`}
                    onClick={() => setOpenIndex(open ? null : i)}
                  >
                    <span className="display text-base text-cream md:text-lg">{f.q}</span>
                    <span
                      className={`serif-accent shrink-0 text-2xl text-gold transition-transform duration-300 ${open ? "rotate-45" : ""}`}
                      aria-hidden
                    >
                      +
                    </span>
                  </button>
                </h3>
                <div
                  id={`faq-panel-${i}`}
                  className={`grid transition-[grid-template-rows] duration-300 ease-out ${
                    open ? "grid-rows-[1fr]" : "grid-rows-[0fr]"
                  }`}
                >
                  <div className="overflow-hidden">
                    <p className="px-6 pb-6 leading-relaxed text-mute">{f.a}</p>
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
