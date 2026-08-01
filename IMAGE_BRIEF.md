# IMAGE_BRIEF — Landing Cut Creative (CUT EDITORIAL, layout v2 por referências)

Estética obrigatória (seção 7 do design system): saturação 15–30%, quase
monocromático, um único detalhe laranja quente ocupando menos de 5% do frame,
luz única difusa, grão de filme leve, foco raso. **Proibido:** HDR, céu azul
saturado, verde vivo, filtro quente, texto dentro da imagem, logo de terceiros.

Enquanto a imagem real não existir, o componente `Media`
([primitives.tsx](src/components/primitives.tsx)) renderiza um placeholder
sólido em `--ink-800` com o nome do arquivo em `--text-3` no centro. Para
ativar uma imagem: salvar o arquivo em `public/` e passar `src="/arquivo.webp"`
no slot correspondente. Todas as mídias recebem `saturate(0.24)
contrast(1.06)` + grão via CSS automaticamente.

| # | Arquivo | Ratio | Slot (componente) | Status |
|---|---|---|---|---|
| 1 | `hero-main.webp` | ~3:2 (bleed, corta pelo centro) | Fundo inteiro do card do hero ([Hero.tsx](src/components/Hero.tsx)) | placeholder |
| 2 | `prova-01.webp` | 3:4 | Card alto 01/ da prova social ([ProvaSocial.tsx](src/components/ProvaSocial.tsx)) | placeholder |
| 3 | `prova-02.webp` | 21:9 | Card largo 02/ da prova social | placeholder |
| 4 | `prova-04.webp` | 4:3 | Card 04/ com número grande | placeholder |
| 5 | `dor-central.webp` | 3:4 | Imagem central da dor real ([DorReal.tsx](src/components/DorReal.tsx)) | placeholder |
| 6 | `seg-saude.webp` | 3:4 | Card Saúde ([Segmentos.tsx](src/components/Segmentos.tsx)) | placeholder |
| 7 | `seg-food.webp` | 3:4 | Card Alimentação (Segmentos) | placeholder |
| 8 | `seg-local.webp` | 3:4 | Card Local e regional (Segmentos) | placeholder |
| 9 | `team-g4.webp` | 16:10 | Fundo do painel esquerdo do Solicite ([Diagnostico.tsx](src/components/Diagnostico.tsx)) | ✅ **foto real** em `public/team-g4.jpg` (recorte da IMG_9048; original em `.assets-src/team-g4-original.jpg`) |

Slots removidos no layout v2 (não gerar): `hero-a`, `hero-b`, `step-04`,
`step-06` — o hero agora é uma única imagem em bleed e o Método usa números
tipográficos sem imagem.

## Prompts de geração (Midjourney / Ideogram / Firefly / Nano Banana)

### 1 · hero-main.webp — fundo do hero (ref Dominic®)

O texto branco cruza a imagem: pedir composição com área superior de baixa
informação e sujeito centralizado/à direita.

```
moody editorial portrait of a creative professional in a dark studio,
centered subject with clean empty space above, desaturated near-monochrome
palette, single warm orange accent detail occupying less than 5% of the frame,
soft diffused single-source light, matte surfaces, subtle film grain, dark
neutral grey background, shallow depth of field, 50mm, editorial commercial
photography, high detail, no text, no logo --ar 3:2
```

### 2 · prova-01.webp — card alto 3:4

```
portrait of a proud local business owner standing inside their shop,
desaturated near-monochrome palette, single warm orange accent detail
occupying less than 5% of the frame, soft diffused single-source light, long
soft shadow, matte surfaces, subtle film grain, shallow depth of field, 50mm,
editorial commercial photography, high detail, no text, no logo --ar 3:4
```

### 3 · prova-02.webp — card largo 21:9

```
wide cinematic shot of a busy local business in operation, staff working,
desaturated near-monochrome palette, single warm orange accent detail
occupying less than 5% of the frame, soft diffused light, matte surfaces,
subtle film grain, shallow depth of field, editorial commercial photography,
high detail, no text, no logo --ar 21:9
```

### 4 · prova-04.webp — card do número 4:3

Recebe um "8" branco grande por cima: pedir fundo de baixa informação.

```
dark matte studio detail of camera equipment on a table, low-key lighting,
desaturated near-monochrome, subtle orange rim light under 5% of frame, soft
single light source, film grain, shallow depth of field, editorial, no text,
no logo --ar 4:3
```

### 5 · dor-central.webp — retrato central 3:4

```
small business owner at their counter late at night looking at a phone,
thoughtful mood, desaturated near-monochrome palette, single warm orange
accent detail occupying less than 5% of the frame, single soft light source,
long shadow, subtle film grain, shallow depth of field, 50mm, editorial
commercial photography, no text, no logo --ar 3:4
```

### 6 · seg-saude.webp — 3:4

```
confident doctor in white coat standing in a minimal clinic corridor,
desaturated near-monochrome palette, single warm orange accent detail occupying
less than 5% of the frame, soft diffused single-source studio light, long soft
shadow, matte surfaces, subtle film grain, shallow depth of field, 50mm,
editorial commercial photography, high detail, no text, no logo --ar 3:4
```

### 7 · seg-food.webp — 3:4 (única imagem de movimento da página)

```
chef plating a dish in a busy restaurant kitchen, long exposure motion blur,
desaturated, dark grey background, single light source, editorial, grain,
no text --ar 3:4
```

### 8 · seg-local.webp — 3:4

```
modern local storefront at dusk with a person walking past, desaturated
near-monochrome palette, single warm orange accent detail occupying less than
5% of the frame, soft diffused light, long soft shadow, matte surfaces, subtle
film grain, shallow depth of field, 50mm, editorial commercial photography,
high detail, no text, no logo --ar 3:4
```

### 9 · team-g4.webp — **foto real, não gerar**

Recorte central 16:10 da foto da equipe no estúdio (IMG_9048), otimizada em
`public/team-g4.jpg` (1400×875, ~216 kB). No layout v2 ela é o fundo do painel
esquerdo do Solicite, com scrim escuro por cima. Para trocar: substituir
`public/team-g4.jpg` mantendo o nome.
