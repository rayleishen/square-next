import { sendOrderEmail } from "../../../lib/sendgrid"; // Import the function that sends the email

export async function POST(req) {
  const orderDetails = await req.json(); // Get the order details from the request body

  try {
    await sendOrderEmail(orderDetails); // Send the email with the order details
    return new Response('Email sent successfully', { status: 200 });
  } catch (error) {
    console.error('Error sending email:', error);
    return new Response('Failed to send email', { status: 500 });
  }
}


