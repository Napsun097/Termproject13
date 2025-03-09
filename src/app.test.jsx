const { test, expect } = require('@playwright/test');

test('should load the homepage and check title', async ({ page }) => {
  // ไปที่หน้าเว็บ
  await page.goto('http://localhost:3000'); // ปรับ URL ตามต้องการ

  // ตรวจสอบว่ามี title แสดงผลตามที่คาดหวัง
  await expect(page).toHaveTitle('Your App Title');
});

test('should click button and display message', async ({ page }) => {
  await page.goto('http://localhost:3000'); // ปรับ URL ตามต้องการ

  // ค้นหาและคลิกปุ่ม
  await page.click('button#yourButtonId');

  // ตรวจสอบว่าแสดงข้อความที่คาดหวัง
  const message = await page.textContent('#messageId');
  expect(message).toBe('Message after click');
});
