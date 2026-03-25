import { expect, test } from "@playwright/test";

test.describe("SEO and Resources", () => {
  test("sitemap.xml returns XML with url entries", async ({ request }) => {
    const response = await request.get("/sitemap.xml");
    expect(response.ok()).toBeTruthy();
    expect(response.status()).toBe(200);

    const body = await response.text();
    expect(body).toContain("<?xml");
    expect(body).toContain("<urlset");
    expect(body).toContain("<url>");
  });

  test("robots.txt contains allowed crawlers and sitemap directive", async ({
    request,
  }) => {
    const response = await request.get("/robots.txt");
    expect(response.ok()).toBeTruthy();
    expect(response.status()).toBe(200);

    const body = await response.text();
    expect(body).toMatch(/User-Agent:\s*Googlebot/i);
    expect(body).toMatch(/User-Agent:\s*Bingbot/i);
    expect(body).toMatch(/User-Agent:\s*GPTBot/i);
    expect(body).toMatch(/Sitemap:\s*https?:\/\//i);
  });

  test("core localized pages respond without 404 or 500", async ({ request }) => {
    const routes = [
      "/en",
      "/en/blog",
      "/en/blog/hello-office-yoga",
      "/en/about",
      "/en/privacy",
      "/zh-CN",
      "/zh-CN/blog",
      "/zh-CN/blog/hello-office-yoga",
      "/zh-CN/about",
      "/zh-CN/privacy",
    ];

    for (const route of routes) {
      const response = await request.get(route);
      expect(response.status(), `${route} should return 200`).toBe(200);
    }
  });
});
