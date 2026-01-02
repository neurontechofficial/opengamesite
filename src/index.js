// src/index.js

// Core components
import { button } from './button.js';
import { fps } from './fps.js';

// UI Components
import { card } from './components/card.js';
import { modal } from './components/modal.js';
import { navbar } from './components/navbar.js';
import { search } from './components/search.js';
import { badge } from './components/badge.js';
import { loading } from './components/loading.js';
import { tooltip } from './components/tooltip.js';
import { dropdown } from './components/dropdown.js';
import { tabs } from './components/tabs.js';
import { progress } from './components/progress.js';
import { rating } from './components/rating.js';
import { avatar } from './components/avatar.js';
import { pagination } from './components/pagination.js';
import { carousel } from './components/carousel.js';

// Game-specific components
import { gameCard } from './components/gameCard.js';
import { categoryFilter } from './components/categoryFilter.js';
import { gameGrid } from './components/gameGrid.js';

// Form components
import { input } from './components/input.js';
import { select } from './components/select.js';
import { checkbox } from './components/checkbox.js';
import { radio } from './components/radio.js';

// Layout components
import { container } from './layout/container.js';
import { grid } from './layout/grid.js';
import { flex } from './layout/flex.js';

// Utilities
import { makeDraggable } from './utils/draggable.js';
import { applyStyles } from './utils/style.js';

// Import styles
import './styles.css';

// For CDN users, attach to global
if (typeof window !== 'undefined') {
    window.OpenGameSite = {
        // Core
        button,
        fps,
        
        // UI Components
        card,
        modal,
        navbar,
        search,
        badge,
        loading,
        tooltip,
        dropdown,
        tabs,
        progress,
        rating,
        avatar,
        pagination,
        carousel,
        
        // Game-specific
        gameCard,
        categoryFilter,
        gameGrid,
        
        // Forms
        input,
        select,
        checkbox,
        radio,
        
        // Layout
        container,
        grid,
        flex,
        
        // Utilities
        makeDraggable,
        applyStyles
    };
    
    // Also expose as 'ui' for backward compatibility
    window.ui = window.OpenGameSite;
}

// For npm/ESM users
export {
    // Core
    button,
    fps,
    
    // UI Components
    card,
    modal,
    navbar,
    search,
    badge,
    loading,
    tooltip,
    dropdown,
    tabs,
    progress,
    rating,
    avatar,
    pagination,
    carousel,
    
    // Game-specific
    gameCard,
    categoryFilter,
    gameGrid,
    
    // Forms
    input,
    select,
    checkbox,
    radio,
    
    // Layout
    container,
    grid,
    flex,
    
    // Utilities
    makeDraggable,
    applyStyles
};
