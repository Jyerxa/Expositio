# Expositio - Professional Presentation Template System

[![Version](https://img.shields.io/npm/v/expositio.svg?style=flat&color=blue)](https://github.com/<owner>/<repo>/releases)
[![TypeScript](https://img.shields.io/badge/TypeScript-5.3+-blue.svg)](https://typescriptlang.org)
[![Vite](https://img.shields.io/badge/Vite-5.1+-646CFF.svg)](https://vitejs.dev)
[![License: MIT](https://img.shields.io/badge/License-MIT-yellow.svg)](LICENSE)

> An enterprise-grade, professional presentation template system built with TypeScript, modern build tools, and extensible architecture.

## 🚀 Features

### 🏗️ **Professional Architecture**
- **TypeScript First** - Strict typing with comprehensive interfaces
- **Modular SCSS** - Organized, maintainable stylesheets
- **Plugin System** - Extensible architecture for themes and features
- **Enterprise Quality** - Following industry best practices

### 🎨 **Advanced Theming**
- **Starship Theme** - Futuristic, tech-focused design
- **CSS Custom Properties** - Easy customization and branding
- **Responsive Design** - Perfect scaling across all devices and zoom levels
- **No Scrollbars** - Content always fits within viewport

### ⚡ **Modern Development**
- **Vite Build System** - Lightning-fast development and optimized builds
- **Hot Module Replacement** - Instant updates during development
- **TypeScript Compilation** - Type safety and excellent IDE support
- **SCSS Preprocessing** - Advanced styling with mixins and variables

### 📊 **Rich Components**
- **Interactive Charts** - Chart.js integration with responsive containers
- **Code Highlighting** - Beautiful syntax highlighting with multiple themes
- **Advanced Layouts** - Two-column, three-column, image galleries
- **Smooth Animations** - Fragment animations and transitions

### ♿ **Accessibility & Performance**
- **WCAG 2.1 Ready** - Structure in place for full compliance
- **Keyboard Navigation** - Complete keyboard accessibility
- **Performance Monitoring** - Built-in performance tracking
- **Cross-browser Compatible** - Works on all modern browsers

## 🚦 Quick Start

### Prerequisites
- **Node.js** 16+
- **npm** 8+

### Development Setup

```bash
# Clone the repository
git clone https://github.com/Jyerxa/Expositio.git
cd Expositio

# Install dependencies
npm install

# Start development server with hot reload
npm run dev
# → Opens at http://localhost:3000
```

### Production Build

```bash
# Build for production
npm run build

# Preview production build
npm run preview

# Serve static files
npm run serve
```

## 🛠️ Development Scripts

```bash
# Development
npm run dev          # Start development server with HMR
npm run build        # Build for production
npm run preview      # Preview production build

# Code Quality
npm run type-check   # TypeScript type checking
npm run lint         # Lint TypeScript and SCSS
npm run format       # Format code with Prettier

# Testing
npm run test         # Run Playwright tests
npm run test:headed  # Run tests in headed mode
npm run test:visual  # Visual regression testing

# Analysis
npm run analyze      # Bundle size analysis
```

## 📁 Project Structure

```
Expositio/
├── src/                          # Source code
│   ├── styles/                   # Modular SCSS architecture
│   │   ├── core/                 # Variables, mixins, base styles
│   │   ├── components/           # Slide layouts, navigation, etc.
│   │   └── themes/               # Theme system
│   ├── scripts/                  # TypeScript modules
│   │   ├── config/               # Configuration system
│   │   ├── plugins/              # Feature plugins
│   │   └── utils/                # Utility functions
│   └── templates/                # HTML templates
├── docs/                         # Documentation
│   └── PRD.md                    # Product Requirements Document
├── examples/                     # Example presentations
├── tests/                        # Test suites
└── tools/                        # Build and development tools
```

## 🎨 Customization

### Quick Theme Switch

```html
<!-- In your HTML -->
<div class="reveal" data-theme="starship">
  <!-- Your slides -->
</div>
```

### Configuration

```typescript
// Programmatic configuration
import PresentationTemplate from './src/scripts/main';

const presentation = new PresentationTemplate({
  theme: { name: 'starship', variant: 'default' },
  features: {
    navigation: true,
    progress: true,
    charts: true,
    themeSystem: true
  }
});

await presentation.initialize();
```

### Environment Variables

```bash
# .env file
PRESENTATION_THEME=starship
PRESENTATION_TITLE="My Amazing Presentation"
```

## 🎯 Navigation & Controls

| Key | Action |
|-----|--------|
| **Arrow Keys** | Navigate between slides |
| **Space** | Next slide |
| **H** | Go to first slide |
| **T** | Toggle theme (if enabled) |
| **S** | Speaker view with notes |
| **F** | Fullscreen mode |
| **O** | Overview mode |
| **?** | Show keyboard shortcuts |
| **Esc** | Exit fullscreen/overview |

## 🧩 Component Library

### Basic Slide
```html
<section>
  <h2>Slide Title</h2>
  <p>Your content here</p>
</section>
```

### Two-Column Layout
```html
<section>
  <h2>Dual Panel Interface</h2>
  <div class="columns">
    <div class="column">
      <h3>Left Panel</h3>
      <p>Left content</p>
    </div>
    <div class="column">
      <h3>Right Panel</h3>
      <p>Right content</p>
    </div>
  </div>
</section>
```

### Code Block with Syntax Highlighting
```html
<section>
  <h2>Code Example</h2>
  <pre><code class="language-typescript" data-trim>
    interface PresentationConfig {
      theme: ThemeConfig;
      features: FeatureFlags;
    }
  </code></pre>
</section>
```

### Interactive Chart
```html
<section>
  <h2>Data Visualization</h2>
  <div class="chart-container">
    <canvas id="myChart"></canvas>
  </div>
</section>
```

### Fragment Animations
```html
<section>
  <h2>Animated Reveals</h2>
  <ul>
    <li class="fragment fade-in">Fade in</li>
    <li class="fragment slide-up">Slide up</li>
    <li class="fragment zoom-in">Zoom in</li>
  </ul>
</section>
```

## 🎨 Theme Development

### Creating Custom Themes
```scss
// src/styles/themes/my-theme/theme.scss
.reveal.theme-my-theme {
  --primary-color: #your-color;
  --background: #your-background;
  
  // Theme-specific customizations
}
```

### Theme Configuration
```typescript
const customTheme = {
  name: 'my-theme',
  variant: 'dark',
  colors: {
    primary: '#ff6b6b',
    background: '#2c3e50'
  }
};
```

## 📱 Export & Deployment

### PDF Export
```bash
# Add ?print-pdf to URL, then print to PDF
http://localhost:3000/?print-pdf
```

### Static Deployment
```bash
# Build and deploy to any static host
npm run build
# Deploy ./dist folder to Netlify, Vercel, GitHub Pages, etc.
```

### Docker Deployment
```dockerfile
FROM node:18-alpine
WORKDIR /app
COPY package*.json ./
RUN npm ci --only=production
COPY . .
RUN npm run build
EXPOSE 3000
CMD ["npm", "run", "preview"]
```

## 🧪 Testing

### Visual Regression Testing
```bash
# Capture reference screenshots
npm run test:visual

# Run full test suite
npm run test
```

### Custom Test Configuration
```javascript
// playwright.config.js customization
export default defineConfig({
  projects: [
    { name: 'chromium', use: devices['Desktop Chrome'] },
    { name: 'mobile', use: devices['iPhone 12'] }
  ]
});
```

## 🤝 Contributing

1. **Fork** the repository
2. **Create** a feature branch: `git checkout -b feat/amazing-feature`
3. **Commit** your changes: `git commit -m 'feat: add amazing feature'`
4. **Push** to the branch: `git push origin feat/amazing-feature`
5. **Open** a Pull Request

## 📋 Development Roadmap

- **✅ Phase 1**: Professional architecture - **Complete**
- **✅ Phase 2**: Modular SCSS & theming - **Complete**
- **🚧 Phase 3**: Component library - **75% Complete**
- **🔄 Phase 4**: Development tooling - **In Progress**
- **🔄 Phase 5**: Quality & polish - **Planned**

See [PRD.md](docs/PRD.md) for detailed roadmap.

## 📖 Documentation

- **[Product Requirements](docs/PRD.md)** - Complete development roadmap
- **[Architecture Guide](docs/architecture.md)** - System design details
- **[Theme Development](docs/theme-development.md)** - Custom theme creation
- **[Component Library](docs/component-library.md)** - Available components

## ⚡ Performance

- **Lighthouse Score**: 90+ across all metrics
- **Bundle Size**: < 500KB gzipped
- **First Paint**: < 1.5s
- **Smooth 60fps** animations

## 🆘 Troubleshooting

### Common Issues

**Build Errors?**
```bash
npm run clean && npm install && npm run build
```

**TypeScript Errors?**
```bash
npm run type-check
```

**Styles Not Loading?**
```bash
# Check if SCSS compilation is working
npm run dev
```

## 📄 License

MIT License - see [LICENSE](LICENSE) file for details.

## 🙏 Acknowledgments

- **[Reveal.js](https://revealjs.com/)** - The amazing presentation framework
- **[Chart.js](https://www.chartjs.org/)** - Beautiful charts and graphs
- **[Vite](https://vitejs.dev/)** - Lightning-fast build tool
- **[TypeScript](https://typescriptlang.org)** - Type safety and developer experience

---

<div align="center">

**[⭐ Star this repo](https://github.com/Jyerxa/Expositio)** | **[🐛 Report Bug](https://github.com/Jyerxa/Expositio/issues)** | **[💡 Request Feature](https://github.com/Jyerxa/Expositio/issues)**

Made with ❤️ for professional presentations

</div>