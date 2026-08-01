import { useState } from "react";
import content from "../content/site.json";

/**
 * Carrossel de logos entre o hero e a prova social: fundo claro,
 * 2 fileiras × 8 logos, rolagem infinita lenta (a 2ª no sentido
 * inverso), pausa no hover.
 *
 * Os 16 logos vêm de src/content/site.json → "logos" (caminho de cada
 * imagem; editável pelo painel). Se um caminho estiver vazio, o slot
 * também tenta `/logos/logo-XX.svg` — então dá pra só arrastar o arquivo
 * para `public/logos/`. Sem imagem, mostra o nome como placeholder.
 * Logos reais entram em preto e ganham opacidade plena no hover.
 */
type Slot = { name: string; src: string };

const slots: Slot[] = content.logos.map((src, i) => ({
  name: `logo-${String(i + 1).padStart(2, "0")}.svg`,
  src,
}));
const ROW_1 = slots.slice(0, 8);
const ROW_2 = slots.slice(8, 16);

function LogoSlot({ slot }: { slot: Slot }) {
  const [missing, setMissing] = useState(false);
  const candidate = slot.src && slot.src.trim() ? slot.src : `/logos/${slot.name}`;

  if (missing) {
    return (
      <span className="flex h-15 w-40 shrink-0 items-center justify-center rounded-input border border-line-light text-[11px] tracking-[0.08em] text-text3">
        {slot.name}
      </span>
    );
  }
  return (
    <img
      src={candidate}
      alt="Logo de cliente da Cut Creative"
      loading="lazy"
      decoding="async"
      onError={() => setMissing(true)}
      className="h-15 w-auto shrink-0 opacity-90 brightness-0 transition-opacity duration-300 hover:opacity-100"
    />
  );
}

function Row({ items, reverse = false }: { items: Slot[]; reverse?: boolean }) {
  const doubled = [...items, ...items];
  return (
    <div className="marquee overflow-hidden" role="presentation">
      <div
        className={`marquee-track items-center gap-9 pr-9 ${reverse ? "marquee-track-rev" : ""}`}
      >
        {doubled.map((slot, i) => (
          <span key={`${slot.name}-${i}`} aria-hidden={i >= items.length} className="flex shrink-0">
            <LogoSlot slot={slot} />
          </span>
        ))}
      </div>
    </div>
  );
}

export default function LogoCarousel() {
  return (
    <section
      aria-label="Marcas que comunicam com a Cut"
      className="sec-light py-[clamp(32px,4vw,56px)]"
    >
      <div className="container-cut flex flex-col gap-6">
        <Row items={ROW_1} />
        <Row items={ROW_2} reverse />
      </div>
    </section>
  );
}
