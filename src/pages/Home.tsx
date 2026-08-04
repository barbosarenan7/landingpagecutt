import Nav from "../components/Nav";
import Hero from "../components/Hero";
import ProvaSocial from "../components/ProvaSocial";
import DorReal from "../components/DorReal";
import Segmentos from "../components/Segmentos";
import Metodo from "../components/Metodo";
import Diferenciais from "../components/Diferenciais";
import Faq from "../components/Faq";
import Diagnostico from "../components/Diagnostico";
import ClientesGrid from "../components/ClientesGrid";
import Footer from "../components/Footer";
import WhatsAppFloat from "../components/WhatsAppFloat";
import CookieBanner from "../components/CookieBanner";
import { Seo } from "../lib/seo";
import content from "../content/site.json";

/** FAQPage a partir das perguntas de site.json — elegível a resultado rico. */
const faqSchema = {
  "@context": "https://schema.org",
  "@type": "FAQPage",
  mainEntity: content.faq.itens.map((i) => ({
    "@type": "Question",
    name: i.pergunta,
    acceptedAnswer: { "@type": "Answer", text: i.resposta },
  })),
};

/**
 * CUT EDITORIAL — ritmo de fundos (seção 6):
 * nav/hero claros → prova social escura → dor clara → segmentos escuros
 * → método claro → diagnóstico+form escuros → footer escuro.
 * Thesis, Servicos, Sobre, Faq, Cases e Depoimentos ficam parqueados
 * em src/components/ (fora da árvore) até a v1.1.
 */
export default function Home() {
  return (
    <>
      <Seo
        title="Cut Creative — Agência de marketing em Volta Redonda, RJ"
        description="Agência de marketing estratégico em Volta Redonda: estratégia, social media, tráfego pago e produção audiovisual própria. Solicite um diagnóstico gratuito."
        path="/"
        jsonLd={faqSchema}
      />
      <a
        href="#conteudo"
        className="sr-only focus:not-sr-only focus:fixed focus:top-2 focus:left-2 focus:z-[60] focus:bg-accent focus:px-4 focus:py-2 focus:text-accent-ink"
      >
        Ir para o conteúdo
      </a>
      <Nav />
      <main id="conteudo">
        <Hero />
        {/* clientes: a grade preta logo após o hero (o carrossel marquee
            foi aposentado — o componente segue parqueado em
            src/components/LogoCarousel.tsx se quiser voltar) */}
        <ClientesGrid />
        <ProvaSocial />
        <DorReal />
        <Segmentos />
        <Metodo />
        <Diferenciais />
        <Diagnostico />
        {/* adicionada ao final da página: a posição definitiva fica a
            critério do cliente (pode subir para antes do formulário) */}
        <Faq />
      </main>
      <Footer />
      <WhatsAppFloat />
      <CookieBanner />
    </>
  );
}
