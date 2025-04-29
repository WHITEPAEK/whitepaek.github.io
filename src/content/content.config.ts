import { glob } from "astro/loaders";
import { defineCollection, z } from "astro:content";

const posts = defineCollection({
  loader: glob({ pattern: "**/[^_]*.md", base: "@/content/posts" }),
  schema: z.object({
    category: z.string().optional(),
    title: z.string(),
    pubDate: z.date(),
  }),
});

const logs = defineCollection({
  loader: glob({ pattern: "**/[^_]*.md", base: "@/content/logs" }),
  schema: z.object({
    category: z.string().optional(),
    title: z.string(),
    pubDate: z.date(),
  }),
});

export const collections = { posts, logs };
