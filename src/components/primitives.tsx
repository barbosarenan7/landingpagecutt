import { useState, type CSSProperties, type ReactNode } from "react";

/** Seta de 14px usada nos botões (SVG inline, sem pacote de ícones). */
export function Arrow() {
  return (
    <svg width="14" height="10" viewBox="0 0 14 10" fill="none" aria-hidden>
      <path
        d="M9 1l4 4-4 4M13 5H1"
        stroke="currentColor"
        strokeWidth="1.5"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
}

/** Botão primário: pill accent com círculo branco + seta (seção 9). */
export function BtnPrimary({
  href,
  children,
  className = "",
  onClick,
}: {
  href: string;
  children: ReactNode;
  className?: string;
  onClick?: () => void;
}) {
  return (
    <a href={href} onClick={onClick} className={`btn-primary ${className}`}>
      <span className="pl-0">{children}</span>
      <span className="btn-circle" aria-hidden>
        <Arrow />
      </span>
    </a>
  );
}

/** Botão secundário: pill transparente com hairline. */
export function BtnSecondary({
  href,
  children,
  className = "",
  onClick,
}: {
  href: string;
  children: ReactNode;
  className?: string;
  onClick?: () => void;
}) {
  return (
    <a href={href} onClick={onClick} className={`btn-secondary ${className}`}>
      {children}
      <Arrow />
    </a>
  );
}

type MediaProps = {
  /** Nome do slot no IMAGE_BRIEF.md (ex.: hero-main.webp). Vira o placeholder. */
  file: string;
  /** Caminho real da imagem quando ela existir (ex.: /team-g4.jpg). */
  src?: string;
  alt: string;
  /** aspect-ratio CSS, ex.: "4 / 5". */
  ratio?: string;
  className?: string;
  eager?: boolean;
  hover?: boolean;
  width?: number;
  height?: number;
  /** Overlays: badge, caption sobre gradiente, stat etc. */
  children?: ReactNode;
};

/**
 * Toda mídia da página passa por aqui: raio 24px, dessaturação,
 * grão e placeholder sólido em --ink-800 enquanto a imagem não existe
 * (seção 7 do design system).
 *
 * Carregamento automático: se `src` vier preenchido (pelo conteúdo em
 * src/content/site.json), usa ele. Se vier vazio, tenta `/{file}` — ou
 * seja, basta arrastar o arquivo com esse nome para a pasta `public/`
 * que a foto aparece sozinha. Se nada existir, mostra o placeholder.
 */
export function Media({
  file,
  src,
  alt,
  ratio,
  className = "",
  eager = false,
  hover = false,
  width,
  height,
  children,
}: MediaProps) {
  const candidate = src && src.trim() ? src : `/${file}`;
  const [failed, setFailed] = useState(false);
  const style: CSSProperties | undefined = ratio ? { aspectRatio: ratio } : undefined;
  return (
    <div className={`media ${hover ? "media-hover" : ""} ${className}`} style={style}>
      {failed ? (
        <span className="media-placeholder" role="img" aria-label={alt}>
          {file}
        </span>
      ) : (
        <img
          src={candidate}
          alt={alt}
          width={width}
          height={height}
          loading={eager ? "eager" : "lazy"}
          decoding="async"
          onError={() => setFailed(true)}
        />
      )}
      {children && <div className="absolute inset-0">{children}</div>}
    </div>
  );
}
