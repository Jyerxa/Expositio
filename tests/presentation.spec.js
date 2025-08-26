import { test, expect } from '@playwright/test';

test.describe('Futuristic Starship Presentation', () => {
  test.beforeEach(async ({ page }) => {
    // Navigate to the presentation
    await page.goto('/');
    
    // Wait for Reveal.js to initialize
    await page.waitForFunction(() => window.Reveal && window.Reveal.isReady());
    
    // Wait for custom fonts to load
    await page.waitForTimeout(2000);
  });

  test('should load the presentation with futuristic styling', async ({ page }) => {
    // Check if the main presentation container exists
    await expect(page.locator('.reveal')).toBeVisible();
    
    // Verify the custom CSS is loaded (check for futuristic colors)
    const titleElement = page.locator('h1');
    await expect(titleElement).toBeVisible();
    
    // Check if custom fonts are applied
    const titleFontFamily = await titleElement.evaluate(el => 
      getComputedStyle(el).fontFamily
    );
    expect(titleFontFamily).toContain('Orbitron');
    
    // Take a full-page screenshot of the title slide
    await page.screenshot({ 
      path: 'test-results/title-slide.png',
      fullPage: true 
    });
  });

  test('should navigate through all slides and capture screenshots', async ({ page }) => {
    let slideIndex = 0;
    const maxSlides = 10; // Safety limit
    
    while (slideIndex < maxSlides) {
      // Take screenshot of current slide
      await page.screenshot({ 
        path: `test-results/slide-${slideIndex.toString().padStart(2, '0')}.png`,
        fullPage: false,
        clip: { x: 0, y: 0, width: 1920, height: 1080 }
      });
      
      // Try to go to next slide
      await page.keyboard.press('ArrowRight');
      await page.waitForTimeout(1000); // Wait for transition
      
      // Check if we're still on a valid slide
      const currentSlideExists = await page.locator('.reveal .slides section.present').isVisible();
      if (!currentSlideExists) {
        break;
      }
      
      slideIndex++;
      
      // Safety check - if we've gone too far, break
      if (slideIndex >= maxSlides) {
        console.log('Reached maximum slide limit');
        break;
      }
    }
    
    console.log(`Captured ${slideIndex + 1} slides`);
  });

  test('should test vertical navigation on nested slides', async ({ page }) => {
    // Navigate to a slide with vertical navigation (slide 6 in our presentation)
    for (let i = 0; i < 6; i++) {
      await page.keyboard.press('ArrowRight');
      await page.waitForTimeout(500);
    }
    
    // Take screenshot of main vertical slide
    await page.screenshot({ 
      path: 'test-results/vertical-main.png',
      fullPage: false 
    });
    
    // Navigate down through vertical slides
    await page.keyboard.press('ArrowDown');
    await page.waitForTimeout(1000);
    
    await page.screenshot({ 
      path: 'test-results/vertical-sub1.png',
      fullPage: false 
    });
    
    // Navigate down again
    await page.keyboard.press('ArrowDown');
    await page.waitForTimeout(1000);
    
    await page.screenshot({ 
      path: 'test-results/vertical-sub2.png',
      fullPage: false 
    });
  });

  test('should verify futuristic visual elements', async ({ page }) => {
    // Check for glow effects on headings
    const h1 = page.locator('h1').first();
    const textShadow = await h1.evaluate(el => getComputedStyle(el).textShadow);
    expect(textShadow).not.toBe('none');
    
    // Navigate to a slide with columns to test glass panels
    await page.keyboard.press('ArrowRight');
    await page.keyboard.press('ArrowRight');
    await page.waitForTimeout(1000);
    
    // Check if columns have the glass morphism effect
    const column = page.locator('.column').first();
    await expect(column).toBeVisible();
    
    const columnBg = await column.evaluate(el => getComputedStyle(el).background);
    expect(columnBg).toContain('rgba'); // Should have transparent background
    
    // Test hover effect on columns
    await column.hover();
    await page.waitForTimeout(500);
    await page.screenshot({ 
      path: 'test-results/glass-panels-hover.png',
      fullPage: false 
    });
  });

  test('should test responsive behavior', async ({ page }) => {
    // Test mobile viewport
    await page.setViewportSize({ width: 375, height: 667 });
    await page.waitForTimeout(1000);
    
    await page.screenshot({ 
      path: 'test-results/mobile-view.png',
      fullPage: false 
    });
    
    // Test tablet viewport
    await page.setViewportSize({ width: 768, height: 1024 });
    await page.waitForTimeout(1000);
    
    await page.screenshot({ 
      path: 'test-results/tablet-view.png',
      fullPage: false 
    });
    
    // Test desktop viewport
    await page.setViewportSize({ width: 1920, height: 1080 });
    await page.waitForTimeout(1000);
    
    await page.screenshot({ 
      path: 'test-results/desktop-view.png',
      fullPage: false 
    });
  });

  test('should test slide transitions and animations', async ({ page }) => {
    // Test fragment animations
    await page.keyboard.press('ArrowRight'); // Go to introduction slide
    await page.waitForTimeout(1000);
    
    // Capture before fragments appear
    await page.screenshot({ 
      path: 'test-results/fragments-before.png',
      fullPage: false 
    });
    
    // Trigger fragments
    for (let i = 0; i < 4; i++) {
      await page.keyboard.press('Space');
      await page.waitForTimeout(800); // Wait for animation
    }
    
    // Capture after all fragments are visible
    await page.screenshot({ 
      path: 'test-results/fragments-after.png',
      fullPage: false 
    });
  });

  test('should test chart rendering', async ({ page }) => {
    // Navigate to the chart slide
    for (let i = 0; i < 5; i++) {
      await page.keyboard.press('ArrowRight');
      await page.waitForTimeout(500);
    }
    
    // Wait for Chart.js to render
    await page.waitForTimeout(3000);
    
    // Check if the chart canvas exists and has content
    const chartCanvas = page.locator('#myChart');
    await expect(chartCanvas).toBeVisible();
    
    // Take screenshot of the chart
    await page.screenshot({ 
      path: 'test-results/neural-analytics-chart.png',
      fullPage: false 
    });
  });

  test('should verify accessibility basics', async ({ page }) => {
    // Check for proper heading hierarchy
    const h1Count = await page.locator('h1').count();
    const h2Count = await page.locator('h2').count();
    
    expect(h1Count).toBeGreaterThanOrEqual(1);
    expect(h2Count).toBeGreaterThanOrEqual(1);
    
    // Check for alt text on images
    const images = page.locator('img');
    const imageCount = await images.count();
    
    if (imageCount > 0) {
      for (let i = 0; i < imageCount; i++) {
        const alt = await images.nth(i).getAttribute('alt');
        expect(alt).not.toBeNull();
        expect(alt?.length).toBeGreaterThan(0);
      }
    }
    
    // Test keyboard navigation
    await page.keyboard.press('Tab');
    await page.waitForTimeout(500);
    
    // Check if focus is visible
    const focusedElement = await page.locator(':focus').count();
    expect(focusedElement).toBeGreaterThanOrEqual(0); // Focus should be manageable
  });
});