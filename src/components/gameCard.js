import { card } from './card.js';
import { rating } from './rating.js';
import { badge } from './badge.js';

export function gameCard(selector, options = {}) {
    const {
        title,
        image,
        thumbnail,
        description,
        category,
        rating: ratingValue,
        players,
        playUrl,
        screenshots = [],
        onPlay,
        style = {}
    } = options;

    // Create game card element
    const gameCardEl = document.createElement("div");
    gameCardEl.className = "gui-game-card";

    // Game thumbnail with play overlay
    const thumbnailWrapper = document.createElement("div");
    thumbnailWrapper.className = "gui-game-card-thumbnail";
    
    const img = document.createElement("img");
    img.src = thumbnail || image;
    img.alt = title || "Game";
    thumbnailWrapper.appendChild(img);

    // Play button overlay
    const playOverlay = document.createElement("div");
    playOverlay.className = "gui-game-card-play-overlay";
    const playBtn = document.createElement("button");
    playBtn.className = "gui-game-card-play-btn";
    playBtn.innerHTML = "▶ Play";
    playBtn.onclick = () => {
        if (playUrl) window.open(playUrl, "_blank");
        if (onPlay) onPlay();
    };
    playOverlay.appendChild(playBtn);
    thumbnailWrapper.appendChild(playOverlay);

    gameCardEl.appendChild(thumbnailWrapper);

    // Game info
    const info = document.createElement("div");
    info.className = "gui-game-card-info";

    // Title
    if (title) {
        const titleEl = document.createElement("h3");
        titleEl.className = "gui-game-card-title";
        titleEl.textContent = title;
        info.appendChild(titleEl);
    }

    // Category badge
    if (category) {
        const categoryBadge = document.createElement("span");
        categoryBadge.className = "gui-game-card-category";
        categoryBadge.textContent = category;
        info.appendChild(categoryBadge);
    }

    // Rating
    if (ratingValue !== undefined) {
        const ratingEl = document.createElement("div");
        ratingEl.className = "gui-game-card-rating";
        rating(ratingEl, {
            value: ratingValue,
            max: 5,
            readonly: true,
            size: "small"
        });
        info.appendChild(ratingEl);
    }

    // Description
    if (description) {
        const descEl = document.createElement("p");
        descEl.className = "gui-game-card-description";
        descEl.textContent = description;
        info.appendChild(descEl);
    }

    // Players count
    if (players) {
        const playersEl = document.createElement("span");
        playersEl.className = "gui-game-card-players";
        playersEl.textContent = `👥 ${players}`;
        info.appendChild(playersEl);
    }

    gameCardEl.appendChild(info);

    // Apply to selector if provided
    if (selector) {
        const target = typeof selector === "string" 
            ? document.querySelector(selector) 
            : selector;
        if (target) {
            target.appendChild(gameCardEl);
        }
    }

    return gameCardEl;
}

