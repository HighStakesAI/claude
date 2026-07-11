/* ============================================================
   Veranda Painting Co. — site behavior
   ------------------------------------------------------------
   REBRAND HERE: SITE_CONFIG is the single source of truth for
   every business-specific value (the data half — colors/type
   live in the :root block of styles.css). Elements tagged with
   data-bind / data-bind-href / data-bind-areas hydrate from it,
   so editing this object rebrands the whole page. Keep the
   JSON-LD block in index.html in sync with the NAP values here.
   ============================================================ */
const SITE_CONFIG = {
  name: 'Veranda Painting Co.',
  shortName: 'Veranda',
  ownerName: 'Daniel Reyes',
  city: 'Austin',
  state: 'TX',
  zip: '78704',
  metro: 'Greater Austin.',
  addressLine: '2100 Placeholder Ln, Suite 4',   // REPLACE with real address
  phoneDisplay: '(512) 555-0137',                // REPLACE with real / tracking number
  phoneE164: '+15125550137',
  email: 'hello@verandapainting.example.com',    // REPLACE
  license: 'TX-PC-104728',                       // REPLACE
  epaCert: 'NAT-LS-58211',                       // REPLACE
  rating: '4.9',
  reviewCount: '238',
  years: '12',
  bookingMonth: new Date().toLocaleString('en-US', { month: 'long' }),
  serviceAreas: ['Austin','Round Rock','Cedar Park','Pflugerville','Georgetown',
                 'Lakeway','Buda','Kyle','Leander','Dripping Springs'],
};

/* Lead delivery — REPLACE with the GHL/LeadConnector inbound webhook URL.
   Leave empty to demo the form without posting anywhere. */
const WEBHOOK_URL = '';

(() => {
  'use strict';

  const doc = document;
  const reduceMotion = matchMedia('(prefers-reduced-motion: reduce)').matches;
  doc.documentElement.classList.remove('no-js');
  if (reduceMotion) doc.documentElement.classList.add('no-motion');

  /* ---------- config hydration ---------- */
  const derived = {
    ...SITE_CONFIG,
    telLink: 'tel:' + SITE_CONFIG.phoneE164,
    mailLink: 'mailto:' + SITE_CONFIG.email,
  };
  doc.querySelectorAll('[data-bind]').forEach(el => {
    const v = derived[el.dataset.bind];
    if (v != null) el.textContent = v;
  });
  doc.querySelectorAll('[data-bind-href]').forEach(el => {
    const v = derived[el.dataset.bindHref];
    if (v != null) el.setAttribute('href', v);
  });
  const areaList = doc.querySelector('[data-bind-areas]');
  if (areaList) {
    areaList.innerHTML = '';
    SITE_CONFIG.serviceAreas.forEach(a => {
      const li = doc.createElement('li');
      li.textContent = a;
      areaList.appendChild(li);
    });
  }
  const yearEl = doc.getElementById('year');
  if (yearEl) yearEl.textContent = new Date().getFullYear();

  /* ---------- sticky nav ---------- */
  const nav = doc.getElementById('nav');
  const onScroll = () => nav.classList.toggle('is-scrolled', scrollY > 12);
  addEventListener('scroll', onScroll, { passive: true });
  onScroll();

  /* ---------- mobile menu ---------- */
  const burger = doc.getElementById('navBurger');
  const menu = doc.getElementById('mobileMenu');
  const setMenu = open => {
    burger.setAttribute('aria-expanded', String(open));
    burger.setAttribute('aria-label', open ? 'Close menu' : 'Open menu');
    menu.classList.toggle('is-open', open);
    menu.setAttribute('aria-hidden', String(!open));
    doc.body.style.overflow = open ? 'hidden' : '';
  };
  burger.addEventListener('click', () => setMenu(burger.getAttribute('aria-expanded') !== 'true'));
  menu.querySelectorAll('a').forEach(a => a.addEventListener('click', () => setMenu(false)));
  addEventListener('keydown', e => { if (e.key === 'Escape') setMenu(false); });

  /* ---------- scroll reveals + icon draw + count-up triggers ---------- */
  const io = new IntersectionObserver(entries => {
    entries.forEach(en => {
      if (!en.isIntersecting) return;
      en.target.classList.add('in-view');
      en.target.querySelectorAll('.stat-num[data-count]').forEach(startCount);
      io.unobserve(en.target);
    });
  }, { threshold: 0.18, rootMargin: '0px 0px -6% 0px' });
  doc.querySelectorAll('.reveal, .reveal-group, .service-card, .pstep, .area-map, .why-list li, .guarantee-inner')
    .forEach(el => io.observe(el));

  /* ---------- stat count-up ---------- */
  function startCount(el) {
    if (el.dataset.done) return;
    el.dataset.done = '1';
    const target = parseFloat(el.dataset.count);
    const decimals = parseInt(el.dataset.decimals || '0', 10);
    const suffix = el.dataset.suffix || '';
    const fmt = n => n.toLocaleString('en-US', {
      minimumFractionDigits: decimals, maximumFractionDigits: decimals,
    }) + suffix;
    if (reduceMotion) { el.textContent = fmt(target); return; }
    const dur = 1600, t0 = performance.now();
    const tick = now => {
      const p = Math.min((now - t0) / dur, 1);
      const eased = 1 - Math.pow(1 - p, 4);
      el.textContent = fmt(target * eased);
      if (p < 1) requestAnimationFrame(tick);
    };
    requestAnimationFrame(tick);
  }

  /* ---------- proof marquee: duplicate track for seamless -50% loop ---------- */
  const track = doc.querySelector('.marquee-track');
  if (track && !reduceMotion) track.innerHTML += track.innerHTML;

  /* ---------- before / after sliders ---------- */
  doc.querySelectorAll('[data-ba]').forEach(ba => {
    let pos = 50, raf = null;
    const render = () => {
      ba.style.setProperty('--pos', pos + '%');
      ba.setAttribute('aria-valuenow', Math.round(pos));
      raf = null;
    };
    const setPos = clientX => {
      const r = ba.getBoundingClientRect();
      pos = Math.max(0, Math.min(100, ((clientX - r.left) / r.width) * 100));
      if (!raf) raf = requestAnimationFrame(render);
    };
    ba.addEventListener('pointerdown', e => {
      ba.setPointerCapture(e.pointerId);
      setPos(e.clientX);
    });
    ba.addEventListener('pointermove', e => {
      if (e.pressure > 0 || (e.buttons & 1)) setPos(e.clientX);
    });
    ba.addEventListener('keydown', e => {
      const step = e.shiftKey ? 10 : 4;
      if (e.key === 'ArrowLeft' || e.key === 'ArrowDown') pos = Math.max(0, pos - step);
      else if (e.key === 'ArrowRight' || e.key === 'ArrowUp') pos = Math.min(100, pos + step);
      else if (e.key === 'Home') pos = 0;
      else if (e.key === 'End') pos = 100;
      else return;
      e.preventDefault();
      if (!raf) raf = requestAnimationFrame(render);
    });
  });

  /* ---------- reviews carousel ---------- */
  const carousel = doc.querySelector('[data-carousel]');
  if (carousel) {
    const ctrack = carousel.querySelector('[data-carousel-track]');
    const cards = [...ctrack.children];
    const dotsWrap = carousel.querySelector('[data-carousel-dots]');
    const gap = 20;
    let index = 0, timer = null;

    cards.forEach((_, i) => {
      const b = doc.createElement('button');
      b.setAttribute('role', 'tab');
      b.setAttribute('aria-label', 'Go to review ' + (i + 1));
      b.setAttribute('aria-selected', i === 0 ? 'true' : 'false');
      b.addEventListener('click', () => goTo(i, true));
      dotsWrap.appendChild(b);
    });
    const dots = [...dotsWrap.children];

    const goTo = (i, user) => {
      index = (i + cards.length) % cards.length;
      ctrack.scrollTo({
        left: cards[index].offsetLeft - ctrack.offsetLeft,
        behavior: reduceMotion ? 'auto' : 'smooth',
      });
      if (user) restart();
    };
    ctrack.addEventListener('scroll', () => {
      const x = ctrack.scrollLeft;
      let best = 0, bestD = Infinity;
      cards.forEach((c, i) => {
        const d = Math.abs(c.offsetLeft - ctrack.offsetLeft - x);
        if (d < bestD) { bestD = d; best = i; }
      });
      index = best;
      dots.forEach((d, i) => d.setAttribute('aria-selected', String(i === index)));
    }, { passive: true });

    carousel.querySelector('[data-carousel-prev]').addEventListener('click', () => goTo(index - 1, true));
    carousel.querySelector('[data-carousel-next]').addEventListener('click', () => goTo(index + 1, true));

    const restart = () => {
      clearInterval(timer);
      if (!reduceMotion) timer = setInterval(() => goTo(index + 1), 5500);
    };
    carousel.addEventListener('mouseenter', () => clearInterval(timer));
    carousel.addEventListener('mouseleave', restart);
    carousel.addEventListener('focusin', () => clearInterval(timer));
    restart();
  }

  /* ---------- FAQ: one open at a time + smooth height ---------- */
  const faqItems = [...doc.querySelectorAll('[data-accordion] .faq-item')];
  faqItems.forEach(item => {
    const summary = item.querySelector('summary');
    const body = item.querySelector('.faq-body');
    summary.addEventListener('click', e => {
      e.preventDefault();
      const opening = !item.open;
      faqItems.forEach(other => {
        if (other !== item && other.open) animateFaq(other, false);
      });
      animateFaq(item, opening);
    });
    function animateFaq(el, open) {
      const b = el.querySelector('.faq-body');
      if (reduceMotion || !b.animate) { el.open = open; return; }
      if (open) {
        el.open = true;
        const h = b.scrollHeight;
        b.animate([{ height: '0px', opacity: 0 }, { height: h + 'px', opacity: 1 }],
          { duration: 380, easing: 'cubic-bezier(.16,1,.3,1)' });
      } else {
        const h = b.scrollHeight;
        const anim = b.animate([{ height: h + 'px', opacity: 1 }, { height: '0px', opacity: 0 }],
          { duration: 300, easing: 'cubic-bezier(.16,1,.3,1)' });
        anim.onfinish = () => { el.open = false; };
      }
    }
  });

  /* ---------- multi-step estimate form ---------- */
  const form = doc.getElementById('estimateForm');
  if (form) {
    const steps = [...form.querySelectorAll('.mform-step')];
    const bar = doc.getElementById('mformBar');
    const stepNow = doc.getElementById('mformStepNow');
    let current = 0;

    const show = i => {
      current = i;
      steps.forEach((s, j) => s.classList.toggle('is-active', j === i));
      bar.style.width = ((i + 1) / steps.length * 100) + '%';
      stepNow.textContent = i + 1;
      const first = steps[i].querySelector('input:not([type=radio]), select');
      if (first && i > 0) first.focus({ preventScroll: true });
    };

    const validateStep = i => {
      let ok = true;
      steps[i].querySelectorAll('input[required], select[required]').forEach(f => {
        let valid = f.type === 'radio'
          ? !!form.querySelector(`input[name="${f.name}"]:checked`)
          : f.checkValidity();
        f.classList.toggle('is-invalid', !valid);
        if (!valid) ok = false;
      });
      return ok;
    };

    form.addEventListener('click', e => {
      if (e.target.closest('[data-next]')) {
        if (validateStep(current)) show(Math.min(current + 1, steps.length - 1));
      } else if (e.target.closest('[data-prev]')) {
        show(Math.max(current - 1, 0));
      }
    });
    form.addEventListener('input', e => e.target.classList.remove('is-invalid'));

    form.addEventListener('submit', async e => {
      e.preventDefault();
      if (!validateStep(current)) return;

      const data = Object.fromEntries(new FormData(form).entries());
      data.source = 'website-estimate-form';
      data.page = location.href;

      const submitBtn = form.querySelector('[type=submit]');
      submitBtn.disabled = true;
      submitBtn.textContent = 'Sending…';

      try {
        if (WEBHOOK_URL) {
          await fetch(WEBHOOK_URL, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(data),
          });
        }
        /* Conversion events — uncomment when Pixel / gtag are installed:
        if (typeof fbq === 'function') fbq('track', 'Lead');
        if (typeof gtag === 'function') gtag('event', 'generate_lead', { method: 'estimate_form' });
        */
        steps.forEach(s => s.classList.remove('is-active'));
        form.querySelector('.mform-progress').hidden = true;
        form.querySelector('.mform-stepcount').hidden = true;
        const success = doc.getElementById('mformSuccess');
        success.hidden = false;
        success.scrollIntoView({ block: 'center', behavior: reduceMotion ? 'auto' : 'smooth' });
      } catch (err) {
        submitBtn.disabled = false;
        submitBtn.textContent = 'Get My Free Estimate';
        let msg = form.querySelector('.mform-error');
        if (!msg) {
          msg = doc.createElement('p');
          msg.className = 'mform-error';
          steps[current].appendChild(msg);
        }
        msg.textContent = 'Something went wrong — call us instead: ' + SITE_CONFIG.phoneDisplay;
      }
    });
  }

  /* ---------- GSAP choreography (skipped under reduced motion) ---------- */
  if (reduceMotion || typeof gsap === 'undefined') {
    doc.documentElement.classList.add('no-motion');
    return;
  }
  gsap.registerPlugin(ScrollTrigger);

  /* hero load sequence: mask-reveal lines → sub → CTAs → chips (< 1.6s) */
  gsap.timeline({ defaults: { ease: 'expo.out' } })
    .to('.hero .line-inner', { y: 0, duration: 1.05, stagger: 0.14 }, 0.1)
    .fromTo('.hero-sub', { y: 20 }, { opacity: 1, y: 0, duration: 0.8 }, 0.55)
    .fromTo('.hero-ctas', { y: 20 }, { opacity: 1, y: 0, duration: 0.8 }, 0.7)
    .fromTo('.trust-chips', { y: 20 }, { opacity: 1, y: 0, duration: 0.8 }, 0.85);

  /* signature paint stroke draws along the process timeline */
  gsap.to('.process-path', {
    strokeDashoffset: 0,
    ease: 'none',
    scrollTrigger: {
      trigger: '.process',
      start: 'top 72%',
      end: 'bottom 55%',
      scrub: 0.6,
    },
  });

  /* light → dark background morph entering the why-us block */
  const wrap = doc.getElementById('darkWrap');
  if (wrap) {
    gsap.fromTo(wrap, { backgroundColor: '#FAF8F4' }, {
      backgroundColor: '#16181D',
      ease: 'none',
      scrollTrigger: { trigger: wrap, start: 'top 92%', end: 'top 40%', scrub: true },
    });
  }

  /* subtle hero parallax */
  gsap.to('.hero-media', {
    yPercent: 12,
    ease: 'none',
    scrollTrigger: { trigger: '.hero', start: 'top top', end: 'bottom top', scrub: true },
  });

  /* magnetic buttons (pointer devices only) */
  if (matchMedia('(hover:hover) and (pointer:fine)').matches) {
    doc.querySelectorAll('[data-magnetic]').forEach(btn => {
      btn.addEventListener('mousemove', e => {
        const r = btn.getBoundingClientRect();
        gsap.to(btn, {
          x: (e.clientX - r.left - r.width / 2) * 0.18,
          y: (e.clientY - r.top - r.height / 2) * 0.3,
          duration: 0.4, ease: 'power2.out',
        });
      });
      btn.addEventListener('mouseleave', () =>
        gsap.to(btn, { x: 0, y: 0, duration: 0.5, ease: 'elastic.out(1,.5)' }));
    });
  }
})();
