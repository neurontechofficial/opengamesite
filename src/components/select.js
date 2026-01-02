import { applyStyles } from '../utils/style.js';

export function select(selector, options = {}) {
    const el = document.querySelector(selector);
    if (!el) return;

    const {
        options: selectOptions = [],
        value,
        label,
        placeholder = "Select...",
        error,
        helperText,
        disabled = false,
        searchable = false,
        onChange,
        style = {}
    } = options;

    el.classList.add("gui-select-wrapper");

    // Label
    if (label) {
        const labelEl = document.createElement("label");
        labelEl.className = "gui-select-label";
        labelEl.textContent = label;
        el.appendChild(labelEl);
    }

    // Select container
    const selectContainer = document.createElement("div");
    selectContainer.className = "gui-select-container";
    if (error) selectContainer.classList.add("gui-select-error");

    const selectEl = document.createElement("select");
    selectEl.className = "gui-select";
    if (disabled) selectEl.disabled = true;

    // Placeholder option
    const placeholderOption = document.createElement("option");
    placeholderOption.value = "";
    placeholderOption.textContent = placeholder;
    placeholderOption.disabled = true;
    placeholderOption.selected = !value;
    selectEl.appendChild(placeholderOption);

    // Options
    selectOptions.forEach(opt => {
        const option = document.createElement("option");
        option.value = typeof opt === "string" ? opt : opt.value;
        option.textContent = typeof opt === "string" ? opt : opt.label;
        if (value && option.value === value) {
            option.selected = true;
        }
        selectEl.appendChild(option);
    });

    if (onChange) {
        selectEl.addEventListener("change", (e) => {
            onChange(e.target.value, e);
        });
    }

    selectContainer.appendChild(selectEl);
    el.appendChild(selectContainer);

    // Error message
    if (error) {
        const errorEl = document.createElement("span");
        errorEl.className = "gui-select-error-text";
        errorEl.textContent = error;
        el.appendChild(errorEl);
    }

    // Helper text
    if (helperText && !error) {
        const helperEl = document.createElement("span");
        helperEl.className = "gui-select-helper";
        helperEl.textContent = helperText;
        el.appendChild(helperEl);
    }

    applyStyles(el, style);

    return {
        element: el,
        select: selectEl,
        setValue: (newValue) => {
            selectEl.value = newValue;
        },
        getValue: () => selectEl.value,
        setError: (errorMsg) => {
            if (errorMsg) {
                selectContainer.classList.add("gui-select-error");
                let errorEl = el.querySelector(".gui-select-error-text");
                if (!errorEl) {
                    errorEl = document.createElement("span");
                    errorEl.className = "gui-select-error-text";
                    el.appendChild(errorEl);
                }
                errorEl.textContent = errorMsg;
            } else {
                selectContainer.classList.remove("gui-select-error");
                const errorEl = el.querySelector(".gui-select-error-text");
                if (errorEl) errorEl.remove();
            }
        }
    };
}

