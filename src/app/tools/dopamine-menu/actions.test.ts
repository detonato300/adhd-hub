import { describe, it, expect, vi, beforeEach } from "vitest";
import { addDopamineItem, updateDopamineItem, deleteDopamineItem, getDopamineItems, generateDopamineMenu } from "./actions";
import { db } from "@/db";

vi.mock("@/db", () => ({
  db: (global as any).createDbMock(),
}));

vi.mock("next/cache", () => ({
  revalidatePath: vi.fn(),
}));

vi.mock("@/lib/ai/pollinations", () => ({
  chatCompletion: vi.fn().mockResolvedValue({ content: '[{"label": "Test", "category": "starters"}]' }),
}));

describe("dopamine menu actions", () => {
  beforeEach(() => {
    vi.clearAllMocks();
  });

  it("should add a valid item", async () => {
    const res = await addDopamineItem({ label: "Test", category: "starters" });
    expect(res.success).toBe(true);
    expect(db.insert).toHaveBeenCalled();
  });

  it("should fail validation for invalid item", async () => {
    const res = await addDopamineItem({ label: "", category: "starters" } as any);
    expect(res.success).toBe(false);
  });

  it("should update an item", async () => {
    const res = await updateDopamineItem(1, { label: "Updated", category: "mains" });
    expect(res.success).toBe(true);
    expect(db.update).toHaveBeenCalled();
  });

  it("should delete an item", async () => {
    const res = await deleteDopamineItem(1);
    expect(res.success).toBe(true);
    expect(db.delete).toHaveBeenCalled();
  });

  it("should fetch items", async () => {
    const items = await getDopamineItems();
    expect(Array.isArray(items)).toBe(true);
  });

  it("should handle db error in addDopamineItem", async () => {
    vi.mocked(db.insert).mockReturnValue({
      values: vi.fn().mockRejectedValue(new Error("Insert Error")),
    } as any);
    const res = await addDopamineItem({ label: "Test", category: "starters" });
    expect(res.success).toBe(false);
  });

  it("should handle db error in updateDopamineItem", async () => {
    vi.mocked(db.update).mockReturnValue({
      set: vi.fn().mockReturnValue({
        where: vi.fn().mockRejectedValue(new Error("Update Error")),
      }),
    } as any);
    const res = await updateDopamineItem(1, { label: "Updated", category: "mains" });
    expect(res.success).toBe(false);
  });

  it("should handle fetch error in generateDopamineMenu", async () => {
    const { chatCompletion } = await import("@/lib/ai/pollinations");
    vi.mocked(chatCompletion).mockRejectedValue(new Error("AI Error"));
    const res = await generateDopamineMenu("context");
    expect(res.success).toBe(false);
  });
});
