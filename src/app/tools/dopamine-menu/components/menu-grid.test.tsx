import { describe, it, expect, vi } from "vitest";
import { render, screen } from "@testing-library/react";
import { MenuGrid } from "./menu-grid";
import { DopamineItem } from "../types";

describe("MenuGrid", () => {
  it("should render empty state when no items", () => {
    render(<MenuGrid sections={[{id: "s", title: "T", icon: "I", desc: "D"}] as any} items={[]} loading={false} onEdit={vi.fn()} onDelete={vi.fn()} />);
    expect(screen.getByText(/Pusto/i)).toBeDefined();
  });

  it("should render items when provided", () => {
    const items: DopamineItem[] = [{ id: 1, label: "Test Item", category: "starters", durationMinutes: "10", effortLevel: "low", createdAt: new Date() }];
    render(<MenuGrid sections={[{id: "starters", title: "T", icon: "I", desc: "D"}] as any} items={items} loading={false} onEdit={vi.fn()} onDelete={vi.fn()} />);
    expect(screen.getByText(/Test Item/i)).toBeDefined();
  });
});
