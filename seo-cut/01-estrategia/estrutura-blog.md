# Estrutura de blog e landings (Tarefa 3, Parte B)

O que foi criado para o cluster ter onde morar. Nenhum componente
existente foi alterado.

## Rotas novas

| Rota | Origem |
| --- | --- |
| `/blog` | Índice, com os posts de `src/content/blog.json` |
| `/blog/<slug>` | Uma por artigo, geradas do mesmo arquivo |
| `/<slug>` (landing BOFU) | Uma por item de `src/content/landings.json` |

Todas nascem com a pré-renderização da Tarefa 1.5 e entram sozinhas no
sitemap: **não é preciso mexer em rota, sitemap ou build para publicar
uma peça nova.**

## Como publicar uma peça

Artigo: acrescentar um objeto em `blog.json → posts`.
Landing: acrescentar um objeto em `landings.json → landings`.

O resto sai de graça: rota registrada em `App.tsx`, metadados montados em
`src/lib/rotas.ts`, HTML pré-renderizado e URL no `sitemap.xml`.

## Arquivos

| Arquivo | Papel |
| --- | --- |
| `src/content/blog.json` | Conteúdo do índice e dos artigos |
| `src/content/landings.json` | Conteúdo das landings BOFU |
| `src/lib/tipos.ts` | Tipos de `Post`, `Landing` e blocos |
| `src/pages/Blog.tsx` | Índice |
| `src/pages/BlogPost.tsx` | Template de artigo |
| `src/pages/LandingBofu.tsx` | Template de landing BOFU |
| `src/components/BlocosConteudo.tsx` | Renderizador dos blocos |
| `src/components/FaqLista.tsx` | Acordeão de FAQ das páginas novas |

## Formato do conteúdo

JSON com blocos, e não Markdown, para não trazer um parser novo só por
isto. O projeto não tem dependência de markdown e não valia adicionar
uma.

Blocos disponíveis:

| Bloco | Uso |
| --- | --- |
| `h2`, `h3` | Subtítulos. Os `h2` viram âncora e alimentam o sumário |
| `p` | Parágrafo |
| `lista` | Lista com marcador (ou `ordenada: true`) |
| `tabela` | Tabela comparativa, com rolagem própria no celular |
| `destaque` | Frase em evidência |
| `advertorial` | Bloco de CTA do diagnóstico, com UTM por artigo |

Dentro de um parágrafo valem duas marcações, de propósito poucas:

```
[texto](/rota)   link (interno via router; externo se começar com http)
**texto**        negrito
```

## Estrutura da landing BOFU

O template cobre as 11 seções obrigatórias, nesta ordem: H1, subheadline
com o audiovisual em destaque, prova social, a dor, o que a Cut entrega,
Método Cut, case, por que agência local com produção própria, FAQ, CTA
final e região atendida.

## Schema por tipo de página

| Página | JSON-LD |
| --- | --- |
| `/blog` | `Blog` |
| Artigo | `BlogPosting` + `BreadcrumbList` + `FAQPage` |
| Landing BOFU | `ProfessionalService`/`LocalBusiness` + `Service` + `BreadcrumbList` + `FAQPage` |

Todas herdam o `ProfessionalService`/`LocalBusiness` global do
`index.html`.

## Componentes: o que foi reaproveitado e o que virou variante

Reaproveitados sem tocar: `Nav`, `Footer`, `WhatsAppFloat`,
`CookieBanner`, `BtnPrimary`, `Reveal` e as classes de `styles.css`.

Uma variante nova foi criada: **`FaqLista.tsx`**. O acordeão da home
(`Faq.tsx`) está em produção e não podia ser alterado, então as páginas
novas usam um componente separado com a mesma linguagem visual. Regra
seguida: variante nova em vez de mudança no original.

## Validação executada

Rodada com conteúdo temporário (um artigo e uma landing), depois
removido para não haver risco de peça de teste ir ao ar.

HTML cru das rotas novas, sem executar JavaScript:

| Rota | Peso | Conteúdo no HTML cru |
| --- | --- | --- |
| `/blog` | 20 KB | título, descrição e card do post |
| `/blog/<slug>` | 24 KB | sumário, H2, lista, tabela, destaque, advertorial e FAQ |
| landing BOFU | 25 KB | as 11 seções, incluindo a menção ao audiovisual próprio |

Páginas protegidas, comparadas byte a byte antes e depois (ignorando o
hash do bundle, que muda porque o JS passou a incluir as rotas novas):

| Página | Resultado |
| --- | --- |
| `/` (home) | **idêntica** |
| `/trafego-pago-volta-redonda` | idêntica |
| `/social-media-volta-redonda` | idêntica |
| `/producao-audiovisual-volta-redonda` | idêntica |
| `/assessoria-estrategica-de-marketing` | idêntica |
| `/privacidade` | idêntica |

A única diferença no HTML da home é o nome do arquivo do bundle
(`index-vm8EYV2C.js` → `index-0Dl-L2iX.js`). Nenhuma diferença de marcação
ou de texto.

## Pendências desta estrutura

1. **Menu e rodapé ainda não linkam para `/blog`.** Fazer isso mexe na
   navegação da home, que é página protegida. Precisa de autorização
   explícita. Hoje `/blog` só é alcançável por URL direta e pelo sitemap.
2. **Sem imagem de destaque nos artigos.** O template não tem campo de
   capa. Se as peças forem levar imagem, o campo entra antes da Tarefa 5.
3. **Sem paginação no índice.** Com 24 artigos previstos, a lista vai
   ficar longa. Resolver quando passar de ~12 peças.
