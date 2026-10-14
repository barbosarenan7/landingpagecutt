import { Link } from "react-router-dom";
import { inline } from "../components/BlocosConteudo";
import type { Bloco } from "../lib/tipos";
import { Seo } from "../lib/seo";
import { rotaTermos } from "../lib/rotas";
import termosJson from "../content/termos.json";

const termos = termosJson as { titulo: string; blocos: Bloco[] };

/**
 * Manual e termos de uso: uma folha branca, só com a logo e o texto, como
 * um documento. Sem menu, rodapé, botão flutuante ou aviso de cookies,
 * igual à página de privacidade.
 *
 * O texto vem de src/content/termos.json (blocos h2, p, lista e tabela, os
 * mesmos tipos dos artigos). Os renderizadores abaixo são próprios, e não
 * os de BlocosConteudo, porque aqueles têm marcadores laranja e espaçamento
 * de artigo: aqui o visual é de contrato, preto sobre branco.
 */
function Bloco({ b }: { b: Bloco }) {
  switch (b.tipo) {
    case "h2":
      return (
        <h2 className="mt-12 mb-1 text-[19px] leading-snug font-bold text-balance">
          {b.texto}
        </h2>
      );
    case "p":
      return <p className="mt-4">{inline(b.texto)}</p>;
    case "lista": {
      const Tag = b.ordenada ? "ol" : "ul";
      return (
        <Tag
          className={`mt-4 flex flex-col gap-1.5 pl-6 ${
            b.ordenada ? "list-decimal" : "list-disc"
          } marker:text-ink-900/60`}
        >
          {b.itens.map((it, i) => (
            <li key={i} className="pl-1">
              {inline(it)}
            </li>
          ))}
        </Tag>
      );
    }
    case "tabela":
      return (
        // rolagem própria: a tabela de três colunas não pode empurrar a página
        <div className="mt-5 overflow-x-auto">
          <table className="w-full min-w-[30rem] border-collapse text-left text-[14.5px] leading-relaxed">
            <thead>
              <tr>
                {b.colunas.map((c, i) => (
                  <th key={i} className="border border-ink-900/25 bg-ink-900/[0.04] px-3 py-2 font-bold">
                    {c}
                  </th>
                ))}
              </tr>
            </thead>
            <tbody>
              {b.linhas.map((linha, i) => (
                <tr key={i}>
                  {linha.map((cel, j) => (
                    <td key={j} className="border border-ink-900/25 px-3 py-2 align-top">
                      {inline(cel)}
                    </td>
                  ))}
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      );
    default:
      return null;
  }
}

export default function TermosDeUso() {
  return (
    <>
      <Seo {...rotaTermos} />
      <main className="min-h-dvh bg-paper-0 text-ink-900">
        <article className="mx-auto max-w-[44rem] px-6 pt-14 pb-24 text-[16px] leading-[1.75] sm:px-8 sm:pt-20">
          <header className="flex flex-col items-center text-center">
            {/* o arquivo da logo é branco; brightness-0 a deixa preta, como no cabeçalho */}
            <Link to="/" aria-label="Cut Creative, voltar ao início">
              <img
                src="/logo-cut.png"
                alt="Cut Creative"
                width={120}
                height={135}
                className="h-16 w-auto brightness-0"
              />
            </Link>
            <h1 className="mt-8 max-w-[30ch] text-[26px] leading-snug font-bold sm:text-[30px]">
              {termos.titulo}
            </h1>
          </header>

          <div className="mt-6">
            {termos.blocos.map((b, i) => (
              <Bloco key={i} b={b} />
            ))}
          </div>
        </article>
      </main>
    </>
  );
}
