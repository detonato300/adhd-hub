import { describe, it, expect } from "vitest";
import { success, failure } from "./action-result";

describe("ActionResult utils", () => {
  it("should create a success result", () => {
    const res = success({ id: 1 });
    expect(res.success).toBe(true);
    if (res.success) expect(res.data.id).toBe(1);
  });

  it("should create a failure result", () => {
    const res = failure("Error message", { field: ["error"] });
    expect(res.success).toBe(false);
    if (!res.success) {
      expect(res.error).toBe("Error message");
      expect(res.details?.field).toEqual(["error"]);
    }
  });
});
