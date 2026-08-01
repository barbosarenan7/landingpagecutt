import { Reveal } from "../lib/reveal";

const stats = [
  { v: "+12", l: "especialistas em squads" },
  { v: "6", l: "etapas de método documentado" },
  { v: "1", l: "portal próprio de acompanhamento" },
];

export default function Sobre() {
  return (
    <section id="sobre" className="border-t border-line py-24 md:py-36">
      <div className="mx-auto max-w-7xl px-5 md:px-8">
        <div className="grid gap-8 border-b border-line pb-16 sm:grid-cols-3">
          {stats.map((m, i) => (
            <Reveal
              key={m.l}
              delay={i * 90}
              className={i > 0 ? "sm:border-l sm:border-line sm:pl-8" : ""}
            >
              <p className="display text-6xl text-cream md:text-7xl">{m.v}</p>
              <p className="mt-3 text-sm text-mute">{m.l}</p>
            </Reveal>
          ))}
        </div>

        <div className="mt-16 grid items-start gap-10 lg:grid-cols-2">
          <Reveal>
            <h2 className="display text-3xl text-cream sm:text-4xl">
              Um time completo. Não um freelancer com muitas abas abertas.
            </h2>
          </Reveal>
          <Reveal delay={120}>
            <p className="text-lg leading-relaxed text-mute">
              Estrategistas, gestores de tráfego, social media, designers e um
              núcleo audiovisual com estúdio próprio. Quando você contrata a
              Cut, contrata uma operação inteira — com processo, acompanhamento
              e um portal onde você vê tudo acontecendo.
            </p>
          </Reveal>
        </div>
      </div>
    </section>
  );
}
