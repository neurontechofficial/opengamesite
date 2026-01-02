export function tabs(selector, options = {}) {
    const el = document.querySelector(selector);
    if (!el) return;

    const {
        items = [],
        activeIndex = 0,
        variant = "default",
        onChange
    } = options;

    el.classList.add("gui-tabs", `gui-tabs-${variant}`);

    const tabList = document.createElement("div");
    tabList.className = "gui-tabs-list";
    tabList.setAttribute("role", "tablist");

    const tabPanels = document.createElement("div");
    tabPanels.className = "gui-tabs-panels";

    let currentActive = activeIndex;

    items.forEach((item, index) => {
        // Tab button
        const tab = document.createElement("button");
        tab.className = "gui-tab";
        tab.setAttribute("role", "tab");
        tab.setAttribute("aria-selected", index === activeIndex);
        tab.setAttribute("aria-controls", `tab-panel-${index}`);
        tab.id = `tab-${index}`;
        tab.textContent = item.label || item;

        if (item.icon) {
            const icon = document.createElement("span");
            icon.className = "gui-tab-icon";
            if (typeof item.icon === "string") {
                icon.textContent = item.icon;
            } else {
                icon.appendChild(item.icon);
            }
            tab.insertBefore(icon, tab.firstChild);
        }

        tab.addEventListener("click", () => {
            setActive(index);
        });

        tabList.appendChild(tab);

        // Tab panel
        const panel = document.createElement("div");
        panel.className = "gui-tab-panel";
        panel.setAttribute("role", "tabpanel");
        panel.id = `tab-panel-${index}`;
        panel.setAttribute("aria-labelledby", `tab-${index}`);
        panel.hidden = index !== activeIndex;

        if (typeof item.content === "string") {
            panel.innerHTML = item.content;
        } else if (item.content instanceof HTMLElement) {
            panel.appendChild(item.content);
        }

        tabPanels.appendChild(panel);
    });

    el.appendChild(tabList);
    el.appendChild(tabPanels);

    function setActive(index) {
        if (index === currentActive) return;

        // Update previous
        const prevTab = tabList.children[currentActive];
        const prevPanel = tabPanels.children[currentActive];
        prevTab.classList.remove("active");
        prevTab.setAttribute("aria-selected", "false");
        prevPanel.hidden = true;

        // Update new
        currentActive = index;
        const newTab = tabList.children[index];
        const newPanel = tabPanels.children[index];
        newTab.classList.add("active");
        newTab.setAttribute("aria-selected", "true");
        newPanel.hidden = false;

        if (onChange) onChange(index, items[index]);
    }

    // Set initial active
    setActive(activeIndex);

    return {
        element: el,
        setActive,
        getActive: () => currentActive
    };
}

