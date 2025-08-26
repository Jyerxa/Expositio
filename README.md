# HTML Presentation with Reveal.js

A modern, responsive HTML presentation built with Reveal.js.

## Features

- 📱 **Responsive Design** - Works on desktop, tablet, and mobile
- 🎨 **Beautiful Themes** - Customizable styling with CSS
- 💻 **Code Highlighting** - Syntax highlighting for code blocks
- 📊 **Charts & Graphics** - Integrated Chart.js support
- 🎯 **Navigation** - Keyboard, mouse, and touch navigation
- 📝 **Speaker Notes** - Built-in speaker notes support
- 🖼️ **Media Support** - Images, videos, and animations
- ⚡ **Fast Loading** - Uses CDN for dependencies

## Quick Start

1. **Open directly in browser:**
   ```
   Open index.html in your web browser
   ```

2. **Or serve locally with Node.js:**
   ```bash
   npm install
   npm start
   ```

3. **Or use Python:**
   ```bash
   python -m http.server 8080
   ```

## Navigation

- **Arrow Keys** - Navigate between slides
- **Space** - Next slide
- **S** - Speaker view with notes
- **F** - Fullscreen mode
- **O** - Overview mode
- **?** - Show keyboard shortcuts
- **Esc** - Exit fullscreen/overview

## Customization

### Edit Content
- Modify slides in `index.html`
- Each slide is wrapped in `<section>` tags
- Use `class="fragment"` for animated reveals

### Styling
- Edit `custom.css` for custom styles
- Change theme by modifying the CSS link in `index.html`
- Available themes: white, black, league, beige, sky, night, serif, simple, solarized

### Configuration
- Modify settings in `presentation.js`
- Enable/disable features like progress bar, slide numbers, etc.

## Slide Types

### Basic Slide
```html
<section>
    <h2>Slide Title</h2>
    <p>Content goes here</p>
</section>
```

### Two-Column Layout
```html
<section>
    <div class="columns">
        <div class="column">Left content</div>
        <div class="column">Right content</div>
    </div>
</section>
```

### Code Slide
```html
<section>
    <pre><code class="language-javascript">
    // Your code here
    </code></pre>
</section>
```

### Background Slide
```html
<section data-background="#ff0000">
    <h2>Red background</h2>
</section>
```

### Vertical Slides
```html
<section>
    <section>Main slide</section>
    <section>Sub-slide 1</section>
    <section>Sub-slide 2</section>
</section>
```

## Export Options

### PDF Export
1. Add `?print-pdf` to the URL
2. Use browser's print function
3. Save as PDF

### Static HTML
The presentation is already static HTML - just copy the files to any web server.

## Troubleshooting

- **Slides not loading?** Make sure you're serving from a web server, not opening the file directly
- **Animations not working?** Check browser console for JavaScript errors
- **Images not showing?** Verify image paths are correct and accessible

## Resources

- [Reveal.js Documentation](https://revealjs.com/)
- [Chart.js Documentation](https://www.chartjs.org/)
- [More Reveal.js Themes](https://github.com/hakimel/reveal.js#theming)