import { test, expect } from "@playwright/test";

test.describe("LoginPage", () => {
  test.beforeEach(async ({ page }) => {
    // ログインページにアクセス
    await page.goto("http://localhost:5173/login");
  });

  test("メールアドレスとパスワードが正しく入力された場合、エラーメッセージを表示しない", async ({
    page,
  }) => {
    await page.getByLabel("メールアドレス:").fill("test@example.com");
    await page.getByLabel("パスワード:").fill("password123");
    await page.getByRole("button", { name: "ログイン" }).click();

    // エラーメッセージが表示されていないことを確認
    await expect(page.getByText("メールアドレスは必須です")).toBeHidden();
    await expect(page.getByText("パスワードは必須です")).toBeHidden();
  });

  test("メールアドレスが無効な場合、エラーメッセージを表示する", async ({
    page,
  }) => {
    await page.getByLabel("メールアドレス:").fill("invalid-email");
    await page.getByLabel("パスワード:").fill("password123");
    await page.getByRole("button", { name: "ログイン" }).click();

    await expect(
      page.getByText("有効なメールアドレスを入力してください"),
    ).toBeVisible();
  });

  test("メールアドレスが空の場合、エラーメッセージを表示する", async ({
    page,
  }) => {
    await page.getByLabel("パスワード:").fill("password123");
    await page.getByRole("button", { name: "ログイン" }).click();

    await expect(page.getByText("メールアドレスは必須です")).toBeVisible();
  });

  test("パスワードが空の場合、エラーメッセージを表示する", async ({ page }) => {
    await page.getByLabel("メールアドレス:").fill("test@example.com");
    await page.getByRole("button", { name: "ログイン" }).click();

    await expect(page.getByText("パスワードは必須です")).toBeVisible();
  });

  test("送信中はログインボタンが無効になることを確認する", async ({ page }) => {
    await page.getByLabel("メールアドレス:").fill("test@example.com");
    await page.getByLabel("パスワード:").fill("password123");

    await page.getByRole("button", { name: "ログイン" }).click();
    await expect(page.getByRole("button", { name: "送信中..." })).toBeVisible();
  });
});
