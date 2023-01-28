import { defineCollection, z } from 'astro:content';

const blogCollection = defineCollection({
  schema: z.object({
    title: z.string(),
    date: z.string().transform((str) => new Date(str)),
    tags: z.array(z.string()),
    language: z.enum(['en', 'zh-cn']),
    description: z.string(),
  }),
});

export const collections = { blog: blogCollection };
