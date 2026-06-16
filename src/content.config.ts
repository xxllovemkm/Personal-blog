import { defineCollection, z } from 'astro:content';

const posts = defineCollection({
  type: 'content',
  schema: z.object({
    title: z.string(),
    date: z.coerce.date(),
    category: z.string().optional(),
    tags: z.array(z.string()).default([]),
    summary: z.string().optional(),
    venue: z.string().optional(),
    status: z.string().optional(),
    rank: z.string().optional(),
    paperUrl: z.string().optional(),
    draft: z.boolean().default(false),
  }),
});

const projects = defineCollection({
  type: 'content',
  schema: z.object({
    title: z.string(),
    date: z.coerce.date(),
    tags: z.array(z.string()).default([]),
    repo: z.string().optional(),
    demo: z.string().optional(),
    summary: z.string().optional(),
  }),
});

export const collections = { posts, projects };
