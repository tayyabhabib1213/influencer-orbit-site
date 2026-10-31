// QA: titles, descriptions, headings, images, internal links, anchors and JSON-LD for every built page.
import { readFileSync, readdirSync, existsSync } from 'node:fs';
import { join } from 'node:path';
const dist = process.argv[2] || 'dist';
const pages = readdirSync(dist).filter((f) => f.endsWith('.html'));
let problems = 0;
const flag = (p, m) => { problems++; console.log(`  ✗ ${p}: ${m}`); };
const ids = {};
for (const f of pages) ids[f] = new Set([...readFileSync(join(dist, f), 'utf8').matchAll(/\sid="([^"]+)"/g)].map((m) => m[1]));
const placeholders = [];
for (const f of pages) {
  const h = readFileSync(join(dist, f), 'utf8');
  const title = (h.match(/<title>([^<]*)<\/title>/) || [])[1] || '';
  const desc = (h.match(/<meta name="description" content="([^"]*)"/) || [])[1] || '';
  const t = title.replace(/&#39;|&amp;/g, 'x'), d = desc.replace(/&#39;|&amp;/g, 'x');
  console.log(`${f}\n  title (${t.length}): ${title}\n  desc (${d.length})`);
  if (t.length > 60) flag(f, 'title over 60');
  if (d.length > 155) flag(f, 'description over 155');
  const h1 = (h.match(/<h1[\s>]/g) || []).length; if (h1 !== 1) flag(f, `${h1} h1 tags`);
  const levels = [...h.matchAll(/<h([1-6])[\s>]/g)].map((m) => +m[1]);
  levels.forEach((l, i) => { if (i && l > levels[i - 1] + 1) flag(f, `heading jumps h${levels[i - 1]} → h${l}`); });
  for (const m of h.matchAll(/<img\b[^>]*>/g)) {
    const tag = m[0];
    if (!/\salt="/.test(tag)) flag(f, `img without alt: ${tag.slice(0, 80)}`);
    if (!/\swidth="/.test(tag) || !/\sheight="/.test(tag)) flag(f, `img without size: ${tag.slice(0, 80)}`);
    const src = (tag.match(/src="([^"]+)"/) || [])[1];
    if (src && src.startsWith('/') && !existsSync(join(dist, src))) flag(f, `missing image ${src}`);
  }
  for (const m of h.matchAll(/(?:href|srcset)="(\/[^"#\s]*)(#[^"]*)?"/g)) {
    const [, path, hash] = m; if (path.startsWith('//')) continue;
    const file = path === '/' ? 'index.html' : existsSync(join(dist, path)) ? path.slice(1) : path.slice(1) + '.html';
    if (!existsSync(join(dist, file))) flag(f, `broken link ${path}`);
    else if (hash && file.endsWith('.html') && !ids[file]?.has(hash.slice(1))) flag(f, `missing anchor ${path}${hash}`);
  }
  for (const m of h.matchAll(/href="#([^"]+)"/g)) if (!ids[f].has(m[1])) flag(f, `missing in-page anchor #${m[1]}`);
  for (const m of h.matchAll(/<script type="application\/ld\+json">([\s\S]*?)<\/script>/g)) { try { JSON.parse(m[1]); } catch { flag(f, 'invalid JSON-LD'); } }
  for (const m of h.matchAll(/\[(?:[A-Z][A-Z0-9 %#,'’—:-]{2,}[^\]]*)\]/g)) placeholders.push(`${f}: ${m[0].slice(0, 90)}`);
}
console.log(`\nPlaceholders still on the site (${placeholders.length}):\n` + [...new Set(placeholders)].map((p) => '  • ' + p).join('\n'));
console.log(problems ? `\n${problems} problem(s) found.` : '\nAll checks passed.');
