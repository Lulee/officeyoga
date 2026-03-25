import fs from "node:fs";
import path from "node:path";
import matter from "gray-matter";
import { expect, test } from "@playwright/test";

const postsDir = path.join(process.cwd(), "posts");
const markdownFiles = fs
  .readdirSync(postsDir)
  .filter((file) => file.endsWith(".md"));
const postsPerPage = 10;

test.describe("Blog Pages", () => {
  test("blog index loads, shows the expected number of cards, and links to a detail page", async ({
    page,
  }) => {
    const response = await page.goto("/en/blog");
    expect(response?.ok()).toBeTruthy();

    await expect(
      page.getByRole("heading", { name: /desk yoga, mobility, and mindful work habits/i }),
    ).toBeVisible();

    const cards = page.locator("article");
    await expect(cards).toHaveCount(Math.min(markdownFiles.length, postsPerPage));
    await expect(cards.first().getByRole("heading")).toBeVisible();
    await expect(cards.first().locator("p").first()).toBeVisible();
    await expect(cards.first().getByRole("link", { name: /read more/i })).toBeVisible();

    const firstReadMore = cards.first().getByRole("link", { name: /read more/i });
    const href = await firstReadMore.getAttribute("href");
    await firstReadMore.click();

    await expect(page).toHaveURL(new RegExp(`${href}$`));
    await expect(page.locator("article h1")).toBeVisible();
  });

  test("published post detail page shows title, date, body, json-ld, and metadata", async ({
    page,
  }) => {
    const filePath = path.join(postsDir, "hello-office-yoga.md");
    const fileContents = fs.readFileSync(filePath, "utf8");
    const { data, content } = matter(fileContents);

    const response = await page.goto("/en/blog/hello-office-yoga");
    expect(response?.ok()).toBeTruthy();

    await expect(
      page.getByRole("heading", { name: data.title as string }),
    ).toBeVisible();

    const article = page.locator("main article").first();
    await expect(article.locator("span").first()).toContainText(/2026/);
    await expect(article).toContainText((data.description as string).slice(0, 30));
    await expect(article).toContainText(content.slice(0, 60));

    const jsonLdScripts = page.locator('script[type="application/ld+json"]');
    const scriptCount = await jsonLdScripts.count();
    let foundArticleJsonLd = false;

    for (let index = 0; index < scriptCount; index += 1) {
      const raw = await jsonLdScripts.nth(index).textContent();
      if (!raw) continue;
      const parsed = JSON.parse(raw);
      if (parsed["@type"] === "Article") {
        foundArticleJsonLd = true;
        expect(parsed.headline).toBe(data.title);
        expect(parsed.description).toBe(data.description);
      }
    }

    expect(foundArticleJsonLd).toBe(true);

    await expect(page).toHaveTitle(new RegExp(data.title as string));
    const description = await page
      .locator('meta[name="description"]')
      .getAttribute("content");
    expect(description).toBe(data.description);
  });

  test("about and privacy pages load and have non-empty content", async ({ page }) => {
    for (const route of ["/en/about", "/en/privacy"]) {
      const response = await page.goto(route);
      expect(response?.ok()).toBeTruthy();
      await expect(page.locator("main")).toContainText(/\w+/);
    }
  });
});
