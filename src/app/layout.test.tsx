import { describe, it, expect, vi } from "vitest";
import { render, screen } from "@testing-library/react";
import RootLayout from "./layout";

// Mocking Next.js features
vi.mock("next", () => ({
  Metadata: {},
}));

vi.mock("@/components/theme-provider", () => ({
  ThemeProvider: ({ children }: any) => <div data-testid="theme-provider">{children}</div>,
}));

describe("RootLayout", () => {
  it("should render theme provider and main content", () => {
    const { getByTestId, getByRole } = render(
      <RootLayout>
        <div data-testid="child">Test Child</div>
      </RootLayout>
    );
    
    expect(getByTestId("theme-provider")).toBeDefined();
    expect(getByTestId("child")).toBeDefined();
    expect(screen.getByRole("main")).toBeDefined();
  });
});
