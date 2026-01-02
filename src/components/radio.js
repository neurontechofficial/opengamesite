import { applyStyles } from '../utils/style.js';

export function radio(selector, options = {}) {
    const el = document.querySelector(selector);
    if (!el) return;

    const {
        name,
        options: radioOptions = [],
        value,
        label,
        disabled = false,
        onChange,
        style = {}
    } = options;

    el.classList.add("gui-radio-group");

    if (label) {
        const labelEl = document.createElement("label");
        labelEl.className = "gui-radio-group-label";
        labelEl.textContent = label;
        el.appendChild(labelEl);
    }

    const radioGroup = document.createElement("div");
    radioGroup.className = "gui-radio-group-items";

    radioOptions.forEach((opt, index) => {
        const wrapper = document.createElement("div");
        wrapper.className = "gui-radio-wrapper";

        const radioEl = document.createElement("input");
        radioEl.type = "radio";
        radioEl.name = name || `radio-${Date.now()}`;
        radioEl.id = `radio-${name || 'radio'}-${index}`;
        radioEl.value = typeof opt === "string" ? opt : opt.value;
        radioEl.checked = value && radioEl.value === value;
        if (disabled) radioEl.disabled = true;

        if (onChange) {
            radioEl.addEventListener("change", (e) => {
                if (e.target.checked) {
                    onChange(e.target.value, e);
                }
            });
        }

        const labelEl = document.createElement("label");
        labelEl.className = "gui-radio-label";
        labelEl.setAttribute("for", radioEl.id);
        labelEl.textContent = typeof opt === "string" ? opt : opt.label;

        wrapper.appendChild(radioEl);
        wrapper.appendChild(labelEl);
        radioGroup.appendChild(wrapper);
    });

    el.appendChild(radioGroup);

    applyStyles(el, style);

    return {
        element: el,
        setValue: (newValue) => {
            const radio = el.querySelector(`input[value="${newValue}"]`);
            if (radio) radio.checked = true;
        },
        getValue: () => {
            const checked = el.querySelector("input:checked");
            return checked ? checked.value : null;
        }
    };
}

