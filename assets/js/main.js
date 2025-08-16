(function(){
  // utils
  window.$ = (sel, ctx=document) => ctx.querySelector(sel);
  window.$$ = (sel, ctx=document) => Array.from(ctx.querySelectorAll(sel));
  window.debounce = (fn, ms=200)=>{ let t; return (...args)=>{ clearTimeout(t); t=setTimeout(()=>fn(...args), ms); } };

  const y = document.getElementById('year');
  if(y) y.textContent = new Date().getFullYear();

  const btn = document.getElementById('theme-toggle');
  const key = 'codecools.theme';
  const apply = (mode)=>{
    if(mode==='light'){
      document.documentElement.style.setProperty('--bg','#f7f8fa');
      document.documentElement.style.setProperty('--card','#ffffff');
      document.documentElement.style.setProperty('--text','#0b0f14');
      document.documentElement.style.setProperty('--muted','#445266');
    } else {
      document.documentElement.style.removeProperty('--bg');
      document.documentElement.style.removeProperty('--card');
      document.documentElement.style.removeProperty('--text');
      document.documentElement.style.removeProperty('--muted');
    }
  };
  const saved = localStorage.getItem(key);
  if(saved) apply(saved);
  if(btn){
    btn.addEventListener('click',()=>{
      const m = localStorage.getItem(key)==='light' ? 'dark' : 'light';
      localStorage.setItem(key,m);
      apply(m);
    });
  }
})();
