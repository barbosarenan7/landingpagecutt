import type { CSSProperties } from "react";
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

/**
 * Destaque de tamanho por logo (conforme marcação do cliente): algumas
 * marcas são compactas e "afogam" em margem transparente, aparecendo
 * pequenas na grade. Para elas usamos a versão recortada (`-lg`, arte
 * cheia) e ampliamos a altura via `--esc`. Verde = 2×, vermelho = 1,5×.
 */
const escala: Record<string, number> = {
  // marcas compactas ampliadas (recorte + escala)
  "logo-02": 1.575, // Gastro Center (1,75 − 10%)
  "logo-09": 1.75, // Cidade do Aço
  "logo-11": 1.4, // Hobby (1,75 − 20%)
  "logo-12": 1.4, // AHE (1,75 − 20%)
  "logo-07": 1.2, // Scennario (ícone novo) → +20%
  // vermelho no print → +50%
  "logo-03": 1.5,
  "logo-04": 1.5,
  "logo-05": 1.5,
  "logo-06": 1.5,
  "logo-08": 1.5,
  // ajustes finos
  "logo-13": 1.4, // Youcan → +40%
  "logo-10": 1.25, // Padoka → +25%
  "logo-14": 1.5, // Forshape (1,25 + 20%)
  "logo-15": 1.44, // ICT (1,25 + 15%)
  "logo-16": 1.82, // Moraes Buffet (1,40 + 30%)
};

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
          className="faixa-leitura mt-6 mb-12 text-center"
          style={{ fontSize: "var(--fs-h2)" }}
        >
          <span className="h-serif block">Marcas que já trabalharam</span>
          <span className="h-sans block">com a Cut Creative.</span>
        </h2>

        <div className="grid grid-cols-4 border-t border-l border-line-dark md:grid-cols-8">
          {cells.map((src, i) => {
            const base = src?.match(/(logo-\d+)/)?.[1];
            const esc = base ? escala[base] : undefined;
            // logos ampliadas usam a versão recortada (arte cheia)
            const finalSrc =
              esc && base ? src!.replace(`${base}.png`, `${base}-lg.png`) : src;
            return (
              <div
                key={src ?? `vazio-${i}`}
                className="logo-cell relative flex items-center justify-center border-r border-b border-line-dark px-2 py-5 md:px-4 md:py-9"
              >
                {finalSrc && (
                  <img
                    src={finalSrc}
                    alt="Logo de cliente da Cut Creative"
                    loading="lazy"
                    decoding="async"
                    draggable={false}
                    className="logo-cloud-img pointer-events-none w-auto max-w-full object-contain opacity-90 transition-opacity duration-300 select-none hover:opacity-100"
                    style={esc ? ({ "--esc": esc } as CSSProperties) : undefined}
                  />
                )}
                <Plus />
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
