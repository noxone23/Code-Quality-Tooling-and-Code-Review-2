import { describe, expect, test } from "vitest";
import { generateCouponCode, isValidCoupon } from "./coupons";

describe("coupons", () => {
  test("accepts SAVE10", () => {
    expect(isValidCoupon("SAVE10")).toBe(true);
  });

  test("rejects other codes", () => {
    expect(isValidCoupon("SAVE11")).toBe(false);
  });

  test("generates a code that starts with SAVE", () => {
    expect(generateCouponCode()).toMatch(/^SAVE\d{1,2}$/);
  });
});
