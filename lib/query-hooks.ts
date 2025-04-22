'use client';

import { useMutation } from '@tanstack/react-query';
import { authService, earlyAccessService, SignupData, LoginData, EarlyAccessData } from './api-service';

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