/**
 * Gera irmãos .avif e .webp para as imagens pesadas de public/ (jpg/png),
 * mantendo o arquivo original como fallback do <picture>.
 *
 * Uso: bun run scripts/otimizar-imagens.ts
 *
 * Regras:
 * - Só converte arquivos com mais de 30KB (abaixo disso o ganho não paga
 *   a requisição extra de decode).
 * - Nunca toca em public/uploads (imagens enviadas pelo painel são
 *   servidas como estão).
 * - Qualidade calibrada para paridade visual: AVIF q60, WebP q82.
 * - Idempotente: pula quando o derivado já existe e é mais novo que o
 *   original.
 */
import { readdirSync, statSync, existsSync, writeFileSync, unlinkSync } from "node:fs";
import { join, extname } from "node:path";
import sharp from "sharp";

const PUBLIC = join(import.meta.dir, "..", "public");
const MANIFESTO = join(import.meta.dir, "..", "src", "content", "imagens-otimizadas.json");
const MIN_BYTES = 30 * 1024;

function* walk(dir: string): Generator<string> {
  for (const nome of readdirSync(dir)) {
    const p = join(dir, nome);
    if (statSync(p).isDirectory()) {
      if (nome === "uploads") continue;
      yield* walk(p);
    } else yield p;
  }
}

let total = 0;
/** Caminhos (relativos à raiz do site) que ganharam .avif E .webp. */
const otimizadas: string[] = [];

for (const arquivo of walk(PUBLIC)) {
  const ext = extname(arquivo).toLowerCase();
  if (![".jpg", ".jpeg", ".png"].includes(ext)) continue;
  const origem = statSync(arquivo);
  if (origem.size < MIN_BYTES) continue;

  let completo = true;
  for (const [formato, opts] of [
    ["avif", { quality: 60 }],
    ["webp", { quality: 82 }],
  ] as const) {
    const destino = arquivo.replace(/\.(jpe?g|png)$/i, `.${formato}`);
    if (!(existsSync(destino) && statSync(destino).mtimeMs > origem.mtimeMs)) {
      await sharp(arquivo)[formato](opts).toFile(destino);
      total++;
    }
    const novo = statSync(destino).size;
    // derivado maior que o original não ajuda ninguém: descarta
    if (novo >= origem.size) {
      unlinkSync(destino);
      completo = false;
      continue;
    }
    console.log(
      `${arquivo.split("/public/")[1]} → .${formato}  ` +
        `${(origem.size / 1024).toFixed(0)}KB → ${(novo / 1024).toFixed(0)}KB` +
        `  (−${(100 - (novo / origem.size) * 100).toFixed(0)}%)`,
    );
  }
  if (completo) otimizadas.push("/" + arquivo.split("/public/")[1]);
}

writeFileSync(MANIFESTO, JSON.stringify(otimizadas.sort(), null, 2) + "\n");
console.log(`\n${total} derivados gerados. Manifesto: ${otimizadas.length} imagens.`);
