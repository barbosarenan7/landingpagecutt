# Como editar o site da Cut Creative (sem prompt)

Existem **2 formas**. A rápida já funciona hoje. A visual (painel no navegador)
precisa de uma configuração única, explicada no fim.

---

## 1) Textos — arquivo único

Todos os textos do site estão em **`src/content/site.json`**, organizados por
seção (`hero`, `provaSocial`, `dorReal`, `segmentos`, `metodo`, `diagnostico`,
`footer`, `contato`). Para mudar qualquer frase, é só abrir esse arquivo e
alterar o texto **entre aspas**. Exemplos:

```json
"hero": {
  "titulo": "Escreva aqui o novo título do topo",
  "ctaPrimario": "Solicitar diagnóstico gratuito"
}
```

Regras simples:
- Mude só o que está **entre aspas**. Não apague vírgulas, chaves `{ }` nem colchetes `[ ]`.
- Listas (ex.: os 6 “sinais”, as 6 etapas do método) são itens entre `[ ]`
  separados por vírgula.
- Dados de contato (WhatsApp, e-mail, CNPJ, endereço) ficam em `"contato"`.

---

## 2) Fotos — arrastar para a pasta

Cada espaço de imagem tem um **nome de arquivo** (aparece escrito no
placeholder cinza enquanto a foto não existe). Basta salvar a imagem com esse
nome dentro da pasta **`public/`** que ela aparece sozinha no site.

| Onde | Nome do arquivo | Formato |
|---|---|---|
| Topo (hero) | `hero-main.webp` | fundo do card escuro |
| Prova social — card 01 | `prova-01.webp` | vertical (3:4) |
| Prova social — card 02 | `prova-02.webp` | largo (21:9) |
| Prova social — card 04 | `prova-04.webp` | 4:3 |
| A dor real — imagem central | `dor-central.webp` | vertical (3:4) |
| Segmentos — Saúde | `seg-saude.webp` | vertical (3:4) |
| Segmentos — Alimentação | `seg-food.webp` | vertical (3:4) |
| Segmentos — Local | `seg-local.webp` | vertical (3:4) |
| Diagnóstico — equipe | `team-g4.jpg` | já preenchida |
| Logos (16) | `public/logos/logo-01.svg` … `logo-16.svg` | preto/transparente |

> Pode ser `.jpg`, `.png` ou `.webp` — só mantenha o **nome** igual ao da
> coluna. Os prompts para gerar as imagens no estilo do site estão em
> `IMAGE_BRIEF.md`.

---

## 3) Editor visual no navegador (painel `/admin`) — configuração única

Para editar **clicando**, sem abrir arquivo, use o **Pages CMS**
(https://pagescms.org). A configuração dos campos já está pronta no
arquivo `.pages.yml`. Falta só conectar (feito uma vez):

1. **Subir o projeto no GitHub** (repositório privado serve).
2. **Publicar o site** na Vercel ou Netlify, conectando esse repositório
   (elas atualizam o site sozinhas a cada alteração salva).
3. Entrar em **app.pagescms.org**, logar com o GitHub e autorizar o
   repositório. O painel abre com os campos em português (Hero, Prova social,
   etc.) e um botão de **enviar imagem** em cada foto.

A partir daí: você edita no painel → **Salvar** → o site publica sozinho em
1–2 minutos. As fotos enviadas pelo painel vão para `public/uploads`.

> Sem o passo 3, as formas 1 e 2 continuam funcionando normalmente.
