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

// Ensure the correct logo URL
const logoUrl = `${process.env.NEXTAUTH_URL}/malfoy_logo.png`; // Using PNG for better email client compatibility

// Shared email template with dark/light mode support
const createEmailTemplate = (content: string, email: string) => {
  return `
    <!DOCTYPE html>
    <html lang="en">
    <head>
      <meta charset="UTF-8">
      <meta name="viewport" content="width=device-width, initial-scale=1.0">
      <meta name="color-scheme" content="light dark">
      <meta name="supported-color-schemes" content="light dark">
      <title>Malfoy</title>
      <style>
        :root {
          color-scheme: light dark;
          supported-color-schemes: light dark;
        }
        
        body {
          font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif;
          line-height: 1.6;
          color: #333333;
          background-color: #ffffff;
          max-width: 600px;
          margin: 0 auto;
          padding: 0;
        }
        
        .wrapper {
          background-color: #f3f3f3;
          padding: 40px 20px;
        }
        
        .container {
          background-color: #ffffff;
          border-radius: 12px;
          box-shadow: 0 4px 12px rgba(0, 0, 0, 0.05);
          padding: 40px;
          margin-bottom: 20px;
        }
        
        .header {
          text-align: center;
          margin-bottom: 30px;
          padding-bottom: 20px;
          border-bottom: 1px solid #eeeeee;
        }
        
        .header img {
          max-width: 180px;
          margin-bottom: 15px;
        }
        
        h1 {
          color: #333333;
          font-size: 24px;
          font-weight: 600;
          margin: 0;
          margin-bottom: 10px;
        }
        
        p {
          font-size: 16px;
          margin: 16px 0;
        }
        
        .button {
          display: inline-block;
          background-color: #03c76e;
          color: white !important;
          text-decoration: none;
          padding: 12px 28px;
          border-radius: 6px;
          margin: 25px 0;
          font-weight: 500;
          font-size: 16px;
          text-align: center;
          transition: background-color 0.3s;
        }
        
        .button:hover {
          background-color: #02a55c;
        }
        
        .footer {
          text-align: center;
          color: #888888;
          font-size: 13px;
          padding: 0 20px;
        }
        
        .footer p {
          margin: 8px 0;
          font-size: 13px;
        }
        
        .detail {
          margin-bottom: 20px;
          padding: 15px;
          background-color: #f9f9f9;
          border-radius: 6px;
        }
        
        .label {
          font-weight: 600;
          margin-bottom: 5px;
          color: #444444;
        }
        
        .alert {
          background-color: #fff8e6;
          border-left: 4px solid #ffc107;
          color: #856404;
          padding: 15px;
          border-radius: 6px;
          margin: 25px 0;
        }
        
        @media (prefers-color-scheme: dark) {
          body {
            background-color: #1a1a1a;
            color: #e8e8e8;
          }
          
          .wrapper {
            background-color: #1a1a1a;
          }
          
          .container {
            background-color: #2a2a2a;
            box-shadow: 0 4px 12px rgba(0, 0, 0, 0.2);
          }
          
          h1 {
            color: #ffffff;
          }
          
          .header {
            border-bottom: 1px solid #3a3a3a;
          }
          
          .detail {
            background-color: #333333;
          }
          
          .label {
            color: #cccccc;
          }
          
          .alert {
            background-color: #3a3023;
            border-left: 4px solid #ffc107;
            color: #ffe083;
          }
          
          .footer {
            color: #aaaaaa;
          }
        }
      </style>
    </head>
    <body>
      <div class="wrapper">
        <div class="container">
          ${content}
        </div>
        
        <div class="footer">
          <p>This email was sent to ${email}</p>
          <p>© ${new Date().getFullYear()} Malfoy. All rights reserved.</p>
          <p>Malfoy - AI-powered pricing intelligence for e-commerce</p>
        </div>
      </div>
    </body>
    </html>
  `;
};

export const sendVerificationEmail = async (
  email: string,
  token: string,
  name?: string
) => {
  const verificationUrl = `${process.env.NEXTAUTH_URL}/verify-email?token=${token}`;

  const content = `
    <div class="header">
      <h1>s from malfoy</h1>
      <h2>Verify Your Email</h2>
    </div>
    
    <p>Hello ${name || 'there'},</p>
    
    <p>Welcome to Malfoy! Please verify your email address to get started with our AI-powered pricing intelligence platform.</p>
    
    <div style="text-align: center;">
      <a href="${verificationUrl}" class="button">Verify Email Address</a>
    </div>
    
    <p style="margin-top: 30px;">This link will expire in 24 hours. If you didn't create a Malfoy account, you can safely ignore this email.</p>
    
    <p style="margin-top: 30px;">Thanks,<br>
    The Malfoy Team</p>
  `;

  const htmlContent = createEmailTemplate(content, email);

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
  const content = `
    <div class="header">
      <h1>Greetings from malfoy</h1>
      <h2>Early Access Request Received</h2>
    </div>
    
    <p>Hello ${name || 'there'},</p>
    
    <p>Thank you for your interest in Malfoy's AI-powered pricing intelligence platform. We've received your request for early access and are excited about your interest in our solution.</p>
    
    <p>Our team will review your application and reach out with more information about our platform and timeline for access. We're currently onboarding select partners and will be in touch soon.</p>
    
    <p style="margin-top: 30px;">Thanks for your patience,<br>
    The Malfoy Team</p>
  `;

  const htmlContent = createEmailTemplate(content, email);

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
  const content = `
    <div class="header">
      <h1>Greetings from malfoy</h1>
      <h2>New Early Access Request</h2>
    </div>
    
    <p>A new user has requested early access to the Malfoy platform.</p>
    
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
      <p>${message ? message.replace(/\n/g, '<br>') : 'Not provided'}</p>
    </div>
  `;

  const htmlContent = createEmailTemplate(content, process.env.EMAIL_FROM || '');

  return transporter.sendMail({
    from: process.env.EMAIL_FROM,
    to: process.env.EMAIL_FROM, // Send to yourself
    subject: 'New Early Access Request - Malfoy',
    html: htmlContent,
  });
};

export const sendPasswordResetEmail = async (
  email: string,
  token: string,
  name?: string
) => {
  const resetUrl = `${process.env.NEXTAUTH_URL}/reset-password?token=${token}`;

  const content = `
    <div class="header">
      <h1>Greetings from malfoy</h1>
      <h2>Reset Your Password</h2>
    </div>
    
    <p>Hello ${name || 'there'},</p>
    
    <p>We received a request to reset the password for your Malfoy account. Click the button below to create a new password:</p>
    
    <div style="text-align: center;">
      <a href="${resetUrl}" class="button">Reset Password</a>
    </div>
    
    <p>This password reset link will expire in 24 hours.</p>
    
    <div class="alert">
      <p><strong>Important:</strong> If you didn't request this password reset, please ignore this email or contact our support team if you have concerns about your account security.</p>
    </div>
    
    <p style="margin-top: 30px;">Thanks,<br>
    The Malfoy Team</p>
  `;

  const htmlContent = createEmailTemplate(content, email);

  return transporter.sendMail({
    from: process.env.EMAIL_FROM,
    to: email,
    subject: 'Reset Your Password for Malfoy',
    html: htmlContent,
  });
};

// New welcome email after successful account creation
export const sendWelcomeEmail = async (
  email: string,
  name?: string
) => {
  const content = `
    <div class="header">
      <h1>Greetings from malfoy</h1>
      <h2>Welcome to Malfoy!</h2>
    </div>
    
    <p>Hello ${name || 'there'},</p>
    
    <p>Thank you for creating your Malfoy account! We're excited to have you on board.</p>
    
    <p>With Malfoy, you now have access to:</p>
    
    <ul style="padding-left: 20px; margin: 20px 0;">
      <li style="margin-bottom: 10px;"><strong>Real-time pricing intelligence</strong> powered by cutting-edge AI</li>
      <li style="margin-bottom: 10px;"><strong>Competitive analysis tools</strong> to optimize your catalog</li>
      <li style="margin-bottom: 10px;"><strong>AI-driven recommendations</strong> for revenue and margin growth</li>
    </ul>
    
    <div style="text-align: center;">
      <a href="${process.env.NEXTAUTH_URL}" class="button">Go to Malfoy</a>
    </div>
    
    <p style="margin-top: 30px;">If you have any questions or need assistance, don't hesitate to reach out to our support team.</p>
    
    <p>We're looking forward to helping you grow your business!</p>
    
    <p style="margin-top: 30px;">Best regards,<br>
    The Malfoy Team</p>
  `;

  const htmlContent = createEmailTemplate(content, email);

  return transporter.sendMail({
    from: process.env.EMAIL_FROM,
    to: email,
    subject: 'Welcome to Malfoy!',
    html: htmlContent,
  });
};

// Selcom welcome email with advanced styling
export const sendSelcomWelcomeEmail = async (
  email: string,
  name: string
) => {
  console.log(`Attempting to send welcome email to ${email}`);
  const dashboardUrl = `${process.env.NEXTAUTH_URL}/`;
  
  try {
    const htmlContent = `
      <!DOCTYPE html>
      <html>
        <head>
          <meta charset="utf-8">
          <meta name="viewport" content="width=device-width, initial-scale=1.0">
          <title>Welcome to Malfoy</title>
          <style>
            @media (prefers-color-scheme: dark) {
              .email-wrapper {
                background-color: #1a1a1a !important;
                color: #f5f5f5 !important;
              }
              .header {
                background-color: #222 !important;
              }
              .content {
                background-color: #2d2d2d !important;
                color: #f5f5f5 !important;
              }
              .button {
                background-color: #03c76e !important;
                color: #ffffff !important;
              }
              .footer {
                background-color: #222 !important;
                color: #aaaaaa !important;
              }
            }
            
            body {
              margin: 0;
              padding: 0;
              font-family: 'Arial', sans-serif;
              -webkit-font-smoothing: antialiased;
            }
            .email-wrapper {
              background-color: #f5f5f5;
              padding: 20px;
              color: #333333;
            }
            .container {
              max-width: 600px;
              margin: 0 auto;
              background-color: #ffffff;
              border-radius: 8px;
              overflow: hidden;
              box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
            }
            .header {
              background-color: #f8f9fa;
              padding: 30px 20px;
              text-align: center;
              border-bottom: 1px solid #eaeaea;
            }
            .logo {
              max-width: 180px;
              margin-bottom: 10px;
              height: auto;
            }
            .content {
              background-color: #ffffff;
              padding: 40px 30px;
              color: #333333;
              line-height: 1.6;
            }
            h1 {
              color: #03c76e;
              margin-top: 0;
              margin-bottom: 20px;
              font-size: 28px;
            }
            .button {
              display: inline-block;
              background-color: #03c76e;
              color: #ffffff;
              text-decoration: none;
              padding: 12px 30px;
              border-radius: 4px;
              margin-top: 25px;
              font-weight: bold;
              text-align: center;
            }
            .features {
              margin-top: 30px;
              display: flex;
              flex-direction: column;
              gap: 15px;
            }
            .feature {
              display: flex;
              align-items: flex-start;
              gap: 15px;  
            }
            .feature-icon {
              width: 24px;
              height: 24px;
              flex-shrink: 0;
              margin-top: 3px;
            }
            .footer {
              background-color: #f8f9fa;
              padding: 20px;
              text-align: center;
              color: #888888;
              font-size: 12px;
              border-top: 1px solid #eaeaea;
            }
          </style>
        </head>
        <body>
          <div class="email-wrapper">
            <div class="container">
              <div class="header">
                <h1>Welcome to Malfoy, ${name}!</h1>
              </div>
              <div class="content">
                <h1>Welcome to Malfoy, ${name}!</h1>
                <p>Congratulations on joining Malfoy - your advanced pricing intelligence platform.</p>
                <p>We're thrilled to have you on board. With Malfoy, you'll be able to optimize your pricing strategies and grow your business like never before.</p>
                
                <div class="features">
                  <div class="feature">
                    <div class="feature-icon">📊</div>
                    <div>
                      <strong>Advanced Analytics</strong>: Gain deep insights into market trends and competitor pricing.
                    </div>
                  </div>
                  <div class="feature">
                    <div class="feature-icon">🚀</div>
                    <div>
                      <strong>Revenue Optimization</strong>: Maximize your profits with our AI-powered pricing recommendations.
                    </div>
                  </div>
                  <div class="feature">
                    <div class="feature-icon">🔍</div>
                    <div>
                      <strong>Competitive Intelligence</strong>: Stay ahead with real-time competitor monitoring.
                    </div>
                  </div>
                </div>
                
                <center><a href="${dashboardUrl}" class="button">Explore Your Malfoy</a></center>
              </div>
              <div class="footer">
                <p>© ${new Date().getFullYear()} Malfoy. All rights reserved.</p>
                <p>If you have any questions, please contact our support team at support@malfoy.com</p>
              </div>
            </div>
          </div>
        </body>
      </html>
    `;
    
    const info = await transporter.sendMail({
      from: process.env.EMAIL_FROM,
      to: email,
      subject: "Welcome to Malfoy - Your Pricing Intelligence Platform",
      text: `Hello ${name}, welcome to Malfoy!`,
      html: htmlContent,
    });
    
    console.log(`Welcome email sent to ${email}, message ID:`, info.messageId);
    return true;
  } catch (error) {
    console.error("Error sending welcome email:", error);
    return false;
  }
};