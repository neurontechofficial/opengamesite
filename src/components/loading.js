export function loading(options = {}) {
    const {
        type = "spinner",
        size = "medium",
        color,
        text,
        fullscreen = false,
        target
    } = options;

    const container = document.createElement("div");
    container.className = `gui-loading gui-loading-${type} gui-loading-${size}`;
    if (fullscreen) container.classList.add("gui-loading-fullscreen");

    if (type === "spinner") {
        const spinner = document.createElement("div");
        spinner.className = "gui-spinner";
        if (color) spinner.style.borderTopColor = color;
        container.appendChild(spinner);
    } else if (type === "dots") {
        for (let i = 0; i < 3; i++) {
            const dot = document.createElement("div");
            dot.className = "gui-loading-dot";
            if (color) dot.style.backgroundColor = color;
            container.appendChild(dot);
        }
    } else if (type === "pulse") {
        const pulse = document.createElement("div");
        pulse.className = "gui-loading-pulse";
        if (color) pulse.style.backgroundColor = color;
        container.appendChild(pulse);
    }

    if (text) {
        const textEl = document.createElement("span");
        textEl.className = "gui-loading-text";
        textEl.textContent = text;
        container.appendChild(textEl);
    }

    const parent = target || document.body;
    parent.appendChild(container);

    return {
        element: container,
        remove: () => {
            if (container.parentNode) {
                container.parentNode.removeChild(container);
            }
        }
    };
}

