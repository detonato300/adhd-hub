import { describe, it, expect, vi } from "vitest";
import { render, screen } from "@testing-library/react";
import SettingsPage from "./page";

vi.mock("./actions", () => ({
  getSettings: vi.fn().mockResolvedValue([]),
  saveSettings: vi.fn(),
  getPollinationsStats: vi.fn(),
}));

describe("SettingsPage", () => {
  it("should render correctly", async () => {
    render(<SettingsPage />);
    expect(screen.getByText(/Ustawienia Systemu/i)).toBeDefined();
  });
});
