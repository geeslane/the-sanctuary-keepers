import { describe, expect, it } from "vitest";
import { credentialsMatch } from "@/lib/admin-credentials";

describe("admin credentials", () => {
  it("accepts the built-in administrator", async () => {
    await expect(credentialsMatch("admin", "admin")).resolves.toBe(true);
    await expect(credentialsMatch(" admin ", "admin")).resolves.toBe(true);
  });

  it("rejects a different username or password", async () => {
    await expect(credentialsMatch("admin", "wrong")).resolves.toBe(false);
    await expect(credentialsMatch("someone", "admin")).resolves.toBe(false);
  });
});
