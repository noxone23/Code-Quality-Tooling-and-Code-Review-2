import { COUPON_VALUES } from "./coupons";
import type { CustomerType, Item } from "./types";

const DISCOUNT_RATES: Record<CustomerType, number> = {
  regular: 0,
  member: 0.05,
  vip: 0.15,
};
const FREE_SHIPPING_FROM = 50;
const SHIPPING_COST = 4.99;

function calculateSubtotal(items: Item[]): number {
  return items.reduce((sum, item) => sum + item.price * item.quantity, 0);
}

function applyCoupon(amount: number, couponCode?: string): number {
  const couponValue = couponCode ? (COUPON_VALUES.get(couponCode) ?? 0) : 0;
  return Math.max(0, amount - couponValue);
}

function roundToCents(amount: number): number {
  return Math.round(amount * 100) / 100;
}

export function calculateTotal(
  items: Item[],
  customerType: CustomerType,
  couponCode?: string,
): number {
  const discounted =
    calculateSubtotal(items) * (1 - DISCOUNT_RATES[customerType]);
  const total = applyCoupon(discounted, couponCode);
  const shipping = total < FREE_SHIPPING_FROM ? SHIPPING_COST : 0;
  return roundToCents(total + shipping);
}
