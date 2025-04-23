"use client";

import React, { createContext, useContext, useEffect, useState } from "react";
import { User } from "@/types/user";
import { LoginData, SignupData, authService } from "@/lib/api-service";
import { useSession, signIn, signOut } from "next-auth/react";

// Create a partial user type for session data
type SessionUser = Pick<User, "id" | "name" | "email" | "image" | "role">;

type AuthContextType = {
  user: SessionUser | null;
  isLoggedIn: boolean;
  isLoading: boolean;
  login: (data: LoginData) => Promise<SessionUser>;
  signup: (data: SignupData) => Promise<{ message: string }>;
  logout: () => void;
  googleSignIn: () => Promise<void>;
};

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export function AuthProvider({ children }: { children: React.ReactNode }) {
  const [user, setUser] = useState<SessionUser | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const { data: session, status } = useSession();

  // Use NextAuth session
  useEffect(() => {
    if (status === "loading") {
      console.log("Auth status: loading session");
      return;
    }

    if (status === "authenticated" && session?.user) {
      console.log("Auth status: authenticated via NextAuth", session.user);
      // Convert NextAuth session user to our SessionUser type
      const sessionUser: SessionUser = {
        id: session.user.id,
        name: session.user.name || null,
        email: session.user.email || "",
        image: session.user.image || null,
        role: (session.user.role as "user" | "admin" | undefined) || "user",
      };

      setUser(sessionUser);
      setIsLoading(false);
    } else {
      console.log(
        "Auth status: not authenticated via NextAuth, checking local token"
      );
      // When not authenticated via NextAuth, try our custom auth
      const verifyUserSession = async () => {
        try {
          const token = localStorage.getItem("auth_token");
          if (!token) {
            setIsLoading(false);
            return;
          }

          const userData = await authService.getMe(token);

          if (userData) {
            // Convert full User to SessionUser
            const sessionUser: SessionUser = {
              id: userData.id,
              name: userData.name,
              email: userData.email,
              image: userData.image,
              role: userData.role,
            };
            setUser(sessionUser);
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
    }
  }, [session, status]);

  const login = async (data: LoginData) => {
    try {
      // Try NextAuth first
      const result = await signIn("credentials", {
        redirect: false,
        email: data.email,
        password: data.password,
      });

      if (!result?.error) {
        // NextAuth login was successful
        // The session will be updated and trigger the useEffect above
        if (session?.user) {
          const sessionUser: SessionUser = {
            id: session.user.id,
            name: session.user.name || null,
            email: session.user.email || "",
            image: session.user.image || null,
            role: (session.user.role as "user" | "admin" | undefined) || "user",
          };
          return sessionUser;
        }
      }

      // Fall back to legacy auth system if NextAuth fails
      const response = await authService.login(data);

      if (response.token && response.user) {
        localStorage.setItem("auth_token", response.token);
        const sessionUser: SessionUser = {
          id: response.user.id,
          name: response.user.name,
          email: response.user.email,
          image: response.user.image,
          role: response.user.role,
        };
        setUser(sessionUser);
        return sessionUser;
      }

      throw new Error(response.message || "Login failed");
    } catch (error) {
      console.error("Login error:", error);
      throw error;
    }
  };

  const signup = async (data: SignupData) => {
    const response = await authService.signup(data);
    return response;
  };

  const googleSignIn = async () => {
    await signIn("google", { callbackUrl: "/" });
  };

  const logout = () => {
    // Clear both auth systems
    localStorage.removeItem("auth_token");
    signOut({ callbackUrl: "/" });
    setUser(null);
  };

  const value = {
    user,
    isLoggedIn: !!user,
    isLoading: isLoading || status === "loading",
    login,
    signup,
    logout,
    googleSignIn,
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
