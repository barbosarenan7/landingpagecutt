import { Link } from "react-router-dom";
import Nav from "../components/Nav";
import Footer from "../components/Footer";
import WhatsAppFloat from "../components/WhatsAppFloat";
import CookieBanner from "../components/CookieBanner";
import { Reveal } from "../lib/reveal";
import { Seo } from "../lib/seo";
import { rotaBlog } from "../lib/rotas";
import blogJson from "../content/blog.json";
import type { ConteudoBlog } from "../lib/tipos";

const blog = blogJson as ConteudoBlog;

const b = blog.indice;

/** dd/mm/aaaa a partir de "aaaa-mm-dd", sem depender de locale do runtime. */
function dataBr(iso: string) {
  const [a, m, d] = iso.split("-");
  return `${d}/${m}/${a}`;
}

/**
 * Índice do blog. Reaproveita Nav, Footer e os utilitários visuais já
 * existentes sem alterá-los. Os posts vêm de src/content/blog.json.
 */
export default function Blog() {
  const posts = [...blog.posts].sort((x, y) => (x.data < y.data ? 1 : -1));

  return (
    <>
      <Seo {...rotaBlog} />
      <Nav />
      <main id="conteudo">
        <section className="sec-light pt-[clamp(48px,7vw,96px)] pb-[clamp(40px,5vw,72px)]">
          <div className="container-cut">
            <nav aria-label="Você está em" className="faixa-leitura">
              <ol className="text-2nd flex flex-wrap items-center gap-2 text-[13px]">
                <li>
                  <Link to="/" className="underline underline-offset-4 hover:text-ink-900">
                    Início
                  </Link>
                </li>
                <li aria-hidden>/</li>
                <li aria-current="page">Blog</li>
              </ol>
            </nav>

            <div className="faixa-leitura mt-8 max-w-[52rem]">
              <p className="eyebrow">{b.eyebrow}</p>
              <h1 className="mt-5" style={{ fontSize: "var(--fs-h2)" }}>
                <span className="h-serif block">{b.tituloLinha1}</span>
                <span className="h-sans block">{b.tituloLinha2}</span>
              </h1>
              <p className="text-2nd mt-6 max-w-[46rem] text-[17px] leading-relaxed">
                {b.descricao}
              </p>
            </div>
          </div>
        </section>

        <section className="sec-light pb-[clamp(88px,11vw,176px)]" aria-labelledby="lista-title">
          <div className="container-cut">
            <h2 id="lista-title" className="sr-only">
              Artigos publicados
            </h2>

            {posts.length === 0 ? (
              <p className="faixa-leitura text-2nd">
                Os primeiros artigos estão sendo escritos.
              </p>
            ) : (
              <ul className="grid gap-3 md:grid-cols-2 lg:grid-cols-3">
                {posts.map((p, i) => (
                  <Reveal as="li" key={p.slug} delay={i * 70} className="flex">
                    <Link
                      to={`/blog/${p.slug}`}
                      className="card-soft card-dif flex w-full flex-col transition-colors hover:bg-ink-900/[0.06]"
                    >
                      <p className="step-num text-accent">{p.intencao}</p>
                      <h3 className="mt-3 pr-2 text-lg leading-snug font-bold">{p.titulo}</h3>
                      <p className="text-2nd mt-2 text-sm leading-relaxed">{p.resumo}</p>
                      <p className="mt-4 text-xs text-text3">{dataBr(p.data)}</p>
                    </Link>
                  </Reveal>
                ))}
              </ul>
            )}
          </div>
        </section>
      </main>
      <Footer />
      <WhatsAppFloat />
      <CookieBanner />
    </>
  );
}
