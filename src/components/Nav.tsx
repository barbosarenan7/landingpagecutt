import { useEffect, useState } from "react";
import { Arrow } from "./primitives";
import content from "../content/site.json";

/**
 * Nav sticky de 72px: paper-50 com blur e hairline inferior (seção 6).
 * À esquerda o símbolo da marca; à direita apenas o botão de menu, que
 * abre o painel com o CTA. O logo é branco no arquivo original, então
 * recebe `brightness-0` para virar preto sobre o header claro.
 */
function Logo() {
  return (
    // no celular a logo se afasta da borda esquerda (ml-2); no desktop
    // o container-cut já dá o respiro e a margem volta a zero
    <a href="#top" aria-label="Cut Creative — início" className="ml-2 flex items-center md:ml-0">
      <img
        src="/logo-cut.png"
        alt="Cut Creative"
        width={213}
        height={240}
        className="h-9 w-auto brightness-0"
      />
    </a>
  );
}

export default function Nav() {
  const [open, setOpen] = useState(false);

  useEffect(() => {
    document.body.style.overflow = open ? "hidden" : "";
    return () => {
      document.body.style.overflow = "";
    };
  }, [open]);

  // fecha com Esc, para o painel não prender o usuário
  useEffect(() => {
    if (!open) return;
    const onKey = (e: KeyboardEvent) => e.key === "Escape" && setOpen(false);
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [open]);

  return (
    <header className="sec-light sticky top-0 z-50 border-b border-line-light bg-paper-50/85 backdrop-blur-md">
      <nav className="container-cut flex h-[72px] items-center justify-between">
        <Logo />

        {/* no celular o CTA mora no próprio header, no layout do botão
            padrão (pill + círculo com seta), em versão reduzida e sem o
            "gratuito" — não há hambúrguer nem painel para abrir */}
        <a
          href="#diagnostico"
          className="btn-primary !min-h-0 !gap-2.5 !py-1.5 !pr-1.5 !pl-4 !text-[13px] md:hidden"
        >
          <span>{content.nav.ctaCurto}</span>
          <span className="btn-circle !h-7 !w-7" aria-hidden>
            <Arrow />
          </span>
        </a>

        <button
          type="button"
          className="hidden h-11 w-11 cursor-pointer flex-col items-center justify-center gap-1.5 md:flex"
          aria-expanded={open}
          aria-controls="menu-painel"
          aria-label={open ? "Fechar menu" : "Abrir menu"}
          onClick={() => setOpen((v) => !v)}
        >
          <span
            className={`h-px w-6 bg-ink-900 transition-transform duration-200 ${open ? "translate-y-[3.5px] rotate-45" : ""}`}
          />
          <span
            className={`h-px w-6 bg-ink-900 transition-transform duration-200 ${open ? "-translate-y-[3.5px] -rotate-45" : ""}`}
          />
        </button>
      </nav>

      {/* painel suspenso: nada além do CTA — a logo já está no header
          logo acima, então o menu aberto fica logo + botão e mais nada */}
      {open && (
        <div
          id="menu-painel"
          className="sec-light absolute inset-x-0 top-[72px] border-b border-line-light bg-paper-50/95 backdrop-blur-md"
        >
          <div className="container-cut flex justify-end py-5">
            <a
              href="#diagnostico"
              onClick={() => setOpen(false)}
              className="btn-primary !min-h-0 !gap-3 !py-2 !pr-2 !pl-5 !text-[13px]"
            >
              <span>{content.nav.cta}</span>
              <span className="btn-circle !h-7 !w-7" aria-hidden>
                <Arrow />
              </span>
            </a>
          </div>
        </div>
      )}
    </header>
  );
}
