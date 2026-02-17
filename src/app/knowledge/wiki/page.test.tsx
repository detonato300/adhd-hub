import { describe, it, expect, vi } from "vitest";
import { render, screen, waitFor } from "@testing-library/react";
import WikiIndexPage from "./page";

// Mocking dynamic import
vi.mock("next/dynamic", () => ({
  default: () => () => <div data-testid="about-content">About Content</div>,
}));

describe("Wiki Index Page", () => {
  it("should render wiki categories and main information after mounting", async () => {
    render(<WikiIndexPage />);
    
    // Use regex with case-insensitive and partial match to avoid encoding issues
    await waitFor(() => {
      expect(screen.getByText(/Dashboardu/i)).toBeDefined();
    }, { timeout: 2000 });

    expect(screen.getByText(/Eksploruj/i)).toBeDefined();
    expect(screen.getByText(/Developer Guide/i)).toBeDefined();
    expect(screen.getByTestId("about-content")).toBeDefined();
  });
});
