// ─── Header scroll ───
const header = document.getElementById('header');
let lastScroll = 0;
const onScroll = (y) => {
  if (y > 80 && y > lastScroll) header.classList.add('scrolled');
  else if (y <= 80) header.classList.remove('scrolled');
  lastScroll = y;
};
window.addEventListener('scroll', () => onScroll(window.scrollY));

// ─── Mobile toggle ───
const mt = document.getElementById('mobileToggle');
const nav = document.getElementById('navMenu');
mt.addEventListener('click', () => { mt.classList.toggle('active'); nav.classList.toggle('open'); });
nav.querySelectorAll('a').forEach(a => a.addEventListener('click', () => { mt.classList.remove('active'); nav.classList.remove('open'); }));

// ─── Schedule Tabs ───
document.querySelectorAll('.schedule-tab').forEach(tab => {
  tab.addEventListener('click', () => {
    document.querySelectorAll('.schedule-tab').forEach(t => t.classList.remove('active'));
    document.querySelectorAll('.schedule-table-wrap').forEach(t => t.classList.remove('active'));
    tab.classList.add('active');
    const p = document.getElementById('tab-' + tab.dataset.tab);
    if (p) p.classList.add('active');
  });
});

// ─── Lenis smooth scroll ───
const lenisScript = document.createElement('script');
lenisScript.src = 'https://unpkg.com/lenis@1.1.18/dist/lenis.min.js';
lenisScript.onload = () => {
  try {
    const lenis = new Lenis({duration:1.2,easing:t=>Math.min(1,1.001-Math.pow(2,-10*t))});
    lenis.on('scroll', () => onScroll(lenis.scroll));
    function raf(t){lenis.raf(t);requestAnimationFrame(raf)}
    requestAnimationFrame(raf);
  } catch(e){console.warn('Lenis init failed',e)}
};
document.body.appendChild(lenisScript);
