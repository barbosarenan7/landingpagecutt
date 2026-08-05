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
| Dados da estrutura audiovisual | **Entregues e aplicados.** O bloco amarelo da peça 07 saiu |
| Link para `/blog` na home | **Autorizado e aplicado**: rodapé (Navegação) e menu suspenso |
| Ângulo da peça 18 | **Decidido**: educativo, sem preço. Título e slug a definir |

## 1. Estrutura audiovisual — RESOLVIDO

Os quatro dados chegaram e foram aplicados. O bloco amarelo "TROCAR ANTES
DE PUBLICAR" **não existe mais** na peça 07.

Onde cada dado entrou, distribuído em vez de concentrado num quadro:

| Dado | Onde aparece na peça 07 |
| --- | --- |
| Estúdio próprio e escolha do local | Subheadline, entregável "Você escolhe onde grava", FAQ |
| Deslocamento sem custo em VR e Barra Mansa | Entregável e FAQ própria. Também na peça 02 (Barra Mansa) e, com a ressalva de logística, na 03 (Resende) |
| Equipamento (câmera de cinema, iluminação, lapela e boom, drone, gimbal) | Entregável "Só equipamento profissional" e FAQ |
| Equipe de produção junto do filmmaker | Entregável próprio |
| 4 na captação e 4 editores fixos | Subheadline, prova social e seção "por que produção própria" |
| Mais de 500 vídeos por mês | Prova social e seção "por que produção própria" |
| Entrega já editada | Entregável de edição, com a observação de que o cliente não recebe arquivo bruto |

A peça 07 continua no sitemap e o único placeholder que resta é o slot de
case, que não impede publicação.

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

## 4. Peça 18 — ângulo decidido, título e slug a definir

Era "Quanto Custa uma Agência de Marketing Digital em Volta Redonda".

**Sua decisão:** a Cut não fala de preço, porque não é a mais barata. O
ângulo passa a ser **educativo, na linha de "o que analisar antes de
contratar uma agência"**: o que faz o preço variar, quais modelos de
cobrança existem e o que muda de fato o valor de uma proposta, sem
tabelar a da Cut.

Registrado no `cluster-map.md`. Falta você definir:

| # | O que falta |
| --- | --- |
| 4.1 | Título definitivo |
| 4.2 | Slug definitivo (o antigo, `/blog/quanto-custa-agencia-marketing-volta-redonda`, não serve mais para o novo ângulo) |

Uma ressalva honesta: com o ângulo novo, a peça deixa de disputar a busca
literal por "quanto custa agência de marketing". Ela passa a disputar uma
busca menor e mais qualificada. É uma troca consciente de volume por
alinhamento comercial, e vale saber que é isso que está sendo trocado.

Um risco a acompanhar: a peça 21 ("como escolher uma agência sem errar")
já cobre parte desse terreno. O recorte da 18 precisa ficar em **custo e
proposta**, e o da 21 em **processo e responsabilidade**, senão as duas
brigam entre si.

## 5. Link para /blog — RESOLVIDO

Autorizado e aplicado em dois lugares, sem deformar componente:

- **Rodapé**, no grupo "Navegação", junto das âncoras de seção. É a
  entrada principal, como você preferiu.
- **Menu suspenso**, no bloco de baixo, ao lado de "Início". Entrou ali
  porque no celular o menu é a única navegação que existe, e deixar o
  blog só no rodapé o esconderia de quem está no telefone.

Não entrou na lista de serviços do menu, porque blog não é serviço.

## 6. Perguntas que ficaram abertas por falta de política definida

| Onde | Pergunta | Como está hoje |
| --- | --- | --- |
| Peça 03, FAQ 7 | "Vocês assinam contrato de fidelidade longo?" | Diz que o prazo é acordado antes, sem citar número de meses |
| Peça 21 (artigo), FAQ 2 | "Qual o prazo mínimo de contrato razoável?" | Mesma linha: fala em ciclos, sem número |

Se existe uma política de prazo definida, as duas ficam mais firmes com ela.
