import { defineConfig } from 'vite';
import { resolve } from 'path';
import dts from 'vite-plugin-dts';
import legacy from '@vitejs/plugin-legacy';

export default defineConfig({
  // Build configuration
  build: {
    lib: {
      entry: resolve(__dirname, 'src/scripts/main.ts'),
      name: 'PresentationTemplate',
      fileName: (format) => `main.${format}.js`,
      formats: ['es', 'umd']
    },
    rollupOptions: {
      // External dependencies that shouldn't be bundled
      external: ['reveal.js'],
      output: {
        globals: {
          'reveal.js': 'Reveal'
        },
        assetFileNames: (assetInfo) => {
          if (assetInfo.name?.endsWith('.css')) {
            return 'main.css';
          }
          return assetInfo.name || 'asset';
        }
      }
    },
    // Source maps for debugging
    sourcemap: true,
    // Minimize output
    minify: 'terser',
    // Target modern browsers
    target: 'es2020',
    // Generate bundle analysis
    reportCompressedSize: true,
    // CSS code splitting
    cssCodeSplit: false
  },

  // Development server configuration
  server: {
    port: 3000,
    open: true,
    host: true,
    cors: true
  },

  // Preview server configuration
  preview: {
    port: 4173,
    open: true
  },

  // CSS preprocessing
  css: {
    preprocessorOptions: {
      scss: {
        // Make mixins and variables available globally
        additionalData: `
          @import "./src/styles/core/variables";
          @import "./src/styles/core/mixins";
        `,
        // Silence deprecation warnings
        quietDeps: true
      }
    },
    // PostCSS configuration
    postcss: {
      plugins: [
        // Add vendor prefixes
        require('autoprefixer')({
          overrideBrowserslist: [
            '> 1%',
            'last 2 versions',
            'not dead'
          ]
        })
      ]
    }
  },

  // Plugins
  plugins: [
    // Generate TypeScript declaration files
    dts({
      include: ['src/**/*'],
      exclude: ['**/*.test.ts', '**/*.spec.ts'],
      rollupTypes: true
    }),

    // Legacy browser support
    legacy({
      targets: ['defaults', 'not IE 11']
    })
  ],

  // Path resolution
  resolve: {
    alias: {
      '@': resolve(__dirname, 'src'),
      '@styles': resolve(__dirname, 'src/styles'),
      '@scripts': resolve(__dirname, 'src/scripts'),
      '@templates': resolve(__dirname, 'src/templates'),
      '@assets': resolve(__dirname, 'src/assets'),
      '@docs': resolve(__dirname, 'docs'),
      '@examples': resolve(__dirname, 'examples')
    }
  },

  // Define global constants
  define: {
    __VERSION__: JSON.stringify(process.env.npm_package_version),
    __DEV__: JSON.stringify(process.env.NODE_ENV !== 'production'),
    __PRODUCTION__: JSON.stringify(process.env.NODE_ENV === 'production')
  },

  // Optimization configuration
  optimizeDeps: {
    include: ['reveal.js'],
    esbuildOptions: {
      target: 'es2020'
    }
  },

  // Environment variables
  envPrefix: 'PRESENTATION_',

  // Experimental features
  experimental: {
    renderBuiltUrl: (filename: string, { type }: { type: 'public' | 'asset' }) => {
      if (type === 'public') {
        return `/${filename}`;
      }
      return { runtime: `window.__prependStaticUrl("${filename}")` };
    }
  }
});