import { StrictMode } from "react";
import { createRoot, hydrateRoot } from "react-dom/client";
import { BrowserRouter } from "react-router-dom";
import App from "./App";
import "./styles.css";

const raiz = document.getElementById("root")!;

const arvore = (
  <StrictMode>
    <BrowserRouter>
      <App />
    </BrowserRouter>
  </StrictMode>
);

// O build pré-renderiza cada rota, então o #root já chega preenchido e o
// certo é hidratar. Se por algum motivo vier vazio (dev server, ou uma
// rota fora da lista de prerender), cai no render normal.
if (raiz.firstChild) {
  hydrateRoot(raiz, arvore);
} else {
  createRoot(raiz).render(arvore);
}
