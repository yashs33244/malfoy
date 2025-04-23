"use client";

import { useState } from "react";
import Link from "next/link";
import { useForgotPassword } from "@/lib/query-hooks";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Alert, AlertDescription } from "@/components/ui/alert";
import { CheckCircle } from "lucide-react";
import { toast } from "sonner";
import { AuthIllustration } from "./auth-illustration";

export function ForgotPasswordForm() {
  const [email, setEmail] = useState("");
  const [success, setSuccess] = useState(false);

  const {
    mutate: forgotPasswordMutation,
    isPending: isSubmitting,
    error: forgotPasswordError,
  } = useForgotPassword();

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    forgotPasswordMutation(
      { email },
      {
        onSuccess: (data) => {
          setSuccess(true);
          toast.success("Password reset link sent! Check your email");
        },
        onError: (error) => {
          toast.error((error as Error).message || "Failed to send reset link");
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
            <CheckCircle className="h-16 w-16 text-green-500 mx-auto mb-4" />
            <h1 className="text-3xl font-bold mb-2">Check Your Email</h1>
            <p className="text-gray-600 dark:text-gray-400 mb-6">
              We've sent a password reset link to <strong>{email}</strong>
            </p>

            <div className="space-y-4 mb-8">
              <p className="text-gray-600 dark:text-gray-400 text-sm">
                Please check your email and click the password reset link to set
                a new password.
              </p>

              <p className="text-gray-600 dark:text-gray-400 text-sm">
                If you don't see the email, check your spam folder.
              </p>
            </div>

            <div className="space-y-4">
              <Link href="/login">
                <Button className="w-full h-12 rounded-lg">
                  Back to Login
                </Button>
              </Link>
            </div>
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

      {/* Right side - Form */}
      <div className="flex flex-col items-center justify-center p-8 lg:p-12 bg-white dark:bg-gray-950">
        <div className="w-full max-w-md">
          <div className="flex justify-between items-center mb-8">
            <h1 className="text-3xl font-bold">Forgot Password</h1>
            <div className="text-sm">
              <Link
                href="/login"
                className="text-black font-medium hover:underline"
              >
                Back to Login
              </Link>
            </div>
          </div>

          <p className="mb-6 text-sm text-gray-600 dark:text-gray-400">
            Enter your email address and we'll send you a link to reset your
            password.
          </p>

          {forgotPasswordError && (
            <Alert variant="destructive" className="mb-4">
              <AlertDescription>
                {(forgotPasswordError as Error).message}
              </AlertDescription>
            </Alert>
          )}

          <form onSubmit={handleSubmit} className="space-y-4">
            <div className="space-y-1">
              <div className="relative">
                <Input
                  id="email"
                  type="email"
                  placeholder="Email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="h-12 pl-10 pr-10 rounded-lg bg-gray-50 dark:bg-gray-900 border-gray-200 dark:border-gray-800"
                  required
                />
                <div className="absolute inset-y-0 left-3 flex items-center pointer-events-none">
                  <svg
                    className="w-5 h-5 text-gray-400"
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

            <Button
              type="submit"
              className="w-full h-12 rounded-lg bg-black hover:bg-gray-800 text-white font-medium"
              disabled={isSubmitting}
            >
              {isSubmitting ? "Sending..." : "Send Reset Link"}
            </Button>
          </form>
        </div>
      </div>
    </div>
  );
}
