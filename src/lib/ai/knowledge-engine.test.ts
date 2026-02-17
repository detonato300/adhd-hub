import { describe, it, expect, vi, beforeEach } from "vitest";
import { getFullKnowledgeContext, askGeminiWithContext } from "./knowledge-engine";
import { promises as fs } from "fs";

vi.mock("./pollinations", () => ({
  chatCompletion: vi.fn().mockResolvedValue({ content: "AI Answer" }),
}));

describe("knowledge engine", () => {
  beforeEach(() => {
    vi.clearAllMocks();
  });

  it("should build context from files", async () => {
    // Spying instead of global mock to avoid ERR_INVALID_ARG_VALUE
    const readdirSpy = vi.spyOn(fs, "readdir").mockResolvedValue(["test.mdx"] as any);
    const readFileSpy = vi.spyOn(fs, "readFile").mockResolvedValue("Test content" as any);

    const context = await getFullKnowledgeContext();
    
    expect(context).toContain("Test content");
    expect(context).toContain("test.mdx");
    
    readdirSpy.mockRestore();
    readFileSpy.mockRestore();
  });

  it("should handle missing directories gracefully", async () => {
    const readdirSpy = vi.spyOn(fs, "readdir").mockRejectedValue(new Error("Not found"));

    const context = await getFullKnowledgeContext();
    expect(context).toContain("Oto baza wiedzy");
    
    readdirSpy.mockRestore();
  });

  it("should call chatCompletion with context", async () => {
    const result = await askGeminiWithContext("User question");
    expect(result.content).toBe("AI Answer");
  });
});
