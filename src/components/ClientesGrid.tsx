import content from "../content/site.json";

/**
 * Grade de clientes (ref. "logo cloud" com grade de hairlines) — versão
 * PARALELA ao carrossel do topo, para comparar as duas estéticas.
 * O carrossel (LogoCarousel) segue intacto; este bloco entra depois do
 * formulário.
 *
 * Fundo preto (--ink-900), logos em branco, 8 colunas no desktop e 4 no
 * mobile. Usa a MESMA lista do carrossel (src/content/site.json →
 * "logos"), mas troca a pasta para /logos-white/, onde vivem versões
 * brancas dedicadas: elas preservam os recortes internos (o garfo do
 * Hobby, os chevrons do Cidade do Aço), o que um filtro CSS de invert
 * achataria em manchas sólidas.
 *
 * A grade é completada até um múltiplo de 8 com células vazias, para o
 * retângulo fechar certinho nos dois breakpoints (2 fileiras no desktop,
 * 4 no mobile). As cruzes nas intersecções vêm do CSS (.logo-plus em
 * styles.css), que as esconde na última coluna e na última fileira.
 */
const logos = content.logos
  .filter((src) => src && src.trim())
  // mesma lista do carrossel, servida pela pasta das versões brancas
  .map((src) => src.replace("/logos/", "/logos-white/"));

// completa a grade até fechar fileiras de 8 (e, por consequência, de 4)
const total = Math.ceil(logos.length / 8) * 8;
const cells: (string | null)[] = [
  ...logos,
  ...Array<null>(total - logos.length).fill(null),
];

/** Cruz de 13px centrada na intersecção das hairlines. */
function Plus() {
  return (
    <svg
      className="logo-plus absolute -right-[6.5px] -bottom-[6.5px] z-10 text-paper-50/25"
      width="13"
      height="13"
      viewBox="0 0 13 13"
      fill="none"
      aria-hidden
    >
      <path d="M6.5 0v13M0 6.5h13" stroke="currentColor" strokeWidth="1" />
    </svg>
  );
}

export default function ClientesGrid() {
  if (logos.length === 0) return null;

  return (
    <section
      id="clientes"
      className="sec-dark py-[clamp(64px,8vw,112px)]"
      aria-labelledby="clientes-title"
    >
      <div className="container-cut">
        <p className="eyebrow mx-auto flex w-fit">Clientes</p>
        <h2
          id="clientes-title"
          className="mt-6 mb-12 text-center"
          style={{ fontSize: "var(--fs-h2)" }}
        >
          <span className="h-serif block">Marcas que já trabalharam</span>
          <span className="h-sans block">com a Cut Creative.</span>
        </h2>

        <div className="grid grid-cols-4 border-t border-l border-line-dark md:grid-cols-8">
          {cells.map((src, i) => (
            <div
              key={src ?? `vazio-${i}`}
              className="logo-cell relative flex items-center justify-center border-r border-b border-line-dark px-2 py-5 md:px-4 md:py-9"
            >
              {src && (
                <img
                  src={src}
                  alt="Logo de cliente da Cut Creative"
                  loading="lazy"
                  decoding="async"
                  draggable={false}
                  className="pointer-events-none h-9 w-auto max-w-full object-contain opacity-90 transition-opacity duration-300 select-none hover:opacity-100 md:h-10"
                />
              )}
              <Plus />
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
