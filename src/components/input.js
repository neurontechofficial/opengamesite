import { applyStyles } from '../utils/style.js';

export function input(selector, options = {}) {
    const el = document.querySelector(selector);
    if (!el) return;

    const {
        type = "text",
        placeholder,
        value = "",
        label,
        error,
        helperText,
        disabled = false,
        required = false,
        icon,
        iconPosition = "left",
        onChange,
        onFocus,
        onBlur,
        style = {}
    } = options;

    el.classList.add("gui-input-wrapper");

    // Label
    if (label) {
        const labelEl = document.createElement("label");
        labelEl.className = "gui-input-label";
        labelEl.textContent = label;
        if (required) labelEl.innerHTML += " <span class='required'>*</span>";
        el.appendChild(labelEl);
    }

    // Input container
    const inputContainer = document.createElement("div");
    inputContainer.className = "gui-input-container";
    if (icon) inputContainer.classList.add(`gui-input-has-icon-${iconPosition}`);
    if (error) inputContainer.classList.add("gui-input-error");

    // Icon
    if (icon) {
        const iconEl = document.createElement("span");
        iconEl.className = `gui-input-icon gui-input-icon-${iconPosition}`;
        if (typeof icon === "string") {
            iconEl.textContent = icon;
        } else {
            iconEl.appendChild(icon);
        }
        inputContainer.appendChild(iconEl);
    }

    // Input element
    const inputEl = document.createElement("input");
    inputEl.type = type;
    inputEl.className = "gui-input";
    inputEl.value = value;
    if (placeholder) inputEl.placeholder = placeholder;
    if (disabled) inputEl.disabled = true;
    if (required) inputEl.required = true;

    if (onChange) {
        inputEl.addEventListener("input", (e) => onChange(e.target.value, e));
    }
    if (onFocus) {
        inputEl.addEventListener("focus", onFocus);
    }
    if (onBlur) {
        inputEl.addEventListener("blur", onBlur);
    }

    inputContainer.appendChild(inputEl);
    el.appendChild(inputContainer);

    // Error message
    if (error) {
        const errorEl = document.createElement("span");
        errorEl.className = "gui-input-error-text";
        errorEl.textContent = error;
        el.appendChild(errorEl);
    }

    // Helper text
    if (helperText && !error) {
        const helperEl = document.createElement("span");
        helperEl.className = "gui-input-helper";
        helperEl.textContent = helperText;
        el.appendChild(helperEl);
    }

    applyStyles(el, style);

    return {
        element: el,
        input: inputEl,
        setValue: (newValue) => {
            inputEl.value = newValue;
        },
        getValue: () => inputEl.value,
        setError: (errorMsg) => {
            if (errorMsg) {
                inputContainer.classList.add("gui-input-error");
                let errorEl = el.querySelector(".gui-input-error-text");
                if (!errorEl) {
                    errorEl = document.createElement("span");
                    errorEl.className = "gui-input-error-text";
                    el.appendChild(errorEl);
                }
                errorEl.textContent = errorMsg;
            } else {
                inputContainer.classList.remove("gui-input-error");
                const errorEl = el.querySelector(".gui-input-error-text");
                if (errorEl) errorEl.remove();
            }
        },
        focus: () => inputEl.focus()
    };
}

