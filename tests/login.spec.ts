import { test, expect } from "@playwright/test";

test.beforeEach(async ({ page }) => {
  // テスト前にアプリケーションのURLに移動
  await page.goto("http://localhost:5173");
});

test("displays error for invalid email", async ({ page }) => {
  await page.fill("#email", "invalid-email");
  await page.fill("#password", "validpassword123");
  await page.click('button[type="submit"]');

  // emailエラーメッセージが表示されることを確認
  await expect(
    page.locator("text=有効なメールアドレスを入力してください。"),
  ).toBeVisible();
  // passwordエラーメッセージが表示されないことを確認
  await expect(
    page.locator("text=パスワードは8文字以上である必要があります。"),
  ).not.toBeVisible();
});

test("displays error for short password", async ({ page }) => {
  await page.fill("#email", "valid@email.com");
  await page.fill("#password", "short");
  await page.click('button[type="submit"]');

  // passwordエラーメッセージが表示されることを確認
  await expect(
    page.locator("text=パスワードは8文字以上である必要があります。"),
  ).toBeVisible();
  // emailエラーメッセージが表示されないことを確認
  await expect(
    page.locator("text=有効なメールアドレスを入力してください。"),
  ).not.toBeVisible();
});

test("no errors displayed for valid input", async ({ page }) => {
  await page.fill("#email", "valid@email.com");
  await page.fill("#password", "validpassword123");
  await page.click('button[type="submit"]');

  // どちらのエラーメッセージも表示されないことを確認
  await expect(
    page.locator("text=有効なメールアドレスを入力してください。"),
  ).not.toBeVisible();
  await expect(
    page.locator("text=パスワードは8文字以上である必要があります。"),
  ).not.toBeVisible();
});
