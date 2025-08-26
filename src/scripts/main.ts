/**
 * Professional Presentation Template System
 * Main TypeScript Entry Point
 * 
 * @version 3.0.0
 * @author Professional Presentation Template
 */

// Import styles
import '../styles/main.scss';

// Import types and configurations
import { 
  PresentationConfig, 
  DEFAULT_FEATURE_FLAGS, 
  DEFAULT_EXPORT_CONFIG,
  DEFAULT_CHART_CONFIG,
  DEFAULT_CODE_CONFIG,
  PerformanceMetrics
} from './config/types.js';
import { RevealConfigManager } from './config/reveal-config.js';
import { ThemeManager } from './config/theme-config.js';
import { ChartConfigManager } from './config/chart-config.js';

// Import Reveal.js and plugins
import Reveal from 'reveal.js';
import Markdown from 'reveal.js/plugin/markdown/markdown.esm.js';
import Highlight from 'reveal.js/plugin/highlight/highlight.esm.js';
import Notes from 'reveal.js/plugin/notes/notes.esm.js';
import Zoom from 'reveal.js/plugin/zoom/zoom.esm.js';
import Search from 'reveal.js/plugin/search/search.esm.js';

// Import Reveal.js CSS
import 'reveal.js/dist/reveal.css';

// Global constants
const VERSION: string = (typeof __VERSION__ !== 'undefined' && __VERSION__) || '3.0.0';
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
  private themeManager: ThemeManager;
  private revealConfigManager: RevealConfigManager;
  private chartConfigManager: ChartConfigManager;
  private performanceMetrics: PerformanceMetrics;
  private startTime: number;

  constructor(config: Partial<PresentationConfig> = {}) {
    this.startTime = performance.now();
    this.config = this.mergeConfig(config);
    
    // Initialize configuration managers
    this.themeManager = new ThemeManager(this.config.theme);
    this.revealConfigManager = new RevealConfigManager(this.config.features);
    this.chartConfigManager = new ChartConfigManager(this.config.charts);
    
    // Initialize performance metrics
    this.performanceMetrics = {
      initializationTime: 0,
      firstSlideTime: 0,
      totalSlides: 0,
      loadedAssets: 0,
      renderTime: []
    };
    
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

      // Initialize theme system
      if (this.config.features.themeSystem) {
        await this.themeManager.setTheme(this.config.theme.name, this.config.theme.variant);
      }

      // Create Reveal.js configuration
      const revealConfig = this.revealConfigManager.getConfig();

      // Initialize Reveal.js
      const RevealInstance = Reveal || (window as any).Reveal;
      if (!RevealInstance) {
        throw new Error('Reveal.js is not available - ensure Reveal.js is loaded before this script');
      }
      
      await RevealInstance.initialize({
        ...revealConfig,
        plugins: this.getActivePlugins()
      });

      // Reveal.js is now ready
      this.reveal = RevealInstance;
      this.performanceMetrics.firstSlideTime = performance.now() - this.startTime;
      this.performanceMetrics.totalSlides = RevealInstance.getTotalSlides();
      logger.info('Reveal.js ready');

      // Initialize charts if enabled
      if (this.config.features.charts) {
        this.initializeCharts();
      }

      // Set up custom event listeners
      this.setupEventListeners();

      // Set up custom keyboard shortcuts
      this.setupKeyboardShortcuts();

      // Finalize performance metrics
      this.performanceMetrics.initializationTime = performance.now() - this.startTime;

      this.isInitialized = true;
      logger.info('Presentation initialization complete');

      // Emit ready event
      this.emit('ready', {
        version: VERSION,
        config: this.config,
        metrics: this.performanceMetrics
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
  async switchTheme(themeName: string, variant: string = 'default'): Promise<void> {
    if (this.config.features.themeSystem) {
      try {
        await this.themeManager.setTheme(themeName, variant);
        this.config.theme.name = themeName;
        this.config.theme.variant = variant;
        logger.info(`Switched to theme: ${themeName} (${variant})`);
      } catch (error) {
        logger.error(`Failed to switch theme: ${error}`);
        throw error;
      }
    } else {
      logger.warn('Theme system is disabled');
    }
  }

  /**
   * Get performance metrics
   */
  getMetrics(): PerformanceMetrics {
    return { ...this.performanceMetrics };
  }

  /**
   * Get active Reveal.js plugins based on configuration
   */
  private getActivePlugins(): any[] {
    const plugins: any[] = [Markdown];

    if (this.config.features.codeHighlighting) {
      plugins.push(Highlight);
    }

    if (this.config.features.speakerNotes) {
      plugins.push(Notes);
    }

    if (this.config.features.zoom) {
      plugins.push(Zoom);
    }

    // Always include Search for now
    plugins.push(Search);

    return plugins;
  }

  /**
   * Initialize charts in the presentation
   */
  private initializeCharts(): void {
    const chartContainers = document.querySelectorAll('[data-chart-type]');
    chartContainers.forEach((container) => {
      const chartType = container.getAttribute('data-chart-type');
      const chartId = container.getAttribute('id') || `chart-${Date.now()}`;
      
      if (chartType) {
        logger.info(`Initializing chart: ${chartType} in container: ${chartId}`);
        // Chart initialization would happen here with Chart.js
        // For now, we just log the configuration
        const chartConfig = this.chartConfigManager.getChartJSConfig();
        console.log('Chart configuration:', chartConfig);
      }
    });
  }

  /**
   * Destroy the presentation instance
   */
  destroy(): void {
    if (this.reveal) {
      // Remove event listeners
      this.reveal.off('slidechanged');
      this.reveal.off('ready');

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
      template: {
        title: 'My Professional Presentation',
        author: 'Author Name',
        description: 'A professional presentation built with Expositio'
      },
      theme: {
        name: 'starship',
        variant: 'default'
      },
      features: DEFAULT_FEATURE_FLAGS,
      export: DEFAULT_EXPORT_CONFIG,
      charts: DEFAULT_CHART_CONFIG,
      code: DEFAULT_CODE_CONFIG
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
    this.reveal.on('slidechanged', (event: { previousSlide: Element; currentSlide: Element; indexh: number; indexv: number }) => {
      logger.info(`Slide changed to: ${event.indexh}.${event.indexv}`);

      this.emit('slide-changed', {
        previousSlide: event.previousSlide,
        currentSlide: event.currentSlide,
        indexh: event.indexh,
        indexv: event.indexv
      });
    });

    // Fragment events
    this.reveal.on('fragmentshown', (event: { fragment: Element }) => {
      logger.info('Fragment shown');
      this.emit('fragment-shown', { fragment: event.fragment });
    });

    this.reveal.on('fragmenthidden', (event: { fragment: Element }) => {
      logger.info('Fragment hidden');
      this.emit('fragment-hidden', { fragment: event.fragment });
    });
  }

  /**
   * Set up custom keyboard shortcuts
   */
  private setupKeyboardShortcuts(): void {
    if (!this.reveal) return;

    // Custom keyboard shortcuts
    this.reveal.addKeyBinding(
      { keyCode: 72, key: 'H', description: 'Go to first slide' },
      () => {
        this.reveal?.slide(0, 0);
        logger.info('Navigated to first slide via keyboard shortcut');
      }
    );

    // Theme switcher shortcut (T key)
    if (this.config.features.themeSystem) {
      this.reveal.addKeyBinding(
        { keyCode: 84, key: 'T', description: 'Toggle theme' },
        async () => {
          // Cycle through available themes
          const themes = this.themeManager.getAvailableThemes();
          const currentIndex = themes.indexOf(this.config.theme.name);
          const nextIndex = (currentIndex + 1) % themes.length;
          const nextTheme = themes[nextIndex];
          if (nextTheme) {
            await this.switchTheme(nextTheme);
          }
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
  if (typeof window !== 'undefined' && (window as any).EXPOSITIO_CONFIG) {
    Object.assign(config, (window as any).EXPOSITIO_CONFIG);
  }

  // Check reveal container for data attributes
  const revealElement = document.querySelector('.reveal');
  if (revealElement instanceof HTMLElement) {
    const dataset = revealElement.dataset;

    if (dataset.theme) {
      config.theme = { name: dataset.theme, variant: dataset.themeVariant || 'default' };
    }

    if (dataset.title || dataset.author || dataset.description) {
      config.template = {
        title: dataset.title || 'My Presentation',
        author: dataset.author || 'Author Name',
        description: dataset.description || ''
      };
    }

    // Feature flags from data attributes
    if (dataset.features) {
      try {
        const features = JSON.parse(dataset.features);
        config.features = features;
      } catch (e) {
        logger.warn('Invalid features configuration in data-features attribute');
      }
    }
  }

  return config;
}

// Auto-initialize by default; allow opt-out with window.EXPOSITIO_AUTO_INIT === false
if (typeof window !== 'undefined' && (window as any).EXPOSITIO_AUTO_INIT !== false) {
  autoInitialize();
}

// Export for module usage
export { PresentationTemplate, VERSION };
export default PresentationTemplate;

// Log initialization
logger.info(`Professional Presentation Template v${VERSION} loaded`);
logger.info(`Environment: ${IS_DEV ? 'development' : 'production'}`);