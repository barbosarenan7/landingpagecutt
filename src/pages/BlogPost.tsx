import { Link } from "react-router-dom";
import Nav from "../components/Nav";
import Footer from "../components/Footer";
import WhatsAppFloat from "../components/WhatsAppFloat";
import CookieBanner from "../components/CookieBanner";
import FaqLista from "../components/FaqLista";
import { Blocos, idDoTexto } from "../components/BlocosConteudo";
import type { Bloco, ConteudoBlog, Post } from "../lib/tipos";
import { Seo } from "../lib/seo";
import { metaDoPost } from "../lib/rotas";
import blogJson from "../content/blog.json";

const blog = blogJson as ConteudoBlog;

function dataBr(iso: string) {
  const [a, m, d] = iso.split("-");
  return `${d}/${m}/${a}`;
}

/**
 * Template de artigo. Layout de leitura em coluna única, com sumário
 * gerado a partir dos H2 do próprio conteúdo.
 *
 * Usa Nav, Footer, WhatsAppFloat e CookieBanner como estão; o acordeão
 * de FAQ é a variante `FaqLista`, criada para não tocar no `Faq.tsx` da
 * home, que está em produção.
 */
export default function BlogPost({ post }: { post: Post }) {
  const titulos = post.blocos.filter((b): b is Bloco & { tipo: "h2" } => b.tipo === "h2");
  const outros = blog.posts.filter((p) => p.slug !== post.slug).slice(0, 3);

  return (
    <>
      <Seo {...metaDoPost(post.slug)} />
      <Nav />
      <main id="conteudo">
        <article className="sec-light pt-[clamp(40px,6vw,80px)] pb-[clamp(72px,9vw,140px)]">
          <div className="container-cut">
            <div className="faixa-leitura mx-auto max-w-[46rem]">
              <nav aria-label="Você está em">
                <ol className="text-2nd flex flex-wrap items-center gap-2 text-[13px]">
                  <li>
                    <Link to="/" className="underline underline-offset-4 hover:text-ink-900">
                      Início
                    </Link>
                  </li>
                  <li aria-hidden>/</li>
                  <li>
                    <Link to="/blog" className="underline underline-offset-4 hover:text-ink-900">
                      Blog
                    </Link>
                  </li>
                  <li aria-hidden>/</li>
                  <li aria-current="page" className="truncate">
                    {post.titulo}
                  </li>
                </ol>
              </nav>

              <header className="mt-8">
                <p className="eyebrow">{post.intencao}</p>
                <h1
                  className="h-sans mt-5 leading-[1.08]"
                  style={{ fontSize: "clamp(1.75rem, 4.2vw, 2.75rem)" }}
                >
                  {post.titulo}
                </h1>
                <p className="text-2nd mt-5 text-[17px] leading-relaxed">{post.resumo}</p>
                <p className="mt-5 text-xs text-text3">
                  Publicado em {dataBr(post.data)}
                  {post.atualizado ? ` · atualizado em ${dataBr(post.atualizado)}` : ""}
                </p>
              </header>

              {titulos.length > 2 && (
                <nav aria-label="Neste artigo" className="card-soft mt-10">
                  <p className="eyebrow">Neste artigo</p>
                  <ul className="mt-4 flex flex-col gap-2">
                    {titulos.map((t) => (
                      <li key={t.texto}>
                        <a
                          href={`#${idDoTexto(t.texto)}`}
                          className="text-2nd text-sm underline underline-offset-4 hover:text-ink-900"
                        >
                          {t.texto}
                        </a>
                      </li>
                    ))}
                  </ul>
                </nav>
              )}

              <div className="mt-4">
                <Blocos blocos={post.blocos} />
              </div>

              {post.faq.length > 0 && (
                <section className="mt-16" aria-labelledby="faq-artigo">
                  <h2 id="faq-artigo" className="h-sans text-[26px] leading-snug md:text-[30px]">
                    Perguntas frequentes
                  </h2>
                  <FaqLista itens={post.faq} idBase="faq-post" />
                </section>
              )}
            </div>
          </div>
        </article>

        {outros.length > 0 && (
          <section className="sec-dark section" aria-labelledby="leia-tambem">
            <div className="container-cut">
              <h2 id="leia-tambem" className="eyebrow">
                Leia também
              </h2>
              <div className="mt-6 grid gap-3 md:grid-cols-3">
                {outros.map((o) => (
                  <Link key={o.slug} to={`/blog/${o.slug}`} className="card-soft card-dif block">
                    <h3 className="text-base leading-snug font-bold">{o.titulo}</h3>
                    <p className="text-2nd mt-2 text-sm leading-relaxed">{o.resumo}</p>
                  </Link>
                ))}
              </div>
            </div>
          </section>
        )}
      </main>
      <Footer />
      <WhatsAppFloat />
      <CookieBanner />
    </>
  );
}
