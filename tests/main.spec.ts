import { test, expect } from '@playwright/test';

test.describe('ADHD HUB E2E', () => {
  test('should navigate and show main sections', async ({ page }) => {
    await page.goto('http://localhost:3000');
    
    // Check Dashboard
    await expect(page.getByText('ADHD HUB')).toBeVisible();
    await expect(page.getByText('Menu Dopaminowe')).toBeVisible();
    await expect(page.getByText('Pomoc dla Ciebie')).toBeVisible();

    // Navigate to Dopamine Menu
    await page.click('text=Zbuduj menu');
    await expect(page.url()).toContain('/tools/dopamine-menu');
    await expect(page.getByText('Twoje Menu Dopaminowe')).toBeVisible();

    // Navigate to Settings
    await page.goto('http://localhost:3000/settings');
    await expect(page.getByText('Ustawienia Systemu')).toBeVisible();
  });

  test('should open knowledge base', async ({ page }) => {
    await page.goto('http://localhost:3000/knowledge');
    await expect(page.getByText('Baza Wiedzy')).toBeVisible();
  });
});
