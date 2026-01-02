export function dropdown(selector, options = {}) {
    const trigger = typeof selector === "string" 
        ? document.querySelector(selector) 
        : selector;
    
    if (!trigger) return;

    const {
        items = [],
        position = "bottom-left",
        onSelect,
        multiple = false,
        searchable = false
    } = options;

    trigger.classList.add("gui-dropdown-trigger");

    const menu = document.createElement("div");
    menu.className = `gui-dropdown-menu gui-dropdown-${position}`;
    menu.setAttribute("role", "menu");

    // Search input if searchable
    if (searchable) {
        const searchInput = document.createElement("input");
        searchInput.type = "text";
        searchInput.className = "gui-dropdown-search";
        searchInput.placeholder = "Search...";
        menu.appendChild(searchInput);

        searchInput.addEventListener("input", (e) => {
            const query = e.target.value.toLowerCase();
            Array.from(menu.querySelectorAll(".gui-dropdown-item")).forEach(item => {
                const text = item.textContent.toLowerCase();
                item.style.display = text.includes(query) ? "" : "none";
            });
        });
    }

    // Menu items
    items.forEach((item, index) => {
        if (item === "divider") {
            const divider = document.createElement("div");
            divider.className = "gui-dropdown-divider";
            menu.appendChild(divider);
            return;
        }

        const menuItem = document.createElement("div");
        menuItem.className = "gui-dropdown-item";
        menuItem.setAttribute("role", "menuitem");
        menuItem.setAttribute("data-index", index);

        if (item.icon) {
            const icon = document.createElement("span");
            icon.className = "gui-dropdown-item-icon";
            if (typeof item.icon === "string") {
                icon.textContent = item.icon;
            } else {
                icon.appendChild(item.icon);
            }
            menuItem.appendChild(icon);
        }

        const label = document.createElement("span");
        label.className = "gui-dropdown-item-label";
        label.textContent = item.label || item;
        menuItem.appendChild(label);

        if (item.disabled) {
            menuItem.classList.add("disabled");
        } else {
            menuItem.addEventListener("click", (e) => {
                e.stopPropagation();
                if (onSelect) onSelect(item, index);
                if (!multiple) close();
            });
        }

        menu.appendChild(menuItem);
    });

    document.body.appendChild(menu);

    let isOpen = false;

    function open() {
        if (isOpen) return;
        isOpen = true;
        menu.classList.add("gui-dropdown-open");
        updatePosition();
        document.addEventListener("click", handleOutsideClick);
    }

    function close() {
        if (!isOpen) return;
        isOpen = false;
        menu.classList.remove("gui-dropdown-open");
        document.removeEventListener("click", handleOutsideClick);
    }

    function toggle() {
        if (isOpen) close();
        else open();
    }

    function updatePosition() {
        const triggerRect = trigger.getBoundingClientRect();
        const menuRect = menu.getBoundingClientRect();
        const scrollTop = window.pageYOffset || document.documentElement.scrollTop;
        const scrollLeft = window.pageXOffset || document.documentElement.scrollLeft;

        let top, left;

        if (position.includes("bottom")) {
            top = triggerRect.bottom + scrollTop + 4;
        } else {
            top = triggerRect.top + scrollTop - menuRect.height - 4;
        }

        if (position.includes("right")) {
            left = triggerRect.right + scrollLeft - menuRect.width;
        } else {
            left = triggerRect.left + scrollLeft;
        }

        menu.style.top = `${top}px`;
        menu.style.left = `${left}px`;
    }

    function handleOutsideClick(e) {
        if (!menu.contains(e.target) && !trigger.contains(e.target)) {
            close();
        }
    }

    trigger.addEventListener("click", (e) => {
        e.stopPropagation();
        toggle();
    });

    // Close on Escape
    document.addEventListener("keydown", (e) => {
        if (e.key === "Escape" && isOpen) {
            close();
        }
    });

    return {
        element: menu,
        open,
        close,
        toggle,
        updateItems: (newItems) => {
            menu.innerHTML = "";
            options.items = newItems;
            // Rebuild menu items
        }
    };
}

