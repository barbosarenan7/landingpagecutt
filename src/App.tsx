import { Routes, Route, useLocation } from "react-router-dom";
import { useEffect } from "react";
import Home from "./pages/Home";
import Obrigado from "./pages/Obrigado";
import Privacidade from "./pages/Privacidade";
import ServicoPage from "./pages/Servico";
import NaoEncontrada from "./pages/NaoEncontrada";
import Blog from "./pages/Blog";
import BlogPost from "./pages/BlogPost";
import LandingBofu from "./pages/LandingBofu";
import servicos from "./content/servicos.json";
import blogJson from "./content/blog.json";
import landingsJson from "./content/landings.json";
import type { ConteudoBlog, ConteudoLandings } from "./lib/tipos";

const blog = blogJson as ConteudoBlog;
const landings = landingsJson as ConteudoLandings;

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
      {/* landings BOFU (cidade, segmento, serviço) — vêm de landings.json */}
      {landings.landings.map((l) => (
        <Route
          key={l.slug}
          path={`/${l.slug}`}
          element={<LandingBofu landing={l} />}
        />
      ))}
      <Route path="/blog" element={<Blog />} />
      {blog.posts.map((p) => (
        <Route key={p.slug} path={`/blog/${p.slug}`} element={<BlogPost post={p} />} />
      ))}
      <Route path="/obrigado" element={<Obrigado />} />
      <Route path="/privacidade" element={<Privacidade />} />
      <Route path="*" element={<NaoEncontrada />} />
    </Routes>
  );
}
