import { Reveal } from "../lib/reveal";
import { site } from "../config/site";

/**
 * Cards de case (referência LGPSM "What We've Built").
 * v1: sem métricas — números só entram auditados e autorizados (briefing 5.2/13.4).
 * `metric` preenchida + site.showMetrics = true → badge de métrica aparece.
 */
const cases: {
  client: string;
  segment: string;
  challenge: string;
  work: string;
  metric?: string;
  metricLabel?: string;
}[] = [
  {
    client: "Costa Lima Piscinas",
    segment: "Construção & Engenharia",
    challenge: "Ser vista como fornecedora, não como autoridade.",
    work: "Reposicionamento completo para autoridade em engenharia de piscinas — identidade, conteúdo e presença digital.",
  },
  {
    client: "Sabor do Verão",
    segment: "Alimentação & Eventos",
    challenge: "Transformar uma marca de sorvetes em movimento regional.",
    work: "Campanha multi-frente com eventos próprios, cobertura audiovisual e ativação de marca em toda a região.",
  },
  {
    client: "Jump Land",
    segment: "Entretenimento",
    challenge: "Encher o parque em dias de semana, não só no fim de semana.",
    work: "Conteúdo de alto giro + campanhas segmentadas por ocasião — aniversários, escolas e famílias.",
  },
];

export default function Cases() {
  return (
    <section id="cases" className="border-t border-line py-24 md:py-32">
      <div className="mx-auto max-w-7xl px-5 md:px-8">
        <Reveal>
          <p className="eyebrow text-gold">Na prática</p>
        </Reveal>
        <Reveal delay={80}>
          <h2 className="display mt-4 max-w-4xl text-4xl sm:text-5xl lg:text-6xl">
            O que acontece quando o marketing <em className="serif-accent text-gold">tem método.</em>
          </h2>
        </Reveal>

        <div className="mt-14 grid gap-px border border-line bg-line lg:grid-cols-3">
          {cases.map((c, i) => (
            <Reveal
              key={c.client}
              delay={i * 90}
              className="card-lift group border border-transparent bg-ink"
            >
              {/* Foto do trabalho ([CONFIRMAR] 9.3 — autorização por cliente) */}
              <div className="relative aspect-[4/3] overflow-hidden border-b border-line bg-ink-2">
                <div className="absolute inset-0 flex items-center justify-center">
                  <span className="display text-3xl text-line transition-colors duration-300 group-hover:text-gold/40">
                    {c.client.split(" ")[0].toUpperCase()}
                  </span>
                </div>
                <span className="eyebrow absolute top-4 left-4 text-mute-2">{c.segment}</span>
              </div>
              <div className="p-8">
                <h3 className="display text-xl">{c.client}</h3>
                <p className="mt-3 text-sm leading-relaxed text-mute-2">
                  <span className="text-mute">Desafio:</span> {c.challenge}
                </p>
                <p className="mt-2 text-sm leading-relaxed text-mute">{c.work}</p>
                {site.showMetrics && c.metric && (
                  <p className="mt-6 border-t border-line pt-4">
                    <span className="display text-4xl text-gold">{c.metric}</span>
                    <span className="eyebrow mt-1 block text-mute-2">{c.metricLabel}</span>
                  </p>
                )}
              </div>
            </Reveal>
          ))}
        </div>

        <Reveal delay={120}>
          <p className="mt-8 text-sm text-mute-2">
            Resultados em números entram aqui assim que forem auditados e
            autorizados pelos clientes — na Cut, métrica inventada não existe.
          </p>
        </Reveal>
      </div>
    </section>
  );
}
