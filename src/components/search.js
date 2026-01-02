import { applyStyles } from '../utils/style.js';

export function search(selector, options = {}) {
    const el = document.querySelector(selector);
    if (!el) return;

    const {
        placeholder = "Search games...",
        onSearch,
        debounce = 300,
        icon = true,
        style = {}
    } = options;

    el.classList.add("gui-search");

    const input = document.createElement("input");
    input.type = "search";
    input.className = "gui-search-input";
    input.placeholder = placeholder;
    input.setAttribute("aria-label", "Search");

    if (icon) {
        const iconEl = document.createElement("span");
        iconEl.className = "gui-search-icon";
        iconEl.innerHTML = "🔍";
        el.appendChild(iconEl);
    }

    el.appendChild(input);

    // Debounced search
    let timeout;
    input.addEventListener("input", (e) => {
        clearTimeout(timeout);
        timeout = setTimeout(() => {
            if (onSearch) onSearch(e.target.value, e);
        }, debounce);
    });

    // Enter key search
    input.addEventListener("keydown", (e) => {
        if (e.key === "Enter" && onSearch) {
            e.preventDefault();
            onSearch(e.target.value, e);
        }
    });

    applyStyles(el, style);

    return {
        element: el,
        input: input,
        setValue: (value) => {
            input.value = value;
        },
        getValue: () => input.value,
        focus: () => input.focus(),
        clear: () => {
            input.value = "";
            if (onSearch) onSearch("", null);
        }
    };
}

