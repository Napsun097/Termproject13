import { defineConfig, devices } from '@playwright/test';

export default defineConfig({
  testDir: './tests',  // ระบุโฟลเดอร์ที่เก็บไฟล์ทดสอบ E2E
  timeout: 30000,      // เวลา timeout ของแต่ละเทสต์ (30 วินาที)
  retries: 1,          // จำนวนครั้งที่สามารถลองใหม่ได้หากทดสอบล้มเหลว
  workers: 1,          // จำนวน worker ที่จะใช้ในการทดสอบ
  reporter: 'html',    // รายงานผลลัพธ์การทดสอบในรูปแบบ HTML
  use: {
    baseURL: 'http://localhost:3000',  // URL ของแอปที่ต้องการทดสอบ
    browserName: 'chromium',           // ใช้ Chromium ในการทดสอบ
    headless: true,                    // รันแบบไม่มี UI (สามารถเปลี่ยนเป็น false เพื่อดู UI)
    video: 'retain-on-failure',        // บันทึกวิดีโอเมื่อเทสต์ล้มเหลว
  },
  projects: [
    {
      name: 'Desktop Chrome',
      use: { ...devices['Desktop Chrome'] },  // ใช้ Desktop Chrome สำหรับทดสอบ
    },
    {
      name: 'Mobile Safari',
      use: { ...devices['iPhone 12'] },      // ใช้ Mobile Safari สำหรับทดสอบ
    },
  ],
});
