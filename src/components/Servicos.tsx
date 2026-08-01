import { Reveal } from "../lib/reveal";

/**
 * Bloco "O QUE FAZEMOS" — redesign sobre o background da mão + logo
 * (public/servicos-bg.jpg). Os 4 serviços orbitam a mão no desktop e
 * empilham no mobile. Estilos contidos neste componente.
 */
type Service = {
  n: string;
  title: string;
  text: string;
  /** posição absoluta no desktop (lg+) */
  pos: string;
  align?: "right";
};

const services: Service[] = [
  {
    n: "01",
    title: "Tráfego pago",
    text: "Campanhas Meta Ads com planejamento, acompanhamento e relatório — mídia para gerar demanda, agendamento e venda, sem verba jogada fora.",
    pos: "top-[38%] left-0",
  },
  {
    n: "02",
    title: "Social media estratégico",
    text: "Gestão completa das redes com calendário estratégico, roteiros, design, edição e postagem — conteúdo com direção, não por obrigação.",
    pos: "top-[24%] right-0",
    align: "right",
  },
  {
    n: "03",
    title: "Produção audiovisual",
    text: "Captação de foto e vídeo com direção criativa e estúdio próprio — comunicação mais forte, humana e cinematográfica.",
    pos: "top-[70%] left-[6%]",
  },
  {
    n: "04",
    title: "Assessoria estratégica",
    text: "Programa de 90 dias com manual de marca, análise de mercado e plano de ação completo — o método, mesmo fora da região.",
    pos: "top-[60%] right-0",
    align: "right",
  },
];

function ServiceItem({ s, className = "" }: { s: Service; className?: string }) {
  return (
    <div className={`max-w-[19rem] ${s.align === "right" ? "lg:text-right" : ""} ${className}`}>
      <span className="text-sm font-medium tracking-wide text-gold">{s.n}</span>
      <h3 className="display mt-2 text-2xl text-cream">{s.title}</h3>
      <p className="mt-3 text-sm leading-relaxed text-mute">{s.text}</p>
    </div>
  );
}

function Heading() {
  return (
    <div className="max-w-md">
      <p className="eyebrow text-gold">O que fazemos</p>
      <h2 className="display mt-5 text-4xl text-cream sm:text-5xl">
        Uma operação inteira, sob o mesmo teto.
      </h2>
    </div>
  );
}

export default function Servicos() {
  return (
    <section id="servicos" className="relative overflow-hidden border-t border-line bg-ink">
      {/* ===== Desktop (lg+): composição sobre o background ===== */}
      <div
        className="relative hidden bg-cover bg-center lg:block"
        style={{ backgroundImage: "image-set(url('/servicos-bg.jpg') 1x)", height: "clamp(760px, 82vh, 940px)" }}
      >
        {/* scrim lateral para legibilidade do texto nas bordas */}
        <div
          aria-hidden
          className="pointer-events-none absolute inset-0"
          style={{
            background:
              "linear-gradient(90deg, rgba(7,6,5,0.6) 0%, transparent 26%, transparent 74%, rgba(7,6,5,0.6) 100%)",
          }}
        />
        <div className="relative mx-auto h-full max-w-7xl px-8">
          <Reveal className="absolute top-[6%] left-8">
            <Heading />
          </Reveal>
          {services.map((s, i) => (
            <Reveal
              key={s.n}
              delay={120 + i * 90}
              className={`absolute ${s.pos} ${s.align === "right" ? "right-8" : "left-8"}`}
            >
              <ServiceItem s={s} />
            </Reveal>
          ))}
        </div>
      </div>

      {/* ===== Mobile / tablet (< lg): empilhado ===== */}
      <div className="px-5 py-20 md:px-8 lg:hidden">
        <Reveal>
          <Heading />
        </Reveal>
        <Reveal delay={100}>
          <img
            src="/servicos-bg-mobile.jpg"
            alt="Uma mão sustentando o símbolo da Cut Creative sob um facho de luz"
            loading="lazy"
            className="mt-10 w-full rounded-2xl border border-line"
          />
        </Reveal>
        <div className="mt-12 grid gap-x-8 gap-y-10 sm:grid-cols-2">
          {services.map((s, i) => (
            <Reveal key={s.n} delay={i * 80}>
              <ServiceItem s={s} className="max-w-none" />
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}
