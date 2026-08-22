/*
    Project: Graham's Trucking and Excavation Website
    Filename: script.js

    Animation strategy: GSAP + ScrollTrigger when available (loaded from CDN),
    IntersectionObserver + CSS transitions as the fallback. Everything animates
    transform/opacity only, so scrolling stays smooth.
*/
document.addEventListener('DOMContentLoaded', () => {
  const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
  const isMobile = window.matchMedia('(max-width: 640px)').matches;
  const gsapReady = !prefersReducedMotion && window.gsap && window.ScrollTrigger;

  /* On phones, skip downloading/decoding the hero video — the poster frame
     shows instead, saving several MB and the ongoing decode cost */
  if (isMobile) {
    const heroVid = document.querySelector('.hero-video-bg');
    if (heroVid) {
      heroVid.removeAttribute('autoplay');
      heroVid.preload = 'none';
      heroVid.pause();
    }
  }

  /* ---------- Header: shadow + shrink after scrolling past the top ---------- */
  const header = document.getElementById('site-header');
  if (header) {
    let lastY = window.scrollY;
    const onScroll = () => {
      const y = window.scrollY;
      header.classList.toggle('scrolled', y > 24);
      if (isMobile) {
        if (y > lastY + 8 && y > 220) header.classList.add('tucked');
        else if (y < lastY - 8 || y <= 220) header.classList.remove('tucked');
      }
      lastY = y;
    };
    onScroll();
    window.addEventListener('scroll', onScroll, { passive: true });
  }

  /* Sticky call bar: rises into the thumb zone once the hero CTAs scroll away */
  const callBar = document.querySelector('.call-bar');
  if (callBar) {
    const onBarScroll = () => callBar.classList.toggle('visible', window.scrollY > 420);
    onBarScroll();
    window.addEventListener('scroll', onBarScroll, { passive: true });
  }

  /* Hero scroll cue fades after the first real scroll */
  const cue = document.querySelector('.scroll-cue');
  if (cue) {
    const onCue = () => {
      if (window.scrollY > 60) {
        cue.classList.add('faded');
        window.removeEventListener('scroll', onCue);
      }
    };
    window.addEventListener('scroll', onCue, { passive: true });
  }

  /* ---------- Mobile menu ---------- */
  const hamburger = document.getElementById('hamburger');
  const mobileMenu = document.getElementById('mobile-menu');

  const setMenu = (open) => {
    hamburger.classList.toggle('active', open);
    mobileMenu.classList.toggle('active', open);
    document.body.classList.toggle('menu-open', open);
    hamburger.setAttribute('aria-expanded', String(open));
    hamburger.setAttribute('aria-label', open ? 'Close menu' : 'Open menu');
    mobileMenu.setAttribute('aria-hidden', String(!open));
  };

  if (hamburger && mobileMenu) {
    hamburger.addEventListener('click', () => setMenu(!mobileMenu.classList.contains('active')));
    mobileMenu.querySelectorAll('a').forEach(link => {
      link.addEventListener('click', () => setMenu(false));
    });
    document.addEventListener('keydown', (e) => {
      if (e.key === 'Escape' && mobileMenu.classList.contains('active')) setMenu(false);
    });
  }

  /* ---------- Animations ---------- */
  const revealEls = document.querySelectorAll('.reveal');

  if (gsapReady) {
    document.documentElement.classList.add('gsap-on');
    gsap.registerPlugin(ScrollTrigger);
    ScrollTrigger.config({ ignoreMobileResize: true });

    // Phones get shorter travel and quicker timing — motion reads cleaner
    // on a small screen when it stays subtle
    const RISE = isMobile ? 18 : 36;
    const DUR = isMobile ? 0.55 : 0.7;
    const STAG = isMobile ? 0.07 : 0.1;

    // Reveal helper: fires once, from either direction, so content never
    // stays hidden after a deep-link jump or a fast scroll past it
    const revealOnce = (trigger, start, play) => {
      const st = ScrollTrigger.create({
        trigger,
        start,
        onEnter: () => { play(); st.kill(); },
        onEnterBack: () => { play(); st.kill(); }
      });
    };

    // Word-by-word title reveals: wrap each word in a masked span, then
    // slide the words up out of their masks as the title scrolls in
    document.querySelectorAll('.split-words').forEach(title => {
      const words = title.textContent.trim().split(/\s+/);
      title.textContent = '';
      words.forEach((w, i) => {
        const mask = document.createElement('span');
        mask.className = 'word-mask';
        const word = document.createElement('span');
        word.className = 'word';
        word.textContent = w;
        mask.appendChild(word);
        title.appendChild(mask);
        if (i < words.length - 1) title.appendChild(document.createTextNode(' '));
      });
      gsap.set(title.querySelectorAll('.word'), { yPercent: 110 });
      revealOnce(title, 'top 88%', () => gsap.to(title.querySelectorAll('.word'), {
        yPercent: 0, duration: 0.7, stagger: 0.08, ease: 'power3.out'
      }));
    });

    // Section/content reveals — replaces the CSS transition fallback.
    // Grouped staggers for grids, simple rises for everything else.
    const staggerGroups = [
      '.work-grid', '.testimonial-grid', '.area-grid', '.contact-info-cards'
    ];
    const grouped = new Set();
    staggerGroups.forEach(sel => {
      document.querySelectorAll(sel).forEach(grid => {
        const items = grid.querySelectorAll('.reveal');
        items.forEach(el => grouped.add(el));
        if (!items.length) return;
        gsap.set(items, { autoAlpha: 0, y: RISE });
        revealOnce(grid, 'top 85%', () => gsap.to(items, {
          autoAlpha: 1, y: 0, duration: DUR, stagger: STAG, ease: 'power3.out', clearProps: 'transform'
        }));
      });
    });

    revealEls.forEach(el => {
      if (grouped.has(el)) return;
      const fromX = el.classList.contains('reveal-right') && !isMobile ? 40 : 0;
      gsap.set(el, { autoAlpha: 0, y: fromX ? 0 : RISE, x: fromX });
      revealOnce(el, 'top 88%', () => gsap.to(el, {
        autoAlpha: 1, x: 0, y: 0, duration: isMobile ? 0.6 : 0.8, ease: 'power3.out', clearProps: 'transform'
      }));
    });

    // Gallery tiles: rise in with a soft stagger per project row
    document.querySelectorAll('.gallery-grid').forEach(grid => {
      const tiles = grid.children;
      gsap.set(tiles, { autoAlpha: 0, y: isMobile ? 16 : 30, scale: 0.97 });
      revealOnce(grid, 'top 85%', () => gsap.to(tiles, {
        autoAlpha: 1, y: 0, scale: 1, duration: isMobile ? 0.5 : 0.65, stagger: isMobile ? 0.06 : 0.08, ease: 'power3.out', clearProps: 'transform'
      }));
    });

    // No scroll-scrubbed motion: every animation fires once and completes on
    // its own clock, so nothing ever lags behind the scroll position.
  } else {
    // Fallback: IntersectionObserver + the CSS .reveal transitions
    if (prefersReducedMotion || !('IntersectionObserver' in window)) {
      revealEls.forEach(el => el.classList.add('in-view'));
    } else {
      const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
          if (entry.isIntersecting) {
            entry.target.classList.add('in-view');
            observer.unobserve(entry.target);
          }
        });
      }, { threshold: 0.12, rootMargin: '0px 0px -40px 0px' });
      revealEls.forEach(el => observer.observe(el));
    }
  }

  /* ---------- Gallery lightbox ---------- */
  const lightbox = document.getElementById('lightbox');
  if (lightbox) {
    const lbImg = lightbox.querySelector('.lightbox-img');
    const lbCaption = lightbox.querySelector('.lightbox-caption');
    const btnClose = lightbox.querySelector('.lightbox-close');
    const btnPrev = lightbox.querySelector('.lightbox-prev');
    const btnNext = lightbox.querySelector('.lightbox-next');

    let items = [];        // {src, alt, caption} for the open gallery group
    let index = 0;
    let lastFocused = null;

    const render = () => {
      const item = items[index];
      if (!item) return;
      lbImg.src = item.src;
      lbImg.alt = item.alt;
      lbCaption.textContent = item.caption;
      if (items.length > 1) {
        const count = document.createElement('span');
        count.className = 'count';
        count.textContent = (index + 1) + ' / ' + items.length;
        lbCaption.appendChild(count);
      }
      const showNav = items.length > 1;
      btnPrev.hidden = !showNav;
      btnNext.hidden = !showNav;
    };

    const open = (groupItems, startIndex, trigger) => {
      items = groupItems;
      index = startIndex;
      lastFocused = trigger;
      render();
      lightbox.hidden = false;
      document.body.classList.add('menu-open'); // reuse scroll lock
      requestAnimationFrame(() => lightbox.classList.add('open'));
      btnClose.focus();
    };

    const close = () => {
      lightbox.classList.remove('open');
      document.body.classList.remove('menu-open');
      const finish = () => { lightbox.hidden = true; };
      prefersReducedMotion ? finish() : setTimeout(finish, 300);
      if (lastFocused) lastFocused.focus();
    };

    const step = (dir) => {
      index = (index + dir + items.length) % items.length;
      render();
    };

    document.querySelectorAll('.gallery-grid').forEach(grid => {
      const triggers = Array.from(grid.querySelectorAll('.gallery-item'));
      triggers.forEach((btn, i) => {
        btn.addEventListener('click', () => {
          const groupItems = triggers.map(t => {
            const img = t.querySelector('img');
            return { src: img.currentSrc || img.src, alt: img.alt, caption: t.dataset.caption || '' };
          });
          open(groupItems, i, btn);
        });
      });
    });

    btnClose.addEventListener('click', close);
    btnPrev.addEventListener('click', () => step(-1));
    btnNext.addEventListener('click', () => step(1));
    lightbox.addEventListener('click', (e) => { if (e.target === lightbox) close(); });

    document.addEventListener('keydown', (e) => {
      if (lightbox.hidden) return;
      if (e.key === 'Escape') close();
      else if (e.key === 'ArrowLeft') step(-1);
      else if (e.key === 'ArrowRight') step(1);
      else if (e.key === 'Tab') {
        // Keep focus cycling within the lightbox controls
        const focusables = [btnClose, btnPrev, btnNext].filter(b => !b.hidden);
        const first = focusables[0];
        const last = focusables[focusables.length - 1];
        if (e.shiftKey && document.activeElement === first) { e.preventDefault(); last.focus(); }
        else if (!e.shiftKey && document.activeElement === last) { e.preventDefault(); first.focus(); }
      }
    });

    // Swipe navigation on touch devices
    let touchStartX = null;
    lightbox.addEventListener('touchstart', (e) => { touchStartX = e.changedTouches[0].clientX; }, { passive: true });
    lightbox.addEventListener('touchend', (e) => {
      if (touchStartX === null) return;
      const dx = e.changedTouches[0].clientX - touchStartX;
      touchStartX = null;
      if (Math.abs(dx) > 50) step(dx > 0 ? -1 : 1);
    }, { passive: true });
  }

  /* ---------- Click-to-play gallery videos ---------- */
  document.querySelectorAll('[data-click-video]').forEach(wrap => {
    const video = wrap.querySelector('video');
    const overlay = wrap.querySelector('.video-play-overlay');
    if (!video) return;

    wrap.addEventListener('click', () => {
      // Pause any other playing tile so only one video runs at a time
      document.querySelectorAll('[data-click-video] video').forEach(v => {
        if (v !== video && !v.paused) {
          v.pause();
          v.currentTime = 0;
          v.controls = false;
          const ov = v.parentElement.querySelector('.video-play-overlay');
          if (ov) ov.style.display = 'flex';
        }
      });

      if (video.paused) {
        video.controls = true;
        video.play().catch(() => {});
        if (overlay) overlay.style.display = 'none';
      } else {
        video.pause();
        video.controls = false;
        if (overlay) overlay.style.display = 'flex';
      }
    });

    video.addEventListener('ended', () => {
      video.currentTime = 0;
      video.controls = false;
      if (overlay) overlay.style.display = 'flex';
    });
  });

  /* ---------- FAQ accordion ---------- */
  const faqBoxes = document.querySelectorAll('.faq-box');
  faqBoxes.forEach(box => {
    const btn = box.querySelector('.faq-question');
    if (!btn) return;
    btn.addEventListener('click', () => {
      faqBoxes.forEach(other => {
        if (other !== box) {
          other.classList.remove('active');
          other.querySelector('.faq-question').setAttribute('aria-expanded', 'false');
        }
      });
      const isOpen = box.classList.toggle('active');
      btn.setAttribute('aria-expanded', String(isOpen));
    });
  });
});
