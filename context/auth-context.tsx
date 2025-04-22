"use client";

import React, { createContext, useContext, useEffect, useState } from "react";
import { User } from "@/types/user";
import { LoginData, SignupData, authService } from "@/lib/api-service";

type AuthContextType = {
  user: User | null;
  isLoggedIn: boolean;
  isLoading: boolean;
  login: (data: LoginData) => Promise<User>;
  signup: (data: SignupData) => Promise<{ message: string }>;
  logout: () => void;
};

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export function AuthProvider({ children }: { children: React.ReactNode }) {
  const [user, setUser] = useState<User | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  // Verify user on mount and when token changes
  useEffect(() => {
    const verifyUserSession = async () => {
      try {
        const token = localStorage.getItem("auth_token");
        if (!token) {
          setIsLoading(false);
          return;
        }

        const userData = await authService.getMe(token);

        if (userData) {
          setUser(userData);
        } else {
          // If verification fails, clear the token
          localStorage.removeItem("auth_token");
        }
      } catch (error) {
        console.error("Error verifying user session:", error);
        localStorage.removeItem("auth_token");
      } finally {
        setIsLoading(false);
      }
    };

    verifyUserSession();
  }, []);

  const login = async (data: LoginData) => {
    const response = await authService.login(data);

    if (response.token && response.user) {
      localStorage.setItem("auth_token", response.token);
      setUser(response.user);
      return response.user;
    }

    throw new Error(response.message || "Login failed");
  };

  const signup = async (data: SignupData) => {
    const response = await authService.signup(data);
    return response;
  };

  const logout = () => {
    localStorage.removeItem("auth_token");
    setUser(null);
  };

  const value = {
    user,
    isLoggedIn: !!user,
    isLoading,
    login,
    signup,
    logout,
  };

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
}

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error("useAuth must be used within an AuthProvider");
  }
  return context;
};
