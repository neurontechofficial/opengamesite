export function applyStyles(el, styles) {
    if (styles.accent) el.style.setProperty("--gui-accent", styles.accent);
    if (styles.radius) el.style.setProperty("--gui-radius", styles.radius);
    if (styles.bg) el.style.setProperty("--gui-bg", styles.bg);
}
