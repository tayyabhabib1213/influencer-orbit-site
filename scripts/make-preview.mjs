// Builds a self-contained preview copy of dist/ with relative links (for hosting under a sub-path).
import { cpSync, readdirSync, readFileSync, writeFileSync, existsSync, rmSync } from 'node:fs';
import { join } from 'node:path';
const src = 'dist', out = process.argv[2] || '../preview-site';
rmSync(out, { recursive: true, force: true });
cpSync(src, out, { recursive: true });
const pages = new Set(readdirSync(out).filter((f) => f.endsWith('.html')).map((f) => f.replace(/\.html$/, '')));
for (const f of readdirSync(out).filter((f) => f.endsWith('.html'))) {
  let h = readFileSync(join(out, f), 'utf8');
  h = h.replace(/(href|src)="\/(?!\/)([^"#?]*)([#?][^"]*)?"/g, (m, attr, path, rest = '') => {
    if (path === '') return `${attr}="index.html${rest}"`;
    if (pages.has(path)) return `${attr}="${path}.html${rest}"`;
    return `${attr}="${path}${rest}"`;
  });
  h = h.replace(/srcset="([^"]+)"/g, (m, v) => `srcset="${v.replace(/(^|,\s*)\//g, '$1')}"`);
  h = h.replace(/url\(\/(fonts|images)\//g, 'url($1/');
  h = h.replace(/url\('\/(fonts|images)\//g, "url('$1/");
  writeFileSync(join(out, f), h);
}
console.log('preview written to', out);
