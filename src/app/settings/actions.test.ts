import { describe, it, expect, vi, beforeEach } from "vitest";
import { saveSettings, getSettings, getPollinationsStats } from "./actions";
import { db } from "@/db";

// Global fetch mock
global.fetch = vi.fn();

vi.mock("@/db", () => ({
  db: (global as any).createDbMock(),
}));

vi.mock("next/cache", () => ({
  revalidatePath: vi.fn(),
}));

describe("settings actions", () => {
  beforeEach(() => {
    vi.clearAllMocks();
  });

  it("should fetch settings", async () => {
    vi.mocked(db.select).mockReturnValue({
      from: vi.fn().mockResolvedValue([{ key: "TEST", value: "VAL" }]),
    } as any);
    
    const settings = await getSettings();
    expect(settings).toHaveLength(1);
  });

  it("should save settings (insert new)", async () => {
    vi.mocked(db.select).mockReturnValue({
      from: vi.fn().mockReturnValue({
        where: vi.fn().mockResolvedValue([]),
      }),
    } as any);

    const res = await saveSettings("NEW_KEY", "NEW_VAL");
    expect(res.success).toBe(true);
    expect(db.insert).toHaveBeenCalled();
  });

  it("should save settings (update existing)", async () => {
    vi.mocked(db.select).mockReturnValue({
      from: vi.fn().mockReturnValue({
        where: vi.fn().mockResolvedValue([{ key: "OLD", value: "OLD" }]),
      }),
    } as any);

    const res = await saveSettings("OLD", "NEW");
    expect(res.success).toBe(true);
    expect(db.update).toHaveBeenCalled();
  });

  it("should handle error in saveSettings", async () => {
    vi.mocked(db.select).mockReturnValue({
      from: vi.fn().mockReturnValue({
        where: vi.fn().mockRejectedValue(new Error("DB Error")),
      }),
    } as any);

    const res = await saveSettings("KEY", "VAL");
    expect(res.success).toBe(false);
  });

  it("should fetch pollinations stats", async () => {
    vi.mocked(global.fetch).mockResolvedValueOnce({
      ok: true,
      json: () => Promise.resolve({ balance: 100 }),
    } as Response);
    vi.mocked(global.fetch).mockResolvedValueOnce({
      ok: true,
      json: () => Promise.resolve({ data: [{ id: "gpt-4" }] }),
    } as Response);

    const stats = await getPollinationsStats("VALID_KEY");
    expect(stats?.balance).toBe(100);
    expect(stats?.models).toContain("gpt-4");
  });

  it("should handle invalid JSON in getPollinationsStats", async () => {
    vi.mocked(global.fetch).mockResolvedValue({
      ok: true,
      json: () => Promise.reject(new Error("JSON Error")),
    } as Response);

    const stats = await getPollinationsStats("KEY");
    expect(stats).toBeNull();
  });

  it("should return null for stats if no API key", async () => {
    const stats = await getPollinationsStats("");
    expect(stats).toBeNull();
  });

  it("should handle fetch error in getPollinationsStats", async () => {
    vi.mocked(global.fetch).mockRejectedValue(new Error("Network Error"));
    const stats = await getPollinationsStats("KEY");
    expect(stats).toBeNull();
  });

  it("should handle error in getSettings", async () => {
    vi.mocked(db.select).mockReturnValue({
      from: vi.fn().mockRejectedValue(new Error("DB Error")),
    } as any);
    const settings = await getSettings();
    expect(settings).toEqual([]);
  });
});
