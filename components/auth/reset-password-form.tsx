"use client";

import { useState } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import Link from "next/link";
import { useResetPassword } from "@/lib/query-hooks";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Alert, AlertDescription } from "@/components/ui/alert";
import { CheckCircle, EyeIcon, EyeOffIcon, KeyIcon } from "lucide-react";
import { toast } from "sonner";
import { AuthIllustration } from "./auth-illustration";

export function ResetPasswordForm() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const token = searchParams.get("token");

  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [success, setSuccess] = useState(false);
  const [validationError, setValidationError] = useState("");

  const {
    mutate: resetPasswordMutation,
    isPending: isSubmitting,
    error: resetPasswordError,
  } = useResetPassword();

  const validatePassword = () => {
    if (password.length < 8) {
      setValidationError("Password must be at least 8 characters long");
      return false;
    }

    if (password !== confirmPassword) {
      setValidationError("Passwords do not match");
      return false;
    }

    setValidationError("");
    return true;
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    if (!token) {
      toast.error("Invalid reset token");
      return;
    }

    if (!validatePassword()) {
      return;
    }

    resetPasswordMutation(
      { token, password },
      {
        onSuccess: () => {
          setSuccess(true);
          toast.success("Password has been reset successfully");
          // Redirect to login page after 3 seconds
          setTimeout(() => {
            router.push("/login");
          }, 3000);
        },
        onError: (error) => {
          toast.error((error as Error).message || "Failed to reset password");
        },
      }
    );
  };

  if (success) {
    return (
      <div className="grid grid-cols-1 lg:grid-cols-2 h-screen w-full">
        <div className="hidden lg:block">
          <AuthIllustration />
        </div>

        <div className="flex flex-col items-center justify-center p-8 lg:p-12 bg-white dark:bg-gray-950">
          <div className="w-full max-w-md text-center">
            <CheckCircle className="h-16 w-16 text-green-500 mx-auto mb-4" />
            <h1 className="text-3xl font-bold mb-2">
              Password Reset Successful
            </h1>
            <p className="text-gray-600 dark:text-gray-400 mb-6">
              Your password has been reset successfully.
            </p>
            <p className="text-gray-600 dark:text-gray-400 mb-6">
              You will be redirected to the login page in a few seconds.
            </p>
            <Link href="/login">
              <Button className="w-full h-12 rounded-lg bg-black hover:bg-[#03c76e] text-white font-medium transition-colors duration-200">
                Login Now
              </Button>
            </Link>
          </div>
        </div>
      </div>
    );
  }

  if (!token) {
    return (
      <div className="grid grid-cols-1 lg:grid-cols-2 h-screen w-full">
        <div className="hidden lg:block">
          <AuthIllustration />
        </div>

        <div className="flex flex-col items-center justify-center p-8 lg:p-12 bg-white dark:bg-gray-950">
          <div className="w-full max-w-md text-center">
            <h1 className="text-3xl font-bold mb-4">Invalid Reset Link</h1>
            <p className="text-gray-600 dark:text-gray-400 mb-6">
              The password reset link is invalid or has expired.
            </p>
            <Link href="/forgot-password">
              <Button
                variant="outline"
                className="mb-4 w-full h-12 rounded-lg border-black dark:border-white hover:bg-gray-100 dark:hover:bg-gray-800"
              >
                Request New Reset Link
              </Button>
            </Link>
            <Link href="/login">
              <Button className="w-full h-12 rounded-lg bg-black hover:bg-[#03c76e] text-white font-medium transition-colors duration-200">
                Back to Login
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
      <div className="hidden lg:block">
        <AuthIllustration />
      </div>

      {/* Right side - Form */}
      <div className="flex flex-col items-center justify-center p-8 lg:p-12 bg-white dark:bg-gray-950">
        <div className="w-full max-w-md">
          <div className="flex justify-between items-center mb-8">
            <h1 className="text-3xl font-bold">Reset Password</h1>
            <div className="text-sm">
              <Link
                href="/login"
                className="text-[#03c76e] font-medium hover:underline"
              >
                Back to Login
              </Link>
            </div>
          </div>

          <p className="mb-6 text-sm text-gray-600 dark:text-gray-400">
            Create a new secure password for your account.
          </p>

          {validationError && (
            <Alert variant="destructive" className="mb-4">
              <AlertDescription>{validationError}</AlertDescription>
            </Alert>
          )}

          {resetPasswordError && (
            <Alert variant="destructive" className="mb-4">
              <AlertDescription>
                {(resetPasswordError as Error).message}
              </AlertDescription>
            </Alert>
          )}

          <form onSubmit={handleSubmit} className="space-y-4">
            <div className="space-y-1">
              <div className="relative">
                <span className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-500">
                  <KeyIcon className="h-5 w-5" />
                </span>
                <Input
                  id="password"
                  type={showPassword ? "text" : "password"}
                  placeholder="New Password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  className="h-12 pl-10 pr-10 rounded-lg bg-gray-50 dark:bg-gray-900 border-gray-200 dark:border-gray-800"
                  required
                />
                <button
                  type="button"
                  className="absolute inset-y-0 right-3 flex items-center"
                  onClick={() => setShowPassword(!showPassword)}
                >
                  {showPassword ? (
                    <EyeOffIcon className="h-5 w-5 text-gray-400 dark:text-gray-400" />
                  ) : (
                    <EyeIcon className="h-5 w-5 text-gray-400 dark:text-gray-400" />
                  )}
                </button>
              </div>
            </div>

            <div className="space-y-1">
              <div className="relative">
                <span className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-500">
                  <KeyIcon className="h-5 w-5" />
                </span>
                <Input
                  id="confirmPassword"
                  type={showPassword ? "text" : "password"}
                  placeholder="Confirm New Password"
                  value={confirmPassword}
                  onChange={(e) => setConfirmPassword(e.target.value)}
                  className="h-12 pl-10 pr-10 rounded-lg bg-gray-50 dark:bg-gray-900 border-gray-200 dark:border-gray-800"
                  required
                />
                <button
                  type="button"
                  className="absolute inset-y-0 right-3 flex items-center"
                  onClick={() => setShowPassword(!showPassword)}
                >
                  {showPassword ? (
                    <EyeOffIcon className="h-5 w-5 text-gray-400 dark:text-gray-400" />
                  ) : (
                    <EyeIcon className="h-5 w-5 text-gray-400 dark:text-gray-400" />
                  )}
                </button>
              </div>
            </div>

            <p className="text-xs text-gray-500 dark:text-gray-400">
              Password must be at least 8 characters long.
            </p>

            <Button
              type="submit"
              className="w-full h-12 rounded-lg bg-black hover:bg-[#03c76e] text-white font-medium transition-colors duration-200"
              disabled={isSubmitting}
            >
              {isSubmitting ? "Resetting..." : "Reset Password"}
            </Button>
          </form>
        </div>
      </div>
    </div>
  );
}
