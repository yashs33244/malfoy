"use client";

import { useState } from "react";
import Link from "next/link";
import { useAuth } from "@/context/auth-context";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { Alert, AlertDescription } from "@/components/ui/alert";
import { CheckCircle, Plane } from "lucide-react";
import { toast } from "sonner";

export function SignupForm() {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [success, setSuccess] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const { signup } = useAuth();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError(null);

    // Validation
    if (password.length < 8) {
      setError("Password must be at least 8 characters");
      return;
    }

    setIsLoading(true);
    try {
      await signup({ name, email, password });
      setSuccess(true);
      toast.success("Account created successfully!");
    } catch (err) {
      const errorMessage =
        err instanceof Error
          ? err.message
          : "Something went wrong during signup";
      setError(errorMessage);
      toast.error(errorMessage);
    } finally {
      setIsLoading(false);
    }
  };

  if (success) {
    return (
      <div className="w-full max-w-md mx-auto p-8 bg-white dark:bg-slate-900 rounded-xl shadow-lg space-y-6">
        <div className="text-center">
          <CheckCircle className="h-16 w-16 text-green-500 mx-auto mb-4" />
          <h1 className="text-3xl font-bold text-[#003d5b]">
            Check Your Email
          </h1>
          <p className="text-slate-500 mt-2">
            We've sent a verification link to <strong>{email}</strong>
          </p>
        </div>
        <div className="space-y-4">
          <p className="text-slate-600 text-sm">
            Please check your email and click the verification link to complete
            your registration.
          </p>
          <p className="text-slate-600 text-sm">
            Once verified, you can log in to your new account.
          </p>
        </div>
        <div className="border-t pt-4">
          <Link href="/login">
            <Button variant="outline" className="w-full h-12">
              Go to Login
            </Button>
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div className="w-full max-w-md mx-auto p-8 bg-white dark:bg-slate-900 rounded-xl shadow-lg space-y-6">
      <div className="text-center space-y-2">
        <div className="flex justify-center">
          <div className="bg-black rounded-full p-3">
            <Plane className="h-6 w-6 text-white" />
          </div>
        </div>
        <h1 className="text-3xl font-bold text-[#003d5b]">Create Account</h1>
        <p className="text-slate-500">Join our aviation management platform</p>
      </div>

      {error && (
        <Alert
          variant="destructive"
          className="border-red-300 bg-red-50 dark:bg-red-900/20"
        >
          <AlertDescription>{error}</AlertDescription>
        </Alert>
      )}

      <form onSubmit={handleSubmit} className="space-y-4">
        <div className="space-y-2">
          <Label
            htmlFor="name"
            className="text-sm font-medium text-slate-700 dark:text-slate-300"
          >
            Full Name
          </Label>
          <Input
            id="name"
            placeholder="John Doe"
            value={name}
            onChange={(e) => setName(e.target.value)}
            className="h-12 border-slate-300 focus:border-green-500 focus:ring-green-500"
            required
          />
        </div>

        <div className="space-y-2">
          <Label
            htmlFor="email"
            className="text-sm font-medium text-slate-700 dark:text-slate-300"
          >
            Email
          </Label>
          <Input
            id="email"
            type="email"
            placeholder="you@example.com"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
            className="h-12 border-slate-300 focus:border-green-500 focus:ring-green-500"
          />
        </div>

        <div className="space-y-2">
          <Label
            htmlFor="password"
            className="text-sm font-medium text-slate-700 dark:text-slate-300"
          >
            Password
          </Label>
          <Input
            id="password"
            type="password"
            placeholder="••••••••"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
            className="h-12 border-slate-300 focus:border-green-500 focus:ring-green-500"
          />
          <p className="text-xs text-slate-500">
            Must be at least 8 characters
          </p>
        </div>

        <Button
          type="submit"
          className="w-full h-12 mt-2 bg-green-600 hover:bg-green-700 text-white font-medium rounded-md"
          disabled={isLoading}
        >
          {isLoading ? "Creating account..." : "Create Account"}
        </Button>
      </form>

      <div className="text-center text-sm">
        <span className="text-slate-500">Already have an account?</span>{" "}
        <Link
          href="/login"
          className="text-green-600 hover:text-green-800 font-medium transition-colors"
        >
          Sign in
        </Link>
      </div>

      <div className="pt-4 text-center">
        <p className="text-xs text-slate-400">
          By creating an account, you agree to our{" "}
          <Link href="/terms" className="underline hover:text-slate-600">
            Terms of Service
          </Link>{" "}
          and{" "}
          <Link href="/privacy" className="underline hover:text-slate-600">
            Privacy Policy
          </Link>
        </p>
      </div>
    </div>
  );
}
