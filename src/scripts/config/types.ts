// Type Definitions for Expositio Presentation System
// Comprehensive TypeScript interfaces for all system components

// Theme System Types
export interface ThemeColors {
  primary: string;
  secondary: string;
  accent: string;
  success: string;
  warning: string;
  error: string;
  backgroundPrimary: string;
  backgroundSecondary: string;
  backgroundTertiary: string;
  textPrimary: string;
  textSecondary: string;
  textMuted: string;
}

export interface ThemeFonts {
  primary: string;
  heading: string;
  mono: string;
}

export interface ThemeConfig {
  name: string;
  variant?: string;
  colors?: Partial<ThemeColors>;
  fonts?: Partial<ThemeFonts>;
  customProperties?: Record<string, string>;
}

// Branding Configuration
export interface BrandingConfig {
  logo?: string;
  logoAlt?: string;
  brandName?: string;
  tagline?: string;
  companyName?: string;
  companyWebsite?: string;
  footerLogo?: string;
  footerLogoAlt?: string;
}

// Template Configuration
export interface TemplateConfig {
  title: string;
  subtitle?: string;
  author: string;
  authorTitle?: string;
  authorContact?: string;
  date?: string;
  description?: string;
  language?: string;
  direction?: 'ltr' | 'rtl';
}

// Feature Flags
export interface FeatureFlags {
  navigation: boolean;
  progress: boolean;
  slideNumbers: boolean;
  speakerNotes: boolean;
  overview: boolean;
  zoom: boolean;
  themeSystem: boolean;
  charts: boolean;
  codeHighlighting: boolean;
  fragments: boolean;
  touch: boolean;
  keyboard: boolean;
  history: boolean;
  hash: boolean;
}

// Export Configuration
export interface ExportConfig {
  pdf: boolean;
  html: boolean;
  pptx?: boolean;
  printOptions?: {
    showNotes?: boolean;
    showProgress?: boolean;
    pdfMaxPagesPerSlide?: number;
  };
}

// Chart Configuration
export interface ChartConfig {
  responsive: boolean;
  maintainAspectRatio: boolean;
  defaultColors: string[];
  animations: {
    enabled: boolean;
    duration: number;
    easing: string;
  };
  plugins: {
    legend: boolean;
    tooltip: boolean;
    title: boolean;
  };
}

// Code Highlighting Configuration
export interface CodeConfig {
  highlightOnLoad: boolean;
  lineNumbers: boolean;
  theme: string;
  languages: string[];
  copyButton: boolean;
  wrapLines: boolean;
}

// Reveal.js Configuration
export interface RevealConfig {
  width?: number;
  height?: number;
  margin?: number;
  minScale?: number;
  maxScale?: number;
  controls?: boolean;
  progress?: boolean;
  slideNumber?: boolean;
  history?: boolean;
  keyboard?: boolean;
  overview?: boolean;
  center?: boolean;
  touch?: boolean;
  loop?: boolean;
  rtl?: boolean;
  shuffle?: boolean;
  fragments?: boolean;
  embedded?: boolean;
  help?: boolean;
  showNotes?: boolean;
  autoSlide?: number;
  autoSlideStoppable?: boolean;
  mouseWheel?: boolean;
  hideAddressBar?: boolean;
  previewLinks?: boolean;
  transition?: 'none' | 'fade' | 'slide' | 'convex' | 'concave' | 'zoom';
  transitionSpeed?: 'default' | 'fast' | 'slow';
  backgroundTransition?: 'none' | 'fade' | 'slide' | 'convex' | 'concave' | 'zoom';
  viewDistance?: number;
  display?: string;
}

// Template Data for rendering
export interface SlideData {
  type: 'title' | 'content' | 'two-column' | 'code' | 'chart' | 'quote';
  title?: string;
  subtitle?: string;
  content?: string;
  slideNumber?: number;
  footerText?: string;
  media?: string;
  mediaAlt?: string;
  
  // Two-column specific
  leftTitle?: string;
  leftContent?: string;
  leftWidth?: string;
  rightTitle?: string;
  rightContent?: string;
  rightWidth?: string;
  
  // Code specific
  codeTitle?: string;
  language?: string;
  code?: string;
  codeId?: string;
  lineNumbers?: string;
  explanation?: string;
  
  // Chart specific
  chartType?: string;
  chartConfig?: string;
  chartId?: string;
  chartDescription?: string;
  chartDataTable?: string;
  insights?: string;
  height?: string;
  maxHeight?: string;
  responsive?: boolean;
  
  // Quote specific
  quote?: string;
  quoteStyle?: string;
  authorName?: string;
  authorTitle?: string;
  authorCompany?: string;
  authorPhoto?: string;
  source?: string;
  quoteDate?: string;
}

// Main Presentation Configuration
export interface PresentationConfig {
  // Template Information
  template: TemplateConfig;
  
  // Theme and Styling
  theme: ThemeConfig;
  branding?: BrandingConfig;
  
  // Feature Configuration
  features: FeatureFlags;
  
  // Export Options
  export: ExportConfig;
  
  // Charts
  charts?: ChartConfig;
  
  // Code Highlighting
  code?: CodeConfig;
  
  // Custom CSS
  customCSS?: string[];
  
  // Custom JavaScript
  customJS?: string[];
  
  // Reveal.js specific options
  reveal?: RevealConfig;
}

// Performance Monitoring
export interface PerformanceMetrics {
  initializationTime: number;
  firstSlideTime: number;
  totalSlides: number;
  loadedAssets: number;
  memoryUsage?: number;
  renderTime?: number[];
}

// Event System
export interface PresentationEvents {
  'slide-changed': { previousSlide: number; currentSlide: number; totalSlides: number };
  'fragment-shown': { fragment: Element; slide: number };
  'fragment-hidden': { fragment: Element; slide: number };
  'overview-shown': {};
  'overview-hidden': {};
  'theme-changed': { previousTheme: string; currentTheme: string };
  'ready': { totalSlides: number };
  'resize': { width: number; height: number };
}

// Error Types
export class PresentationError extends Error {
  constructor(
    message: string,
    public code: string,
    public context?: Record<string, any>
  ) {
    super(message);
    this.name = 'PresentationError';
  }
}

export class ThemeError extends PresentationError {
  constructor(message: string, context?: Record<string, any>) {
    super(message, 'THEME_ERROR', context);
    this.name = 'ThemeError';
  }
}

export class TemplateError extends PresentationError {
  constructor(message: string, context?: Record<string, any>) {
    super(message, 'TEMPLATE_ERROR', context);
    this.name = 'TemplateError';
  }
}

// Default Configurations
export const DEFAULT_THEME_CONFIG: ThemeConfig = {
  name: 'starship',
  variant: 'default'
};

export const DEFAULT_FEATURE_FLAGS: FeatureFlags = {
  navigation: true,
  progress: true,
  slideNumbers: true,
  speakerNotes: true,
  overview: true,
  zoom: true,
  themeSystem: true,
  charts: true,
  codeHighlighting: true,
  fragments: true,
  touch: true,
  keyboard: true,
  history: true,
  hash: true
};

export const DEFAULT_EXPORT_CONFIG: ExportConfig = {
  pdf: true,
  html: true,
  printOptions: {
    showNotes: false,
    showProgress: false,
    pdfMaxPagesPerSlide: 1
  }
};

export const DEFAULT_CHART_CONFIG: ChartConfig = {
  responsive: true,
  maintainAspectRatio: false,
  defaultColors: ['#4dd0e1', '#00bcd4', '#0097a7', '#00695c', '#004d40'],
  animations: {
    enabled: true,
    duration: 750,
    easing: 'easeInOutQuart'
  },
  plugins: {
    legend: true,
    tooltip: true,
    title: true
  }
};

export const DEFAULT_CODE_CONFIG: CodeConfig = {
  highlightOnLoad: true,
  lineNumbers: true,
  theme: 'github',
  languages: ['javascript', 'typescript', 'html', 'css', 'python', 'java', 'cpp', 'go', 'rust'],
  copyButton: true,
  wrapLines: false
};


