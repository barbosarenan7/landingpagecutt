# Diagnóstico técnico — stack e renderização

Levantamento somente leitura. Nenhum arquivo do projeto foi alterado.
Branch de trabalho: `seo/diagnostico-renderizacao`.

## Quadro-resumo

| Campo | Resposta |
| --- | --- |
| Framework e versão | React 19.1.0 com react-router-dom 7.18.2 e TypeScript 5.8.3 |
| Ferramenta de build | Vite 6.3.5 (`@vitejs/plugin-react`), Tailwind 4.1.7 via `@tailwindcss/vite`, gerenciador Bun |
| Modo de renderização atual | **CSR puro (SPA)**. `src/main.tsx` chama `createRoot(...).render(...)` sobre um `<div id="root">` vazio. Não existe SSR, SSG nem hidratação. |
| O HTML cru contém o texto da página? | **Não.** Ver comprovação abaixo. |
| Onde estão definidas as rotas | `src/App.tsx`, dentro de `<Routes>`. Quatro delas são fixas (`/`, `/obrigado`, `/privacidade`, `*`) e quatro são geradas em laço a partir de `src/content/servicos.json`. |
| Existe sitemap.xml? Como é gerado? | Sim, `public/sitemap.xml`, com 6 URLs. É **estático e mantido à mão** — não há script de geração, então rota nova só entra no sitemap se alguém editar o arquivo. |
| Existe robots.txt? O que permite hoje? | Sim, `public/robots.txt`. Libera tudo (`User-agent: * / Allow: /`), bloqueia só `/obrigado` e aponta o sitemap. **Não há regra específica para crawlers de IA** — hoje eles estão liberados, mas esbarram no HTML vazio. |
| Hospedagem suporta SSR? | **Sim.** Vercel, e o projeto já roda uma função serverless (`api/lead.ts`). Ou seja, SSR é possível — mas, como se vê abaixo, não é o caminho recomendado. |
| Caminho recomendado de correção | **Pré-renderização no build (SSG)** com o SSR nativo do Vite + `react-dom/server`. Detalhes e alternativas descartadas na seção "Correção recomendada". |
| Risco de a correção alterar o visual | **Baixo**, com uma ressalva relevante sobre as meta tags (ver "Riscos"). Nenhum componente, texto ou CSS precisa ser tocado. |
| Arquivos que precisariam mudar | `src/main.tsx`, `package.json` (script de build) e dois arquivos novos: `src/entry-server.tsx` e `scripts/prerender.ts`. **Nenhum componente, nenhuma copy, nenhum CSS.** |

## Comprovação: o HTML cru está vazio

Requisição sem execução de JavaScript em `https://cutcreativee.com.br/`:

```
bytes do documento: 5.221
```

Textos do corpo procurados no HTML cru:

| Texto | Resultado |
| --- | --- |
| "Marketing estratégico para empresas" (H1) | ausente |
| "A Cut atende empresas" | ausente |
| "Perguntas que todo empresário" | ausente |
| "Método Cut" | ausente |
| "Solicitar diagnóstico" (CTA) | ausente |
| "Diferenciais" | ausente |

Conteúdo real dentro de `<body>`, com as tags removidas:

```
<noscript><iframe src="https://www.googletagmanager.com/ns.html?id=GTM-MQVRD3LX" ...></iframe></noscript>
<div id="root"></div>
```

O que **existe** no HTML cru: `<title>`, `meta name="description"` (quebrada em várias linhas, por isso um grep ingênuo não acha), `link rel="canonical"`, Open Graph, o JSON-LD do `ProfessionalService` e o script do GTM.

O build local (`dist/index.html`) tem exatamente os mesmos 5.221 bytes e zero ocorrência do texto do corpo — ou seja, **não é efeito de CDN ou cache: é a natureza do build**.

**Conclusão:** a hipótese do plano está correta. Para um crawler que não executa JavaScript, a Cut Creative hoje é um documento com título, descrição e um `<div>` vazio. As quatro páginas de serviço criadas recentemente estão na mesma situação — elas existem só depois que o JS roda.

Um detalhe que agrava: `src/lib/seo.tsx` injeta `title`, `description`, `canonical` e o JSON-LD de cada rota **via `useEffect`**. Como `useEffect` não roda em renderização de servidor nem para crawler sem JS, hoje **todas as rotas internas servem o mesmo `<title>` da home** no HTML cru. Para um robô sem JS, as cinco páginas parecem duplicadas.

## Correção recomendada

**Pré-renderizar no build (SSG), gerando um HTML estático por rota.**

Como funcionaria: um passo extra depois do `vite build` compila a árvore React em Node (build SSR do próprio Vite, sem plugin de terceiros), renderiza cada rota com `renderToString` e grava `dist/<rota>/index.html` com o conteúdo já dentro do `<div id="root">`. No navegador, `hydrateRoot` assume o HTML pronto e o site segue exatamente igual.

Por que este caminho e não outro:

- **O conteúdo é 100% estático.** Não há dado por usuário nem por requisição. SSR de verdade resolveria o mesmo problema cobrando custo de execução a cada visita, sem ganho nenhum aqui.
- **Não exige dependência nova.** O Vite já faz build SSR nativamente e o `react-dom/server` faz parte do `react-dom`, que já está instalado. Nada a instalar, nada a aprovar.
- **A hospedagem continua a mesma.** HTML estático é o que a Vercel já serve; o `rewrites` atual continua cobrindo rota desconhecida.
- **O componente renderizado é o mesmo.** O HTML sai da mesma árvore React que já roda hoje, então o resultado visual é o mesmo por construção.

Alternativas consideradas e descartadas:

| Alternativa | Por que não |
| --- | --- |
| Migrar para Next.js ou Remix | Reescreve o projeto inteiro. Risco altíssimo de alterar layout e copy, exatamente o que as regras proíbem. Desproporcional para um site de 8 páginas estáticas. |
| SSR na Vercel (função por requisição) | Resolve, mas cobra execução a cada visita para entregar um conteúdo que nunca muda. Mais peças para quebrar, zero benefício adicional. |
| Serviço de pré-renderização para bots (Prerender.io) | Custo mensal, dependência externa e serve HTML diferente para robô e para pessoa — prática que o Google trata como cloaking quando mal configurada. |

## Riscos

| Risco | Gravidade | Observação |
| --- | --- | --- |
| **Meta tags não entram no HTML gerado** | **Alto se ignorado** | `src/lib/seo.tsx` usa `useEffect`, que não roda na renderização em Node. Se apenas ligar o prerender, o corpo passa a existir mas as rotas continuam com o `<title>` da home. O script de pré-renderização precisa ler os metadados de cada rota e injetá-los no `<head>` do arquivo gerado. É trabalho previsto, não um imprevisto — mas precisa estar no plano. |
| Divergência de hidratação | Baixo | Varri o código: todo acesso a `window`, `document`, `localStorage`, `matchMedia` e `IntersectionObserver` está dentro de `useEffect` ou de manipulador de evento. Nada no escopo de módulo, então nada quebra ao rodar em Node. |
| Valores não determinísticos | Muito baixo | Dois pontos: `Date.now()` em `LeadForm` (dentro de `useRef`, não vai para o HTML, inofensivo) e `new Date().getFullYear()` no rodapé (renderizado, mas servidor e cliente dão o mesmo ano fora da virada de ano). |
| Animações de entrada | Baixo | `Reveal` e afins começam no estado "fora de cena" e são acionados por `IntersectionObserver` no cliente. O HTML pré-renderizado nasce no mesmo estado inicial de hoje, então o comportamento visual não muda. |
| Peso do HTML | Baixo | Cada página passa de ~5 KB para algo entre 25 e 60 KB. É o custo esperado de ter conteúdo no HTML, e melhora o LCP em vez de piorar. |

## Achados extras (fora do escopo da Tarefa 1, registrados para decisão)

Não corrigi nada disto — apenas anotei durante o levantamento:

1. **Sitemap manual.** `public/sitemap.xml` é editado à mão. Toda rota nova depende de alguém lembrar de atualizá-lo. Gerar no build elimina a chance de esquecimento.
2. **Sem diretriz para crawlers de IA.** O `robots.txt` não menciona GPTBot, ClaudeBot, PerplexityBot nem OAI-SearchBot. Hoje eles estão liberados pela regra geral, mas vale decidir explicitamente se a Cut quer ser citada por essas ferramentas.
3. **Meta description ausente nas rotas internas** no HTML cru, pelo mesmo motivo do item de risco acima.

## Ponto de parada

Diagnóstico concluído conforme a Tarefa 1. **Nenhum arquivo do projeto foi alterado e nada foi publicado.**

Aguardando aprovação para seguir para a Tarefa 1.5.
