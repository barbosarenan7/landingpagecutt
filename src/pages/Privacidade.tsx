import { Link } from "react-router-dom";
import { site } from "../config/site";

/**
 * Política de privacidade padrão (LGPD). Revisar razão social/CNPJ
 * quando confirmados ([CONFIRMAR] 11.9) — os valores vêm de site.ts.
 */
export default function Privacidade() {
  return (
    <main className="sec-light min-h-dvh">
      <div className="mx-auto max-w-3xl px-5 py-24 md:px-8">
        <Link to="/" className="eyebrow transition-colors hover:text-ink-900">
          Voltar
        </Link>
        <h1 className="h-sans mt-8 text-4xl sm:text-5xl">Política de privacidade</h1>

        <div className="text-2nd mt-10 flex flex-col gap-6 leading-relaxed">
          <p>
            Esta política descreve como {site.legalName} (CNPJ {site.cnpj}),
            com sede em {site.address}, trata os dados pessoais coletados neste
            site, em conformidade com a Lei Geral de Proteção de Dados (Lei
            13.709/2018).
          </p>

          <h2 className="mt-4 text-xl font-bold text-ink-900">Dados que coletamos</h2>
          <p>
            Pelo formulário de diagnóstico: nome, WhatsApp, nome da empresa,
            segmento, principal desafio e faixa de investimento em marketing.
            Automaticamente, mediante seu consentimento no aviso de cookies:
            dados de navegação para métricas de desempenho (Google Analytics,
            Meta Pixel e Microsoft Clarity).
          </p>

          <h2 className="mt-4 text-xl font-bold text-ink-900">Para que usamos</h2>
          <p>
            Exclusivamente para retornar seu pedido de diagnóstico, conduzir o
            atendimento comercial e medir o desempenho do site e das campanhas.
            Não vendemos nem compartilhamos seus dados com terceiros fora dos
            operadores necessários ao atendimento (CRM e ferramentas de
            análise).
          </p>

          <h2 className="mt-4 text-xl font-bold text-ink-900">Seus direitos</h2>
          <p>
            Você pode solicitar acesso, correção ou exclusão dos seus dados a
            qualquer momento pelo e-mail{" "}
            <a href={`mailto:${site.email}`} className="underline underline-offset-4">
              {site.email}
            </a>
            .
          </p>

          <h2 className="mt-4 text-xl font-bold text-ink-900">Cookies</h2>
          <p>
            Cookies essenciais mantêm o funcionamento do site. Cookies de medição
            só são ativados com o seu consentimento no aviso exibido na primeira
            visita, e você pode revogá-lo limpando os dados do navegador.
          </p>

          <p className="text-sm text-text3">Última atualização: julho de 2026.</p>
        </div>
      </div>
    </main>
  );
}
