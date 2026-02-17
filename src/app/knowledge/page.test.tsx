import { describe, it, expect } from "vitest";
import { render, screen } from "@testing-library/react";
import KnowledgePage from "./page";

describe("Knowledge Center Index", () => {
  it("should render welcome heading and main sections", () => {
    render(<KnowledgePage />);
    expect(screen.getByText(/Baza Wiedzy/i)).toBeDefined();
    expect(screen.getByText(/Brakująca Instrukcja Obsługi/i)).toBeDefined();
    expect(screen.getByText(/Szukaj w bazie/i)).toBeDefined();
  });
});
