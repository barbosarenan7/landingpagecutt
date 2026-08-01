import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import tailwindcss from "@tailwindcss/vite";

export default defineConfig({
  plugins: [react(), tailwindcss()],
  // Porta padrão 5180; PORT env (ex.: preview do Claude Code) tem prioridade.
  server: { port: Number(process.env.PORT) || 5180 },
});
