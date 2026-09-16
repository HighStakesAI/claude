/* High Stakes — site behavior. No frameworks. */
(function () {
  "use strict";
  var reduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches;

  var yr = document.getElementById("yr");
  if (yr) yr.textContent = new Date().getFullYear();

  // hero masked reveal
  requestAnimationFrame(function () { document.body.classList.add("loaded"); });

  // split big quote into scroll-lit words
  var q = document.getElementById("quote");
  var words = [];
  if (q) {
    var html = "";
    q.childNodes.forEach(function (node) {
      var red = node.nodeName === "B";
      (node.textContent || "").split(/\s+/).forEach(function (w) {
        if (w) html += '<span class="w' + (red ? " red" : "") + '">' + w + "</span> ";
      });
    });
    q.innerHTML = html;
    words = q.querySelectorAll(".w");
  }

  var prog = document.getElementById("progress");
  var wm = document.getElementById("wm");
  var heroTitle = document.getElementById("hero-title");
  var heroSub = document.getElementById("hero-sub");
  var bar = document.getElementById("callbar");
  var ticking = false;

  function onScroll() {
    var d = document.documentElement, y = window.scrollY;
    if (prog) prog.style.width = (d.scrollTop / (d.scrollHeight - d.clientHeight)) * 100 + "%";
    if (bar) bar.classList.toggle("on", y > innerHeight * 0.45);
    if (!reduced) {
      if (y < innerHeight * 1.2) {
        if (wm) wm.style.transform = "translateY(" + y * -0.16 + "px)";
        if (heroTitle) heroTitle.style.transform = "translateY(" + y * -0.1 + "px)";
        if (heroSub) heroSub.style.transform = "translateY(" + y * -0.05 + "px)";
      }
      if (q && words.length) {
        var r = q.getBoundingClientRect();
        var p = Math.min(1, Math.max(0, (innerHeight * 0.82 - r.top) / (r.height + innerHeight * 0.28)));
        var lit = Math.floor(words.length * p);
        words.forEach(function (w, i) { w.classList.toggle("lit", i < lit); });
      }
    }
    ticking = false;
  }
  addEventListener("scroll", function () {
    if (!ticking) { ticking = true; requestAnimationFrame(onScroll); }
  }, { passive: true });
  onScroll();
  if (reduced) words.forEach(function (w) { w.classList.add("lit"); });

  // hide call bar while typing (keyboard open)
  document.addEventListener("focusin", function (e) {
    if (bar && e.target.matches && e.target.matches("input,textarea,select")) bar.classList.add("kb");
  });
  document.addEventListener("focusout", function () { if (bar) bar.classList.remove("kb"); });

  // reveals + counters
  var counted = false;
  function runCounters() {
    if (counted) return; counted = true;
    document.querySelectorAll("[data-count]").forEach(function (el) {
      var target = +el.dataset.count, t0 = null;
      if (reduced) { el.textContent = target; return; }
      function tick(t) {
        if (!t0) t0 = t;
        var p = Math.min((t - t0) / 1100, 1);
        el.textContent = Math.round(target * (1 - Math.pow(1 - p, 3)));
        if (p < 1) requestAnimationFrame(tick);
      }
      requestAnimationFrame(tick);
    });
  }
  var revs = document.querySelectorAll(".rv, .rule, .steps");
  if (reduced) {
    revs.forEach(function (el) { el.classList.add("in"); });
    runCounters();
  } else {
    var io = new IntersectionObserver(function (entries) {
      entries.forEach(function (e) {
        if (e.isIntersecting) {
          e.target.classList.add("in");
          if (e.target.querySelector && e.target.querySelector("[data-count]")) runCounters();
          io.unobserve(e.target);
        }
      });
    }, { threshold: 0.15, rootMargin: "0px 0px -6% 0px" });
    revs.forEach(function (el) { io.observe(el); });
  }

  // contact form -> GHL webhook (same contract as previous site)
  var form = document.getElementById("contact-form");
  if (form) {
    var msg = document.getElementById("form-msg");
    var btn = document.getElementById("c-submit");
    var sending = false;
    form.addEventListener("submit", async function (e) {
      e.preventDefault();
      if (sending) return;
      if (!form.checkValidity()) { form.reportValidity(); return; }
      sending = true;
      btn.disabled = true;
      msg.className = "form-msg";
      msg.textContent = form.dataset.sendingText || "Sending…";
      try {
        await fetch("https://services.leadconnectorhq.com/hooks/w3F7XRjmSEsSojrwWvHN/webhook-trigger/35131cd9-1dd3-42f3-ae5b-f1487bc8ee7a", {
          method: "POST",
          headers: { "Content-Type": "application/x-www-form-urlencoded" },
          body: new URLSearchParams({
            name: form.name.value,
            email: form.email.value,
            phone: form.phone.value,
            service: form.service.value,
            message: form.message.value,
            sms_consent: form.sms_consent.checked ? "yes" : "no",
          }).toString(),
          mode: "no-cors",
        });
        msg.className = "form-msg ok";
        msg.textContent = form.dataset.okText || "Got it — we'll call you back within one business day.";
        if (typeof window.gtag === "function")
          window.gtag("event", "generate_lead", { event_category: "form", event_label: form.service.value });
        form.reset();
      } catch (err) {
        msg.className = "form-msg err";
        msg.textContent = form.dataset.errText || "Something went wrong. Call us instead: (850) 943-2040.";
      }
      btn.disabled = false;
      sending = false;
    });
  }
})();
