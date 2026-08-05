# Estado do projeto SEO Cut Creative

Documento de passagem. Cobre tudo desde a Tarefa 1 até agora.
Site: cutcreativee.com.br. Agência Cut Creative, Volta Redonda, RJ.

---

## 1. Situação em uma tela

| | |
| --- | --- |
| Branch de trabalho | `seo/correcao-renderizacao`, **já publicada no GitHub** |
| Último commit | `cc8a755` |
| `main` | `0e314b0`, **intocada**. O site em produção ainda é o antigo |
| Preview | A Vercel cria sozinha a partir da branch publicada |
| Rotas pré-renderizadas | 18 |
| URLs no sitemap | 16 |
| Peças escritas | **14 das 34** do cluster, mais 1 fora do plano original |
| Tarefas concluídas | 1, 1.5, 2, 3, 4, 5, 6, 7 e 8 |

**O merge para `main` não aconteceu.** A tentativa foi bloqueada por uma
trava de segurança do próprio Claude Code, que impede merge para a branch
principal. O Renan autorizou; falta executar. Ver a seção 9.

---

## 2. O problema que originou tudo

A Cut não aparecia no Google para "agência de marketing Volta Redonda".
O diagnóstico da Tarefa 1 achou a causa, e ela era técnica, não editorial:

O site era **CSR puro**. O servidor entregava um HTML de 5 KB sem texto
nenhum, e todo o conteúdo era montado depois pelo JavaScript. O Google
até renderiza JavaScript, com atraso e prioridade menor. Crawler de IA
(ChatGPT, Perplexity, Claude) **não renderiza**: via uma página vazia.

Um segundo defeito agravava: o componente `<Seo>` injetava título e
descrição por `useEffect`, que só roda no navegador. Resultado: todas as
rotas serviam no HTML o mesmo título da home.

---

## 3. Correção técnica (Tarefa 1.5)

Pré-renderização no build, sem trocar de framework e **sem adicionar
nenhuma dependência nova**.

```
build = tsc -b
      + vite build                          (bundle do cliente)
      + vite build --ssr entry-server.tsx   (bundle de servidor)
      + bun run scripts/prerender.ts        (gera o HTML de cada rota)
```

O `prerender.ts` renderiza cada rota para `dist/<rota>/index.html`,
injeta título, descrição, canonical e JSON-LD, e gera o `sitemap.xml`.

Resultados verificados:

| | Antes | Depois |
| --- | --- | --- |
| HTML da home | 5 KB, sem texto | 90 KB, com o texto todo |
| Título por rota | Todos iguais | Um por rota |
| Landings novas | não existiam | 58 a 61 KB de texto no HTML cru |

Outros ajustes da mesma tarefa: `robots.txt` liberando GPTBot,
OAI-SearchBot, ChatGPT-User, ClaudeBot, Claude-Web, PerplexityBot e
Google-Extended; schema da empresa passou a declarar
`["ProfessionalService","LocalBusiness"]`; sitemap gerado no build.

Armadilhas encontradas no caminho, para quem for mexer:

- `StaticRouter` no react-router v7 vem de `"react-router"`, não de
  `"react-router-dom/server"`.
- O caminho do projeto tem espaços, então `new URL().pathname` devolve
  `%20` e quebra o import. Usar `fileURLToPath`.
- JSON com array vazio infere `never[]` no TypeScript. Daí existir
  `src/lib/tipos.ts`.

---

## 4. Arquitetura de conteúdo

Publicar peça nova é **acrescentar um objeto em JSON**. Rota, metadados,
HTML pré-renderizado e URL no sitemap saem sozinhos.

| Arquivo | Papel |
| --- | --- |
| `src/content/landings.json` | Todas as landings BOFU |
| `src/content/blog.json` | Índice e artigos |
| `src/content/site.json` | Conteúdo da home. **Protegido** |
| `src/content/servicos.json` | Só a assessoria, hoje |
| `src/lib/rotas.ts` | Fonte única dos metadados de toda rota |
| `src/lib/tipos.ts` | Tipos de `Post`, `Landing` e blocos |
| `src/lib/servicos-menu.ts` | Serviços do menu e dos cartões |
| `src/pages/LandingBofu.tsx` | Template das landings, 11 seções |
| `src/pages/BlogPost.tsx` | Template dos artigos |
| `src/components/BlocosConteudo.tsx` | Renderizador dos blocos |
| `scripts/prerender.ts` | SSG e sitemap |

O conteúdo vive em JSON com blocos (`h2`, `h3`, `p`, `lista`, `tabela`,
`destaque`, `advertorial`, `pendencia`) em vez de Markdown, para não
trazer um parser só por isso. Dentro do parágrafo valem duas marcações:
`[texto](/rota)` e `**negrito**`.

`FaqLista.tsx` é **variante** do `Faq.tsx` da home. O da home está em
produção e não foi tocado.

---

## 5. O que está no ar na branch

### Landings BOFU (8)

| Peça | Rota | Observação |
| --- | --- | --- |
| 02 | `/agencia-marketing-digital-barra-mansa` | Case Moraes |
| 03 | `/agencia-marketing-digital-resende` | Sem case: não há cliente lá |
| 06 | `/trafego-pago-volta-redonda` | Consolidação de 2 páginas antigas |
| 07 | `/producao-audiovisual-volta-redonda` | Reescrita. Hub do cluster |
| 11 | `/marketing-para-clinicas-volta-redonda` | **Fora do sitemap** |
| 12 | `/marketing-para-medicos-volta-redonda` | **Fora do sitemap** |
| 13 | `/marketing-para-restaurantes-volta-redonda` | Delivery e alimentação |
| 36 | `/treinamento-comercial-e-palestras-volta-redonda` | Fora do plano original |
| 08 | `/assessoria-estrategica-de-marketing` | Já existia. Não reescrita |

### Blog (6 artigos)

| Peça | Rota |
| --- | --- |
| 18 | `/blog/preco-de-agencia-de-marketing` |
| 19 | `/blog/agencia-ou-freelancer` |
| 20 | `/blog/trafego-pago-ou-organico` |
| 21 | `/blog/como-escolher-agencia-marketing` |
| 27 | `/blog/como-divulgar-negocio-volta-redonda` |
| 34 | `/blog/google-meu-negocio-como-configurar` |

### Redirect

`/social-media-volta-redonda` → **301** → `/trafego-pago-volta-redonda`,
via `redirects` no `vercel.json` com `statusCode: 301`.

> A Vercel responde **308** quando se usa `permanent: true`. Por isso o
> código está escrito explicitamente. Isso **só pode ser confirmado com
> deploy**, porque não sai no build local.

---

## 6. A home foi alterada em exatamente três pontos

A regra do projeto inteiro foi: **não mexer na home**. Ela está em
produção e convertendo. As três exceções foram autorizadas uma a uma:

1. O menu e o rodapé passaram a ter **um item** "Tráfego pago e social
   media", no lugar de dois itens separados, por causa da consolidação.
2. Entrou o link **Blog**, no rodapé (grupo Navegação) e no menu suspenso.
3. Entrou o item **Treinamento e palestras** no menu e no rodapé.

Todo commit foi verificado com diff do HTML gerado. Nenhuma outra linha
de marcação ou de texto da home mudou.

---

## 7. Estratégia

### Keyword-mãe e pilar

`agência de marketing digital em Volta Redonda`. Quem disputa é a **home**.

Por isso **não existe** uma peça de cidade para Volta Redonda: ela
competiria de frente com a home pela busca mais importante de todas. As
peças de cidade são só as vizinhas.

### O fio condutor: audiovisual próprio

O cluster inteiro é um argumento repetido de ângulos diferentes: **a Cut
filma, edita e produz com equipe própria; as agências que ranqueiam hoje
terceirizam.** Nenhum concorrente mapeado (DIVIA, Expert Marketing,
Especialista Digital, Savizz, Boost, Activa) pode dizer isso com verdade.

A peça 07 é hub: toda peça que toca em vídeo linka para ela.

### Dados reais da estrutura (confirmados pelo Renan, podem ser usados)

| | |
| --- | --- |
| Estúdio | Próprio, 250 m², em Volta Redonda. O cliente escolhe onde grava |
| Deslocamento | Sem custo em Volta Redonda e Barra Mansa. Demais cidades têm logística, acertada antes da diária |
| Equipamento | Câmera de cinema, iluminação profissional, lapela e boom, drone, gimbal |
| No set | Equipe de produção junto do filmmaker |
| Equipe audiovisual | 4 na captação, 4 editores fixos, mais rede de colaboradores |
| Volume | Mais de 500 vídeos por mês |
| Entrega | Material sai já editado |
| Carteira | 100 clientes ativos, mais de 300 atendidos em 4 anos |
| Retenção | Tempo médio de casa de 14 meses |
| Equipe total | 30 colaboradores |

**Proibido afirmar** qualquer coisa fora desta lista. Em especial, a
frase "a agência de Volta Redonda com mais clientes ativos" foi
**vetada pelo Renan** por falta de prova, e não está em nenhuma página.

### Clientes que podem ser citados pelo nome

Gastro Center, Moraes Buffet de Brasas, Sugoi Sushi, Miss Marmita,
Advogada Mafra, Paulo do Peixe, Bella Pizza, Ducks, Turcos Lanches,
Esquina Grill, Garagem Hot Dogs.

### Cases com números, autorizados

- **Sugoi Sushi**: R$ 5 mil em mídia geraram mais de R$ 150 mil em
  faturamento, retorno acima de 30 vezes. Ajudou a triplicar o
  faturamento da operação.
- **Miss Marmita**: 56% de crescimento no primeiro mês.
- **Advogada Mafra**: custo por contato caiu de R$ 20 para R$ 3, redução
  de 85%.
- **Saúde**: cerca de 50 médicos atendidos, além do Gastro Center, com
  equipe interna dedicada só a marketing médico.

### Política comercial registrada

- Contrato de gestão de redes: **mínimo 4 meses**. Campanha pontual tem
  o prazo do próprio projeto.
- Publicidade médica: a Cut **trabalha com imagem de resultado** quando o
  médico autoriza e solicita, com consentimento formal, seguindo as
  regras do conselho. Não usa como chamariz e não promete resultado.
- Não se fala de preço em conteúdo. A peça 18 explica o que faz o preço
  variar, sem tabelar o da Cut.

---

## 8. Regras de escrita que valem para toda peça nova

1. **Nunca alterar a home** nem página existente sem autorização
   explícita, item por item.
2. **Nada de travessão** como conector. Onde caberia travessão, usar
   ponto ou vírgula. Isso é exigência direta do Renan: travessão soa a
   texto de IA. As páginas novas estão com **zero**.
   O `site.json` e o `servicos.json` ainda têm 12, todos em texto antigo
   da home, e ficaram intocados de propósito.
3. **Não inventar** dado, estatística, cliente ou resultado.
4. **Nenhum `[VERIFICAR COM RENAN]` visível na página.** Se falta dado,
   ou se escreve outra coisa, ou a seção sai. O campo `caseReal` é
   opcional exatamente para isso.
5. Estrutura de landing BOFU: 11 seções, title até 60, description até
   155, 3 CTAs, mínimo 3 links internos, schema completo.
6. Artigo: 1.200 a 1.800 palavras, resposta nos 2 primeiros parágrafos,
   1 tabela, FAQ de 4, 2 advertoriais, mínimo 3 links internos.
7. O audiovisual próprio aparece em toda peça, no ângulo daquela camada.
8. Perspectiva de quem opera no Sul Fluminense.

---

## 9. O que falta, em ordem de importância

### 9.1 Merge para a `main` (BLOQUEADO, precisa do Renan)

O Renan autorizou subir tudo. A execução foi **bloqueada por uma trava
de segurança do Claude Code**, que não permite merge para a branch
principal.

Caminhos para destravar, qualquer um serve:

```bash
git checkout main
git merge seo/correcao-renderizacao
git push origin main
```

Ou abrir o Pull Request que o GitHub sugeriu no push, e clicar em merge:
`https://github.com/barbosarenan7/landingpagecutt/pull/new/seo/correcao-renderizacao`

Depois do merge, a Vercel publica sozinha.

### 9.2 Validar o preview antes do merge

A Vercel já criou o preview a partir da branch publicada. Testes que só
o ambiente real prova:

```bash
BASE=https://SEU-PREVIEW.vercel.app
curl -sI $BASE/social-media-volta-redonda | head -4   # esperado 301
curl -s  $BASE/sitemap.xml | grep -c "<loc>"          # esperado 16
curl -s  $BASE/producao-audiovisual-volta-redonda | grep -c "500 vídeos"
```

### 9.3 Revisão regulatória das peças 11 e 12

Publicidade médica é regulada pelos conselhos e a responsabilidade é do
profissional, não da agência. As duas peças estão escritas e **fora do
sitemap** por configuração (`revisaoRegulatoria: true`), mas ficam
acessíveis por URL direta depois do deploy.

Um responsável técnico precisa ler e aprovar. Os pontos a checar estão em
`seo-cut/03-pendencias/verificar-com-renan.md`.

### 9.4 Correções de linkagem sugeridas e não aplicadas

Da Tarefa 7, sobraram as de prioridade média, listadas em
`seo-cut/01-estrategia/arquitetura-links.md`:

- Variar as âncoras que apontam para a peça 07 (14 links, 6 textos).
- Remover o link duplicado da peça 12 para a 11.
- Linkar as peças 02 e 03 uma na outra.
- Linkar a peça 12 para a 08.
- As peças 13 e 36 são novas e ainda não entraram na matriz.

### 9.5 Ações fora do repositório

| Ação | Situação |
| --- | --- |
| Publicar o container do GTM | Renan pediu para **não publicar ainda** |
| Trocar a chave do Botconversa | Renan decidiu **não trocar**. A chave foi exposta em chat |
| GMN: responder avaliações | Renan faz manualmente |
| GMN: 6 postagens | **Aprovadas.** Textos prontos em `GMN-rascunhos.md`. Precisa do navegador dele logado |
| GMN: 9 serviços | Lista definida, descrições prontas no mesmo arquivo |
| GMN: 2 categorias | Renan quer fazer só depois de tudo pronto |
| Search Console | Renan pediu para pular |

### 9.6 Perguntas em aberto sobre a peça 36

A peça de treinamento e palestras foi escrita sem formato, duração ou
público definidos, porque esses dados nunca foram passados. Ela está
honesta e genérica nesses pontos. Se o Renan definir, dá para deixar
muito mais concreta.

---

## 10. As 20 peças que faltam

Ordem sugerida, do cluster:

| Prioridade | Peças |
| --- | --- |
| Próxima | 33 (vídeo profissional para empresa). É o segundo pilar audiovisual e os dados já existem |
| P2 | 04 Angra, 09 conteúdo Instagram, 14 academias, 22, 23, 24, 26, 28, 29, 31 |
| P3 | 05 Barra do Piraí, 10 branding, 15 imobiliárias, 16 óticas, 17 hotéis, 25, 30, 32, 35 |

---

## 11. Mapa dos documentos do projeto

| Arquivo | O que tem |
| --- | --- |
| `seo-cut/00-diagnostico/stack-e-renderizacao.md` | Diagnóstico técnico da Tarefa 1 |
| `seo-cut/01-estrategia/cluster-map.md` | As 34 peças, prioridades, regras de link |
| `seo-cut/01-estrategia/estrutura-blog.md` | Como a estrutura de conteúdo funciona |
| `seo-cut/01-estrategia/arquitetura-links.md` | Auditoria de linkagem e canibalização |
| `seo-cut/02-conteudo/bofu/` | 7 peças de landing, em markdown |
| `seo-cut/02-conteudo/mofu/` | 4 artigos |
| `seo-cut/02-conteudo/tofu/` | 2 artigos |
| `seo-cut/03-pendencias/verificar-com-renan.md` | Pendências detalhadas |
| `seo-cut/03-pendencias/plano-de-acao-renan.md` | Plano de ação com dono e esforço |
| `seo-cut/03-pendencias/perguntas-para-o-renan.md` | Perguntas ainda sem resposta |
| `GMN-rascunhos.md` | Respostas, 6 postagens e 9 serviços do Google |

Os arquivos em `seo-cut/02-conteudo/` são **gerados a partir do JSON**,
para nunca divergirem do que a página publica de fato.

---

## 12. Histórico de commits da branch

```
450db27  Tarefa 1: diagnóstico técnico (somente leitura)
0d98067  Tarefa 1.5: pré-renderização das rotas
0fb88f5  Tarefa 2: cluster-map com 1 pilar e 34 peças
5739bb5  Tarefa 3: cluster ajustado, estrutura de blog e landings
bbe52f4  Tarefa 4: seis peças BOFU P1
37b4c02  Tarefa 5: aplica as peças 06 e 07, escreve MOFU P1
aa40a5b  Tarefa 6 e 7: audiovisual real, TOFU P1, auditoria de links
6f6ec47  Bloco A e Tarefa 8: correções de linkagem e plano de ação
ff22632  Reforça as 12 âncoras que apontam para a home
f535d99  Aplica respostas do Renan: cases, prazo, limpeza de texto
4a31df4  Aplica rodada 2: peças 13 e 18
9bb45f9  Atualiza cluster-map com a peça 18
cc8a755  Peça 36: treinamento comercial e palestras
```

---

## 13. Como continuar

Antes de escrever qualquer peça nova, ler as regras da seção 8 e os dados
autorizados da seção 7. Depois é só acrescentar o objeto no JSON e rodar
`bun run build`.

A pergunta que o Renan quer responder agora é se dá para **seguir para a
Tarefa 7**, que é a auditoria de linkagem. Ela **já foi feita**, e o
resultado está em `arquitetura-links.md`. As correções de prioridade alta
já foram aplicadas; as de prioridade média estão listadas e esperando
decisão. O que faz sentido agora é rodar a auditoria de novo, porque duas
peças novas (13 e 36) entraram depois dela e ainda não foram medidas.
