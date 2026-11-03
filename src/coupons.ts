import { randomInt } from "node:crypto";

export const COUPON_VALUES: ReadonlyMap<string, number> = new Map([
  ["SAVE10", 10],
]);

export function generateCouponCode(): string {
  return `SAVE${randomInt(0, 100)}`;
}

export function isValidCoupon(code: string): boolean {
  return COUPON_VALUES.has(code);
}
