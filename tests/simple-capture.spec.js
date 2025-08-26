import { test, expect } from '@playwright/test';

test('capture remaining slides without hover effects', async ({ page }) => {
  // Set viewport for consistent screenshots
  await page.setViewportSize({ width: 1920, height: 1080 });
  
  // Navigate to the presentation
  await page.goto('/');
  
  // Wait for Reveal.js to initialize and fonts to load
  await page.waitForFunction(() => window.Reveal && window.Reveal.isReady());
  await page.waitForTimeout(3000);
  
  // Navigate to the 4th slide (holographic media)
  for (let i = 0; i < 4; i++) {
    await page.keyboard.press('ArrowRight');
    await page.waitForTimeout(1000);
  }
  
  // Capture neural code interface slide
  console.log('Capturing neural code interface...');
  await page.screenshot({
    path: 'test-results/04-neural-code-interface.png',
    fullPage: false
  });
  
  // Move to chart slide
  await page.keyboard.press('ArrowRight');
  await page.waitForTimeout(2000); // Extra wait for chart rendering
  
  console.log('Capturing analytics matrix...');
  await page.screenshot({
    path: 'test-results/05-neural-analytics-matrix.png',
    fullPage: false
  });
  
  // Navigate to final slide
  for (let i = 0; i < 3; i++) {
    await page.keyboard.press('ArrowRight');
    await page.waitForTimeout(1000);
  }
  
  console.log('Capturing transmission complete...');
  await page.screenshot({
    path: 'test-results/06-transmission-complete.png',
    fullPage: false
  });
  
  console.log('✅ Captured additional slides!');
});