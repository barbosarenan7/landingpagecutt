import { useEffect } from "react";

/**
 * Metadados por rota. O index.html traz os valores da home no HTML
 * estático (bom para o primeiro rastreamento); este componente mantém
 * title, description, canonical, Open Graph e JSON-LD coerentes quando
 * a navegação acontece no cliente — sem isso toda rota herdaria o
 * title da home e o Google veria páginas duplicadas.
 */

const BASE = "https://cutcreativee.com.br";

/** Cria ou atualiza uma <meta> por name/property. */
function upsertMeta(attr: "name" | "property", key: string, content: string) {
  let el = document.head.querySelector<HTMLMetaElement>(`meta[${attr}="${key}"]`);
  if (!el) {
    el = document.createElement("meta");
    el.setAttribute(attr, key);
    document.head.appendChild(el);
  }
  el.setAttribute("content", content);
}

export type SeoProps = {
  /** vai inteiro para a <title> e para og:title */
  title: string;
  description: string;
  /** caminho absoluto da rota, ex.: "/trafego-pago-volta-redonda" */
  path: string;
  /** dados estruturados extras desta página (Service, FAQPage, …) */
  jsonLd?: Record<string, unknown> | Record<string, unknown>[];
};

export function Seo({ title, description, path, jsonLd }: SeoProps) {
  useEffect(() => {
    const url = `${BASE}${path}`;
    document.title = title;
    upsertMeta("name", "description", description);
    upsertMeta("property", "og:title", title);
    upsertMeta("property", "og:description", description);
    upsertMeta("property", "og:url", url);

    let link = document.head.querySelector<HTMLLinkElement>('link[rel="canonical"]');
    if (!link) {
      link = document.createElement("link");
      link.rel = "canonical";
      document.head.appendChild(link);
    }
    link.href = url;
  }, [title, description, path]);

  // JSON-LD desta rota, removido ao sair dela (o schema da empresa vive
  // no index.html e não é tocado aqui)
  useEffect(() => {
    if (!jsonLd) return;
    const script = document.createElement("script");
    script.type = "application/ld+json";
    script.dataset.rota = "true";
    script.textContent = JSON.stringify(jsonLd);
    document.head.appendChild(script);
    return () => {
      script.remove();
    };
  }, [jsonLd]);

  return null;
}
