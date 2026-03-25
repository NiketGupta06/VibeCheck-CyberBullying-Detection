/**
 * CyberGuard — main.js
 * Base interactivity: navbar, loading state, flag/hide, animations, counters, contact form.
 */

document.addEventListener('DOMContentLoaded', () => {

  // ── 1. Navbar active state ─────────────────────────────────────
  const currentPath = window.location.pathname.replace(/\/$/, '') || '/';
  document.querySelectorAll('.nav-links a').forEach(link => {
    const linkPath = new URL(link.href).pathname.replace(/\/$/, '') || '/';
    if (linkPath === currentPath) {
      link.classList.add('active');
    }
  });

  // ── 2. Mobile navbar toggle ────────────────────────────────────
  const navToggle = document.getElementById('navToggle');
  const navLinks  = document.getElementById('navLinks');
  if (navToggle && navLinks) {
    navToggle.addEventListener('click', () => {
      navLinks.classList.toggle('open');
      navToggle.textContent = navLinks.classList.contains('open') ? '✕' : '☰';
    });
    // Close on outside click
    document.addEventListener('click', (e) => {
      if (!navToggle.contains(e.target) && !navLinks.contains(e.target)) {
        navLinks.classList.remove('open');
        navToggle.textContent = '☰';
      }
    });
  }

  // ── 3. Analyze form — loading state ───────────────────────────
  const analyzeForm = document.getElementById('analyzeForm');
  const loadingState = document.getElementById('loadingState');
  const submitBtn    = document.getElementById('submitBtn');
  const loadingText  = document.getElementById('loadingText');

  if (analyzeForm && loadingState && submitBtn) {
    const messages = [
      'Fetching comments…',
      'Running AI analysis…',
      'Building your dashboard…',
      'Almost there…',
    ];

    analyzeForm.addEventListener('submit', (e) => {
      const urlInput = document.getElementById('urlInput');
      if (!urlInput || !urlInput.value.trim()) return;

      submitBtn.disabled = true;
      submitBtn.style.opacity = '0.5';
      submitBtn.style.cursor = 'not-allowed';
      analyzeForm.style.display = 'none';
      loadingState.style.display = 'flex';

      let idx = 0;
      if (loadingText) {
        setInterval(() => {
          idx = (idx + 1) % messages.length;
          loadingText.textContent = messages[idx];
        }, 5000);
      }
    });
  }

  // ── 4. Scroll animations via IntersectionObserver ─────────────
  const observerTargets = document.querySelectorAll('.card, .stat-card, .animate-in');
  if ('IntersectionObserver' in window && observerTargets.length > 0) {
    const observer = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          entry.target.style.animationPlayState = 'running';
          observer.unobserve(entry.target);
        }
      });
    }, { threshold: 0.1 });

    observerTargets.forEach(el => {
      el.style.animationPlayState = 'paused';
      observer.observe(el);
    });
  }

  // ── 5. Animated number counters ───────────────────────────────
  function animateCounter(el, target, duration = 1500) {
    const isFloat = !Number.isInteger(target);
    const decimals = isFloat ? 1 : 0;
    let start = null;

    function step(timestamp) {
      if (!start) start = timestamp;
      const progress = Math.min((timestamp - start) / duration, 1);
      const eased = progress < 0.5
        ? 2 * progress * progress
        : 1 - Math.pow(-2 * progress + 2, 2) / 2;
      const current = target * eased;
      el.textContent = current.toFixed(decimals);
      if (progress < 1) {
        requestAnimationFrame(step);
      } else {
        el.textContent = target.toFixed(decimals);
      }
    }

    requestAnimationFrame(step);
  }

  document.querySelectorAll('[data-count]').forEach(el => {
    const target = parseFloat(el.getAttribute('data-count'));
    if (!isNaN(target)) {
      el.textContent = '0';
      // Observe counter element; start animation when visible
      if ('IntersectionObserver' in window) {
        const counterObserver = new IntersectionObserver((entries) => {
          entries.forEach(entry => {
            if (entry.isIntersecting) {
              animateCounter(el, target);
              counterObserver.unobserve(entry.target);
            }
          });
        }, { threshold: 0.5 });
        counterObserver.observe(el);
      } else {
        animateCounter(el, target);
      }
    }
  });

  // ── 6. Auto-dismiss flash messages ────────────────────────────
  document.querySelectorAll('.flash').forEach(flash => {
    setTimeout(() => {
      flash.style.transition = 'opacity 0.4s ease';
      flash.style.opacity = '0';
      setTimeout(() => flash.remove(), 400);
    }, 5000);
  });

  // ── 7. Contact form ────────────────────────────────────────────
  const contactForm    = document.getElementById('contactForm');
  const contactSuccess = document.getElementById('contactSuccess');

  if (contactForm && contactSuccess) {
    contactForm.addEventListener('submit', (e) => {
      e.preventDefault();
      contactForm.style.display = 'none';
      contactSuccess.style.display = 'block';
    });
  }

});
