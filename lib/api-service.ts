'use client';

import { User } from '@/types/user';

// API base URL
const API_BASE_URL = process.env.NEXT_PUBLIC_API_URL || '';

// Types
export type SignupData = {
  name: string;
  email: string;
  password: string;
};

export type LoginData = {
  email: string;
  password: string;
};

export type EarlyAccessData = {
  email: string;
  name?: string;
  company?: string;
  message?: string;
};

interface LoginResponse {
  user?: User;
  token?: string;
  message?: string;
}

interface SignupResponse {
  message: string;
}

// Helper to handle API responses
const handleResponse = async (response: Response) => {
  const data = await response.json();
  
  if (!response.ok) {
    throw new Error(data.error || 'Something went wrong');
  }
  
  return data;
};

// Get auth token from localStorage
const getAuthToken = () => {
  if (typeof window !== 'undefined') {
    return localStorage.getItem('auth_token');
  }
  return null;
};

// Authentication services
export const authService = {
  async login(data: LoginData): Promise<LoginResponse> {
    try {
      const response = await fetch(`${API_BASE_URL}/api/auth/login`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(data),
      });
      
      return await response.json();
    } catch (error) {
      console.error('Login error:', error);
      return { message: 'An error occurred during login' };
    }
  },
  
  async signup(data: SignupData): Promise<SignupResponse> {
    try {
      const response = await fetch(`${API_BASE_URL}/api/auth/signup`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(data),
      });
      
      return await response.json();
    } catch (error) {
      console.error('Signup error:', error);
      return { message: 'An error occurred during signup' };
    }
  },
  
  async getMe(token: string): Promise<User | null> {
    try {
      const response = await fetch(`${API_BASE_URL}/api/auth/me`, {
        headers: {
          'Authorization': `Bearer ${token}`,
        },
      });
      
      if (!response.ok) return null;
      
      const data = await response.json();
      return data.user;
    } catch (error) {
      console.error('GetMe error:', error);
      return null;
    }
  },
  
  verifyEmail: async (token: string) => {
    const response = await fetch(`${API_BASE_URL}/api/auth/verify-email?token=${token}`, {
      method: 'GET',
    });
    
    return handleResponse(response);
  },
};

// Early access service
export const earlyAccessService = {
  requestAccess: async (data: EarlyAccessData) => {
    const token = getAuthToken();
    const headers: Record<string, string> = {
      'Content-Type': 'application/json',
    };
    
    if (token) {
      headers['Authorization'] = `Bearer ${token}`;
    }
    
    const response = await fetch(`${API_BASE_URL}/api/early-access`, {
      method: 'POST',
      headers,
      body: JSON.stringify(data),
    });
    
    return handleResponse(response);
  },
}; 