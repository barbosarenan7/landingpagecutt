import { Arrow } from "./primitives";
import content from "../content/site.json";

/**
 * Nav sticky de 72px: paper-50 com blur e hairline inferior (seção 6).
 * Sem menu suspenso — só a marca à esquerda e o CTA à direita, igual em
 * qualquer tela. O logo é branco no arquivo original, então recebe
 * `brightness-0` para virar preto sobre o header claro.
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
  return (
    <header className="sec-light sticky top-0 z-50 border-b border-line-light bg-paper-50/85 backdrop-blur-md">
      <nav className="container-cut flex h-[72px] items-center justify-between">
        <Logo />

        {/* CTA compacto, no layout do botão padrão. Aponta direto para os
            campos do formulário, não para o topo da seção. */}
        <a
          href="#formulario"
          className="btn-primary !min-h-0 !gap-2.5 !py-1.5 !pr-1.5 !pl-4 !text-[13px]"
        >
          <span>{content.nav.cta}</span>
          <span className="btn-circle !h-7 !w-7" aria-hidden>
            <Arrow />
          </span>
        </a>
      </nav>
    </header>
  );
}
