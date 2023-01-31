import tailwind from '@astrojs/tailwind';
import vercel from '@astrojs/vercel/serverless';
import { defineConfig } from 'astro/config';

// https://astro.build/config
export default defineConfig({
  site: 'https://jsun.lol',
  integrations: [tailwind()],
  output: 'server',
  adapter: vercel(),
});
