"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { useAuth } from "@/context/auth-context";
import { useLogin } from "@/lib/query-hooks";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { Alert, AlertDescription } from "@/components/ui/alert";
import { toast } from "sonner";
import { Plane } from "lucide-react";

export function LoginForm() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const router = useRouter();
  const { login } = useAuth();

  const {
    mutate: loginMutation,
    isPending: isLoggingIn,
    error: loginError,
  } = useLogin();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    try {
      await login({ email, password });
      router.push("/");
      toast.success("Successfully logged in!");
    } catch (error) {
      toast.error(error instanceof Error ? error.message : "Login failed");
    }
  };

  return (
    <div className="w-full max-w-md mx-auto p-8 bg-white dark:bg-slate-900 rounded-xl shadow-lg space-y-6">
      <div className="text-center space-y-2">
        <div className="flex justify-center">
          <div className="bg-black rounded-full p-3">
            <Plane className="h-6 w-6 text-white" />
          </div>
        </div>
        <h1 className="text-3xl font-bold text-[#003d5b]">Welcome Back</h1>
        <p className="text-slate-500">Access your aviation management tools</p>
      </div>

      {loginError && (
        <Alert
          variant="destructive"
          className="border-red-300 bg-red-50 dark:bg-red-900/20"
        >
          <AlertDescription>{(loginError as Error).message}</AlertDescription>
        </Alert>
      )}

      <form onSubmit={handleSubmit} className="space-y-5">
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
          <div className="flex justify-between items-center">
            <Label
              htmlFor="password"
              className="text-sm font-medium text-slate-700 dark:text-slate-300"
            >
              Password
            </Label>
            <Link
              href="/forgot-password"
              className="text-sm text-green-600 hover:text-green-800 transition-colors"
            >
              Forgot password?
            </Link>
          </div>
          <Input
            id="password"
            type="password"
            placeholder="••••••••"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
            className="h-12 border-slate-300 focus:border-green-500 focus:ring-green-500"
          />
        </div>

        <Button
          type="submit"
          className="w-full h-12 bg-green-600 hover:bg-green-700 text-white font-medium rounded-md"
          disabled={isLoggingIn}
        >
          {isLoggingIn ? "Signing in..." : "Sign in"}
        </Button>
      </form>

      <div className="text-center text-sm">
        <span className="text-slate-500">Don't have an account?</span>{" "}
        <Link
          href="/signup"
          className="text-green-600 hover:text-green-800 font-medium transition-colors"
        >
          Sign up
        </Link>
      </div>

      <div className="pt-4 text-center">
        <p className="text-xs text-slate-400">
          By signing in, you agree to our{" "}
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
