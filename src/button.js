import { applyStyles } from './utils/style.js';

export function button(selector, options = {}) {
    const el = document.querySelector(selector);
    if (!el) return;

    const {
        variant = "default",
        icon,
        iconPosition = "left",
        style = {}
    } = options;

    // Base classes
    el.classList.add("gui-btn", `gui-btn-${variant}`);

    // Icon support
    if (icon) {
        el.classList.add("gui-btn-icon");

        const img = document.createElement("img");
        img.src = icon;
        img.alt = "";
        img.className = `gui-btn-icon-${iconPosition}`;

        // Prevent duplicate icons
        if (!el.querySelector("img")) {
            iconPosition === "left"
                ? el.prepend(img)
                : el.append(img);
        }
    }

    // Inline style overrides via CSS variables
    applyStyles(el, style);
}
