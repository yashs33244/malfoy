import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';
import { prisma } from './prisma';

// Password hashing
export const hashPassword = async (password: string): Promise<string> => {
  return await bcrypt.hash(password, 10);
};

export const comparePasswords = async (password: string, hashedPassword: string): Promise<boolean> => {
  return await bcrypt.compare(password, hashedPassword);
};

// JWT generation
export const generateToken = (payload: any): string => {
  return jwt.sign(payload, process.env.JWT_SECRET || 'fallback_secret', {
    expiresIn: '7d', // token expires in 7 days
  });
};

export const verifyToken = (token: string): any => {
  try {
    return jwt.verify(token, process.env.JWT_SECRET || 'fallback_secret');
  } catch (error) {
    return null;
  }
};

// Token for email verification
export const generateVerificationToken = async (email: string): Promise<string> => {
  // Delete any existing tokens for this email
  await prisma.verificationToken.deleteMany({
    where: { email },
  });

  // Generate a unique token
  const token = generateRandomToken();
  
  // Store the token
  await prisma.verificationToken.create({
    data: {
      email,
      token,
      expires: new Date(Date.now() + 24 * 60 * 60 * 1000), // 24 hours from now
    },
  });

  return token;
};

// Random token generator
const generateRandomToken = (): string => {
  return Math.random().toString(36).substring(2, 15) + 
         Math.random().toString(36).substring(2, 15);
};

// Verify email with token
export const verifyEmail = async (token: string): Promise<boolean> => {
  const verificationToken = await prisma.verificationToken.findUnique({
    where: { token },
  });

  if (!verificationToken) {
    return false;
  }

  if (verificationToken.expires < new Date()) {
    // Token expired
    await prisma.verificationToken.delete({
      where: { token },
    });
    return false;
  }

  // Update user
  await prisma.user.update({
    where: { email: verificationToken.email },
    data: { emailVerified: new Date() },
  });

  // Delete token after use
  await prisma.verificationToken.delete({
    where: { token },
  });

  return true;
}; 