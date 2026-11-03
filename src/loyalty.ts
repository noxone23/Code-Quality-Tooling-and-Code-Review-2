import { randomBytes } from "node:crypto";
import type { CustomerType } from "./types";

const POINTS_PER_EURO: Record<CustomerType, number> = {
  regular: 1,
  member: 2,
  vip: 3,
};
const REDEEM_CODE_BYTES = 4;

export function loyaltyHeaders(): Record<string, string> {
  const credentials = Buffer.from(
    `loyalty:${process.env.LOYALTY_PASSWORD ?? ""}`,
  );
  return { Authorization: `Basic ${credentials.toString("base64")}` };
}

export function calculatePoints(
  total: number,
  customerType: CustomerType,
): number {
  return Math.floor(total * POINTS_PER_EURO[customerType]);
}

export function generateRedeemCode(): string {
  return randomBytes(REDEEM_CODE_BYTES).toString("hex").toUpperCase();
}
