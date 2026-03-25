import { expect, test, devices } from "@playwright/test";

test.use({
  ...devices["iPhone 12"],
  browserName: "chromium",
});

test.describe("Mobile Responsive", () => {
  test("home page renders on iPhone and mobile navigation can be toggled", async ({
    page,
  }) => {
    await page.goto("/en");

    await expect(
      page.getByRole("heading", { name: /small yoga rituals for calmer, stronger workdays/i }),
    ).toBeVisible();

    const menuButton = page.getByRole("button", { name: /toggle menu/i });
    await expect(menuButton).toBeVisible();
    await menuButton.click();

    const banner = page.getByRole("banner");
    await expect(banner.getByRole("link", { name: /^blog$/i })).toBeVisible();
    await expect(banner.getByRole("link", { name: /^about$/i })).toBeVisible();
  });

  test("blog index renders cards correctly on mobile", async ({ page }) => {
    await page.goto("/en/blog");

    await expect(
      page.getByRole("heading", { name: /desk yoga, mobility, and mindful work habits/i }),
    ).toBeVisible();

    await expect(page.locator("article").first()).toBeVisible();
    await expect(
      page.locator("article").first().getByRole("link", { name: /read more/i }),
    ).toBeVisible();
  });

  test("blog detail page renders without layout breakage on mobile", async ({
    page,
  }) => {
    await page.goto("/en/blog/hello-office-yoga");

    await expect(
      page.getByRole("heading", { name: /hello office yoga: a gentler way to work/i }),
    ).toBeVisible();
    await expect(page.locator("main article").first()).toContainText(/office yoga begins/i);
    await expect(page.getByRole("button", { name: /subscribe/i }).first()).toBeVisible();
  });
});
