import { Link } from "react-router-dom";
import { site, whatsappHref, track } from "../config/site";
import content from "../content/site.json";
import servicos from "../content/servicos.json";

/** Ícones sociais em SVG inline de 18px (seção 12.8). */
function InstagramIcon() {
  return (
    <svg width="18" height="18" viewBox="0 0 24 24" fill="none" aria-hidden>
      <rect x="2.5" y="2.5" width="19" height="19" rx="5.5" stroke="currentColor" strokeWidth="1.5" />
      <circle cx="12" cy="12" r="4.25" stroke="currentColor" strokeWidth="1.5" />
      <circle cx="17.3" cy="6.7" r="1.2" fill="currentColor" />
    </svg>
  );
}
function WhatsIcon() {
  return (
    <svg width="18" height="18" viewBox="0 0 24 24" fill="currentColor" aria-hidden>
      <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.019-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 0 1-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 0 1-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 0 1 2.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0 0 12.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 0 0 5.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 0 0-3.48-8.413Z" />
    </svg>
  );
}
function LinkedinIcon() {
  return (
    <svg width="18" height="18" viewBox="0 0 24 24" fill="currentColor" aria-hidden>
      <path d="M4.98 3.5a2.5 2.5 0 1 1 0 5 2.5 2.5 0 0 1 0-5ZM3 9h4v12H3V9Zm7 0h3.8v1.65h.05c.53-.95 1.83-1.95 3.76-1.95C21.4 8.7 22 11 22 14.1V21h-4v-6.1c0-1.46-.03-3.34-2.05-3.34-2.05 0-2.36 1.59-2.36 3.23V21h-4V9Z" />
    </svg>
  );
}
function BehanceIcon() {
  return (
    <svg width="18" height="18" viewBox="0 0 24 24" fill="currentColor" aria-hidden>
      <path d="M7.5 5.5c1.9 0 3.4.9 3.4 2.9 0 1.2-.6 2-1.6 2.5 1.4.4 2.1 1.4 2.1 2.9 0 2.3-1.9 3.3-4 3.3H1V5.5h6.5Zm-.4 4.7c.9 0 1.5-.4 1.5-1.3 0-.9-.7-1.2-1.6-1.2H3.7v2.5h3.4Zm.2 4.9c1 0 1.8-.4 1.8-1.5S8.4 12.2 7.3 12.2H3.7v2.9h3.6ZM18.6 8.9c2.6 0 4.2 1.7 4.2 4.5v.7h-6.3c.1 1.3.9 2 2.1 2 .9 0 1.6-.4 1.9-1.1h2.2c-.5 1.8-2 2.8-4.1 2.8-2.7 0-4.5-1.8-4.5-4.5s1.8-4.4 4.5-4.4Zm1.9 3.7c-.1-1.1-.8-1.8-1.9-1.8s-1.9.7-2.1 1.8h4ZM15.2 6.3h5.4v1.4h-5.4V6.3Z" />
    </svg>
  );
}
function MailIcon() {
  return (
    <svg width="18" height="18" viewBox="0 0 24 24" fill="none" aria-hidden>
      <rect x="2.5" y="4.5" width="19" height="15" rx="3" stroke="currentColor" strokeWidth="1.5" />
      <path d="M3.5 7l8.5 6 8.5-6" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
    </svg>
  );
}

/** Canais da marca — o e-mail entra à parte por usar mailto:. */
const redes = [
  {
    rotulo: "Instagram da Cut Creative",
    href: site.instagram,
    icone: <InstagramIcon />,
    evento: "instagram_click",
  },
  {
    rotulo: "WhatsApp comercial da Cut Creative",
    href: whatsappHref(),
    icone: <WhatsIcon />,
    evento: "whatsapp_click",
  },
  {
    rotulo: "LinkedIn da Cut Creative",
    href: site.linkedin,
    icone: <LinkedinIcon />,
    evento: undefined as string | undefined,
  },
  {
    rotulo: "Behance da Cut Creative",
    href: site.behance,
    icone: <BehanceIcon />,
    evento: undefined as string | undefined,
  },
];

export default function Footer() {
  return (
    <footer className="sec-dark relative border-t border-line-dark">
      <div className="container-cut py-12 md:py-20">
        <div className="faixa-leitura grid gap-8 md:grid-cols-2 md:gap-12 lg:grid-cols-4">
          <div>
            <p className="h-sans text-2xl text-paper-50">
              Cut Creative<span className="text-accent">.</span>
            </p>
            <p className="text-2nd mt-4 max-w-xs text-sm leading-relaxed">
              {content.footer.descricao}
            </p>
            <div className="mt-6 flex flex-wrap gap-2">
              {redes.map((r) => (
                <a
                  key={r.rotulo}
                  href={r.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label={r.rotulo}
                  onClick={r.evento ? () => track(r.evento!, { origem: "footer" }) : undefined}
                  className="text-2nd flex h-11 w-11 items-center justify-center rounded-pill border border-line-dark transition-colors hover:border-accent hover:text-paper-50"
                >
                  {r.icone}
                </a>
              ))}
              <a
                href={`mailto:${site.email}`}
                aria-label="E-mail comercial da Cut Creative"
                className="text-2nd flex h-11 w-11 items-center justify-center rounded-pill border border-line-dark transition-colors hover:border-accent hover:text-paper-50"
              >
                <MailIcon />
              </a>
            </div>
          </div>

          <nav aria-label="Seções do site">
            <p className="eyebrow">Navegação</p>
            <ul className="mt-5 flex flex-col gap-3 text-sm">
              {[
                ["#como-trabalhamos", "Como trabalhamos"],
                ["#segmentos", "Segmentos"],
                ["#metodo", "Método"],
                ["#diagnostico", "Diagnóstico gratuito"],
              ].map(([href, label]) => (
                <li key={href}>
                  <a href={href} className="text-2nd transition-colors hover:text-paper-50">
                    {label}
                  </a>
                </li>
              ))}
            </ul>

            {/* páginas de serviço: links internos ajudam o Google a
                encontrar e entender as novas páginas */}
            <p className="eyebrow mt-8">Serviços</p>
            <ul className="mt-5 flex flex-col gap-3 text-sm">
              {servicos.servicos.map((s) => (
                <li key={s.slug}>
                  <Link
                    to={`/${s.slug}`}
                    className="text-2nd transition-colors hover:text-paper-50"
                  >
                    {s.nome}
                  </Link>
                </li>
              ))}
            </ul>
          </nav>

          <div>
            <p className="eyebrow">Contato</p>
            <ul className="mt-5 flex flex-col gap-3 text-sm">
              <li>
                <a
                  href={whatsappHref()}
                  target="_blank"
                  rel="noopener noreferrer"
                  onClick={() => track("whatsapp_click", { origem: "footer" })}
                  className="text-2nd transition-colors hover:text-paper-50"
                >
                  WhatsApp comercial
                </a>
              </li>
              <li>
                <a href={`mailto:${site.email}`} className="text-2nd transition-colors hover:text-paper-50">
                  {site.email}
                </a>
              </li>
            </ul>
          </div>

          <div>
            <p className="eyebrow">Onde estamos</p>
            <p className="text-2nd mt-5 text-sm leading-relaxed">{site.address}</p>
            <p className="mt-2 text-sm leading-relaxed text-text3">{site.region}</p>
          </div>
        </div>

        <div className="faixa-leitura-lista mt-10 flex flex-col gap-3 border-t border-line-dark pt-6 text-xs text-text3 md:mt-14 md:flex-row md:items-center md:justify-between">
          <p>
            © {new Date().getFullYear()} {site.legalName} — CNPJ {site.cnpj}
          </p>
          <Link to="/privacidade" className="underline underline-offset-4 transition-colors hover:text-paper-50">
            Política de privacidade
          </Link>
        </div>
      </div>

      <span
        className="vert-label absolute top-1/2 right-4 hidden -translate-y-1/2 xl:block"
        aria-hidden
      >
        Cut Creative
      </span>
    </footer>
  );
}
