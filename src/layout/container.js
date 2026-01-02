import { applyStyles } from '../utils/style.js';

export function container(selector, options = {}) {
    const el = document.querySelector(selector);
    if (!el) return;

    const {
        maxWidth = "1200px",
        fluid = false,
        padding = true,
        style = {}
    } = options;

    el.classList.add("gui-container");
    if (fluid) el.classList.add("gui-container-fluid");
    if (padding) el.classList.add("gui-container-padding");

    if (!fluid && maxWidth) {
        el.style.maxWidth = maxWidth;
    }

    applyStyles(el, style);

    return el;
}

