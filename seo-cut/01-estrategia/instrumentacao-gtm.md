# Instrumentação da home para o GTM

Container **GTM-MQVRD3LX**. Todo o código vive em
[`src/lib/tracking.ts`](../../src/lib/tracking.ts). Os componentes só
expõem os ganchos de marcação; quem decide o que é evento é o módulo.

---

## 1. Seletores de seção (acionadores de visibilidade)

```
[data-section="hero"]
[data-section="como-trabalhamos"]
[data-section="logos-clientes"]
[data-section="manifesto"]
[data-section="provas"]
[data-section="dor"]
[data-section="transicao-metodo"]
[data-section="segmentos"]
[data-section="metodo"]
[data-section="diferenciais"]
[data-section="faq"]
[data-section="diagnostico"]
[data-section="rodape"]
```

Três seções existem duas vezes no HTML, porque a página monta árvores
diferentes para celular e desktop: `como-trabalhamos`, `provas` e `dor`.
As duas cópias carregam o mesmo `data-section`, e só a do breakpoint
ativo está visível. O seletor acima pega as duas, e o módulo trata a
seção como uma só: o relógio só fecha quando nenhuma variante está na
tela.

## 2. Eventos (acionadores de evento personalizado)

| Evento | Quando |
|---|---|
| `form_start` | primeiro foco em qualquer campo, uma vez |
| `form_field_complete` | campo sai do foco preenchido (checkbox: ao marcar) |
| `form_field_error` | validação rejeita um campo |
| `form_abandon` | aba escondida ou página descarregada com o form começado e não enviado |
| `form_submit_attempt` | submit, antes de validar |
| `generate_lead` | **conversão**, só na confirmação de sucesso |
| `form_submit_error` | falha técnica no envio |
| `secao_tempo` | seção sai da tela depois de 1s ou mais visível |
| `retorno_secao` | seção já lida volta à tela por 1s ou mais |
| `rolagem_rapida` | passa de 70% da página em menos de 10s sem ler nada |
| `carrossel_interacao` | card do carrossel de provas alcançado |
| `rage_click` | 3 cliques no mesmo elemento em menos de 2s |
| `copiou_contato` | cópia de WhatsApp, e-mail ou endereço |
| `clique_whatsapp` | qualquer link `wa.me` |
| `clique_cta` | clique em elemento com `data-cta` |
| `faq_interacao` | pergunta do FAQ aberta |
| `intencao_saida` | ponteiro cruza o topo da janela (só desktop) |
| `retorno_aba` | volta à aba depois de mais de 30s fora |

Os três eventos que já existiam continuam intactos e não devem ser
mexidos: `lead_form_success`, `lead_form_submit` e
`click_whatsapp_button`.

## 3. Dimensões e métricas no GA4

Escopo de **evento** em todos os casos. As quatro últimas são numéricas
e entram como **métrica personalizada**, não dimensão.

| Parâmetro | Tipo |
|---|---|
| `page_variant` | dimensão (`desktop` ou `mobile`) |
| `form_id` | dimensão |
| `field_name` | dimensão |
| `error_type` | dimensão (`obrigatorio` ou `formato_invalido`) |
| `segmento` | dimensão |
| `investimento` | dimensão |
| `secao` | dimensão |
| `secao_atual` | dimensão |
| `secao_origem` | dimensão |
| `origem` | dimensão |
| `cta` | dimensão |
| `pergunta` | dimensão |
| `tipo` | dimensão |
| `elemento` | dimensão |
| `carrossel` | dimensão |
| `error_message` | dimensão |
| `last_field_name` | dimensão |
| `field_index` | métrica |
| `last_field_index` | métrica |
| `fields_completed` | métrica |
| `tempo_preenchimento` | métrica (segundos) |
| `duracao_segundos` | métrica |
| `vezes` | métrica |
| `profundidade_percentual` | métrica |
| `card_index` | métrica |
| `cliques` | métrica |
| `ordem_abertura` | métrica |
| `total_abertas` | métrica |
| `tempo_fora_segundos` | métrica |
| `field_value` | dimensão (só `segmento` e `investimento`) |

## 4. Privacidade

Dos oito campos do formulário, apenas `segmento` e `investimento` têm o
valor enviado, e os dois são selects de opção fixa. Nome, WhatsApp,
empresa, cargo e desafio nunca saem do navegador: o evento leva o nome
do campo, a posição e, no caso de erro, se ele estava vazio.

O evento de cópia manda só o tipo (`whatsapp`, `email`, `endereco`) e
nunca o texto. O seletor do rage click é montado com tag e atributos de
marcação, nunca com texto da página. O honeypot é ignorado por completo.

## 5. Marcação de clique

| `data-cta` | Onde |
|---|---|
| `header` | CTA do cabeçalho (desktop e dentro do menu do celular) |
| `manifesto` | CTA abaixo do texto da prova social |
| `segmentos` | CTA ao fim dos segmentos |
| `submit-form` | botão de envio do formulário |
| `whatsapp-flutuante` | botão flutuante do WhatsApp |

| `data-faq` | Pergunta |
|---|---|
| `ja-tive-agencia` | Já tive agência e não deu resultado |
| `quanto-custa` | Quanto custa contratar |
| `tempo-de-resultado` | Em quanto tempo vejo resultado |
| `preciso-aparecer` | Preciso aparecer nos vídeos |
| `atende-minha-cidade` | Atende a minha cidade |
| `qual-porte` | Empresas de qual porte |

## 6. Âncoras

`#diagnostico` é o destino de todos os CTAs e leva ao topo da oferta.
`#formulario` agora é o `<form>` e existe só como gancho de
rastreamento: nenhum link aponta para ele.
