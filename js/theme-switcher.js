/**
 * Theme Switcher
 * Handles switching between light and dark themes with localStorage persistence
 */

(function () {
    // Get DOM elements
    const themeToggle = document.getElementById('themeToggle');
    const themeLabel = document.getElementById('themeLabel');
    const html = document.documentElement;

    // Get current theme (already set by inline script in head)
    let currentTheme = html.getAttribute('data-theme') || 'light';

    // Theme configurations
    const themes = {
        light: {
            next: 'dark',
            label: 'Dark Mode'
        },
        dark: {
            next: 'light',
            label: 'Light Mode'
        }
        // Future themes can be added here:
        // tron: {
        //     next: 'borderlands',
        //     label: 'Borderlands Theme'
        // },
        // borderlands: {
        //     next: 'light',
        //     label: 'Light Theme'
        // }
    };

    /**
     * Updates the button label based on the current theme
     * Shows the name of the theme that will be activated on next click
     */
    function updateButtonLabel() {
        const config = themes[currentTheme];
        themeLabel.textContent = config.label;
        themeToggle.setAttribute('aria-label', `Switch to ${config.label.toLowerCase()}`);
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
