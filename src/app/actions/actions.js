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

export async function submitPayment(sourceId) {
  try {
    const { result } = await paymentsApi.createPayment({
      idempotencyKey: randomUUID(),
      sourceId,
      amountMoney: {
        currency: "CAD",
        amount: 1,
      },
    });
    return result;
  } catch (error) {
    console.log(error);
  }
}
