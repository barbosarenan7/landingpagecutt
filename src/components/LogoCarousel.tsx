import { useState } from "react";
import content from "../content/site.json";

/**
 * Carrossel de logos entre o hero e a prova social: fundo claro,
 * 2 fileiras em rolagem infinita lenta (a 2ª no sentido inverso),
 * pausa no hover.
 *
 * Os logos vêm de src/content/site.json → "logos" e vivem em
 * public/logos/. Todos foram normalizados num canvas 480×160 com o
 * mesmo peso visual e já carregam as cores finais (vermelho / preto /
 * cinza, regras do cliente) — por isso NÃO há filtro de cor no CSS.
 * As fileiras dividem a lista ao meio; com menos itens a trilha é
 * quadruplicada para o loop nunca abrir buraco.
 */
type Slot = { name: string; src: string };

const slots: Slot[] = content.logos
  .filter((src) => src && src.trim())
  .map((src, i) => ({ name: `logo-${String(i + 1).padStart(2, "0")}.png`, src }));

const half = Math.ceil(slots.length / 2);
const ROW_1 = slots.slice(0, half);
const ROW_2 = slots.slice(half);

function LogoSlot({ slot }: { slot: Slot }) {
  const [missing, setMissing] = useState(false);

  if (missing) {
    return (
      <span className="flex h-15 w-40 shrink-0 items-center justify-center rounded-input border border-line-light text-[11px] tracking-[0.08em] text-text3">
        {slot.name}
      </span>
    );
  }
  return (
    <img
      src={slot.src}
      alt="Logo de cliente da Cut Creative"
      loading="lazy"
      decoding="async"
      onError={() => setMissing(true)}
      className="h-15 w-auto shrink-0"
    />
  );
}

function Row({ items, reverse = false }: { items: Slot[]; reverse?: boolean }) {
  if (items.length === 0) return null;
  // trilha precisa ter pelo menos ~2× a viewport para o -50% do loop fechar
  const times = items.length >= 8 ? 2 : 4;
  const track = Array.from({ length: times }, () => items).flat();
  return (
    <div className="marquee overflow-hidden" role="presentation">
      <div
        className={`marquee-track items-center gap-9 pr-9 ${reverse ? "marquee-track-rev" : ""}`}
      >
        {track.map((slot, i) => (
          <span key={`${slot.name}-${i}`} aria-hidden={i >= items.length} className="flex shrink-0">
            <LogoSlot slot={slot} />
          </span>
        ))}
      </div>
    </div>
  );
}

export default function LogoCarousel() {
  if (slots.length === 0) return null;
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
