import { glob } from "astro/loaders";
import { defineCollection, z } from "astro:content";

const logs = defineCollection({
  loader: glob({ pattern: "**/[^_]*.md", base: "@/content/logs" }),
  schema: z.object({
    title: z.string(),
    pubDate: z.date(),
    draft: z.boolean(),
  }),
});

const posts = defineCollection({
  loader: glob({ pattern: "**/[^_]*.md", base: "@/content/posts" }),
  schema: z.object({
    title: z.string(),
    pubDate: z.date(),
    draft: z.boolean(),
  }),
});

const diary = defineCollection({
  loader: glob({ pattern: "**/[^_]*.md", base: "@/content/diary" }),
  schema: z.object({
    title: z.string(),
    pubDate: z.date(),
    draft: z.boolean(),
  }),
});

export const collections = { logs, posts, diary };
