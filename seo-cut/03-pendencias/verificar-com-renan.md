# Verificar com o Renan

Aberto na Tarefa 4. Será consolidado na Tarefa 8, quando todas as peças
estiverem escritas. Cada item diz o que bloqueia.

## 1. Revisão regulatória das peças 11 e 12 — BLOQUEIA PUBLICAÇÃO

Publicidade médica e odontológica é regulada pelos conselhos de classe, e
a responsabilidade pelo que vai ao ar é do profissional, não da agência.
As duas peças estão escritas e implementadas, mas com
`revisaoRegulatoria: true` no `landings.json`, o que as mantém **fora do
sitemap**. Nenhuma tarja aparece para o visitante.

| Peça | URL |
| --- | --- |
| 11 | `/marketing-para-clinicas-volta-redonda` |
| 12 | `/marketing-para-medicos-volta-redonda` |

O que foi feito por precaução no texto, sem esperar a revisão:

- Nenhuma promessa de resultado de tratamento.
- Nenhuma menção a antes e depois como argumento de venda.
- Nenhuma oferta, preço ou condição de pagamento de procedimento.
- Nenhum superlativo de comparação ("o melhor", "referência absoluta").
- Nenhum depoimento de paciente.
- A resposta sobre garantia de pacientes diz explicitamente que não há.

O que precisa de decisão humana antes de indexar:

| # | Ponto a checar | Onde aparece |
| --- | --- | --- |
| 1.1 | Um profissional responsável técnico precisa ler e aprovar as duas páginas | as duas |
| 1.2 | Confirmar a redação da resposta sobre **preço em publicidade de saúde**. Hoje ela diz que a decisão é caso a caso com o responsável técnico. Se o seu entendimento for mais restritivo, a pergunta sai | peça 11, FAQ 2 |
| 1.3 | Confirmar a resposta sobre **imagem de resultado**. Hoje diz que a conduta padrão é não usar com finalidade promocional | peça 12, FAQ 2 |
| 1.4 | Confirmar a citação genérica ao **CFM** na FAQ 1 da peça 12. Não citamos número de resolução de propósito, para o texto não envelhecer | peça 12, FAQ 1 |
| 1.5 | Definir se a Cut assume por contrato a **validação prévia de cada peça** pelo profissional. O texto afirma que sim, em três lugares | as duas |
| 1.6 | Odontologia tem regra própria (CFO). Se houver cliente de odonto, a peça 11 precisa de uma passada específica | peça 11 |

Enquanto 1.1 não acontecer, as duas ficam fora do sitemap.

## 2. Cases reais — 5 slots em aberto

O case do **Moraes Buffet de Brasas** foi escrito e está na peça 02
(Barra Mansa), sem número de faturamento e sem métrica inventada, só com
linguagem qualitativa, como você pediu.

Faltam os outros. Você falou em 3 slots; como esta tarefa produziu 6
peças, sobraram 5:

| Peça | Onde entra |
| --- | --- |
| 03 | Resende |
| 06 | tráfego e redes sociais |
| 07 | audiovisual |
| 11 | clínicas |
| 12 | médicos |

Todos marcados no texto como
`[VERIFICAR COM RENAN: case a definir - trabalho com grande empresa de Volta Redonda]`.

Uma observação sobre o case do Moraes: ele está numa página de **Barra
Mansa** e o texto **não afirma** que o cliente é de lá, justamente porque
essa informação não me foi passada. Se ele for de outra cidade, tudo bem
como está; se for de Barra Mansa, dá para dizer isso e a peça fica mais
forte.

## 3. Consolidação da peça 06 — decisão sobre o menu da home

A URL já está decidida: `/trafego-pago-volta-redonda` fica,
`/social-media-volta-redonda` recebe 301.

O que ficou pendente é outra coisa: **o menu suspenso do cabeçalho é
gerado a partir de `servicos.json`**. Consolidar as duas páginas obriga a
escolher entre:

- (a) um item só no menu: "Tráfego pago e redes sociais";
- (b) dois itens apontando para a mesma URL.

Qualquer uma das duas altera o menu da home, que é página protegida. Por
isso a peça 06 não foi aplicada ao site. Passo a passo em
`seo-cut/02-conteudo/bofu/06-trafego-pago-e-redes-sociais-volta-redonda.md`.

## 4. Reescrita da peça 07 — aprovação da troca

A página de audiovisual continua no ar com o texto atual. A reescrita
está pronta, mantém a URL e não mexe no menu. O que muda para o visitante
é o tamanho: passa de 6 para 11 seções, com FAQ, tabela comparativa, case
e grade de logos. Mesma identidade visual.

Só precisa do seu "pode trocar".

## 5. Dados concretos da estrutura audiovisual

As peças falam de estúdio próprio, equipe interna e direção no set,
porque isso já está afirmado na landing principal. O que **não** foi
escrito, por não ter dado real:

- Metragem ou descrição do estúdio.
- Equipamento (câmeras, lentes, iluminação).
- Volume de produção por mês.
- Tamanho da equipe de audiovisual especificamente.

Qualquer um desses tornaria as peças mais concretas. Bloqueia a Tarefa 6,
onde o audiovisual aparece no topo do funil.

## 6. Perguntas que ficaram genéricas por falta de política definida

Duas respostas foram escritas de forma deliberadamente aberta, porque a
resposta certa depende de política comercial, e não de redação:

| Onde | Pergunta | Como está hoje |
| --- | --- | --- |
| Peça 03, FAQ 7 | "Vocês assinam contrato de fidelidade longo?" | Diz que o prazo é acordado antes, sem citar número de meses |
| Peça 02, FAQ 4 | "Vocês trabalham com concorrente direto do meu negócio?" | Afirma que a Cut **não** assume duas contas que disputam o mesmo público na mesma cidade |

O segundo é o mais importante: **isso é uma promessa comercial**. Se não
for verdade na prática, a resposta precisa sair.

## 7. Faixa de investimento

Todas as peças respondem "depende do escopo, sai do diagnóstico". É uma
resposta honesta, mas fraca para quem está comparando agências.

Bloqueia a peça 18 ("Quanto custa uma agência de marketing digital em
Volta Redonda"), que é MOFU P1 e não existe sem faixa de valor.

## 8. Link para /blog no menu e no rodapé

Continua pendente desde a Tarefa 3. Hoje `/blog` só é alcançável por URL
direta e pelo sitemap. Colocar no menu mexe na navegação da home.

Vira urgente na Tarefa 5, quando os primeiros artigos existirem.
