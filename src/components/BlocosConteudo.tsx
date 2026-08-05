import { Fragment, type ReactNode } from "react";
import { Link } from "react-router-dom";
import { Arrow } from "./primitives";
import type { Bloco } from "../lib/tipos";

/**
 * Renderizador dos blocos de conteúdo de artigos e landings.
 *
 * O conteúdo vive em JSON (src/content/blog.json, landings.json) em vez
 * de Markdown para não precisar de parser externo: o projeto não tem
 * dependência de markdown e não vale adicionar uma só por isto.
 *
 * Dentro de um parágrafo valem duas marcações, propositalmente poucas:
 *   [texto](/rota)  vira link interno (ou externo, se começar com http)
 *   **texto**       vira negrito
 */

export type { Bloco, Pergunta } from "../lib/tipos";

/** Quebra o texto em links, negrito e texto puro. */
export function inline(texto: string): ReactNode[] {
  const partes: ReactNode[] = [];
  const re = /\[([^\]]+)\]\(([^)]+)\)|\*\*([^*]+)\*\*/g;
  let ultimo = 0;
  let m: RegExpExecArray | null;
  let i = 0;

  while ((m = re.exec(texto)) !== null) {
    if (m.index > ultimo) partes.push(texto.slice(ultimo, m.index));
    if (m[1] && m[2]) {
      const href = m[2];
      partes.push(
        href.startsWith("http") ? (
          <a
            key={i++}
            href={href}
            target="_blank"
            rel="noopener noreferrer"
            className="underline underline-offset-4 hover:text-ink-900"
          >
            {m[1]}
          </a>
        ) : (
          <Link key={i++} to={href} className="underline underline-offset-4 hover:text-ink-900">
            {m[1]}
          </Link>
        ),
      );
    } else if (m[3]) {
      partes.push(
        <strong key={i++} className="font-bold text-ink-900">
          {m[3]}
        </strong>,
      );
    }
    ultimo = m.index + m[0].length;
  }
  if (ultimo < texto.length) partes.push(texto.slice(ultimo));
  return partes;
}

/** Bloco de chamada para o diagnóstico, usado no meio e no fim dos artigos. */
function Advertorial({ utm }: { utm: string }) {
  return (
    <aside className="card-soft my-10 border-l-2 border-accent">
      <p className="text-[17px] leading-snug font-bold">
        Quer saber o que faz sentido para o seu negócio especificamente?
      </p>
      <p className="text-2nd mt-3 leading-relaxed">
        O diagnóstico da Cut é gratuito e leva 40 minutos. Você sai da conversa
        com o mapa do que está travando o seu marketing hoje, mesmo que decida
        não contratar.
      </p>
      <a href={`/#formulario?${utm}`} className="btn-primary mt-6">
        <span className="pl-0">Solicitar diagnóstico gratuito</span>
        <span className="btn-circle" aria-hidden>
          <Arrow />
        </span>
      </a>
    </aside>
  );
}

/** Um id estável a partir do texto, para âncora de H2. */
export function idDoTexto(texto: string) {
  return texto
    .toLowerCase()
    .normalize("NFD")
    .replace(/[̀-ͯ]/g, "")
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/^-|-$/g, "");
}

export function Blocos({ blocos }: { blocos: Bloco[] }) {
  return (
    <>
      {blocos.map((b, i) => {
        switch (b.tipo) {
          case "h2":
            return (
              <h2
                key={i}
                id={idDoTexto(b.texto)}
                className="h-sans mt-14 mb-5 text-[26px] leading-snug md:text-[30px]"
              >
                {b.texto}
              </h2>
            );
          case "h3":
            return (
              <h3 key={i} className="mt-9 mb-3 text-lg leading-snug font-bold">
                {b.texto}
              </h3>
            );
          case "p":
            return (
              <p key={i} className="text-2nd mt-4 leading-relaxed">
                {inline(b.texto)}
              </p>
            );
          case "lista": {
            const Tag = b.ordenada ? "ol" : "ul";
            return (
              <Tag key={i} className="mt-5 flex flex-col gap-2.5">
                {b.itens.map((it, j) => (
                  <li key={j} className="text-2nd flex gap-3 leading-relaxed">
                    <span className="mt-2.5 h-1 w-1 shrink-0 rounded-pill bg-accent" aria-hidden />
                    <span>{inline(it)}</span>
                  </li>
                ))}
              </Tag>
            );
          }
          case "tabela":
            return (
              // rolagem própria: tabela larga não pode empurrar a página
              <div key={i} className="mt-7 overflow-x-auto">
                <table className="w-full min-w-[34rem] border-collapse text-left text-sm">
                  <thead>
                    <tr>
                      {b.colunas.map((c, j) => (
                        <th
                          key={j}
                          className="border-b border-line-light py-3 pr-5 font-bold"
                        >
                          {c}
                        </th>
                      ))}
                    </tr>
                  </thead>
                  <tbody>
                    {b.linhas.map((linha, j) => (
                      <tr key={j}>
                        {linha.map((cel, k) => (
                          <td
                            key={k}
                            className="text-2nd border-b border-line-light py-3 pr-5 leading-relaxed"
                          >
                            {inline(cel)}
                          </td>
                        ))}
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            );
          case "destaque":
            return (
              <p
                key={i}
                className="my-9 border-l-2 border-accent pl-5 text-[17px] leading-snug font-medium"
              >
                {inline(b.texto)}
              </p>
            );
          case "pendencia":
            // aviso de revisão para o Renan, não conteúdo da página.
            // Feio de propósito: tem que doer de ver e sair antes de publicar.
            return (
              <aside
                key={i}
                data-pendencia
                className="my-10 rounded-card border-2 border-dashed border-accent bg-accent/10 p-6"
              >
                <p className="text-[11px] font-bold tracking-[0.18em] text-accent uppercase">
                  Trocar antes de publicar
                </p>
                <p className="mt-3 text-[15px] leading-relaxed font-medium">{inline(b.texto)}</p>
              </aside>
            );
          case "advertorial":
            return <Advertorial key={i} utm={b.utm} />;
          default:
            return <Fragment key={i} />;
        }
      })}
    </>
  );
}
