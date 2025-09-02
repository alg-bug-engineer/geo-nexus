import { NextResponse } from 'next/server';
import { Resend } from 'resend';

// Initialize Resend with the API key from your .env.local file
const resend = new Resend(process.env.RESEND_API_KEY);

export async function POST(request: Request) {
  try {
    // Parse the incoming form data
    const body = await request.json();
    const { name, email, company, message } = body;

    // Use Resend to send the email
    const { data, error } = await resend.emails.send({
      // IMPORTANT: This 'from' address MUST be 'onboarding@resend.dev' for the free plan.
      // To use your own domain, you must verify it in the Resend dashboard.
      from: 'GEO Nexus Contact Form <onboarding@resend.dev>',

      // Your email address where you'll receive the form submissions
      to: ['zhangwwlsm@gmail.com'], 

      subject: `New Consulting Request from ${name}`,

      // A simple HTML body for the email
      html: `
        <h1>New Consulting Request</h1>
        <p><strong>Name:</strong> ${name}</p>
        <p><strong>Email:</strong> ${email}</p>
        <p><strong>Company:</strong> ${company || 'Not provided'}</p>
        <hr>
        <p><strong>Message:</strong></p>
        <p>${message}</p>
      `
    });

    // Handle potential errors from the email service
    if (error) {
      console.error("Resend error:", error);
      return NextResponse.json({ message: 'Error sending email.', error }, { status: 500 });
    }

    // Send a success response back to the form
    return NextResponse.json({ message: 'Form submitted successfully!', data }, { status: 200 });

  } catch (error) {
    console.error("API error:", error);
    return NextResponse.json({ message: 'Error processing request.' }, { status: 500 });
  }
}
