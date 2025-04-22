import nodemailer from 'nodemailer';

const transporter = nodemailer.createTransport({
  host: process.env.EMAIL_SERVER_HOST,
  port: parseInt(process.env.EMAIL_SERVER_PORT || '465'),
  secure: process.env.EMAIL_SERVER_PORT === '465', // true for 465, false for other ports
  auth: {
    user: process.env.EMAIL_SERVER_USER,
    pass: process.env.EMAIL_SERVER_PASSWORD,
  },
});

export const sendVerificationEmail = async (
  email: string,
  token: string,
  name?: string
) => {
  const verificationUrl = `${process.env.NEXTAUTH_URL}/verify-email?token=${token}`;

  const htmlContent = `
    <!DOCTYPE html>
    <html lang="en">
    <head>
      <meta charset="UTF-8">
      <meta name="viewport" content="width=device-width, initial-scale=1.0">
      <title>Verify Your Email</title>
      <style>
        body {
          font-family: Arial, sans-serif;
          line-height: 1.6;
          color: #333;
          max-width: 600px;
          margin: 0 auto;
          padding: 20px;
        }
        .container {
          background-color: #f9f9f9;
          border-radius: 8px;
          padding: 30px;
          border: 1px solid #e0e0e0;
        }
        .header {
          text-align: center;
          margin-bottom: 20px;
        }
        .header img {
          max-width: 150px;
          margin-bottom: 10px;
        }
        h1 {
          color: #003d5b;
          margin-bottom: 15px;
        }
        .button {
          display: inline-block;
          background-color: #005900;
          color: white;
          text-decoration: none;
          padding: 12px 24px;
          border-radius: 4px;
          margin: 25px 0;
          font-weight: bold;
        }
        .footer {
          margin-top: 30px;
          text-align: center;
          color: #666;
          font-size: 12px;
        }
      </style>
    </head>
    <body>
      <div class="container">
        <div class="header">
          <img src="${process.env.NEXTAUTH_URL}/malfoy_logo.png" alt="Malfoy Logo">
          <h1>Email Verification</h1>
        </div>
        
        <p>Hello ${name || 'there'},</p>
        
        <p>Welcome to Malfoy! Please verify your email address by clicking the button below:</p>
        
        <div style="text-align: center;">
          <a href="${verificationUrl}" class="button">Verify Email</a>
        </div>
        
        <p>If you didn't sign up for an account, you can safely ignore this email.</p>
        
        <p>Thanks,<br>
        The Malfoy Team</p>
      </div>
      
      <div class="footer">
        <p>This email was sent to ${email}.</p>
        <p>© ${new Date().getFullYear()} Malfoy. All rights reserved.</p>
      </div>
    </body>
    </html>
  `;

  return transporter.sendMail({
    from: process.env.EMAIL_FROM,
    to: email,
    subject: 'Verify Your Email for Malfoy',
    html: htmlContent,
  });
};

export const sendEarlyAccessConfirmation = async (
  email: string,
  name?: string
) => {
  const htmlContent = `
    <!DOCTYPE html>
    <html lang="en">
    <head>
      <meta charset="UTF-8">
      <meta name="viewport" content="width=device-width, initial-scale=1.0">
      <title>Early Access Request Received</title>
      <style>
        body {
          font-family: Arial, sans-serif;
          line-height: 1.6;
          color: #333;
          max-width: 600px;
          margin: 0 auto;
          padding: 20px;
        }
        .container {
          background-color: #f9f9f9;
          border-radius: 8px;
          padding: 30px;
          border: 1px solid #e0e0e0;
        }
        .header {
          text-align: center;
          margin-bottom: 20px;
        }
        .header img {
          max-width: 150px;
          margin-bottom: 10px;
        }
        h1 {
          color: #003d5b;
          margin-bottom: 15px;
        }
        .footer {
          margin-top: 30px;
          text-align: center;
          color: #666;
          font-size: 12px;
        }
      </style>
    </head>
    <body>
      <div class="container">
        <div class="header">
          <img src="${process.env.NEXTAUTH_URL}/malfoy_logo.png" alt="Malfoy Logo">
          <h1>Early Access Request Received</h1>
        </div>
        
        <p>Hello ${name || 'there'},</p>
        
        <p>Thank you for your interest in Malfoy! We've received your request for early access.</p>
        
        <p>Our team will review your application and get back to you soon with more details about our platform and when you can expect to gain access.</p>
        
        <p>Thanks for your patience,<br>
        The Malfoy Team</p>
      </div>
      
      <div class="footer">
        <p>This email was sent to ${email}.</p>
        <p>© ${new Date().getFullYear()} Malfoy. All rights reserved.</p>
      </div>
    </body>
    </html>
  `;

  return transporter.sendMail({
    from: process.env.EMAIL_FROM,
    to: email,
    subject: 'Early Access Request Received - Malfoy',
    html: htmlContent,
  });
};

export const sendEarlyAccessNotification = async (
  userEmail: string,
  userName?: string,
  company?: string,
  message?: string
) => {
  const htmlContent = `
    <!DOCTYPE html>
    <html lang="en">
    <head>
      <meta charset="UTF-8">
      <meta name="viewport" content="width=device-width, initial-scale=1.0">
      <title>New Early Access Request</title>
      <style>
        body {
          font-family: Arial, sans-serif;
          line-height: 1.6;
          color: #333;
          max-width: 600px;
          margin: 0 auto;
          padding: 20px;
        }
        .container {
          background-color: #f9f9f9;
          border-radius: 8px;
          padding: 30px;
          border: 1px solid #e0e0e0;
        }
        h1 {
          color: #003d5b;
          margin-bottom: 15px;
        }
        .detail {
          margin-bottom: 15px;
        }
        .label {
          font-weight: bold;
        }
      </style>
    </head>
    <body>
      <div class="container">
        <h1>New Early Access Request</h1>
        
        <div class="detail">
          <p class="label">Email:</p>
          <p>${userEmail}</p>
        </div>
        
        <div class="detail">
          <p class="label">Name:</p>
          <p>${userName || 'Not provided'}</p>
        </div>
        
        <div class="detail">
          <p class="label">Company:</p>
          <p>${company || 'Not provided'}</p>
        </div>
        
        <div class="detail">
          <p class="label">Message:</p>
          <p>${message || 'Not provided'}</p>
        </div>
      </div>
    </body>
    </html>
  `;

  return transporter.sendMail({
    from: process.env.EMAIL_FROM,
    to: process.env.EMAIL_FROM, // Send to yourself
    subject: 'New Early Access Request - Malfoy',
    html: htmlContent,
  });
}; 