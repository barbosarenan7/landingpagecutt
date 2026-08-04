# Cut Creative — Landing page

One-page de conversão + `/obrigado` + `/privacidade`.
Direção visual **CUT EDITORIAL**: Swiss/editorial, monocromático com
acento laranja `#FF4D18`, fundos alternando off-white (`#FAFAF8`) e
near-black (`#0B0B0B`). Tipografia: Satoshi (sans 900) + Instrument
Serif. Tokens em `src/styles.css` (`@theme`) — **não usar hex fora deles**.

## Comandos

```bash
bun install          # dependências
bun run dev          # dev server em http://localhost:5180
bun run build        # build de produção (dist/)
```

## Onde está cada coisa

| O quê | Onde |
|---|---|
| **Todos os textos e caminhos de imagem** | `src/content/site.json` |
| Campos do editor visual (Pages CMS) | `.pages.yml` |
| Cores, fontes, botões, utilitários | `src/styles.css` |
| Ordem das seções | `src/pages/Home.tsx` |
| Componentes (1 por seção) | `src/components/` |
| Como editar sem código | `COMO_EDITAR.md` |
| Slots de imagem + prompts | `IMAGE_BRIEF.md` |

## Publicação

- **Domínio: <https://cutcreativee.com.br>** (Registro.br, apex como
  principal). DNS pelo Registro.br em "Configurar endereçamento" →
  registro A apontando para `216.198.79.1` (IP da Vercel). O modo
  avançado da zona trava o modo básico por 2h — não é necessário.
- GitHub: `barbosarenan7/landingpagecutt`
- Vercel: <https://landingpagecutt.vercel.app> segue no ar como endereço
  de teste. Publica sozinha a cada push na `main` (~1 min). Se não
  atualizar em ~3 min, o webhook falhou: basta um commit vazio
  (`git commit --allow-empty`) e push.
- Editor visual: <https://app.pagescms.org> (login GitHub `barbosarenan7`).
  Salvar no painel = commit + deploy automático.

## Ordem atual das seções

Hero → **Clientes** (grade preta, logos brancos) → Prova social →
A dor real → Segmentos → Método → Diagnóstico + Formulário →
**Carrossel de logos** (marquee) → Footer.

> Os dois blocos de logos (grade e carrossel) são um **teste A/B** em
> paralelo e usam a mesma lista `site.json → logos`. A grade usa as
> versões brancas (`public/logos-white/`), o carrossel as coloridas
> (`public/logos/`). Quando escolher um, o outro pode sair.

## Pendências

1. **Card 03 da prova social sem imagem** — mostra o marcador
   `prova-03.webp`. Falta a foto.
2. **Logo preto** — `public/logo-cut.png` é o logo branco renderizado em
   preto via CSS (`brightness-0`) no header claro. Se existir a versão
   preta original, trocar.
3. **Meta Vestibulares** (`logo-04`) fica com halo no branco — é um logo
   rasterizado com relevo 3D. Ideal pedir vetor/versão chapada.
4. **Vídeo institucional** — o card 01 já tem capa e botão de play, mas
   ainda não abre nada. Falta o link do vídeo.
5. `[CONFIRMAR]` em `site.json → contato`: CNPJ, razão social, endereço.
6. GTM/GA4/Pixel no `index.html` (eventos `lead`, `lead_form_submit`,
   `whatsapp_click` já disparam).

## Formulário → WhatsApp (Botconversa)

Ao enviar o diagnóstico, duas coisas acontecem em paralelo:

1. **Abre o WhatsApp do comercial** (`site.json → contato.whatsapp`) já
   com os dados do lead preenchidos na mensagem — o próprio visitante
   inicia a conversa.
2. **Notifica o WhatsApp pessoal** via Botconversa: o formulário chama a
   função serverless `api/lead.ts`, que do lado do servidor usa a API do
   Botconversa (`get/create subscriber` + `send_message`) para mandar
   todos os dados do lead para o número configurado.

A função é **best-effort**: se o Botconversa falhar ou não estiver
configurado, o envio ainda dá certo — o canal do WhatsApp acima é
garantido e o lead não se perde.

**Configuração (Vercel → Settings → Environment Variables):**

| Variável | O que é |
|---|---|
| `BOTCONVERSA_API_KEY` | Chave "Integração via Webhook" (Botconversa → Configurações → Integrações) |
| `BOTCONVERSA_NOTIFY_PHONE` | Número(s) que recebem a notificação, E.164 só dígitos. Vários = separados por vírgula, ex. `5524999999999,5524988888888` |

Sem essas variáveis, o site funciona igual — só não dispara a
notificação do Botconversa. Template das variáveis em `.env.example`.
Para a notificação chegar, o número precisa ter interagido com o seu bot
(janela de 24h do WhatsApp) — mande um "oi" para o seu próprio bot uma vez.

## Regras que o site respeita

- Mobile-first, sem overflow horizontal, `prefers-reduced-motion` em tudo
- Animações só com `transform`/`opacity`
- Imagens dessaturadas (`saturate(.24)`) — exceto artes prontas do cliente
- LGPD: banner de cookies + aceite no formulário + página de privacidade

## Armadilhas conhecidas

- **Pages CMS e listas:** em `.pages.yml`, listas usam `list: true` no
  próprio campo. Usar `type: list` corrompe o `site.json` (já aconteceu).
- **Antes de editar aqui**, rodar `git pull` — o painel commita direto no
  GitHub e a cópia local não se atualiza sozinha.
- O padding lateral cai para 12px abaixo de 640px (`.container-cut`).
- **Imagens novas em `public/`:** rodar `bun run scripts/otimizar-imagens.ts`
  para gerar os irmãos `.avif`/`.webp` e atualizar o manifesto
  (`src/content/imagens-otimizadas.json`). Sem isso a imagem funciona,
  só não ganha os formatos leves. Uploads do painel (`/uploads`) ficam de
  fora de propósito.
- **Ao instalar o GTM**, liberar os domínios do Google na
  `Content-Security-Policy` do `vercel.json` (`script-src` e
  `connect-src`), senão o script é bloqueado silenciosamente.
- **Satoshi é self-hosted** (`public/fonts/`). Não recolocar o CSS da
  Fontshare no `index.html` — ele é render-blocking e custou ~1,2s de FCP.
