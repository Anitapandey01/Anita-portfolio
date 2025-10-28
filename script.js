/* =========
   Main interactivity:
   - Mobile menu toggle
   - Tabs (Skills/Education)
   - Typing effect
   - Reveal on scroll (IntersectionObserver)
   - Theme toggle (dark/light) saved to localStorage
   - Contact form minimal handling
   ========= */

document.addEventListener('DOMContentLoaded', () => {
  // Elements
  const menuBtn = document.getElementById('menuBtn');
  const navLinks = document.getElementById('navLinks');
  const tabs = document.querySelectorAll('.tab');
  const tabPanels = document.querySelectorAll('.tab-panel');
  const typedTextEl = document.getElementById('typedText');
  const themeToggle = document.getElementById('themeToggle');
  const themeIcon = document.getElementById('themeIcon');
  const yearEl = document.getElementById('year');

  // -----------------
  // Mobile menu toggle
  // -----------------
  menuBtn.addEventListener('click', () => {
    const open = navLinks.classList.toggle('mobile-open');
    navLinks.setAttribute('aria-hidden', !open);
  });

  // Close menu when clicking a link (mobile)
  navLinks.querySelectorAll('a').forEach(a => {
    a.addEventListener('click', () => {
      navLinks.classList.remove('mobile-open');
      navLinks.setAttribute('aria-hidden', 'true');
    });
  });

  // -----------------
  // Tabs logic
  // -----------------
  tabs.forEach(btn => {
    btn.addEventListener('click', (e) => {
      const target = btn.dataset.target;
      tabs.forEach(t => t.classList.remove('active'));
      tabPanels.forEach(p => { p.classList.remove('active'); p.hidden = true; });

      btn.classList.add('active');
      const panel = document.getElementById(target);
      if (panel) { panel.classList.add('active'); panel.hidden = false; }
    });
  });

  // -----------------
  // Typing effect
  // -----------------
  const phrases = [
    "Computer Science Student • Frontend Developer",
    "Building responsive & accessible web UI",
    "Learning React, improving with every project"
  ];
  let pi = 0, ci = 0, direction = 1;

  function typeLoop() {
    const phrase = phrases[pi];
    typedTextEl.textContent = phrase.slice(0, ci);
    if (direction === 1) {
      ci++;
      if (ci > phrase.length) {
        direction = -1;
        setTimeout(typeLoop, 1000);
        return;
      }
    } else {
      ci--;
      if (ci < 0) {
        direction = 1;
        pi = (pi + 1) % phrases.length;
      }
    }
    setTimeout(typeLoop, direction === 1 ? 60 : 30);
  }
  typeLoop();

  // -----------------
  // Reveal on scroll
  // -----------------
  const revealEls = document.querySelectorAll('.reveal');
  const obs = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add('visible');
        // optionally unobserve to run once
        obs.unobserve(entry.target);
      }
    });
  }, { threshold: 0.12 });
  revealEls.forEach(el => obs.observe(el));

  // -----------------
  // Theme toggle (dark/light)
  // -----------------
  const root = document.documentElement;
  const savedTheme = localStorage.getItem('theme') || (window.matchMedia && window.matchMedia('(prefers-color-scheme: light)').matches ? 'light' : '');
  if (savedTheme) root.setAttribute('data-theme', savedTheme);

  function setThemeIcon() {
    const theme = root.getAttribute('data-theme');
    if (theme === 'light') {
      themeIcon.className = 'fas fa-sun';
    } else {
      themeIcon.className = 'fas fa-moon';
    }
  }
  setThemeIcon();

  themeToggle.addEventListener('click', () => {
    const current = root.getAttribute('data-theme');
    const next = current === 'light' ? '' : 'light';
    if (next) root.setAttribute('data-theme', next); else root.removeAttribute('data-theme');
    localStorage.setItem('theme', next);
    setThemeIcon();
  });

  // -----------------
  // Footer year
  // -----------------
  if (yearEl) yearEl.textContent = new Date().getFullYear();

  // -----------------
  // Contact form minimal handling (no server)
  // -----------------
  const contactForm = document.getElementById('contactForm');
  const formMsg = document.getElementById('formMsg');

  contactForm.addEventListener('submit', (e) => {
    e.preventDefault();
    // Basic front-end validation (already required fields)
    const name = document.getElementById('name').value.trim();
    const email = document.getElementById('email').value.trim();
    const msg = document.getElementById('message').value.trim();

    if (!name || !email || !msg) {
      formMsg.textContent = 'Please fill in all fields.';
      formMsg.style.color = 'var(--accent)';
      return;
    }

    // Show success message
    formMsg.style.color = 'var(--accent)';
    formMsg.textContent = 'Thanks! Your message was received (demo).';

    // Reset form after small delay
    setTimeout(() => {
      contactForm.reset();
      formMsg.textContent = '';
    }, 1800);
  });
  // ---- Compiler Project Slideshow (Updated) ----
const slides = document.querySelectorAll('.compiler-slideshow .slide');
const prevBtn = document.querySelector('.compiler-slideshow .prev');
const nextBtn = document.querySelector('.compiler-slideshow .next');
let currentSlide = 0;

function showSlide(index) {
  slides.forEach((slide, i) => {
    slide.classList.remove('active');
  });
  slides[index].classList.add('active');
}

function nextSlide() {
  currentSlide = (currentSlide + 1) % slides.length;
  showSlide(currentSlide);
}

function prevSlide() {
  currentSlide = (currentSlide - 1 + slides.length) % slides.length;
  showSlide(currentSlide);
}

if (slides.length > 0) {
  showSlide(0);
  setInterval(nextSlide, 4000); // Auto slide every 4s
}

if (nextBtn && prevBtn) {
  nextBtn.addEventListener('click', nextSlide);
  prevBtn.addEventListener('click', prevSlide);
}


});
