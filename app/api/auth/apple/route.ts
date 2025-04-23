import { NextRequest, NextResponse } from 'next/server';
import { prisma } from '@/lib/prisma';
import { generateToken } from '@/lib/auth';
import jwt from 'jsonwebtoken';
import jwksClient from 'jwks-rsa';

// Create a JWKS client for fetching Apple's public keys
const client = jwksClient({
  jwksUri: 'https://appleid.apple.com/auth/keys',
  timeout: 30000,
});

// Function to get the signing key with the specified key ID
async function getKey(kid: string) {
  try {
    return await client.getSigningKey(kid);
  } catch (error) {
    console.error('Error getting Apple signing key:', error);
    throw new Error('Failed to get Apple signing key');
  }
}

export async function POST(req: NextRequest) {
  try {
    const { id_token } = await req.json();
    
    if (!id_token) {
      return NextResponse.json(
        { error: 'id_token is required' },
        { status: 400 }
      );
    }

    // Decode the token to get the header with the key ID
    const decoded = jwt.decode(id_token, { complete: true });
    
    if (!decoded || !decoded.header || !decoded.header.kid) {
      return NextResponse.json(
        { error: 'Invalid Apple ID token' },
        { status: 400 }
      );
    }

    // Get the key ID from the token header
    const kid = decoded.header.kid;
    
    // Get the public key from Apple's JWKS
    const key = await getKey(kid);
    const publicKey = key.getPublicKey();
    
    // Verify the token with the public key
    const payload = jwt.verify(id_token, publicKey);
    
    if (!payload || typeof payload === 'string' || !payload.sub || !payload.email) {
      return NextResponse.json(
        { error: 'Invalid token payload' },
        { status: 400 }
      );
    }
    
    // Apple unique user ID and email
    const { sub: appleUserId, email } = payload;
    
    // Check if user exists
    let user = await prisma.user.findUnique({
      where: { email: email as string }
    });

    // If user doesn't exist, create a new one
    if (!user) {
      user = await prisma.user.create({
        data: {
          email: email as string,
          name: email?.split('@')[0] || 'Apple User', // Use part of email as name if no name provided
          password: '', // Empty password for Apple users
          emailVerified: new Date(), // Apple accounts are verified by default
        }
      });
    } else if (!user.emailVerified) {
      // If user exists but email not verified, mark as verified
      await prisma.user.update({
        where: { email: email as string },
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
    console.error('Apple auth error:', error);
    return NextResponse.json(
      { error: error instanceof Error ? error.message : 'Something went wrong during Apple authentication' },
      { status: 500 }
    );
  }
} 