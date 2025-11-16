/**
 * Theme Switcher
 * Handles cycling between multiple themes with localStorage persistence
 * Cycle order: Light → Dark → Tron → Borderlands → Light...
 */

(function () {
    // Get DOM elements
    const themeToggle = document.getElementById('themeToggle');
    const themeLabel = document.getElementById('themeLabel');
    const html = document.documentElement;

    // Get current theme (already set by inline script in head)
    let currentTheme = html.getAttribute('data-theme') || 'light';

    // Theme configurations - defines the cycle order and button labels
    // Each theme's 'next' property points to the next theme in the cycle
    // Each theme's 'label' property shows the current active theme name
    const themes = {
        light: {
            next: 'dark',
            label: 'Light'
        },
        dark: {
            next: 'tron',
            label: 'Dark'
        },
        tron: {
            next: 'borderlands',
            label: 'Neon'
        },
        borderlands: {
            next: 'light',
            label: 'Desert'
        }
    };

    /**
     * Updates the button label based on the current theme
     * Shows the name of the currently active theme
     */
    function updateButtonLabel() {
        const config = themes[currentTheme];

        // If theme not found in config, default to light theme
        if (!config) {
            currentTheme = 'light';
            setTheme('light');
            return;
        }

        themeLabel.textContent = config.label;
        themeToggle.setAttribute('aria-label', `Current theme: ${config.label}. Click to cycle themes.`);
    }

    /**
     * Switches to a new theme
     * @param {string} newTheme - The theme to switch to
     */
    function setTheme(newTheme) {
        // Update DOM
        html.setAttribute('data-theme', newTheme);

        // Save to localStorage
        localStorage.setItem('theme', newTheme);

        // Update current theme
        currentTheme = newTheme;

        // Update button label
        updateButtonLabel();
    }

    /**
     * Toggles between themes
     */
    function toggleTheme() {
        const config = themes[currentTheme];
        const newTheme = config.next;
        setTheme(newTheme);
    }

    // Initialize button label on page load
    updateButtonLabel();

    // Add click event listener
    themeToggle.addEventListener('click', toggleTheme);

    // Add keyboard support (Enter and Space keys)
    themeToggle.addEventListener('keydown', (event) => {
        if (event.key === 'Enter' || event.key === ' ') {
            event.preventDefault();
            toggleTheme();
        }
    });
})();
