import { describe, it, expect, vi } from "vitest";
import { render, screen } from "@testing-library/react";
import { HeroSection, BentoGrid, WhySection } from "./dashboard";

// Mocking framer-motion
vi.mock("framer-motion", () => ({
  motion: {
    div: ({ children, ...props }: any) => <div {...props}>{children}</div>,
    section: ({ children, ...props }: any) => <section {...props}>{children}</section>,
  },
  Variants: {},
}));

describe("Dashboard Components", () => {
  it("should render HeroSection correctly", () => {
    render(<HeroSection />);
    expect(screen.getByText(/ADHD HUB/i)).toBeDefined();
    expect(screen.getByText(/v0.01 Alpha/i)).toBeDefined();
  });

  it("should render BentoGrid with tools", () => {
    render(<BentoGrid />);
    expect(screen.getByText(/Menu Dopaminowe/i)).toBeDefined();
    expect(screen.getByText(/Pomoc dla Ciebie/i)).toBeDefined();
    expect(screen.getByText(/Ustawienia/i)).toBeDefined();
  });

  it("should render WhySection", () => {
    render(<WhySection />);
    expect(screen.getByText(/Dlaczego ADHD HUB?/i)).toBeDefined();
  });
});
