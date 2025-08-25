// Smooth scroll + active nav + reveal + parallax + tilt
document.addEventListener('DOMContentLoaded', () => {
  const sections = document.querySelectorAll('section[id]');
  const navLinks = document.querySelectorAll('.navbar .links a');
  const reveals  = document.querySelectorAll('.reveal');

  // Intersection Observer for reveal
  const io = new IntersectionObserver((entries) => {
    entries.forEach(e => { if (e.isIntersecting) e.target.classList.add('active'); });
  }, { threshold: 0.2 });
  reveals.forEach(el => io.observe(el));

  // Active link on scroll
  window.addEventListener('scroll', () => {
    let current = '';
    sections.forEach(s => {
      const top = s.offsetTop - 100;
      if (scrollY >= top) current = s.id;
    });
    navLinks.forEach(a => {
      a.classList.toggle('active', a.getAttribute('href') === `#${current}`);
    });
  });

  // Parallax layers
  const parallaxLayers = document.querySelectorAll('[data-parallax]');
  window.addEventListener('scroll', () => {
    const sy = window.scrollY;
    parallaxLayers.forEach(layer => {
      const speed = parseFloat(layer.dataset.parallax) || 0.2;
      layer.style.transform = `translate3d(0, ${sy * speed}px, 0)`;
    });
  }, { passive: true });

  // Tilt cards
  document.querySelectorAll('.tilt').forEach(card => {
    const inner = card.querySelector('.tilt-inner');
    card.addEventListener('mousemove', (e) => {
      const r = card.getBoundingClientRect();
      const x = e.clientX - r.left, y = e.clientY - r.top;
      const rx = ((y / r.height) - 0.5) * -10;
      const ry = ((x / r.width) - 0.5) * 10;
      card.style.transform = `rotateX(${rx}deg) rotateY(${ry}deg)`;
      if (inner) inner.style.transform = 'translateZ(30px)';
      card.style.setProperty('--mx', `${x}px`);
      card.style.setProperty('--my', `${y}px`);
    });
    card.addEventListener('mouseleave', () => {
      card.style.transform = '';
      if (inner) inner.style.transform = '';
    });
  });
});
