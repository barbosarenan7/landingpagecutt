import { useEffect } from "react";
import { Link } from "react-router-dom";
import { site, track } from "../config/site";
import { Arrow } from "../components/primitives";

/**
 * Página de conversão (mantida para campanhas com redirect).
 * No fluxo do site o sucesso é inline no formulário — o evento `lead`
 * dispara lá; aqui ele cobre acessos vindos de fluxos externos.
 */
export default function Obrigado() {
  useEffect(() => {
    track("lead"); // GA4 + Meta Pixel Lead via GTM
  }, []);

  return (
    <main className="sec-light flex min-h-dvh flex-col items-center justify-center px-5 text-center">
      <p className="eyebrow">Diagnóstico solicitado</p>
      <h1 className="mt-6 max-w-3xl" style={{ fontSize: "var(--fs-h2)" }}>
        <span className="h-serif block">Agora é</span>
        <span className="h-sans block">com a gente.</span>
      </h1>
      <p className="text-2nd mt-8 max-w-xl text-[17px] leading-relaxed">
        Nossa equipe vai analisar as informações da sua empresa e entrar em
        contato em até 1 dia útil pelo WhatsApp que você informou. Enquanto
        isso, conheça nosso trabalho no Instagram.
      </p>
      <div className="mt-10 flex flex-col gap-3 sm:flex-row">
        <a
          href={site.instagram}
          target="_blank"
          rel="noopener noreferrer"
          className="btn-primary"
        >
          Seguir a Cut no Instagram
          <span className="btn-circle" aria-hidden>
            <Arrow />
          </span>
        </a>
        <Link to="/" className="btn-secondary">
          Voltar ao site
        </Link>
      </div>
    </main>
  );
}
