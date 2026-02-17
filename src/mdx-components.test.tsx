import { describe, it, expect } from "vitest";
import { render, screen } from "@testing-library/react";
import { useMDXComponents } from "./mdx-components";

describe("Full MDX Components Coverage", () => {
  const components = useMDXComponents({});

  it("should render all custom tags", () => {
    const H1 = components.h1 as any;
    const H2 = components.h2 as any;
    const P = components.p as any;
    const UL = components.ul as any;
    const LI = components.li as any;
    const HR = components.hr as any;
    const Code = components.code as any;
    const BQ = components.blockquote as any;

    render(<H1>H1</H1>);
    render(<H2>H2</H2>);
    render(<P>P</P>);
    render(<UL><LI>LI</LI></UL>);
    render(<HR />);
    render(<BQ>BQ</BQ>);
    render(<Code className="language-typescript">code</Code>);
    
    expect(screen.getByText("H1")).toBeDefined();
    expect(screen.getByText("H2")).toBeDefined();
    expect(screen.getByText("P")).toBeDefined();
    expect(screen.getByText("LI")).toBeDefined();
    expect(screen.getByText("BQ")).toBeDefined();
  });

  it("should render mermaid when code class matches", () => {
    const Code = components.code as any;
    const { container } = render(<Code className="language-mermaid">graph TD;</Code>);
    expect(container.querySelector(".mermaid")).toBeDefined();
  });
});
