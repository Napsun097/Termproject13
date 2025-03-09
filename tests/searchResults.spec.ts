import { test, expect } from "@playwright/test";

test.describe("SearchResults Page", () => {
  test.beforeEach(async ({ page }) => {
    // Mock API response สำหรับคอร์ส
    await page.route("http://localhost:1337/api/courses?populate=*", async (route) => {
      await route.fulfill({
        status: 200,
        body: JSON.stringify({
          data: [
            { id: 1, category: "Programming", subjectName: "React Basics" },
            { id: 2, category: "Design", subjectName: "UI/UX Fundamentals" }
          ]
        }),
      });
    });

    // ไปที่หน้า SearchResults พร้อม query
    await page.goto("http://localhost:3000/search?query=React");
  });

  test("ควรแสดงผลลัพธ์ที่ตรงกับ query", async ({ page }) => {
    // ตรวจสอบว่าผลลัพธ์การค้นหาถูกต้อง
    await expect(page.locator(".search-result-head")).toHaveText('ผลลัพธ์การค้นหา: "React"');
    await expect(page.locator(".course-list-search")).toContainText("React Basics");
  });

  test("ควรแสดงข้อความเมื่อไม่พบผลลัพธ์", async ({ page }) => {
    // ไปที่หน้า SearchResults พร้อม query ที่ไม่มีผลลัพธ์
    await page.goto("http://localhost:3000/search?query=Python");
    await expect(page.locator(".search-result-text")).toHaveText('ไม่พบคอร์สที่ตรงกับ "Python"');
  });

  test("ควรแสดงข้อความโหลดระหว่างดึงข้อมูล", async ({ page }) => {
    // จำลอง API ช้าเพื่อทดสอบว่าแสดงข้อความกำลังโหลด
    await page.route("http://localhost:1337/api/courses?populate=*", async (route) => {
      await new Promise((r) => setTimeout(r, 3000)); // จำลอง API ช้า
      route.continue();
    });

    await page.goto("http://localhost:3000/search?query=React");
    await expect(page.locator(".loading-container")).toBeVisible();
  });
});
