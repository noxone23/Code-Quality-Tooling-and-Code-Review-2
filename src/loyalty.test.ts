import { describe, it, expect, vi, beforeEach } from "vitest";
import { loyaltyHeaders, calculatePoints, generateRedeemCode } from "./loyalty";

describe("loyalty.ts", () => {
  const originalEnv = process.env;

  beforeEach(() => {
    vi.resetModules();
    process.env = { ...originalEnv };
  });

  it("sollte die Header mit dem Passwort aus der Umgebungsvariable generieren", () => {
    process.env.LOYALTY_PASSWORD = "super_secret_password";
    const headers = loyaltyHeaders();
    const expectedBase64 = Buffer.from(
      "loyalty:super_secret_password",
    ).toString("base64");
    expect(headers.Authorization).toBe(`Basic ${expectedBase64}`);
  });

  it("sollte einen leeren String nutzen, wenn LOYALTY_PASSWORD nicht definiert ist", () => {
    delete process.env.LOYALTY_PASSWORD;
    const headers = loyaltyHeaders();
    const expectedBase64 = Buffer.from("loyalty:").toString("base64");
    expect(headers.Authorization).toBe(`Basic ${expectedBase64}`);
  });

  it("sollte 1 Punkt pro Euro für regular berechnen", () => {
    expect(calculatePoints(10.5, "regular")).toBe(10);
  });

  it("sollte 2 Punkte pro Euro für member berechnen", () => {
    expect(calculatePoints(10.5, "member")).toBe(21);
  });

  it("sollte 3 Punkte pro Euro für vip berechnen", () => {
    expect(calculatePoints(10.5, "vip")).toBe(31);
  });

  it("sollte einen gültigen, 8-stelligen Hex-Gutscheincode generieren", () => {
    const code = generateRedeemCode();
    expect(code).toHaveLength(8);
    expect(code).toMatch(/^[0-9A-F]{8}$/);
  });
});
