import sgMail from '@sendgrid/mail';

sgMail.setApiKey(process.env.SENDGRID_API_KEY);

export async function sendOrderEmail(orderDetails) {
  const msg = {
    to: 'secondsavour@enactussfu.com', // Replace with your recipient email
    cc: 'rayleishen@gmail.com', // Add CC recipient
    from: 'no-reply@sendgrid.oared.dev', // Replace with a verified sender email
    subject: 'New Order Received',
    html: `
    <h3>Order Details</h3>
    <p><strong>Name:</strong> ${orderDetails.name}</p>
    <p><strong>Email:</strong> ${orderDetails.email}</p>
    <p><strong>Phone:</strong> ${orderDetails.phone}</p>
    <p><strong>Street Address:</strong> ${orderDetails.address}</p>
    <p><strong>City:</strong> ${orderDetails.city}</p>
    <p><strong>Province:</strong> ${orderDetails.province}</p>
    <p><strong>Postal/ZIP Code:</strong> ${orderDetails.zip}</p>
    <p><strong>Country:</strong> ${orderDetails.country}</p>
    <p><strong>Quantity:</strong> ${orderDetails.quantity}</p>
    <p><strong>Billing Name:</strong> ${orderDetails.billingName}</p>
    <p><strong>Billing Address:</strong> ${orderDetails.billingAddress}</p>
    <p><strong>Billing City:</strong> ${orderDetails.billingCity}</p>
    <p><strong>Billing Province:</strong> ${orderDetails.billingProvince}</p>
    <p><strong>Billing ZIP Code:</strong> ${orderDetails.billingZip}</p>
    <p><strong>Billing Country:</strong> ${orderDetails.billingCountry}</p>
  `,  
  };

  try {
    await sgMail.send(msg);
    console.log('Email sent successfully');
  } catch (error) {
    console.error('Error sending email:', error);
    throw new Error('Failed to send email');
  }
}
