import { useEffect, useRef, useState } from "react";
import { Reveal } from "../lib/reveal";
import { BtnPrimary } from "./primitives";
import content from "../content/site.json";

const m = content.metodo;
const steps = m.etapas;

/**
 * Método ref. "Evrone Working Process": faixa de dígitos gigantes com
 * hairline no topo; a etapa ativa fica em ink-900 e expande o painel
 * de texto ao lado; hover pinta o dígito de accent. No mobile vira
 * lista vertical completa.
 */
export default function Metodo() {
  const [active, setActive] = useState(0);
  const lista = useRef<HTMLOListElement>(null);

  // anima os dígitos do mobile sempre que entram na tela, nos dois
  // sentidos do scroll (a classe é ligada/desligada pelo observer)
  useEffect(() => {
    const digitos = lista.current?.querySelectorAll(".step-ghost");
    if (!digitos?.length) return;
    const io = new IntersectionObserver(
      (entries) =>
        entries.forEach((e) =>
          e.target.classList.toggle("step-ghost-in", e.isIntersecting),
        ),
      { threshold: 0.35 },
    );
    digitos.forEach((d) => io.observe(d));
    return () => io.disconnect();
  }, []);

  return (
    <section id="metodo" className="sec-light section" aria-labelledby="metodo-title">
      <div className="container-cut">
        {/* no mobile todo o texto fica centralizado; a partir de md volta
            ao alinhamento à esquerda do desktop */}
        <div className="grid gap-10 lg:grid-cols-12">
          <div className="text-center md:text-left lg:col-span-7">
            <Reveal>
              <p className="eyebrow">{m.eyebrow}</p>
            </Reveal>
            <h2 id="metodo-title" className="mt-6" style={{ fontSize: "var(--fs-h2)" }}>
              <span className="h-serif block">{m.tituloLinha1}</span>
              <span className="h-sans block">{m.tituloLinha2}</span>
            </h2>
          </div>
          <Reveal delay={120} className="lg:col-span-4 lg:col-start-9">
            <p className="text-2nd text-center leading-relaxed md:text-left lg:pt-2">
              {m.texto}
            </p>
          </Reveal>
        </div>

        {/* desktop: faixa de dígitos gigantes com painel da etapa ativa */}
        <Reveal className="mt-16 hidden gap-8 md:flex lg:mt-24">
          {steps.map((s, i) => {
            const isActive = active === i;
            return (
              <div
                key={i}
                className={`border-t border-line-light pt-8 transition-all duration-300 ${
                  isActive ? "flex-[3]" : "flex-1"
                }`}
              >
                <div className="flex items-start gap-7">
                  <button
                    type="button"
                    className="step-digit"
                    aria-expanded={isActive}
                    aria-controls={`metodo-step-${i}`}
                    aria-label={`Etapa ${i + 1} — ${s.titulo}`}
                    onClick={() => setActive(i)}
                    onMouseEnter={() => setActive(i)}
                    onFocus={() => setActive(i)}
                  >
                    {i + 1}
                  </button>
                  {isActive && (
                    <div id={`metodo-step-${i}`} className="min-w-52 pt-2">
                      <p className="step-num text-text2-light">{s.fase}</p>
                      <h3 className="mt-3 text-xl leading-snug font-bold">{s.titulo}</h3>
                      <p className="text-2nd mt-3 text-sm leading-relaxed">{s.texto}</p>
                    </div>
                  )}
                </div>
              </div>
            );
          })}
        </Reveal>

        {/* mobile: lista vertical com o dígito fantasma gigante da marca —
            o texto da etapa sobe e ocupa a metade de baixo do número,
            tudo centralizado (mesma linguagem do desktop, em vertical) */}
        <ol ref={lista} className="mt-12 flex flex-col md:hidden">
          {steps.map((s, i) => (
            <Reveal
              as="li"
              key={i}
              delay={i * 60}
              className="border-t border-line-light px-2 pt-6 pb-10 text-center"
            >
              <span className="step-ghost" aria-hidden>
                {String(i + 1).padStart(2, "0")}
              </span>
              <div className="relative -mt-11">
                <p className="step-num text-ink-900">{s.fase}</p>
                <h3 className="mt-3 text-xl leading-snug font-bold">{s.titulo}</h3>
                <p className="text-2nd mx-auto mt-3 max-w-[34ch] text-sm leading-relaxed">
                  {s.texto}
                </p>
              </div>
            </Reveal>
          ))}
        </ol>

        <Reveal delay={120} className="mt-14 flex justify-center md:justify-start lg:mt-20">
          <BtnPrimary href="#diagnostico">{m.cta}</BtnPrimary>
        </Reveal>
      </div>
    </section>
  );
}
