import { describe, it, expect, vi } from "vitest";
import { render, screen, fireEvent } from "@testing-library/react";
import { AiMenuGenerator } from "./ai-generator";
import * as actions from "../actions";

vi.mock("../actions", () => ({
  generateDopamineMenu: vi.fn(),
  addDopamineItem: vi.fn(),
}));

describe("AiMenuGenerator logic", () => {
  it("should call generate action and show results when button clicked", async () => {
    const mockGenerate = vi.spyOn(actions, "generateDopamineMenu").mockResolvedValue({
      success: true,
      data: [{ label: "AI Activity", category: "starters" }]
    } as any);

    render(<AiMenuGenerator onComplete={() => {}} />);
    
    // Use partial match for placeholder to avoid encoding issues
    const textarea = screen.getByPlaceholderText(/Lubię gry/i);
    fireEvent.change(textarea, { target: { value: "I like sports" } });
    
    const button = screen.getByText(/Wygeneruj propozycje/i);
    fireEvent.click(button);

    expect(mockGenerate).toHaveBeenCalledWith("I like sports");
    
    // Wait for the step to change to 'review'
    expect(await screen.findByText(/AI Activity/i)).toBeDefined();
    expect(screen.getByText(/Wybierz co Ci pasuje/i)).toBeDefined();
  });
});
