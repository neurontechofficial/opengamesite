export function button(selector, options = {}) {
    const el = document.querySelector(selector);
    if (!el) return;
    const {
        variant = 'default',
    } = options;
}