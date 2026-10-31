import { defineConfig } from 'astro/config';

// Pages build as flat files (about.html), which Cloudflare Pages serves at clean URLs (/about).
export default defineConfig({
  site: 'https://www.influencerorbit.com',
  trailingSlash: 'never',
  build: {
    format: 'file',
    inlineStylesheets: 'always'
  },
  compressHTML: true
});
