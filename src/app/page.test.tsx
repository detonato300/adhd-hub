import { describe, it, expect, vi } from "vitest";
import { render, screen } from "@testing-library/react";
import Home from "./page";

// Mocking framer-motion to simplify rendering
vi.mock("framer-motion", () => ({
  motion: {
    div: ({ children, ...props }: any) => <div {...props}>{children}</div>,
  },
}));

// Mocking sub-components
vi.mock("./components/dashboard", () => ({
  HeroSection: () => <div data-testid="hero">Hero</div>,
  BentoGrid: () => <div data-testid="bento">Bento</div>,
  WhySection: () => <div data-testid="why">Why</div>,
}));

describe("Home Page", () => {
  it("should render main sections of the dashboard", () => {
    render(<Home />);
    expect(screen.getByTestId("hero")).toBeDefined();
    expect(screen.getByTestId("bento")).toBeDefined();
    expect(screen.getByTestId("why")).toBeDefined();
  });
});
