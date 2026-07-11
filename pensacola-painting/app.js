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
    entries.forEach(en => { if (en.isIntersecting) { en.target.classList.add('in-view'); io.unobserve(en.target); } });
  }, { threshold: 0.15, rootMargin: '0px 0px -5% 0px' });
  doc.querySelectorAll('.reveal').forEach(el => io.observe(el));

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
})();
