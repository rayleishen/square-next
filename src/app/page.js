"use client";
import { CreditCard, PaymentForm } from "react-square-web-payments-sdk";
import { submitPayment } from "./actions/actions";

export default function Home() {
  // Replace with your application ID and location ID
  const appId = "sq0idp-z69enspv1J3r73uJYyQ0Ag";
  const locationId = "L4XV1SXY1ECJY";

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
