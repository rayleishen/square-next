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
    <div style={{ backgroundColor: '#f0f0f0', height: '100vh' }}>
      <img src="/images/SecondSavour_Banner.png" alt="Logo" style={{ maxWidth: '100%', height: 'auto' }} />
      <h2 className="order-header">Order Details</h2>
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
        <button
          type="button"
          onClick={handleSubmitOrder}
          style={{
            backgroundColor: "#007BFF", // Blue background
            color: "#FFFFFF", // White text
            border: "none", // Remove border
            borderRadius: "5px", // Rounded corners
            padding: "10px 20px", // Padding for size
            fontSize: "16px", // Larger text
            fontWeight: "bold", // Bold text
            cursor: "pointer", // Pointer cursor on hover
            boxShadow: "0 4px 6px rgba(0, 0, 0, 0.1)", // Subtle shadow
            transition: "background-color 0.3s ease", // Smooth color transition
          }}
          onMouseOver={(e) => (e.target.style.backgroundColor = "#0056b3")} // Darker blue on hover
          onMouseOut={(e) => (e.target.style.backgroundColor = "#007BFF")} // Original color on mouse out
        >
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
      <div style={{ backgroundColor: '#f0f0f0', height: '100vh', display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center' }}>
        <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', maxWidth: '100%', marginBottom: '30px' }}>
          <img src="/images/treats.png" alt="Logo" style={{ width: '40%', height: 'auto', marginRight: '20px' }} />
          <div>
            <h2 className="payment-header">Payment Details</h2>
            <p className="payment-text">Subtotal: ${rawAmount} CAD</p>
            <p className="payment-text">Tax: ${taxAmount} CAD</p>
            <p className="payment-text">Total Cost: ${finalPrice} CAD</p>
          </div>
        </div>
    
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
              text-align: left;
            }
            .payment-text {
              text-align: left;
              margin: 0 0 15px;
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
