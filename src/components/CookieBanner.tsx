import { useEffect, useState } from "react";
import { Link } from "react-router-dom";

const KEY = "cut-cookie-consent";

/** Banner LGPD simples: aceitar / só essenciais. */
export default function CookieBanner() {
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    if (!localStorage.getItem(KEY)) setVisible(true);
  }, []);

  const decide = (value: "all" | "essential") => {
    localStorage.setItem(KEY, value);
    setVisible(false);
    // GTM lê este valor para condicionar tags não-essenciais (Pixel/Clarity).
  };

  if (!visible) return null;

  return (
    <div
      role="dialog"
      aria-label="Aviso de cookies"
      className="fixed inset-x-4 bottom-4 z-50 mx-auto max-w-xl rounded-card border border-line-light bg-paper-0 p-5 text-ink-900 shadow-xl md:inset-x-auto md:right-6 md:left-auto"
    >
      <p className="text-sm leading-relaxed text-text2-light">
        Usamos cookies para medir o desempenho do site e das campanhas. Você
        escolhe:{" "}
        <Link to="/privacidade" className="underline underline-offset-4">
          política de privacidade
        </Link>
        .
      </p>
      <div className="mt-4 flex gap-3">
        <button
          type="button"
          onClick={() => decide("all")}
          className="btn-primary !min-h-11 flex-1 justify-center text-sm"
        >
          Aceitar
        </button>
        <button
          type="button"
          onClick={() => decide("essential")}
          className="btn-secondary !min-h-11 flex-1 text-sm"
          style={{ "--line": "var(--color-line-light)" } as React.CSSProperties}
        >
          Só essenciais
        </button>
      </div>
    </div>
  );
}
