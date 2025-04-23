"use client";

import React, { useState, useEffect } from "react";
import { InlineWidget, PopupWidget } from "react-calendly";
import { Button } from "@/components/ui/button";
import { Calendar } from "lucide-react";
import { useAuth } from "@/context/auth-context";
import { toast } from "sonner";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
  DialogClose,
} from "@/components/ui/dialog";

interface CalendlyScheduleModalProps {
  url?: string;
  buttonText?: string;
  buttonVariant?:
    | "default"
    | "outline"
    | "secondary"
    | "ghost"
    | "link"
    | "destructive";
  buttonClassName?: string;
  prefillEmail?: boolean;
  modalTitle?: string;
}

export function CalendlyScheduleModal({
  url = "https://calendly.com/yashs3324/interview",
  buttonText = "Book a Call",
  buttonVariant = "default",
  buttonClassName = "",
  prefillEmail = true,
  modalTitle = "Schedule a Consultation",
}: CalendlyScheduleModalProps) {
  const { isLoggedIn, user } = useAuth();
  const [isOpen, setIsOpen] = useState(false);
  const [rootUrl, setRootUrl] = useState("");

  useEffect(() => {
    // Set the root URL for prefilling parameters
    setRootUrl(url);
  }, [url]);

  const handleScheduleClick = () => {
    if (isLoggedIn) {
      setIsOpen(true);
    } else {
      toast.error("Authentication required", {
        description: "You need to sign in to schedule a consultation",
        action: {
          label: "Sign In",
          onClick: () => {
            window.location.href = "/login";
          },
        },
        duration: 5000,
      });
    }
  };

  // Build prefill parameters for Calendly
  const getPrefillParams = () => {
    if (!user || !prefillEmail) return {};

    return {
      prefill: {
        email: user.email,
        name: user.name || "",
      },
    };
  };

  return (
    <Dialog open={isOpen} onOpenChange={setIsOpen}>
      <DialogTrigger asChild>
        <Button
          variant={buttonVariant}
          className={`flex items-center gap-2 ${buttonClassName}`}
          onClick={handleScheduleClick}
        >
          <Calendar className="h-4 w-4" />
          {buttonText}
        </Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-[600px]">
        <DialogHeader>
          <DialogTitle>{modalTitle}</DialogTitle>
        </DialogHeader>
        <div className="h-[600px] w-full">
          {isLoggedIn && isOpen && (
            <InlineWidget
              url={rootUrl}
              styles={{
                height: "600px",
                width: "100%",
              }}
              pageSettings={{
                backgroundColor: "ffffff",
                hideEventTypeDetails: false,
                hideLandingPageDetails: false,
                primaryColor: "03c76e",
                textColor: "4d5055",
              }}
              {...getPrefillParams()}
            />
          )}
        </div>
      </DialogContent>
    </Dialog>
  );
}

// Also export a PopupButton version for flexibility
export function CalendlyPopupButton({
  url = "https://calendly.com/yashs3324/interview",
  buttonText = "Book a Call",
  buttonVariant = "default",
  buttonClassName = "",
  prefillEmail = true,
}: Omit<CalendlyScheduleModalProps, "modalTitle">) {
  const { isLoggedIn, user } = useAuth();

  const handleScheduleClick = (e: React.MouseEvent) => {
    if (!isLoggedIn) {
      e.preventDefault();
      toast.error("Authentication required", {
        description: "You need to sign in to schedule a consultation",
        action: {
          label: "Sign In",
          onClick: () => {
            window.location.href = "/login";
          },
        },
        duration: 5000,
      });
    }
  };

  // Build prefill parameters for Calendly
  const getPrefillParams = () => {
    if (!user || !prefillEmail) return {};

    return {
      prefill: {
        email: user.email,
        name: user.name || "",
      },
    };
  };

  return (
    <>
      {isLoggedIn ? (
        <PopupWidget
          url={url}
          text={buttonText}
          color="#03c76e"
          textColor="#ffffff"
          rootElement={document.getElementById("__next") || document.body}
          {...getPrefillParams()}
        />
      ) : (
        <Button
          variant={buttonVariant}
          className={`flex items-center gap-2 ${buttonClassName}`}
          onClick={handleScheduleClick}
        >
          <Calendar className="h-4 w-4" />
          {buttonText}
        </Button>
      )}
    </>
  );
}
