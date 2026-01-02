import { applyStyles } from '../utils/style.js';

export function card(selector, options = {}) {
    const el = document.querySelector(selector);
    if (!el) return;

    const {
        variant = "default",
        hoverable = false,
        clickable = false,
        image,
        title,
        description,
        footer,
        badge,
        style = {}
    } = options;

    el.classList.add("gui-card", `gui-card-${variant}`);
    if (hoverable) el.classList.add("gui-card-hoverable");
    if (clickable) el.classList.add("gui-card-clickable");

    // Card image
    if (image) {
        const imgWrapper = document.createElement("div");
        imgWrapper.className = "gui-card-image";
        const img = document.createElement("img");
        img.src = image.src || image;
        img.alt = image.alt || "";
        imgWrapper.appendChild(img);
        el.prepend(imgWrapper);
    }

    // Card content wrapper
    const content = document.createElement("div");
    content.className = "gui-card-content";

    // Badge
    if (badge) {
        const badgeEl = document.createElement("span");
        badgeEl.className = "gui-card-badge";
        badgeEl.textContent = badge;
        content.appendChild(badgeEl);
    }

    // Title
    if (title) {
        const titleEl = document.createElement("h3");
        titleEl.className = "gui-card-title";
        titleEl.textContent = title;
        content.appendChild(titleEl);
    }

    // Description
    if (description) {
        const descEl = document.createElement("p");
        descEl.className = "gui-card-description";
        descEl.textContent = description;
        content.appendChild(descEl);
    }

    // Footer
    if (footer) {
        const footerEl = document.createElement("div");
        footerEl.className = "gui-card-footer";
        if (typeof footer === "string") {
            footerEl.textContent = footer;
        } else {
            footerEl.appendChild(footer);
        }
        content.appendChild(footerEl);
    }

    el.appendChild(content);

    // Apply custom styles
    applyStyles(el, style);

    return el;
}

