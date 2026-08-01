import { useEffect, useState } from "react";
import { Arrow } from "./primitives";
import content from "../content/site.json";

const links = content.nav.links;

/** Wordmark tipográfico: sans 900 + ponto no acento. */
function Logo() {
  return (
    <a
      href="#top"
      aria-label="Cut Creative — início"
      className="h-sans text-lg tracking-tight text-ink-900"
    >
      Cut Creative<span className="text-accent">.</span>
    </a>
  );
}

/** Nav sticky de 72px: paper-50 com blur e hairline inferior (seção 6). */
export default function Nav() {
  const [open, setOpen] = useState(false);

  useEffect(() => {
    document.body.style.overflow = open ? "hidden" : "";
    return () => {
      document.body.style.overflow = "";
    };
  }, [open]);

  return (
    <header className="sec-light sticky top-0 z-50 border-b border-line-light bg-paper-50/85 backdrop-blur-md">
      <nav className="container-cut flex h-[72px] items-center justify-between">
        <Logo />

        <div className="hidden items-center gap-10 lg:flex">
          {links.map((l) => (
            <a
              key={l.href}
              href={l.href}
              className="text-[15px] font-medium text-ink-900 transition-colors hover:text-accent"
            >
              {l.label}
            </a>
          ))}
        </div>

        <a href="#diagnostico" className="btn-primary hidden !min-h-11 lg:inline-flex">
          {content.nav.cta}
          <span className="btn-circle" aria-hidden>
            <Arrow />
          </span>
        </a>

        <button
          type="button"
          className="flex h-11 w-11 cursor-pointer flex-col items-center justify-center gap-1.5 lg:hidden"
          aria-expanded={open}
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

      {open && (
        <div className="sec-light fixed inset-0 top-[72px] z-40 flex flex-col px-6 pt-4 pb-10 lg:hidden">
          {links.map((l) => (
            <a
              key={l.href}
              href={l.href}
              onClick={() => setOpen(false)}
              className="h-sans border-b border-line-light py-6 text-3xl text-ink-900"
            >
              {l.label}
            </a>
          ))}
          <a
            href="#diagnostico"
            className="btn-primary mt-auto w-full justify-between"
            onClick={() => setOpen(false)}
          >
            {content.nav.cta}
            <span className="btn-circle" aria-hidden>
              <Arrow />
            </span>
          </a>
        </div>
      )}
    </header>
  );
}
