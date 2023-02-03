import sitemap from '@astrojs/sitemap';
import tailwind from '@astrojs/tailwind';
import vercel from '@astrojs/vercel/serverless';
import { defineConfig } from 'astro/config';
import rehypeAutolinkHeadings from 'rehype-autolink-headings';
import rehypeSlug from 'rehype-slug';

import { SITE } from './src/constants';
import { pages } from './src/sitemap';

// https://astro.build/config
export default defineConfig({
  site: SITE,
  integrations: [tailwind(), sitemap({ customPages: pages })],
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
