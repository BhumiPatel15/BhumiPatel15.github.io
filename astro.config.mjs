import { defineConfig } from 'astro/config';
import tailwind from '@astrojs/tailwind';
import sitemap from '@astrojs/sitemap';

// SITE and BASE are injected by the GitHub Actions workflow during build
export default defineConfig({
  site: process.env.SITE || 'http://localhost:4321',
  base: process.env.BASE || '/',
  integrations: [tailwind({ applyBaseStyles: true }), sitemap()],
  output: 'static'
});
