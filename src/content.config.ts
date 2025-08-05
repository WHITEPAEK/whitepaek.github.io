import { defineCollection, z } from "astro:content";

import { glob } from "astro/loaders";

const logs = defineCollection({
  loader: glob({ pattern: "**/*.md", base: "./src/content/logs" }),
  schema: z.object({
    headline: z.string(),
    datePublished: z.date(),
    dateModified: z.date(),
    keywords: z.array(z.string()),
  }),
});

const posts = defineCollection({
  loader: glob({ pattern: "**/*.md", base: "./src/content/posts" }),
  schema: z.object({
    headline: z.string(),
    datePublished: z.date(),
    dateModified: z.date(),
    keywords: z.array(z.string()),
  }),
});

const diary = defineCollection({
  loader: glob({ pattern: "**/*.md", base: "./src/content/diary" }),
  schema: z.object({
    headline: z.string(),
    datePublished: z.date(),
    dateModified: z.date(),
    keywords: z.array(z.string()),
  }),
});

export const collections = { logs, posts, diary };
