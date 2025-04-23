import { NextRequest, NextResponse } from 'next/server';
import { prisma } from '@/lib/prisma';
import { generateVerificationToken } from '@/lib/auth';
import { sendPasswordResetEmail } from '@/lib/email';

export async function POST(req: NextRequest) {
  try {
    const { email } = await req.json();

    if (!email) {
      return NextResponse.json(
        { error: 'Email is required' },
        { status: 400 }
      );
    }

    // Check if user exists
    const user = await prisma.user.findUnique({
      where: { email },
    });

    // Don't reveal if user exists or not for security reasons
    if (!user) {
      return NextResponse.json(
        { message: 'If an account with that email exists, we sent a password reset link' },
        { status: 200 }
      );
    }

    // Generate a password reset token
    const token = await generateVerificationToken(email);

    // Send password reset email
    await sendPasswordResetEmail(email, token, user.name || undefined);

    return NextResponse.json(
      { message: 'If an account with that email exists, we sent a password reset link' },
      { status: 200 }
    );
  } catch (error) {
    console.error('Forgot password error:', error);
    return NextResponse.json(
      { error: 'Something went wrong. Please try again.' },
      { status: 500 }
    );
  }
} 