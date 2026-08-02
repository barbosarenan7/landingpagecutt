import { useEffect, useRef, useState, type ReactNode } from "react";
import { Reveal } from "../lib/reveal";
import { Media, fontesOtimizadas } from "./primitives";
import content from "../content/site.json";

const d = content.dorReal;
const otimDor = fontesOtimizadas(d.imagem);

/** Foto de fundo da composição mobile, com AVIF/WebP quando existirem. */
function FotoDor() {
  const img = (
    <img
      className="dor-foto"
      src={d.imagem}
      alt="Pessoa empreendedora sobrecarregada diante do próprio negócio"
      width={1000}
      height={1333}
      loading="lazy"
      decoding="async"
    />
  );
  if (!otimDor) return img;
  return (
    <picture>
      <source type="image/avif" srcSet={otimDor.avif} />
      <source type="image/webp" srcSet={otimDor.webp} />
      {img}
    </picture>
  );
}

/**
 * A dor real ref. "FUTURE": título fantasma atrás, cards cinza suaves
 * em três colunas com seta ↗ no canto, imagem central em retrato e
 * lista com hairlines no estilo linhas de dado.
 * Slot: dor-central.webp (3:4).
 */
function Corner() {
  return (
    <span className="card-corner" aria-hidden>
      <svg width="11" height="11" viewBox="0 0 11 11" fill="none">
        <path
          d="M2 9L9 2M9 2H3.5M9 2v5.5"
          stroke="currentColor"
          strokeWidth="1.3"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
      </svg>
    </span>
  );
}

/**
 * Destaque "pointer highlight" (adaptação do componente Aceternity para
 * os padrões deste projeto, sem a dependência `motion`): quando a
 * palavra entra na tela, uma caixa laranja se desenha ao redor dela a
 * partir do canto superior esquerdo enquanto o cursor desliza até o
 * canto inferior direito. Re-anima nos dois sentidos do scroll.
 */
function PointerHighlight({ children }: { children: ReactNode }) {
  const alvo = useRef<HTMLSpanElement>(null);
  const [ativo, setAtivo] = useState(false);
  const [on, setOn] = useState(false);
  const [corte, setCorte] = useState(false);

  useEffect(() => {
    const el = alvo.current;
    if (!el) return;
    const io = new IntersectionObserver(([e]) => setAtivo(e.isIntersecting), {
      threshold: 0.6,
    });
    io.observe(el);
    return () => io.disconnect();
  }, []);

  // em cena, a animação roda em ciclos: desenha (1s), segura 3s e
  // recomeça do zero (o reset é instantâneo, com as transições cortadas)
  useEffect(() => {
    if (!ativo) {
      setOn(false);
      return;
    }
    let t1: number | undefined;
    let t2: number | undefined;
    const rodar = () => {
      setCorte(true);
      setOn(false);
      t1 = window.setTimeout(() => {
        setCorte(false);
        setOn(true);
        t2 = window.setTimeout(rodar, 4000); // 1s de desenho + 3s parado
      }, 40);
    };
    rodar();
    return () => {
      window.clearTimeout(t1);
      window.clearTimeout(t2);
    };
  }, [ativo]);

  return (
    <span
      ref={alvo}
      className={`ph ${on ? "ph-on" : ""} ${corte ? "ph-reset" : ""}`}
    >
      <span className="relative z-[1]">{children}</span>
      <span className="ph-caixa" aria-hidden />
      <span className="ph-cursor" aria-hidden>
        <svg
          width="18"
          height="18"
          viewBox="0 0 16 16"
          fill="currentColor"
          stroke="currentColor"
          strokeWidth="1"
          strokeLinecap="round"
          strokeLinejoin="round"
        >
          <path d="M14.082 2.182a.5.5 0 0 1 .103.557L8.528 15.467a.5.5 0 0 1-.917-.007L5.57 10.694.803 8.652a.5.5 0 0 1-.006-.916l12.728-5.657a.5.5 0 0 1 .556.103z" />
        </svg>
      </span>
    </span>
  );
}

/**
 * Frase de transição: tudo na mesma sans bold, alinhado e centralizado.
 * "sem método" fica laranja e "investimento" recebe o pointer highlight.
 * Se o texto for editado no painel, a divisão das duas linhas continua
 * sendo no primeiro ponto final e os destaques caem no estilo base.
 */
function FraseDestaque({ texto }: { texto: string }) {
  const ponto = texto.indexOf(". ");
  const linha1 = ponto >= 0 ? texto.slice(0, ponto + 1) : texto;
  const linha2 = ponto >= 0 ? texto.slice(ponto + 2) : "";
  const p1 = linha1.split(/(sem método)/i);
  const p2 = linha2.split(/(investimento\.?)/i);
  return (
    <p className="faixa-leitura frase-destaque h-sans" style={{ fontSize: "var(--fs-h2)" }}>
      <span className="block">
        {p1.map((p, i) =>
          p.toLowerCase() === "sem método" ? (
            <span key={i} className="text-accent">
              {p}
            </span>
          ) : (
            p
          ),
        )}
      </span>
      {linha2 && (
        <span className="block">
          {p2.map((p, i) =>
            p.toLowerCase().startsWith("investimento") ? (
              <PointerHighlight key={i}>
                <span className="text-accent">{p}</span>
              </PointerHighlight>
            ) : (
              p
            ),
          )}
        </span>
      )}
    </p>
  );
}

export default function DorReal() {
  return (
    <section
      id="como-trabalhamos"
      className="sec-light relative overflow-hidden pb-16 lg:pb-20"
      aria-labelledby="dor-title"
    >
      <div className="dor-cabecalho container-cut relative">
        {/* ===== mobile (<768px): título serif+sans centralizado (mesma
            linguagem da grade de clientes e do Método) + foto em sangria. */}
        <div className="md:hidden">
          <h2
            id="dor-title"
            className="faixa-leitura mx-auto text-center text-balance"
            style={{ fontSize: "clamp(1.3125rem, 5vw, 2.25rem)" }}
          >
            <span className="h-serif block">{d.tituloLinha1}</span>
            <span className="h-sans block">{d.tituloLinha2}</span>
          </h2>
          <p className="faixa-leitura text-2nd mx-auto mt-6 max-w-[36ch] text-center text-[15px] leading-relaxed">
            {d.texto}
          </p>

          <div className="dor-composicao mt-9">
            <FotoDor />
            <div className="relative z-[1] px-9 pt-[clamp(430px,115vw,580px)] pb-9">
              <p className="eyebrow">{d.sinaisTitulo}</p>
              <ul className="mt-6">
                {d.sinais.map((s, i) => (
                  <li
                    key={s}
                    className="flex items-baseline justify-between gap-4 border-b border-white/12 py-4 last:border-b-0"
                  >
                    <span className="text-[15px] leading-snug font-medium">{s}</span>
                    <span className="step-num shrink-0 text-paper-50/55">
                      {String(i + 1).padStart(2, "0")}
                    </span>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </div>

        {/* ===== md+ : composição em cards, preservada ===== */}
        <div className="hidden gap-3 md:grid md:grid-cols-2 lg:grid-cols-12">
          {/* coluna 1: headline + texto */}
          <div className="flex flex-col gap-3 lg:col-span-4">
            <Reveal className="card-soft">
              <Corner />
              <h2 className="pr-8 text-balance" style={{ fontSize: "clamp(1.35rem, 1.55vw, 1.65rem)" }}>
                <span className="h-serif block leading-snug">{d.tituloLinha1}</span>
                <span className="h-sans block leading-snug">{d.tituloLinha2}</span>
              </h2>
            </Reveal>
            <Reveal delay={90} className="card-soft flex-1">
              <Corner />
              <p className="text-2nd pr-8 text-[15px] leading-relaxed">
                {d.texto}
              </p>
              <p className="h-sans mt-8" style={{ fontSize: "clamp(3rem, 4.5vw, 4.5rem)" }}>
                {d.statNumero}
                <span className="text-accent">×</span>
              </p>
              <p className="mt-2 text-sm text-text2-light">{d.statLabel}</p>
            </Reveal>
          </div>

          {/* coluna 2: imagem central em retrato */}
          <Reveal delay={120} className="lg:col-span-4">
            <Media
              file="dor-central.webp"
              src={d.imagem}
              alt="Pessoa empreendedora sobrecarregada diante do próprio negócio"
              ratio="3 / 4"
              hover
              className="h-full"
            />
          </Reveal>

          {/* coluna 3: os seis sinais em linhas com hairline */}
          <Reveal delay={160} className="card-soft lg:col-span-4">
            <Corner />
            <p className="eyebrow">{d.sinaisTitulo}</p>
            <ul className="mt-6">
              {d.sinais.map((p, i) => (
                <li
                  key={p}
                  className="flex items-baseline justify-between gap-4 border-b border-line-light py-4 last:border-b-0"
                >
                  <span className="text-[15px] leading-snug font-medium">{p}</span>
                  <span className="step-num shrink-0 text-text3">
                    {String(i + 1).padStart(2, "0")}
                  </span>
                </li>
              ))}
            </ul>
          </Reveal>
        </div>

        <Reveal delay={120} className="mt-16 lg:mt-20">
          <FraseDestaque texto={d.fraseTransicao} />
        </Reveal>
      </div>
    </section>
  );
}
