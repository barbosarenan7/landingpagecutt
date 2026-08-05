# Verificar com o Renan

Aberto na Tarefa 4, atualizado na Tarefa 5. Será consolidado na Tarefa 8.
Cada item diz o que bloqueia.

## Resolvidas desde a Tarefa 4

| Item | Como ficou |
| --- | --- |
| URL da consolidação (peça 06) | `/trafego-pago-volta-redonda` sobrevive, `/social-media-volta-redonda` recebe 301. **Aplicado** |
| Menu da home na consolidação | Um item só: "Tráfego pago e social media". **Aplicado** |
| Aprovar a troca do texto da peça 07 | Aprovada e **aplicada**, mantendo a URL |
| Promessa de exclusividade por cidade | **Removida.** A pergunta da FAQ da peça 02 virou "Quem vai cuidar da minha conta no dia a dia?" |
| Faixa de investimento | Decidido **não falar de preço**. Ver item 4 |

## 1. Estrutura audiovisual — BLOQUEIA A PUBLICAÇÃO DA PEÇA 07

A página `/producao-audiovisual-volta-redonda` está no ar na branch com um
bloco amarelo tracejado escrito **TROCAR ANTES DE PUBLICAR**, visível para
quem abrir a página. Ele existe para você não esquecer na revisão final, e
precisa sair antes do site ir ao ar.

O que falta para substituir esse bloco por conteúdo de verdade:

| # | Dado | Por quê |
| --- | --- | --- |
| 1.1 | Descrição do estúdio (metragem, ambientes, cenários fixos) | Hoje "estúdio próprio" é afirmação, não prova |
| 1.2 | Equipamento: câmeras, lentes, iluminação, áudio | É o que separa produtora de freelancer com celular |
| 1.3 | Tamanho da equipe de audiovisual especificamente | A home fala em +30 colaboradores no total, o que não diz nada sobre produção |
| 1.4 | Volume mensal de entregas ou de diárias de gravação | Prova de escala, que é o argumento central da página |

Sem esses quatro, a página argumenta bem e não prova nada. Também bloqueia
a Tarefa 6, onde o audiovisual aparece no topo do funil.

## 2. Revisão regulatória das peças 11 e 12 — BLOQUEIA PUBLICAÇÃO

Publicidade médica e odontológica é regulada pelos conselhos de classe, e
a responsabilidade pelo que vai ao ar é do profissional, não da agência.
As duas peças estão escritas e implementadas, com `revisaoRegulatoria:
true` no `landings.json`, o que as mantém **fora do sitemap**. Nenhuma
tarja aparece para o visitante.

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
| 2.1 | Um profissional responsável técnico precisa ler e aprovar as duas páginas | as duas |
| 2.2 | Confirmar a redação sobre **preço em publicidade de saúde**. Hoje ela diz que a decisão é caso a caso com o responsável técnico | peça 11, FAQ 2 |
| 2.3 | Confirmar a resposta sobre **imagem de resultado**. Hoje diz que a conduta padrão é não usar com finalidade promocional | peça 12, FAQ 2 |
| 2.4 | Confirmar a citação genérica ao **CFM**. Não citamos número de resolução de propósito, para o texto não envelhecer | peça 12, FAQ 1 |
| 2.5 | Definir se a Cut assume por contrato a **validação prévia de cada peça** pelo profissional. O texto afirma que sim, em três lugares | as duas |
| 2.6 | Odontologia tem regra própria (CFO). Se houver cliente de odonto, a peça 11 precisa de uma passada específica | peça 11 |

## 3. Cases reais — 5 slots em aberto

O case do **Moraes Buffet de Brasas** está escrito na peça 02 (Barra
Mansa), sem número de faturamento e sem métrica inventada.

| Peça | Onde entra |
| --- | --- |
| 03 | Resende |
| 06 | tráfego e social media |
| 07 | audiovisual |
| 11 | clínicas |
| 12 | médicos |

Todos marcados como
`[VERIFICAR COM RENAN: case a definir - trabalho com grande empresa de Volta Redonda]`.

Uma observação sobre o Moraes: ele está numa página de **Barra Mansa** e o
texto **não afirma** que o cliente é de lá, porque essa informação não me
foi passada. Se for, dá para dizer e a peça fica mais forte.

## 4. Peça 18 — decisão tomada, formato a definir

A peça 18 seria "Quanto Custa uma Agência de Marketing Digital em Volta
Redonda". É a busca de maior volume do nicho e hoje só é respondida por
agências de fora, com faixa nacional genérica.

**Sua decisão:** não falar de preço, porque a Cut não é a mais barata.

Isso está certo do ponto de vista comercial e cria um problema editorial:
um artigo com esse título que não responde a pergunta é o pior dos dois
mundos. A pessoa entra, não encontra número, sai, e o Google registra isso.

Três saídas possíveis, para você escolher na revisão:

| Opção | O que é | Risco |
| --- | --- | --- |
| **A. Não escrever** | A peça sai do cluster | Deixa a busca de maior volume inteira para o concorrente |
| **B. Trocar o ângulo** | Escrever "O que faz o preço de uma agência variar" ou "Como saber se você está pagando caro". Explica a estrutura de custo, os modelos de cobrança e o que muda o valor, sem citar a tabela da Cut | Baixo. Responde a intenção real de quem busca, que é entender se vai ser roubado |
| **C. Faixa de mercado, não a sua** | Citar faixas praticadas na região de forma genérica | Alto. Exige dado real e vira `[FONTE NECESSÁRIA]` |

**Recomendo a B.** Mantém a peça no cluster, respeita a sua decisão de não
tabelar preço e ainda posiciona a Cut como quem explica em vez de quem
esconde. Preciso do seu ok para escrever.

## 5. Link para /blog no menu e no rodapé

Agora tem urgência: os três artigos da Tarefa 5 estão no ar na branch e
`/blog` só é alcançável por URL direta e pelo sitemap. Nenhum link a partir
da home aponta para lá.

Colocar no menu ou no rodapé mexe na navegação da home. Preciso da sua
autorização, como foi com o item de menu da consolidação.

## 6. Perguntas que ficaram abertas por falta de política definida

| Onde | Pergunta | Como está hoje |
| --- | --- | --- |
| Peça 03, FAQ 7 | "Vocês assinam contrato de fidelidade longo?" | Diz que o prazo é acordado antes, sem citar número de meses |
| Peça 21 (artigo), FAQ 2 | "Qual o prazo mínimo de contrato razoável?" | Mesma linha: fala em ciclos, sem número |

Se existe uma política de prazo definida, as duas ficam mais firmes com ela.
