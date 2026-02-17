import { describe, it, expect, vi } from "vitest";
import { render, screen } from "@testing-library/react";
import { SettingsCard } from "./settings-card";
import { AiStats } from "./ai-stats";

vi.mock("framer-motion", () => ({
  motion: {
    div: ({ children }: any) => <div>{children}</div>,
  },
}));

describe("Settings Components", () => {
  it("AiStats should render balance and models", () => {
    render(<AiStats balance={150.5} models={["gpt-4", "gemini"]} />);
    expect(screen.getByText(/150.50/i)).toBeDefined();
    expect(screen.getByText(/gpt-4/i)).toBeDefined();
  });

  it("SettingsCard should render API key input", () => {
    render(
      <SettingsCard 
        pollinationsKey="sk_123" 
        setPollinationsKey={vi.fn()} 
        isSaving={false} 
        onSave={vi.fn()} 
        onGetKey={vi.fn()} 
        message={null} 
        stats={null} 
        isLoadingStats={false} 
      />
    );
    expect(screen.getByPlaceholderText(/sk_.../i)).toHaveValue("sk_123");
  });
});
