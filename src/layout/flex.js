import { applyStyles } from '../utils/style.js';

export function flex(selector, options = {}) {
    const el = document.querySelector(selector);
    if (!el) return;

    const {
        direction = "row",
        justify = "flex-start",
        align = "stretch",
        wrap = false,
        gap = "0",
        style = {}
    } = options;

    el.classList.add("gui-flex");
    el.style.display = "flex";
    el.style.flexDirection = direction;
    el.style.justifyContent = justify;
    el.style.alignItems = align;
    el.style.gap = gap;
    if (wrap) el.style.flexWrap = "wrap";

    applyStyles(el, style);

    return {
        element: el,
        setDirection: (newDirection) => {
            el.style.flexDirection = newDirection;
        },
        setJustify: (newJustify) => {
            el.style.justifyContent = newJustify;
        },
        setAlign: (newAlign) => {
            el.style.alignItems = newAlign;
        }
    };
}

