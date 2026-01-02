export function tooltip(element, options = {}) {
    const {
        text,
        position = "top",
        delay = 0,
        html = false
    } = options;

    if (!element) return;

    const tooltipEl = document.createElement("div");
    tooltipEl.className = `gui-tooltip gui-tooltip-${position}`;
    tooltipEl.setAttribute("role", "tooltip");
    
    if (html) {
        tooltipEl.innerHTML = text;
    } else {
        tooltipEl.textContent = text;
    }

    document.body.appendChild(tooltipEl);

    let showTimeout;
    let isVisible = false;

    function show() {
        clearTimeout(showTimeout);
        showTimeout = setTimeout(() => {
            isVisible = true;
            tooltipEl.classList.add("gui-tooltip-visible");
            updatePosition();
        }, delay);
    }

    function hide() {
        clearTimeout(showTimeout);
        if (isVisible) {
            isVisible = false;
            tooltipEl.classList.remove("gui-tooltip-visible");
        }
    }

    function updatePosition() {
        const rect = element.getBoundingClientRect();
        const tooltipRect = tooltipEl.getBoundingClientRect();
        const scrollTop = window.pageYOffset || document.documentElement.scrollTop;
        const scrollLeft = window.pageXOffset || document.documentElement.scrollLeft;

        let top, left;

        switch (position) {
            case "top":
                top = rect.top + scrollTop - tooltipRect.height - 8;
                left = rect.left + scrollLeft + (rect.width / 2) - (tooltipRect.width / 2);
                break;
            case "bottom":
                top = rect.bottom + scrollTop + 8;
                left = rect.left + scrollLeft + (rect.width / 2) - (tooltipRect.width / 2);
                break;
            case "left":
                top = rect.top + scrollTop + (rect.height / 2) - (tooltipRect.height / 2);
                left = rect.left + scrollLeft - tooltipRect.width - 8;
                break;
            case "right":
                top = rect.top + scrollTop + (rect.height / 2) - (tooltipRect.height / 2);
                left = rect.right + scrollLeft + 8;
                break;
        }

        tooltipEl.style.top = `${top}px`;
        tooltipEl.style.left = `${left}px`;
    }

    element.addEventListener("mouseenter", show);
    element.addEventListener("mouseleave", hide);
    element.addEventListener("focus", show);
    element.addEventListener("blur", hide);

    // Update position on scroll/resize
    window.addEventListener("scroll", updatePosition);
    window.addEventListener("resize", updatePosition);

    return {
        element: tooltipEl,
        update: (newText) => {
            if (html) {
                tooltipEl.innerHTML = newText;
            } else {
                tooltipEl.textContent = newText;
            }
            updatePosition();
        },
        destroy: () => {
            element.removeEventListener("mouseenter", show);
            element.removeEventListener("mouseleave", hide);
            element.removeEventListener("focus", show);
            element.removeEventListener("blur", hide);
            window.removeEventListener("scroll", updatePosition);
            window.removeEventListener("resize", updatePosition);
            if (tooltipEl.parentNode) {
                tooltipEl.parentNode.removeChild(tooltipEl);
            }
        }
    };
}

