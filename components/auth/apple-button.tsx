"use client";

import { useEffect, useState, useCallback } from "react";
import { Button } from "@/components/ui/button";
import { useAppleAuth } from "@/lib/query-hooks";
import { useAuth } from "@/context/auth-context";
import { useRouter } from "next/navigation";
import { toast } from "sonner";

declare global {
  interface Window {
    AppleID?: {
      auth: {
        init: (config: any) => void;
        signIn: () => Promise<any>;
      };
    };
  }
}

export function AppleAuthButton() {
  const [isAppleLoaded, setIsAppleLoaded] = useState(false);
  const { login: authLogin } = useAuth();
  const router = useRouter();

  const {
    mutate: appleAuthMutation,
    isPending: isAuthenticating,
    error: authError,
  } = useAppleAuth();

  // Initialize Apple Sign In
  useEffect(() => {
    // Only load if not already loaded
    if (window.AppleID) {
      setIsAppleLoaded(true);
      return;
    }

    // Load Apple Sign In JS
    const script = document.createElement("script");
    script.src =
      "https://appleid.cdn-apple.com/appleauth/static/jsapi/appleid/1/en_US/appleid.auth.js";
    script.async = true;
    script.defer = true;
    script.onload = () => setIsAppleLoaded(true);
    document.body.appendChild(script);

    return () => {
      if (document.body.contains(script)) {
        document.body.removeChild(script);
      }
    };
  }, []);

  // Configure Apple Sign In when loaded
  useEffect(() => {
    if (isAppleLoaded && window.AppleID) {
      window.AppleID.auth.init({
        clientId:
          process.env.NEXT_PUBLIC_APPLE_CLIENT_ID || "com.malfoy.client",
        scope: "email",
        redirectURI: `${window.location.origin}/api/auth/callback/apple`,
        usePopup: true,
      });
    }
  }, [isAppleLoaded]);

  const handleAppleSignIn = useCallback(async () => {
    if (!isAppleLoaded || !window.AppleID) {
      toast.error("Apple Sign In is not available");
      return;
    }

    try {
      // Perform the Apple Sign In
      const response = await window.AppleID.auth.signIn();

      // Pass the ID token to our backend
      if (
        response &&
        response.authorization &&
        response.authorization.id_token
      ) {
        appleAuthMutation(
          { id_token: response.authorization.id_token },
          {
            onSuccess: (data) => {
              if (data.token && data.user) {
                // Create proper login data for auth context
                authLogin({ email: data.user.email, password: "" });
                router.push("/");
                toast.success("Signed in with Apple successfully!");
              } else {
                toast.error(data.message || "Apple authentication failed");
              }
            },
            onError: (error) => {
              toast.error(
                (error as Error).message || "Apple authentication failed"
              );
            },
          }
        );
      } else {
        toast.error("Failed to get authentication token from Apple");
      }
    } catch (error) {
      console.error("Apple Sign In error:", error);
      toast.error("Apple Sign In failed");
    }
  }, [isAppleLoaded, appleAuthMutation, authLogin, router]);

  return (
    <Button
      type="button"
      variant="outline"
      className="w-full flex items-center justify-center gap-2 border-gray-300 hover:bg-gray-50 dark:hover:bg-gray-800"
      onClick={handleAppleSignIn}
      disabled={!isAppleLoaded || isAuthenticating}
    >
      <svg
        xmlns="http://www.w3.org/2000/svg"
        viewBox="0 0 24 24"
        className="w-5 h-5"
        fill="currentColor"
      >
        <path d="M12.152 6.896c-.948 0-2.415-1.078-3.96-1.04-2.04.027-3.91 1.183-4.961 3.014-2.117 3.675-.546 9.103 1.519 12.09 1.013 1.454 2.208 3.09 3.792 3.039 1.52-.065 2.09-.987 3.935-.987 1.831 0 2.35.987 3.96.948 1.637-.026 2.676-1.48 3.676-2.948 1.156-1.688 1.636-3.325 1.662-3.415-.039-.013-3.182-1.221-3.22-4.857-.026-3.04 2.48-4.494 2.597-4.559-1.429-2.09-3.623-2.324-4.39-2.376-2-.156-3.675 1.09-4.61 1.09zM15.53 3.83c.843-1.012 1.4-2.427 1.245-3.83-1.207.052-2.662.805-3.532 1.818-.78.896-1.454 2.338-1.273 3.714 1.338.104 2.715-.688 3.559-1.701" />
      </svg>
      {isAuthenticating ? "Signing in..." : "Sign in with Apple"}
    </Button>
  );
}
