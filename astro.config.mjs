import { defineConfig } from "astro/config";
import tailwindcss from "@tailwindcss/vite";
import react from "@astrojs/react";
import sitemap from "@astrojs/sitemap";
import { remarkWikiImages } from "./src/plugins/remark-wiki-images.js";
import { rehypeImageCaption } from "./src/plugins/rehype-image-caption.js";
import expressiveCode from "astro-expressive-code";
import { pluginLineNumbers } from "@expressive-code/plugin-line-numbers";
import googleAnalyticsIntegration from "./src/plugins/google-analytics-integration.js";

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
    expressiveCode({
      themes: ["github-light"],
      plugins: [pluginLineNumbers()],
      defaultProps: {
        showLineNumbers: true,
      },
    }),
    googleAnalyticsIntegration({
      measurementId: process.env.PUBLIC_GA_MEASUREMENT_ID || 'G-4T628XHQ7P'
    }),
  ],
});
