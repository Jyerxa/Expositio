/**
 * Professional Presentation Template System
 * Main TypeScript Entry Point
 * 
 * @version 2.0.0
 * @author Professional Presentation Template
 */

// Import styles
import '../styles/main.scss';

// Import types and configurations
import { PresentationConfig } from './config/types';
import { createRevealConfig } from './config/reveal-config';
import { initializeCharts } from './plugins/chart-integration';
import { initializeThemeSystem } from './plugins/theme-switcher';
import { initializeAccessibility } from './utils/accessibility';
import { initializePerformanceMonitoring } from './utils/performance';

// Import Reveal.js and plugins
import Reveal from 'reveal.js';
import Markdown from 'reveal.js/plugin/markdown/markdown.esm.js';
import Highlight from 'reveal.js/plugin/highlight/highlight.esm.js';
import Notes from 'reveal.js/plugin/notes/notes.esm.js';
import Zoom from 'reveal.js/plugin/zoom/zoom.esm.js';
import Search from 'reveal.js/plugin/search/search.esm.js';

// Global constants
const VERSION: string = (typeof __VERSION__ !== 'undefined' && __VERSION__) || '2.0.0';
const IS_DEV: boolean = typeof __DEV__ !== 'undefined' ? __DEV__ : false;

// Logger utility
const logger = {
  info: (message: string, ...args: unknown[]) => {
    if (IS_DEV) {
      console.log(`[PresentationTemplate v${VERSION}] ${message}`, ...args);
    }
  },
  warn: (message: string, ...args: unknown[]) => {
    console.warn(`[PresentationTemplate v${VERSION}] ${message}`, ...args);
  },
  error: (message: string, ...args: unknown[]) => {
    console.error(`[PresentationTemplate v${VERSION}] ${message}`, ...args);
  }
};

/**
 * Main PresentationTemplate class
 */
class PresentationTemplate {
  private reveal: typeof Reveal | null = null;
  private config: PresentationConfig;
  private isInitialized = false;

  constructor(config: Partial<PresentationConfig> = {}) {
    this.config = this.mergeConfig(config);
    logger.info('PresentationTemplate initialized with config:', this.config);
  }

  /**
   * Initialize the presentation system
   */
  async initialize(): Promise<void> {
    if (this.isInitialized) {
      logger.warn('Presentation already initialized');
      return;
    }

    try {
      logger.info('Starting presentation initialization...');

      // Initialize performance monitoring
      if (this.config.features.performanceMonitoring) {
        initializePerformanceMonitoring();
      }

      // Initialize accessibility features
      if (this.config.features.accessibility) {
        initializeAccessibility();
      }

      // Initialize theme system
      if (this.config.features.themeSystem) {
        initializeThemeSystem(this.config.theme);
      }

      // Create Reveal.js configuration
      const revealConfig = createRevealConfig(this.config);

      // Initialize Reveal.js
      this.reveal = Reveal.initialize({
        ...revealConfig,
        plugins: [
          Markdown,
          Highlight,
          Notes,
          Zoom,
          Search
        ]
      });

      // Wait for Reveal.js to be ready
      await new Promise<void>((resolve) => {
        Reveal.on('ready', () => {
          logger.info('Reveal.js ready');
          resolve();
        });
      });

      // Initialize charts if enabled
      if (this.config.features.charts) {
        await initializeCharts(this.config.chart);
      }

      // Set up custom event listeners
      this.setupEventListeners();

      // Set up custom keyboard shortcuts
      this.setupKeyboardShortcuts();

      this.isInitialized = true;
      logger.info('Presentation initialization complete');

      // Emit ready event
      this.emit('presentationReady', {
        version: VERSION,
        config: this.config
      });

    } catch (error) {
      logger.error('Failed to initialize presentation:', error);
      throw error;
    }
  }

  /**
   * Get the current Reveal.js instance
   */
  getReveal(): typeof Reveal | null {
    return this.reveal;
  }

  /**
   * Get the current configuration
   */
  getConfig(): PresentationConfig {
    return { ...this.config };
  }

  /**
   * Update configuration
   */
  updateConfig(newConfig: Partial<PresentationConfig>): void {
    this.config = this.mergeConfig(newConfig);
    logger.info('Configuration updated:', this.config);
  }

  /**
   * Switch to a different theme
   */
  switchTheme(themeName: string): void {
    if (this.config.features.themeSystem) {
      this.config.theme.name = themeName;
      initializeThemeSystem(this.config.theme);
      logger.info(`Switched to theme: ${themeName}`);
    } else {
      logger.warn('Theme system is disabled');
    }
  }

  /**
   * Destroy the presentation instance
   */
  destroy(): void {
    if (this.reveal) {
      // Remove event listeners
      Reveal.off('slidechanged');
      Reveal.off('ready');

      // Destroy Reveal.js
      // Note: Reveal.js doesn't have a native destroy method
      // This is a placeholder for cleanup logic

      this.reveal = null;
      this.isInitialized = false;
      logger.info('Presentation destroyed');
    }
  }

  /**
   * Emit custom events
   */
  private emit(eventName: string, data?: unknown): void {
    const event = new CustomEvent(`presentation:${eventName}`, {
      detail: data
    });
    window.dispatchEvent(event);
  }

  /**
   * Merge configuration with defaults
   */
  private mergeConfig(config: Partial<PresentationConfig>): PresentationConfig {
    const defaultConfig: PresentationConfig = {
      theme: {
        name: 'starship',
        variant: 'default'
      },
      metadata: {
        title: 'My Presentation',
        author: 'Author Name',
        description: 'A professional presentation'
      },
      features: {
        navigation: true,
        progress: true,
        slideNumbers: true,
        speakerNotes: false,
        overview: true,
        zoom: true,
        charts: false,
        themeSystem: true,
        accessibility: true,
        performanceMonitoring: IS_DEV
      },
      reveal: {
        controls: true,
        progress: true,
        slideNumber: true,
        history: true,
        keyboard: true,
        overview: true,
        center: true,
        touch: true,
        loop: false,
        rtl: false,
        shuffle: false,
        fragments: true,
        embedded: false,
        help: true,
        showNotes: false,
        autoPlayMedia: null,
        autoSlide: 0,
        autoSlideStoppable: true,
        mouseWheel: false,
        hideAddressBar: true,
        previewLinks: false,
        transition: 'slide',
        transitionSpeed: 'default',
        backgroundTransition: 'fade',
        viewDistance: 3,
        display: 'block'
      },
      chart: {
        provider: 'chartjs',
        globalOptions: {
          responsive: true,
          maintainAspectRatio: true
        }
      }
    };

    return this.deepMerge(defaultConfig, config);
  }

  /**
   * Deep merge utility
   */
  private deepMerge<T>(target: T, source: Partial<T>): T {
    const result = { ...target };

    for (const key in source) {
      if (source[key] && typeof source[key] === 'object' && !Array.isArray(source[key])) {
        result[key] = this.deepMerge(result[key], source[key]!);
      } else {
        result[key] = source[key]!;
      }
    }

    return result;
  }

  /**
   * Set up event listeners
   */
  private setupEventListeners(): void {
    if (!this.reveal) return;

    // Slide change events
    Reveal.on('slidechanged', (event: { previousSlide: Element; currentSlide: Element; indexh: number; indexv: number }) => {
      logger.info(`Slide changed to: ${event.indexh}.${event.indexv}`);

      this.emit('slideChanged', {
        previousSlide: event.previousSlide,
        currentSlide: event.currentSlide,
        indexh: event.indexh,
        indexv: event.indexv
      });
    });

    // Fragment events
    Reveal.on('fragmentshown', (event: { fragment: Element }) => {
      logger.info('Fragment shown');
      this.emit('fragmentShown', { fragment: event.fragment });
    });

    Reveal.on('fragmenthidden', (event: { fragment: Element }) => {
      logger.info('Fragment hidden');
      this.emit('fragmentHidden', { fragment: event.fragment });
    });
  }

  /**
   * Set up custom keyboard shortcuts
   */
  private setupKeyboardShortcuts(): void {
    if (!this.reveal) return;

    // Custom keyboard shortcuts
    Reveal.addKeyBinding(
      { keyCode: 72, key: 'H', description: 'Go to first slide' },
      () => {
        Reveal.slide(0, 0);
        logger.info('Navigated to first slide via keyboard shortcut');
      }
    );

    // Theme switcher shortcut (T key)
    if (this.config.features.themeSystem) {
      Reveal.addKeyBinding(
        { keyCode: 84, key: 'T', description: 'Toggle theme' },
        () => {
          // Cycle through available themes
          const themes = ['starship', 'corporate', 'academic', 'minimal'];
          const currentIndex = themes.indexOf(this.config.theme.name);
          const nextIndex = (currentIndex + 1) % themes.length;
          this.switchTheme(themes[nextIndex] as string);
        }
      );
    }
  }
}

/**
 * Auto-initialize presentation if DOM is ready
 */
function autoInitialize(): void {
  // Check if we're in a browser environment
  if (typeof window === 'undefined' || typeof document === 'undefined') {
    return;
  }

  // Get configuration from data attributes or window object
  const config = getConfigFromDOM();

  // Create and initialize presentation
  const presentation = new PresentationTemplate(config);

  // Initialize when DOM is ready
  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', () => {
      presentation.initialize().catch(error => {
        logger.error('Auto-initialization failed:', error);
      });
    });
  } else {
    presentation.initialize().catch(error => {
      logger.error('Auto-initialization failed:', error);
    });
  }

  // Make presentation available globally for debugging
  if (IS_DEV) {
    (window as any).presentationTemplate = presentation;
  }
}

/**
 * Get configuration from DOM data attributes or window object
 */
function getConfigFromDOM(): Partial<PresentationConfig> {
  const config: Partial<PresentationConfig> = {};

  // Check for global configuration
  if (typeof window !== 'undefined' && (window as any).PRESENTATION_CONFIG) {
    Object.assign(config, (window as any).PRESENTATION_CONFIG);
  }

  // Check reveal container for data attributes
  const revealElement = document.querySelector('.reveal');
  if (revealElement instanceof HTMLElement) {
    const dataset = revealElement.dataset;

    if (dataset.theme) {
      config.theme = { name: dataset.theme, variant: 'default' };
    }

    if (dataset.title) {
      config.metadata = {
        title: dataset.title,
        author: (config.metadata && (config.metadata as any).author) || 'Author',
        description: (config.metadata && (config.metadata as any).description) || ''
      } as any;
    }
  }

  return config;
}

// Auto-initialize if not in module context
if (typeof window !== 'undefined' && !window.module) {
  autoInitialize();
}

// Export for module usage
export { PresentationTemplate, VERSION };
export default PresentationTemplate;

// Log initialization
logger.info(`Professional Presentation Template v${VERSION} loaded`);
logger.info(`Environment: ${IS_DEV ? 'development' : 'production'}`);