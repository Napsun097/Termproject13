import { test, expect } from '@playwright/test';

test('login successfully', async ({ page }) => {
  await page.goto('http://localhost:5173/login'); // แก้พอร์ตให้ตรงกับ Vite
  await page.fill('#username', 'test');
  await page.fill('#password', 'Test@1234');
  await page.click('.login-btn');
  await page.waitForURL('http://localhost:5173/');
  const token = await page.evaluate(() => localStorage.getItem('token'));
  expect(token).not.toBeNull();
});