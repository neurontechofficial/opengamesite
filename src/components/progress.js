import { applyStyles } from '../utils/style.js';

export function progress(selector, options = {}) {
    const el = document.querySelector(selector);
    if (!el) return;

    const {
        value = 0,
        max = 100,
        variant = "default",
        showLabel = true,
        animated = false,
        striped = false,
        style = {}
    } = options;

    el.classList.add("gui-progress");
    if (animated) el.classList.add("gui-progress-animated");
    if (striped) el.classList.add("gui-progress-striped");

    const bar = document.createElement("div");
    bar.className = `gui-progress-bar gui-progress-bar-${variant}`;
    bar.setAttribute("role", "progressbar");
    bar.setAttribute("aria-valuenow", value);
    bar.setAttribute("aria-valuemin", 0);
    bar.setAttribute("aria-valuemax", max);

    const percentage = Math.min(Math.max((value / max) * 100, 0), 100);
    bar.style.width = `${percentage}%`;

    if (showLabel) {
        const label = document.createElement("span");
        label.className = "gui-progress-label";
        label.textContent = `${Math.round(percentage)}%`;
        bar.appendChild(label);
    }

    el.appendChild(bar);

    applyStyles(el, style);

    return {
        element: el,
        setValue: (newValue) => {
            const newPercentage = Math.min(Math.max((newValue / max) * 100, 0), 100);
            bar.style.width = `${newPercentage}%`;
            bar.setAttribute("aria-valuenow", newValue);
            if (showLabel) {
                const label = bar.querySelector(".gui-progress-label");
                if (label) label.textContent = `${Math.round(newPercentage)}%`;
            }
        },
        getValue: () => value
    };
}

