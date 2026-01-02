import { applyStyles } from '../utils/style.js';

export function navbar(selector, options = {}) {
    const el = document.querySelector(selector);
    if (!el) return;

    const {
        brand,
        brandLink = "#",
        items = [],
        position = "top",
        sticky = true,
        theme = "default",
        style = {}
    } = options;

    el.classList.add("gui-navbar", `gui-navbar-${position}`, `gui-navbar-${theme}`);
    if (sticky) el.classList.add("gui-navbar-sticky");

    // Brand/Logo
    if (brand) {
        const brandEl = document.createElement("a");
        brandEl.className = "gui-navbar-brand";
        brandEl.href = brandLink;
        if (typeof brand === "string") {
            brandEl.textContent = brand;
        } else {
            brandEl.appendChild(brand);
        }
        el.appendChild(brandEl);
    }

    // Navigation items
    if (items.length > 0) {
        const nav = document.createElement("nav");
        nav.className = "gui-navbar-nav";
        
        items.forEach(item => {
            const navItem = document.createElement("a");
            navItem.className = "gui-navbar-item";
            navItem.href = item.href || "#";
            navItem.textContent = item.label || item;
            if (item.active) navItem.classList.add("active");
            if (item.onClick) {
                navItem.addEventListener("click", (e) => {
                    e.preventDefault();
                    item.onClick(e);
                });
            }
            nav.appendChild(navItem);
        });

        el.appendChild(nav);
    }

    // Mobile menu toggle
    const toggle = document.createElement("button");
    toggle.className = "gui-navbar-toggle";
    toggle.setAttribute("aria-label", "Toggle menu");
    toggle.innerHTML = "☰";
    toggle.onclick = () => {
        el.classList.toggle("gui-navbar-mobile-open");
    };
    el.appendChild(toggle);

    applyStyles(el, style);

    return el;
}

