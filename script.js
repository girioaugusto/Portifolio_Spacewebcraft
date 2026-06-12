/* ============================================================
   NAV SCROLL EFFECT
   ============================================================ */
const nav = document.getElementById('nav');
const onScroll = () => {
  if (window.scrollY > 24) nav.classList.add('scrolled');
  else nav.classList.remove('scrolled');
};
window.addEventListener('scroll', onScroll, { passive: true });
onScroll();

/* ============================================================
   MOBILE MENU
   ============================================================ */
const navToggle = document.getElementById('navToggle');
const mobileMenu = document.getElementById('mobileMenu');
if (navToggle) {
  navToggle.addEventListener('click', () => mobileMenu.classList.toggle('open'));
  mobileMenu.querySelectorAll('a').forEach(a => a.addEventListener('click', () => mobileMenu.classList.remove('open')));
}

/* ============================================================
   REVEAL ON SCROLL
   ============================================================ */
const reveals = document.querySelectorAll('.reveal');
const io = new IntersectionObserver((entries) => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      entry.target.classList.add('in');
      io.unobserve(entry.target);
    }
  });
}, { threshold: 0.12, rootMargin: '0px 0px -80px 0px' });
reveals.forEach(el => io.observe(el));

/* ============================================================
   PORTFOLIO FILTERS
   ============================================================ */
const filterBtns = document.querySelectorAll('.filter-btn');
const projectCards = document.querySelectorAll('.project-card');

filterBtns.forEach(btn => {
  btn.addEventListener('click', () => {
    filterBtns.forEach(b => b.classList.remove('active'));
    btn.classList.add('active');
    const filter = btn.dataset.filter;
    projectCards.forEach(card => {
      const cats = (card.dataset.category || '').split(' ');
      if (filter === 'all' || cats.includes(filter)) {
        card.classList.remove('hide');
      } else {
        card.classList.add('hide');
      }
    });
  });
});

/* ============================================================
   FORM SUBMIT → WHATSAPP
   ============================================================ */
function enviarOrcamento() {
  const nome = document.getElementById('nome').value.trim();
  const email = document.getElementById('email').value.trim();
  const telefone = document.getElementById('telefone').value.trim();
  const servico = document.getElementById('servico').value;
  const mensagem = document.getElementById('mensagem').value.trim();

  if (!nome || !email || !mensagem) {
    alert('Por favor, preencha pelo menos nome, e-mail e mensagem.');
    return;
  }

  let txt = `*Novo pedido de orçamento via site*%0A%0A`;
  txt += `*Nome:* ${nome}%0A`;
  txt += `*E-mail:* ${email}%0A`;
  if (telefone) txt += `*Telefone:* ${telefone}%0A`;
  if (servico) txt += `*Serviço:* ${servico}%0A`;
  txt += `%0A*Mensagem:*%0A${mensagem}`;
  txt = txt.replace(/\n/g, '%0A');

  window.open(`https://wa.me/5519999999999?text=${txt}`, '_blank');
}

/* ============================================================
   FOOTER TIME
   ============================================================ */
function updateTime() {
  const now = new Date();
  const opts = { timeZone: 'America/Sao_Paulo', hour: '2-digit', minute: '2-digit', second: '2-digit', hour12: false };
  const t = new Intl.DateTimeFormat('pt-BR', opts).format(now);
  const el = document.getElementById('footerTime');
  if (el) el.textContent = `BRASIL · GMT-3 · ${t}`;
}
updateTime();
setInterval(updateTime, 1000);
