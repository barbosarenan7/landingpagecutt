import site from "../content/site.json";
import servicos from "../content/servicos.json";
import landingsJson from "../content/landings.json";
import type { ConteudoLandings } from "./tipos";

const landings = (landingsJson as ConteudoLandings).landings;

/**
 * Os serviços como o site os apresenta, na ordem do menu.
 *
 * Existe porque a consolidação de tráfego e social quebrou a suposição
 * de "um item de menu por entrada de servicos.json": a página que
 * sobreviveu virou uma landing BOFU, e o rótulo do menu passou a cobrir
 * dois serviços de uma vez.
 *
 * A ordem e os rótulos vivem em `site.json → nav.servicos`. Aqui só
 * resolvemos o resumo de cada um, olhando nos dois arquivos de conteúdo.
 * Consumido pelo cartão de "outros serviços" das páginas de serviço.
 */
export type ItemServico = { href: string; nome: string; resumo: string };

export const servicosDoMenu: ItemServico[] = site.nav.servicos.map((item) => {
  const slug = item.href.replace(/^\//, "");
  const s = servicos.servicos.find((x) => x.slug === slug);
  const l = landings.find((x) => x.slug === slug);
  return {
    href: item.href,
    nome: item.label,
    resumo: s?.resumo ?? l?.resumo ?? "",
  };
});

/** Os outros serviços, para o rodapé de uma página de serviço. */
export function outrosServicos(slugAtual: string) {
  return servicosDoMenu.filter((s) => s.href !== `/${slugAtual}`);
}
