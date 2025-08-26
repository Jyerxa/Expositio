import { 
  ThemeConfig, 
  ThemeError, 
  DEFAULT_THEME_CONFIG 
} from './types.js';

export class ThemeManager {
  private currentTheme: ThemeConfig;
  private availableThemes: Map<string, ThemeConfig>;
  private themeStyleElement: HTMLStyleElement | null = null;

  constructor(initialTheme: ThemeConfig = DEFAULT_THEME_CONFIG) {
    this.currentTheme = initialTheme;
    this.availableThemes = new Map();
    this.initializeDefaultThemes();
  }

  private initializeDefaultThemes(): void {
    this.availableThemes.set('starship', {
      name: 'starship',
      variant: 'default'
    });

    this.availableThemes.set('corporate', {
      name: 'corporate',
      variant: 'default'
    });

    this.availableThemes.set('academic', {
      name: 'academic',
      variant: 'default'
    });

    this.availableThemes.set('minimal', {
      name: 'minimal',
      variant: 'default'
    });
  }

  public async setTheme(themeName: string, variant: string = 'default'): Promise<void> {
    if (!this.availableThemes.has(themeName)) {
      throw new ThemeError(`Theme "${themeName}" not found`, { 
        availableThemes: Array.from(this.availableThemes.keys()) 
      });
    }

    const previousTheme = this.currentTheme.name;
    
    try {
      // Update current theme
      this.currentTheme = {
        ...this.availableThemes.get(themeName)!,
        variant
      };

      // Apply theme to DOM
      await this.applyTheme();

      // Emit theme change event
      this.emitThemeChanged(previousTheme, themeName);

    } catch (error) {
      throw new ThemeError(`Failed to apply theme "${themeName}"`, {
        error: error instanceof Error ? error.message : 'Unknown error',
        themeName,
        variant
      });
    }
  }

  private async applyTheme(): Promise<void> {
    const revealElement = document.querySelector('.reveal');
    if (!revealElement) {
      throw new ThemeError('Reveal.js container not found');
    }

    // Remove existing theme classes
    const existingThemeClasses = Array.from(revealElement.classList)
      .filter(className => className.startsWith('theme-'));
    
    existingThemeClasses.forEach(className => {
      revealElement.classList.remove(className);
    });

    // Add new theme class
    const themeClass = `theme-${this.currentTheme.name}`;
    revealElement.classList.add(themeClass);

    // Apply custom properties if defined
    if (this.currentTheme.customProperties) {
      this.applyCustomProperties();
    }

    // All themes are already compiled into the main CSS bundle
    // No need to load separate CSS files
  }

  private applyCustomProperties(): void {
    if (!this.currentTheme.customProperties) return;

    // Remove existing custom properties
    if (this.themeStyleElement) {
      this.themeStyleElement.remove();
    }

    // Create new style element
    this.themeStyleElement = document.createElement('style');
    this.themeStyleElement.setAttribute('data-theme-custom', this.currentTheme.name);

    const cssRules = Object.entries(this.currentTheme.customProperties)
      .map(([property, value]) => `  --${property}: ${value};`)
      .join('\n');

    this.themeStyleElement.textContent = `.reveal.theme-${this.currentTheme.name} {\n${cssRules}\n}`;
    
    document.head.appendChild(this.themeStyleElement);
  }

  private emitThemeChanged(previousTheme: string, currentTheme: string): void {
    const event = new CustomEvent('theme-changed', {
      detail: {
        previousTheme,
        currentTheme
      }
    });
    
    document.dispatchEvent(event);
  }

  public getCurrentTheme(): ThemeConfig {
    return { ...this.currentTheme };
  }

  public getAvailableThemes(): string[] {
    return Array.from(this.availableThemes.keys());
  }

  public registerTheme(themeConfig: ThemeConfig): void {
    if (!themeConfig.name) {
      throw new ThemeError('Theme name is required');
    }

    this.availableThemes.set(themeConfig.name, themeConfig);
  }

  public createThemeVariant(
    baseName: string,
    variantName: string,
    overrides: Partial<ThemeConfig>
  ): void {
    const baseTheme = this.availableThemes.get(baseName);
    if (!baseTheme) {
      throw new ThemeError(`Base theme "${baseName}" not found`);
    }

    const variantTheme: ThemeConfig = {
      ...baseTheme,
      ...overrides,
      name: `${baseName}-${variantName}`,
      variant: variantName
    };

    this.availableThemes.set(variantTheme.name, variantTheme);
  }

  public preloadThemes(themeNames: string[]): Promise<void[]> {
    const loadPromises = themeNames.map(async (themeName) => {
      if (!this.availableThemes.has(themeName)) {
        throw new ThemeError(`Cannot preload unknown theme: ${themeName}`);
      }

      try {
        const link = document.createElement('link');
        link.rel = 'preload';
        link.as = 'style';
        link.href = `${this.themeBasePath}${themeName}/theme.css`;
        document.head.appendChild(link);
      } catch (error) {
        console.warn(`Failed to preload theme ${themeName}:`, error);
      }
    });

    return Promise.all(loadPromises);
  }

  public destroy(): void {
    if (this.themeStyleElement) {
      this.themeStyleElement.remove();
      this.themeStyleElement = null;
    }

    // Remove all theme-specific stylesheets
    const themeLinks = document.querySelectorAll('link[data-theme]');
    themeLinks.forEach(link => link.remove());
  }
}

export const createThemeConfig = (
  name: string,
  variant: string = 'default',
  customProperties?: Record<string, string>
): ThemeConfig => {
  const config: ThemeConfig = {
    name,
    variant
  };
  
  if (customProperties) {
    config.customProperties = customProperties;
  }
  
  return config;
};

export const THEME_PRESETS = {
  starship: createThemeConfig('starship', 'default'),
  starshipDark: createThemeConfig('starship', 'dark'),
  
  corporate: createThemeConfig('corporate', 'default'),
  corporateBlue: createThemeConfig('corporate', 'blue', {
    'primary-color': '#1e40af',
    'secondary-color': '#3b82f6'
  }),
  
  academic: createThemeConfig('academic', 'default'),
  academicTraditional: createThemeConfig('academic', 'traditional', {
    'primary-color': '#1e3a8a',
    'secondary-color': '#7c2d12'
  }),
  
  minimal: createThemeConfig('minimal', 'default'),
  minimalDark: createThemeConfig('minimal', 'dark', {
    'background-primary': '#000000',
    'text-primary': '#ffffff'
  })
};