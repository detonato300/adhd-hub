import { describe, it, expect, vi, beforeEach } from "vitest";
import { render, screen, fireEvent, act } from "@testing-library/react";
import { TTSPlayer } from "./tts-player";

describe("TTSPlayer robust testing", () => {
  beforeEach(() => {
    vi.clearAllMocks();
    window.speechSynthesis.cancel();
  });

  it("should render player controls and handle speaking flow", async () => {
    await act(async () => {
      render(<div id="mdx-article">Some content to read</div>);
      render(<TTSPlayer />);
    });
    
    const title = await screen.findByText(/Audio Reader/i);
    expect(title).toBeDefined();
    
    // Play button
    const playBtn = screen.getByLabelText(/Odtw/i);
    await act(async () => {
      fireEvent.click(playBtn);
    });
    
    expect(window.speechSynthesis.speak).toHaveBeenCalled();
  });

  it("should restart from beginning", async () => {
    await act(async () => {
      render(<div id="mdx-article">Content</div>);
      render(<TTSPlayer />);
    });

    const restartBtn = await screen.findByLabelText(/pocz/i);
    
    await act(async () => {
      fireEvent.click(restartBtn);
    });
    
    expect(window.speechSynthesis.cancel).toHaveBeenCalled();
    
    // Simple wait for the internal setTimeout(speak, 100)
    await new Promise(r => setTimeout(r, 200));
    
    expect(window.speechSynthesis.speak).toHaveBeenCalled();
  });
});
