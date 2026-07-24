// @ts-check
import { defineConfig } from 'astro/config';

import sitemap from '@astrojs/sitemap';

const lastmod = new Date().toISOString();

// https://astro.build/config
export default defineConfig({
  site: 'https://netiza.com.ar',
  integrations: [
    sitemap({
      serialize(item) {
        // Stamp the build date as a freshness hint for crawlers.
        item.lastmod = lastmod;
        item.changefreq = 'monthly';
        item.priority = 1.0;
        return item;
      },
    }),
  ],
});