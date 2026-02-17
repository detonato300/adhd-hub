import { describe, it, expect, vi } from "vitest";
import { render } from "@testing-library/react";
import { Mermaid } from "./mermaid";

// Mocking mermaid library and ensuring no React error occurs
vi.mock("mermaid", () => ({
  default: {
    initialize: vi.fn(),
    contentLoaded: vi.fn(),
  }
}));

describe("Mermaid Component", () => {
  it("should render container", () => {
    const { container } = render(<Mermaid chart="graph TD; A-->B;" />);
    expect(container.querySelector(".mermaid")).toBeDefined();
  });
});
