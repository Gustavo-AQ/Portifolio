// @ts-check
import { defineConfig } from 'astro/config';
import sitemap from '@astrojs/sitemap';

export default defineConfig({
  site: 'https://me.gaqtech.dev',
  trailingSlash: 'ignore',
  i18n: {
    locales: ['pt', 'en'],
    defaultLocale: 'pt',
    routing: { prefixDefaultLocale: false },
  },
  integrations: [
    sitemap({
      i18n: {
        defaultLocale: 'pt',
        locales: { pt: 'pt-BR', en: 'en' },
      },
      filter: (page) => !page.endsWith('/404/'),
    }),
  ],
  build: { format: 'directory' },
});
