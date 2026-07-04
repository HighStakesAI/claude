function _extends() {
  return (
    (_extends = Object.assign
      ? Object.assign.bind()
      : function (e) {
          for (var t = 1; t < arguments.length; t++) {
            var a = arguments[t];
            for (var r in a) ({}).hasOwnProperty.call(a, r) && (e[r] = a[r]);
          }
          return e;
        }),
    _extends.apply(null, arguments)
  );
}
const { useState: useState, useEffect: useEffect, useRef: useRef, useCallback: useCallback } = React;
window.gsap && window.ScrollTrigger && window.gsap.registerPlugin(window.ScrollTrigger);
const G = window.gsap,
  ST = window.ScrollTrigger,
  ScrollProgress = () => {
    const e = useRef(null);
    return (
      useEffect(() => {
        const t = () => {
          const t = e.current;
          if (!t) return;
          const a = (window.scrollY / (document.documentElement.scrollHeight - window.innerHeight)) * 100;
          t.style.width = a + "%";
        };
        return (
          window.addEventListener("scroll", t, { passive: !0 }),
          () => window.removeEventListener("scroll", t)
        );
      }, []),
      React.createElement("div", {
        ref: e,
        className: "scroll-progress",
        style: { width: "0%" },
        "aria-hidden": "true",
      })
    );
  },
  CustomCursor = () => {
    const e = useRef(null),
      t = useRef(null),
      a = useRef({ x: -200, y: -200 }),
      r = useRef({ x: -200, y: -200 });
    return (
      useEffect(() => {
        const l = (t) => {
            a.current = { x: t.clientX, y: t.clientY };
            const r = e.current;
            r && ((r.style.left = t.clientX + "px"), (r.style.top = t.clientY + "px"));
          },
          n = () => {
            (e.current?.classList.add("hovering"), t.current?.classList.add("hovering"));
          },
          c = () => {
            (e.current?.classList.remove("hovering"), t.current?.classList.remove("hovering"));
          };
        let o;
        (window.addEventListener("mousemove", l),
          document.querySelectorAll('a,button,[role="button"]').forEach((e) => {
            (e.addEventListener("mouseenter", n), e.addEventListener("mouseleave", c));
          }));
        const s = (e, t, a) => e + (t - e) * a,
          i = () => {
            ((r.current.x = s(r.current.x, a.current.x, 0.12)),
              (r.current.y = s(r.current.y, a.current.y, 0.12)));
            const e = t.current;
            (e && ((e.style.left = r.current.x + "px"), (e.style.top = r.current.y + "px")),
              (o = requestAnimationFrame(i)));
          };
        return (
          i(),
          () => {
            (window.removeEventListener("mousemove", l), cancelAnimationFrame(o));
          }
        );
      }, []),
      React.createElement(
        React.Fragment,
        null,
        React.createElement("div", { ref: e, className: "cursor-dot", "aria-hidden": "true" }),
        React.createElement("div", { ref: t, className: "cursor-ring", "aria-hidden": "true" }),
      )
    );
  },
  CURRENT_MONTH = new Date().toLocaleString("en-US", { month: "long" }),
  BrandMark = ({ size: e = 32 }) =>
    React.createElement(
      "svg",
      {
        width: e,
        height: e,
        viewBox: "0 0 64 64",
        className: "flex-shrink-0",
        "aria-hidden": "true",
        role: "img",
      },
      React.createElement("rect", { width: "64", height: "64", rx: "16", fill: "#0a0a0a" }),
      React.createElement("rect", {
        x: "1.5",
        y: "1.5",
        width: "61",
        height: "61",
        rx: "14.5",
        fill: "none",
        stroke: "#D4AF37",
        strokeOpacity: "0.5",
        strokeWidth: "2",
      }),
      React.createElement(
        "text",
        {
          x: "32",
          y: "46",
          textAnchor: "middle",
          fontFamily: "Georgia, 'Times New Roman', serif",
          fontWeight: "700",
          fontSize: "42",
          fill: "#D4AF37",
        },
        "H",
      ),
    ),
  BrandWordmark = ({ className: e = "" }) =>
    React.createElement(
      "span",
      { className: e },
      "High ",
      React.createElement("span", { className: "text-gold-600 dark:text-gold-500" }, "Stakes"),
    ),
  CADE_VIDEO = "https://assets.cdn.filesafe.space/w3F7XRjmSEsSojrwWvHN/media/6969250dd01e74c1bba89778.mp4",
  WatchVideoButton = ({ src: e, variant: t = "pill", logo: a, title: r, sub: l }) => {
    const [n, c] = useState(!1);
    useEffect(() => {
      if (!n) return;
      const e = (e) => {
        "Escape" === e.key && c(!1);
      };
      return (
        document.addEventListener("keydown", e),
        (document.body.style.overflow = "hidden"),
        () => {
          (document.removeEventListener("keydown", e), (document.body.style.overflow = ""));
        }
      );
    }, [n]);
    const o =
      n &&
      React.createElement(
        "div",
        {
          className: "video-lightbox",
          role: "dialog",
          "aria-modal": "true",
          "aria-label": r || "Client video",
          onClick: () => c(!1),
        },
        React.createElement(
          "div",
          { className: "video-lightbox-inner", onClick: (e) => e.stopPropagation() },
          React.createElement(
            "button",
            { className: "video-lightbox-close", "aria-label": "Close video", onClick: () => c(!1) },
            "\u00d7",
          ),
          React.createElement("video", {
            src: e,
            controls: !0,
            autoPlay: !0,
            playsInline: !0,
            className: "video-lightbox-video",
          }),
        ),
      );
    return "card" === t
      ? React.createElement(
          React.Fragment,
          null,
          React.createElement(
            "button",
            { type: "button", onClick: () => c(!0), className: "watch-card" },
            React.createElement(
              "span",
              { className: "watch-thumb" },
              a && React.createElement("img", { src: a, alt: "", loading: "lazy", width: "48", height: "48" }),
              React.createElement(
                "span",
                { className: "watch-play", "aria-hidden": "true" },
                React.createElement(PlayIcon, { className: "w-3.5 h-3.5" }),
              ),
            ),
            React.createElement(
              "span",
              { className: "min-w-0 text-left" },
              React.createElement("span", { className: "block font-bold text-sm text-heading" }, r),
              React.createElement("span", { className: "block text-xs text-muted mt-0.5" }, l),
            ),
            React.createElement("span", { className: "watch-cta", "aria-hidden": "true" }, "Watch"),
          ),
          o,
        )
      : React.createElement(
          React.Fragment,
          null,
          React.createElement(
            "button",
            { type: "button", onClick: (e) => (e.stopPropagation(), c(!0)), className: "watch-pill" },
            React.createElement(
              "span",
              { className: "watch-play sm", "aria-hidden": "true" },
              React.createElement(PlayIcon, { className: "w-3 h-3" }),
            ),
            r,
          ),
          o,
        );
  },
  FeaturedVideo = ({ src: e, logo: t, name: a, sub: r }) => {
    const l = useRef(null),
      [n, c] = useState(!1);
    return React.createElement(
      "div",
      { className: "fv-wrap" },
      React.createElement("video", {
        ref: l,
        src: e,
        controls: n,
        preload: "metadata",
        playsInline: !0,
        className: "fv-video",
      }),
      !n &&
        React.createElement(
          "button",
          {
            type: "button",
            className: "fv-overlay",
            "aria-label": `Play video: ${a}`,
            onClick: () => {
              c(!0);
              const e = l.current && l.current.play();
              e && e.catch && e.catch(() => {});
            },
          },
          t &&
            React.createElement("img", {
              src: t,
              alt: "",
              loading: "lazy",
              width: "56",
              height: "56",
              className: "fv-logo",
            }),
          React.createElement(
            "span",
            { className: "fv-play", "aria-hidden": "true" },
            React.createElement(PlayIcon, { className: "w-6 h-6" }),
          ),
          React.createElement("span", { className: "fv-name" }, a),
          React.createElement("span", { className: "fv-sub" }, r),
        ),
    );
  },
  AnnouncementBar = ({ onDismiss: e, onBook: b }) =>
    React.createElement(
      "div",
      { className: "announcement-bar relative z-[60]" },
      React.createElement(
        "div",
        { className: "max-w-7xl mx-auto px-9 py-2 flex items-center justify-center gap-2 text-center" },
        React.createElement("span", {
          className: "scarcity-dot w-1.5 h-1.5 rounded-full bg-gold-500 flex-shrink-0 hidden sm:inline-block",
          "aria-hidden": "true",
        }),
        React.createElement(
          "p",
          {
            className:
              "text-[11px] font-bold text-gold-700 dark:text-gold-400 tracking-wide whitespace-nowrap min-w-0 truncate",
          },
          React.createElement(
            "span",
            { className: "hidden sm:inline" },
            "Only ",
            React.createElement(
              "span",
              { className: "text-gold-600 dark:text-gold-300" },
              "3 onboarding spots",
            ),
            ` remaining in ${CURRENT_MONTH} — `,
          ),
          React.createElement(
            "span",
            { className: "sm:hidden" },
            React.createElement(
              "span",
              { className: "text-gold-600 dark:text-gold-300" },
              "3 spots left",
            ),
            ` in ${CURRENT_MONTH} — `,
          ),
          React.createElement(
            "button",
            { onClick: b, className: "underline underline-offset-2 cursor-pointer font-bold" },
            React.createElement("span", { className: "hidden sm:inline" }, "Book your free call now"),
            React.createElement("span", { className: "sm:hidden" }, "Book now"),
          ),
        ),
        React.createElement(
          "button",
          {
            onClick: e,
            "aria-label": "Dismiss",
            className:
              "absolute right-3 top-1/2 -translate-y-1/2 text-gold-600/60 hover:text-gold-500 text-lg leading-none cursor-pointer",
          },
          "×",
        ),
      ),
    ),
  MobileStickyCTA = ({ onBook: e }) => {
    const [t, a] = useState(!1);
    return (
      useEffect(() => {
        const e = () => a(window.scrollY > 0.3 * window.innerHeight);
        return (
          window.addEventListener("scroll", e, { passive: !0 }),
          () => window.removeEventListener("scroll", e)
        );
      }, []),
      React.createElement(
        "div",
        {
          className: "mobile-sticky " + (t ? "visible" : ""),
          role: "complementary",
          "aria-label": "Quick contact",
        },
        React.createElement(
          "a",
          {
            href: "tel:8504859926",
            className:
              "flex-1 flex items-center justify-center gap-2 py-3 rounded-xl border border-white/10 bg-white/5 text-white font-bold text-xs uppercase tracking-wider cursor-pointer",
          },
          React.createElement(
            "svg",
            {
              width: "14",
              height: "14",
              viewBox: "0 0 24 24",
              fill: "none",
              stroke: "currentColor",
              strokeWidth: "2",
              strokeLinecap: "round",
              strokeLinejoin: "round",
              "aria-hidden": "true",
            },
            React.createElement("path", {
              d: "M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6 19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72 12.05 12.05 0 0 0 .7 2.81 2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45 12.03 12.03 0 0 0 2.81.7A2 2 0 0 1 22 16.92z",
            }),
          ),
          "Call Now",
        ),
        React.createElement(
          "button",
          {
            onClick: e,
            className:
              "flex-1 py-3 rounded-xl bg-gradient-to-r from-gold-500 to-gold-600 text-white font-bold text-xs uppercase tracking-wider cursor-pointer",
          },
          "Book Free Call",
        ),
      )
    );
  },
  ParticleBackground = () => {
    const e = useRef(null),
      t = useRef(null),
      a = useRef([]),
      r = useRef({ x: 0, y: 0 });
    return (
      useEffect(() => {
        if (window.matchMedia("(prefers-reduced-motion:reduce)").matches) return;
        const l = e.current;
        if (!l) return;
        const n = l.getContext("2d");
        let c = window.innerWidth,
          o = window.innerHeight;
        const s = () => {
          ((c = window.innerWidth), (o = window.innerHeight), (l.width = c), (l.height = o));
        };
        (s(), window.addEventListener("resize", s));
        const i = Math.min(26, Math.floor(c / 60));
        a.current = Array.from({ length: i }, () => ({
          x: Math.random() * c,
          y: Math.random() * o,
          vx: 0.3 * (Math.random() - 0.5),
          vy: 0.3 * (Math.random() - 0.5),
          r: 1.5 * Math.random() + 0.5,
          o: 0.4 * Math.random() + 0.1,
        }));
        const d = (e) => {
          r.current = { x: e.clientX, y: e.clientY };
        };
        window.addEventListener("mousemove", d, { passive: !0 });
        const m = { current: !1 },
          u = () => {
            if (!m.current) return;
            n.clearRect(0, 0, c, o);
            const e = a.current,
              l = document.documentElement.classList.contains("dark");
            for (let t = 0; t < e.length; t++) {
              const a = e[t],
                s = r.current.x - a.x,
                i = r.current.y - a.y;
              (Math.sqrt(s * s + i * i) < 150 && ((a.vx += 4e-5 * s), (a.vy += 4e-5 * i)),
                (a.vx *= 0.99),
                (a.vy *= 0.99),
                Math.abs(a.vx) < 0.08 && (a.vx += 0.08 * (Math.random() - 0.5)),
                Math.abs(a.vy) < 0.08 && (a.vy += 0.08 * (Math.random() - 0.5)),
                (a.x += a.vx),
                (a.y += a.vy),
                (a.x < 0 || a.x > c) && (a.vx *= -1),
                (a.y < 0 || a.y > o) && (a.vy *= -1),
                n.beginPath(),
                n.arc(a.x, a.y, a.r, 0, 2 * Math.PI),
                (n.fillStyle = l ? `rgba(212,175,55,${a.o})` : `rgba(180,150,60,${0.6 * a.o})`),
                n.fill());
            }
            t.current = requestAnimationFrame(u);
          },
          g = () => {
            m.current && ((m.current = !1), t.current && cancelAnimationFrame(t.current));
          },
          p = () => {
            window.scrollY < 1.2 * window.innerHeight
              ? m.current || ((m.current = !0), (t.current = requestAnimationFrame(u)))
              : g();
          };
        return (
          p(),
          window.addEventListener("scroll", p, { passive: !0 }),
          () => {
            (window.removeEventListener("resize", s),
              window.removeEventListener("mousemove", d),
              window.removeEventListener("scroll", p),
              g());
          }
        );
      }, []),
      React.createElement("canvas", {
        ref: e,
        className: "particles-canvas fixed inset-0 pointer-events-none z-0",
        "aria-hidden": "true",
      })
    );
  },
  BackgroundGradientAnimation = ({ isDark: e = !0 }) => {
    const t = useRef(null),
      [a, r] = useState(!1),
      [l, n] = useState(!0);
    (useEffect(() => {
      r(/^((?!chrome|android).)*safari/i.test(navigator.userAgent));
    }, []),
      useEffect(() => {
        const e = () => n(window.scrollY < 1.2 * window.innerHeight);
        return (
          e(),
          window.addEventListener("scroll", e, { passive: !0 }),
          () => window.removeEventListener("scroll", e)
        );
      }, []),
      useEffect(() => {
        if (!l) return;
        let e,
          a = 0,
          r = 0,
          n = 0,
          c = 0;
        const o = (e) => {
            ((n = e.clientX), (c = e.clientY));
          },
          s = () => {
            ((a += (n - a) / 20),
              (r += (c - r) / 20),
              t.current && (t.current.style.transform = `translate(${Math.round(a)}px, ${Math.round(r)}px)`),
              (e = requestAnimationFrame(s)));
          };
        return (
          window.addEventListener("mousemove", o, { passive: !0 }),
          (e = requestAnimationFrame(s)),
          () => {
            (window.removeEventListener("mousemove", o), cancelAnimationFrame(e));
          }
        );
      }, [l]));
    const c = "80%",
      o = "normal",
      s = l ? "running" : "paused",
      i = (e, t, a, r = 1) =>
        `radial-gradient(circle at center, rgba(${e},${t},${a},${r}) 0%, rgba(${e},${t},${a},0) 50%) no-repeat`,
      d = (e, t, a, r = 1) => ({
        position: "absolute",
        width: c,
        height: c,
        top: `calc(50% - ${c} / 2)`,
        left: `calc(50% - ${c} / 2)`,
        background: e,
        mixBlendMode: o,
        borderRadius: "50%",
        transformOrigin: t,
        animation: a,
        animationPlayState: s,
        opacity: r,
      });
    return React.createElement(
      "div",
      {
        className: "fixed inset-0 z-0 pointer-events-none overflow-hidden",
        "aria-hidden": "true",
        style: {
          background: e
            ? "linear-gradient(40deg, rgb(8,6,2), rgb(5,4,9))"
            : "linear-gradient(40deg, #fefdf9, #f6f3ea)",
        },
      },
      React.createElement(
        "svg",
        { className: "hidden" },
        React.createElement(
          "defs",
          null,
          React.createElement(
            "filter",
            { id: "bga-goo" },
            React.createElement("feGaussianBlur", {
              in: "SourceGraphic",
              stdDeviation: "10",
              result: "blur",
            }),
            React.createElement("feColorMatrix", {
              in: "blur",
              mode: "matrix",
              values: "1 0 0 0 0  0 1 0 0 0  0 0 1 0 0  0 0 0 18 -8",
              result: "goo",
            }),
            React.createElement("feBlend", { in: "SourceGraphic", in2: "goo" }),
          ),
        ),
      ),
      React.createElement(
        "div",
        { className: "w-full h-full", style: { filter: "blur(30px)" } },
        e
          ? React.createElement(
              React.Fragment,
              null,
              React.createElement("div", {
                style: d(i(212, 175, 55, 0.18), "center center", "moveVertical 30s reverse infinite"),
              }),
              React.createElement("div", {
                style: d(i(184, 150, 46, 0.14), "calc(50% - 400px)", "moveInCircle 20s reverse infinite"),
              }),
              React.createElement("div", {
                style: d(i(239, 200, 74, 0.16), "calc(50% + 400px)", "moveInCircle 40s linear infinite"),
              }),
              React.createElement("div", {
                style: d(i(90, 60, 5, 0.1), "calc(50% - 200px)", "moveHorizontal 40s ease infinite", 0.4),
              }),
              React.createElement("div", {
                style: d(
                  i(250, 215, 80, 0.12),
                  "calc(50% - 800px) calc(50% + 800px)",
                  "moveInCircle 20s ease infinite",
                ),
              }),
            )
          : React.createElement(
              React.Fragment,
              null,
              React.createElement("div", {
                style: d(i(212, 175, 55, 0.16), "center center", "moveVertical 30s reverse infinite", 0.55),
              }),
              React.createElement("div", {
                style: d(
                  i(230, 195, 90, 0.12),
                  "calc(50% - 400px)",
                  "moveInCircle 20s reverse infinite",
                  0.5,
                ),
              }),
              React.createElement("div", {
                style: d(
                  i(239, 200, 74, 0.14),
                  "calc(50% + 400px)",
                  "moveInCircle 40s linear infinite",
                  0.55,
                ),
              }),
              React.createElement("div", {
                style: d(
                  i(250, 215, 80, 0.1),
                  "calc(50% - 800px) calc(50% + 800px)",
                  "moveInCircle 20s ease infinite",
                  0.45,
                ),
              }),
            ),
        React.createElement("div", {
          ref: t,
          style: {
            position: "absolute",
            background: i(212, 175, 55, e ? 0.12 : 0.1),
            width: "100%",
            height: "100%",
            top: "-50%",
            left: "-50%",
            mixBlendMode: o,
            opacity: e ? 0.5 : 0.35,
          },
        }),
      ),
    );
  },
  Ic = ({ d: e, children: t, className: a, ...r }) =>
    React.createElement(
      "svg",
      _extends(
        {
          xmlns: "http://www.w3.org/2000/svg",
          width: "24",
          height: "24",
          viewBox: "0 0 24 24",
          fill: "none",
          stroke: "currentColor",
          strokeWidth: "1.5",
          strokeLinecap: "round",
          strokeLinejoin: "round",
          className: a,
          "aria-hidden": "true",
          focusable: "false",
        },
        r,
      ),
      t,
    ),
  Globe = (e) =>
    React.createElement(
      Ic,
      e,
      React.createElement("circle", { cx: "12", cy: "12", r: "10" }),
      React.createElement("path", { d: "M12 2a14.5 14.5 0 0 0 0 20 14.5 14.5 0 0 0 0-20" }),
      React.createElement("path", { d: "M2 12h20" }),
    ),
  Phone = (e) =>
    React.createElement(
      Ic,
      e,
      React.createElement("path", {
        d: "M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6 19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72 12.05 12.05 0 0 0 .7 2.81 2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45 12.03 12.03 0 0 0 2.81.7A2 2 0 0 1 22 16.92z",
      }),
    ),
  ArrowRight = (e) =>
    React.createElement(
      Ic,
      e,
      React.createElement("path", { d: "M5 12h14" }),
      React.createElement("path", { d: "m12 5 7 7-7 7" }),
    ),
  Menu = (e) =>
    React.createElement(
      Ic,
      e,
      React.createElement("line", { x1: "4", x2: "20", y1: "12", y2: "12" }),
      React.createElement("line", { x1: "4", x2: "20", y1: "6", y2: "6" }),
      React.createElement("line", { x1: "4", x2: "20", y1: "18", y2: "18" }),
    ),
  X = (e) =>
    React.createElement(
      Ic,
      e,
      React.createElement("path", { d: "M18 6 6 18" }),
      React.createElement("path", { d: "m6 6 12 12" }),
    ),
  Zap = (e) =>
    React.createElement(
      Ic,
      e,
      React.createElement("polygon", { points: "13 2 3 14 12 14 11 22 21 10 12 10 13 2" }),
    ),
  Bot = (e) =>
    React.createElement(
      Ic,
      e,
      React.createElement("rect", { width: "18", height: "10", x: "3", y: "11", rx: "2" }),
      React.createElement("circle", { cx: "12", cy: "5", r: "2" }),
      React.createElement("path", { d: "M12 7v4" }),
      React.createElement("line", { x1: "8", x2: "8", y1: "16", y2: "16" }),
      React.createElement("line", { x1: "16", x2: "16", y1: "16", y2: "16" }),
    ),
  StarFilled = (e) =>
    React.createElement(
      Ic,
      _extends({}, e, { fill: "currentColor", stroke: "none" }),
      React.createElement("polygon", {
        points:
          "12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2",
      }),
    ),
  Sun = (e) =>
    React.createElement(
      Ic,
      e,
      React.createElement("circle", { cx: "12", cy: "12", r: "4" }),
      React.createElement("path", {
        d: "M12 2v2M12 20v2m-7.07-14.93 1.41 1.41m12.72 12.72 1.41 1.41M2 12h2m18 0h2m-4.93 7.07-1.41-1.41M6.34 6.34 4.93 4.93",
      }),
    ),
  Moon = (e) =>
    React.createElement(Ic, e, React.createElement("path", { d: "M12 3a6 6 0 0 0 9 9 9 9 0 1 1-9-9Z" })),
  Volume2 = (e) =>
    React.createElement(
      Ic,
      e,
      React.createElement("path", { d: "M11 5 6 9H2v6h4l5 4V5z" }),
      React.createElement("path", { d: "M19.07 4.93a10 10 0 0 1 0 14.14M15.54 8.46a5 5 0 0 1 0 7.07" }),
    ),
  VolumeX = (e) =>
    React.createElement(
      Ic,
      e,
      React.createElement("path", { d: "M11 5 6 9H2v6h4l5 4V5z" }),
      React.createElement("line", { x1: "23", y1: "9", x2: "17", y2: "15" }),
      React.createElement("line", { x1: "17", y1: "9", x2: "23", y2: "15" }),
    ),
  PlayIcon = (e) =>
    React.createElement(Ic, e, React.createElement("polygon", { points: "5 3 19 12 5 21 5 3" })),
  PauseIcon = (e) =>
    React.createElement(
      Ic,
      e,
      React.createElement("rect", { x: "6", y: "4", width: "4", height: "16" }),
      React.createElement("rect", { x: "14", y: "4", width: "4", height: "16" }),
    ),
  ChevronLeft = (e) => React.createElement(Ic, e, React.createElement("path", { d: "m15 18-6-6 6-6" })),
  ChevronDown = (e) => React.createElement(Ic, e, React.createElement("path", { d: "m6 9 6 6 6-6" })),
  Sparkles = (e) =>
    React.createElement(
      Ic,
      e,
      React.createElement("path", {
        d: "m12 3-1.912 5.813a2 2 0 0 1-1.275 1.275L3 12l5.813 1.912a2 2 0 0 1 1.275 1.275L12 21l1.912-5.813a2 2 0 0 1 1.275-1.275L21 12l-5.813-1.912a2 2 0 0 1-1.275-1.275L12 3Z",
      }),
      React.createElement("path", { d: "M5 3v4M9 5H5" }),
    ),
  Megaphone = (e) =>
    React.createElement(
      Ic,
      e,
      React.createElement("path", { d: "m3 11 18-5v12L3 14v-3z" }),
      React.createElement("path", { d: "M11.6 16.8a3 3 0 1 1-5.8-1.6" }),
    ),
  CheckCircle = (e) =>
    React.createElement(
      Ic,
      e,
      React.createElement("path", { d: "M22 11.08V12a10 10 0 1 1-5.93-9.14" }),
      React.createElement("polyline", { points: "22 4 12 14.01 9 11.01" }),
    ),
  Check = (e) => React.createElement(Ic, e, React.createElement("polyline", { points: "20 6 9 17 4 12" })),
  Quote = (e) =>
    React.createElement(
      Ic,
      e,
      React.createElement("path", {
        d: "M3 21c3 0 7-1 7-8V5c0-1.25-.756-2.017-2-2H4c-1.25 0-2 .75-2 1.972V11c0 1.25.75 2 2 2 1 0 1 0 1 1v1c0 1-1 2-2 2s-1 .008-1 1.031V20c0 1 0 1 1 1z",
      }),
      React.createElement("path", {
        d: "M15 21c3 0 7-1 7-8V5c0-1.25-.757-2.017-2-2h-4c-1.25 0-2 .75-2 1.972V11c0 1.25.75 2 2 2h.75c0 2.25.25 4-2.75 4v3c0 1 0 1 1 1z",
      }),
    ),
  Search = (e) =>
    React.createElement(
      Ic,
      e,
      React.createElement("circle", { cx: "11", cy: "11", r: "8" }),
      React.createElement("path", { d: "m21 21-4.3-4.3" }),
    ),
  TrendingUp = (e) =>
    React.createElement(
      Ic,
      e,
      React.createElement("polyline", { points: "22 7 13.5 15.5 8.5 10.5 2 17" }),
      React.createElement("polyline", { points: "16 7 22 7 22 13" }),
    ),
  Calendar = (e) =>
    React.createElement(
      Ic,
      e,
      React.createElement("rect", { width: "18", height: "18", x: "3", y: "4", rx: "2" }),
      React.createElement("path", { d: "M3 10h18M8 2v4M16 2v4" }),
    ),
  MapPin = (e) =>
    React.createElement(
      Ic,
      e,
      React.createElement("path", { d: "M20 10c0 6-8 12-8 12s-8-6-8-12a8 8 0 0 1 16 0Z" }),
      React.createElement("circle", { cx: "12", cy: "10", r: "3" }),
    ),
  Send = (e) =>
    React.createElement(
      Ic,
      e,
      React.createElement("path", {
        d: "M14.536 21.686a.5.5 0 0 0 .937-.024l6.5-19a.496.496 0 0 0-.635-.635l-19 6.5a.5.5 0 0 0-.024.937l7.93 3.18a2 2 0 0 1 1.112 1.11z",
      }),
      React.createElement("path", { d: "m21.854 2.147-10.94 10.939" }),
    ),
  Loader = (e) =>
    React.createElement(
      Ic,
      e,
      React.createElement("path", { d: "M12 2v4" }),
      React.createElement("path", { d: "m16.2 7.8 2.9-2.9" }),
      React.createElement("path", { d: "M18 12h4" }),
      React.createElement("path", { d: "m16.2 16.2 2.9 2.9" }),
      React.createElement("path", { d: "M12 18v4" }),
      React.createElement("path", { d: "m4.9 19.1 2.9-2.9" }),
      React.createElement("path", { d: "M2 12h4" }),
      React.createElement("path", { d: "m4.9 4.9 2.9 2.9" }),
    ),
  content = {
    en: {
      nav: { services: "Services", work: "Work", process: "Process", start: "Get Started" },
      hero: {
        tag: "Websites · SEO · Social Media",
        title1: "We Build & Grow",
        title2: "Your Online Presence",
        desc: "High-converting websites, local SEO that ranks you on Google, and done-for-you ads + social media — built to grow your local business.",
        btn1: "Book Free Strategy Call",
        btn2: "View Our Work",
        microcopy: "15-min call · No pitch · Free website + SEO audit",
        demoLink: "Get your free website & SEO audit",
        callLabel: "Or call us:",
      },
      services: {
        title: "What We Do",
        subtitle: "Three services that get local businesses found, clicked, and chosen.",
        items: [
          {
            title: "Custom Websites",
            desc: "A fast, mobile-first website built to turn visitors into paying customers.",
            bullets: [
              "Mobile-optimized & lightning-fast",
              "SEO-ready structure baked in",
              "Live in a week or less — you own it",
            ],
          },
          {
            title: "Local SEO",
            desc: "Rank on Google and Maps so customers find you before your competitors.",
            bullets: [
              "Google Business Profile optimization",
              "Map-pack & local keyword ranking",
              "Technical & on-page SEO",
            ],
          },
          {
            title: "Ads + Social Media",
            desc: "Done-for-you ad campaigns and 3 managed posts a week — content, replies, and reviews handled.",
            bullets: [
              "Google · Meta · TikTok ads",
              "3 branded posts / week, every week",
              "Reviews & reputation on autopilot",
            ],
          },
        ],
      },
      trust: {
        items: [
          { stat: "98", suffix: "%", label: "Client Retention" },
          { stat: "3", suffix: "x", label: "More Local Traffic" },
          { stat: "<1", suffix: "wk", label: "Launch Time" },
        ],
      },
      marquee: [
        "Ranked #1 Locally",
        "3 Posts / Week",
        "98% Client Retention",
        "Pensacola, FL Based",
        "Google · Meta · TikTok",
        "5-Star Review Growth",
        "Local SEO Experts",
        "Built to Convert",
      ],
      testimonials: {
        title: "What Our Clients Say",
        items: [
          {
            quote: "We went from page 6 to #1 in most searches in Pensacola. The leads are night and day.",
            name: "Cade",
            business: "The Golden Plumber",
            hasVideo: !0,
            service: "Website + Local SEO",
            initials: "GP",
            logo: "golden-plumber.png",
            logoBg: "light",
          },
          {
            quote: "A clean, professional website and they handle our Facebook for us. Great work.",
            name: "Owner",
            business: "Professional Painting Services",
            service: "Website + Social",
            initials: "PP",
            logo: "professional-painting.png",
            logoBg: "light",
          },
          {
            quote: "Loved the new website — clean, fast, and exactly what we pictured.",
            name: "Logan Deel",
            business: "Built by Deel",
            service: "Website",
            initials: "BD",
            logo: "built-by-deel.png",
            logoBg: "dark",
          },
        ],
      },
      work: {
        cases: [
          {
            id: "golden-plumber",
            client: "The Golden Plumber",
            tag: "Case Study",
            sub: "Plumbing · Pensacola, FL",
            logo: "golden-plumber.png",
            logoBg: "light",
            shot: "shot-golden-plumber.webp",
            services: ["Website", "Local SEO", "Reputation"],
            quote:
              '"From page 6 to #1 in most searches in Pensacola — leads come from people who never knew us before."',
            quoteAuthor: "Cade, The Golden Plumber",
            desc: "A fast new website plus local SEO — taking The Golden Plumber from buried on page 6 to ranking #1 for the searches that matter most.",
            stats: [
              { val: "#1", label: "Pensacola Searches" },
              { val: "< 1wk", label: "Launch Time" },
              { val: "3x", label: "More Leads" },
            ],
            linkLabel: "View Live Site",
            clientLabel: "Satisfied Client",
            url: "https://thegoldenplumber.com",
            type: "logo",
            hasVideo: !0,
          },
          {
            id: "pro-painting",
            client: "Professional Painting Services",
            tag: "Case Study",
            sub: "Painting · Pensacola, FL",
            logo: "professional-painting.png",
            logoBg: "light",
            shot: "shot-pro-painting.webp",
            services: ["Website", "Facebook Management"],
            quote: '"A clean, professional website and they handle our Facebook for us. Great work."',
            quoteAuthor: "Owner, Professional Painting Services",
            desc: "A custom website plus 3 managed Facebook posts a week — clean, professional, and consistently active online.",
            stats: [
              { val: "3/wk", label: "Facebook Posts" },
              { val: "< 1wk", label: "Launch Time" },
            ],
            linkLabel: "View Live Site",
            clientLabel: "Satisfied Client",
            url: "https://professionalpaintingpcola.com",
            type: "logo",
          },
          {
            id: "built-by-deel",
            client: "Built by Deel",
            tag: "Case Study",
            sub: "Construction · Pensacola, FL",
            logo: "built-by-deel.png",
            logoBg: "dark",
            shot: "shot-built-by-deel.webp",
            services: ["Website", "Local SEO"],
            quote: '"Loved the new website — clean, fast, and exactly what we pictured."',
            quoteAuthor: "Logan Deel, Built by Deel",
            desc: "A bold, dark custom website for a Gulf Coast contractor — built to convert and now live.",
            stats: [
              { val: "Custom", label: "Web Design" },
              { val: "Live", label: "Now Launched" },
            ],
            linkLabel: "View Live Site",
            clientLabel: "Satisfied Client",
            url: "builtbydeel.com",
            type: "logo",
          },
        ],
      },
      included: {
        title: "Everything You Get",
        sub: "No lock-in contracts. You own everything we build.",
        columns: [
          {
            name: "Website",
            tagline: "Built to convert",
            featured: !1,
            badge: null,
            items: [
              "Custom mobile-first design",
              "Copywriting & on-page SEO",
              "Lightning-fast hosting setup",
              "Google Business Profile",
              "~1-week launch · 30-day revisions",
            ],
          },
          {
            name: "Local SEO",
            tagline: "Get found on Google",
            featured: !0,
            badge: "Most Requested",
            items: [
              "Keyword & competitor research",
              "Google Business optimization",
              "Map-pack & local rankings",
              "Technical + on-page fixes",
              "Monthly ranking reports",
            ],
          },
          {
            name: "Ads + Social",
            tagline: "Stay top of mind",
            featured: !1,
            badge: null,
            items: [
              "Google · Meta · TikTok ads",
              "3 branded posts / week",
              "Design, captions & scheduling",
              "Comment & DM management",
              "Review requests & replies",
            ],
          },
        ],
      },
      process: {
        title: "How It Works",
        steps: [
          {
            num: "01",
            title: "Discovery",
            badge: "Day 1",
            desc: "We audit your website, rankings, and socials, then map your growth plan.",
          },
          {
            num: "02",
            title: "Design",
            badge: "Days 2–3",
            desc: "Craft stunning visuals, scripts, and user flows tailored to your brand.",
          },
          {
            num: "03",
            title: "Develop",
            badge: "Days 4–6",
            desc: "Build and configure everything — website, SEO, socials — with full transparency.",
          },
          {
            num: "04",
            title: "Deploy",
            badge: "Day 7",
            desc: "Launch, monitor, and fine-tune until your results exceed expectations.",
          },
        ],
      },
      faq: {
        title: "Common Questions",
        items: [
          {
            q: "How long does it take to launch a website?",
            a: "Most websites go live within a week of kickoff. We handle design, copy, and setup — you just review and approve.",
          },
          {
            q: "How fast does SEO actually work?",
            a: "Local SEO usually shows movement in 30–60 days, with bigger ranking gains over 3–6 months. We send monthly reports so you always see progress.",
          },
          {
            q: "What do you post on our social media?",
            a: "We create and schedule 3 branded posts a week per platform — graphics, captions, and hashtags — and handle comments, DMs, and review replies for you.",
          },
          {
            q: "Do I own my website and accounts?",
            a: "Yes, completely. Your website, domain, Google Business Profile, and social accounts all belong to you. No lock-in contracts.",
          },
          {
            q: "What ad platforms do you run campaigns on?",
            a: "Google Ads, Meta (Facebook & Instagram), and TikTok. We recommend the right mix based on your audience and budget.",
          },
        ],
      },
      cta: {
        badge: "Start Today",
        title: "Ready to be the business they find first?",
        sub: "Trusted by real businesses in Pensacola, FL.",
        scarcity: "Only 3 onboarding spots left this month.",
        btn: "Book Free Strategy Call",
        callLabel: "Or call us directly:",
      },
      contact: {
        title: "Book Your Free Strategy Call",
        sub: "15 minutes. No pitch. Real answers about growing your business.",
        promise: "We'll call you within one business day to schedule your free 15-minute call \u2014 and prepare your free website & SEO audit.",
        stepLabels: ["Service", "Your business", "Contact"],
        stepTitles: [
          "What do you need help with?",
          "Tell us about your business",
          "Where should we send your free audit?",
        ],
        next: "Continue",
        backStep: "Back",
        labels: {
          name: "Name",
          email: "Email",
          phone: "Phone Number",
          service: "Service Interest",
          details: "Project Details",
        },
        services: ["Website Design", "Local SEO", "Ads + Social Media", "Everything (Full Growth)"],
        btn: "Request My Free Call",
        phone: "(850) 485-9926",
        back: "Back to Home",
      },
      footer: {
        rights: "© 2026 High Stakes. All rights reserved.",
        privacy: "Privacy Policy",
        terms: "Terms of Service",
      },
    },
  };
content.es = {
  ...content.en,
  nav: { services: "Servicios", work: "Portafolio", process: "Proceso", start: "Empezar" },
};
const RotatingNoun = ({ nouns: e }) => {
    const [t, a] = useState(0);
    return (
      useEffect(() => {
        const t = setInterval(() => a((t) => (t + 1) % e.length), 2400);
        return () => clearInterval(t);
      }, [e.length]),
      React.createElement(
        "span",
        { className: "noun-slot relative inline-block text-left" },
        e.map((n, i) =>
          React.createElement(
            "span",
            { key: "sizer-" + i, className: "invisible block h-0 overflow-hidden", "aria-hidden": "true" },
            n,
          ),
        ),
        React.createElement("span", { key: t, className: "noun-enter block" }, e[t]),
      )
    );
  },
  addRipple = (e) => {
    const t = e.currentTarget,
      a = t.getBoundingClientRect(),
      r = document.createElement("span");
    r.className = "btn-ripple-el";
    const l = 2.4 * Math.max(a.width, a.height);
    ((r.style.cssText = `width:${l}px;height:${l}px;left:${e.clientX - a.left - l / 2}px;top:${e.clientY - a.top - l / 2}px`),
      t.appendChild(r),
      setTimeout(() => r.remove(), 750));
  },
  MagneticButton = ({ children: e, className: t, onClick: a, type: r = "button", style: l }) => {
    const n = useRef(null);
    return (
      useEffect(() => {
        const e = n.current;
        if (!e || !G || window.matchMedia("(pointer:coarse)").matches) return;
        const t = (t) => {
            const a = e.getBoundingClientRect();
            G.to(e, {
              x: 0.28 * (t.clientX - a.left - a.width / 2),
              y: 0.28 * (t.clientY - a.top - a.height / 2),
              duration: 0.25,
              ease: "power2.out",
            });
          },
          a = () => G.to(e, { x: 0, y: 0, duration: 0.6, ease: "elastic.out(1,0.4)" });
        return (
          e.addEventListener("mousemove", t),
          e.addEventListener("mouseleave", a),
          () => {
            (e.removeEventListener("mousemove", t), e.removeEventListener("mouseleave", a));
          }
        );
      }, []),
      React.createElement(
        "button",
        {
          ref: n,
          type: r,
          className: t,
          style: l,
          onClick: (e) => {
            (addRipple(e), a && a(e));
          },
        },
        e,
      )
    );
  },
  ScrambleButton = ({ children: e, className: t, onClick: a }) => {
    const r = "string" == typeof e ? e : "",
      [l, n] = useState(r);
    return React.createElement(
      "button",
      {
        className: t,
        onMouseEnter: () => {
          let e = 0;
          const t = setInterval(() => {
            (n(
              r
                .split("")
                .map((t, a) =>
                  " " === t
                    ? " "
                    : a < Math.floor(e)
                      ? t
                      : "ABCDEFGHIJKLMNOPQRSTUVWXYZ01#@$!"[Math.floor(32 * Math.random())],
                )
                .join(""),
            ),
              (e += 0.45),
              e > r.length + 2 && (n(r), clearInterval(t)));
          }, 30);
        },
        onClick: a,
      },
      l,
    );
  },
  BrowserUrlDemo = () => {
    const e = ["thegoldenplumber.com", "yourbusiness.com", "professionalpaintingpcola.com"],
      [t, a] = useState(0),
      [r, l] = useState("");
    return (
      useEffect(() => {
        const r = e[t];
        let n = 0;
        l("");
        const c = setInterval(() => {
          (n++,
            l(r.slice(0, n)),
            n >= r.length && (clearInterval(c), setTimeout(() => a((t) => (t + 1) % e.length), 2e3)));
        }, 65);
        return () => clearInterval(c);
      }, [t]),
      React.createElement(
        "div",
        { className: "url-demo-card" },
        React.createElement(
          "div",
          { className: "url-demo-bar" },
          React.createElement(
            "div",
            { className: "url-demo-dots" },
            React.createElement("span", null),
            React.createElement("span", null),
            React.createElement("span", null),
          ),
          React.createElement(
            "div",
            { className: "url-demo-address" },
            React.createElement("span", { style: { color: "#28c840", fontSize: "8px" } }, "●"),
            React.createElement("span", { style: { color: "rgba(255,255,255,0.3)" } }, "https://"),
            React.createElement("span", { style: { color: "#D4AF37" } }, r),
            React.createElement("span", { className: "url-cursor" }),
          ),
        ),
        React.createElement(
          "div",
          {
            style: { padding: "12px 14px", display: "flex", flexDirection: "column", gap: "6px" },
            "aria-hidden": "true",
          },
          React.createElement("div", { className: "url-skeleton", style: { width: "75%" } }),
          React.createElement("div", { className: "url-skeleton", style: { width: "55%" } }),
          React.createElement("div", {
            style: {
              height: "32px",
              borderRadius: "8px",
              background: "linear-gradient(90deg,rgba(212,175,55,0.08),transparent)",
              marginTop: "4px",
            },
          }),
          React.createElement(
            "div",
            { style: { display: "grid", gridTemplateColumns: "1fr 1fr", gap: "6px", marginTop: "2px" } },
            React.createElement("div", { className: "url-skeleton", style: { height: "28px" } }),
            React.createElement("div", { className: "url-skeleton", style: { height: "28px" } }),
          ),
        ),
      )
    );
  },
  RevealOnScroll = ({ children: e, delay: t = 0 }) => {
    const [a, r] = useState(!1),
      l = useRef(null);
    return (
      useEffect(() => {
        const e = new IntersectionObserver(
          ([e]) => {
            e.isIntersecting && r(!0);
          },
          { threshold: 0.1 },
        );
        return (
          l.current && e.observe(l.current),
          () => {
            l.current && e.unobserve(l.current);
          }
        );
      }, []),
      React.createElement(
        "div",
        {
          ref: l,
          className:
            "transition-all duration-700 " + (a ? "opacity-100 translate-y-0" : "opacity-0 translate-y-6"),
          style: { transitionDelay: `${t}ms` },
        },
        e,
      )
    );
  },
  ScrambleText = ({ text: e }) => {
    const [t, a] = useState(e);
    return (
      useEffect(() => {
        let t = 0;
        const r = setInterval(() => {
          (a(
            e
              .split("")
              .map((e, a) =>
                " " === e
                  ? " "
                  : a < Math.floor(t)
                    ? e
                    : "ABCDEFGHIJKLMNOPQRSTUVWXYZ01#@$!"[Math.floor(32 * Math.random())],
              )
              .join(""),
          ),
            (t += 0.5),
            t > e.length + 2 && (a(e), clearInterval(r)));
        }, 35);
        return () => clearInterval(r);
      }, [e]),
      React.createElement("span", null, t)
    );
  },
  SeoRankWidget = () => {
    const [e, t] = useState(12);
    return (
      useEffect(() => {
        let e = 12;
        const a = setInterval(() => {
          ((e = e > 1 ? e - 1 : 12), t(e));
        }, 650);
        return () => clearInterval(a);
      }, []),
      React.createElement(
        "div",
        { className: "space-y-4" },
        React.createElement(
          "div",
          { className: "flex items-end justify-between" },
          React.createElement(
            "div",
            null,
            React.createElement(
              "div",
              { className: "text-[9px] uppercase tracking-[0.2em] text-muted font-bold mb-1" },
              "Tracked keyword",
            ),
            React.createElement(
              "div",
              { className: "text-xs font-semibold text-heading" },
              "metal roof install",
            ),
          ),
          React.createElement(
            "div",
            { className: "text-right" },
            React.createElement(
              "div",
              {
                className: "text-[9px] uppercase tracking-widest text-gold-600 dark:text-gold-400 font-bold",
              },
              "Google rank",
            ),
            React.createElement(
              "div",
              { className: "font-serif text-2xl font-bold text-heading tabular-nums" },
              "#",
              e,
            ),
          ),
        ),
        React.createElement(
          "div",
          {
            className: "flex items-end gap-1.5 h-14",
            role: "img",
            "aria-label": "Search ranking trend climbing",
          },
          [30, 42, 38, 55, 64, 78, 92].map((e, t) =>
            React.createElement(
              "div",
              {
                key: t,
                className: "flex-1 rounded-t bg-gray-100 dark:bg-white/5 relative overflow-hidden",
                style: { height: "100%" },
              },
              React.createElement("div", {
                className:
                  "absolute bottom-0 left-0 w-full rounded-t bg-gradient-to-t from-gold-600 to-gold-400 transition-all duration-700",
                style: { height: `${e}%` },
              }),
            ),
          ),
        ),
        React.createElement(
          "div",
          { className: "space-y-2 pt-1" },
          [
            { kw: "roofing pensacola", pos: 1, delta: "+11" },
            { kw: "roof repair near me", pos: 3, delta: "+8" },
          ].map((e, t) =>
            React.createElement(
              "div",
              { key: t, className: "flex items-center justify-between text-[11px]" },
              React.createElement("span", { className: "text-body truncate pr-2" }, e.kw),
              React.createElement(
                "span",
                { className: "flex items-center gap-2 flex-shrink-0" },
                React.createElement("span", { className: "text-heading font-semibold" }, "#", e.pos),
                React.createElement(
                  "span",
                  {
                    className:
                      "inline-flex items-center gap-0.5 text-green-600 dark:text-green-400 font-bold",
                  },
                  React.createElement(TrendingUp, { className: "w-3 h-3" }),
                  e.delta,
                ),
              ),
            ),
          ),
        ),
      )
    );
  },
  SocialPostsWidget = () => {
    const e = [
        { day: "Mon", plat: "IG", text: "Before & after reel" },
        { day: "Wed", plat: "FB", text: "5-star review spotlight" },
        { day: "Fri", plat: "TT", text: "Quick how-to tip" },
      ],
      [t, a] = useState(0);
    useEffect(() => {
      const t = setInterval(() => a((t) => (t + 1) % (e.length + 1)), 1400);
      return () => clearInterval(t);
    }, []);
    const r = { IG: "text-pink-500", FB: "text-blue-500", TT: "text-heading" };
    return React.createElement(
      "div",
      { className: "space-y-2.5" },
      e.map((e, a) => {
        const l = a < t;
        return React.createElement(
          "div",
          {
            key: a,
            className:
              "flex items-center gap-3 p-2.5 rounded-xl border border-black/5 dark:border-white/5 bg-white/50 dark:bg-white/[0.03]",
          },
          React.createElement(
            "div",
            {
              className:
                "w-9 h-9 rounded-lg bg-gold-500/10 border border-gold-500/15 flex flex-col items-center justify-center flex-shrink-0",
            },
            React.createElement(
              "span",
              { className: "text-[8px] uppercase tracking-wider text-muted font-bold leading-none" },
              e.day,
            ),
            React.createElement(
              "span",
              { className: `text-[10px] font-extrabold leading-tight ${r[e.plat] || "text-heading"}` },
              e.plat,
            ),
          ),
          React.createElement("span", { className: "text-[11px] text-body flex-1 truncate" }, e.text),
          React.createElement(
            "span",
            {
              className:
                "text-[8px] font-bold uppercase tracking-wider px-2 py-1 rounded-full flex items-center gap-1 transition-all duration-500 flex-shrink-0 " +
                (l
                  ? "bg-green-500/10 text-green-600 dark:text-green-400 border border-green-500/20"
                  : "bg-gold-500/10 text-gold-600 dark:text-gold-400 border border-gold-500/15"),
            },
            l
              ? React.createElement(
                  React.Fragment,
                  null,
                  React.createElement(Check, { className: "w-2.5 h-2.5" }),
                  "Posted",
                )
              : "Scheduled",
          ),
        );
      }),
    );
  },
  SpotlightCard = ({ icon: e, title: t, description: a, bullets: r, className: l = "", wide: n = !1 }) => {
    const c = useRef(null),
      [o, s] = useState({ x: 0, y: 0 });
    return React.createElement(
      "div",
      {
        ref: c,
        onMouseMove: (e) => {
          const t = c.current.getBoundingClientRect();
          s({ x: e.clientX - t.left, y: e.clientY - t.top });
        },
        className: `spotlight-card service-card relative p-8 md:p-10 rounded-[2rem] overflow-hidden group transition-all duration-500 hover:-translate-y-1 ${l}`,
        style: { "--mouse-x": `${o.x}px`, "--mouse-y": `${o.y}px` },
      },
      React.createElement(
        "div",
        { className: "relative z-10" },
        React.createElement(
          "div",
          {
            className:
              "mb-5 p-4 bg-gradient-to-br from-gold-500/10 to-transparent w-fit rounded-2xl text-gold-600 dark:text-gold-500 group-hover:scale-110 transition-all duration-500 border border-gold-500/10 shadow-xl shadow-gold-500/5",
          },
          e,
        ),
        React.createElement(
          "h3",
          {
            className:
              "text-xl md:text-2xl font-serif font-bold text-heading mb-3 group-hover:text-gold-600 dark:group-hover:text-gold-500 transition-colors tracking-tight",
          },
          t,
        ),
        React.createElement(
          "p",
          { className: "text-sm md:text-base text-body leading-relaxed mb-5 " + (n ? "max-w-2xl" : "") },
          a,
        ),
        React.createElement(
          "ul",
          { className: n ? "grid sm:grid-cols-3 gap-x-8 gap-y-2" : "space-y-1.5" },
          r.map((e, t) =>
            React.createElement(
              "li",
              { key: t, className: "flex items-center gap-2 text-xs text-muted font-medium" },
              React.createElement("span", {
                className: "w-1 h-1 rounded-full bg-gold-500 flex-shrink-0",
                "aria-hidden": "true",
              }),
              e,
            ),
          ),
        ),
      ),
    );
  },
  MarqueeTicker = ({ items: e }) => {
    const t = [...e, ...e];
    return React.createElement(
      "div",
      {
        className:
          "marquee-wrapper py-4 border-y border-black/5 dark:border-white/5 bg-white/30 dark:bg-black/10",
      },
      React.createElement(
        "div",
        { className: "marquee-track" },
        t.map((e, t) =>
          React.createElement(
            "div",
            { key: t, className: "marquee-item" },
            React.createElement("span", {
              className: "w-1 h-1 rounded-full bg-gold-500 inline-block flex-shrink-0",
              "aria-hidden": "true",
            }),
            React.createElement(
              "span",
              { className: "text-[11px] font-bold uppercase tracking-[0.18em] text-muted" },
              e,
            ),
          ),
        ),
      ),
    );
  },
  NumberFlip = ({ value: e, suffix: t = "" }) => {
    const a = useRef(null),
      [r, l] = useState("--");
    return (
      useEffect(() => {
        if (!ST || !a.current) return;
        let t;
        const r = ST.create({
          trigger: a.current,
          start: "top 88%",
          once: !0,
          onEnter: () => {
            const a = String(e);
            let r = 0;
            t = setInterval(() => {
              r++;
              const e = Math.floor((r / 26) * a.length * 1.4);
              (l(
                a
                  .split("")
                  .map((t, a) =>
                    "<" === t || "%" === t || "x" === t || a < e
                      ? t
                      : "0123456789"[Math.floor(10 * Math.random())],
                  )
                  .join(""),
              ),
                r >= 26 && (l(a), clearInterval(t)));
            }, 52);
          },
        });
        return () => {
          (r.kill(), clearInterval(t));
        };
      }, [e]),
      React.createElement("span", { ref: a }, r, t)
    );
  },
  TrustBar = ({ items: e }) =>
    React.createElement(
      "section",
      {
        "aria-label": "Social proof statistics",
        className:
          "relative z-10 py-14 border-y border-black/5 dark:border-white/5 bg-white/40 dark:bg-black/20 backdrop-blur-sm",
      },
      React.createElement(
        "div",
        { className: "max-w-7xl mx-auto px-6" },
        React.createElement(
          "div",
          { className: "grid grid-cols-3 gap-8 text-center max-w-2xl mx-auto" },
          e.map((e, t) =>
            React.createElement(
              "div",
              { key: t, className: "flex flex-col items-center gap-1" },
              React.createElement(
                "span",
                {
                  className:
                    "text-3xl md:text-4xl font-serif font-bold text-transparent bg-clip-text bg-gradient-to-r from-gold-500 to-gold-600 dark:from-gold-400 dark:to-gold-500",
                },
                React.createElement(NumberFlip, { value: e.stat, suffix: e.suffix }),
              ),
              React.createElement(
                "span",
                { className: "text-[10px] uppercase tracking-[0.2em] font-bold text-muted" },
                e.label,
              ),
            ),
          ),
        ),
      ),
    ),
  REEL_CELL = 116,
  REEL_GAP = 10,
  REEL_STEP = 378,
  REEL_EXIT_MS = 240,
  REEL_SLIDE_MS = 800,
  REEL_EASE = "cubic-bezier(0.65,0,0.35,1)",
  ReelCell = () =>
    React.createElement(
      "div",
      {
        "aria-hidden": "true",
        className:
          "shrink-0 rounded-2xl border border-black/5 dark:border-white/5 bg-gradient-to-b from-gold-500/[0.07] to-transparent blur-[1px] flex items-center justify-center",
        style: { width: 116, height: 116 },
      },
      React.createElement(
        "span",
        { className: "font-serif font-bold text-3xl text-gold-500/[0.09] select-none" },
        "H",
      ),
    ),
  ReelTile = ({ logo: e, business: t, logoBg: a }) => {
    const [r, l] = useState(!1),
      n = "dark" === a,
      c = e && !r;
    return React.createElement(
      "div",
      {
        className:
          "relative shrink-0 overflow-hidden rounded-2xl flex items-center justify-center border border-gold-500/20",
        style: {
          width: 116,
          height: 116,
          background: c
            ? n
              ? "#0e0e0e"
              : "#ffffff"
            : "linear-gradient(160deg, rgba(212,175,55,0.20), rgba(212,175,55,0.04))",
          boxShadow: "0 22px 44px -14px rgba(0,0,0,0.5), inset 0 1px 0 rgba(255,255,255,0.18)",
        },
      },
      c
        ? React.createElement("img", {
            src: e,
            alt: t,
            loading: "lazy",
            onError: () => l(!0),
            className: "max-h-[64%] max-w-[78%] object-contain",
          })
        : React.createElement(
            "span",
            {
              className:
                "px-2 text-center font-serif font-bold text-gold-700 dark:text-gold-300 leading-tight",
              style: { fontSize: 13 },
            },
            t,
          ),
      React.createElement("div", {
        "aria-hidden": "true",
        className: "pointer-events-none absolute inset-0",
        style: {
          background:
            c && n
              ? "linear-gradient(135deg, rgba(255,255,255,0.06), transparent 55%)"
              : "linear-gradient(135deg, rgba(255,255,255,0.18), transparent 55%)",
        },
      }),
    );
  },
  ReelChars = ({ text: e, startIndex: t, staggerMs: a }) => {
    const r = String(e).split(" "),
      l = [];
    let n = t;
    return (
      r.forEach((e, t) => {
        const c = Array.from(e).map((e, r) => {
          const l = n * a;
          return (
            n++,
            React.createElement(
              "span",
              { key: `c${t}-${r}`, className: "scroll-reel-char", style: { animationDelay: `${l}ms` } },
              e,
            )
          );
        });
        (l.push(
          React.createElement("span", { key: `w${t}`, className: "inline-block whitespace-nowrap" }, c),
        ),
          t < r.length - 1 && (n++, l.push(React.createElement("span", { key: `s${t}` }, " "))));
      }),
      React.createElement(React.Fragment, null, l)
    );
  },
  TestimonialsSection = ({ data: e }) => {
    const t = e.items,
      a = t.length,
      [r, l] = useState(0),
      [n, c] = useState(0),
      [o, s] = useState(!1),
      [i, d] = useState(!1),
      m = useRef(!1),
      u = useRef([]),
      g = useRef(1),
      p = useRef(0),
      h = useRef(!1);
    (useEffect(() => {
      p.current = r;
    }, [r]),
      useEffect(() => {
        const e = requestAnimationFrame(() => requestAnimationFrame(() => d(!0)));
        return () => {
          (cancelAnimationFrame(e), u.current.forEach(clearTimeout));
        };
      }, []));
    const x = useCallback(
      (e) => {
        m.current ||
          e < 0 ||
          e >= a ||
          e === p.current ||
          ((m.current = !0),
          l(e),
          s(!0),
          u.current.push(
            setTimeout(() => {
              (c(e), s(!1));
            }, 240),
          ),
          u.current.push(
            setTimeout(() => {
              m.current = !1;
            }, 800),
          ));
      },
      [a],
    );
    useEffect(() => {
      if (a <= 1) return;
      const e = setInterval(() => {
        if (h.current || m.current) return;
        let e = g.current;
        const t = p.current;
        ((t + e < 0 || t + e > a - 1) && ((e = -e), (g.current = e)), x(t + e));
      }, 4200);
      return () => clearInterval(e);
    }, [a, x]);
    const b = 378 * ((a - 1) / 2 - r),
      f = -b,
      E = 4 + 2 * a,
      v = [];
    for (let e = 0; e < 3; e++) v.push({ type: "cell" });
    t.forEach((e, t) => {
      (v.push({ type: "tile", i: t }), t < a - 1 && v.push({ type: "cell" }, { type: "cell" }));
    });
    for (let e = 0; e < 3; e++) v.push({ type: "cell" });
    const R = (e) => ({
        transform: `translateY(${e}px)`,
        transition: i ? `transform 800ms ${REEL_EASE}` : "none",
      }),
      w = t[n],
      y =
        "linear-gradient(to right, transparent 0%, black 14%, black 86%, transparent 100%), linear-gradient(to bottom, transparent 0%, black 10%, black 90%, transparent 100%)";
    return React.createElement(
      "section",
      {
        className:
          "relative z-10 py-24 border-t border-black/5 dark:border-white/5 section-alt overflow-hidden",
      },
      React.createElement(
        "div",
        { className: "max-w-6xl mx-auto px-6" },
        React.createElement(
          RevealOnScroll,
          null,
          React.createElement(
            "div",
            { className: "text-center mb-12" },
            React.createElement(
              "h2",
              { className: "font-serif text-4xl md:text-5xl font-bold text-heading tracking-tight mb-3" },
              e.title,
            ),
            React.createElement("div", {
              className: "h-1.5 w-20 bg-gradient-to-r from-gold-500 to-transparent rounded-full mx-auto",
            }),
          ),
        ),
        React.createElement(
          RevealOnScroll,
          null,
          React.createElement(FeaturedVideo, {
            src: CADE_VIDEO,
            logo: "golden-plumber.png",
            name: "Cade \u00b7 The Golden Plumber",
            sub: "How our SEO brings him new customers",
          }),
        ),
        React.createElement(
          "div",
          {
            onMouseEnter: () => {
              h.current = !0;
            },
            onMouseLeave: () => {
              h.current = !1;
            },
            className:
              "relative mx-auto flex w-full max-w-[1000px] flex-col items-stretch gap-2.5 overflow-hidden rounded-[2rem] border border-black/5 dark:border-white/10 card-bg shadow-2xl md:min-h-[340px] md:flex-row",
          },
          React.createElement(
            "div",
            {
              "aria-hidden": "true",
              className: "relative h-56 w-full shrink-0 self-stretch overflow-hidden md:h-auto md:w-[360px]",
              style: {
                WebkitMaskImage: y,
                maskImage: y,
                WebkitMaskComposite: "source-in",
                maskComposite: "intersect",
              },
            },
            React.createElement(
              "div",
              { className: "absolute inset-0 flex items-center justify-center gap-2.5" },
              React.createElement(
                "div",
                { className: "flex shrink-0 flex-col gap-2.5 will-change-transform", style: R(f) },
                Array.from({ length: E }).map((e, t) => React.createElement(ReelCell, { key: t })),
              ),
              React.createElement(
                "div",
                { className: "flex shrink-0 flex-col gap-2.5 will-change-transform", style: R(b) },
                v.map((e, a) =>
                  "tile" === e.type
                    ? React.createElement(ReelTile, {
                        key: a,
                        logo: t[e.i].logo,
                        business: t[e.i].business,
                        logoBg: t[e.i].logoBg,
                      })
                    : React.createElement(ReelCell, { key: a }),
                ),
              ),
              React.createElement(
                "div",
                { className: "flex shrink-0 flex-col gap-2.5 will-change-transform", style: R(f) },
                Array.from({ length: E }).map((e, t) => React.createElement(ReelCell, { key: t })),
              ),
            ),
          ),
          React.createElement(
            "div",
            { className: "flex min-w-0 flex-1 flex-col justify-between self-stretch px-6 py-8 md:py-10" },
            React.createElement(
              "div",
              { className: "flex flex-col gap-3" },
              React.createElement(Quote, { className: "w-10 h-10 text-gold-500/40" }),
              React.createElement(
                "div",
                { className: "relative w-full max-w-[440px] overflow-hidden", "aria-live": "polite" },
                React.createElement(
                  "div",
                  { "aria-hidden": "true", className: "invisible flex min-h-[120px] flex-col gap-4" },
                  React.createElement(
                    "p",
                    { className: "m-0 font-serif italic text-lg sm:text-xl leading-snug text-heading" },
                    '"',
                    w.quote,
                    '"',
                  ),
                  React.createElement(
                    "p",
                    { className: "m-0 text-sm font-semibold text-muted" },
                    w.name,
                    " · ",
                    w.business,
                  ),
                ),
                React.createElement(
                  "div",
                  {
                    key: n,
                    className:
                      "absolute inset-x-0 top-0 flex flex-col gap-4 will-change-[transform,opacity] " +
                      (o ? "scroll-reel-exit" : ""),
                  },
                  React.createElement(
                    "p",
                    { className: "m-0 font-serif italic text-lg sm:text-xl leading-snug text-heading" },
                    React.createElement(ReelChars, {
                      text: "“" + w.quote + "”",
                      startIndex: 0,
                      staggerMs: 6,
                    }),
                  ),
                  React.createElement(
                    "p",
                    { className: "m-0 text-sm font-semibold text-gold-600 dark:text-gold-400" },
                    React.createElement(ReelChars, {
                      text: `${w.name} · ${w.business}`,
                      startIndex: w.quote.length + 4,
                      staggerMs: 6,
                    }),
                  ),
                ),
              ),
              React.createElement(
                "div",
                { className: "flex items-center gap-1.5 mt-1" },
                [...Array(5)].map((e, t) =>
                  React.createElement(StarFilled, { key: t, className: "w-3.5 h-3.5 text-gold-500" }),
                ),
              ),
            ),
            React.createElement(
              "div",
              { className: "mt-7 flex items-center gap-2" },
              t.map((e, t) =>
                React.createElement("button", {
                  key: t,
                  onClick: () => x(t),
                  "aria-label": `Go to testimonial ${t + 1}`,
                  className: "test-dot " + (t === r ? "active" : ""),
                }),
              ),
            ),
          ),
        ),
      ),
    );
  },
  WhatsIncludedSection = ({ data: e, onBook: t }) => {
    const [a, r] = useState({});
    return React.createElement(
      "section",
      { id: "included", className: "relative z-10 py-32 px-6 border-t border-black/5 dark:border-white/5" },
      React.createElement(
        "div",
        { className: "max-w-7xl mx-auto" },
        React.createElement(
          RevealOnScroll,
          null,
          React.createElement(
            "div",
            { className: "text-center mb-16" },
            React.createElement(
              "h2",
              { className: "font-serif text-4xl md:text-6xl font-bold text-heading tracking-tight mb-4" },
              e.title,
            ),
            React.createElement("p", { className: "text-body text-lg font-light max-w-xl mx-auto" }, e.sub),
            React.createElement("div", {
              className: "h-1.5 w-24 bg-gradient-to-r from-gold-500 to-transparent rounded-full mx-auto mt-6",
            }),
          ),
        ),
        React.createElement(
          "div",
          { className: "grid grid-cols-1 md:grid-cols-3 gap-6" },
          e.columns.map((e, l) =>
            React.createElement(
              RevealOnScroll,
              { key: l, delay: 120 * l },
              React.createElement(
                "div",
                {
                  className: "pricing-card h-full flex flex-col " + (e.featured ? "featured" : ""),
                  onMouseMove: (e) => {
                    const t = e.currentTarget.getBoundingClientRect();
                    r((a) => ({ ...a, [l]: { x: e.clientX - t.left, y: e.clientY - t.top } }));
                  },
                  style: a[l] ? { "--mouse-x": `${a[l].x}px`, "--mouse-y": `${a[l].y}px` } : {},
                },
                e.badge &&
                  React.createElement(
                    "div",
                    {
                      className:
                        "absolute top-0 left-1/2 -translate-x-1/2 -translate-y-1/2 px-4 py-1.5 bg-gradient-to-r from-gold-500 to-gold-600 rounded-full text-[10px] font-bold uppercase tracking-widest text-white shadow-lg shadow-gold-500/30 whitespace-nowrap",
                    },
                    e.badge,
                  ),
                React.createElement(
                  "div",
                  { className: "mb-8" },
                  React.createElement(
                    "p",
                    {
                      className:
                        "text-[10px] font-bold uppercase tracking-[0.2em] text-gold-600 dark:text-gold-400 mb-2",
                    },
                    e.tagline,
                  ),
                  React.createElement(
                    "h3",
                    { className: "font-serif text-2xl font-bold text-heading tracking-tight" },
                    e.name,
                  ),
                ),
                React.createElement(
                  "ul",
                  { className: "space-y-3 flex-1 mb-8" },
                  e.items.map((e, t) =>
                    React.createElement(
                      "li",
                      { key: t, className: "flex items-start gap-3 text-sm text-body" },
                      React.createElement(
                        "span",
                        {
                          className:
                            "w-5 h-5 rounded-full bg-gold-500/10 border border-gold-500/20 flex items-center justify-center flex-shrink-0 mt-0.5",
                        },
                        React.createElement(Check, { className: "w-3 h-3 text-gold-500" }),
                      ),
                      e,
                    ),
                  ),
                ),
                React.createElement(
                  "button",
                  {
                    onClick: t,
                    className:
                      "w-full py-4 rounded-xl font-bold text-xs uppercase tracking-[0.15em] transition-all duration-300 cursor-pointer " +
                      (e.featured
                        ? "bg-gradient-to-r from-gold-500 to-gold-600 hover:from-gold-400 hover:to-gold-500 text-white shadow-[0_8px_30px_rgba(212,175,55,0.3)] hover:shadow-[0_12px_40px_rgba(212,175,55,0.4)] hover:-translate-y-0.5"
                        : "border border-gray-300 dark:border-white/10 text-heading hover:border-gold-500 hover:text-gold-600 dark:hover:text-gold-400 bg-transparent"),
                  },
                  "Get a Free Quote",
                ),
              ),
            ),
          ),
        ),
        React.createElement(
          RevealOnScroll,
          { delay: 400 },
          React.createElement(
            "p",
            { className: "text-center text-xs text-muted mt-10" },
            "Mix and match or bundle all three. Every engagement includes onboarding, 30-day revisions, and full ownership — no lock-in contracts.",
          ),
        ),
      ),
    );
  },
  VideoPlayer = ({ src: e, logoSrc: t, logoAlt: a, clientLabel: r, clientName: l }) => {
    const n = useRef(null),
      c = useRef(null),
      [o, s] = useState(!1),
      [i, d] = useState(!0);
    return (
      useEffect(() => {
        const e = n.current;
        if (!e) return;
        const t = new IntersectionObserver(
          ([t]) => {
            t.isIntersecting && t.intersectionRatio >= 0.5
              ? ((e.muted = !1),
                e.play().catch(() => {
                  ((e.muted = !0), s(!0), e.play().catch(() => {}));
                }),
                d(!1))
              : (e.pause(), d(!0));
          },
          { threshold: 0.5 },
        );
        return (t.observe(c.current), () => t.disconnect());
      }, []),
      React.createElement(
        "div",
        null,
        React.createElement(
          "div",
          {
            ref: c,
            className:
              "w-full aspect-video rounded-2xl overflow-hidden bg-black shadow-2xl border border-white/10 relative group/vid portfolio-zoom-wrap",
          },
          React.createElement("video", {
            ref: n,
            src: e,
            className: "w-full h-full object-contain bg-black portfolio-zoom-img",
            loop: !0,
            playsInline: !0,
            "aria-label": "Case study video",
          }),
          React.createElement(
            "div",
            { className: "absolute bottom-3 right-3 z-20 flex gap-2" },
            React.createElement(
              "button",
              {
                onClick: (e) => {
                  e.stopPropagation();
                  const t = n.current;
                  t && (t.paused ? (t.play().catch(() => {}), d(!1)) : (t.pause(), d(!0)));
                },
                className:
                  "w-8 h-8 rounded-full bg-black/70 backdrop-blur-md flex items-center justify-center border border-white/20 opacity-60 group-hover/vid:opacity-100 transition-all hover:scale-110 cursor-pointer",
                "aria-label": i ? "Play" : "Pause",
              },
              i
                ? React.createElement(PlayIcon, { className: "w-3 h-3 text-white ml-0.5" })
                : React.createElement(PauseIcon, { className: "w-3 h-3 text-white" }),
            ),
            React.createElement(
              "button",
              {
                onClick: (e) => {
                  e.stopPropagation();
                  const t = n.current;
                  t && ((t.muted = !t.muted), s(t.muted));
                },
                className:
                  "w-8 h-8 rounded-full bg-black/70 backdrop-blur-md flex items-center justify-center border border-white/20 opacity-60 group-hover/vid:opacity-100 transition-all hover:scale-110 cursor-pointer",
                "aria-label": o ? "Unmute" : "Mute",
              },
              o
                ? React.createElement(VolumeX, { className: "w-3 h-3 text-white" })
                : React.createElement(Volume2, { className: "w-3 h-3 text-white" }),
            ),
          ),
        ),
        React.createElement(
          "div",
          { className: "flex items-center gap-3 mt-4 px-1" },
          React.createElement("img", {
            src: t,
            alt: a,
            className:
              "w-10 h-10 rounded-full object-cover border-2 border-gold-300 dark:border-gold-500/30 flex-shrink-0",
            loading: "lazy",
          }),
          React.createElement(
            "div",
            null,
            React.createElement(
              "div",
              {
                className: "text-[9px] text-gold-600 dark:text-gold-500 uppercase font-bold tracking-widest",
              },
              r,
            ),
            React.createElement(
              "div",
              { className: "text-heading font-serif font-bold text-sm leading-tight" },
              l,
            ),
          ),
        ),
      )
    );
  },
  FAQ = ({ data: e }) => {
    const [t, a] = useState(null);
    return React.createElement(
      "section",
      { className: "py-32 relative z-10 border-t border-black/5 dark:border-white/5" },
      React.createElement(
        "div",
        { className: "max-w-3xl mx-auto px-6" },
        React.createElement(
          RevealOnScroll,
          null,
          React.createElement(
            "h2",
            {
              className:
                "font-serif text-4xl sm:text-5xl font-bold text-heading mb-4 tracking-tight text-center",
            },
            e.title,
          ),
          React.createElement("div", {
            className: "h-1.5 w-20 bg-gradient-to-r from-gold-500 to-transparent rounded-full mx-auto mb-14",
          }),
        ),
        React.createElement(
          "div",
          { className: "space-y-3" },
          e.items.map((e, r) =>
            React.createElement(
              RevealOnScroll,
              { key: r, delay: 70 * r },
              React.createElement(
                "div",
                {
                  className:
                    "card-bg rounded-2xl overflow-hidden shadow-sm hover:shadow-md transition-shadow",
                },
                React.createElement(
                  "button",
                  {
                    className:
                      "w-full flex items-center justify-between px-6 py-5 text-left cursor-pointer group",
                    onClick: () => a(t === r ? null : r),
                    "aria-expanded": t === r,
                  },
                  React.createElement(
                    "span",
                    {
                      className:
                        "font-semibold text-heading text-sm md:text-base pr-4 group-hover:text-gold-600 dark:group-hover:text-gold-400 transition-colors",
                    },
                    e.q,
                  ),
                  React.createElement(ChevronDown, {
                    className:
                      "w-5 h-5 text-gold-500 flex-shrink-0 transition-transform duration-300 " +
                      (t === r ? "rotate-180" : ""),
                  }),
                ),
                React.createElement(
                  "div",
                  { className: "faq-answer " + (t === r ? "open" : "") },
                  React.createElement("p", { className: "px-6 pb-5 text-body text-sm leading-relaxed" }, e.a),
                ),
              ),
            ),
          ),
        ),
      ),
    );
  },
  PillNav = ({ items: e, onNavigate: t }) => {
    const [a, r] = useState(e[0].id),
      [l, n] = useState(!1),
      c = useRef(null),
      o = useRef({}),
      s = useRef(null);
    return (
      useEffect(() => {
        const e = () => n(window.innerWidth < 640);
        return (e(), window.addEventListener("resize", e), () => window.removeEventListener("resize", e));
      }, []),
      useEffect(() => {
        const e = o.current[a],
          t = c.current,
          r = s.current;
        if (!e || !t || !r) return;
        const l = r.getBoundingClientRect(),
          n = e.getBoundingClientRect(),
          i = n.left - l.left,
          d = n.width;
        G
          ? G.to(t, { left: i, width: d, duration: 0.42, ease: "back.out(1.7)" })
          : ((t.style.left = i + "px"), (t.style.width = d + "px"));
      }, [a]),
      useEffect(() => {
        const t = () => {
          let t = e[0].id;
          (e.forEach((e) => {
            const a = document.getElementById(e.id);
            a && window.scrollY >= a.offsetTop - 260 && (t = e.id);
          }),
            r(t));
        };
        return (
          window.addEventListener("scroll", t, { passive: !0 }),
          () => window.removeEventListener("scroll", t)
        );
      }, [e]),
      useEffect(() => {
        const e = setTimeout(() => {
          const e = o.current[a],
            t = c.current,
            r = s.current;
          if (!e || !t || !r) return;
          const l = r.getBoundingClientRect(),
            n = e.getBoundingClientRect();
          ((t.style.left = n.left - l.left + "px"), (t.style.width = n.width + "px"));
        }, 80);
        return () => clearTimeout(e);
      }, []),
      React.createElement(
        "nav",
        { className: "pill-nav-wrap", "aria-label": "Section navigation" },
        React.createElement(
          "div",
          { ref: s, className: "pill-nav" },
          React.createElement(
            "div",
            { ref: c, className: "pill-lamp", "aria-hidden": "true" },
            React.createElement(
              "div",
              { className: "lamp-beam" },
              React.createElement("div", { className: "lamp-bar" }),
              React.createElement("div", { className: "lamp-glow-a" }),
              React.createElement("div", { className: "lamp-glow-b" }),
              React.createElement("div", { className: "lamp-glow-c" }),
            ),
          ),
          e.map((e) =>
            React.createElement(
              "button",
              {
                key: e.id,
                ref: (t) => {
                  o.current[e.id] = t;
                },
                onClick: () =>
                  ((e) => {
                    (r(e.id), t(e.id));
                  })(e),
                className: "pill-item " + (a === e.id ? "active" : ""),
                "aria-current": a === e.id ? "page" : void 0,
              },
              React.createElement("span", { className: "pill-desktop" }, e.name),
              React.createElement("span", { className: "pill-mobile" }, e.icon),
            ),
          ),
        ),
      )
    );
  },
  CinematicEngine = () => (
    useEffect(() => {
      if (!G || !ST) return;
      if (window.matchMedia("(prefers-reduced-motion:reduce)").matches) return;
      const e = [];
      return (
        document.querySelectorAll(".portfolio-zoom-img").forEach((t) => {
          const a = t.closest(".portfolio-zoom-wrap") || t.parentElement,
            r = G.from(t, {
              scale: 1.08,
              ease: "none",
              scrollTrigger: { trigger: a, start: "top bottom", end: "center 60%", scrub: 1.8 },
            });
          e.push(r);
        }),
        () => {
          e.forEach((e) => {
            try {
              (e.scrollTrigger && e.scrollTrigger.kill(), e.kill());
            } catch (e) {}
          });
        }
      );
    }, []),
    null
  ),
  HeroSection = ({ t: e, navigateTo: t }) => {
    const a = useRef(null);
    return (
      useEffect(() => {
        if (!G) return;
        const e = a.current,
          t = G.context(() => {
            if (
              (G.timeline({ defaults: { ease: "power3.out" } })
                .from(".hero-eyebrow", { opacity: 0, y: 20, duration: 0.7 })
                .from(".hero-title-line1", { opacity: 0, y: 30, duration: 0.6 }, "-=0.4")
                .from(".hero-title-line2", { opacity: 0, y: 30, duration: 0.6 }, "-=0.45")
                .from(".hero-desc", { opacity: 0, y: 16, duration: 0.6 }, "-=0.4")
                .from(".hero-btns", { opacity: 0, y: 12, duration: 0.5 }, "-=0.35")
                .from(".hero-microcopy", { opacity: 0, duration: 0.4 }, "-=0.2")
                .from(".hero-right", { opacity: 0, x: 40, duration: 0.9 }, "-=0.7"),
              ST)
            ) {
              const t = { ease: "none", scrollTrigger: { trigger: e, start: "top top", end: "bottom top" } };
              (G.to(".hero-title-line1", { y: -80, ...t, scrollTrigger: { ...t.scrollTrigger, scrub: 1.8 } }),
                G.to(".hero-title-line2", {
                  y: -55,
                  ...t,
                  scrollTrigger: { ...t.scrollTrigger, scrub: 1.4 },
                }),
                G.to(".hero-desc", { y: -30, ...t, scrollTrigger: { ...t.scrollTrigger, scrub: 1.1 } }),
                G.to(".hero-btns", { y: -18, ...t, scrollTrigger: { ...t.scrollTrigger, scrub: 0.9 } }),
                G.to(".hero-right", { y: -140, ...t, scrollTrigger: { ...t.scrollTrigger, scrub: 1 } }));
            }
          }, e);
        return () => t.revert();
      }, []),
      React.createElement(
        "section",
        {
          id: "main-content",
          ref: a,
          className:
            "relative pt-32 pb-20 md:pt-48 md:pb-32 px-6 min-h-screen flex items-center z-10 overflow-hidden",
        },
        React.createElement(
          "div",
          { className: "max-w-7xl mx-auto w-full grid md:grid-cols-2 items-center gap-10 md:gap-24" },
          React.createElement(
            "div",
            { className: "text-center md:text-left relative z-20 order-2 md:order-1" },
            React.createElement(
              "div",
              {
                className:
                  "hero-eyebrow inline-flex items-center gap-2 mb-8 px-4 py-1.5 rounded-full border border-gold-500/30 bg-gold-500/5 backdrop-blur-md shadow-[0_0_15px_rgba(212,175,55,0.15)]",
              },
              React.createElement("div", {
                className: "w-1.5 h-1.5 rounded-full bg-gold-500 animate-pulse",
                "aria-hidden": "true",
              }),
              React.createElement(
                "span",
                {
                  className:
                    "text-gold-700 dark:text-gold-400 text-[10px] font-bold uppercase tracking-[0.25em] flex items-center gap-1.5",
                },
                "We Grow ",
                React.createElement(RotatingNoun, { nouns: ["Websites", "Rankings", "Audiences"] }),
              ),
            ),
            React.createElement(
              "h1",
              {
                className:
                  "font-serif text-5xl sm:text-6xl md:text-6xl lg:text-7xl font-bold text-heading mb-6 leading-[1.1] tracking-tight",
              },
              React.createElement("span", { className: "hero-title-line1 block" }, e.hero.title1),
              React.createElement(
                "span",
                {
                  className:
                    "hero-title-line2 text-transparent bg-clip-text bg-gradient-to-r from-gold-600 via-gold-500 to-gold-700 dark:from-gold-300 dark:via-gold-100 dark:to-gold-400 bg-[length:200%_auto] animate-gradient-x mt-2 block pb-2",
                },
                e.hero.title2,
              ),
            ),
            React.createElement(
              "p",
              {
                className:
                  "hero-desc text-base md:text-lg text-body mb-10 max-w-lg mx-auto md:mx-0 font-light leading-relaxed",
              },
              e.hero.desc,
            ),
            React.createElement(
              "div",
              {
                className:
                  "hero-btns flex flex-col sm:flex-row items-center justify-center md:justify-start gap-4 mb-3",
              },
              React.createElement(
                MagneticButton,
                {
                  onClick: () => t("contact"),
                  className:
                    "btn-glow btn-shimmer btn-rippable w-full sm:w-auto px-8 py-4 bg-gradient-to-r from-gold-500 to-gold-600 hover:from-gold-400 hover:to-gold-500 text-white font-bold text-xs uppercase tracking-[0.15em] transition-all duration-300 rounded-xl shadow-[0_8px_30px_rgba(212,175,55,0.3)] hover:shadow-[0_12px_40px_rgba(212,175,55,0.4)] hover:-translate-y-1 cursor-pointer",
                },
                e.hero.btn1,
              ),
              React.createElement(
                ScrambleButton,
                {
                  onClick: () => t("work"),
                  className:
                    "w-full sm:w-auto px-8 py-4 border border-gray-300 dark:border-white/10 hover:border-gold-500 hover:text-gold-600 text-gray-700 dark:text-white font-bold text-xs uppercase tracking-[0.15em] transition-all duration-300 rounded-xl backdrop-blur-md bg-white/50 dark:bg-white/5 hover:-translate-y-1 cursor-pointer",
                },
                e.hero.btn2,
              ),
            ),
            React.createElement(
              "p",
              {
                className:
                  "hero-microcopy text-center md:text-left text-[10px] text-muted mb-4 tracking-wide",
              },
              e.hero.microcopy,
            ),
            React.createElement(
              "p",
              { className: "hero-microcopy text-center md:text-left text-xs text-muted mb-6" },
              e.hero.callLabel,
              " ",
              React.createElement(
                "a",
                {
                  href: "tel:8504859926",
                  className: "text-gold-600 dark:text-gold-400 font-semibold hover:underline cursor-pointer",
                },
                "(850) 485-9926",
              ),
            ),
            React.createElement(
              "div",
              { className: "hero-btns flex justify-center md:justify-start" },
              React.createElement(
                "button",
                {
                  onClick: () => t("contact"),
                  className:
                    "btn-arrow-wrap text-gold-600 dark:text-gold-400 hover:text-gold-700 transition-colors text-xs font-bold uppercase tracking-widest cursor-pointer",
                },
                React.createElement(
                  "span",
                  { className: "btn-arrow-text border-b border-gold-500/30 pb-0.5" },
                  e.hero.demoLink,
                ),
                React.createElement(
                  "span",
                  { className: "btn-arrow-icon" },
                  React.createElement(ArrowRight, { className: "w-4 h-4" }),
                ),
              ),
            ),
          ),
          React.createElement(
            "div",
            {
              className:
                "hero-right relative h-[400px] md:h-[600px] hidden sm:flex items-center justify-center order-1 md:order-2",
              "aria-hidden": "true",
            },
            React.createElement("div", {
              className:
                "absolute inset-0 bg-gradient-radial from-gold-500/20 to-transparent blur-[100px] rounded-full mix-blend-screen",
            }),
            React.createElement(
              "div",
              { className: "relative w-full h-full" },
              React.createElement(
                "div",
                {
                  className:
                    "absolute top-[6%] left-[2%] w-[270px] md:w-[300px] bg-white/90 dark:bg-[#0a0a0a]/80 backdrop-blur-md border border-white/50 dark:border-white/10 rounded-[2rem] p-6 shadow-2xl shadow-gold-500/10 animate-orbit-1 overflow-hidden",
                },
                React.createElement("div", {
                  className:
                    "absolute inset-0 bg-gradient-to-tr from-transparent via-gold-500/5 to-transparent pointer-events-none",
                }),
                React.createElement(
                  "div",
                  {
                    className:
                      "flex items-center gap-4 mb-5 border-b border-gray-200/50 dark:border-white/10 pb-4",
                  },
                  React.createElement(
                    "div",
                    {
                      className:
                        "w-10 h-10 rounded-xl bg-gold-50 dark:bg-gold-500/20 flex items-center justify-center border border-gold-200 dark:border-gold-500/30 shadow-inner",
                    },
                    React.createElement(TrendingUp, {
                      className: "w-5 h-5 text-gold-600 dark:text-gold-400",
                    }),
                  ),
                  React.createElement(
                    "div",
                    null,
                    React.createElement("div", { className: "text-sm font-bold text-heading" }, "Local SEO"),
                    React.createElement(
                      "div",
                      { className: "flex items-center gap-1.5 mt-0.5" },
                      React.createElement("span", {
                        className: "w-1.5 h-1.5 rounded-full bg-green-500 animate-pulse",
                      }),
                      React.createElement(
                        "span",
                        { className: "text-[9px] text-muted uppercase tracking-widest font-medium" },
                        "Ranking up",
                      ),
                    ),
                  ),
                ),
                React.createElement(SeoRankWidget, null),
              ),
              React.createElement(
                "div",
                {
                  className: "absolute bottom-[3%] left-[8%] w-[210px] md:w-[250px]",
                  style: { animation: "float 7s ease-in-out infinite", animationDelay: "1s" },
                },
                React.createElement(BrowserUrlDemo, null),
              ),
              React.createElement(
                "div",
                {
                  className:
                    "absolute top-[52%] right-[1%] w-[256px] md:w-[290px] bg-white/90 dark:bg-[#0c0c0c]/90 backdrop-blur-md border border-gray-200/50 dark:border-white/10 rounded-[2rem] p-6 shadow-2xl shadow-gold-500/10",
                  style: { animation: "orbit1 22s ease-in-out infinite reverse" },
                },
                React.createElement(
                  "div",
                  { className: "flex justify-between items-start mb-5" },
                  React.createElement(
                    "div",
                    null,
                    React.createElement(
                      "div",
                      { className: "text-[10px] text-muted uppercase font-bold tracking-[0.2em] mb-1.5" },
                      "Social Media",
                    ),
                    React.createElement(
                      "div",
                      { className: "text-lg font-serif font-bold text-heading flex items-center gap-2" },
                      "This Week",
                      React.createElement(
                        "span",
                        {
                          className:
                            "text-[10px] bg-gold-100 dark:bg-gold-500/20 text-gold-700 dark:text-gold-400 px-2 py-0.5 rounded-full border border-gold-200 dark:border-gold-500/30 font-sans tracking-wide",
                        },
                        "3 posts",
                      ),
                    ),
                  ),
                  React.createElement(
                    "div",
                    {
                      className:
                        "w-10 h-10 rounded-xl bg-gold-50 dark:bg-gold-500/10 flex items-center justify-center border border-gold-200/60 dark:border-gold-500/20",
                    },
                    React.createElement(Calendar, { className: "w-5 h-5 text-gold-600 dark:text-gold-400" }),
                  ),
                ),
                React.createElement(SocialPostsWidget, null),
              ),
            ),
          ),
        ),
      )
    );
  },
  ServicesSection = ({ t: e }) => {
    const t = useRef(null);
    useEffect(() => {
      if (!G || !ST) return;
      const e = G.context(() => {
        ST.batch(".service-card", {
          onEnter: (e) => G.from(e, { opacity: 0, y: 40, stagger: 0.12, duration: 0.8, ease: "power3.out" }),
          start: "top 85%",
          once: !0,
        });
      }, t);
      return () => e.revert();
    }, []);
    const a = e.services.items;
    return React.createElement(
      "section",
      {
        id: "services",
        ref: t,
        className:
          "py-32 relative z-10 border-t border-black/5 dark:border-white/5 section-alt backdrop-blur-sm",
      },
      React.createElement(
        "div",
        { className: "max-w-7xl mx-auto px-6" },
        React.createElement(
          RevealOnScroll,
          null,
          React.createElement(
            "div",
            { className: "flex flex-col md:flex-row justify-between items-start md:items-end mb-20 gap-6" },
            React.createElement(
              "div",
              null,
              React.createElement(
                "h2",
                {
                  className:
                    "font-serif text-4xl sm:text-5xl md:text-6xl font-bold text-heading mb-6 tracking-tight",
                },
                e.services.title,
              ),
              React.createElement("div", {
                className: "h-1.5 w-24 bg-gradient-to-r from-gold-500 to-transparent rounded-full",
              }),
            ),
            React.createElement(
              "p",
              { className: "text-body max-w-md text-left md:text-right font-light text-lg" },
              e.services.subtitle,
            ),
          ),
        ),
        React.createElement(
          "div",
          { className: "grid grid-cols-1 md:grid-cols-5 gap-6" },
          React.createElement(
            "div",
            { className: "md:col-span-3" },
            React.createElement(SpotlightCard, {
              icon: React.createElement(Globe, { className: "w-7 h-7" }),
              title: a[0].title,
              description: a[0].desc,
              bullets: a[0].bullets,
              className: "h-full border-gold-500/20 dark:border-gold-500/10",
            }),
          ),
          React.createElement(
            "div",
            { className: "md:col-span-2" },
            React.createElement(SpotlightCard, {
              icon: React.createElement(TrendingUp, { className: "w-6 h-6" }),
              title: a[1].title,
              description: a[1].desc,
              bullets: a[1].bullets,
              className: "h-full",
            }),
          ),
          React.createElement(
            "div",
            { className: "md:col-span-5" },
            React.createElement(SpotlightCard, {
              icon: React.createElement(Megaphone, { className: "w-6 h-6" }),
              title: a[2].title,
              description: a[2].desc,
              bullets: a[2].bullets,
              className: "h-full",
              wide: !0,
            }),
          ),
        ),
      ),
    );
  },
  PortfolioSection = ({ t: e, navigateTo: t }) => {
    const a = useRef(null),
      r = useRef(null),
      l = useRef(null),
      [n, c] = useState(0),
      [o, s] = useState(""),
      [i, d] = useState({}),
      m = (e) => e.replace(/^https?:\/\//, ""),
      u = [
        ...e.work.cases,
        {
          id: "yours",
          client: "Your Business",
          tag: "Next Client",
          sub: "Pensacola, FL",
          url: "yourbusiness.com",
          isCta: !0,
          services: ["Custom Website", "Local SEO", "Social Media"],
          desc: "Ready to see your business here? We'll build you a high-converting website, rank you on Google, and keep your socials active — launching in a week or less.",
          stats: [
            { val: "< 1wk", label: "Launch Time" },
            { val: "100%", label: "You Own It" },
          ],
          quote:
            '"The best time to invest in your online presence was yesterday. The second best time is right now."',
          quoteAuthor: "Next, You",
        },
      ];
    return (
      useEffect(() => {
        s(m(u[0].url));
      }, []),
      React.useLayoutEffect(() => {
        if (!(G && ST && a.current && r.current && l.current)) return;
        if (window.innerWidth < 768) return;
        const e = a.current,
          t = r.current,
          n = l.current;
        let o = 0,
          i = 1,
          d = -1;
        const g = () => {
            ((o = Math.max(0, t.scrollWidth - n.clientWidth)), (i = t.scrollWidth / u.length));
          },
          p = G.context(() => {
            (g(),
              G.to(t, {
                x: () => -o,
                ease: "none",
                scrollTrigger: {
                  trigger: e,
                  pin: !0,
                  scrub: 1,
                  anticipatePin: 1,
                  end: () => "+=" + o,
                  invalidateOnRefresh: !0,
                  onRefresh: g,
                  onUpdate: (e) => {
                    if (!o) return;
                    const t = e.progress * o,
                      a = Math.min(Math.floor((t + 0.38 * i) / i), u.length - 1);
                    a !== d && ((d = a), c(a), s(m(u[a].url)));
                  },
                },
              }));
          });
        return () => p.revert();
      }, []),
      React.createElement(
        "section",
        { id: "work", ref: a, className: "horiz-section" },
        React.createElement(
          "div",
          { className: "horiz-header" },
          React.createElement(
            "div",
            {
              className:
                "inline-flex items-center gap-2 mb-4 px-4 py-1.5 rounded-full border border-gold-500/30 bg-gold-500/5 backdrop-blur-md",
            },
            React.createElement(
              "span",
              {
                className:
                  "text-gold-700 dark:text-gold-400 text-[10px] font-bold uppercase tracking-[0.25em]",
              },
              "Portfolio",
            ),
          ),
          React.createElement(
            "h2",
            { className: "font-serif text-4xl md:text-5xl font-bold text-heading tracking-tight mb-2" },
            "Real Results. Real Websites.",
          ),
          React.createElement(
            "p",
            { className: "text-body font-light text-sm max-w-lg mx-auto mb-4 hidden md:block" },
            "Scroll to explore → Local Pensacola businesses running on High Stakes.",
          ),
          React.createElement(
            "div",
            { className: "flex justify-center" },
            React.createElement(
              "div",
              { className: "horiz-url-bar" },
              React.createElement("span", { style: { color: "#28c840", fontSize: "9px" } }, "●"),
              React.createElement("span", null, "https://"),
              React.createElement("span", { className: "h-url" }, o),
            ),
          ),
        ),
        React.createElement(
          "div",
          { ref: l, className: "horiz-viewport" },
          React.createElement(
            "div",
            { ref: r, className: "horiz-track" },
            u.map((e, a) =>
              React.createElement(
                "div",
                { key: e.id, className: "browser-card " + (a === n ? "bc-active" : "") },
                React.createElement(
                  "div",
                  { className: "browser-chrome" },
                  React.createElement(
                    "div",
                    { className: "bc-dots" },
                    React.createElement("div", { className: "bc-dot r" }),
                    React.createElement("div", { className: "bc-dot y" }),
                    React.createElement("div", { className: "bc-dot g" }),
                  ),
                  React.createElement(
                    "div",
                    { className: "bc-addr" },
                    React.createElement("span", { className: "bc-lock" }, "●"),
                    React.createElement("span", null, "https://", m(e.url)),
                  ),
                ),
                e.shot &&
                  React.createElement(
                    "div",
                    { className: "bc-shot" },
                    React.createElement("img", {
                      src: e.shot,
                      alt: `${e.client} website`,
                      loading: "lazy",
                      width: 760,
                      height: 1306,
                      className: "bc-shot-img",
                    }),
                    React.createElement("span", { className: "bc-shot-hint" }, "Hover to scroll ↓"),
                  ),
                React.createElement(
                  "div",
                  { className: "browser-body" },
                  React.createElement(
                    "div",
                    { className: "flex items-center gap-3" },
                    e.logo &&
                      !i[e.id] &&
                      React.createElement(
                        "div",
                        {
                          className:
                            "w-11 h-11 rounded-lg flex items-center justify-center flex-shrink-0 overflow-hidden border",
                          style: {
                            background: "dark" === e.logoBg ? "#0e0e0e" : "#ffffff",
                            borderColor: "rgba(212,175,55,0.25)",
                          },
                        },
                        React.createElement("img", {
                          src: e.logo,
                          alt: e.client,
                          onError: () => d((t) => ({ ...t, [e.id]: !0 })),
                          className: "max-h-[78%] max-w-[82%] object-contain",
                          loading: "lazy",
                        }),
                      ),
                    React.createElement(
                      "div",
                      null,
                      React.createElement("div", { className: "bc-tag" }, e.tag, " · ", e.sub),
                      React.createElement("div", { className: "bc-title" }, e.client),
                    ),
                  ),
                  React.createElement(
                    "div",
                    { className: "bc-pills" },
                    e.services.map((e, t) =>
                      React.createElement("span", { key: t, className: "bc-pill" }, e),
                    ),
                  ),
                  React.createElement("p", { className: "bc-desc" }, e.desc),
                  React.createElement(
                    "div",
                    { className: "bc-stats" },
                    e.stats.map((e, t) =>
                      React.createElement(
                        "div",
                        { key: t, className: "bc-stat" },
                        React.createElement("div", { className: "bc-stat-val" }, e.val),
                        React.createElement("div", { className: "bc-stat-lbl" }, e.label),
                      ),
                    ),
                  ),
                  React.createElement(
                    "blockquote",
                    { className: "bc-quote" },
                    e.quote,
                    React.createElement("cite", { className: "bc-cite" }, e.quoteAuthor),
                  ),
                  e.hasVideo &&
                    React.createElement(
                      "div",
                      { className: "mt-3" },
                      React.createElement(WatchVideoButton, {
                        src: CADE_VIDEO,
                        title: "Watch Cade tell it",
                      }),
                    ),
                  e.isCta
                    ? React.createElement(
                        MagneticButton,
                        {
                          onClick: () => t("contact"),
                          className:
                            "btn-glow btn-shimmer btn-rippable self-start px-6 py-3 bg-gradient-to-r from-gold-500 to-gold-600 hover:from-gold-400 hover:to-gold-500 text-white rounded-xl font-bold text-[10px] uppercase tracking-[0.18em] transition-all duration-300 shadow-lg shadow-gold-500/20 cursor-pointer",
                        },
                        "Book Free Strategy Call",
                      )
                    : e.inProduction
                      ? React.createElement(
                          "span",
                          {
                            className:
                              "self-start inline-flex items-center gap-2 px-5 py-2.5 rounded-xl border border-gold-500/30 bg-gold-500/5 text-gold-600 dark:text-gold-400 uppercase text-[10px] font-bold tracking-[0.2em]",
                          },
                          React.createElement("span", {
                            className: "scarcity-dot w-1.5 h-1.5 rounded-full bg-gold-500 inline-block",
                            "aria-hidden": "true",
                          }),
                          "In Production",
                        )
                      : React.createElement(
                          "a",
                          {
                            href: e.url.startsWith("http") ? e.url : "https://" + e.url,
                            target: "_blank",
                            rel: "noopener noreferrer",
                            className:
                              "btn-arrow-wrap text-heading hover:text-gold-600 dark:hover:text-gold-400 transition-colors uppercase text-[10px] font-bold tracking-[0.2em] border border-gray-200 dark:border-white/10 hover:border-gold-500/40 px-5 py-2.5 rounded-xl hover:bg-gold-500/5 cursor-pointer self-start",
                          },
                          React.createElement(
                            "span",
                            { className: "btn-arrow-text" },
                            e.linkLabel || "View Live Site",
                          ),
                          React.createElement(
                            "span",
                            { className: "btn-arrow-icon" },
                            React.createElement(ArrowRight, { className: "w-3 h-3" }),
                          ),
                        ),
                ),
              ),
            ),
          ),
        ),
        React.createElement(
          "div",
          { className: "horiz-progress" },
          u.map((e, t) =>
            React.createElement("div", {
              key: t,
              className: "horiz-dot " + (t === n ? "active" : ""),
              style: { width: t === n ? 36 : 20 },
            }),
          ),
        ),
      )
    );
  },
  ProcessSection = ({ t: e }) => {
    const t = useRef(null);
    return (
      useEffect(() => {
        if (!G || !ST) return;
        const e = G.context(() => {
          const e = t.current.querySelectorAll(".process-step"),
            a = G.timeline({
              scrollTrigger: { trigger: t.current, start: "top 72%", end: "bottom 58%", scrub: 1.6 },
            });
          e.forEach((e, t) => {
            a.from(e, { opacity: 0, x: -50, duration: 1, ease: "power2.out" }, 0.75 * t);
            const r = e.querySelector(".proc-line");
            r &&
              a.fromTo(
                r,
                { scaleX: 0 },
                { scaleX: 1, transformOrigin: "left", ease: "none", duration: 0.6 },
                0.75 * t + 0.85,
              );
          });
        }, t);
        return () => e.revert();
      }, []),
      React.createElement(
        "section",
        {
          id: "process",
          ref: t,
          className: "relative z-10 py-32 px-6 border-t border-black/5 dark:border-white/5 section-alt",
        },
        React.createElement(
          "div",
          { className: "max-w-7xl mx-auto" },
          React.createElement(
            RevealOnScroll,
            null,
            React.createElement(
              "h2",
              {
                className:
                  "text-4xl md:text-6xl font-bold text-heading text-center mb-20 tracking-tight font-serif",
              },
              e.process.title,
            ),
          ),
          React.createElement(
            "div",
            { className: "grid grid-cols-2 lg:grid-cols-4 gap-4 md:gap-6" },
            e.process.steps.map((t, a) =>
              React.createElement(
                "div",
                { key: a, className: "process-step relative", style: { opacity: 1 } },
                a < e.process.steps.length - 1 &&
                  React.createElement(
                    "div",
                    { className: "hidden lg:block absolute top-1/3 left-full w-full z-10 px-3" },
                    React.createElement("div", { className: "proc-line h-px w-full" }),
                  ),
                React.createElement(
                  "div",
                  {
                    className:
                      "card-bg rounded-[2rem] p-6 md:p-8 h-full transition-all duration-500 group cursor-default relative overflow-hidden hover:-translate-y-2 shadow-lg hover:shadow-2xl hover:shadow-gold-500/10 hover:border-gold-500/30",
                  },
                  React.createElement("div", {
                    className:
                      "absolute inset-0 bg-gradient-to-br from-gold-500/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity",
                    "aria-hidden": "true",
                  }),
                  React.createElement(
                    "div",
                    {
                      className:
                        "absolute top-6 right-6 px-2.5 py-1 bg-gold-500/10 border border-gold-500/20 rounded-full text-[9px] font-bold uppercase tracking-wider text-gold-600 dark:text-gold-400",
                    },
                    t.badge,
                  ),
                  React.createElement(
                    "div",
                    { className: "relative z-10" },
                    React.createElement(
                      "div",
                      {
                        className:
                          "text-5xl font-bold text-transparent bg-clip-text bg-gradient-to-b from-gold-400 to-gold-600 dark:from-gold-300 dark:to-gold-600 mb-6 font-serif",
                        "aria-hidden": "true",
                      },
                      t.num,
                    ),
                    React.createElement(
                      "h3",
                      {
                        className:
                          "text-xl font-bold text-heading mb-3 group-hover:text-gold-600 dark:group-hover:text-gold-400 transition-colors",
                      },
                      t.title,
                    ),
                    React.createElement("p", { className: "text-body text-sm leading-relaxed" }, t.desc),
                  ),
                ),
              ),
            ),
          ),
        ),
      )
    );
  },
  CTASection = ({ t: e, navigateTo: t }) =>
    React.createElement(
      "section",
      {
        id: "cta",
        className:
          "relative z-10 py-40 px-6 border-t border-black/5 dark:border-white/5 text-center section-alt",
      },
      React.createElement(
        "div",
        { className: "max-w-4xl mx-auto" },
        React.createElement(
          RevealOnScroll,
          null,
          React.createElement(
            "div",
            {
              className:
                "inline-flex items-center gap-2 mb-6 px-5 py-2 rounded-full border border-gold-500/20 bg-gold-500/10 backdrop-blur-md",
            },
            React.createElement(Sparkles, { className: "w-4 h-4 text-gold-600 dark:text-gold-400" }),
            React.createElement(
              "span",
              {
                className:
                  "text-gold-700 dark:text-gold-300 text-[10px] font-bold tracking-[0.2em] uppercase",
              },
              e.cta.badge,
            ),
          ),
          React.createElement(
            "div",
            { className: "flex items-center justify-center gap-2 mb-6" },
            React.createElement("span", {
              className: "scarcity-dot w-2 h-2 rounded-full bg-gold-500 inline-block",
              "aria-hidden": "true",
            }),
            React.createElement(
              "span",
              { className: "text-xs font-bold text-gold-600 dark:text-gold-400 uppercase tracking-widest" },
              e.cta.scarcity,
            ),
          ),
          React.createElement(
            "h2",
            {
              className:
                "text-5xl md:text-7xl font-bold text-heading mb-6 tracking-tight leading-[1.1] font-serif",
            },
            e.cta.title,
          ),
          React.createElement(
            "p",
            { className: "text-body text-xl mb-12 max-w-2xl mx-auto font-light" },
            e.cta.sub,
          ),
          React.createElement(
            "button",
            {
              onClick: () => t("contact"),
              className:
                "btn-glow btn-shimmer bg-gradient-to-r from-gold-500 to-gold-600 hover:from-gold-400 hover:to-gold-500 text-white font-bold text-sm uppercase tracking-[0.15em] px-10 py-5 rounded-xl transition-all hover:scale-105 flex items-center gap-3 mx-auto shadow-[0_10px_30px_rgba(212,175,55,0.3)] hover:shadow-[0_15px_40px_rgba(212,175,55,0.4)] cursor-pointer mb-6",
            },
            e.cta.btn,
            " ",
            React.createElement(ArrowRight, { className: "w-5 h-5" }),
          ),
          React.createElement(
            "p",
            { className: "text-muted text-sm" },
            e.cta.callLabel,
            " ",
            React.createElement(
              "a",
              {
                href: "tel:8504859926",
                className: "text-gold-600 dark:text-gold-400 font-semibold hover:underline cursor-pointer",
              },
              "(850) 485-9926",
            ),
          ),
        ),
      ),
    ),
  HomePage = ({ text: e, navigateTo: t }) =>
    React.createElement(
      React.Fragment,
      null,
      React.createElement(HeroSection, { t: e, navigateTo: t }),
      React.createElement(ServicesSection, { t: e }),
      React.createElement(TrustBar, { items: e.trust.items }),
      React.createElement(MarqueeTicker, { items: e.marquee }),
      React.createElement(PortfolioSection, { t: e, navigateTo: t }),
      React.createElement(TestimonialsSection, { data: e.testimonials }),
      React.createElement(ProcessSection, { t: e }),
      React.createElement(WhatsIncludedSection, { data: e.included, onBook: () => t("contact") }),
      React.createElement(FAQ, { data: e.faq }),
      React.createElement(CTASection, { t: e, navigateTo: t }),
    ),
  ThemeToggle = ({ isDark: e, onToggle: t }) => {
    const a = React.useId();
    return React.createElement(
      "button",
      {
        type: "button",
        onClick: t,
        className: `theme-toggle ${e ? "is-dark" : ""} p-2 rounded-lg text-gray-500 dark:text-gray-400 hover:text-gold-600 dark:hover:text-gold-400 transition-colors cursor-pointer`,
        "aria-label": e ? "Switch to light mode" : "Switch to dark mode",
      },
      React.createElement(
        "svg",
        { viewBox: "0 0 24 24", className: "w-5 h-5", "aria-hidden": "true" },
        React.createElement(
          "mask",
          { id: a },
          React.createElement("rect", { x: "0", y: "0", width: "24", height: "24", fill: "white" }),
          React.createElement("circle", { className: "tt-bite", r: "9", fill: "black" }),
        ),
        React.createElement("circle", {
          cx: "12",
          cy: "12",
          r: "9",
          fill: "currentColor",
          mask: `url(#${a})`,
        }),
      ),
    );
  },
  NavLink = ({ label: e, onClick: t, active: a }) =>
    React.createElement(
      "button",
      {
        onClick: t,
        className:
          "group relative inline-block h-5 overflow-hidden align-middle text-[11px] font-bold uppercase tracking-[0.18em] whitespace-nowrap cursor-pointer",
      },
      React.createElement(
        "span",
        {
          className: "flex flex-col transition-transform duration-300 ease-out group-hover:-translate-y-1/2",
        },
        React.createElement(
          "span",
          { className: "flex h-5 items-center " + (a ? "text-gold-600 dark:text-gold-400" : "text-body") },
          e,
        ),
        React.createElement(
          "span",
          { className: "flex h-5 items-center text-gold-600 dark:text-gold-400" },
          e,
        ),
      ),
    ),
  Navbar = ({ t: e, navigateTo: t, isDark: a, onToggleTheme: r, lang: l, onToggleLang: n, topOffset: c }) => {
    const [o, s] = useState(!1),
      [i, d] = useState(""),
      m = [
        { id: "services", label: e.nav.services },
        { id: "work", label: e.nav.work },
        { id: "process", label: e.nav.process },
      ];
    useEffect(() => {
      const e = () => {
        let e = "";
        (m.forEach((t) => {
          const a = document.getElementById(t.id);
          if (!a) return;
          const r = a.getBoundingClientRect();
          r.top <= 200 && r.bottom > 120 && (e = t.id);
        }),
          d(e));
      };
      return (
        e(),
        window.addEventListener("scroll", e, { passive: !0 }),
        () => window.removeEventListener("scroll", e)
      );
    }, []);
    const u = (e) => {
      (s(!1), t(e));
    };
    return React.createElement(
      "header",
      {
        className:
          "fixed left-1/2 -translate-x-1/2 z-[300] flex flex-col items-center px-4 sm:px-5 py-2.5 border border-black/10 dark:border-white/10 bg-white/90 dark:bg-[#0a0a0a]/90 shadow-[0_8px_30px_rgba(0,0,0,0.18)] dark:shadow-[0_10px_34px_rgba(0,0,0,0.55)] w-[calc(100%-1.5rem)] sm:w-auto transition-[border-radius] duration-200 " +
          (o ? "rounded-3xl" : "rounded-full"),
        style: { top: c },
        "aria-label": "Primary",
      },
      React.createElement(
        "div",
        { className: "flex items-center justify-between w-full gap-x-5 sm:gap-x-7" },
        React.createElement(
          "button",
          {
            onClick: () => u("home"),
            className: "flex items-center gap-2.5 cursor-pointer flex-shrink-0",
            "aria-label": "Go to homepage",
          },
          React.createElement(BrandMark, { size: 32 }),
          React.createElement(BrandWordmark, {
            className: "hidden sm:block text-base font-serif font-bold text-heading tracking-wide",
          }),
        ),
        React.createElement(
          "nav",
          { className: "hidden sm:flex items-center gap-6" },
          m.map((e) =>
            React.createElement(NavLink, {
              key: e.id,
              label: e.label,
              active: i === e.id,
              onClick: () => u(e.id),
            }),
          ),
        ),
        React.createElement(
          "div",
          { className: "hidden sm:flex items-center gap-1.5" },
          React.createElement(ThemeToggle, { isDark: a, onToggle: r }),
          React.createElement(
            "button",
            {
              onClick: () => u("contact"),
              className:
                "btn-shimmer ml-1 flex items-center whitespace-nowrap px-5 py-2.5 bg-gold-600 hover:bg-gold-500 text-white font-bold uppercase tracking-[0.18em] text-[10px] rounded-full transition-all duration-300 shadow-[0_4px_15px_rgba(212,175,55,0.25)] hover:shadow-[0_6px_22px_rgba(212,175,55,0.35)] cursor-pointer",
            },
            e.nav.start,
          ),
        ),
        React.createElement(
          "div",
          { className: "flex sm:hidden items-center gap-1" },
          React.createElement(ThemeToggle, { isDark: a, onToggle: r }),
          React.createElement(
            "button",
            {
              onClick: () => s((e) => !e),
              className: "flex items-center justify-center w-9 h-9 text-heading cursor-pointer",
              "aria-label": o ? "Close menu" : "Open menu",
              "aria-expanded": o,
            },
            o
              ? React.createElement(X, { className: "w-5 h-5" })
              : React.createElement(Menu, { className: "w-5 h-5" }),
          ),
        ),
      ),
      React.createElement(
        "div",
        {
          className:
            "sm:hidden flex flex-col items-center w-full overflow-hidden transition-all duration-300 ease-in-out " +
            (o ? "max-h-[420px] opacity-100 pt-4" : "max-h-0 opacity-0 pt-0 pointer-events-none"),
        },
        React.createElement(
          "nav",
          { className: "flex flex-col items-center gap-4 w-full" },
          m.map((e) =>
            React.createElement(
              "button",
              {
                key: e.id,
                onClick: () => u(e.id),
                className:
                  "text-body hover:text-gold-600 dark:hover:text-gold-400 transition-colors text-sm font-bold uppercase tracking-[0.18em] w-full text-center cursor-pointer",
              },
              e.label,
            ),
          ),
        ),
        React.createElement(
          "div",
          { className: "flex items-center gap-4 mt-4 w-full justify-center" },
          React.createElement(
            "button",
            {
              onClick: () => u("contact"),
              className:
                "whitespace-nowrap px-6 py-2.5 bg-gold-600 hover:bg-gold-500 text-white font-bold uppercase tracking-[0.18em] text-[10px] rounded-full cursor-pointer",
            },
            e.nav.start,
          ),
        ),
      ),
    );
  },
  ContactPage = ({
    text: e,
    formData: t,
    handleInputChange: a,
    handleFormSubmit: r,
    navigateTo: l,
    formStatus: n,
  }) => {
    const c = useRef(null),
      [st, setSt] = useState(0),
      [msgErr, setMsgErr] = useState(!1),
      inputCls =
        "w-full bg-gray-50 dark:bg-white/5 border border-gray-200 dark:border-white/10 rounded-xl py-3.5 px-4 outline-none text-sm text-heading focus:border-gold-500 focus:ring-1 focus:ring-gold-500/20",
      labelCls =
        "text-[10px] uppercase font-bold tracking-widest text-gold-700 dark:text-gold-500/80 pl-1 block",
      SERVICE_META = [
        { icon: Globe, desc: "A high-converting site, live in about a week" },
        { icon: TrendingUp, desc: "Rank on Google & Maps where customers search" },
        { icon: Megaphone, desc: "Done-for-you ads, posts, and reputation" },
        { icon: Sparkles, desc: "The full growth stack, handled for you" },
      ],
      goNext = () => setSt((s) => Math.min(s + 1, 2)),
      goBack = () => setSt((s) => Math.max(s - 1, 0)),
      onSubmitGuard = (ev) => {
        if (!t.message.trim()) return (ev.preventDefault(), setMsgErr(!0), void setSt(1));
        const f = c.current;
        if (f && !f.checkValidity()) return (ev.preventDefault(), void f.reportValidity());
        r(ev);
      };
    return React.createElement(
      "div",
      {
        id: "main-content",
        className: "pt-24 pb-12 min-h-screen flex items-center justify-center px-4 relative overflow-hidden",
      },
      React.createElement(
        "div",
        { className: "absolute inset-0 z-0", "aria-hidden": "true" },
        React.createElement("div", {
          className:
            "absolute top-1/4 left-1/4 w-[600px] h-[600px] bg-gold-500/15 dark:bg-gold-500/10 rounded-full blur-[80px]",
        }),
        React.createElement("div", {
          className:
            "absolute bottom-1/4 right-1/4 w-[500px] h-[500px] bg-purple-500/10 dark:bg-purple-500/5 rounded-full blur-[80px]",
        }),
      ),
      React.createElement(
        "div",
        { className: "max-w-2xl w-full relative z-10" },
        React.createElement(
          React.Fragment,
          null,
          React.createElement(
            "div",
            {
              className:
                "bg-white/90 dark:bg-[#0a0a0a]/90 backdrop-blur-md border border-gray-200 dark:border-white/10 p-8 md:p-12 rounded-[2.5rem] shadow-2xl relative",
            },
            React.createElement(
              "button",
              {
                onClick: () => l("home"),
                className:
                  "flex items-center gap-2 text-gray-500 hover:text-gold-600 dark:hover:text-gold-500 transition-colors text-sm font-semibold mb-8 cursor-pointer group",
                "aria-label": "Back to home",
              },
              React.createElement(ChevronLeft, {
                className: "w-4 h-4 group-hover:-translate-x-0.5 transition-transform",
              }),
              " ",
              e.contact.back,
            ),
            React.createElement(
              "div",
              { className: "text-center mb-8" },
              React.createElement(
                "h2",
                { className: "font-serif text-4xl md:text-5xl font-bold text-heading mb-3" },
                e.contact.title,
              ),
              React.createElement("p", { className: "text-muted text-base font-light" }, e.contact.sub),
            ),
            "success" === n
              ? React.createElement(
                  "div",
                  {
                    className:
                      "mb-8 p-6 rounded-2xl bg-green-50 dark:bg-green-500/10 border border-green-200 dark:border-green-500/20 text-center",
                    role: "alert",
                  },
                  React.createElement(
                    "div",
                    {
                      className:
                        "text-green-700 dark:text-green-400 font-bold text-base mb-1 flex items-center justify-center gap-2",
                    },
                    React.createElement(CheckCircle, { className: "w-5 h-5" }),
                    "Request received!",
                  ),
                  React.createElement(
                    "div",
                    { className: "text-green-600 dark:text-green-500 text-sm" },
                    "We'll call you within one business day to schedule your free strategy call.",
                  ),
                )
              : React.createElement(
                  React.Fragment,
                  null,
                  React.createElement(
                    "div",
                    { className: "stepper mb-8", "aria-label": `Step ${st + 1} of 3` },
                    (e.contact.stepLabels || []).map((lb, i) =>
                      React.createElement(
                        "div",
                        { key: i, className: "stepper-seg" + (i <= st ? " done" : "") },
                        React.createElement("span", { className: "stepper-num" }, i + 1),
                        React.createElement("span", { className: "stepper-lbl" }, lb),
                      ),
                    ),
                  ),
                  React.createElement(
                    "form",
                    { ref: c, className: "space-y-5", onSubmit: onSubmitGuard, noValidate: !0 },
                    0 === st &&
                      React.createElement(
                        "div",
                        null,
                        React.createElement(
                          "p",
                          { className: "text-heading font-semibold text-lg mb-5 text-center" },
                          e.contact.stepTitles[0],
                        ),
                        React.createElement(
                          "div",
                          { className: "grid grid-cols-1 sm:grid-cols-2 gap-3" },
                          e.contact.services.map((sv, i) =>
                            React.createElement(
                              "button",
                              {
                                key: sv,
                                type: "button",
                                onClick: () => {
                                  (a({ target: { name: "service", value: sv } }),
                                    setTimeout(goNext, 200));
                                },
                                className: "svc-card" + (t.service === sv ? " active" : ""),
                              },
                              React.createElement(SERVICE_META[i].icon, {
                                className: "w-6 h-6 svc-ic",
                              }),
                              React.createElement(
                                "span",
                                { className: "font-bold text-sm text-heading block" },
                                sv,
                              ),
                              React.createElement(
                                "span",
                                { className: "text-xs text-muted block mt-1" },
                                SERVICE_META[i].desc,
                              ),
                            ),
                          ),
                        ),
                        React.createElement(
                          "p",
                          { className: "text-center text-xs text-muted mt-4" },
                          "Pick the closest fit — you can change it later.",
                        ),
                      ),
                    1 === st &&
                      React.createElement(
                        "div",
                        { className: "space-y-5" },
                        React.createElement(
                          "p",
                          { className: "text-heading font-semibold text-lg mb-1 text-center" },
                          e.contact.stepTitles[1],
                        ),
                        React.createElement(
                          "div",
                          { className: "space-y-2" },
                          React.createElement(
                            "label",
                            { htmlFor: "c-website", className: labelCls },
                            "Current website (optional)",
                          ),
                          React.createElement("input", {
                            id: "c-website",
                            type: "text",
                            name: "website",
                            value: t.website,
                            onChange: a,
                            onKeyDown: (ev) => {
                              "Enter" === ev.key && (ev.preventDefault(), goNext());
                            },
                            className: inputCls,
                            placeholder: "yourbusiness.com — leave blank if you don't have one yet",
                            disabled: "sending" === n,
                          }),
                        ),
                        React.createElement(
                          "div",
                          { className: "space-y-2" },
                          React.createElement(
                            "label",
                            { htmlFor: "c-msg", className: labelCls },
                            "Project Details",
                          ),
                          React.createElement("textarea", {
                            id: "c-msg",
                            name: "message",
                            rows: "4",
                            value: t.message,
                            onChange: (ev) => {
                              (setMsgErr(!1), a(ev));
                            },
                            className:
                              inputCls + " resize-none" + (msgErr ? " !border-red-500" : ""),
                            placeholder:
                              "Tell us about your business — what you do, what's working, what isn't...",
                            required: !0,
                            disabled: "sending" === n,
                          }),
                          msgErr &&
                            React.createElement(
                              "p",
                              { className: "text-red-500 text-xs pl-1", role: "alert" },
                              "Tell us a little about your business so we can prepare your audit.",
                            ),
                        ),
                        React.createElement(
                          "div",
                          { className: "flex items-center justify-between pt-2" },
                          React.createElement(
                            "button",
                            { type: "button", onClick: goBack, className: "step-back" },
                            React.createElement(ChevronLeft, { className: "w-4 h-4" }),
                            e.contact.backStep,
                          ),
                          React.createElement(
                            "button",
                            {
                              type: "button",
                              onClick: () => {
                                if (!t.message.trim()) return void setMsgErr(!0);
                                goNext();
                              },
                              className:
                                "flex items-center gap-2 bg-gold-600 hover:bg-gold-500 text-white font-bold uppercase tracking-[0.18em] text-xs py-3.5 px-7 rounded-2xl cursor-pointer transition-all shadow-lg shadow-gold-600/20",
                            },
                            e.contact.next,
                            React.createElement(ArrowRight, { className: "w-4 h-4" }),
                          ),
                        ),
                      ),
                    2 === st &&
                      React.createElement(
                        "div",
                        { className: "space-y-5" },
                        React.createElement(
                          "p",
                          { className: "text-heading font-semibold text-lg mb-1 text-center" },
                          e.contact.stepTitles[2],
                        ),
                        React.createElement(
                          "div",
                          { className: "grid grid-cols-1 md:grid-cols-2 gap-5" },
                          [
                            ["name", "text", "Name", "John Doe"],
                            ["email", "email", "Email", "john@example.com"],
                          ].map(([f, ty, lb, ph]) =>
                            React.createElement(
                              "div",
                              { key: f, className: "space-y-2" },
                              React.createElement("label", { htmlFor: `c-${f}`, className: labelCls }, lb),
                              React.createElement("input", {
                                id: `c-${f}`,
                                type: ty,
                                name: f,
                                value: t[f],
                                onChange: a,
                                className: inputCls,
                                placeholder: ph,
                                required: !0,
                                disabled: "sending" === n,
                              }),
                            ),
                          ),
                        ),
                        React.createElement(
                          "div",
                          { className: "space-y-2" },
                          React.createElement(
                            "label",
                            { htmlFor: "c-phone", className: labelCls },
                            "Phone Number",
                          ),
                          React.createElement("input", {
                            id: "c-phone",
                            type: "tel",
                            name: "phone",
                            value: t.phone,
                            onChange: a,
                            className: inputCls,
                            placeholder: "+1 (555) 000-0000",
                            required: !0,
                            disabled: "sending" === n,
                          }),
                        ),
                        React.createElement(
                          "div",
                          {
                            className:
                              "flex items-start gap-3 rounded-xl border border-gray-200 dark:border-white/10 bg-gray-50/60 dark:bg-white/[0.03] px-4 py-3.5",
                          },
                          React.createElement("input", {
                            type: "checkbox",
                            id: "c-consent",
                            name: "sms_consent",
                            checked: !!t.sms_consent,
                            onChange: a,
                            disabled: "sending" === n,
                            className: "consent-check mt-0.5 flex-shrink-0 cursor-pointer",
                          }),
                          React.createElement(
                            "label",
                            {
                              htmlFor: "c-consent",
                              className: "text-[11px] leading-relaxed text-muted cursor-pointer",
                            },
                            "By checking this box, I agree to receive SMS text messages from High Stakes at the phone number provided (such as appointment reminders, project updates, and occasional offers). Consent is not a condition of purchase. Message and data rates may apply. Message frequency varies. Reply STOP to opt out or HELP for help. See our ",
                            React.createElement(
                              "a",
                              { href: "/privacy", className: "text-gold-600 dark:text-gold-400 hover:underline" },
                              "Privacy Policy",
                            ),
                            " and ",
                            React.createElement(
                              "a",
                              { href: "/terms", className: "text-gold-600 dark:text-gold-400 hover:underline" },
                              "Terms",
                            ),
                            ".",
                          ),
                        ),
                        React.createElement(
                          "div",
                          { className: "flex items-center gap-3 pt-2" },
                          React.createElement(
                            "button",
                            { type: "button", onClick: goBack, className: "step-back flex-shrink-0" },
                            React.createElement(ChevronLeft, { className: "w-4 h-4" }),
                            e.contact.backStep,
                          ),
                          React.createElement(
                            "button",
                            {
                              type: "submit",
                              disabled: "sending" === n,
                              className:
                                "flex-1 flex items-center justify-center gap-3 bg-gold-600 hover:bg-gold-500 disabled:opacity-60 disabled:cursor-wait text-white font-bold uppercase tracking-[0.18em] text-xs py-4 px-8 rounded-2xl cursor-pointer transition-all shadow-lg shadow-gold-600/20 hover:shadow-gold-500/30 hover:-translate-y-0.5",
                            },
                            "sending" === n ? "Sending…" : e.contact.btn,
                            "sending" !== n &&
                              React.createElement(
                                "svg",
                                {
                                  className: "w-4 h-4",
                                  viewBox: "0 0 24 24",
                                  fill: "none",
                                  stroke: "currentColor",
                                  strokeWidth: "2.5",
                                  "aria-hidden": "true",
                                },
                                React.createElement("path", {
                                  d: "M5 12h14M13 6l6 6-6 6",
                                  strokeLinecap: "round",
                                  strokeLinejoin: "round",
                                }),
                              ),
                          ),
                        ),
                        React.createElement(
                          "p",
                          { className: "text-center text-xs text-muted" },
                          e.contact.promise,
                        ),
                      ),
                  ),
                ),
            React.createElement(
              "div",
              { className: "mt-10 pt-8 border-t border-gray-200/50 dark:border-white/10" },
              React.createElement(
                "a",
                {
                  href: "tel:8504859926",
                  className:
                    "font-serif text-xl font-bold text-heading hover:text-gold-600 dark:hover:text-gold-400 transition-colors flex items-center justify-center gap-3 group/phone cursor-pointer",
                },
                React.createElement(Phone, {
                  className:
                    "w-5 h-5 text-gold-600 dark:text-gold-500 group-hover/phone:rotate-12 transition-transform",
                }),
                e.contact.phone,
              ),
            ),
          ),
        ),
      ),
    );
  };
function App() {
  const [e, t] = useState(!0),
    [a, r] = useState("en"),
    [l, n] = useState(!1),
    [c, o] = useState("home"),
    [s, i] = useState(!0),
    [d, m] = useState({
      name: "",
      email: "",
      phone: "",
      website: "",
      service: "Website Design",
      message: "",
      sms_consent: !1,
    }),
    [u, g] = useState("idle"),
    p = content[a] || content.en;
  (useEffect(() => {
    e ? document.documentElement.classList.add("dark") : document.documentElement.classList.remove("dark");
  }, [e]),
    useEffect(() => {
      const e = () => n(window.scrollY > 10);
      return (
        window.addEventListener("scroll", e, { passive: !0 }),
        () => window.removeEventListener("scroll", e)
      );
    }, []),
    p.nav.services,
    p.nav.work,
    p.nav.process);
  useEffect(() => {
    "#contact" === window.location.hash && o("contact");
    const e = () => o("#contact" === window.location.hash ? "contact" : "home");
    return (window.addEventListener("hashchange", e), () => window.removeEventListener("hashchange", e));
  }, []);
  const h = useCallback(
    (e, t = null) => {
      if ((t && m((e) => ({ ...e, service: t })), "contact" === e))
        ("#contact" !== window.location.hash && (window.location.hash = "contact"),
          o("contact"),
          window.scrollTo({ top: 0, behavior: "smooth" }));
      else if (
        ("#contact" === window.location.hash &&
          history.replaceState(null, "", window.location.pathname + window.location.search),
        "home" !== c)
      )
        (o("home"),
          setTimeout(() => {
            if ("home" === e) window.scrollTo({ top: 0, behavior: "smooth" });
            else {
              const t = document.getElementById(e);
              t &&
                window.scrollTo({
                  top: t.getBoundingClientRect().top + window.scrollY - 100,
                  behavior: "smooth",
                });
            }
          }, 100));
      else if ("home" === e) window.scrollTo({ top: 0, behavior: "smooth" });
      else {
        const t = document.getElementById(e);
        t &&
          window.scrollTo({ top: t.getBoundingClientRect().top + window.scrollY - 100, behavior: "smooth" });
      }
    },
    [c],
  );
  return React.createElement(
    "div",
    { className: "min-h-screen font-sans w-full overflow-x-hidden selection:bg-gold-500/30 relative" },
    React.createElement(ScrollProgress, null),
    React.createElement(CinematicEngine, null),
    React.createElement(ParticleBackground, null),
    React.createElement(BackgroundGradientAnimation, { isDark: e }),
    React.createElement(
      "div",
      { className: "fixed inset-0 z-0 pointer-events-none overflow-hidden", "aria-hidden": "true" },
      React.createElement("div", { className: "absolute inset-0 bg-grid" }),
      React.createElement("div", { className: "absolute inset-0 bg-noise opacity-[0.03]" }),
      React.createElement("div", { className: "absolute inset-0 bg-vignette" }),
    ),
    React.createElement(MobileStickyCTA, { onBook: () => h("contact") }),
    React.createElement(
      "a",
      {
        href: "#main-content",
        className:
          "sr-only focus:not-sr-only focus:absolute focus:top-4 focus:left-4 focus:z-[100] focus:px-4 focus:py-2 focus:bg-gold-500 focus:text-white focus:rounded-lg focus:font-bold",
      },
      "Skip to main content",
    ),
    s && React.createElement(AnnouncementBar, { onDismiss: () => i(!1), onBook: () => h("contact") }),
    React.createElement(Navbar, {
      t: p,
      navigateTo: h,
      isDark: e,
      onToggleTheme: () => t(!e),
      lang: a,
      onToggleLang: () => r("en" === a ? "es" : "en"),
      topOffset: s ? 40 : 16,
    }),
    React.createElement(
      "main",
      null,
      "home" === c
        ? React.createElement(HomePage, { text: p, navigateTo: h })
        : React.createElement(ContactPage, {
            text: p,
            formData: d,
            handleInputChange: (e) =>
              m((t) => ({
                ...t,
                [e.target.name]: "checkbox" === e.target.type ? e.target.checked : e.target.value,
              })),
            handleFormSubmit: async (e) => {
              (e.preventDefault(), g("sending"));
              try {
                (await fetch(
                  "https://services.leadconnectorhq.com/hooks/w3F7XRjmSEsSojrwWvHN/webhook-trigger/35131cd9-1dd3-42f3-ae5b-f1487bc8ee7a",
                  {
                    method: "POST",
                    headers: { "Content-Type": "application/x-www-form-urlencoded" },
                    body: new URLSearchParams({
                      website: d.website || "",
                      name: d.name,
                      email: d.email,
                      phone: d.phone,
                      service: d.service,
                      message: d.message,
                      sms_consent: d.sms_consent ? "yes" : "no",
                    }).toString(),
                    mode: "no-cors",
                  },
                ),
                  g("success"),
                  "function" == typeof window.gtag &&
                    window.gtag("event", "generate_lead", { event_category: "form", event_label: d.service }),
                  m({ name: "", email: "", phone: "", website: "", service: "Website Design", message: "", sms_consent: !1 }),
                  setTimeout(() => g("idle"), 8e3));
              } catch {
                (g("error"), setTimeout(() => g("idle"), 5e3));
              }
            },
            navigateTo: h,
            formStatus: u,
          }),
    ),
    React.createElement(
      "footer",
      {
        className:
          "py-16 border-t border-black/5 dark:border-white/5 bg-white/60 dark:bg-[#080808]/80 backdrop-blur-xl relative z-10",
      },
      React.createElement(
        "div",
        {
          className:
            "max-w-7xl mx-auto px-6 flex flex-col md:flex-row justify-between items-center gap-8 text-center md:text-left",
        },
        React.createElement(
          "div",
          { className: "flex items-center gap-4" },
          React.createElement(BrandMark, { size: 40 }),
          React.createElement(BrandWordmark, {
            className: "text-heading font-serif font-bold text-xl tracking-tight",
          }),
        ),
        React.createElement(
          "div",
          { className: "flex flex-col items-center gap-2" },
          React.createElement(
            "div",
            { className: "text-[10px] text-muted font-bold uppercase tracking-[0.3em]" },
            p.footer.rights,
          ),
          React.createElement(
            "div",
            { className: "flex gap-4" },
            React.createElement(
              "a",
              {
                href: "/privacy",
                className:
                  "text-[10px] text-muted hover:text-gold-600 dark:hover:text-gold-400 transition-colors hover:underline",
              },
              p.footer.privacy,
            ),
            React.createElement(
              "a",
              {
                href: "/terms",
                className:
                  "text-[10px] text-muted hover:text-gold-600 dark:hover:text-gold-400 transition-colors hover:underline",
              },
              p.footer.terms,
            ),
          ),
        ),
        React.createElement(
          "nav",
          { "aria-label": "Social media", className: "flex gap-6" },
          React.createElement(
            "a",
            {
              href: "https://www.instagram.com/highstakesai/",
              target: "_blank",
              rel: "noopener noreferrer",
              className:
                "text-muted/60 hover:text-gold-500 transition-colors text-[10px] uppercase font-bold tracking-widest cursor-pointer",
            },
            "Instagram",
          ),
        ),
      ),
    ),
  );
}
const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(React.createElement(App, null));
