import { NextRequest, NextResponse } from 'next/server';
import { prisma } from '@/lib/prisma';
import { generateToken } from '@/lib/auth';

export async function POST(req: NextRequest) {
  try {
    const { token, userInfo } = await req.json();
    
    if (!token || !userInfo || !userInfo.email) {
      return NextResponse.json(
        { error: 'Invalid Google authentication data' },
        { status: 400 }
      );
    }

    // Check if user exists
    let user = await prisma.user.findUnique({
      where: { email: userInfo.email }
    });

    // If user doesn't exist, create a new one
    if (!user) {
      user = await prisma.user.create({
        data: {
          email: userInfo.email,
          name: userInfo.name,
          password: '', // Empty password for Google users
          emailVerified: new Date(), // Google accounts are verified by default
          image: userInfo.picture
        }
      });
    } else if (!user.emailVerified) {
      // If user exists but email not verified, mark as verified
      await prisma.user.update({
        where: { email: userInfo.email },
        data: { emailVerified: new Date() }
      });
    }

    // Generate JWT token
    const { password: _, ...userWithoutPassword } = user;
    const authToken = generateToken({ 
      user: userWithoutPassword 
    });

    // Return token and user data
    return NextResponse.json({ 
      message: 'Login successful',
      token: authToken,
      user: userWithoutPassword
    });
  } catch (error) {
    console.error('Google auth error:', error);
    return NextResponse.json(
      { error: 'Something went wrong during Google authentication' },
      { status: 500 }
    );
  }
} 