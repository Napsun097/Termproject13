import { test, expect } from '@playwright/test';

test('ผู้ใช้สามารถสมัครสมาชิกได้สำเร็จ', async ({ page }) => {
   
    await page.goto('http://localhost:3000/register');

   
    await page.fill('input[id="username"]', 'testuser');
    await page.fill('input[id="email"]', 'test@example.com');
    await page.fill('input[id="password"]', 'password123');
    await page.fill('input[id="confirmPassword"]', 'password123');

   
    await page.click('button[type="submit"]');

    
    await page.waitForTimeout(1000); 
    await expect(page).toHaveURL('http://localhost:3000/login');
});
