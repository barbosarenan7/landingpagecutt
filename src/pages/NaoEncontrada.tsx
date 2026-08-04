import { useEffect } from "react";
import { Link } from "react-router-dom";
import Nav from "../components/Nav";
import Footer from "../components/Footer";
import { BtnPrimary } from "../components/primitives";
import servicos from "../content/servicos.json";

/**
 * Rota inexistente. Como o site é uma SPA servida por fallback, o
 * servidor sempre responde 200 — então marcamos a página como noindex
 * para o Google não indexar endereço quebrado, e oferecemos caminho de
 * volta em vez de deixar a tela em branco.
 */
export default function NaoEncontrada() {
  useEffect(() => {
    document.title = "Página não encontrada | Cut Creative";
    const meta = document.createElement("meta");
    meta.name = "robots";
    meta.content = "noindex, follow";
    document.head.appendChild(meta);
    return () => {
      meta.remove();
    };
  }, []);

  return (
    <>
      <Nav />
      <main id="conteudo" className="sec-light">
        <div className="container-cut py-[clamp(72px,12vw,160px)]">
          <div className="faixa-leitura max-w-[46rem]">
            <p className="eyebrow">Erro 404</p>
            <h1 className="mt-5" style={{ fontSize: "var(--fs-h2)" }}>
              <span className="h-serif block">Esta página não existe</span>
              <span className="h-sans block">ou mudou de endereço.</span>
            </h1>
            <p className="text-2nd mt-6 leading-relaxed">
              O link pode estar desatualizado. Você pode voltar para o início ou
              ir direto para um dos nossos serviços.
            </p>
            <div className="mt-9">
              <BtnPrimary href="/">Voltar para o início</BtnPrimary>
            </div>

            <ul className="mt-12 flex flex-col border-t border-line-light">
              {servicos.servicos.map((s) => (
                <li key={s.slug} className="border-b border-line-light">
                  <Link to={`/${s.slug}`} className="flex flex-col py-5">
                    <span className="text-[15px] leading-snug font-bold">{s.nome}</span>
                    <span className="text-2nd mt-1 text-sm leading-relaxed">
                      {s.resumo}
                    </span>
                  </Link>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </main>
      <Footer />
    </>
  );
}
