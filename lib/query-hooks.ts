'use client';

import { useMutation } from '@tanstack/react-query';
import { 
  authService, 
  earlyAccessService, 
  SignupData, 
  LoginData, 
  EarlyAccessData,
  GoogleAuthData,
  AppleAuthData,
  ForgotPasswordData,
  ResetPasswordData
} from './api-service';

// Authentication hooks
export const useSignup = () => {
  return useMutation({
    mutationFn: (data: SignupData) => authService.signup(data),
  });
};

export const useLogin = () => {
  return useMutation({
    mutationFn: (data: LoginData) => authService.login(data),
  });
};

export const useGoogleAuth = () => {
  return useMutation({
    mutationFn: (data: GoogleAuthData) => authService.googleAuth(data),
  });
};

export const useAppleAuth = () => {
  return useMutation({
    mutationFn: (data: AppleAuthData) => authService.appleAuth(data),
  });
};

export function useForgotPassword() {
  return useMutation({
    mutationFn: (data: ForgotPasswordData) => authService.forgotPassword(data),
  });
}

export function useResetPassword() {
  return useMutation({
    mutationFn: (data: ResetPasswordData) => authService.resetPassword(data),
  });
}

export const useVerifyEmail = () => {
  return useMutation({
    mutationFn: (token: string) => authService.verifyEmail(token),
  });
};

// Early access hook
export const useEarlyAccess = () => {
  return useMutation({
    mutationFn: (data: EarlyAccessData) => earlyAccessService.requestAccess(data),
  });
}; 