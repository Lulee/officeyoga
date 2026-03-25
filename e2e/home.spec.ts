import { expect, test } from "@playwright/test";

test.describe("Home Page", () => {
  test("loads hero, latest posts, and navigates to a post detail page", async ({
    page,
  }) => {
    const response = await page.goto("/en");
    expect(response?.ok()).toBeTruthy();

    const heroTitle = page.getByRole("heading", {
      name: /small yoga rituals for calmer, stronger workdays/i,
    });
    await expect(heroTitle).toBeVisible();
    await expect(
      page.getByText(/evidence-informed stretches, desk yoga flows/i),
    ).toBeVisible();

    await expect(
      page.getByRole("heading", { name: /fresh reads for healthier office routines/i }),
    ).toBeVisible();

    const latestArticlesSection = page.locator("section").filter({
      has: page.getByRole("heading", {
        name: /fresh reads for healthier office routines/i,
      }),
    });

    const postCards = latestArticlesSection.locator("article");
    await expect(postCards).toHaveCount(6);

    const firstReadMore = latestArticlesSection.getByRole("link", {
      name: /read more/i,
    }).first();
    const href = await firstReadMore.getAttribute("href");

    await firstReadMore.click();
    await expect(page).toHaveURL(new RegExp(`${href}$`));
    await expect(page.locator("article h1")).toBeVisible();
  });

  test("newsletter form accepts input and submit button is clickable", async ({
    page,
  }) => {
    await page.goto("/en");

    const emailInput = page.getByPlaceholder(/enter your email/i).first();
    await expect(emailInput).toBeVisible();
    await emailInput.fill("demo@example.com");
    await expect(emailInput).toHaveValue("demo@example.com");

    const subscribeButton = page.getByRole("button", { name: /subscribe/i }).first();
    await expect(subscribeButton).toBeEnabled();
    await subscribeButton.click();

    await expect(
      page.getByText(/thanks for subscribing/i).first(),
    ).toBeVisible();
  });
});
