import React from "react";
import { describe, it, expect, vi } from "vitest";
import { render, screen } from "@testing-library/react";
import { BrowserRouter } from "react-router-dom";
import { AuthProvider } from "./contexts/AuthContext";
import LoginPage from "./pages/LoginPage";
import "@testing-library/jest-dom";

// モックプロバイダーのラッパーコンポーネント
const AllTheProviders: React.FC<{ children: React.ReactNode }> = ({
  children,
}) => {
  return (
    <BrowserRouter>
      <AuthProvider>{children}</AuthProvider>
    </BrowserRouter>
  );
};

describe("LoginPage", () => {
  it("renders login form correctly", () => {
    render(
      <AllTheProviders>
        <LoginPage />
      </AllTheProviders>,
    );

    // 主要な要素が存在することを確認
    expect(
      screen.getByRole("heading", { name: "ログイン" }),
    ).toBeInTheDocument();
    expect(screen.getByLabelText("メールアドレス:")).toBeInTheDocument();
    expect(screen.getByLabelText("パスワード:")).toBeInTheDocument();
    expect(
      screen.getByRole("button", { name: "ログイン" }),
    ).toBeInTheDocument();
    expect(screen.getByText("サインアップはこちら")).toBeInTheDocument();
  });
});
