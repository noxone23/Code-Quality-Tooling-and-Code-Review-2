import { describe, expect, test } from "vitest";
import { calculateTotal } from "./pricing";
import type { Item } from "./types";

const book: Item = { name: "Book", price: 20, quantity: 2 };
const lamp: Item = { name: "Lamp", price: 100, quantity: 1 };

describe("calculateTotal", () => {
  test("adds shipping for small orders", () => {
    expect(calculateTotal([book], "regular")).toBeCloseTo(44.99);
  });

  test("does not add shipping from 50 on", () => {
    expect(calculateTotal([{ ...book, price: 25 }], "regular")).toBe(50);
  });

  test("gives members 5 % off", () => {
    expect(calculateTotal([lamp], "member")).toBe(95);
  });

  test("gives vip customers 15 % off", () => {
    expect(calculateTotal([lamp], "vip")).toBe(85);
  });

  test("subtracts the value of a valid coupon", () => {
    expect(calculateTotal([lamp], "regular", "SAVE10")).toBe(90);
  });

  test("ignores an unknown coupon", () => {
    expect(calculateTotal([lamp], "regular", "NOPE")).toBe(100);
  });

  test("never goes below zero because of a coupon", () => {
    const cheap: Item = { name: "Pen", price: 5, quantity: 1 };
    expect(calculateTotal([cheap], "regular", "SAVE10")).toBeCloseTo(4.99);
  });

  test("charges shipping for an empty order", () => {
    expect(calculateTotal([], "regular")).toBeCloseTo(4.99);
  });
});
