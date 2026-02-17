import { vi } from "vitest";

export const createDbMock = () => {
  const mock = {
    insert: vi.fn().mockReturnThis(),
    update: vi.fn().mockReturnThis(),
    delete: vi.fn().mockReturnThis(),
    select: vi.fn().mockReturnThis(),
    from: vi.fn().mockReturnThis(),
    where: vi.fn().mockReturnThis(),
    values: vi.fn().mockReturnThis(),
    set: vi.fn().mockReturnThis(),
    execute: vi.fn().mockResolvedValue([]),
    // Support for both chained and direct promise resolution
    then: vi.fn((onFullfilled) => {
      if (onFullfilled) return Promise.resolve([]).then(onFullfilled);
      return Promise.resolve([]);
    }),
  };
  return mock as any; // Still one cast here, but central
};
