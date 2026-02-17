import { describe, it, expect, vi } from "vitest";
import { render, screen } from "@testing-library/react";
import { MenuHeader } from "./menu-header";
import { RandomizerSection } from "./randomizer-section";

vi.mock("lucide-react", () => ({
  ArrowLeft: () => <div>ArrowLeft</div>,
  Wand2: () => <div>Wand2</div>,
  Plus: () => <div>Plus</div>,
  X: () => <div>X</div>,
  Sparkles: () => <div>Sparkles</div>,
}));

describe("Dopamine Menu Helpers", () => {
  it("MenuHeader should render title and buttons", () => {
    render(<MenuHeader onShowAi={vi.fn()} onToggleWizard={vi.fn()} showWizard={false} />);
    expect(screen.getByText(/Twoje Menu Dopaminowe/i)).toBeDefined();
    expect(screen.getByText(/AI Generator/i)).toBeDefined();
  });

  it("RandomizerSection should render random button", () => {
    render(<RandomizerSection onRandomize={vi.fn()} />);
    expect(screen.getByText(/Wylosuj mi/i)).toBeDefined();
  });
});
