/* ============================================================
   Professional Painting Services — site behavior + tracking
   ------------------------------------------------------------
   FILL THESE IN BEFORE LAUNCH (see CHANGES.md):
   - PIXEL_ID: Meta Pixel ID. Until set, no Pixel code loads
     and lead events are console-logged instead.
   - GA_ID: Google tag ID (G-XXXXXXX). Same behavior.
   The GHL webhook below is the client's existing live endpoint.
   ============================================================ */
const SITE_CONFIG = {
  PIXEL_ID: '',                 // REPLACE e.g. '1234567890'
  GA_ID: '',                    // REPLACE e.g. 'G-XXXXXXXXXX'
  WEBHOOK_URL: 'https://services.leadconnectorhq.com/hooks/H8M36AU3Oe3YJUSSRQbu/webhook-trigger/433ed9a0-56b5-4125-b986-fff7aa9b789f',
  phoneDisplay: '(850) 512-4505',
};

(() => {
  'use strict';
  const doc = document;
  const reduceMotion = matchMedia('(prefers-reduced-motion: reduce)').matches;
  doc.documentElement.classList.remove('no-js');
  if (reduceMotion) doc.documentElement.classList.add('no-motion');

  /* ---------- tracking bootstrap ---------- */
  if (SITE_CONFIG.PIXEL_ID) {
    !(function (f, b, e, v, n, t, s) {
      if (f.fbq) return; n = f.fbq = function () { n.callMethod ? n.callMethod.apply(n, arguments) : n.queue.push(arguments); };
      if (!f._fbq) f._fbq = n; n.push = n; n.loaded = !0; n.version = '2.0'; n.queue = [];
      t = b.createElement(e); t.async = !0; t.src = v; s = b.getElementsByTagName(e)[0]; s.parentNode.insertBefore(t, s);
    })(window, document, 'script', 'https://connect.facebook.net/en_US/fbevents.js');
    fbq('init', SITE_CONFIG.PIXEL_ID);
    fbq('track', 'PageView');
  }
  if (SITE_CONFIG.GA_ID) {
    const s = doc.createElement('script');
    s.async = true; s.src = 'https://www.googletagmanager.com/gtag/js?id=' + SITE_CONFIG.GA_ID;
    doc.head.appendChild(s);
    window.dataLayer = window.dataLayer || [];
    window.gtag = function () { dataLayer.push(arguments); };
    gtag('js', new Date());
    gtag('config', SITE_CONFIG.GA_ID);
  }
  const track = (fbEvent, gaEvent, params) => {
    if (typeof fbq === 'function') {
      fbEvent.custom ? fbq('trackCustom', fbEvent.name, params) : fbq('track', fbEvent.name, params);
    } else console.info('[track:fb]', fbEvent.name, params || '');
    if (typeof gtag === 'function') gtag('event', gaEvent, params);
    else console.info('[track:ga]', gaEvent, params || '');
  };

  /* phone click tracking on every tel: link */
  doc.querySelectorAll('[data-track="phone"]').forEach(a =>
    a.addEventListener('click', () => track({ name: 'PhoneClick', custom: true }, 'phone_call', { location: a.closest('section,header,footer,div')?.id || 'page' })));

  /* ---------- UTM / fbclid capture for lead attribution ---------- */
  const attribution = {};
  try {
    const qs = new URLSearchParams(location.search);
    ['utm_source', 'utm_medium', 'utm_campaign', 'utm_content', 'utm_term', 'fbclid', 'gclid'].forEach(k => {
      const v = qs.get(k);
      if (v) { attribution[k] = v; sessionStorage.setItem('attr_' + k, v); }
      else { const s = sessionStorage.getItem('attr_' + k); if (s) attribution[k] = s; }
    });
  } catch { /* sessionStorage unavailable — attribution best-effort */ }

  /* ---------- nav ---------- */
  const nav = doc.getElementById('nav');
  addEventListener('scroll', () => nav.classList.toggle('is-scrolled', scrollY > 8), { passive: true });

  const burger = doc.getElementById('navBurger');
  const menu = doc.getElementById('mobileMenu');
  const setMenu = open => {
    burger.setAttribute('aria-expanded', String(open));
    burger.setAttribute('aria-label', open ? 'Close menu' : 'Open menu');
    menu.hidden = !open;
  };
  burger.addEventListener('click', () => setMenu(menu.hidden));
  menu.querySelectorAll('a').forEach(a => a.addEventListener('click', () => setMenu(false)));

  /* ---------- reveal on scroll ---------- */
  const io = new IntersectionObserver(entries => {
    entries.forEach(en => {
      if (!en.isIntersecting) return;
      en.target.classList.add('in-view');
      en.target.querySelectorAll('[data-count]').forEach(startCount);
      io.unobserve(en.target);
    });
  }, { threshold: 0.15, rootMargin: '0px 0px -5% 0px' });
  doc.querySelectorAll('.reveal, .reveal-group, .section-head').forEach(el => io.observe(el));

  /* ---------- count-up ---------- */
  function startCount(el) {
    if (el.dataset.done) return;
    el.dataset.done = '1';
    const target = parseFloat(el.dataset.count);
    const suffix = el.dataset.suffix || '';
    if (reduceMotion) { el.textContent = target + suffix; return; }
    const dur = 1400, t0 = performance.now();
    const tick = now => {
      const p = Math.min((now - t0) / dur, 1);
      el.textContent = Math.round(target * (1 - Math.pow(1 - p, 4))) + suffix;
      if (p < 1) requestAnimationFrame(tick);
    };
    requestAnimationFrame(tick);
  }

  /* ---------- trust marquee: duplicate track for seamless -50% loop ---------- */
  const mtrack = doc.querySelector('.marquee-track');
  if (mtrack && !reduceMotion) mtrack.innerHTML += mtrack.innerHTML;

  /* ---------- before/after slider (pointer + keyboard) ---------- */
  doc.querySelectorAll('[data-ba]').forEach(ba => {
    let pos = 50, raf = null;
    const render = () => { ba.style.setProperty('--pos', pos + '%'); ba.setAttribute('aria-valuenow', Math.round(pos)); raf = null; };
    const setPos = x => {
      const r = ba.getBoundingClientRect();
      pos = Math.max(0, Math.min(100, ((x - r.left) / r.width) * 100));
      if (!raf) raf = requestAnimationFrame(render);
    };
    ba.addEventListener('pointerdown', e => { ba.setPointerCapture(e.pointerId); setPos(e.clientX); });
    ba.addEventListener('pointermove', e => { if (e.pressure > 0 || (e.buttons & 1)) setPos(e.clientX); });
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

  /* ---------- FAQ: one open at a time, aria-expanded, smooth height ---------- */
  const faqItems = [...doc.querySelectorAll('[data-accordion] .faq-item')];
  faqItems.forEach(item => {
    const summary = item.querySelector('summary');
    summary.setAttribute('aria-expanded', String(item.open));
    summary.addEventListener('click', e => {
      e.preventDefault();
      const opening = !item.open;
      faqItems.forEach(other => { if (other !== item && other.open) toggle(other, false); });
      toggle(item, opening);
    });
    function toggle(el, open) {
      const b = el.querySelector('.faq-body');
      el.querySelector('summary').setAttribute('aria-expanded', String(open));
      if (reduceMotion || !b.animate) { el.open = open; return; }
      if (open) {
        el.open = true;
        b.animate([{ height: '0px', opacity: 0 }, { height: b.scrollHeight + 'px', opacity: 1 }], { duration: 320, easing: 'cubic-bezier(.22,1,.36,1)' });
      } else {
        const anim = b.animate([{ height: b.scrollHeight + 'px', opacity: 1 }, { height: '0px', opacity: 0 }], { duration: 260, easing: 'cubic-bezier(.22,1,.36,1)' });
        anim.onfinish = () => { el.open = false; };
      }
    }
  });

  /* ---------- deferred Google Map ---------- */
  const mapSlot = doc.getElementById('mapSlot');
  if (mapSlot) {
    const loadMap = () => {
      if (mapSlot.querySelector('iframe')) return;
      const f = doc.createElement('iframe');
      f.src = mapSlot.dataset.mapSrc;
      f.loading = 'lazy';
      f.referrerPolicy = 'no-referrer-when-downgrade';
      f.title = 'Google Map of Pensacola service area';
      f.allowFullscreen = false;
      mapSlot.appendChild(f);
      const ph = doc.getElementById('mapLoad');
      if (ph) ph.remove();
    };
    doc.getElementById('mapLoad').addEventListener('click', loadMap);
    new IntersectionObserver((entries, obs) => {
      if (entries.some(e => e.isIntersecting)) { loadMap(); obs.disconnect(); }
    }, { rootMargin: '200px' }).observe(mapSlot);
  }

  /* ---------- lead submission (shared by both forms) ---------- */
  async function submitLead(data, sourceLabel) {
    data.source = sourceLabel;
    data.page = location.href;
    Object.assign(data, attribution);
    await fetch(SITE_CONFIG.WEBHOOK_URL, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(data),
    });
    track({ name: 'Lead' }, 'generate_lead', { form: sourceLabel });
  }

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
    };
    const validateStep = i => {
      let ok = true;
      steps[i].querySelectorAll('input[required], select[required]').forEach(f => {
        const valid = f.type === 'radio' ? !!form.querySelector(`input[name="${f.name}"]:checked`) : f.checkValidity();
        f.classList.toggle('is-invalid', !valid);
        if (!valid) ok = false;
      });
      return ok;
    };
    form.addEventListener('click', e => {
      if (e.target.closest('[data-next]')) { if (validateStep(current)) show(Math.min(current + 1, steps.length - 1)); }
      else if (e.target.closest('[data-prev]')) show(Math.max(current - 1, 0));
    });
    form.addEventListener('input', e => e.target.classList.remove('is-invalid'));
    form.addEventListener('submit', async e => {
      e.preventDefault();
      if (!validateStep(current)) return;
      const btn = form.querySelector('[type=submit]');
      btn.disabled = true; btn.textContent = 'Sending…';
      try {
        await submitLead(Object.fromEntries(new FormData(form).entries()), 'Website Contact Form');
        steps.forEach(s => s.classList.remove('is-active'));
        form.querySelector('.mform-progress').hidden = true;
        form.querySelector('.mform-stepcount').hidden = true;
        doc.getElementById('mformSuccess').hidden = false;
      } catch {
        btn.disabled = false; btn.textContent = 'Get My Free Estimate';
        let msg = form.querySelector('.mform-error');
        if (!msg) { msg = doc.createElement('p'); msg.className = 'mform-error'; steps[current].appendChild(msg); }
        msg.textContent = 'Something went wrong — call or text us instead: ' + SITE_CONFIG.phoneDisplay;
      }
    });
  }

  /* ---------- lead popup: exit-intent (desktop) / 45s or 60% scroll (mobile), once per session ---------- */
  const popup = doc.getElementById('leadPopup');
  if (popup) {
    const KEY = 'pps_popup_shown';
    const seen = () => { try { return sessionStorage.getItem(KEY) === '1'; } catch { return true; } };
    const mark = () => { try { sessionStorage.setItem(KEY, '1'); } catch {} };
    let armed = true;
    const open = () => {
      if (!armed || seen()) return;
      armed = false; mark();
      popup.hidden = false;
      popup.querySelector('input').focus({ preventScroll: true });
    };
    const close = () => { popup.hidden = true; };
    popup.querySelectorAll('[data-popup-close]').forEach(el => el.addEventListener('click', close));
    addEventListener('keydown', e => { if (e.key === 'Escape' && !popup.hidden) close(); });

    const fine = matchMedia('(hover:hover) and (pointer:fine)').matches;
    if (fine) {
      doc.addEventListener('mouseout', e => { if (!e.relatedTarget && e.clientY <= 0) open(); });
    } else {
      setTimeout(open, 45000);
      const onScroll = () => {
        const p = (scrollY + innerHeight) / doc.documentElement.scrollHeight;
        if (p > 0.6) { open(); removeEventListener('scroll', onScroll); }
      };
      addEventListener('scroll', onScroll, { passive: true });
    }

    const pform = doc.getElementById('popupForm');
    pform.addEventListener('submit', async e => {
      e.preventDefault();
      if (!pform.checkValidity()) { pform.reportValidity(); return; }
      const btn = pform.querySelector('[type=submit]');
      btn.disabled = true; btn.textContent = 'Sending…';
      try {
        await submitLead(Object.fromEntries(new FormData(pform).entries()), 'Website Popup Form');
        pform.hidden = true;
        popup.querySelector('.popup-success').hidden = false;
        setTimeout(close, 3000);
      } catch {
        btn.disabled = false; btn.textContent = 'Request My Callback';
      }
    });
  }

  /* ---------- to-top ---------- */
  const toTop = doc.getElementById('toTop');
  addEventListener('scroll', () => { toTop.hidden = scrollY < 600; }, { passive: true });
  toTop.addEventListener('click', () => scrollTo({ top: 0, behavior: reduceMotion ? 'auto' : 'smooth' }));

  doc.getElementById('year').textContent = new Date().getFullYear();

  /* ============================================================
     GSAP scroll choreography — skipped entirely under
     prefers-reduced-motion or if GSAP fails to load (CSS
     fallbacks make everything visible either way).
     ============================================================ */
  if (reduceMotion || typeof gsap === 'undefined') {
    doc.documentElement.classList.add('no-motion');
    doc.querySelectorAll('[data-count]').forEach(el => {
      el.textContent = el.dataset.count + (el.dataset.suffix || '');
    });
    return;
  }
  gsap.registerPlugin(ScrollTrigger);

  /* hero load sequence: masked headline lines -> badge/sub/CTAs/stats */
  gsap.timeline({ defaults: { ease: 'expo.out' } })
    .to('.hero-title .line-inner', { y: 0, duration: 1, stagger: 0.12 }, 0.05)
    .fromTo('.hero-badge', { y: 14 }, { opacity: 1, y: 0, duration: 0.7 }, 0.15)
    .fromTo('.hero-sub', { y: 18 }, { opacity: 1, y: 0, duration: 0.7 }, 0.55)
    .fromTo('.hero-ctas', { y: 18 }, { opacity: 1, y: 0, duration: 0.7 }, 0.7)
    .fromTo('.hero-stats', { y: 18 }, {
      opacity: 1, y: 0, duration: 0.7,
      onComplete: () => doc.querySelectorAll('.hero-stats [data-count]').forEach(startCount),
    }, 0.85);

  /* paint-progress bar across the whole page */
  gsap.to('#scrollPaint', {
    scaleX: 1, ease: 'none',
    scrollTrigger: { trigger: doc.body, start: 'top top', end: 'max', scrub: 0.3 },
  });

  /* hero photo parallax + floating trust cards drift */
  gsap.to('.hero-photo img', {
    yPercent: 10, ease: 'none',
    scrollTrigger: { trigger: '.hero', start: 'top top', end: 'bottom top', scrub: true },
  });
  gsap.to('.hero-card-left', {
    y: -18, ease: 'none',
    scrollTrigger: { trigger: '.hero', start: 'top top', end: 'bottom top', scrub: true },
  });
  gsap.to('.hero-card-right', {
    y: 22, ease: 'none',
    scrollTrigger: { trigger: '.hero', start: 'top top', end: 'bottom top', scrub: true },
  });

  /* service photos: clip-wipe open as they enter */
  doc.querySelectorAll('.service-card figure').forEach(fig => {
    gsap.fromTo(fig, { clipPath: 'inset(0 0 100% 0 round 12px)' }, {
      clipPath: 'inset(0 0 0% 0 round 12px)', duration: 0.9, ease: 'power3.out',
      scrollTrigger: { trigger: fig, start: 'top 88%' },
    });
  });

  /* before/after: divider paints itself from Before to center on first view */
  const ba = doc.querySelector('[data-ba]');
  if (ba) {
    const proxy = { p: 100 };
    gsap.to(proxy, {
      p: 50, duration: 1.4, ease: 'power3.inOut',
      onUpdate: () => {
        ba.style.setProperty('--pos', proxy.p + '%');
        ba.setAttribute('aria-valuenow', Math.round(proxy.p));
      },
      scrollTrigger: { trigger: ba, start: 'top 75%' },
    });
  }

  /* word band scrubs sideways with scroll */
  const wordTrack = doc.getElementById('wordTrack');
  if (wordTrack) {
    gsap.fromTo(wordTrack, { x: 0 }, {
      x: () => -(wordTrack.scrollWidth / 2), ease: 'none',
      scrollTrigger: { trigger: '.word-band', start: 'top bottom', end: 'bottom top', scrub: 0.5 },
    });
  }

  /* guarantee band: red paints in from the left as it enters */
  gsap.fromTo('.guarantee', { backgroundImage: 'linear-gradient(90deg, #DC2626 0%, #B91C1C 0%, #111827 0%)' }, {
    backgroundImage: 'linear-gradient(90deg, #DC2626 60%, #B91C1C 100%, #111827 100%)',
    ease: 'none',
    scrollTrigger: { trigger: '.guarantee', start: 'top 90%', end: 'top 35%', scrub: true },
  });

  /* closing CTA masked lines */
  ScrollTrigger.create({
    trigger: '.close-title', start: 'top 82%',
    onEnter: () => doc.querySelector('.close-title').classList.add('lines-in'),
  });

  /* magnetic primary buttons (pointer devices only) */
  if (matchMedia('(hover:hover) and (pointer:fine)').matches) {
    doc.querySelectorAll('[data-magnetic]').forEach(btn => {
      btn.addEventListener('mousemove', e => {
        const r = btn.getBoundingClientRect();
        gsap.to(btn, {
          x: (e.clientX - r.left - r.width / 2) * 0.16,
          y: (e.clientY - r.top - r.height / 2) * 0.28,
          duration: 0.35, ease: 'power2.out',
        });
      });
      btn.addEventListener('mouseleave', () =>
        gsap.to(btn, { x: 0, y: 0, duration: 0.5, ease: 'elastic.out(1,.5)' }));
    });
  }
})();
