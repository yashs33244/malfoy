"use client";

import { useState } from "react";
import Link from "next/link";
import { useSignup } from "@/lib/query-hooks";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Alert, AlertDescription } from "@/components/ui/alert";
import { CheckCircle } from "lucide-react";
import { GoogleAuthButton } from "./google-button";
import { toast } from "sonner";
import { AuthIllustration } from "./auth-illustration";
import { Eye, EyeOff, Calendar } from "lucide-react";
import { CalendlyScheduleModal } from "@/components/calendly-schedule-modal";

export function SignupForm() {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [success, setSuccess] = useState(false);

  const {
    mutate: signupMutation,
    isPending: isSigningUp,
    error: signupError,
  } = useSignup();

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    signupMutation(
      { name, email, password },
      {
        onSuccess: () => {
          setSuccess(true);
          toast.success("Account created! Please check your email to verify.");
        },
        onError: (error) => {
          toast.error((error as Error).message || "Signup failed");
        },
      }
    );
  };

  if (success) {
    return (
      <div className="grid grid-cols-1 lg:grid-cols-2 h-screen w-full">
        <div className="hidden lg:block p-5">
          <AuthIllustration />
        </div>

        <div className="flex flex-col items-center justify-center p-8 lg:p-12 bg-white dark:bg-gray-950">
          <div className="w-full max-w-md text-center">
            <CheckCircle className="h-16 w-16 text-[#03c76e] mx-auto mb-4" />
            <h1 className="text-3xl font-bold mb-2">Check Your Email</h1>
            <p className="text-gray-600 dark:text-gray-400 mb-6">
              We've sent a verification link to <strong>{email}</strong>
            </p>

            <div className="space-y-4 mb-8">
              <p className="text-gray-600 dark:text-gray-400 text-sm">
                Please check your email and click the verification link to
                complete your registration.
              </p>

              <p className="text-gray-600 dark:text-gray-400 text-sm">
                Once verified, you can log in to your new account.
              </p>
            </div>

            <Link href="/login">
              <Button
                variant="outline"
                className="w-full h-12 rounded-lg border-[#03c76e] text-[#03c76e]"
              >
                Go to Login
              </Button>
            </Link>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="grid grid-cols-1 lg:grid-cols-2 h-screen w-full">
      {/* Left side - Illustration */}
      <div className="hidden lg:block p-5">
        <AuthIllustration />
      </div>

      {/* Right side - Signup form */}
      <div className="flex flex-col items-center justify-center p-8 lg:p-12 bg-white dark:bg-gray-950">
        <div className="w-full max-w-md">
          <div className="flex justify-between items-center mb-8">
            <h1 className="text-3xl font-bold">Create Account</h1>
            <div className="text-sm">
              Already have an account?{" "}
              <Link
                href="/login"
                className="text-[#03c76e] font-medium hover:underline"
              >
                Sign in
              </Link>
            </div>
          </div>

          <p className="mb-6 text-sm text-gray-600 dark:text-gray-400">
            Sign up with Open account
          </p>

          <div className="mb-6">
            <GoogleAuthButton />
          </div>

          <div className="relative flex items-center justify-center mb-6">
            <div className="absolute w-full border-t border-gray-300 dark:border-gray-700"></div>
            <div className="relative bg-white dark:bg-gray-950 px-4 text-sm text-gray-500 dark:text-gray-400">
              Or continue with email address
            </div>
          </div>

          {signupError && (
            <Alert variant="destructive" className="mb-4">
              <AlertDescription>
                {(signupError as Error).message}
              </AlertDescription>
            </Alert>
          )}

          <form onSubmit={handleSubmit} className="space-y-4">
            <div>
              <div className="relative">
                <Input
                  id="name"
                  type="text"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  placeholder="Full Name"
                  className="h-12 pl-10 pr-10 rounded-lg bg-gray-50 dark:bg-gray-900 border-black dark:border-black focus:ring-black focus:border-black"
                  required
                />
                <div className="absolute inset-y-0 left-3 flex items-center pointer-events-none">
                  <svg
                    className="w-5 h-5 text-[#03c76e]"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z"
                    />
                  </svg>
                </div>
              </div>
            </div>

            <div>
              <div className="relative">
                <Input
                  id="email"
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="Email"
                  className="h-12 pl-10 pr-10 rounded-lg bg-gray-50 dark:bg-gray-900 border-black dark:border-black focus:ring-black focus:border-black"
                  required
                />
                <div className="absolute inset-y-0 left-3 flex items-center pointer-events-none">
                  <svg
                    className="w-5 h-5 text-[#03c76e]"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M16 12a4 4 0 10-8 0 4 4 0 008 0zm0 0v1.5a2.5 2.5 0 005 0V12a9 9 0 10-9 9m4.5-1.206a8.959 8.959 0 01-4.5 1.207"
                    />
                  </svg>
                </div>
              </div>
            </div>

            <div>
              <div className="relative">
                <Input
                  id="password"
                  type={showPassword ? "text" : "password"}
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  placeholder="Password"
                  className="h-12 pl-10 pr-10 rounded-lg bg-gray-50 dark:bg-gray-900 border-black dark:border-black focus:ring-black focus:border-black"
                  required
                />
                <div className="absolute inset-y-0 left-3 flex items-center pointer-events-none">
                  <svg
                    className="w-5 h-5 text-[#03c76e]"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z"
                    />
                  </svg>
                </div>
                <button
                  type="button"
                  className="absolute inset-y-0 right-3 flex items-center"
                  onClick={() => setShowPassword(!showPassword)}
                >
                  {showPassword ? (
                    <EyeOff className="w-5 h-5 text-[#03c76e]" />
                  ) : (
                    <Eye className="w-5 h-5 text-[#03c76e]" />
                  )}
                </button>
              </div>
              <div className="mt-2">
                <p className="text-xs text-gray-500">
                  Must be at least 8 characters
                </p>
              </div>
            </div>

            <Button
              type="submit"
              className="w-full h-12 rounded-lg bg-black hover:bg-gray-900 text-white font-medium"
              disabled={isSigningUp}
            >
              {isSigningUp ? "Creating account..." : "Create Account"}
            </Button>

            <CalendlyScheduleModal
              buttonVariant="outline"
              buttonClassName="w-full border-gray-300 text-gray-600"
              modalTitle="Schedule a Free Consultation"
            />
          </form>

          <p className="text-xs text-center text-gray-500 mt-6">
            By creating an account, you agree to our{" "}
            <Link href="/terms" className="text-[#03c76e] hover:underline">
              Terms of Service
            </Link>{" "}
            and{" "}
            <Link href="/privacy" className="text-[#03c76e] hover:underline">
              Privacy Policy
            </Link>
          </p>
        </div>
      </div>
    </div>
  );
}
