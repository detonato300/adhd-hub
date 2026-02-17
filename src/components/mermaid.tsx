"use client";

import { useEffect, useRef } from "react";
import mermaid from "mermaid";

const MERMAID_THEME_VARIABLES = {
  primaryColor: "#1e3a5f",
  primaryTextColor: "#e0e0e0",
  primaryBorderColor: "#4a9eed",
  lineColor: "#4a9eed",
  secondaryColor: "#2d4a3e",
  tertiaryColor: "#2d2d3d",
  background: "#1a1a2e",
  mainBkg: "#1e3a5f",
  nodeBorder: "#4a9eed",
  clusterBkg: "#16213e",
  titleColor: "#e0e0e0",
  edgeLabelBackground: "#1a1a2e"
};

mermaid.initialize({
  startOnLoad: true,
  theme: "dark",
  themeVariables: MERMAID_THEME_VARIABLES,
  securityLevel: "loose",
});

export function Mermaid({ chart }: { chart: string }) {
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (ref.current) {
      mermaid.contentLoaded();
    }
  }, [chart]);

  return (
    <div className="mermaid my-8 flex justify-center bg-card/30 p-6 rounded-xl border border-primary/10 overflow-x-auto shadow-inner" ref={ref}>
      {chart}
    </div>
  );
}
