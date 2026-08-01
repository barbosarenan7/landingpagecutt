import { Routes, Route, useLocation } from "react-router-dom";
import { useEffect } from "react";
import Home from "./pages/Home";
import Obrigado from "./pages/Obrigado";
import Privacidade from "./pages/Privacidade";

export default function App() {
  const { pathname } = useLocation();

  // one-page: âncoras cuidam do scroll na home; rotas novas voltam ao topo
  useEffect(() => {
    window.scrollTo(0, 0);
  }, [pathname]);

  return (
    <Routes>
      <Route path="/" element={<Home />} />
      <Route path="/obrigado" element={<Obrigado />} />
      <Route path="/privacidade" element={<Privacidade />} />
    </Routes>
  );
}
