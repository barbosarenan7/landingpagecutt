# Arquitetura de links (Tarefa 7)

Auditoria das 11 peças produzidas até aqui, mais o pilar (01) e a
assessoria (08), que já estava no ar.

**Nada foi corrigido.** As correções estão na última seção, para você
aprovar.

## O que foi medido, e como

Só os **links editoriais**, escritos dentro do texto das peças
(`landings.json` e `blog.json`). Os links de menu e rodapé ficam de fora
da matriz de propósito: eles existem em toda página e distorceriam a
contagem, escondendo peça que na prática está isolada.

Uma correção de método que vale registrar: a primeira rodada extraiu os
links com uma expressão regular rodando sobre o JSON cru, e isso capturou
o `[` de abertura de array como se fosse âncora, inventando âncoras
gigantes que não existem. Refiz percorrendo a estrutura e lendo só as
strings folha. Os números abaixo são da segunda rodada.

## 1. Matriz de linkagem

Linha = quem linka. Coluna = quem recebe. `•` = existe link editorial.

| de \ para | 01 | 02 | 03 | 06 | 07 | 08 | 11 | 12 | 19 | 20 | 21 | 27 | 34 |
| --- | --- | --- | --- | --- | --- | --- | --- | --- | --- | --- | --- | --- | --- |
| **02** Barra Mansa | • | | | • | • | • | | | | | | | |
| **03** Resende | • | | | • | • | • | | | | | | | |
| **06** tráfego e social | • | • | • | | • | • | | | | | | | |
| **07** audiovisual | • | • | • | • | | • | | | | | | | |
| **11** clínicas | • | | | • | • | • | | • | | | | | |
| **12** médicos | • | | | • | • | | • | | | | | | |
| **19** agência ou freelancer | • | | | • | • | • | | | | | | | |
| **20** pago ou orgânico | • | | | • | • | • | | | | | | | |
| **21** como escolher | • | | | • | • | • | | | | | | | |
| **27** como divulgar | • | | | • | • | • | | | | | | | • |
| **34** Google Meu Negócio | | | | • | • | | | | | | | • | |

Legenda das peças: 01 home · 02 Barra Mansa · 03 Resende · 06 tráfego e
social media · 07 audiovisual · 08 assessoria · 11 clínicas · 12 médicos
· 19 agência ou freelancer · 20 pago ou orgânico · 21 como escolher
agência · 27 como divulgar · 34 Google Meu Negócio.

### Links recebidos

| Peça | Recebe de | Total |
| --- | --- | --- |
| 07 audiovisual | 02, 03, 06, 11, 12, 19, 20, 21, 27, 34 | **10** |
| 06 tráfego e social | 02, 03, 07, 11, 12, 19, 20, 21, 27, 34 | **10** |
| 01 home | 02, 03, 06, 07, 11, 12, 19, 20, 21, 27 | **10** |
| 08 assessoria | 02, 03, 06, 07, 11, 19, 20, 21, 27 | **9** |
| 02 Barra Mansa | 06, 07 | 2 |
| 03 Resende | 06, 07 | 2 |
| 11 clínicas | 12 | 1 |
| 12 médicos | 11 | 1 |
| 27 como divulgar | 34 | 1 |
| 34 Google Meu Negócio | 27 | 1 |
| **19 agência ou freelancer** | **ninguém** | **0** |
| **20 pago ou orgânico** | **ninguém** | **0** |
| **21 como escolher** | **ninguém** | **0** |

A peça 07 é hub, como manda a regra 4 do cluster: **toda peça que toca em
vídeo linka para ela.** Isso está cumprido, sem exceção.

## 2. Peças órfãs

**Três: 19, 20 e 21.** Nenhum link editorial aponta para elas. Chegam ao
crawler apenas pelo índice `/blog` e pelo sitemap.

O motivo é cronológico e não conceitual: elas foram escritas na Tarefa 5,
quando nada existia acima delas no funil. As peças 27 e 34, escritas
depois, já nasceram apontando uma para a outra, mas não voltaram para
trás.

O desenho do cluster prevê **TOFU aponta para MOFU, que aponta para
BOFU**. Hoje o TOFU pula o MOFU e vai direto ao BOFU. É a falha mais
relevante desta auditoria.

## 3. Peças com menos de 3 links de saída

Nenhuma. O mínimo é 3 e a pior está exatamente em 3.

| Peça | Saídas únicas |
| --- | --- |
| 06, 07, 11, 27 | 5 |
| 02, 03, 12, 19, 20, 21 | 4 |
| 34 | **3** |

A 34 cumpre a regra no limite, e o problema dela é outro: das 3 saídas,
nenhuma é a home. Ver a seção 5.

## 4. Âncoras genéricas ou duplicadas

Nenhuma âncora genérica do tipo "clique aqui" ou "saiba mais". Todas são
descritivas.

O problema é repetição idêntica:

| Vezes | Âncora | Destino |
| --- | --- | --- |
| **9x** | `assessoria estratégica` | `/assessoria-estrategica-de-marketing` |
| 6x | `Cut Creative` | `/` |
| 5x | `produção audiovisual` | `/producao-audiovisual-volta-redonda` |
| 3x | `produção de vídeo` | `/producao-audiovisual-volta-redonda` |
| 3x | `gestão de tráfego pago` | `/trafego-pago-volta-redonda` |

Nove âncoras idênticas apontando para a mesma URL é o tipo de padrão que
parece otimização automática.

A peça 07 está melhor, e ainda assim não está boa: recebe **14 links com
apenas 6 textos distintos**. "Produção audiovisual" sozinha responde por 5
deles.

Um caso pontual: a peça 12 linka **duas vezes** para
`/marketing-para-clinicas-volta-redonda` com a **mesma âncora**
("marketing para clínicas"), nos blocos `porqueLocal` e `ctaFinal`. O
segundo link não acrescenta nada.

## 5. Toda peça linka para a home?

**Não. Faltam 10 de 11.** A peça **34 (Google Meu Negócio) não tem
nenhum link editorial para `/`**, o que quebra a regra 1 do cluster.

Ela linka para 06, 07 e 27, e o único caminho até o pilar é o logotipo do
cabeçalho, que é link de navegação e não conta como link editorial.

## 6. Canibalização

### Peças de cidade (02 e 03)

| Métrica | Valor |
| --- | --- |
| Sobreposição de texto | **22,6%** (limite 30%) |
| Keyword da 02 | agência de marketing digital em Barra Mansa |
| Keyword da 03 | agência de marketing digital em Resende |
| Abertura | Estruturas diferentes: a 02 parte das duas economias da cidade, a 03 parte da régua criada pelo polo automotivo |
| Formato do bloco 8 | 02 usa tabela, 03 usa lista |

**Sem canibalização.** As keywords têm modificador geográfico distinto e
não competem na mesma busca. A sobreposição de 22,6% é quase toda o
Método Cut, que é cópia literal da home por decisão sua.

**Ressalva:** as duas recebem link só de 06 e 07, e nunca uma da outra.
Uma página de Barra Mansa que menciona Resende sem linkar desperdiça o
sinal geográfico mais barato que existe.

### BOFU de serviço (06, 07 e 08)

| Par | Sobreposição | Risco |
| --- | --- | --- |
| 06 x 07 | **16,4%** | Baixo |
| 06 x 08 | não medida: a 08 é página antiga, com template diferente | Baixo por leitura de keyword |
| 07 x 08 | idem | Baixo |

As três keywords são distintas: gestão de tráfego pago, produção de vídeo
e assessoria estratégica. Nenhuma disputa a mesma busca.

O risco real das três não é canibalização, é **sobreposição de promessa**:
a 06 diz que faz conteúdo, a 07 diz que produz o conteúdo e a 08 diz que
entrega o plano. Para quem chega direto pelo Google, essa fronteira pode
ficar borrada. O texto atual resolve isso razoavelmente, com cada página
mandando o leitor para a outra quando o caso é dela.

### Um risco que não estava na lista: 19, 20, 21 e 27

Quatro peças de topo e meio de funil tratando de "como escolher e por onde
começar". A 21 (como escolher agência) e a 19 (agência ou freelancer) têm
intenção vizinha, e a 27 (como divulgar) toca no mesmo terreno.

As keywords são diferentes o suficiente e nenhuma tem modificador
geográfico conflitante, então o risco hoje é baixo. Vale reavaliar quando
a peça 22 ("agência local ou de fora") entrar, porque aí serão três peças
disputando a mesma dúvida.

## 7. Redirect 301 de `/social-media-volta-redonda`

**Não é possível confirmar funcionamento sem deploy.** O redirect é uma
regra da Vercel, não sai no `dist`, e por isso o build local não prova
nada sobre ele. Isso precisa ser dito com todas as letras.

O que **foi** verificado localmente:

| Verificação | Resultado |
| --- | --- |
| Regra em `vercel.json` | `{"source": "/social-media-volta-redonda", "destination": "/trafego-pago-volta-redonda", "permanent": true}` |
| `permanent: true` gera 301 (e não 307) | Correto |
| `redirects` é avaliado antes de `rewrites` na Vercel | Correto |
| O `rewrites` de SPA não sombreia a regra | Confirmado |
| `dist/social-media-volta-redonda/` ainda existe? | **Não.** Deixou de ser pré-renderizada |
| A URL antiga ainda está no sitemap? | **Não** |
| Alguma página ainda linka para a URL antiga? | **Nenhuma**, nem editorial nem de menu |

Ou seja: está tudo montado para funcionar, e a prova depende do preview.
O comando está no fim deste documento.

## 8. A peça 08 (assessoria) está recebendo links?

**Sim, e bem: 9 links de entrada.** É a peça mais linkada depois do trio
06, 07 e home, o que cumpre a instrução do cluster de "não reescrever, só
linkar".

Duas peças **não** linkam para ela:

| Peça | Deveria? |
| --- | --- |
| 12 médicos | Sim. Médico com equipe e sem querer terceirizar execução é exatamente o público da assessoria |
| 34 Google Meu Negócio | Talvez não. É TOFU puro, e forçar assessoria ali seria salto de funil |

O problema da 08 não é volume de links, é **variedade de âncora**: as 9
entradas usam o mesmo texto.

## 9. Correções sugeridas

Em ordem de impacto. **Nenhuma foi aplicada.**

### Alta

| # | Correção | Onde | Por quê |
| --- | --- | --- | --- |
| A1 | Linkar para a home | peça 34 | Única peça que não linka. Quebra a regra 1 do cluster |
| A2 | Fazer 27 e 34 apontarem para 19, 20 e 21 | peças 27 e 34 | Tira as três do estado órfão e liga TOFU → MOFU, que é o desenho do cluster |
| A3 | Fazer 19, 20 e 21 apontarem para 02 e 03 | peças 19, 20 e 21 | Hoje nenhuma peça de meio de funil manda tráfego para as páginas de cidade |

### Média

| # | Correção | Onde | Por quê |
| --- | --- | --- | --- |
| M1 | Variar as âncoras da assessoria | 9 peças | 9 âncoras idênticas parecem otimização automática. Sugestões: "plano de marketing documentado", "programa de 90 dias", "estratégia para a sua equipe executar" |
| M1b | Variar as âncoras do audiovisual | 5 peças | 14 links com só 6 textos, e "produção audiovisual" repetido 5 vezes |
| M2 | Remover o segundo link para a 11 | peça 12 | Mesma âncora, duas vezes, na mesma página |
| M3 | Linkar 02 ↔ 03 | peças 02 e 03 | Cidades vizinhas que se ignoram desperdiçam sinal geográfico |
| M4 | Linkar 12 → 08 | peça 12 | Médico com equipe própria é público da assessoria |

### Baixa

| # | Correção | Onde | Por quê |
| --- | --- | --- | --- |
| B1 | Variar as âncoras "Cut Creative" para a home | 6 peças | Menos grave que a M1, porque nome de marca repetido é natural |
| B2 | Linkar 11 e 12 a partir de 27 | peça 27 | **Só depois da revisão regulatória.** Hoje as duas estão fora do sitemap de propósito |
| B3 | Reavaliar 19, 21 e 22 juntas | quando a 22 for escrita | Três peças na mesma dúvida pede recorte mais firme |

### Uma observação sobre a ordem

A A2 e a A3 se resolvem juntas em uma passada só, editando cinco peças.
São as duas que mais mudam o desenho do cluster, e as mais baratas de
aplicar, porque é acrescentar frase e não reescrever seção.

## Antes de qualquer merge

O que só o ambiente real prova:

```
curl -sI https://SUA-URL-DE-PREVIEW.vercel.app/social-media-volta-redonda | head -3
curl -s  https://SUA-URL-DE-PREVIEW.vercel.app/producao-audiovisual-volta-redonda | grep -c "500 vídeos"
curl -s  https://SUA-URL-DE-PREVIEW.vercel.app/sitemap.xml | grep -c "<loc>"
```

Esperado: `301` na primeira, `1` ou mais na segunda, `13` na terceira.
