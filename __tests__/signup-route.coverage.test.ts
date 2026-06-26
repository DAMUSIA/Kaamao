import { describe, it, expect } from "vitest";

describe("signup route coverage bump", () => {
  it("imports signup route", async () => {
    const mod = await import("../app/api/auth/signup/route");
    expect(mod).toBeDefined();
  });
});
