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
    city: "",
    province: "",
    zip: "",
    country: "",
    quantity: 1,
    billingName: "",
    billingAddress: "",
    billingCity: "",
    billingProvince: "",
    billingZip: "",
    billingCountry: ""
  });  

  const [warningMessage, setWarningMessage] = useState('');

  // Handle form data changes
  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({ ...prevData, [name]: value }));
  };

  // Check if all fields are filled out
  const areFieldsFilled = () => {
    return (
      orderDetails.name &&
      orderDetails.email &&
      orderDetails.phone &&
      orderDetails.address &&
      orderDetails.city &&
      orderDetails.province &&
      orderDetails.zip &&
      orderDetails.country &&
      orderDetails.quantity &&
      orderDetails.billingName &&
      orderDetails.billingAddress &&
      orderDetails.billingProvince &&
      orderDetails.billingCity &&
      orderDetails.billingZip &&
      orderDetails.billingCountry
    );
  };
  
  const calculateCharge = (quantity) => Math.round(6.99 * quantity * 100);

  const handleSubmitOrder = async () => {

    if (areFieldsFilled()) {
      // Proceed with order submission
      console.log('Form submitted');
      setWarningMessage('Please fill out all fields');
      console.log("Total amount to charge:", calculateCharge(orderDetails.quantity));
      await sendOrderEmail(orderDetails); //< -- turn this shit off when testing
      setStep(2);
    } else {
      // Show warning message if fields are not filled
      setWarningMessage('Please fill out all fields!');
    }
  };

  const renderOrderDetails = () => (
    <div style={{ backgroundColor: '#f0f0f0', minHeight: '100vh', height: 'auto' }}>
      <img src="/images/SecondSavour_Banner.png" alt="Logo" style={{ minWidth: '100%', maxWidth: '100%', height: 'auto' }} />
      <h2 className="order-header">Order Details</h2>
      <h3 className="order-subheader">*Please note that online purchases are only available for the Lower Mainland region only</h3>
      <form className="order-form">
      <div className="form-group">
          <label>Select Quantity of Citrus Treats Packages:</label>
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

       
        <div className="form-group">
          <h3>Contact Details</h3>
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
          <h3>Delivery</h3>
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
          <label>Country:</label>
          <input
            type="text"
            value={orderDetails.country}
            onChange={(e) =>
              setOrderDetails({ ...orderDetails, country: e.target.value })
            }
          />
        </div>

        <div className="form-group">
          <label>Street Address:</label>
          <input
            type="text"
            value={orderDetails.address}
            onChange={(e) =>
              setOrderDetails({ ...orderDetails, address: e.target.value })
            }
          />
        </div>
        
          <div className="form-group">
            <label>City:</label>
            <input
              type="text"
              value={orderDetails.city}
              onChange={(e) =>
                setOrderDetails({ ...orderDetails, city: e.target.value })
              }
              style={{ width: '100%' }}
            />
          </div>
          <div className="form-group">
            <label>Province:</label>
            <input
              type="text"
              value={orderDetails.province}
              onChange={(e) =>
                setOrderDetails({ ...orderDetails, province: e.target.value })
              }
              style={{ width: '100%' }}
            />
          </div>
          <div className="form-group">
            <label>Postal/ZIP Code:</label>
            <input
              type="text"
              value={orderDetails.zip}
              onChange={(e) =>
                setOrderDetails({ ...orderDetails, zip: e.target.value })
              }
              style={{ width: '100%' }}
            />
          </div>

          <div className="form-group">
          <h3>Billing Details (card payment will be requested in the next page) </h3>
          <label>Billing Name:</label>
          <input
            type="text"
            value={orderDetails.billingName}
            onChange={(e) =>
              setOrderDetails({ ...orderDetails, billingName: e.target.value })
            }
          />
        </div>

          <div className="form-group">
          <label>Billing Country:</label>
          <input
            type="text"
            value={orderDetails.billingCountry}
            onChange={(e) =>
              setOrderDetails({ ...orderDetails, billingCountry: e.target.value })
            }
          />
        </div>

        <div className="form-group">
          <label>Billing Street Address:</label>
          <input
            type="text"
            value={orderDetails.billingAddress}
            onChange={(e) =>
              setOrderDetails({ ...orderDetails, billingAddress: e.target.value })
            }
          />
        </div>
        
          <div className="form-group">
            <label>Billing City:</label>
            <input
              type="text"
              value={orderDetails.billingCity}
              onChange={(e) =>
                setOrderDetails({ ...orderDetails, billingCity: e.target.value })
              }
              style={{ width: '100%' }}
            />
          </div>
          <div className="form-group">
            <label>Billing Province:</label>
            <input
              type="text"
              value={orderDetails.billingProvince}
              onChange={(e) =>
                setOrderDetails({ ...orderDetails, billingProvince: e.target.value })
              }
              style={{ width: '100%' }}
            />
          </div>
          <div className="form-group">
            <label>Billing Postal/ZIP Code:</label>
            <input
              type="text"
              value={orderDetails.billingZip}
              onChange={(e) =>
                setOrderDetails({ ...orderDetails, billingZip: e.target.value })
              }
              style={{ width: '100%' }}
            />
          </div>          
        
        {/* Warning message */}
        {warningMessage && <p style={{ color: 'red' }}>{warningMessage}</p>}

        {/* Submit Button */}

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
            marginBottom: "200px",
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
            margin: 40px auto 10px; /* Added 40px top margin */
            text-align: center;
          }
          .order-subheader {
            max-width: 800px;
            margin: 10px auto 40px; /* Added 40px top margin */
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
          body {
            padding: 0px;
            margin:0px;
          }
          html {
            padding:0px;
            margin:0px;
          }
        `}
      </style>
    </div>
  );

  const renderPaymentDetails = () => {
    const totalPrice = (orderDetails.quantity * 6.99).toFixed(2); // Calculate and format total price

    const rawAmount = parseFloat(totalPrice)
    const taxAmount = (totalPrice * 0.05).toFixed(2); // Calculate 5% tax
    const shippingAmount = 2; // Shipping cost
    const finalPrice = (rawAmount + parseFloat(taxAmount) + shippingAmount).toFixed(2); // Add tax to the original amount

    return (
      <div style={{ backgroundColor: '#f0f0f0', height: '100vh', display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center' }}>

        <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', maxWidth: '100%', marginBottom: '30px' }}>
          <img src="/images/treats.png" alt="Logo" style={{ width: '40%', height: 'auto', marginRight: '20px' }} />
          <div>
            <h2 className="payment-header">Payment Details</h2>
            <p className="payment-text">Subtotal: ${rawAmount} CAD</p>
            <p className="payment-text">Tax: ${taxAmount} CAD</p>
            <p className="payment-text">Shipping: ${shippingAmount} CAD</p>
            <p className="payment-text">Total Cost: ${finalPrice} CAD</p>
          </div>
        </div>
    
        <PaymentForm
          //production
          applicationId="sq0idp-leAPDrw-4oMD6vQXYKhZWA"
          locationId="LVYPE74W6JCDC"

          //sandbox
          //applicationId="sandbox-sq0idb-ayXDRhsJiwimurKk9RNYcA"
          //locationId="LXV6Q4QQXQFCT"

          cardTokenizeResponseReceived={async (token) => {
            const result = await submitPayment(token.token, orderDetails.quantity);
            console.log(result);
            setStep(3);
          }}
        >
          <div style={{margin: "0 auto" }}>
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
            body {
              padding: 0px;
              margin:0px;
            }
            html {
              padding:0px;
              margin:0px;
            }
          `}
        </style>
      </div>
    );
    
    
  };
  
  const renderThankYou = () => {
    return (
      <div style={{ backgroundColor: '#f0f0f0', minHeight: '100vh', textAlign: 'center', padding: '20px' }}>
        {/* Banner Image */}
        <img 
          src="/images/SecondSavour_Banner.png" 
          alt="Logo" 
          style={{ minWidth: '100%', maxWidth: '100%', height: 'auto', marginBottom: '20px' }} 
        />
  
        {/* Thank You Message */}
        <h2 style={{ color: '#333', fontSize: '28px', margin: '20px 0' }}>Thank you for your order!</h2>
        <p style={{ color: '#555', fontSize: '18px', lineHeight: '1.6', maxWidth: '600px', margin: '0 auto' }}>
          We’ve received your order and are processing it. You’ll receive a confirmation email shortly with the details. 
          If you have any questions, feel free to <a href="mailto:secondsavour@enactussfu.com" style={{ color: '#007BFF' }}>contact us</a>.
        </p>
  
        {/* Optional Additional Content */}
        <p style={{ marginTop: '30px', fontSize: '16px', color: '#777' }}>
          Explore more on our <a href="https://www.secondsavour.ca/" style={{ color: '#007BFF' }}>homepage</a>.
        </p>
      </div>
    );
  };
  

  return (
    <div>
      {step === 1 && renderOrderDetails()}
      {step === 2 && renderPaymentDetails()}
      {step === 3 && renderThankYou()}
    </div>
  );
}
