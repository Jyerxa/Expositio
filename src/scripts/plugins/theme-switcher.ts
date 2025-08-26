import type { ThemeConfig } from '../config/types';

/**
 * Initialize and manage the theme system
 * Handles theme switching, persistence, and application
 */
export function initializeThemeSystem(theme: ThemeConfig): void {
    // Get the reveal container
    const revealElement = document.querySelector('.reveal');
    if (!revealElement) {
        console.warn('Reveal container not found, theme system cannot initialize');
        return;
    }

    // Apply the theme
    applyTheme(revealElement as HTMLElement, theme.name);
    
    // Store theme preference
    storeThemePreference(theme.name);
    
    // Set up theme data attributes
    revealElement.setAttribute('data-theme', theme.name);
    
    // Apply custom colors if provided
    if (theme.customColors) {
        applyCustomColors(revealElement as HTMLElement, theme.customColors);
    }
}

/**
 * Apply theme class to the reveal container
 */
function applyTheme(element: HTMLElement, themeName: string): void {
    // Remove all existing theme classes
    const themeClasses = ['theme-starship', 'theme-corporate', 'theme-academic', 'theme-minimal'];
    themeClasses.forEach(className => {
        element.classList.remove(className);
    });
    
    // Add the new theme class
    const themeClass = `theme-${themeName}`;
    element.classList.add(themeClass);
    
    // Dispatch custom event for theme change
    const event = new CustomEvent('themeChanged', {
        detail: { theme: themeName }
    });
    document.dispatchEvent(event);
}

/**
 * Store theme preference in localStorage
 */
function storeThemePreference(themeName: string): void {
    try {
        localStorage.setItem('expositio-theme', themeName);
    } catch (error) {
        console.warn('Could not save theme preference:', error);
    }
}

/**
 * Get stored theme preference
 */
export function getStoredTheme(): string | null {
    try {
        return localStorage.getItem('expositio-theme');
    } catch (error) {
        console.warn('Could not retrieve theme preference:', error);
        return null;
    }
}

/**
 * Apply custom colors to CSS custom properties
 */
function applyCustomColors(element: HTMLElement, colors: Record<string, string>): void {
    Object.entries(colors).forEach(([key, value]) => {
        // Convert camelCase to kebab-case for CSS custom properties
        const cssVarName = `--${key.replace(/([A-Z])/g, '-$1').toLowerCase()}`;
        element.style.setProperty(cssVarName, value);
    });
}

/**
 * Get list of available themes
 */
export function getAvailableThemes(): string[] {
    return ['starship', 'corporate', 'academic', 'minimal'];
}

/**
 * Check if a theme exists
 */
export function isValidTheme(themeName: string): boolean {
    return getAvailableThemes().includes(themeName);
}


