# Cut Creative — Site institucional

One-page de conversão + `/obrigado` + `/privacidade`. Direção visual **cinematográfica dourada**: preto quente, dourado antigo (`#c8a24d`) como acento, headline creme gigante em Archivo bold, Inter para texto. O hero ocupa a tela inteira sobre a imagem `public/hero.jpg` (com versão mobile `hero-mobile.jpg`).

## Imagem do hero

- Fonte original (PNG) arquivada em `.assets-src/hero-original.png`.
- Otimizada para web em `public/hero.jpg` (~208 kB) e `public/hero-mobile.jpg` (~66 kB).
- Trocar de imagem: substituir os dois arquivos em `public/` mantendo os nomes.

## Comandos

```bash
bun install          # instalar dependências
bun run dev          # dev server em http://localhost:5180
bun run build        # build de produção (dist/)
bun run preview      # servir o build
```

## Onde editar

| O quê | Onde |
|---|---|
| Dados pendentes ([CONFIRMAR]) | `src/config/site.ts` — tudo centralizado |
| Copy das seções | `src/components/*.tsx` (uma seção por arquivo) |
| Cores / fontes / animações | `src/styles.css` (`@theme`) |
| Ordem das seções | `src/pages/Home.tsx` |

## Pendências do briefing (bloqueiam o go-live)

1. **WhatsApp comercial** → `site.whatsappNumber`
2. **Webhook Make → Kommo** → `site.leadWebhookUrl` (vazio = modo demonstração: valida e vai para `/obrigado` sem enviar)
3. **Imagem/Showreel do hero** → hoje usa `public/hero.jpg`; para vídeo, trocar o fundo por `<video>` em `src/components/Hero.tsx`
4. **Logos de clientes autorizados** → `src/components/LogoMarquee.tsx` (hoje em texto)
5. **Depoimentos reais do CUT NPS** (com autorização) → `src/components/Depoimentos.tsx`
6. **Fotos** time/estúdio/G4 → `src/components/Sobre.tsx` e `Cases.tsx`
7. **CNPJ, razão social, endereço** → `site.legalName` / `site.cnpj` / `site.address`
8. **Instagram @ oficial, e-mail comercial, URL do portal** → `src/config/site.ts`
9. **GTM/GA4/Pixel/Clarity** → snippet no `index.html` + IDs (eventos já disparam: `lead` em `/obrigado`, `whatsapp_click`, `lead_form_submit`)
10. **Domínio** (cutcreative.com.br) e hospedagem (Vercel sugerido)

## Métricas e cases

- `site.showMetrics = false` — números de impacto só entram auditados (v1.1). Ligar a flag e preencher `metric`/`metricLabel` em `Cases.tsx`.

## Regras que o site respeita

- Mobile-first, sem overflow horizontal, `prefers-reduced-motion` em tudo
- Animações apenas `transform`/`opacity` (60fps)
- Sem preço exposto, sem número inventado, sem foto de banco/IA
- LGPD: banner de cookies + checkbox de aceite + página de privacidade
