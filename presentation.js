// Initialize Reveal.js
Reveal.initialize({
    // Display controls in the bottom right corner
    controls: true,

    // Display a presentation progress bar
    progress: true,

    // Display the page number of the current slide
    slideNumber: true,

    // Push each slide change to the browser history
    history: true,

    // Enable keyboard shortcuts for navigation
    keyboard: true,

    // Enable the slide overview mode
    overview: true,

    // Vertical centering of slides
    center: true,

    // Enable touch navigation on devices with touch input
    touch: true,

    // Loop the presentation
    loop: false,

    // Change the presentation direction to be RTL
    rtl: false,

    // Randomizes the order of slides each time the presentation loads
    shuffle: false,

    // Turns fragments on and off globally
    fragments: true,

    // Flags if the presentation is running in an embedded mode
    embedded: false,

    // Flags if we should show a help overlay when the ? key is pressed
    help: true,

    // Flags if speaker notes should be visible to all viewers
    showNotes: false,

    // Global override for autoplaying embedded media
    autoPlayMedia: null,

    // Number of milliseconds between automatically proceeding to the next slide
    autoSlide: 0,

    // Stop auto-sliding after user input
    autoSlideStoppable: true,

    // Use this method for navigation when auto-sliding
    autoSlideMethod: Reveal.navigateNext,

    // Enable slide navigation via mouse wheel
    mouseWheel: false,

    // Hides the address bar on mobile devices
    hideAddressBar: true,

    // Opens links in an iframe preview overlay
    previewLinks: false,

    // Transition style
    transition: 'slide', // none/fade/slide/convex/concave/zoom

    // Transition speed
    transitionSpeed: 'default', // default/fast/slow

    // Transition style for full page slide backgrounds
    backgroundTransition: 'fade', // none/fade/slide/convex/concave/zoom

    // Number of slides away from the current that are visible
    viewDistance: 3,

    // Parallax background image
    parallaxBackgroundImage: '', // e.g. "'https://s3.amazonaws.com/hakim-static/reveal-js/reveal-parallax-1.jpg'"

    // Parallax background size
    parallaxBackgroundSize: '', // CSS syntax, e.g. "2100px 900px"

    // Number of pixels to move the parallax background per slide
    parallaxBackgroundHorizontal: null,
    parallaxBackgroundVertical: null,

    // The display mode that will be used to show slides
    display: 'block',

    // Plugins
    plugins: [ RevealMarkdown, RevealHighlight, RevealNotes, RevealZoom, RevealSearch ]
});

// Sample Chart.js implementation with calmer colors
const ctx = document.getElementById('myChart');
if (ctx) {
    const myChart = new Chart(ctx, {
        type: 'bar',
        data: {
            labels: ['Q1', 'Q2', 'Q3', 'Q4'],
            datasets: [{
                label: 'Neural Activity (in teraflops)',
                data: [12, 19, 15, 25],
                backgroundColor: [
                    'rgba(77, 208, 225, 0.7)',
                    'rgba(77, 182, 172, 0.7)',
                    'rgba(149, 117, 205, 0.7)',
                    'rgba(66, 165, 245, 0.7)'
                ],
                borderColor: [
                    'rgba(77, 208, 225, 1)',
                    'rgba(77, 182, 172, 1)',
                    'rgba(149, 117, 205, 1)',
                    'rgba(66, 165, 245, 1)'
                ],
                borderWidth: 1.5,
                borderRadius: 4
            }]
        },
        options: {
            responsive: true,
            maintainAspectRatio: true,
            plugins: {
                legend: {
                    display: true,
                    position: 'top',
                    labels: {
                        color: '#b8c9e0',
                        font: {
                            family: 'Inter',
                            size: 12
                        }
                    }
                }
            },
            scales: {
                y: {
                    beginAtZero: true,
                    grid: {
                        color: 'rgba(77, 208, 225, 0.1)',
                        lineWidth: 1
                    },
                    ticks: {
                        color: '#8fa8c7',
                        font: {
                            family: 'Inter',
                            size: 11
                        }
                    }
                },
                x: {
                    grid: {
                        display: false
                    },
                    ticks: {
                        color: '#8fa8c7',
                        font: {
                            family: 'Inter',
                            size: 11
                        }
                    }
                }
            }
        }
    });
}

// Custom keyboard shortcuts
Reveal.addKeyBinding({ keyCode: 72, key: 'H', description: 'Go to first slide' }, () => {
    Reveal.slide(0, 0);
});

// Event listeners
Reveal.on('slidechanged', event => {
    // event.previousSlide, event.currentSlide, event.indexh, event.indexv
    console.log('Slide changed to:', event.indexh);
});

// Speaker notes helper
Reveal.on('ready', () => {
    console.log('Presentation ready!');
    console.log('Press S to open speaker view');
    console.log('Press F for fullscreen');
    console.log('Press O for overview mode');
    console.log('Press ? for keyboard shortcuts');
});