import { describe, it, expect } from "vitest";
import { render } from "@testing-library/react";
import { ThemeProvider } from "./theme-provider";

describe("ThemeProvider", () => {
  it("should render children", () => {
    const { getByText } = render(
      <ThemeProvider attribute="class" defaultTheme="system" enableSystem>
        <div>Content</div>
      </ThemeProvider>
    );
    expect(getByText("Content")).toBeDefined();
  });
});
