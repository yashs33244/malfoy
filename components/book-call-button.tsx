"use client";

import { Button } from "@/components/ui/button";
import { useAuth } from "@/context/auth-context";
import { toast } from "sonner";
import { Calendar } from "lucide-react";

interface BookCallButtonProps {
  variant?:
    | "default"
    | "outline"
    | "secondary"
    | "ghost"
    | "link"
    | "destructive";
  size?: "default" | "sm" | "lg" | "icon";
  className?: string;
  children?: React.ReactNode;
  onClick?: () => void;
}

export function BookCallButton({
  variant = "default",
  size = "default",
  className = "",
  children = "Book a Call",
  onClick,
}: BookCallButtonProps) {
  const { isLoggedIn } = useAuth();

  const handleBookCall = () => {
    // Log auth state for debugging
    console.log("Auth state:", { isLoggedIn });

    if (isLoggedIn) {
      // Open Calendly in a new tab for authenticated users
      window.open("https://calendly.com/yashs3324/consultation", "_blank");
      toast.success("Opening scheduling page...");
    } else {
      // Show toast for non-authenticated users
      toast.error("Authentication required", {
        description: "You need to be signed in to schedule a consultation",
        action: {
          label: "Sign In",
          onClick: () => {
            window.location.href = "/login";
          },
        },
        duration: 5000,
      });
    }

    // Call any additional onClick handler passed as a prop
    if (onClick) {
      onClick();
    }
  };

  return (
    <Button
      variant={variant}
      size={size}
      className={`flex items-center gap-2 ${className}`}
      onClick={handleBookCall}
    >
      <Calendar className="h-4 w-4" />
      {children}
    </Button>
  );
}
