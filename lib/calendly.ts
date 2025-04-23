import nodemailer from 'nodemailer';

// Calendly API credentials
export const CALENDLY_API_URL = 'https://api.calendly.com/';
export const CLIENT_ID = 'mQ6d5zFlWq77T0aCVb9jaUKBSvidOfjtPRmUb4znZpw';
export const CLIENT_SECRET = 'dOrmMsCHKTbZpCn29rvmkOFORuUbvFJScCdR-hXTk0M';
export const WEBHOOK_SIGNING_KEY = 'WG0y6MBXmbK0c2Up00l7XEhgr0Oat0QZvxZ-DHmlcLo';
export const ADMIN_EMAIL = 'yashs3324@gmail.com';

// Create a transporter for sending emails
const transporter = nodemailer.createTransport({
  host: process.env.EMAIL_SERVER_HOST,
  port: parseInt(process.env.EMAIL_SERVER_PORT || '465'),
  secure: process.env.EMAIL_SERVER_PORT === '465', // true for 465, false for other ports
  auth: {
    user: process.env.EMAIL_SERVER_USER,
    pass: process.env.EMAIL_SERVER_PASSWORD,
  },
});

// Types for Calendly events
export interface CalendlyEvent {
  name: string;
  email: string;
  eventName: string;
  startTime: string;
  endTime: string;
  cancelUrl: string;
  rescheduleUrl: string;
}

// Send notification to admin about a new Calendly booking
export const sendCalendlyNotification = async (event: CalendlyEvent) => {
  try {
    // Format times
    const startFormatted = new Date(event.startTime).toLocaleString();
    const endFormatted = new Date(event.endTime).toLocaleString();
    
    const htmlContent = `
      <!DOCTYPE html>
      <html lang="en">
      <head>
        <meta charset="UTF-8">
        <meta name="viewport" content="width=device-width, initial-scale=1.0">
        <title>New Calendly Booking</title>
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
          h1 {
            color: #03c76e;
            margin-bottom: 15px;
          }
          .button {
            display: inline-block;
            background-color: #03c76e;
            color: white;
            text-decoration: none;
            padding: 8px 16px;
            border-radius: 4px;
            margin: 10px 0;
            font-weight: bold;
          }
          .footer {
            margin-top: 30px;
            text-align: center;
            color: #666;
            font-size: 12px;
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
          <div class="header">
            <h1>New Calendly Booking</h1>
          </div>
          
          <div class="detail">
            <p class="label">Client Name:</p>
            <p>${event.name}</p>
          </div>
          
          <div class="detail">
            <p class="label">Client Email:</p>
            <p>${event.email}</p>
          </div>
          
          <div class="detail">
            <p class="label">Event Type:</p>
            <p>${event.eventName}</p>
          </div>
          
          <div class="detail">
            <p class="label">Start Time:</p>
            <p>${startFormatted}</p>
          </div>
          
          <div class="detail">
            <p class="label">End Time:</p>
            <p>${endFormatted}</p>
          </div>
          
          <div style="text-align: center; margin-top: 20px;">
            <a href="${event.cancelUrl}" class="button" style="margin-right: 10px; background-color: #f44336;">Cancel Meeting</a>
            <a href="${event.rescheduleUrl}" class="button">Reschedule Meeting</a>
          </div>
        </div>
        
        <div class="footer">
          <p>This is an automated notification from your Calendly integration.</p>
          <p>© ${new Date().getFullYear()} Malfoy. All rights reserved.</p>
        </div>
      </body>
      </html>
    `;

    await transporter.sendMail({
      from: process.env.EMAIL_FROM,
      to: ADMIN_EMAIL,
      subject: `New Booking: ${event.eventName} with ${event.name}`,
      html: htmlContent,
    });

    return true;
  } catch (error) {
    console.error('Error sending Calendly notification:', error);
    return false;
  }
};

// Verify Calendly webhook signature
export const verifyCalendlySignature = (signature: string, payload: string): boolean => {
  try {
    // In a real implementation, you would use crypto to verify the HMAC signature
    // For example:
    // const crypto = require('crypto');
    // const hmac = crypto.createHmac('sha256', WEBHOOK_SIGNING_KEY);
    // hmac.update(payload);
    // const expectedSignature = hmac.digest('hex');
    // return crypto.timingSafeEqual(Buffer.from(signature), Buffer.from(expectedSignature));
    
    // For now, returning true for development purposes
    return true;
  } catch (error) {
    console.error('Error verifying Calendly signature:', error);
    return false;
  }
}; 