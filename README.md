# OpenGameSite UI Kit

A comprehensive, modern UI kit designed specifically for building beautiful online games websites. Built with vanilla JavaScript, zero dependencies, and fully customizable.

## Features

- 🎮 **Game-Specific Components** - Game cards, category filters, game grids
- 🎨 **Modern Design** - Beautiful, responsive components with smooth animations
- 🌙 **Dark Mode Support** - Built-in theme system with CSS variables
- 📱 **Fully Responsive** - Mobile-first design that works on all devices
- ⚡ **Zero Dependencies** - Pure vanilla JavaScript, no framework required
- 🎯 **Easy to Use** - Simple API, works with CDN or npm
- ♿ **Accessible** - ARIA labels and keyboard navigation support
- 🎨 **Customizable** - Extensive CSS variables for theming

## Installation

### CDN

```html
<link rel="stylesheet" href="https://cdn.jsdelivr.net/npm/opengamesite/dist/opengamesite.css">
<script src="https://cdn.jsdelivr.net/npm/opengamesite/dist/opengamesite.umd.cjs"></script>
```

### npm

```bash
npm install opengamesite
```

```javascript
import { button, gameCard, modal } from 'opengamesite';
import 'opengamesite/styles';
```

## Quick Start

### Button

```javascript
import { button } from 'opengamesite';

button('#my-button', {
    variant: 'primary',
    icon: '/path/to/icon.png',
    style: {
        accent: '#ff4040'
    }
});
```

### Game Card

```javascript
import { gameCard } from 'opengamesite';

gameCard('#game-container', {
    title: 'Super Adventure',
    thumbnail: '/games/super-adventure.jpg',
    description: 'An epic adventure game',
    category: 'Adventure',
    rating: 4.5,
    players: '1M+',
    playUrl: '/play/super-adventure',
    onPlay: () => {
        console.log('Game started!');
    }
});
```

### Modal

```javascript
import { modal } from 'opengamesite';

const myModal = modal({
    title: 'Game Info',
    content: '<p>Welcome to the game!</p>',
    size: 'medium',
    onClose: () => {
        console.log('Modal closed');
    }
});
```

## Components

### Core Components

- **Button** - Multiple variants (primary, secondary, outline, ghost)
- **Card** - Flexible card component with image, title, description, footer
- **Modal** - Dialog/modal with backdrop, animations, and keyboard support
- **Navbar** - Responsive navigation bar with mobile menu
- **Search** - Search input with debouncing and icon support
- **Badge** - Labels and tags with multiple variants
- **Loading** - Spinner, dots, and pulse loading indicators
- **Tooltip** - Positioned tooltips with multiple positions
- **Dropdown** - Dropdown menus with searchable option
- **Tabs** - Tab navigation component
- **Progress** - Progress bars with animations
- **Rating** - Star rating component (readonly or interactive)
- **Avatar** - User avatars with status indicators
- **Pagination** - Page navigation component
- **Carousel** - Image/content carousel with controls

### Game-Specific Components

- **GameCard** - Specialized card for games with play button overlay
- **CategoryFilter** - Filter buttons for game categories
- **GameGrid** - Responsive grid layout for game listings

### Form Components

- **Input** - Text inputs with labels, icons, validation
- **Select** - Dropdown selects with searchable option
- **Checkbox** - Checkbox inputs with labels
- **Radio** - Radio button groups

### Layout Components

- **Container** - Responsive container with max-width
- **Grid** - CSS Grid layout helper
- **Flex** - Flexbox layout helper

### Utilities

- **FPS Counter** - Performance monitoring
- **Draggable** - Make elements draggable
- **applyStyles** - Apply CSS variable styles

## Theming

The UI kit uses CSS variables for easy theming:

```css
:root {
    --gui-primary: #ff4040;
    --gui-primary-dark: #c81f1f;
    --gui-bg: #ffffff;
    --gui-text: #212529;
    --gui-radius: 10px;
    /* ... and many more */
}
```

### Dark Mode

Enable dark mode by adding the `data-theme="dark"` attribute or `.dark-mode` class:

```html
<html data-theme="dark">
```

## Examples

### Game Listing Page

```javascript
import { gameGrid, categoryFilter, navbar, search } from 'opengamesite';

// Navbar
navbar('#navbar', {
    brand: 'GameSite',
    items: [
        { label: 'Home', href: '/' },
        { label: 'Games', href: '/games' },
        { label: 'About', href: '/about' }
    ]
});

// Search
search('#search', {
    placeholder: 'Search games...',
    onSearch: (query) => {
        console.log('Searching for:', query);
    }
});

// Category Filter
categoryFilter('#categories', {
    categories: ['Action', 'Adventure', 'Puzzle', 'Racing'],
    onSelect: (category) => {
        console.log('Selected:', category);
    }
});

// Game Grid
gameGrid('#games', {
    games: [
        {
            title: 'Super Game',
            thumbnail: '/game1.jpg',
            category: 'Action',
            rating: 4.5
        },
        // ... more games
    ],
    columns: 4,
    onGameClick: (game) => {
        console.log('Clicked:', game);
    }
});
```

### Modal with Form

```javascript
import { modal, input, button } from 'opengamesite';

const formModal = modal({
    title: 'Login',
    content: document.createElement('div'),
    size: 'small'
});

const emailInput = input(formModal.element.querySelector('.gui-modal-body'), {
    label: 'Email',
    type: 'email',
    placeholder: 'Enter your email'
});

const passwordInput = input(formModal.element.querySelector('.gui-modal-body'), {
    label: 'Password',
    type: 'password',
    placeholder: 'Enter your password'
});
```

## Browser Support

- Chrome (latest)
- Firefox (latest)
- Safari (latest)
- Edge (latest)

## License

GPL-3.0-or-later

## Contributing

Contributions are welcome! Please feel free to submit a Pull Request.

## Author

Neuron Technologies

