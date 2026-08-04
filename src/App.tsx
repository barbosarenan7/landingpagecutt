import { Routes, Route, useLocation } from "react-router-dom";
import { useEffect } from "react";
import Home from "./pages/Home";
import Obrigado from "./pages/Obrigado";
import Privacidade from "./pages/Privacidade";
import ServicoPage from "./pages/Servico";
import servicos from "./content/servicos.json";

export default function App() {
  const { pathname } = useLocation();

  // one-page: âncoras cuidam do scroll na home; rotas novas voltam ao topo
  useEffect(() => {
    window.scrollTo(0, 0);
  }, [pathname]);

  return (
    <Routes>
      <Route path="/" element={<Home />} />
      {/* uma rota por serviço, com URL descritiva (bom para busca) */}
      {servicos.servicos.map((s) => (
        <Route key={s.slug} path={`/${s.slug}`} element={<ServicoPage servico={s} />} />
      ))}
      <Route path="/obrigado" element={<Obrigado />} />
      <Route path="/privacidade" element={<Privacidade />} />
    </Routes>
  );
}
