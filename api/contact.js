import nodemailer from 'nodemailer';

const transporter = nodemailer.createTransport({
  service: 'gmail',
  auth: {
    user: process.env.GMAIL_USER,
    pass: process.env.GMAIL_PASS,
  },
});

export default async function handler(req, res) {
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'POST, OPTIONS');
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type');

  if (req.method === 'OPTIONS') return res.status(200).end();
  if (req.method !== 'POST') return res.status(405).json({ success: false, message: 'Method not allowed' });

  // Validate Environment Variables
  if (!process.env.GMAIL_USER || !process.env.GMAIL_PASS) {
    return res.status(500).json({
      success: false,
      message: 'Server Configuration Error: GMAIL_USER or GMAIL_PASS environment variables are missing on the Vercel deployment.',
      error: 'Missing environment variables.'
    });
  }

  const { fullName, email, company, message } = req.body;

  if (!fullName || !email || !message) {
    return res.status(400).json({ success: false, message: 'Please fill in all required fields.' });
  }

  const mailOptions = {
    from: `"${fullName}" <${process.env.GMAIL_USER}>`,
    replyTo: email,
    to: process.env.GMAIL_USER,
    subject: `New Contact from ${fullName} | Ornitech`,
    text: `
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
📬 NEW CONTACT FORM SUBMISSION
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━

👤 Full Name   : ${fullName}
📧 Email       : ${email}
🏢 Company     : ${company || 'Not provided'}

💬 Message:
${message}

━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
Sent via Ornitech Contact Form
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
    `.trim(),
  };

  const thankYouMail = {
    from: `"Ornitech" <${process.env.GMAIL_USER}>`,
    to: email,
    subject: `Thank you for contacting Ornitech, ${fullName}!`,
    text: `
Hi ${fullName},

Thank you for reaching out to us! We have received your message and will get back to you shortly.

Here's a copy of your submission:

━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
📋 YOUR SUBMISSION DETAILS
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━

👤 Full Name   : ${fullName}
📧 Email       : ${email}
🏢 Company     : ${company || 'Not provided'}

💬 Your Message:
${message}

━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━

Warm regards,
Team Ornitech
📧 ${process.env.GMAIL_USER}
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
    `.trim(),
  };

  try {
    await transporter.sendMail(mailOptions);
    await transporter.sendMail(thankYouMail);
    res.json({ success: true, message: 'Message sent successfully.' });
  } catch (error) {
    console.error('Email error:', error);
    res.status(500).json({
      success: false,
      message: 'Failed to send message.',
      error: error.message,
      code: error.code || null
    });
  }
}
