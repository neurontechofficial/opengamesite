export function fps(options = {}) {
    const {
        position = "top-left",
        x,
        y,
        color = "#0f0",
        background = "rgba(0,0,0,0.5)",
        draggable = false
    } = options;

    const el = document.createElement("div");
    el.className = "gui-fps";
    el.textContent = "FPS: --";

    document.body.appendChild(el);

    // Positioning
    if (x != null && y != null) {
        el.style.left = x + "px";
        el.style.top = y + "px";
    } else {
        el.classList.add(`gui-fps-${position}`);
    }

    el.style.color = color;
    el.style.background = background;

    let last = performance.now();
    let frames = 0;

    function loop(now) {
        frames++;

        if (now - last >= 1000) {
            el.textContent = `FPS: ${frames}`;
            frames = 0;
            last = now;
        }

        requestAnimationFrame(loop);
    }

    requestAnimationFrame(loop);

    // Optional dragging
    if (draggable) makeDraggable(el);

    return el;
}
