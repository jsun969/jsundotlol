import { defineCollection, z } from 'astro:content';

import friendsJson from './_friends.json';

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

export const friendSchema = z.object({
  github: z.string(),
  name: z.string(),
  website: z.string().url().optional(),
  avatar: z.string().url().optional(),
  description: z.string().optional(),
});

export const friends = z.array(friendSchema).parse(friendsJson);
