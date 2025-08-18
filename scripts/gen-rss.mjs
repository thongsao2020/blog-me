#!/usr/bin/env node
import { readFileSync, writeFileSync } from 'node:fs';
const site = process.env.SITE_URL || 'https://thongsao2020.github.io/blog-me';
const posts = JSON.parse(readFileSync(new URL('../data/posts.json', import.meta.url)));
const items = posts
  .sort((a,b)=> new Date(b.date)-new Date(a.date))
  .map(p=>`<item><title>${escapeXml(p.title)}</title><link>${site}/blog.html#${p.slug||slugify(p.title)}</link><pubDate>${new Date(p.date).toUTCString()}</pubDate><description>${escapeXml(p.excerpt||'')}</description></item>`)
  .join('');
const rss = `<?xml version="1.0" encoding="UTF-8"?>
<rss version="2.0">
  <channel>
    <title>Codecools Blog Me</title>
    <link>${site}</link>
    <description>Lao blog demo</description>
    ${items}
  </channel>
</rss>`;
writeFileSync(new URL('../rss.xml', import.meta.url), rss);
console.log('rss.xml generated with', posts.length, 'items');

function slugify(s){return s.toLowerCase().replace(/[^a-z0-9]+/g,'-').replace(/(^-|-$)/g,'');}
function escapeXml(s){return String(s).replace(/[<>&"']/g, c=>({"<":"&lt;",">":"&gt;","&":"&amp;","\"":"&quot;","'":"&apos;"}[c]));}
