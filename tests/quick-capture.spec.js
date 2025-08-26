import { test, expect } from '@playwright/test';

test.describe('Quick Presentation Capture', () => {
  test('capture first few slides of futuristic presentation', async ({ page }) => {
    // Set viewport for consistent screenshots
    await page.setViewportSize({ width: 1920, height: 1080 });
    
    // Navigate to the presentation
    await page.goto('/');
    
    // Wait for Reveal.js to initialize and fonts to load
    await page.waitForFunction(() => window.Reveal && window.Reveal.isReady());
    await page.waitForTimeout(3000);
    
    // Capture title slide
    console.log('Capturing title slide...');
    await page.screenshot({
      path: 'test-results/01-title-neural-interface.png',
      fullPage: false
    });
    
    // Move to next slide
    await page.keyboard.press('ArrowRight');
    await page.waitForTimeout(1500);
    
    // Capture system overview slide
    console.log('Capturing system overview...');
    await page.screenshot({
      path: 'test-results/02-system-overview.png',
      fullPage: false
    });
    
    // Move to dual panel slide
    await page.keyboard.press('ArrowRight');
    await page.waitForTimeout(1500);
    
    // Capture dual panel interface
    console.log('Capturing dual panel interface...');
    await page.screenshot({
      path: 'test-results/03-dual-panel-interface.png',
      fullPage: false
    });
    
    // Test glass panel hover effect
    const leftColumn = page.locator('.column').first();
    await leftColumn.hover();
    await page.waitForTimeout(1000);
    
    await page.screenshot({
      path: 'test-results/03-glass-panel-hover.png',
      fullPage: false
    });
    
    // Move to image slide
    await page.keyboard.press('ArrowRight');
    await page.waitForTimeout(1500);
    
    // Capture holographic media slide
    console.log('Capturing holographic media...');
    await page.screenshot({
      path: 'test-results/04-holographic-media.png',
      fullPage: false
    });
    
    // Move to code slide
    await page.keyboard.press('ArrowRight');
    await page.waitForTimeout(1500);
    
    // Capture code interface
    console.log('Capturing neural code interface...');
    await page.screenshot({
      path: 'test-results/05-neural-code-interface.png',
      fullPage: false
    });
    
    console.log('✅ Successfully captured 5 slides!');
  });

  test('test mobile view of presentation', async ({ page }) => {
    // Set mobile viewport
    await page.setViewportSize({ width: 375, height: 667 });
    
    await page.goto('/');
    await page.waitForFunction(() => window.Reveal && window.Reveal.isReady());
    await page.waitForTimeout(2000);
    
    // Capture mobile title slide
    await page.screenshot({
      path: 'test-results/mobile-title.png',
      fullPage: false
    });
    
    // Navigate to dual panel to see responsive behavior
    await page.keyboard.press('ArrowRight');
    await page.keyboard.press('ArrowRight');
    await page.waitForTimeout(1000);
    
    await page.screenshot({
      path: 'test-results/mobile-dual-panel.png',
      fullPage: false
    });
    
    console.log('✅ Mobile screenshots captured!');
  });
});