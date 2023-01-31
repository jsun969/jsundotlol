import tailwind from '@astrojs/tailwind';
import vercel from '@astrojs/vercel/serverless';
import { defineConfig } from 'astro/config';
import rehypeAutolinkHeadings from 'rehype-autolink-headings';
import rehypeSlug from 'rehype-slug';

// https://astro.build/config
export default defineConfig({
  site: 'https://jsun.lol',
  integrations: [tailwind()],
  output: 'server',
  adapter: vercel(),
  markdown: {
    rehypePlugins: [
      rehypeSlug,
      [
        rehypeAutolinkHeadings,
        {
          behavior: 'wrap',
          test: ['h2', 'h3', 'h4', 'h5', 'h6'],
        },
      ],
    ],
  },
});
