"use client";

import { useState } from "react";
import { CreditCard, PaymentForm } from "react-square-web-payments-sdk";
import { submitPayment } from "./actions/actions";

// Function to send the order details via email after the payment
const sendOrderEmail = async (orderDetails) => {
  try {
    const response = await fetch("/api/send-order-email", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(orderDetails),
    });

    if (response.ok) {
      console.log("Order email sent successfully");
    } else {
      console.error("Error sending order email");
    }
  } catch (error) {
    console.error("Error sending email:", error);
  }
};

export default function Home() {
  const [step, setStep] = useState(1);
  const [orderDetails, setOrderDetails] = useState({
    name: "",
    email: "",
    phone: "",
    address: "",
    quantity: 1,
  });

  const calculateCharge = (quantity) => Math.round(6.99 * quantity * 100);

  const handleSubmitOrder = async () => {
    console.log("Total amount to charge:", calculateCharge(orderDetails.quantity));
    await sendOrderEmail(orderDetails); // Send the email after submitting the order
    setStep(2);
  };

  const renderOrderDetails = () => (
    <div>
      <h2 className="order-header">Second Savour Order Details</h2>
      <form className="order-form">
        <div className="form-group">
          <label>Name:</label>
          <input
            type="text"
            value={orderDetails.name}
            onChange={(e) =>
              setOrderDetails({ ...orderDetails, name: e.target.value })
            }
          />
        </div>
        <div className="form-group">
          <label>Email:</label>
          <input
            type="email"
            value={orderDetails.email}
            onChange={(e) =>
              setOrderDetails({ ...orderDetails, email: e.target.value })
            }
          />
        </div>
        <div className="form-group">
          <label>Phone:</label>
          <input
            type="tel"
            value={orderDetails.phone}
            onChange={(e) =>
              setOrderDetails({ ...orderDetails, phone: e.target.value })
            }
          />
        </div>
        <div className="form-group">
          <label>Address:</label>
          <input
            type="text"
            value={orderDetails.address}
            onChange={(e) =>
              setOrderDetails({ ...orderDetails, address: e.target.value })
            }
          />
        </div>
        <div className="form-group">
          <label>Quantity:</label>
          <input
            type="number"
            min="1"
            value={orderDetails.quantity}
            onChange={(e) =>
              setOrderDetails({
                ...orderDetails,
                quantity: parseInt(e.target.value, 10),
              })
            }
          />
        </div>
        <button type="button" onClick={handleSubmitOrder}>
          Next
        </button>
      </form>
  
      <style>
        {`
          .order-header {
            max-width: 800px;
            margin: 40px auto 20px; /* Added 40px top margin */
            text-align: center;
          }
          .order-form {
            max-width: 800px;
            margin: 0 auto;
          }
          .form-group {
            margin-bottom: 15px;
          }
          label {
            display: block;
            margin-bottom: 5px;
          }
          input,
          textarea {
            width: 100%;
            padding: 8px;
            box-sizing: border-box;
          }
          textarea {
            resize: vertical;
          }
        `}
      </style>
    </div>
  );
  
  
  

  const renderPaymentDetails = () => {
    const totalPrice = (orderDetails.quantity * 6.99).toFixed(2); // Calculate and format total price

    const rawAmount = parseFloat(totalPrice)
    const taxAmount = (totalPrice * 0.05).toFixed(2); // Calculate 5% tax
    const finalPrice = (rawAmount + parseFloat(taxAmount)).toFixed(2); // Add tax to the original amount

    return (
      <div>
        <h2 className="payment-header">Payment Details</h2>
        <p className="payment-text">Subtotal: ${rawAmount} CAD</p>
        <p className="payment-text">Tax: ${taxAmount} CAD</p>
        <p className="payment-text">Total Cost: ${finalPrice} CAD</p>
        <PaymentForm
          applicationId="sq0idp-z69enspv1J3r73uJYyQ0Ag"
          locationId="L4XV1SXY1ECJY"
          cardTokenizeResponseReceived={async (token) => {
            const result = await submitPayment(token.token, orderDetails.quantity);
            console.log(result);
          }}
        >
          <div style={{ maxWidth: "800px", margin: "0 auto" }}>
            <CreditCard />
          </div>
        </PaymentForm>
    
        <style>
          {`
            .payment-header {
              max-width: 800px;
              margin: 40px auto 20px; /* Space from top and between sections */
              text-align: center;
            }
            .payment-text {
              max-width: 800px;
              margin: 0 auto 15px;
              text-align: center;
            }
          `}
        </style>
      </div>
    );
    
  };
  

  return (
    <div>
      {step === 1 && renderOrderDetails()}
      {step === 2 && renderPaymentDetails()}
    </div>
  );
}
