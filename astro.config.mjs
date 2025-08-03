import { defineConfig } from "astro/config";
import tailwindcss from "@tailwindcss/vite";
import react from "@astrojs/react";
import astroExpressiveCode from "astro-expressive-code";
import mdx from "@astrojs/mdx";
import sitemap from "@astrojs/sitemap";
import { rehypeImageCaption } from "./src/plugins/rehype-image-caption.js";

export default defineConfig({
  site: "https://whitepaek.com",
  markdown: {
    rehypePlugins: [rehypeImageCaption],
  },
  vite: {
    resolve: {
      alias: {
        "@": new URL("./src", import.meta.url).pathname,
      },
    },
    plugins: [tailwindcss()],
  },
  integrations: [
    react(),
    astroExpressiveCode({
      themes: ["dracula"],
    }),
    mdx({
      rehypePlugins: [rehypeImageCaption],
    }),
    sitemap(),
  ],
});
