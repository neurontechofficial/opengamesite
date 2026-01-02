import { applyStyles } from '../utils/style.js';

export function avatar(selector, options = {}) {
    const el = document.querySelector(selector);
    if (!el) return;

    const {
        src,
        alt = "",
        size = "medium",
        shape = "circle",
        status,
        badge,
        style = {}
    } = options;

    el.classList.add("gui-avatar", `gui-avatar-${size}`, `gui-avatar-${shape}`);

    if (src) {
        const img = document.createElement("img");
        img.src = src;
        img.alt = alt;
        el.appendChild(img);
    } else {
        // Fallback to initials or default
        const initials = el.textContent || "?";
        el.textContent = initials;
    }

    if (status) {
        const statusEl = document.createElement("span");
        statusEl.className = `gui-avatar-status gui-avatar-status-${status}`;
        el.appendChild(statusEl);
    }

    if (badge) {
        const badgeEl = document.createElement("span");
        badgeEl.className = "gui-avatar-badge";
        badgeEl.textContent = badge;
        el.appendChild(badgeEl);
    }

    applyStyles(el, style);

    return el;
}

