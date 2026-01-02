import { applyStyles } from '../utils/style.js';

export function rating(selector, options = {}) {
    const el = document.querySelector(selector);
    if (!el) return;

    const {
        value = 0,
        max = 5,
        readonly = false,
        size = "medium",
        showValue = false,
        onChange,
        style = {}
    } = options;

    el.classList.add("gui-rating", `gui-rating-${size}`);
    if (readonly) el.classList.add("gui-rating-readonly");

    const stars = [];
    let currentValue = value;

    for (let i = 1; i <= max; i++) {
        const star = document.createElement("span");
        star.className = "gui-rating-star";
        star.setAttribute("data-value", i);
        star.innerHTML = "★";
        
        if (!readonly) {
            star.addEventListener("mouseenter", () => {
                if (!readonly) highlightStars(i);
            });
            star.addEventListener("click", () => {
                if (!readonly) {
                    setValue(i);
                    if (onChange) onChange(i);
                }
            });
        }

        el.appendChild(star);
        stars.push(star);
    }

    if (!readonly) {
        el.addEventListener("mouseleave", () => {
            highlightStars(currentValue);
        });
    }

    function highlightStars(upTo) {
        stars.forEach((star, index) => {
            if (index < upTo) {
                star.classList.add("active");
            } else {
                star.classList.remove("active");
            }
        });
    }

    function setValue(newValue) {
        currentValue = newValue;
        highlightStars(newValue);
    }

    // Set initial value
    highlightStars(value);

    // Show value text if enabled
    if (showValue) {
        const valueText = document.createElement("span");
        valueText.className = "gui-rating-value";
        valueText.textContent = `${value}/${max}`;
        el.appendChild(valueText);
    }

    applyStyles(el, style);

    return {
        element: el,
        setValue,
        getValue: () => currentValue
    };
}

