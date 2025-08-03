import { defineConfig } from "astro/config";
import tailwindcss from "@tailwindcss/vite";
import react from "@astrojs/react";
import sitemap from "@astrojs/sitemap";
import { remarkWikiImages } from "./src/plugins/remark-wiki-images.js";
import { rehypeImageCaption } from "./src/plugins/rehype-image-caption.js";

export default defineConfig({
  site: "https://whitepaek.com",
  markdown: {
    remarkPlugins: [remarkWikiImages],
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
    sitemap(),
  ],
});
