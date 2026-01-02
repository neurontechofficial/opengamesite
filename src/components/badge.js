import { applyStyles } from '../utils/style.js';

export function badge(selector, options = {}) {
    const el = document.querySelector(selector);
    if (!el) return;

    const {
        text,
        variant = "default",
        size = "medium",
        removable = false,
        onRemove,
        style = {}
    } = options;

    el.classList.add("gui-badge", `gui-badge-${variant}`, `gui-badge-${size}`);

    if (text) {
        el.textContent = text;
    }

    if (removable) {
        el.classList.add("gui-badge-removable");
        const removeBtn = document.createElement("button");
        removeBtn.className = "gui-badge-remove";
        removeBtn.innerHTML = "×";
        removeBtn.setAttribute("aria-label", "Remove");
        removeBtn.onclick = (e) => {
            e.stopPropagation();
            if (onRemove) onRemove();
            el.remove();
        };
        el.appendChild(removeBtn);
    }

    applyStyles(el, style);

    return el;
}

