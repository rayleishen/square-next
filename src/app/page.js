"use client";
import { CreditCard, PaymentForm } from "react-square-web-payments-sdk";
import { submitPayment } from "./actions/actions";

export default function Home() {
  // Replace with your application ID and location ID
  const appId = "sandbox-sq0idb-ayXDRhsJiwimurKk9RNYcA";
  const locationId = "LXV6Q4QQXQFCT";

  return (
    <PaymentForm
      applicationId={appId}
      locationId={locationId}
      cardTokenizeResponseReceived={async (token) => {
        const result = await submitPayment(token.token);
        console.log(result);
      }}
    >
      <CreditCard />
    </PaymentForm>
  );
}
