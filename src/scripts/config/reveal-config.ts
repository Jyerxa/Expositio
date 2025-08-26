import { RevealConfig, FeatureFlags } from './types.js';

export class RevealConfigManager {
  private baseConfig: RevealConfig;
  private features: FeatureFlags;

  constructor(features: FeatureFlags) {
    this.features = features;
    this.baseConfig = this.createBaseConfig();
  }

  private createBaseConfig(): RevealConfig {
    return {
      // Core dimensions
      width: 1920,
      height: 1080,
      margin: 0.04,
      minScale: 0.2,
      maxScale: 2.0,

      // Controls
      controls: this.features.navigation,
      progress: this.features.progress,
      slideNumber: this.features.slideNumbers,
      
      // Navigation
      history: this.features.history,
      keyboard: this.features.keyboard,
      overview: this.features.overview,
      
      // Core behavior
      center: true,
      touch: this.features.touch,
      loop: false,
      rtl: false,
      shuffle: false,
      
      // Fragments
      fragments: this.features.fragments,
      
      // Other features
      embedded: false,
      help: true,
      showNotes: false,
      autoSlide: 0,
      autoSlideStoppable: true,
      mouseWheel: false,
      hideAddressBar: true,
      previewLinks: false,
      
      // Transitions
      transition: 'slide',
      transitionSpeed: 'default',
      backgroundTransition: 'fade',
      
      // Performance
      viewDistance: 3,
      display: 'block'
    };
  }

  public getConfig(): RevealConfig {
    return { ...this.baseConfig };
  }

  public updateConfig(overrides: Partial<RevealConfig>): RevealConfig {
    this.baseConfig = {
      ...this.baseConfig,
      ...overrides
    };
    
    return this.getConfig();
  }

  public createResponsiveConfig(): RevealConfig {
    const isMobile = window.innerWidth < 768;
    const isTablet = window.innerWidth >= 768 && window.innerWidth < 1024;

    const responsiveOverrides: Partial<RevealConfig> = {};

    if (isMobile) {
      responsiveOverrides.width = 375;
      responsiveOverrides.height = 667;
      responsiveOverrides.margin = 0.02;
      responsiveOverrides.minScale = 0.5;
      responsiveOverrides.maxScale = 1.5;
      responsiveOverrides.controls = false;
      responsiveOverrides.touch = true;
      responsiveOverrides.viewDistance = 2;
    } else if (isTablet) {
      responsiveOverrides.width = 1024;
      responsiveOverrides.height = 768;
      responsiveOverrides.margin = 0.03;
      responsiveOverrides.viewDistance = 2;
    }

    return this.updateConfig(responsiveOverrides);
  }
}

export const createCustomRevealConfig = (
  features: FeatureFlags,
  customizations: Partial<RevealConfig>
): RevealConfig => {
  const manager = new RevealConfigManager(features);
  return manager.updateConfig(customizations);
};


