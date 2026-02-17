import { describe, it, expect, vi } from "vitest";
import { render, screen } from "@testing-library/react";
import KnowledgePage from "./page";

// Mocking dynamic import
vi.mock("next/dynamic", () => ({
  default: () => {
    const MockComponent = () => <div data-testid="mdx-content">MDX Content</div>;
    MockComponent.displayName = "MockMDX";
    return MockComponent;
  },
}));

describe("Dynamic Knowledge Page", () => {
  it("should render MDX content for a valid slug", async () => {
    const params = Promise.resolve({ slug: ["manual", "mozh-adhd"] });
    
    // In React 19 / Next.js 15, we can await the component function
    const PageComponent = await KnowledgePage({ params });
    render(PageComponent);
    
    expect(screen.getByTestId("mdx-content")).toBeDefined();
  });
});
