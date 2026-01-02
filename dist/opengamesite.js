function y(f, h) {
  h.accent && f.style.setProperty("--gui-accent", h.accent), h.radius && f.style.setProperty("--gui-radius", h.radius), h.bg && f.style.setProperty("--gui-bg", h.bg);
}
function $(f, h = {}) {
  const e = document.querySelector(f);
  if (!e) return;
  const {
    variant: c = "default",
    icon: p,
    iconPosition: v = "left",
    style: m = {}
  } = h;
  if (e.classList.add("gui-btn", `gui-btn-${c}`), p) {
    e.classList.add("gui-btn-icon");
    const i = document.createElement("img");
    i.src = p, i.alt = "", i.className = `gui-btn-icon-${v}`, e.querySelector("img") || (v === "left" ? e.prepend(i) : e.append(i));
  }
  y(e, m);
}
function T(f = {}) {
  const {
    position: h = "top-left",
    x: e,
    y: c,
    color: p = "#0f0",
    background: v = "rgba(0,0,0,0.5)",
    draggable: m = !1
  } = f, i = document.createElement("div");
  i.className = "gui-fps", i.textContent = "FPS: --", document.body.appendChild(i), e != null && c != null ? (i.style.left = e + "px", i.style.top = c + "px") : i.classList.add(`gui-fps-${h}`), i.style.color = p, i.style.background = v;
  let a = performance.now(), t = 0;
  function n(s) {
    t++, s - a >= 1e3 && (i.textContent = `FPS: ${t}`, t = 0, a = s), requestAnimationFrame(n);
  }
  return requestAnimationFrame(n), m && makeDraggable(i), i;
}
function S(f, h = {}) {
  const e = document.querySelector(f);
  if (!e) return;
  const {
    variant: c = "default",
    hoverable: p = !1,
    clickable: v = !1,
    image: m,
    title: i,
    description: a,
    footer: t,
    badge: n,
    style: s = {}
  } = h;
  if (e.classList.add("gui-card", `gui-card-${c}`), p && e.classList.add("gui-card-hoverable"), v && e.classList.add("gui-card-clickable"), m) {
    const l = document.createElement("div");
    l.className = "gui-card-image";
    const r = document.createElement("img");
    r.src = m.src || m, r.alt = m.alt || "", l.appendChild(r), e.prepend(l);
  }
  const d = document.createElement("div");
  if (d.className = "gui-card-content", n) {
    const l = document.createElement("span");
    l.className = "gui-card-badge", l.textContent = n, d.appendChild(l);
  }
  if (i) {
    const l = document.createElement("h3");
    l.className = "gui-card-title", l.textContent = i, d.appendChild(l);
  }
  if (a) {
    const l = document.createElement("p");
    l.className = "gui-card-description", l.textContent = a, d.appendChild(l);
  }
  if (t) {
    const l = document.createElement("div");
    l.className = "gui-card-footer", typeof t == "string" ? l.textContent = t : l.appendChild(t), d.appendChild(l);
  }
  return e.appendChild(d), y(e, s), e;
}
function A(f = {}) {
  const {
    title: h,
    content: e,
    footer: c,
    size: p = "medium",
    closable: v = !0,
    backdrop: m = !0,
    onClose: i
  } = f, a = document.createElement("div");
  a.className = "gui-modal-backdrop", m || (a.style.display = "none");
  const t = document.createElement("div");
  if (t.className = `gui-modal gui-modal-${p}`, h || v) {
    const l = document.createElement("div");
    if (l.className = "gui-modal-header", h) {
      const r = document.createElement("h2");
      r.className = "gui-modal-title", r.textContent = h, l.appendChild(r);
    }
    if (v) {
      const r = document.createElement("button");
      r.className = "gui-modal-close", r.innerHTML = "×", r.setAttribute("aria-label", "Close"), r.onclick = () => s(), l.appendChild(r);
    }
    t.appendChild(l);
  }
  const n = document.createElement("div");
  if (n.className = "gui-modal-body", typeof e == "string" ? n.innerHTML = e : e instanceof HTMLElement && n.appendChild(e), t.appendChild(n), c) {
    const l = document.createElement("div");
    l.className = "gui-modal-footer", typeof c == "string" ? l.innerHTML = c : c instanceof HTMLElement && l.appendChild(c), t.appendChild(l);
  }
  a.appendChild(t), document.body.appendChild(a);
  function s() {
    a.classList.add("gui-modal-closing"), setTimeout(() => {
      document.body.removeChild(a), i && i();
    }, 200);
  }
  a.addEventListener("click", (l) => {
    l.target === a && s();
  });
  const d = (l) => {
    l.key === "Escape" && (s(), document.removeEventListener("keydown", d));
  };
  return document.addEventListener("keydown", d), requestAnimationFrame(() => {
    a.classList.add("gui-modal-open");
  }), {
    element: t,
    close: s,
    updateContent: (l) => {
      n.innerHTML = "", typeof l == "string" ? n.innerHTML = l : l instanceof HTMLElement && n.appendChild(l);
    }
  };
}
function q(f, h = {}) {
  const e = document.querySelector(f);
  if (!e) return;
  const {
    brand: c,
    brandLink: p = "#",
    items: v = [],
    position: m = "top",
    sticky: i = !0,
    theme: a = "default",
    style: t = {}
  } = h;
  if (e.classList.add("gui-navbar", `gui-navbar-${m}`, `gui-navbar-${a}`), i && e.classList.add("gui-navbar-sticky"), c) {
    const s = document.createElement("a");
    s.className = "gui-navbar-brand", s.href = p, typeof c == "string" ? s.textContent = c : s.appendChild(c), e.appendChild(s);
  }
  if (v.length > 0) {
    const s = document.createElement("nav");
    s.className = "gui-navbar-nav", v.forEach((d) => {
      const l = document.createElement("a");
      l.className = "gui-navbar-item", l.href = d.href || "#", l.textContent = d.label || d, d.active && l.classList.add("active"), d.onClick && l.addEventListener("click", (r) => {
        r.preventDefault(), d.onClick(r);
      }), s.appendChild(l);
    }), e.appendChild(s);
  }
  const n = document.createElement("button");
  return n.className = "gui-navbar-toggle", n.setAttribute("aria-label", "Toggle menu"), n.innerHTML = "☰", n.onclick = () => {
    e.classList.toggle("gui-navbar-mobile-open");
  }, e.appendChild(n), y(e, t), e;
}
function M(f, h = {}) {
  const e = document.querySelector(f);
  if (!e) return;
  const {
    placeholder: c = "Search games...",
    onSearch: p,
    debounce: v = 300,
    icon: m = !0,
    style: i = {}
  } = h;
  e.classList.add("gui-search");
  const a = document.createElement("input");
  if (a.type = "search", a.className = "gui-search-input", a.placeholder = c, a.setAttribute("aria-label", "Search"), m) {
    const n = document.createElement("span");
    n.className = "gui-search-icon", n.innerHTML = "🔍", e.appendChild(n);
  }
  e.appendChild(a);
  let t;
  return a.addEventListener("input", (n) => {
    clearTimeout(t), t = setTimeout(() => {
      p && p(n.target.value, n);
    }, v);
  }), a.addEventListener("keydown", (n) => {
    n.key === "Enter" && p && (n.preventDefault(), p(n.target.value, n));
  }), y(e, i), {
    element: e,
    input: a,
    setValue: (n) => {
      a.value = n;
    },
    getValue: () => a.value,
    focus: () => a.focus(),
    clear: () => {
      a.value = "", p && p("", null);
    }
  };
}
function P(f, h = {}) {
  const e = document.querySelector(f);
  if (!e) return;
  const {
    text: c,
    variant: p = "default",
    size: v = "medium",
    removable: m = !1,
    onRemove: i,
    style: a = {}
  } = h;
  if (e.classList.add("gui-badge", `gui-badge-${p}`, `gui-badge-${v}`), c && (e.textContent = c), m) {
    e.classList.add("gui-badge-removable");
    const t = document.createElement("button");
    t.className = "gui-badge-remove", t.innerHTML = "×", t.setAttribute("aria-label", "Remove"), t.onclick = (n) => {
      n.stopPropagation(), i && i(), e.remove();
    }, e.appendChild(t);
  }
  return y(e, a), e;
}
function H(f = {}) {
  const {
    type: h = "spinner",
    size: e = "medium",
    color: c,
    text: p,
    fullscreen: v = !1,
    target: m
  } = f, i = document.createElement("div");
  if (i.className = `gui-loading gui-loading-${h} gui-loading-${e}`, v && i.classList.add("gui-loading-fullscreen"), h === "spinner") {
    const t = document.createElement("div");
    t.className = "gui-spinner", c && (t.style.borderTopColor = c), i.appendChild(t);
  } else if (h === "dots")
    for (let t = 0; t < 3; t++) {
      const n = document.createElement("div");
      n.className = "gui-loading-dot", c && (n.style.backgroundColor = c), i.appendChild(n);
    }
  else if (h === "pulse") {
    const t = document.createElement("div");
    t.className = "gui-loading-pulse", c && (t.style.backgroundColor = c), i.appendChild(t);
  }
  if (p) {
    const t = document.createElement("span");
    t.className = "gui-loading-text", t.textContent = p, i.appendChild(t);
  }
  return (m || document.body).appendChild(i), {
    element: i,
    remove: () => {
      i.parentNode && i.parentNode.removeChild(i);
    }
  };
}
function B(f, h = {}) {
  const {
    text: e,
    position: c = "top",
    delay: p = 0,
    html: v = !1
  } = h;
  if (!f) return;
  const m = document.createElement("div");
  m.className = `gui-tooltip gui-tooltip-${c}`, m.setAttribute("role", "tooltip"), v ? m.innerHTML = e : m.textContent = e, document.body.appendChild(m);
  let i, a = !1;
  function t() {
    clearTimeout(i), i = setTimeout(() => {
      a = !0, m.classList.add("gui-tooltip-visible"), s();
    }, p);
  }
  function n() {
    clearTimeout(i), a && (a = !1, m.classList.remove("gui-tooltip-visible"));
  }
  function s() {
    const d = f.getBoundingClientRect(), l = m.getBoundingClientRect(), r = window.pageYOffset || document.documentElement.scrollTop, u = window.pageXOffset || document.documentElement.scrollLeft;
    let g, b;
    switch (c) {
      case "top":
        g = d.top + r - l.height - 8, b = d.left + u + d.width / 2 - l.width / 2;
        break;
      case "bottom":
        g = d.bottom + r + 8, b = d.left + u + d.width / 2 - l.width / 2;
        break;
      case "left":
        g = d.top + r + d.height / 2 - l.height / 2, b = d.left + u - l.width - 8;
        break;
      case "right":
        g = d.top + r + d.height / 2 - l.height / 2, b = d.right + u + 8;
        break;
    }
    m.style.top = `${g}px`, m.style.left = `${b}px`;
  }
  return f.addEventListener("mouseenter", t), f.addEventListener("mouseleave", n), f.addEventListener("focus", t), f.addEventListener("blur", n), window.addEventListener("scroll", s), window.addEventListener("resize", s), {
    element: m,
    update: (d) => {
      v ? m.innerHTML = d : m.textContent = d, s();
    },
    destroy: () => {
      f.removeEventListener("mouseenter", t), f.removeEventListener("mouseleave", n), f.removeEventListener("focus", t), f.removeEventListener("blur", n), window.removeEventListener("scroll", s), window.removeEventListener("resize", s), m.parentNode && m.parentNode.removeChild(m);
    }
  };
}
function V(f, h = {}) {
  const e = typeof f == "string" ? document.querySelector(f) : f;
  if (!e) return;
  const {
    items: c = [],
    position: p = "bottom-left",
    onSelect: v,
    multiple: m = !1,
    searchable: i = !1
  } = h;
  e.classList.add("gui-dropdown-trigger");
  const a = document.createElement("div");
  if (a.className = `gui-dropdown-menu gui-dropdown-${p}`, a.setAttribute("role", "menu"), i) {
    const u = document.createElement("input");
    u.type = "text", u.className = "gui-dropdown-search", u.placeholder = "Search...", a.appendChild(u), u.addEventListener("input", (g) => {
      const b = g.target.value.toLowerCase();
      Array.from(a.querySelectorAll(".gui-dropdown-item")).forEach((E) => {
        const o = E.textContent.toLowerCase();
        E.style.display = o.includes(b) ? "" : "none";
      });
    });
  }
  c.forEach((u, g) => {
    if (u === "divider") {
      const o = document.createElement("div");
      o.className = "gui-dropdown-divider", a.appendChild(o);
      return;
    }
    const b = document.createElement("div");
    if (b.className = "gui-dropdown-item", b.setAttribute("role", "menuitem"), b.setAttribute("data-index", g), u.icon) {
      const o = document.createElement("span");
      o.className = "gui-dropdown-item-icon", typeof u.icon == "string" ? o.textContent = u.icon : o.appendChild(u.icon), b.appendChild(o);
    }
    const E = document.createElement("span");
    E.className = "gui-dropdown-item-label", E.textContent = u.label || u, b.appendChild(E), u.disabled ? b.classList.add("disabled") : b.addEventListener("click", (o) => {
      o.stopPropagation(), v && v(u, g), m || s();
    }), a.appendChild(b);
  }), document.body.appendChild(a);
  let t = !1;
  function n() {
    t || (t = !0, a.classList.add("gui-dropdown-open"), l(), document.addEventListener("click", r));
  }
  function s() {
    t && (t = !1, a.classList.remove("gui-dropdown-open"), document.removeEventListener("click", r));
  }
  function d() {
    t ? s() : n();
  }
  function l() {
    const u = e.getBoundingClientRect(), g = a.getBoundingClientRect(), b = window.pageYOffset || document.documentElement.scrollTop, E = window.pageXOffset || document.documentElement.scrollLeft;
    let o, C;
    p.includes("bottom") ? o = u.bottom + b + 4 : o = u.top + b - g.height - 4, p.includes("right") ? C = u.right + E - g.width : C = u.left + E, a.style.top = `${o}px`, a.style.left = `${C}px`;
  }
  function r(u) {
    !a.contains(u.target) && !e.contains(u.target) && s();
  }
  return e.addEventListener("click", (u) => {
    u.stopPropagation(), d();
  }), document.addEventListener("keydown", (u) => {
    u.key === "Escape" && t && s();
  }), {
    element: a,
    open: n,
    close: s,
    toggle: d,
    updateItems: (u) => {
      a.innerHTML = "", h.items = u;
    }
  };
}
function I(f, h = {}) {
  const e = document.querySelector(f);
  if (!e) return;
  const {
    items: c = [],
    activeIndex: p = 0,
    variant: v = "default",
    onChange: m
  } = h;
  e.classList.add("gui-tabs", `gui-tabs-${v}`);
  const i = document.createElement("div");
  i.className = "gui-tabs-list", i.setAttribute("role", "tablist");
  const a = document.createElement("div");
  a.className = "gui-tabs-panels";
  let t = p;
  c.forEach((s, d) => {
    const l = document.createElement("button");
    if (l.className = "gui-tab", l.setAttribute("role", "tab"), l.setAttribute("aria-selected", d === p), l.setAttribute("aria-controls", `tab-panel-${d}`), l.id = `tab-${d}`, l.textContent = s.label || s, s.icon) {
      const u = document.createElement("span");
      u.className = "gui-tab-icon", typeof s.icon == "string" ? u.textContent = s.icon : u.appendChild(s.icon), l.insertBefore(u, l.firstChild);
    }
    l.addEventListener("click", () => {
      n(d);
    }), i.appendChild(l);
    const r = document.createElement("div");
    r.className = "gui-tab-panel", r.setAttribute("role", "tabpanel"), r.id = `tab-panel-${d}`, r.setAttribute("aria-labelledby", `tab-${d}`), r.hidden = d !== p, typeof s.content == "string" ? r.innerHTML = s.content : s.content instanceof HTMLElement && r.appendChild(s.content), a.appendChild(r);
  }), e.appendChild(i), e.appendChild(a);
  function n(s) {
    if (s === t) return;
    const d = i.children[t], l = a.children[t];
    d.classList.remove("active"), d.setAttribute("aria-selected", "false"), l.hidden = !0, t = s;
    const r = i.children[s], u = a.children[s];
    r.classList.add("active"), r.setAttribute("aria-selected", "true"), u.hidden = !1, m && m(s, c[s]);
  }
  return n(p), {
    element: e,
    setActive: n,
    getActive: () => t
  };
}
function O(f, h = {}) {
  const e = document.querySelector(f);
  if (!e) return;
  const {
    value: c = 0,
    max: p = 100,
    variant: v = "default",
    showLabel: m = !0,
    animated: i = !1,
    striped: a = !1,
    style: t = {}
  } = h;
  e.classList.add("gui-progress"), i && e.classList.add("gui-progress-animated"), a && e.classList.add("gui-progress-striped");
  const n = document.createElement("div");
  n.className = `gui-progress-bar gui-progress-bar-${v}`, n.setAttribute("role", "progressbar"), n.setAttribute("aria-valuenow", c), n.setAttribute("aria-valuemin", 0), n.setAttribute("aria-valuemax", p);
  const s = Math.min(Math.max(c / p * 100, 0), 100);
  if (n.style.width = `${s}%`, m) {
    const d = document.createElement("span");
    d.className = "gui-progress-label", d.textContent = `${Math.round(s)}%`, n.appendChild(d);
  }
  return e.appendChild(n), y(e, t), {
    element: e,
    setValue: (d) => {
      const l = Math.min(Math.max(d / p * 100, 0), 100);
      if (n.style.width = `${l}%`, n.setAttribute("aria-valuenow", d), m) {
        const r = n.querySelector(".gui-progress-label");
        r && (r.textContent = `${Math.round(l)}%`);
      }
    },
    getValue: () => c
  };
}
function w(f, h = {}) {
  const e = document.querySelector(f);
  if (!e) return;
  const {
    value: c = 0,
    max: p = 5,
    readonly: v = !1,
    size: m = "medium",
    showValue: i = !1,
    onChange: a,
    style: t = {}
  } = h;
  e.classList.add("gui-rating", `gui-rating-${m}`), v && e.classList.add("gui-rating-readonly");
  const n = [];
  let s = c;
  for (let r = 1; r <= p; r++) {
    const u = document.createElement("span");
    u.className = "gui-rating-star", u.setAttribute("data-value", r), u.innerHTML = "★", v || (u.addEventListener("mouseenter", () => {
      v || d(r);
    }), u.addEventListener("click", () => {
      v || (l(r), a && a(r));
    })), e.appendChild(u), n.push(u);
  }
  v || e.addEventListener("mouseleave", () => {
    d(s);
  });
  function d(r) {
    n.forEach((u, g) => {
      g < r ? u.classList.add("active") : u.classList.remove("active");
    });
  }
  function l(r) {
    s = r, d(r);
  }
  if (d(c), i) {
    const r = document.createElement("span");
    r.className = "gui-rating-value", r.textContent = `${c}/${p}`, e.appendChild(r);
  }
  return y(e, t), {
    element: e,
    setValue: l,
    getValue: () => s
  };
}
function D(f, h = {}) {
  const e = document.querySelector(f);
  if (!e) return;
  const {
    src: c,
    alt: p = "",
    size: v = "medium",
    shape: m = "circle",
    status: i,
    badge: a,
    style: t = {}
  } = h;
  if (e.classList.add("gui-avatar", `gui-avatar-${v}`, `gui-avatar-${m}`), c) {
    const n = document.createElement("img");
    n.src = c, n.alt = p, e.appendChild(n);
  } else {
    const n = e.textContent || "?";
    e.textContent = n;
  }
  if (i) {
    const n = document.createElement("span");
    n.className = `gui-avatar-status gui-avatar-status-${i}`, e.appendChild(n);
  }
  if (a) {
    const n = document.createElement("span");
    n.className = "gui-avatar-badge", n.textContent = a, e.appendChild(n);
  }
  return y(e, t), e;
}
function G(f, h = {}) {
  const e = document.querySelector(f);
  if (!e) return;
  const {
    current: c = 1,
    total: p = 1,
    showFirstLast: v = !0,
    showPrevNext: m = !0,
    maxVisible: i = 5,
    onChange: a
  } = h;
  e.classList.add("gui-pagination");
  let t = c, n = p;
  function s() {
    if (e.innerHTML = "", v && t > 1) {
      const g = d("«", 1, "first");
      e.appendChild(g);
    }
    if (m && t > 1) {
      const g = d("‹", t - 1, "prev");
      e.appendChild(g);
    }
    if (l().forEach((g) => {
      const b = d(g, g, "page");
      g === t && b.classList.add("active"), e.appendChild(b);
    }), m && t < n) {
      const g = d("›", t + 1, "next");
      e.appendChild(g);
    }
    if (v && t < n) {
      const g = d("»", n, "last");
      e.appendChild(g);
    }
  }
  function d(u, g, b) {
    const E = document.createElement("button");
    return E.className = `gui-pagination-btn gui-pagination-${b}`, E.textContent = u, E.setAttribute("aria-label", `Go to page ${g}`), E.addEventListener("click", () => {
      r(g);
    }), E;
  }
  function l() {
    const u = [], g = Math.floor(i / 2);
    let b = Math.max(1, t - g), E = Math.min(n, b + i - 1);
    E - b < i - 1 && (b = Math.max(1, E - i + 1));
    for (let o = b; o <= E; o++)
      u.push(o);
    return u;
  }
  function r(u) {
    u < 1 || u > n || u === t || (t = u, s(), a && a(u));
  }
  return s(), {
    element: e,
    setPage: r,
    setTotal: (u) => {
      n = u, t > n && (t = n), s();
    },
    getCurrent: () => t,
    getTotal: () => n
  };
}
function R(f, h = {}) {
  const e = document.querySelector(f);
  if (!e) return;
  const {
    items: c = [],
    autoplay: p = !1,
    interval: v = 3e3,
    showIndicators: m = !0,
    showControls: i = !0,
    loop: a = !0,
    onChange: t
  } = h;
  e.classList.add("gui-carousel");
  const n = document.createElement("div");
  n.className = "gui-carousel-track";
  const s = [];
  if (c.forEach((o, C) => {
    const L = document.createElement("div");
    if (L.className = "gui-carousel-slide", L.hidden = C !== 0, typeof o == "string")
      L.innerHTML = o;
    else if (o instanceof HTMLElement)
      L.appendChild(o);
    else if (o.image) {
      const x = document.createElement("img");
      if (x.src = o.image, x.alt = o.alt || "", L.appendChild(x), o.caption) {
        const N = document.createElement("div");
        N.className = "gui-carousel-caption", N.textContent = o.caption, L.appendChild(N);
      }
    }
    n.appendChild(L), s.push(L);
  }), e.appendChild(n), m && c.length > 1) {
    const o = document.createElement("div");
    o.className = "gui-carousel-indicators", c.forEach((C, L) => {
      const x = document.createElement("button");
      x.className = "gui-carousel-indicator", x.setAttribute("aria-label", `Go to slide ${L + 1}`), L === 0 && x.classList.add("active"), x.addEventListener("click", () => r(L)), o.appendChild(x);
    }), e.appendChild(o);
  }
  if (i && c.length > 1) {
    const o = document.createElement("button");
    o.className = "gui-carousel-control gui-carousel-prev", o.innerHTML = "‹", o.setAttribute("aria-label", "Previous slide"), o.addEventListener("click", () => g());
    const C = document.createElement("button");
    C.className = "gui-carousel-control gui-carousel-next", C.innerHTML = "›", C.setAttribute("aria-label", "Next slide"), C.addEventListener("click", () => u()), e.appendChild(o), e.appendChild(C);
  }
  let d = 0, l;
  function r(o) {
    if (o < 0 || o >= c.length) {
      if (!a) return;
      o = o < 0 ? c.length - 1 : 0;
    }
    if (s[d].hidden = !0, m) {
      const C = e.querySelectorAll(".gui-carousel-indicator");
      C[d] && C[d].classList.remove("active");
    }
    if (d = o, s[d].hidden = !1, m) {
      const C = e.querySelectorAll(".gui-carousel-indicator");
      C[d] && C[d].classList.add("active");
    }
    t && t(d, c[d]);
  }
  function u() {
    r(d + 1);
  }
  function g() {
    r(d - 1);
  }
  function b() {
    p && c.length > 1 && (l = setInterval(u, v));
  }
  function E() {
    l && (clearInterval(l), l = null);
  }
  return p && (b(), e.addEventListener("mouseenter", E), e.addEventListener("mouseleave", b)), {
    element: e,
    goTo: r,
    next: u,
    prev: g,
    getCurrent: () => d,
    startAutoplay: b,
    stopAutoplay: E
  };
}
function k(f, h = {}) {
  const {
    title: e,
    image: c,
    thumbnail: p,
    description: v,
    category: m,
    rating: i,
    players: a,
    playUrl: t,
    screenshots: n = [],
    onPlay: s,
    style: d = {}
  } = h, l = document.createElement("div");
  l.className = "gui-game-card";
  const r = document.createElement("div");
  r.className = "gui-game-card-thumbnail";
  const u = document.createElement("img");
  u.src = p || c, u.alt = e || "Game", r.appendChild(u);
  const g = document.createElement("div");
  g.className = "gui-game-card-play-overlay";
  const b = document.createElement("button");
  b.className = "gui-game-card-play-btn", b.innerHTML = "▶ Play", b.onclick = () => {
    t && window.open(t, "_blank"), s && s();
  }, g.appendChild(b), r.appendChild(g), l.appendChild(r);
  const E = document.createElement("div");
  if (E.className = "gui-game-card-info", e) {
    const o = document.createElement("h3");
    o.className = "gui-game-card-title", o.textContent = e, E.appendChild(o);
  }
  if (m) {
    const o = document.createElement("span");
    o.className = "gui-game-card-category", o.textContent = m, E.appendChild(o);
  }
  if (i !== void 0) {
    const o = document.createElement("div");
    o.className = "gui-game-card-rating", w(o, {
      value: i,
      max: 5,
      readonly: !0,
      size: "small"
    }), E.appendChild(o);
  }
  if (v) {
    const o = document.createElement("p");
    o.className = "gui-game-card-description", o.textContent = v, E.appendChild(o);
  }
  if (a) {
    const o = document.createElement("span");
    o.className = "gui-game-card-players", o.textContent = `👥 ${a}`, E.appendChild(o);
  }
  if (l.appendChild(E), f) {
    const o = typeof f == "string" ? document.querySelector(f) : f;
    o && o.appendChild(l);
  }
  return l;
}
function z(f, h = {}) {
  const e = document.querySelector(f);
  if (!e) return;
  const {
    categories: c = [],
    activeCategory: p = null,
    onSelect: v,
    variant: m = "default"
  } = h;
  e.classList.add("gui-category-filter", `gui-category-filter-${m}`);
  const i = document.createElement("button");
  i.className = "gui-category-filter-item", i.textContent = "All", p || i.classList.add("active"), i.addEventListener("click", () => {
    a(null), v && v(null);
  }), e.appendChild(i), c.forEach((t) => {
    const n = document.createElement("button");
    n.className = "gui-category-filter-item", n.textContent = typeof t == "string" ? t : t.label, n.setAttribute("data-category", typeof t == "string" ? t : t.value), p && (typeof t == "string" && t === p || typeof t == "object" && t.value === p) && n.classList.add("active"), n.addEventListener("click", () => {
      const s = typeof t == "string" ? t : t.value;
      a(s), v && v(s);
    }), e.appendChild(n);
  });
  function a(t) {
    if (e.querySelectorAll(".gui-category-filter-item").forEach((n) => {
      n.classList.remove("active");
    }), t === null)
      e.querySelector(".gui-category-filter-item").classList.add("active");
    else {
      const n = e.querySelector(`[data-category="${t}"]`);
      n && n.classList.add("active");
    }
  }
  return {
    element: e,
    setActive: a,
    getActive: () => p
  };
}
function F(f, h = {}) {
  const e = document.querySelector(f);
  if (!e) return;
  const {
    games: c = [],
    columns: p = 4,
    gap: v = "20px",
    onGameClick: m
  } = h;
  e.classList.add("gui-game-grid"), e.style.display = "grid", e.style.gridTemplateColumns = `repeat(${p}, 1fr)`, e.style.gap = v;
  function i() {
    e.innerHTML = "", c.forEach((a) => {
      const t = k(null, {
        ...a,
        onPlay: () => {
          m && m(a);
        }
      });
      e.appendChild(t);
    });
  }
  return i(), {
    element: e,
    setGames: (a) => {
      c.length = 0, c.push(...a), i();
    },
    addGame: (a) => {
      c.push(a);
      const t = k(null, {
        ...a,
        onPlay: () => {
          m && m(a);
        }
      });
      e.appendChild(t);
    },
    setColumns: (a) => {
      e.style.gridTemplateColumns = `repeat(${a}, 1fr)`;
    }
  };
}
function W(f, h = {}) {
  const e = document.querySelector(f);
  if (!e) return;
  const {
    type: c = "text",
    placeholder: p,
    value: v = "",
    label: m,
    error: i,
    helperText: a,
    disabled: t = !1,
    required: n = !1,
    icon: s,
    iconPosition: d = "left",
    onChange: l,
    onFocus: r,
    onBlur: u,
    style: g = {}
  } = h;
  if (e.classList.add("gui-input-wrapper"), m) {
    const o = document.createElement("label");
    o.className = "gui-input-label", o.textContent = m, n && (o.innerHTML += " <span class='required'>*</span>"), e.appendChild(o);
  }
  const b = document.createElement("div");
  if (b.className = "gui-input-container", s && b.classList.add(`gui-input-has-icon-${d}`), i && b.classList.add("gui-input-error"), s) {
    const o = document.createElement("span");
    o.className = `gui-input-icon gui-input-icon-${d}`, typeof s == "string" ? o.textContent = s : o.appendChild(s), b.appendChild(o);
  }
  const E = document.createElement("input");
  if (E.type = c, E.className = "gui-input", E.value = v, p && (E.placeholder = p), t && (E.disabled = !0), n && (E.required = !0), l && E.addEventListener("input", (o) => l(o.target.value, o)), r && E.addEventListener("focus", r), u && E.addEventListener("blur", u), b.appendChild(E), e.appendChild(b), i) {
    const o = document.createElement("span");
    o.className = "gui-input-error-text", o.textContent = i, e.appendChild(o);
  }
  if (a && !i) {
    const o = document.createElement("span");
    o.className = "gui-input-helper", o.textContent = a, e.appendChild(o);
  }
  return y(e, g), {
    element: e,
    input: E,
    setValue: (o) => {
      E.value = o;
    },
    getValue: () => E.value,
    setError: (o) => {
      if (o) {
        b.classList.add("gui-input-error");
        let C = e.querySelector(".gui-input-error-text");
        C || (C = document.createElement("span"), C.className = "gui-input-error-text", e.appendChild(C)), C.textContent = o;
      } else {
        b.classList.remove("gui-input-error");
        const C = e.querySelector(".gui-input-error-text");
        C && C.remove();
      }
    },
    focus: () => E.focus()
  };
}
function X(f, h = {}) {
  const e = document.querySelector(f);
  if (!e) return;
  const {
    options: c = [],
    value: p,
    label: v,
    placeholder: m = "Select...",
    error: i,
    helperText: a,
    disabled: t = !1,
    searchable: n = !1,
    onChange: s,
    style: d = {}
  } = h;
  if (e.classList.add("gui-select-wrapper"), v) {
    const g = document.createElement("label");
    g.className = "gui-select-label", g.textContent = v, e.appendChild(g);
  }
  const l = document.createElement("div");
  l.className = "gui-select-container", i && l.classList.add("gui-select-error");
  const r = document.createElement("select");
  r.className = "gui-select", t && (r.disabled = !0);
  const u = document.createElement("option");
  if (u.value = "", u.textContent = m, u.disabled = !0, u.selected = !p, r.appendChild(u), c.forEach((g) => {
    const b = document.createElement("option");
    b.value = typeof g == "string" ? g : g.value, b.textContent = typeof g == "string" ? g : g.label, p && b.value === p && (b.selected = !0), r.appendChild(b);
  }), s && r.addEventListener("change", (g) => {
    s(g.target.value, g);
  }), l.appendChild(r), e.appendChild(l), i) {
    const g = document.createElement("span");
    g.className = "gui-select-error-text", g.textContent = i, e.appendChild(g);
  }
  if (a && !i) {
    const g = document.createElement("span");
    g.className = "gui-select-helper", g.textContent = a, e.appendChild(g);
  }
  return y(e, d), {
    element: e,
    select: r,
    setValue: (g) => {
      r.value = g;
    },
    getValue: () => r.value,
    setError: (g) => {
      if (g) {
        l.classList.add("gui-select-error");
        let b = e.querySelector(".gui-select-error-text");
        b || (b = document.createElement("span"), b.className = "gui-select-error-text", e.appendChild(b)), b.textContent = g;
      } else {
        l.classList.remove("gui-select-error");
        const b = e.querySelector(".gui-select-error-text");
        b && b.remove();
      }
    }
  };
}
function Y(f, h = {}) {
  const e = document.querySelector(f);
  if (!e) return;
  const {
    label: c,
    checked: p = !1,
    disabled: v = !1,
    indeterminate: m = !1,
    onChange: i,
    style: a = {}
  } = h;
  e.classList.add("gui-checkbox-wrapper");
  const t = document.createElement("input");
  if (t.type = "checkbox", t.className = "gui-checkbox", t.checked = p, t.indeterminate = m, v && (t.disabled = !0), i && t.addEventListener("change", (n) => {
    i(n.target.checked, n);
  }), e.appendChild(t), c) {
    const n = document.createElement("label");
    n.className = "gui-checkbox-label", n.textContent = c, n.setAttribute("for", t.id || `checkbox-${Date.now()}`), t.id || (t.id = n.getAttribute("for")), e.appendChild(n);
  }
  return y(e, a), {
    element: e,
    checkbox: t,
    setChecked: (n) => {
      t.checked = n;
    },
    getChecked: () => t.checked,
    setIndeterminate: (n) => {
      t.indeterminate = n;
    }
  };
}
function j(f, h = {}) {
  const e = document.querySelector(f);
  if (!e) return;
  const {
    name: c,
    options: p = [],
    value: v,
    label: m,
    disabled: i = !1,
    onChange: a,
    style: t = {}
  } = h;
  if (e.classList.add("gui-radio-group"), m) {
    const s = document.createElement("label");
    s.className = "gui-radio-group-label", s.textContent = m, e.appendChild(s);
  }
  const n = document.createElement("div");
  return n.className = "gui-radio-group-items", p.forEach((s, d) => {
    const l = document.createElement("div");
    l.className = "gui-radio-wrapper";
    const r = document.createElement("input");
    r.type = "radio", r.name = c || `radio-${Date.now()}`, r.id = `radio-${c || "radio"}-${d}`, r.value = typeof s == "string" ? s : s.value, r.checked = v && r.value === v, i && (r.disabled = !0), a && r.addEventListener("change", (g) => {
      g.target.checked && a(g.target.value, g);
    });
    const u = document.createElement("label");
    u.className = "gui-radio-label", u.setAttribute("for", r.id), u.textContent = typeof s == "string" ? s : s.label, l.appendChild(r), l.appendChild(u), n.appendChild(l);
  }), e.appendChild(n), y(e, t), {
    element: e,
    setValue: (s) => {
      const d = e.querySelector(`input[value="${s}"]`);
      d && (d.checked = !0);
    },
    getValue: () => {
      const s = e.querySelector("input:checked");
      return s ? s.value : null;
    }
  };
}
function _(f, h = {}) {
  const e = document.querySelector(f);
  if (!e) return;
  const {
    maxWidth: c = "1200px",
    fluid: p = !1,
    padding: v = !0,
    style: m = {}
  } = h;
  return e.classList.add("gui-container"), p && e.classList.add("gui-container-fluid"), v && e.classList.add("gui-container-padding"), !p && c && (e.style.maxWidth = c), y(e, m), e;
}
function J(f, h = {}) {
  const e = document.querySelector(f);
  if (!e) return;
  const {
    columns: c = 12,
    gap: p = "20px",
    responsive: v = !0,
    style: m = {}
  } = h;
  return e.classList.add("gui-grid"), e.style.display = "grid", e.style.gridTemplateColumns = `repeat(${c}, 1fr)`, e.style.gap = p, v && e.classList.add("gui-grid-responsive"), y(e, m), {
    element: e,
    setColumns: (i) => {
      e.style.gridTemplateColumns = `repeat(${i}, 1fr)`;
    },
    setGap: (i) => {
      e.style.gap = i;
    }
  };
}
function U(f, h = {}) {
  const e = document.querySelector(f);
  if (!e) return;
  const {
    direction: c = "row",
    justify: p = "flex-start",
    align: v = "stretch",
    wrap: m = !1,
    gap: i = "0",
    style: a = {}
  } = h;
  return e.classList.add("gui-flex"), e.style.display = "flex", e.style.flexDirection = c, e.style.justifyContent = p, e.style.alignItems = v, e.style.gap = i, m && (e.style.flexWrap = "wrap"), y(e, a), {
    element: e,
    setDirection: (t) => {
      e.style.flexDirection = t;
    },
    setJustify: (t) => {
      e.style.justifyContent = t;
    },
    setAlign: (t) => {
      e.style.alignItems = t;
    }
  };
}
function K(f) {
  let h = !1, e = 0, c = 0;
  f.addEventListener("pointerdown", (p) => {
    h = !0, e = p.clientX - f.offsetLeft, c = p.clientY - f.offsetTop, f.setPointerCapture(p.pointerId);
  }), f.addEventListener("pointermove", (p) => {
    h && (f.style.left = p.clientX - e + "px", f.style.top = p.clientY - c + "px");
  }), f.addEventListener("pointerup", () => {
    h = !1;
  });
}
typeof window < "u" && (window.OpenGameSite = {
  // Core
  button: $,
  fps: T,
  // UI Components
  card: S,
  modal: A,
  navbar: q,
  search: M,
  badge: P,
  loading: H,
  tooltip: B,
  dropdown: V,
  tabs: I,
  progress: O,
  rating: w,
  avatar: D,
  pagination: G,
  carousel: R,
  // Game-specific
  gameCard: k,
  categoryFilter: z,
  gameGrid: F,
  // Forms
  input: W,
  select: X,
  checkbox: Y,
  radio: j,
  // Layout
  container: _,
  grid: J,
  flex: U,
  // Utilities
  makeDraggable: K,
  applyStyles: y
}, window.ui = window.OpenGameSite);
export {
  y as applyStyles,
  D as avatar,
  P as badge,
  $ as button,
  S as card,
  R as carousel,
  z as categoryFilter,
  Y as checkbox,
  _ as container,
  V as dropdown,
  U as flex,
  T as fps,
  k as gameCard,
  F as gameGrid,
  J as grid,
  W as input,
  H as loading,
  K as makeDraggable,
  A as modal,
  q as navbar,
  G as pagination,
  O as progress,
  j as radio,
  w as rating,
  M as search,
  X as select,
  I as tabs,
  B as tooltip
};
