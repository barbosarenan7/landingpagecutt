# Plano de ação — fechar o ciclo P1

Branch de trabalho: `seo/correcao-renderizacao`. `main` intocada.
Tudo aqui vem dos arquivos do projeto; nada foi inventado.

---

## 1. Bloqueadores de publicação

O que impede o merge para a `main` hoje. São só dois.

| # | Item | Peça(s) afetada(s) | Responsável | Esforço |
| --- | --- | --- | --- | --- |
| 1.1 | Validar o preview na Vercel (HTML cru, títulos, 301, sitemap, checklist visual — seção 5) | Todas | Renan, com o Claude rodando os testes | ~30 min |
| 1.2 | Texto `[VERIFICAR COM RENAN: case a definir]` **visível na página** nas peças que estão no sitemap | 03, 06, 07 (no ar via sitemap) e 11, 12 (fora do sitemap, mas acessíveis por URL) | Renan | Decisão de 5 min (pergunta 2.2) + os textos dos cases |

Tudo o mais (GTM, GMN, revisão regulatória) **não bloqueia o merge**: ou já
está protegido no código (11 e 12 fora do sitemap) ou é ação externa ao
site.

---

## 2. Perguntas de decisão

Responder estas 8 destrava tudo que depende de você.

**2.1 — Quais cases reais entram nos 5 slots?**
Contexto: peças 03 (Resende), 06 (tráfego e social), 07 (audiovisual), 11 (clínicas) e 12 (médicos) têm o slot de case vazio. O da 02 (Moraes) já está escrito.
Formato da resposta: nome do cliente + o que foi feito + o que pode ser dito, por peça. Sem número inventado; qualitativo serve.

**2.2 — Enquanto os cases não chegam, publica como?**
Contexto: hoje o placeholder aparece para o visitante nas peças 03, 06 e 07.
Opções: **(a) ocultar a seção de case nas peças sem case** até o texto chegar (recomendado, é uma mudança pequena de template); (b) segurar o merge até os 5 cases estarem escritos.

**2.3 — O Moraes Buffet de Brasas é de Barra Mansa?**
Contexto: o case está na página de Barra Mansa, mas o texto não afirma a cidade porque essa informação nunca foi passada.
Se sim, uma frase a mais deixa a peça 02 mais forte.

**2.4 — Peça 18: título e slug definitivos?**
Contexto: o ângulo já foi decidido (educativo, sem preço). Falta batizar.
Sugestões: "O que faz o preço de uma agência de marketing variar" → `/blog/o-que-faz-preco-de-agencia-variar` · "Como avaliar a proposta de uma agência antes de fechar" → `/blog/como-avaliar-proposta-de-agencia`.

**2.5 — Existe política de prazo mínimo de contrato?**
Contexto: as respostas sobre fidelidade (peça 03, FAQ 7) e prazo razoável (peça 21, FAQ 2) estão genéricas de propósito, falando em "ciclos" sem número.
Se existe um prazo padrão, as duas respostas ficam mais firmes com ele. Se não existe, ficam como estão.

**2.6 — Publicidade em saúde: as três redações estão de acordo com a prática da Cut?**
Contexto: (a) preço de procedimento "decidido caso a caso com o responsável técnico" (peça 11, FAQ 2); (b) imagem de resultado "não usamos com finalidade promocional" (peça 12, FAQ 2); (c) o texto afirma **três vezes** que toda peça passa por validação prévia do profissional.
A (c) é a mais importante: é promessa de processo. Se não for prática contratual, precisa sair.

**2.7 — Vai ter cliente de odontologia?**
Contexto: a peça 11 fala de clínicas em geral; odonto tem regra própria (CFO).
Se sim, a peça precisa de uma passada específica antes de indexar.

**2.8 — Depoimentos e métricas da home: quando entram os reais?**
Contexto: o código da home tem `showTestimonialPlaceholders: true` (depoimentos de exemplo) e `showMetrics: false` (métricas só entram auditadas). Não bloqueia nada, mas está esperando material real desde a v1.
Formato: respostas reais e autorizadas do CUT NPS + números que você tope exibir.

---

## 3. Dados factuais a preencher

Informação, não decisão. Hoje a lista é curta porque os dados do
audiovisual já chegaram e foram aplicados.

| Dado | Onde entra | Quem fornece |
| --- | --- | --- |
| Textos dos 5 cases (depende da 2.1) | Peças 03, 06, 07, 11, 12 | Renan |
| Depoimentos reais autorizados do CUT NPS | Home (hoje usa placeholder) | Renan / equipe |
| Métricas auditadas, se quiser exibir | Home (`showMetrics` está desligado) | Renan |

---

## 4. Ações externas ao repositório

Nada disso é código, e tudo isso trava a estratégia funcionar.

- [ ] **Revisão regulatória das peças 11 e 12** — responsável técnico externo (profissional de saúde) — **depende de terceiro.** Ler e aprovar as duas páginas; os 6 pontos a checar estão em `verificar-com-renan.md`, item 2. Enquanto não sair, as duas seguem fora do sitemap por configuração.
- [ ] **Publicar o container do GTM** (Enviar → Publicar) — Renan — o código está instalado e os eventos disparam, mas as tags não valem até publicar.
- [ ] **Trocar a chave de API do Botconversa** e atualizar a variável na Vercel — Renan — a chave atual foi colada no chat e deve ser considerada exposta.
- [ ] **GMN: responder ~16 avaliações** — equipe — rascunhos prontos em `GMN-rascunhos.md`.
- [ ] **GMN: publicar as 6 postagens** — equipe — rascunhos no mesmo arquivo.
- [ ] **GMN: cadastrar os 5 serviços** — equipe — lista no mesmo arquivo.
- [ ] **GMN: adicionar 2 categorias** (Produtora de vídeo, Marketing na Internet) — Renan — o autocompletar recusou na primeira tentativa; tentar variações próximas.
- [ ] **Pós-merge: Search Console** — Renan — reenviar o `sitemap.xml` e pedir inspeção das URLs novas + da `/trafego-pago-volta-redonda` consolidada.

---

## 5. Preview na Vercel — passo a passo

### 5.1 Subir o preview

```bash
git push -u origin seo/correcao-renderizacao
```

A Vercel cria o deploy de preview sozinha. Para achar a URL:
vercel.com → projeto → **Deployments** → o deploy da branch
`seo/correcao-renderizacao` → botão Visit. A URL tem a forma
`landingpagecutt-git-seo-correcao-renderizacao-….vercel.app`.

**Me mande essa URL.** Eu rodo os testes da 5.3 e te devolvo o resultado.

### 5.2 URLs para abrir no navegador

```
/                                          home
/trafego-pago-volta-redonda                peça 06 (consolidada)
/producao-audiovisual-volta-redonda        peça 07 (reescrita)
/assessoria-estrategica-de-marketing       peça 08 (não deve ter mudado)
/agencia-marketing-digital-barra-mansa     peça 02
/agencia-marketing-digital-resende         peça 03
/marketing-para-clinicas-volta-redonda     peça 11 (fora do sitemap)
/marketing-para-medicos-volta-redonda      peça 12 (fora do sitemap)
/blog                                      índice
/blog/agencia-ou-freelancer                peça 19
/blog/trafego-pago-ou-organico             peça 20
/blog/como-escolher-agencia-marketing      peça 21
/blog/como-divulgar-negocio-volta-redonda  peça 27
/blog/google-meu-negocio-como-configurar   peça 34
/social-media-volta-redonda                deve REDIRECIONAR para a 06
```

### 5.3 Testes de terminal (trocar `SEU-PREVIEW` pela URL)

```bash
BASE=https://SEU-PREVIEW.vercel.app

# Redirect 301 da URL antiga (esperado: HTTP 301 + location apontando para /trafego-pago-volta-redonda)
curl -sI $BASE/social-media-volta-redonda | head -4

# HTML cru preenchido, sem executar JavaScript (esperado: 1 ou mais em cada)
curl -s $BASE/agencia-marketing-digital-barra-mansa | grep -c "Moraes Buffet"
curl -s $BASE/producao-audiovisual-volta-redonda | grep -c "500 vídeos"
curl -s $BASE/blog/google-meu-negocio-como-configurar | grep -c "categoria principal"

# Título único por rota (esperado: um título diferente por linha, nenhum repetido)
for r in "" trafego-pago-volta-redonda producao-audiovisual-volta-redonda agencia-marketing-digital-barra-mansa agencia-marketing-digital-resende blog blog/agencia-ou-freelancer blog/trafego-pago-ou-organico blog/como-escolher-agencia-marketing blog/como-divulgar-negocio-volta-redonda blog/google-meu-negocio-como-configurar; do curl -s $BASE/$r | grep -o "<title>[^<]*"; done

# Meta description por rota (esperado: texto próprio da página, não o da home)
curl -s $BASE/agencia-marketing-digital-resende | grep -o 'name="description" content="[^"]\{0,80\}'

# Sitemap acessível (esperado: 13)
curl -s $BASE/sitemap.xml | grep -c "<loc>"
```

### 5.4 Checklist visual (no navegador)

- [ ] Home **idêntica** à produção, com duas exceções combinadas: menu com "Tráfego pago e social media" (um item) e link **Blog** no menu suspenso e no rodapé (grupo Navegação)
- [ ] Formulário: preencher um lead de teste → abre o WhatsApp com a mensagem montada → a notificação chega nos 2 números
- [ ] GTM: com o preview aberto, `dataLayer` recebe `lead_form_success` e `click_whatsapp_button` (F12 → Console → digitar `dataLayer`)
- [ ] CTAs "Solicitar diagnóstico" levando ao formulário em todas as páginas novas
- [ ] Botão flutuante do WhatsApp pulsando
- [ ] Celular: menu suspenso abre, tem os 3 serviços + Blog + Início + CTA

### 5.5 Se algum teste falhar

Não mexa em nada. Me mande **a URL do preview + qual teste falhou + o que
apareceu** (o print do terminal serve). Eu diagnostico na branch e corrijo
antes do merge. Falha em preview não afeta o site em produção.

---

## 6. Ordem sugerida de execução

```
1. git push da branch  →  me mandar a URL do preview        (5 min, destrava o merge)
2. Responder 2.2 (publica sem case?) e 2.1 (quais cases)    (destrava o outro bloqueador)
3. Eu valido o preview + aplico o que sair de 2.1/2.2  →  MERGE
4. Logo após o merge:
   a. Publicar o container GTM                              (2 min)
   b. Search Console: reenviar sitemap + inspecionar URLs   (10 min)
   c. Trocar a chave do Botconversa                         (10 min)
5. Em paralelo, sem depender do site:
   - GMN: avaliações, posts, serviços, categorias           (rascunhos prontos)
   - Enviar as peças 11 e 12 para o responsável técnico     (depende de terceiro)
6. Quando a revisão regulatória aprovar  →  eu removo o
   bloqueio das peças 11 e 12 e elas entram no sitemap
7. Respostas 2.3 a 2.8 alimentam as próximas tarefas
   (peça 33 é a próxima da fila; peça 18 espera o título)
```

O passo 1 é o mais barato e o que mais destrava: sem o preview validado,
nada mais anda.
