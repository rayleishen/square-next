"use server";

import { Client } from "square";
import { randomUUID } from "crypto";

BigInt.prototype.toJSON = function () {
  return this.toString();
};

const { paymentsApi } = new Client({
  accessToken: process.env.SQUARE_ACCESS_TOKEN,
  environment: "production",
});

/**
 * Submits a payment to the Square API.
 * @param {string} sourceId - The payment source ID (e.g., token from PaymentForm).
 * @param {number} quantity - The number of items being purchased.
 */
export async function submitPayment(sourceId, quantity) {
  const rawAmount = Math.round(6.99 * quantity * 100); // Calculate amount in cents
  const taxAmount = Math.round(rawAmount * 0.05); // Calculate 5% tax
  const amount = rawAmount + taxAmount; // Add tax to the original amount
  
  try {
    const { result } = await paymentsApi.createPayment({
      idempotencyKey: randomUUID(),
      sourceId,
      amountMoney: {
        currency: "CAD",
        amount,
      },
    });
    return result;
  } catch (error) {
    console.error("Error processing payment:", error);
    throw new Error("Payment processing failed");
  }
}
