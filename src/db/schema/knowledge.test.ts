import { describe, it, expect } from "vitest";
import { dopamineMenu, knowledgeMeta, systemSettings } from "./knowledge";

describe("Database Schema Integrity", () => {
  it("should define dopamineMenu table with correct columns", () => {
    expect(dopamineMenu).toBeDefined();
    expect(dopamineMenu.id.name).toBe("id");
    expect(dopamineMenu.category.dataType).toBe("string");
    expect(dopamineMenu.category.enumValues).toContain("starters");
  });

  it("should define knowledgeMeta table with correct columns", () => {
    expect(knowledgeMeta).toBeDefined();
    expect(knowledgeMeta.slug.name).toBe("slug");
  });

  it("should define systemSettings table with correct columns", () => {
    expect(systemSettings).toBeDefined();
    expect(systemSettings.key.name).toBe("key");
    expect(systemSettings.value.name).toBe("value");
  });
});
