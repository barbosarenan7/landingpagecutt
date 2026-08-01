import { memo, useRef, useState } from "react";
import {
  motion,
  useAnimationFrame,
  useMotionValue,
  useReducedMotion,
  useTransform,
} from "framer-motion";
import content from "../content/site.json";

/**
 * Carrossel 3D de logos (cilindro giratório, ref. "3d-carousel"):
 * gira sozinho devagar e aceita arraste horizontal; pausa o giro
 * enquanto o usuário arrasta e respeita prefers-reduced-motion.
 *
 * Logos em CORES ORIGINAIS (sem filtro/saturação), vindos de
 * src/content/site.json → "logos" (arquivos em public/logos/,
 * canvas 600×450 com peso visual uniforme). Logos de texto branco
 * (Ale Veículos, You Can) ganham cartão escuro para ficarem legíveis;
 * os demais, cartão claro.
 */
type Slot = { src: string; dark: boolean };

// cartão escuro para logos brancos por posição na lista (12 e 13)
const DARK_FACES = new Set(["/logos/logo-12.png", "/logos/logo-13.png"]);

const slots: Slot[] = content.logos
  .filter((src) => src && src.trim())
  .map((src) => ({ src, dark: DARK_FACES.has(src) }));

const Cylinder = memo(function Cylinder({ cards }: { cards: Slot[] }) {
  const reduced = useReducedMotion();
  const [dragging, setDragging] = useState(false);
  const rotation = useMotionValue(0);
  const velocity = useRef(0); // inércia depois do arraste (graus/s)

  const faceCount = cards.length;
  // largura do cilindro por breakpoint simples (evita hook de media query)
  const cylinderWidth =
    typeof window !== "undefined" && window.innerWidth < 640 ? 1350 : 2300;
  const faceWidth = cylinderWidth / faceCount;
  const radius = cylinderWidth / (2 * Math.PI);

  const transform = useTransform(rotation, (v) => `rotate3d(0, 1, 0, ${v}deg)`);

  useAnimationFrame((_, delta) => {
    if (dragging) return;
    const dt = delta / 1000;
    // giro base lento + inércia decaindo
    const base = reduced ? 0 : -7; // graus/s
    rotation.set(rotation.get() + (base + velocity.current) * dt);
    velocity.current *= Math.pow(0.2, dt); // decaimento suave
  });

  return (
    <div
      className="flex h-full items-center justify-center"
      style={{ perspective: "1100px", transformStyle: "preserve-3d" }}
    >
      <motion.div
        drag="x"
        dragConstraints={{ left: 0, right: 0 }}
        dragElastic={0}
        dragMomentum={false}
        onDragStart={() => setDragging(true)}
        onDrag={(_, info) => rotation.set(rotation.get() + info.delta.x * 0.09)}
        onDragEnd={(_, info) => {
          setDragging(false);
          velocity.current = info.velocity.x * 0.09;
        }}
        className="relative flex h-full origin-center cursor-grab justify-center active:cursor-grabbing"
        style={{
          transform,
          width: cylinderWidth,
          transformStyle: "preserve-3d",
        }}
      >
        {cards.map((card, i) => (
          <div
            key={card.src}
            className="absolute flex h-full origin-center items-center justify-center p-2"
            style={{
              width: `${faceWidth}px`,
              transform: `rotateY(${i * (360 / faceCount)}deg) translateZ(${radius}px)`,
            }}
          >
            <div
              className={`flex aspect-[4/3] w-full items-center justify-center overflow-hidden rounded-cardmd border p-2 ${
                card.dark
                  ? "border-line-dark bg-ink-900"
                  : "border-line-light bg-paper-0"
              }`}
            >
              <img
                src={card.src}
                alt="Logo de cliente da Cut Creative"
                loading="lazy"
                decoding="async"
                draggable={false}
                className="pointer-events-none h-full w-full object-contain"
              />
            </div>
          </div>
        ))}
      </motion.div>
    </div>
  );
});

export default function LogoCarousel() {
  if (slots.length === 0) return null;
  return (
    <section
      aria-label="Marcas que comunicam com a Cut"
      className="sec-light overflow-hidden py-[clamp(24px,3vw,40px)]"
    >
      <div className="relative h-[300px] w-full sm:h-[340px]">
        <Cylinder cards={slots} />
      </div>
    </section>
  );
}
