import { ChartConfig, DEFAULT_CHART_CONFIG } from './types.js';

export class ChartConfigManager {
  private config: ChartConfig;

  constructor(initialConfig: ChartConfig = DEFAULT_CHART_CONFIG) {
    this.config = { ...initialConfig };
  }

  public getConfig(): ChartConfig {
    return { ...this.config };
  }

  public updateConfig(overrides: Partial<ChartConfig>): ChartConfig {
    this.config = {
      ...this.config,
      ...overrides,
      // Deep merge for nested objects
      animations: {
        ...this.config.animations,
        ...(overrides.animations || {})
      },
      plugins: {
        ...this.config.plugins,
        ...(overrides.plugins || {})
      }
    };
    
    return this.getConfig();
  }

  public getChartJSConfig(): any {
    return {
      responsive: this.config.responsive,
      maintainAspectRatio: this.config.maintainAspectRatio,
      animation: {
        duration: this.config.animations.enabled ? this.config.animations.duration : 0,
        easing: this.config.animations.easing
      },
      plugins: {
        legend: {
          display: this.config.plugins.legend,
          position: 'bottom'
        },
        tooltip: {
          enabled: this.config.plugins.tooltip
        },
        title: {
          display: this.config.plugins.title
        }
      },
      scales: {
        x: {
          beginAtZero: true
        },
        y: {
          beginAtZero: true
        }
      }
    };
  }

  public createResponsiveChart(containerId: string, type: string, data: any): void {
    const canvas = document.getElementById(containerId) as HTMLCanvasElement;
    if (!canvas) {
      throw new Error(`Chart container with ID '${containerId}' not found`);
    }

    // Apply responsive sizing based on container
    const container = canvas.parentElement;
    if (container) {
      const containerWidth = container.clientWidth;
      const containerHeight = container.clientHeight;
      
      canvas.width = containerWidth;
      canvas.height = Math.min(containerHeight, containerWidth * 0.6); // Maintain aspect ratio
    }

    // Create Chart.js instance with our configuration
    const chartConfig = {
      type,
      data: {
        ...data,
        datasets: data.datasets?.map((dataset: any, index: number) => ({
          ...dataset,
          backgroundColor: dataset.backgroundColor || this.config.defaultColors[index % this.config.defaultColors.length],
          borderColor: dataset.borderColor || this.config.defaultColors[index % this.config.defaultColors.length]
        }))
      },
      options: this.getChartJSConfig()
    };

    // Note: In a real implementation, you would create the Chart.js instance here
    // new Chart(canvas, chartConfig);
    
    console.log('Chart configuration ready:', chartConfig);
  }
}

export const CHART_PRESETS = {
  performance: {
    responsive: true,
    maintainAspectRatio: false,
    defaultColors: ['#4dd0e1', '#00bcd4', '#0097a7', '#00695c', '#004d40'],
    animations: {
      enabled: false, // Disable for performance
      duration: 0,
      easing: 'linear'
    },
    plugins: {
      legend: true,
      tooltip: true,
      title: true
    }
  } as ChartConfig,

  accessible: {
    responsive: true,
    maintainAspectRatio: true,
    defaultColors: [
      '#1f77b4', '#ff7f0e', '#2ca02c', '#d62728', '#9467bd', // High contrast colors
      '#8c564b', '#e377c2', '#7f7f7f', '#bcbd22', '#17becf'
    ],
    animations: {
      enabled: false, // Reduce motion
      duration: 0,
      easing: 'linear'
    },
    plugins: {
      legend: true,
      tooltip: true,
      title: true
    }
  } as ChartConfig,

  presentation: {
    responsive: true,
    maintainAspectRatio: false,
    defaultColors: ['#4dd0e1', '#00bcd4', '#0097a7', '#00695c', '#004d40'],
    animations: {
      enabled: true,
      duration: 1000,
      easing: 'easeInOutQuart'
    },
    plugins: {
      legend: true,
      tooltip: false, // Disable during presentation
      title: true
    }
  } as ChartConfig
};

export const createChartConfig = (preset: keyof typeof CHART_PRESETS): ChartConfig => {
  return CHART_PRESETS[preset];
};