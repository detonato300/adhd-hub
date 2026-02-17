import { describe, it, expect, vi, beforeEach } from "vitest";
import { chatCompletion } from "./pollinations";

// Mocking global fetch
global.fetch = vi.fn();

// Mocking drizzle-orm and db using global helper
vi.mock("@/db", () => ({
  db: (global as any).createDbMock(),
}));

vi.mock("drizzle-orm", () => ({
  eq: vi.fn(),
}));

describe("pollinations ai lib", () => {
  beforeEach(() => {
    vi.clearAllMocks();
  });

  it("should send a prompt to pollinations and return content", async () => {
    const mockText = "AI Response";
    vi.mocked(global.fetch).mockResolvedValue({
      ok: true,
      text: () => Promise.resolve(mockText),
    } as Response);

    const result = await chatCompletion("Hello AI");
    
    expect(result.content).toBe(mockText);
    expect(global.fetch).toHaveBeenCalledWith(
      "https://text.pollinations.ai/",
      expect.objectContaining({
        method: "POST",
        body: expect.stringContaining("Hello AI"),
      })
    );
  });

  it("should include system message when provided", async () => {
    vi.mocked(global.fetch).mockResolvedValue({
      ok: true,
      text: () => Promise.resolve("OK"),
    } as Response);

    await chatCompletion("User prompt", "System instruction");

    const calls = vi.mocked(global.fetch).mock.calls;
    const fetchBody = JSON.parse(calls[0][1]?.body as string);
    expect(fetchBody.messages).toHaveLength(2);
    expect(fetchBody.messages[0]).toEqual({ role: "system", content: "System instruction" });
  });

  it("should throw error when API response is not ok", async () => {
    vi.mocked(global.fetch).mockResolvedValue({
      ok: false,
      statusText: "Unauthorized",
    } as Response);

    await expect(chatCompletion("Fail")).rejects.toThrow("Pollinations API error: Unauthorized");
  });
});
