import { describe, it, expect, vi } from "vitest";
import { render, screen, fireEvent } from "@testing-library/react";
import { DopamineWizard } from "./wizard";

vi.mock("framer-motion", () => ({
  motion: {
    div: ({ children, ...props }: any) => <div {...props}>{children}</div>,
  },
  AnimatePresence: ({ children }: any) => <>{children}</>,
}));

vi.mock("../actions", () => ({
  addDopamineItem: vi.fn().mockResolvedValue({ success: true }),
  updateDopamineItem: vi.fn().mockResolvedValue({ success: true }),
}));

describe("DopamineWizard full flow", () => {
  it("should complete the full wizard flow and call onComplete", async () => {
    const onComplete = vi.fn();
    render(<DopamineWizard onComplete={onComplete} />);
    
    // Step 1: Label
    const input = screen.getByPlaceholderText(/np. Szybki spacer/i);
    fireEvent.change(input, { target: { value: "New Activity" } });
    fireEvent.click(screen.getByText(/Dalej/i));
    
    // Step 2: Category
    fireEvent.click(screen.getByText(/Przystawka/i));
    fireEvent.click(screen.getByText(/Dalej/i));
    
    // Step 3: Details
    fireEvent.change(screen.getByPlaceholderText(/np./i), { target: { value: "15" } });
    fireEvent.click(screen.getByText(/Dalej/i));
    
    // Step 4: Review and Save
    const saveBtn = screen.getByText(/Zapisz w Menu/i);
    fireEvent.click(saveBtn);
    
    // Check if onComplete was called (async)
    await vi.waitFor(() => expect(onComplete).toHaveBeenCalled());
  });
});
