/*
    Project: Graham's Trucking and Excavation Website
    Filename: script.js
*/
document.addEventListener('DOMContentLoaded', () => {
  const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

  /* ---------- Header: shadow + shrink after scrolling past the top ---------- */
  const header = document.getElementById('site-header');
  if (header) {
    const onScroll = () => header.classList.toggle('scrolled', window.scrollY > 24);
    onScroll();
    window.addEventListener('scroll', onScroll, { passive: true });
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

  /* ---------- Scroll reveals ---------- */
  const revealEls = document.querySelectorAll('.reveal');
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
