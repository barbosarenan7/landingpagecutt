import { useEffect, useRef, useState } from "react";
import { Link } from "react-router-dom";
import { Arrow } from "./primitives";
import content from "../content/site.json";
import servicos from "../content/servicos.json";

/**
 * Nav sticky de 72px: paper-50 com blur e hairline inferior (seção 6).
 * À esquerda a marca, no meio o menu de serviços e à direita o CTA.
 * O menu existe porque as páginas de serviço não têm outra porta de
 * entrada a partir da home. O logo é branco no arquivo original, então
 * recebe `brightness-0` para virar preto sobre o header claro.
 */
function Logo() {
  return (
    // no celular a logo se afasta da borda esquerda (ml-2); no desktop
    // o container-cut já dá o respiro e a margem volta a zero
    <Link to="/" aria-label="Cut Creative — início" className="ml-2 flex items-center md:ml-0">
      <img
        src="/logo-cut.png"
        alt="Cut Creative"
        width={213}
        height={240}
        className="h-9 w-auto brightness-0"
      />
    </Link>
  );
}

function Chevron({ aberto }: { aberto: boolean }) {
  return (
    <svg
      width="10"
      height="6"
      viewBox="0 0 10 6"
      fill="none"
      aria-hidden
      className={`transition-transform duration-200 ${aberto ? "rotate-180" : ""}`}
    >
      <path
        d="M1 1l4 4 4-4"
        stroke="currentColor"
        strokeWidth="1.5"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
}

/** Três traços do menu no celular, onde não cabe a palavra "Serviços". */
function IconeMenu({ aberto }: { aberto: boolean }) {
  return (
    <svg width="18" height="14" viewBox="0 0 18 14" fill="none" aria-hidden>
      <path
        d={aberto ? "M2 2l14 10M16 2L2 12" : "M0 1.5h18M0 7h18M0 12.5h18"}
        stroke="currentColor"
        strokeWidth="1.6"
        strokeLinecap="round"
      />
    </svg>
  );
}

export default function Nav() {
  const [aberto, setAberto] = useState(false);
  const caixa = useRef<HTMLDivElement>(null);

  // fecha ao clicar fora ou apertar Esc — menu que só fecha no próprio
  // botão irrita em celular
  useEffect(() => {
    if (!aberto) return;
    const clique = (e: MouseEvent) => {
      if (caixa.current && !caixa.current.contains(e.target as Node)) setAberto(false);
    };
    const tecla = (e: KeyboardEvent) => {
      if (e.key === "Escape") setAberto(false);
    };
    document.addEventListener("mousedown", clique);
    document.addEventListener("keydown", tecla);
    return () => {
      document.removeEventListener("mousedown", clique);
      document.removeEventListener("keydown", tecla);
    };
  }, [aberto]);

  return (
    <header className="sec-light sticky top-0 z-50 border-b border-line-light bg-paper-50/85 backdrop-blur-md">
      <nav className="container-cut flex h-[72px] items-center justify-between gap-3">
        <Logo />

        {/* menu e CTA juntos, à direita */}
        <div className="flex items-center gap-1">
          <div ref={caixa} className="relative">
            <button
              type="button"
              onClick={() => setAberto((v) => !v)}
              aria-expanded={aberto}
              aria-controls="menu-servicos"
              aria-label="Serviços"
              className="flex h-11 items-center gap-1.5 px-3 text-[13px] font-medium text-ink-900"
            >
              <span className="hidden sm:inline">Serviços</span>
              <span className="sm:hidden">
                <IconeMenu aberto={aberto} />
              </span>
              <span className="hidden sm:inline">
                <Chevron aberto={aberto} />
              </span>
            </button>

            {aberto && (
              <div
                id="menu-servicos"
                /* ancorado à direita para não sair da tela no celular */
                className="absolute top-full right-0 mt-2 w-[17rem] overflow-hidden rounded-card border border-line-light bg-paper-50 shadow-lg"
              >
                <ul className="flex flex-col py-1">
                  {servicos.servicos.map((s) => (
                    <li key={s.slug}>
                      <Link
                        to={`/${s.slug}`}
                        onClick={() => setAberto(false)}
                        className="block px-5 py-3 text-[14px] font-medium text-ink-900 transition-colors hover:bg-ink-900/5"
                      >
                        {s.nome}
                      </Link>
                    </li>
                  ))}
                  <li className="mt-1 border-t border-line-light">
                    <Link
                      to="/"
                      onClick={() => setAberto(false)}
                      className="text-2nd block px-5 py-3 text-[14px] transition-colors hover:bg-ink-900/5"
                    >
                      Início
                    </Link>
                  </li>
                  {/* o CTA não fica mais no header do celular, então
                      entra aqui para o caminho até o formulário não sumir */}
                  <li className="border-t border-line-light p-3 sm:hidden">
                    <a
                      href="/#formulario"
                      onClick={() => setAberto(false)}
                      className="btn-primary !min-h-0 w-full !justify-between !gap-2.5 !py-1.5 !pr-1.5 !pl-4 !text-[13px]"
                    >
                      <span>{content.nav.cta}</span>
                      <span className="btn-circle !h-7 !w-7" aria-hidden>
                        <Arrow />
                      </span>
                    </a>
                  </li>
                </ul>
              </div>
            )}
          </div>

          {/* CTA compacto, no layout do botão padrão. Aponta direto para
              os campos do formulário, não para o topo da seção. No
              celular sai de cena: fica só o menu, e o CTA aparece dentro
              dele e ao longo da página. */}
          <a
            href="/#formulario"
            className="btn-primary !hidden !min-h-0 !gap-2.5 !py-1.5 !pr-1.5 !pl-4 !text-[13px] sm:!inline-flex"
          >
            <span>{content.nav.cta}</span>
            <span className="btn-circle !h-7 !w-7" aria-hidden>
              <Arrow />
            </span>
          </a>
        </div>
      </nav>
    </header>
  );
}
