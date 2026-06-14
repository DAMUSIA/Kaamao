import { describe, it, expect, vi, beforeEach } from "vitest";

const { chain } = vi.hoisted(() => {
  const chain = {
    select: vi.fn().mockReturnThis(),
    insert: vi.fn().mockReturnThis(),
    eq: vi.fn().mockReturnThis(),
    limit: vi.fn().mockReturnThis(),
    then: vi.fn((onfulfilled) => {
      return Promise.resolve({
        data: [],
        error: null,
        count: null,
      }).then(onfulfilled);
    }),
  };

  return { chain };
});

vi.mock("@supabase/supabase-js", () => {
  return {
    createClient: vi.fn(() => ({
      from: vi.fn().mockReturnValue(chain),
    })),
  };
});

// Import the module after mocking
import {
  isSupabaseConfigured,
  logClick,
} from "../lib/supabase";

describe("Supabase Client Configuration", () => {
  it("should export isSupabaseConfigured as a boolean", () => {
    expect(typeof isSupabaseConfigured).toBe("boolean");
  });
});

describe("logClick", () => {
  beforeEach(() => {
    vi.clearAllMocks();
  });

  it("should log event details and not throw errors", async () => {
    const consoleSpy = vi.spyOn(console, "log");
    await logClick("visitor-123", "test-project", true);
    
    if (isSupabaseConfigured) {
      expect(consoleSpy).toHaveBeenCalledWith("Analytics Event:", {
        visitorId: "visitor-123",
        projectId: "test-project",
        clickedJoin: true,
      });
    } else {
      const warnSpy = vi.spyOn(console, "warn");
      await logClick("visitor-123", "test-project", true);
      expect(warnSpy).toHaveBeenCalled();
    }
  });
});
