import { defineCollection, z } from "astro:content";

import { glob } from "astro/loaders";

const logs = defineCollection({
  loader: glob({ pattern: "**/*.{md,mdx}", base: "./src/content/logs" }),
  schema: z.object({
    title: z.string(),
    pubDate: z.date(),
    updatedDate: z.coerce.date().optional(),
  }),
});

const posts = defineCollection({
  loader: glob({ pattern: "**/*.{md,mdx}", base: "./src/content/posts" }),
  schema: z.object({
    title: z.string(),
    pubDate: z.date(),
    updatedDate: z.coerce.date().optional(),
  }),
});

const diary = defineCollection({
  loader: glob({ pattern: "**/*.{md,mdx}", base: "./src/content/diary" }),
  schema: z.object({
    title: z.string(),
    pubDate: z.date(),
    updatedDate: z.coerce.date().optional(),
  }),
});

export const collections = { logs, posts, diary };
