import { test, expect } from '@playwright/test';

test('capture improved presentation design', async ({ page }) => {
  // Set viewport for high-quality screenshots
  await page.setViewportSize({ width: 1920, height: 1080 });
  
  // Navigate to the presentation
  await page.goto('/');
  
  // Wait for Reveal.js to initialize and fonts to load
  await page.waitForFunction(() => window.Reveal && window.Reveal.isReady());
  await page.waitForTimeout(3000);
  
  // Capture improved title slide
  console.log('Capturing improved title slide...');
  await page.screenshot({
    path: 'test-results/improved-01-title.png',
    fullPage: false
  });
  
  // Move to system overview
  await page.keyboard.press('ArrowRight');
  await page.waitForTimeout(1500);
  
  console.log('Capturing improved system overview...');
  await page.screenshot({
    path: 'test-results/improved-02-overview.png',
    fullPage: false
  });
  
  // Move to dual panel slide
  await page.keyboard.press('ArrowRight');
  await page.waitForTimeout(1500);
  
  console.log('Capturing improved dual panels...');
  await page.screenshot({
    path: 'test-results/improved-03-panels.png',
    fullPage: false
  });
  
  // Test mobile view with improved design
  await page.setViewportSize({ width: 375, height: 667 });
  await page.waitForTimeout(1000);
  
  console.log('Capturing improved mobile view...');
  await page.screenshot({
    path: 'test-results/improved-mobile.png',
    fullPage: false
  });
  
  console.log('✅ Improved design captured successfully!');
});