export function modal(options = {}) {
    const {
        title,
        content,
        footer,
        size = "medium",
        closable = true,
        backdrop = true,
        onClose
    } = options;

    // Create backdrop
    const backdropEl = document.createElement("div");
    backdropEl.className = "gui-modal-backdrop";
    if (!backdrop) backdropEl.style.display = "none";

    // Create modal
    const modalEl = document.createElement("div");
    modalEl.className = `gui-modal gui-modal-${size}`;

    // Modal header
    if (title || closable) {
        const header = document.createElement("div");
        header.className = "gui-modal-header";
        
        if (title) {
            const titleEl = document.createElement("h2");
            titleEl.className = "gui-modal-title";
            titleEl.textContent = title;
            header.appendChild(titleEl);
        }

        if (closable) {
            const closeBtn = document.createElement("button");
            closeBtn.className = "gui-modal-close";
            closeBtn.innerHTML = "×";
            closeBtn.setAttribute("aria-label", "Close");
            closeBtn.onclick = () => close();
            header.appendChild(closeBtn);
        }

        modalEl.appendChild(header);
    }

    // Modal body
    const body = document.createElement("div");
    body.className = "gui-modal-body";
    if (typeof content === "string") {
        body.innerHTML = content;
    } else if (content instanceof HTMLElement) {
        body.appendChild(content);
    }
    modalEl.appendChild(body);

    // Modal footer
    if (footer) {
        const footerEl = document.createElement("div");
        footerEl.className = "gui-modal-footer";
        if (typeof footer === "string") {
            footerEl.innerHTML = footer;
        } else if (footer instanceof HTMLElement) {
            footerEl.appendChild(footer);
        }
        modalEl.appendChild(footerEl);
    }

    backdropEl.appendChild(modalEl);
    document.body.appendChild(backdropEl);

    // Close function
    function close() {
        backdropEl.classList.add("gui-modal-closing");
        setTimeout(() => {
            document.body.removeChild(backdropEl);
            if (onClose) onClose();
        }, 200);
    }

    // Close on backdrop click
    backdropEl.addEventListener("click", (e) => {
        if (e.target === backdropEl) close();
    });

    // Close on Escape key
    const escapeHandler = (e) => {
        if (e.key === "Escape") {
            close();
            document.removeEventListener("keydown", escapeHandler);
        }
    };
    document.addEventListener("keydown", escapeHandler);

    // Animate in
    requestAnimationFrame(() => {
        backdropEl.classList.add("gui-modal-open");
    });

    return {
        element: modalEl,
        close,
        updateContent: (newContent) => {
            body.innerHTML = "";
            if (typeof newContent === "string") {
                body.innerHTML = newContent;
            } else if (newContent instanceof HTMLElement) {
                body.appendChild(newContent);
            }
        }
    };
}

