import { applyStyles } from '../utils/style.js';

export function grid(selector, options = {}) {
    const el = document.querySelector(selector);
    if (!el) return;

    const {
        columns = 12,
        gap = "20px",
        responsive = true,
        style = {}
    } = options;

    el.classList.add("gui-grid");
    el.style.display = "grid";
    el.style.gridTemplateColumns = `repeat(${columns}, 1fr)`;
    el.style.gap = gap;

    if (responsive) {
        el.classList.add("gui-grid-responsive");
    }

    applyStyles(el, style);

    return {
        element: el,
        setColumns: (newColumns) => {
            el.style.gridTemplateColumns = `repeat(${newColumns}, 1fr)`;
        },
        setGap: (newGap) => {
            el.style.gap = newGap;
        }
    };
}

