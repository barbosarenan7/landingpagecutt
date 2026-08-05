import { useState } from "react";
import type { Pergunta } from "../lib/tipos";

/**
 * Acordeão de perguntas para as páginas novas (artigos e landings BOFU).
 *
 * É uma variante própria, e não uma alteração do `Faq.tsx` da home: o da
 * home está em produção e não pode ser tocado. Mesma linguagem visual,
 * componente separado.
 */
export default function FaqLista({ itens, idBase }: { itens: Pergunta[]; idBase: string }) {
  const [aberta, setAberta] = useState<number | null>(0);

  return (
    <div className="mt-8 flex flex-col gap-3">
      {itens.map((item, i) => {
        const aberto = aberta === i;
        return (
          <div key={item.pergunta} className="card-soft overflow-hidden !p-0">
            <h3>
              <button
                type="button"
                className="flex w-full cursor-pointer items-start justify-between gap-6 px-6 py-5 text-left md:px-7"
                aria-expanded={aberto}
                aria-controls={`${idBase}-${i}`}
                onClick={() => setAberta(aberto ? null : i)}
              >
                <span className="text-[15px] leading-snug font-medium">{item.pergunta}</span>
                <span
                  className={`text-2nd mt-0.5 shrink-0 transition-transform duration-300 ${
                    aberto ? "rotate-180" : ""
                  }`}
                  aria-hidden
                >
                  <svg width="13" height="8" viewBox="0 0 13 8" fill="none">
                    <path
                      d="M1 1l5.5 5.5L12 1"
                      stroke="currentColor"
                      strokeWidth="1.4"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    />
                  </svg>
                </span>
              </button>
            </h3>
            <div
              id={`${idBase}-${i}`}
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
