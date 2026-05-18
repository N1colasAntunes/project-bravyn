// Reveal on scroll
const io = new IntersectionObserver((entries) => {
  entries.forEach(e => {
    if (e.isIntersecting) {
      e.target.classList.add('in');
      io.unobserve(e.target);
    }
  });
}, { threshold: 0.12 });
document.querySelectorAll('.reveal').forEach(el => io.observe(el));

// Mobile menu
const burger = document.getElementById('burger');
const navLinks = document.getElementById('navLinks');
burger?.addEventListener('click', () => navLinks.classList.toggle('open'));
navLinks?.querySelectorAll('a').forEach(a => a.addEventListener('click', () => navLinks.classList.remove('open')));

// Counter animation
const counterObs = new IntersectionObserver((entries) => {
  entries.forEach(e => {
    if (!e.isIntersecting) return;
    const el = e.target;
    const target = +el.dataset.count;
    let current = 0;
    const step = Math.max(1, Math.ceil(target / 60));
    const t = setInterval(() => {
      current += step;
      if (current >= target) { current = target; clearInterval(t); }
      el.textContent = current;
    }, 25);
    counterObs.unobserve(el);
  });
}, { threshold: 0.5 });
document.querySelectorAll('[data-count]').forEach(el => counterObs.observe(el));

// Service tilt
document.querySelectorAll('[data-tilt]').forEach(card => {
  card.addEventListener('mousemove', (e) => {
    const r = card.getBoundingClientRect();
    const x = (e.clientX - r.left) / r.width - 0.5;
    const y = (e.clientY - r.top) / r.height - 0.5;
    card.style.transform = `translateY(-8px) rotateX(${-y*6}deg) rotateY(${x*6}deg)`;
  });
  card.addEventListener('mouseleave', () => card.style.transform = '');
});

// Form
const form = document.getElementById('contactForm');
const status = document.getElementById('formStatus');
form?.addEventListener('submit', (e) => {
  e.preventDefault();
  const name = form.nome.value.trim();
  status.textContent = `Obrigado, ${name}! Recebemos sua mensagem e respondemos em até 24h.`;
  form.reset();
  setTimeout(() => status.textContent = '', 6000);
});

// Top button
document.getElementById('topBtn')?.addEventListener('click', () => window.scrollTo({ top: 0, behavior: 'smooth' }));

// Header shadow on scroll
const header = document.getElementById('header');
window.addEventListener('scroll', () => {
  header.style.boxShadow = window.scrollY > 20 ? '0 10px 30px -10px rgba(0,0,0,.6)' : 'none';
});

// Rolagem suave e lenta nos links âncora
document.querySelectorAll('a[href^="#"]').forEach(link => {
  link.addEventListener('click', (e) => {
    const id = link.getAttribute('href');
    if (id.length < 2) return;
    const target = document.querySelector(id);
    if (!target) return;
    e.preventDefault();

    const headerOffset = 74;
    const startY = window.pageYOffset;
    const targetY = target.getBoundingClientRect().top + startY - headerOffset;
    const distance = targetY - startY;
    const duration = 1400; // ms — aumente para rolar mais devagar
    let startTime = null;

    const easeInOutCubic = t => t < 0.5 ? 4*t*t*t : 1 - Math.pow(-2*t + 2, 3) / 2;

    const animate = (now) => {
      if (!startTime) startTime = now;
      const elapsed = now - startTime;
      const progress = Math.min(elapsed / duration, 1);
      window.scrollTo(0, startY + distance * easeInOutCubic(progress));
      if (progress < 1) requestAnimationFrame(animate);
    };
    requestAnimationFrame(animate);
  });
});