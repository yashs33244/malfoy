"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { useAuth } from "@/context/auth-context";
import { useLogin } from "@/lib/query-hooks";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Alert, AlertDescription } from "@/components/ui/alert";
import { GoogleAuthButton } from "./google-button";
import { toast } from "sonner";
import { AuthIllustration } from "./auth-illustration";
import { Eye, EyeOff, Calendar } from "lucide-react";
import { CalendlyScheduleModal } from "@/components/calendly-schedule-modal";

export function LoginForm() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const router = useRouter();
  const { login: authLogin } = useAuth();

  const {
    mutate: loginMutation,
    isPending: isLoggingIn,
    error: loginError,
  } = useLogin();

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    loginMutation(
      { email, password },
      {
        onSuccess: (data) => {
          if (data.token && data.user) {
            authLogin({ email, password });
            router.push("/");
            toast.success("Logged in successfully!");
          } else {
            toast.error(data.message || "Login failed");
          }
        },
        onError: (error) => {
          toast.error((error as Error).message || "Login failed");
        },
      }
    );
  };

  return (
    <div className="grid grid-cols-1 lg:grid-cols-2 h-screen w-full">
      {/* Left side - Illustration */}
      <div className="hidden lg:block p-5">
        <AuthIllustration />
      </div>

      {/* Right side - Login form */}
      <div className="flex flex-col items-center justify-center p-8 lg:p-12 bg-white dark:bg-gray-950">
        <div className="w-full max-w-md">
          <div className="flex justify-between items-center mb-8">
            <h1 className="text-3xl font-bold">Sign in</h1>
            <div className="text-sm">
              Don't have an account?{" "}
              <Link
                href="/signup"
                className="text-[#03c76e] font-medium hover:underline"
              >
                Sign up
              </Link>
            </div>
          </div>

          <p className="mb-6 text-sm text-gray-600 dark:text-gray-400">
            Sign in with Open account
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

          {loginError && (
            <Alert variant="destructive" className="mb-4">
              <AlertDescription>
                {(loginError as Error).message}
              </AlertDescription>
            </Alert>
          )}

          <form onSubmit={handleSubmit} className="space-y-4">
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
                    className="w-5 h-5 text-black dark:text-black"
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
                    className="w-5 h-5 text-black dark:text-black"
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
              <div className="flex justify-between mt-2">
                <Link
                  href="/forgot-password"
                  className="text-sm text-[#03c76e] hover:underline"
                >
                  Forgot password?
                </Link>
              </div>
            </div>

            <Button
              type="submit"
              className="w-full h-12 rounded-lg bg-[#03c76e] hover:bg-[#02a058] text-white font-medium"
              disabled={isLoggingIn}
            >
              {isLoggingIn ? "Signing in..." : "Lets get started"}
            </Button>

            <CalendlyScheduleModal
              buttonVariant="outline"
              buttonClassName="w-full border-gray-300 text-gray-600"
              modalTitle="Schedule a Free Consultation"
            />
          </form>
        </div>
      </div>
    </div>
  );
}
