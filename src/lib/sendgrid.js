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
      <p><strong>Address:</strong> ${orderDetails.address}</p>
      <p><strong>Quantity:</strong> ${orderDetails.quantity}</p>
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
