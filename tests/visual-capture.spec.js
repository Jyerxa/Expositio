import { test, expect } from '@playwright/test';

test.describe('Visual Capture - Screenshot All Slides', () => {
  test('capture all presentation slides in high quality', async ({ page }) => {
    // Set high resolution for crisp screenshots
    await page.setViewportSize({ width: 1920, height: 1080 });
    
    // Navigate to the presentation
    await page.goto('/');
    
    // Wait for Reveal.js and all assets to load
    await page.waitForFunction(() => window.Reveal && window.Reveal.isReady());
    await page.waitForTimeout(3000); // Extra time for fonts and animations
    
    const slideData = [
      { name: 'title-neural-interface', description: 'Title slide with futuristic styling' },
      { name: 'system-overview', description: 'Introduction with animated fragments' },
      { name: 'dual-panel-interface', description: 'Two-column glass morphism layout' },
      { name: 'holographic-media', description: 'Image slide with glowing borders' },
      { name: 'neural-code-interface', description: 'Code example with syntax highlighting' },
      { name: 'neural-analytics-matrix', description: 'Chart.js data visualization' },
      { name: 'deep-scan-protocol-main', description: 'Vertical slides - main level' },
      { name: 'quote-slide', description: 'Quote with glass morphism background' },
      { name: 'transmission-complete', description: 'Final slide with starship theme' }
    ];
    
    let currentSlideIndex = 0;
    
    for (const slide of slideData) {
      console.log(`Capturing slide ${currentSlideIndex}: ${slide.description}`);
      
      // Wait for slide transition to complete
      await page.waitForTimeout(1500);
      
      // Ensure the slide is present and visible
      await expect(page.locator('.reveal .slides section.present')).toBeVisible();
      
      // Take high-quality screenshot
      await page.screenshot({
        path: `test-results/slides/${slide.name}.png`,
        fullPage: false,
        type: 'png'
      });
      
      // Also capture a full-page screenshot for context
      await page.screenshot({
        path: `test-results/slides/${slide.name}-fullpage.png`,
        fullPage: true,
        type: 'png'
      });
      
      // Navigate to next slide (except for the last one)
      if (currentSlideIndex < slideData.length - 1) {
        await page.keyboard.press('ArrowRight');
      }
      
      currentSlideIndex++;
    }
    
    console.log(`Successfully captured ${slideData.length} slides`);
  });

  test('capture vertical slide navigation', async ({ page }) => {
    await page.setViewportSize({ width: 1920, height: 1080 });
    await page.goto('/');
    
    await page.waitForFunction(() => window.Reveal && window.Reveal.isReady());
    await page.waitForTimeout(2000);
    
    // Navigate to the vertical slides section (6th slide)
    for (let i = 0; i < 6; i++) {
      await page.keyboard.press('ArrowRight');
      await page.waitForTimeout(800);
    }
    
    // Capture main vertical slide
    await page.screenshot({
      path: 'test-results/slides/vertical-01-main.png',
      fullPage: false
    });
    
    // Navigate down to first sub-slide
    await page.keyboard.press('ArrowDown');
    await page.waitForTimeout(1000);
    
    await page.screenshot({
      path: 'test-results/slides/vertical-02-sub1.png',
      fullPage: false
    });
    
    // Navigate down to second sub-slide
    await page.keyboard.press('ArrowDown');
    await page.waitForTimeout(1000);
    
    await page.screenshot({
      path: 'test-results/slides/vertical-03-sub2.png',
      fullPage: false
    });
  });

  test('capture interactive elements and hover states', async ({ page }) => {
    await page.setViewportSize({ width: 1920, height: 1080 });
    await page.goto('/');
    
    await page.waitForFunction(() => window.Reveal && window.Reveal.isReady());
    await page.waitForTimeout(2000);
    
    // Navigate to dual panel slide (slide 2)
    await page.keyboard.press('ArrowRight');
    await page.keyboard.press('ArrowRight');
    await page.waitForTimeout(1000);
    
    // Capture normal state
    await page.screenshot({
      path: 'test-results/interactions/glass-panels-normal.png',
      fullPage: false
    });
    
    // Hover over first column
    await page.locator('.column').first().hover();
    await page.waitForTimeout(1000);
    
    await page.screenshot({
      path: 'test-results/interactions/glass-panels-hover-left.png',
      fullPage: false
    });
    
    // Hover over second column
    await page.locator('.column').nth(1).hover();
    await page.waitForTimeout(1000);
    
    await page.screenshot({
      path: 'test-results/interactions/glass-panels-hover-right.png',
      fullPage: false
    });
    
    // Test image hover effect (navigate to image slide)
    await page.keyboard.press('ArrowRight');
    await page.waitForTimeout(1000);
    
    const image = page.locator('img').first();
    await image.hover();
    await page.waitForTimeout(1000);
    
    await page.screenshot({
      path: 'test-results/interactions/holographic-image-hover.png',
      fullPage: false
    });
  });

  test('capture responsive design across viewports', async ({ page }) => {
    await page.goto('/');
    await page.waitForFunction(() => window.Reveal && window.Reveal.isReady());
    
    const viewports = [
      { name: 'mobile', width: 375, height: 667, description: 'iPhone SE' },
      { name: 'tablet', width: 768, height: 1024, description: 'iPad' },
      { name: 'desktop', width: 1920, height: 1080, description: 'Full HD Desktop' },
      { name: 'ultrawide', width: 2560, height: 1440, description: '1440p Ultrawide' }
    ];
    
    for (const viewport of viewports) {
      console.log(`Testing ${viewport.description} - ${viewport.width}x${viewport.height}`);
      
      await page.setViewportSize({ width: viewport.width, height: viewport.height });
      await page.waitForTimeout(1500);
      
      // Capture title slide
      await page.screenshot({
        path: `test-results/responsive/title-${viewport.name}.png`,
        fullPage: false
      });
      
      // Navigate to dual panel slide to test responsive columns
      await page.keyboard.press('ArrowRight');
      await page.keyboard.press('ArrowRight');
      await page.waitForTimeout(1000);
      
      await page.screenshot({
        path: `test-results/responsive/columns-${viewport.name}.png`,
        fullPage: false
      });
      
      // Reset to first slide for next viewport test
      await page.keyboard.press('Home');
      await page.waitForTimeout(1000);
    }
  });

  test('create animated GIF of slide transitions', async ({ page }) => {
    // This test creates individual frames that could be combined into a GIF
    await page.setViewportSize({ width: 1280, height: 720 });
    await page.goto('/');
    
    await page.waitForFunction(() => window.Reveal && window.Reveal.isReady());
    await page.waitForTimeout(2000);
    
    // Capture frames for the first few slides
    for (let i = 0; i < 5; i++) {
      await page.screenshot({
        path: `test-results/animation/frame-${i.toString().padStart(3, '0')}.png`,
        fullPage: false
      });
      
      await page.keyboard.press('ArrowRight');
      await page.waitForTimeout(1200); // Longer wait to capture transition
    }
    
    console.log('Created 5 animation frames. Use external tools to combine into GIF.');
  });
});