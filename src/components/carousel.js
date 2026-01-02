export function carousel(selector, options = {}) {
    const el = document.querySelector(selector);
    if (!el) return;

    const {
        items = [],
        autoplay = false,
        interval = 3000,
        showIndicators = true,
        showControls = true,
        loop = true,
        onChange
    } = options;

    el.classList.add("gui-carousel");

    const track = document.createElement("div");
    track.className = "gui-carousel-track";

    const slides = [];
    items.forEach((item, index) => {
        const slide = document.createElement("div");
        slide.className = "gui-carousel-slide";
        slide.hidden = index !== 0;

        if (typeof item === "string") {
            slide.innerHTML = item;
        } else if (item instanceof HTMLElement) {
            slide.appendChild(item);
        } else if (item.image) {
            const img = document.createElement("img");
            img.src = item.image;
            img.alt = item.alt || "";
            slide.appendChild(img);
            if (item.caption) {
                const caption = document.createElement("div");
                caption.className = "gui-carousel-caption";
                caption.textContent = item.caption;
                slide.appendChild(caption);
            }
        }

        track.appendChild(slide);
        slides.push(slide);
    });

    el.appendChild(track);

    // Indicators
    if (showIndicators && items.length > 1) {
        const indicators = document.createElement("div");
        indicators.className = "gui-carousel-indicators";
        items.forEach((_, index) => {
            const indicator = document.createElement("button");
            indicator.className = "gui-carousel-indicator";
            indicator.setAttribute("aria-label", `Go to slide ${index + 1}`);
            if (index === 0) indicator.classList.add("active");
            indicator.addEventListener("click", () => goTo(index));
            indicators.appendChild(indicator);
        });
        el.appendChild(indicators);
    }

    // Controls
    if (showControls && items.length > 1) {
        const prevBtn = document.createElement("button");
        prevBtn.className = "gui-carousel-control gui-carousel-prev";
        prevBtn.innerHTML = "‹";
        prevBtn.setAttribute("aria-label", "Previous slide");
        prevBtn.addEventListener("click", () => prev());

        const nextBtn = document.createElement("button");
        nextBtn.className = "gui-carousel-control gui-carousel-next";
        nextBtn.innerHTML = "›";
        nextBtn.setAttribute("aria-label", "Next slide");
        nextBtn.addEventListener("click", () => next());

        el.appendChild(prevBtn);
        el.appendChild(nextBtn);
    }

    let currentIndex = 0;
    let autoplayInterval;

    function goTo(index) {
        if (index < 0 || index >= items.length) {
            if (!loop) return;
            index = index < 0 ? items.length - 1 : 0;
        }

        slides[currentIndex].hidden = true;
        if (showIndicators) {
            const indicators = el.querySelectorAll(".gui-carousel-indicator");
            if (indicators[currentIndex]) indicators[currentIndex].classList.remove("active");
        }

        currentIndex = index;

        slides[currentIndex].hidden = false;
        if (showIndicators) {
            const indicators = el.querySelectorAll(".gui-carousel-indicator");
            if (indicators[currentIndex]) indicators[currentIndex].classList.add("active");
        }

        if (onChange) onChange(currentIndex, items[currentIndex]);
    }

    function next() {
        goTo(currentIndex + 1);
    }

    function prev() {
        goTo(currentIndex - 1);
    }

    function startAutoplay() {
        if (autoplay && items.length > 1) {
            autoplayInterval = setInterval(next, interval);
        }
    }

    function stopAutoplay() {
        if (autoplayInterval) {
            clearInterval(autoplayInterval);
            autoplayInterval = null;
        }
    }

    if (autoplay) {
        startAutoplay();
        el.addEventListener("mouseenter", stopAutoplay);
        el.addEventListener("mouseleave", startAutoplay);
    }

    return {
        element: el,
        goTo,
        next,
        prev,
        getCurrent: () => currentIndex,
        startAutoplay,
        stopAutoplay
    };
}

