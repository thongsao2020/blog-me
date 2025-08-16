let projects = [];
let posts = [];
async function load(){
  try{ projects = await (await fetch('/data/projects.json')).json(); }
  catch{ projects = [
    {title:'LAO Weather Demo', tags:['demo','api','frontend'], desc:'ແອັບດູອາກາດຕົວຢ່າງ (fallback).'},
    {title:'Todo Minimal', tags:['ui','state'], desc:'UI todo ເບົາໆ (fallback).'},
    {title:'Portfolio Theme', tags:['design','theme'], desc:'template portfolio (fallback).'}
  ]; }
  try{ posts = await (await fetch('/data/posts.json')).json(); }
  catch{ posts = [
    {title:'Static Web ກະທັດຮັດ', date:'2025-08-10', excerpt:'fallback excerpt'},
  ]; }
}

function el(tag, cls){ const e=document.createElement(tag); if(cls) e.className=cls; return e; }

window.addEventListener('DOMContentLoaded',async()=>{
  await load();
  const fp = document.getElementById('featured-projects');
  projects.forEach(p=>{
    const card = el('article','card');
    const h = el('h4'); h.textContent = p.title; card.appendChild(h);
    const d = el('p'); d.textContent = p.desc; d.className='muted'; card.appendChild(d);
    const line = el('div');
    p.tags.forEach(t=>{ const b=el('span','badge'); b.textContent=t; line.appendChild(b); });
    card.appendChild(line);
    fp.appendChild(card);
  });

  const lp = document.getElementById('latest-posts');
  posts.forEach(p=>{
    const item = el('article','item');
    const h = el('h4'); h.textContent = p.title; item.appendChild(h);
    const m = el('div'); m.className='muted'; m.textContent = new Date(p.date).toLocaleDateString('lo-LA'); item.appendChild(m);
    const d = el('p'); d.textContent = p.excerpt; item.appendChild(d);
    lp.appendChild(item);
  });
});
