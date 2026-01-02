import { applyStyles } from '../utils/style.js';

export function checkbox(selector, options = {}) {
    const el = document.querySelector(selector);
    if (!el) return;

    const {
        label,
        checked = false,
        disabled = false,
        indeterminate = false,
        onChange,
        style = {}
    } = options;

    el.classList.add("gui-checkbox-wrapper");

    const checkboxEl = document.createElement("input");
    checkboxEl.type = "checkbox";
    checkboxEl.className = "gui-checkbox";
    checkboxEl.checked = checked;
    checkboxEl.indeterminate = indeterminate;
    if (disabled) checkboxEl.disabled = true;

    if (onChange) {
        checkboxEl.addEventListener("change", (e) => {
            onChange(e.target.checked, e);
        });
    }

    el.appendChild(checkboxEl);

    if (label) {
        const labelEl = document.createElement("label");
        labelEl.className = "gui-checkbox-label";
        labelEl.textContent = label;
        labelEl.setAttribute("for", checkboxEl.id || `checkbox-${Date.now()}`);
        if (!checkboxEl.id) checkboxEl.id = labelEl.getAttribute("for");
        el.appendChild(labelEl);
    }

    applyStyles(el, style);

    return {
        element: el,
        checkbox: checkboxEl,
        setChecked: (newChecked) => {
            checkboxEl.checked = newChecked;
        },
        getChecked: () => checkboxEl.checked,
        setIndeterminate: (val) => {
            checkboxEl.indeterminate = val;
        }
    };
}

