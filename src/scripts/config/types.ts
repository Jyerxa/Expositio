export interface ThemeConfig {
    name: string;
    variant: string;
}

export interface MetadataConfig {
    title: string;
    author: string;
    description: string;
}

export interface FeatureToggles {
    navigation: boolean;
    progress: boolean;
    slideNumbers: boolean;
    speakerNotes: boolean;
    overview: boolean;
    zoom: boolean;
    charts: boolean;
    themeSystem: boolean;
    accessibility: boolean;
    performanceMonitoring: boolean;
}

export interface RevealOptions {
    controls: boolean;
    progress: boolean;
    slideNumber: boolean;
    history: boolean;
    keyboard: boolean;
    overview: boolean;
    center: boolean;
    touch: boolean;
    loop: boolean;
    rtl: boolean;
    shuffle: boolean;
    fragments: boolean;
    embedded: boolean;
    help: boolean;
    showNotes: boolean;
    autoPlayMedia: unknown;
    autoSlide: number;
    autoSlideStoppable: boolean;
    mouseWheel: boolean;
    hideAddressBar: boolean;
    previewLinks: boolean;
    transition: 'none' | 'fade' | 'slide' | 'convex' | 'concave' | 'zoom';
    transitionSpeed: 'default' | 'fast' | 'slow';
    backgroundTransition: 'none' | 'fade' | 'slide' | 'convex' | 'concave' | 'zoom';
    viewDistance: number;
    display: 'block' | 'flex';
}

export interface ChartConfig {
    provider: 'chartjs' | string;
    globalOptions: Record<string, unknown>;
}

export interface PresentationConfig {
    theme: ThemeConfig;
    metadata: MetadataConfig;
    features: FeatureToggles;
    reveal: RevealOptions;
    chart: ChartConfig;
}


