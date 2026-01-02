export function categoryFilter(selector, options = {}) {
    const el = document.querySelector(selector);
    if (!el) return;

    const {
        categories = [],
        activeCategory = null,
        onSelect,
        variant = "default"
    } = options;

    el.classList.add("gui-category-filter", `gui-category-filter-${variant}`);

    // All button
    const allBtn = document.createElement("button");
    allBtn.className = "gui-category-filter-item";
    allBtn.textContent = "All";
    if (!activeCategory) allBtn.classList.add("active");
    allBtn.addEventListener("click", () => {
        setActive(null);
        if (onSelect) onSelect(null);
    });
    el.appendChild(allBtn);

    // Category buttons
    categories.forEach(category => {
        const btn = document.createElement("button");
        btn.className = "gui-category-filter-item";
        btn.textContent = typeof category === "string" ? category : category.label;
        btn.setAttribute("data-category", typeof category === "string" ? category : category.value);
        
        if (activeCategory && (
            (typeof category === "string" && category === activeCategory) ||
            (typeof category === "object" && category.value === activeCategory)
        )) {
            btn.classList.add("active");
        }

        btn.addEventListener("click", () => {
            const value = typeof category === "string" ? category : category.value;
            setActive(value);
            if (onSelect) onSelect(value);
        });

        el.appendChild(btn);
    });

    function setActive(category) {
        el.querySelectorAll(".gui-category-filter-item").forEach(btn => {
            btn.classList.remove("active");
        });
        
        if (category === null) {
            el.querySelector(".gui-category-filter-item").classList.add("active");
        } else {
            const activeBtn = el.querySelector(`[data-category="${category}"]`);
            if (activeBtn) activeBtn.classList.add("active");
        }
    }

    return {
        element: el,
        setActive,
        getActive: () => activeCategory
    };
}

