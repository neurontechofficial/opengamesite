export function pagination(selector, options = {}) {
    const el = document.querySelector(selector);
    if (!el) return;

    const {
        current = 1,
        total = 1,
        showFirstLast = true,
        showPrevNext = true,
        maxVisible = 5,
        onChange
    } = options;

    el.classList.add("gui-pagination");

    let currentPage = current;
    let totalPages = total;

    function render() {
        el.innerHTML = "";

        // First button
        if (showFirstLast && currentPage > 1) {
            const firstBtn = createButton("«", 1, "first");
            el.appendChild(firstBtn);
        }

        // Previous button
        if (showPrevNext && currentPage > 1) {
            const prevBtn = createButton("‹", currentPage - 1, "prev");
            el.appendChild(prevBtn);
        }

        // Page numbers
        const pages = getVisiblePages();
        pages.forEach(page => {
            const pageBtn = createButton(page, page, "page");
            if (page === currentPage) {
                pageBtn.classList.add("active");
            }
            el.appendChild(pageBtn);
        });

        // Next button
        if (showPrevNext && currentPage < totalPages) {
            const nextBtn = createButton("›", currentPage + 1, "next");
            el.appendChild(nextBtn);
        }

        // Last button
        if (showFirstLast && currentPage < totalPages) {
            const lastBtn = createButton("»", totalPages, "last");
            el.appendChild(lastBtn);
        }
    }

    function createButton(text, page, type) {
        const btn = document.createElement("button");
        btn.className = `gui-pagination-btn gui-pagination-${type}`;
        btn.textContent = text;
        btn.setAttribute("aria-label", `Go to page ${page}`);
        btn.addEventListener("click", () => {
            setPage(page);
        });
        return btn;
    }

    function getVisiblePages() {
        const pages = [];
        const half = Math.floor(maxVisible / 2);

        let start = Math.max(1, currentPage - half);
        let end = Math.min(totalPages, start + maxVisible - 1);

        if (end - start < maxVisible - 1) {
            start = Math.max(1, end - maxVisible + 1);
        }

        for (let i = start; i <= end; i++) {
            pages.push(i);
        }

        return pages;
    }

    function setPage(page) {
        if (page < 1 || page > totalPages || page === currentPage) return;
        currentPage = page;
        render();
        if (onChange) onChange(page);
    }

    render();

    return {
        element: el,
        setPage,
        setTotal: (newTotal) => {
            totalPages = newTotal;
            if (currentPage > totalPages) currentPage = totalPages;
            render();
        },
        getCurrent: () => currentPage,
        getTotal: () => totalPages
    };
}

