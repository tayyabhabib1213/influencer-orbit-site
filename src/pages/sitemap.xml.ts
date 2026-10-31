import { SITE } from '../data/site';

const pages = [
  { path: '/', priority: '1.0' },
  { path: '/creator-seeding', priority: '0.9' },
  { path: '/case-studies', priority: '0.9' },
  { path: '/about', priority: '0.7' },
  { path: '/book', priority: '0.8' },
  { path: '/competitor-audit', priority: '0.8' },
  { path: '/privacy', priority: '0.2' },
  { path: '/terms', priority: '0.2' }
];

export function GET() {
  const lastmod = new Date().toISOString().slice(0, 10);
  const urls = pages
    .map((p) => `  <url><loc>${SITE.url}${p.path === '/' ? '/' : p.path}</loc><lastmod>${lastmod}</lastmod><priority>${p.priority}</priority></url>`)
    .join('\n');
  return new Response(`<?xml version="1.0" encoding="UTF-8"?>\n<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">\n${urls}\n</urlset>\n`, {
    headers: { 'Content-Type': 'application/xml; charset=utf-8' }
  });
}
