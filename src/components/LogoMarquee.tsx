/**
 * Barra de clientes em marquee — escura, dourada.
 * Nomes em texto até os logos oficiais serem autorizados ([CONFIRMAR] 5.1).
 */
const clients = [
  "Sabor do Verão",
  "Jump Land",
  "Ótica Boa Vista",
  "Bela Pizza",
  "Costa Lima Piscinas",
  "Vidacor Seguros",
  "Aceplan",
  "Baseco Home",
];

export default function LogoMarquee() {
  const row = [...clients, ...clients];
  return (
    <section aria-label="Clientes atendidos" className="border-t border-line py-10">
      <p className="eyebrow mb-6 text-center text-mute-2">
        Empresas que comunicam com a Cut
      </p>
      <div className="marquee overflow-hidden" role="presentation">
        <div className="marquee-track items-center gap-16 pr-16">
          {row.map((name, i) => (
            <span
              key={i}
              aria-hidden={i >= clients.length}
              className="display flex shrink-0 items-center gap-16 text-xl text-mute transition-colors hover:text-cream"
            >
              {name}
              <span className="serif-accent text-gold/50" aria-hidden>
                ·
              </span>
            </span>
          ))}
        </div>
      </div>
    </section>
  );
}
