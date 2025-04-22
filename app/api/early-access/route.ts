import { NextRequest, NextResponse } from 'next/server';
import { prisma } from '@/lib/prisma';
import { sendEarlyAccessConfirmation, sendEarlyAccessNotification } from '@/lib/email';
import { verifyToken } from '@/lib/auth';

export async function POST(req: NextRequest) {
  try {
    const { email, name, company, message } = await req.json();
    
    // Validate input
    if (!email) {
      return NextResponse.json(
        { error: 'Email is required' },
        { status: 400 }
      );
    }

    // Check if a request with this email already exists
    const existingRequest = await prisma.earlyAccess.findUnique({
      where: { email },
    });

    if (existingRequest) {
      return NextResponse.json(
        { message: 'You have already requested early access', alreadyRequested: true },
        { status: 200 }
      );
    }

    // Get user ID if authenticated
    let userId = null;
    const authHeader = req.headers.get('authorization');
    
    if (authHeader && authHeader.startsWith('Bearer ')) {
      const token = authHeader.substring(7);
      const decoded = verifyToken(token);
      
      if (decoded && decoded.user) {
        userId = decoded.user.id;
      }
    }

    // Create early access request
    const earlyAccessRequest = await prisma.earlyAccess.create({
      data: {
        email,
        name,
        company,
        message,
        userId,
      },
    });

    // Send confirmation email to user
    await sendEarlyAccessConfirmation(email, name);
    
    // Send notification email to admin
    await sendEarlyAccessNotification(email, name, company, message);

    return NextResponse.json({ 
      message: 'Early access request submitted successfully',
      earlyAccessRequest 
    }, { status: 201 });
  } catch (error) {
    console.error('Early access error:', error);
    return NextResponse.json(
      { error: 'Something went wrong. Please try again.' },
      { status: 500 }
    );
  }
} 