import { gameCard } from './gameCard.js';

export function gameGrid(selector, options = {}) {
    const el = document.querySelector(selector);
    if (!el) return;

    const {
        games = [],
        columns = 4,
        gap = "20px",
        onGameClick
    } = options;

    el.classList.add("gui-game-grid");
    el.style.display = "grid";
    el.style.gridTemplateColumns = `repeat(${columns}, 1fr)`;
    el.style.gap = gap;

    function render() {
        el.innerHTML = "";
        games.forEach(game => {
            const card = gameCard(null, {
                ...game,
                onPlay: () => {
                    if (onGameClick) onGameClick(game);
                }
            });
            el.appendChild(card);
        });
    }

    render();

    return {
        element: el,
        setGames: (newGames) => {
            games.length = 0;
            games.push(...newGames);
            render();
        },
        addGame: (game) => {
            games.push(game);
            const card = gameCard(null, {
                ...game,
                onPlay: () => {
                    if (onGameClick) onGameClick(game);
                }
            });
            el.appendChild(card);
        },
        setColumns: (newColumns) => {
            el.style.gridTemplateColumns = `repeat(${newColumns}, 1fr)`;
        }
    };
}

