import { StrictMode } from "react";
import { renderToString } from "react-dom/server";
// no react-router 7 os pacotes foram consolidados: o StaticRouter sai de
// "react-router", não mais de "react-router-dom/server"
import { StaticRouter } from "react-router";
import App from "./App";

/**
 * Entrada usada só no build, por scripts/prerender.ts. Roda em Node e
 * devolve o HTML de uma rota já montado, para ir dentro do
 * `<div id="root">`.
 *
 * É a MESMA árvore de componentes do navegador (`src/main.tsx`), só que
 * com StaticRouter no lugar do BrowserRouter — por isso o resultado
 * visual é idêntico por construção.
 */
export function render(url: string): string {
  return renderToString(
    <StrictMode>
      <StaticRouter location={url}>
        <App />
      </StaticRouter>
    </StrictMode>,
  );
}
