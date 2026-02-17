import { describe, it, expect, vi } from "vitest";
import { render, screen } from "@testing-library/react";
import DopamineMenuPage from "./page";

vi.mock("./actions", () => ({
  getDopamineItems: vi.fn().mockResolvedValue([]),
  deleteDopamineItem: vi.fn(),
}));

describe("DopamineMenuPage", () => {
  it("should render and show header", async () => {
    render(<DopamineMenuPage />);
    expect(screen.getByText(/Twoje Menu Dopaminowe/i)).toBeDefined();
  });
});
