"use client";

import { useEffect, useState } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import { useVerifyEmail } from "@/lib/query-hooks";
import { Button } from "@/components/ui/button";
import { Loader2, CheckCircle, XCircle } from "lucide-react";

export default function VerifyEmailPage() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const token = searchParams.get("token");
  const [verificationState, setVerificationState] = useState<
    "loading" | "success" | "error"
  >("loading");

  const { mutate: verifyEmail } = useVerifyEmail();

  useEffect(() => {
    if (!token) {
      setVerificationState("error");
      return;
    }

    verifyEmail(token, {
      onSuccess: () => {
        setVerificationState("success");
      },
      onError: () => {
        setVerificationState("error");
      },
    });
  }, [token, verifyEmail]);

  return (
    <div className="container flex items-center justify-center min-h-screen py-12">
      <div className="w-full max-w-md mx-auto p-6 bg-white dark:bg-slate-900 rounded-xl shadow-md space-y-6 text-center">
        {verificationState === "loading" && (
          <>
            <Loader2 className="h-16 w-16 text-blue-500 mx-auto animate-spin" />
            <h1 className="text-3xl font-bold text-[#003d5b]">
              Verifying your email...
            </h1>
            <p className="text-slate-500">This will only take a moment.</p>
          </>
        )}

        {verificationState === "success" && (
          <>
            <CheckCircle className="h-16 w-16 text-green-500 mx-auto" />
            <h1 className="text-3xl font-bold text-[#003d5b]">
              Email Verified
            </h1>
            <p className="text-slate-500">
              Your email has been successfully verified.
            </p>
            <Button
              className="mt-4 bg-[#005900] hover:bg-[#004700]"
              onClick={() => router.push("/login")}
            >
              Sign In
            </Button>
          </>
        )}

        {verificationState === "error" && (
          <>
            <XCircle className="h-16 w-16 text-red-500 mx-auto" />
            <h1 className="text-3xl font-bold text-[#003d5b]">
              Verification Failed
            </h1>
            <p className="text-slate-500">
              {!token
                ? "No verification token found."
                : "The verification link is invalid or has expired."}
            </p>
            <Button
              className="mt-4"
              variant="outline"
              onClick={() => router.push("/")}
            >
              Go to Home
            </Button>
          </>
        )}
      </div>
    </div>
  );
}
