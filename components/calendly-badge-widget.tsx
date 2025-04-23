"use client";

import { useEffect, useState } from "react";
import { useAuth } from "@/context/auth-context";
import { toast } from "sonner";

interface CalendlyBadgeWidgetProps {
  url?: string;
  text?: string;
  color?: string;
  textColor?: string;
  showUnauthenticated?: boolean;
}

export function CalendlyBadgeWidget({
  url = "https://calendly.com/yashs3324/interview",
  text = "Schedule time with me",
  color = "#03c76e",
  textColor = "#1a1a1a",
  showUnauthenticated = false,
}: CalendlyBadgeWidgetProps) {
  const { isLoggedIn } = useAuth();
  const [isMounted, setIsMounted] = useState(false);

  // Mark component as mounted only on client-side
  useEffect(() => {
    setIsMounted(true);
  }, []);

  useEffect(() => {
    // Skip SSR and don't initialize if not supposed to show
    if (!isMounted || (!isLoggedIn && !showUnauthenticated)) return;

    // To prevent blocking the main thread, initialize after a slight delay
    const initializationDelay = setTimeout(() => {
      // First remove any existing badge to avoid duplicates
      const existingBadge = document.querySelector(".calendly-badge-widget");
      if (existingBadge && existingBadge.parentNode) {
        try {
          existingBadge.parentNode.removeChild(existingBadge);
        } catch (error) {
          console.error("Error removing existing Calendly badge:", error);
        }
      }

      // Load the Calendly CSS if not already loaded
      if (
        !document.querySelector(
          'link[href="https://assets.calendly.com/assets/external/widget.css"]'
        )
      ) {
        const link = document.createElement("link");
        link.rel = "stylesheet";
        link.href = "https://assets.calendly.com/assets/external/widget.css";
        // Use dataset to store priority hint
        link.dataset.priority = "low";
        document.head.appendChild(link);
      }

      // Function to initialize the badge widget
      const initWidget = () => {
        if (window.Calendly) {
          try {
            window.Calendly.initBadgeWidget({
              url: url,
              text: text,
              color: color,
              textColor: textColor,
            });
          } catch (error) {
            console.error("Error initializing Calendly badge widget:", error);
          }
        }
      };

      // Use requestIdleCallback for non-critical initialization
      if (typeof window.requestIdleCallback === "function") {
        window.requestIdleCallback(
          () => {
            if (window.Calendly) {
              initWidget();
            } else {
              // If not available yet, poll for it but with low priority
              const checkCalendly = setInterval(() => {
                if (window.Calendly) {
                  clearInterval(checkCalendly);
                  initWidget();
                }
              }, 200); // Increase interval for less frequent checks

              // Clear interval after 10 seconds to prevent infinite loop
              setTimeout(() => clearInterval(checkCalendly), 10000);
            }
          },
          { timeout: 5000 }
        );
      } else {
        // Fallback for browsers not supporting requestIdleCallback
        setTimeout(() => {
          if (window.Calendly) {
            initWidget();
          } else {
            // If not available yet, poll for it
            const checkCalendly = setInterval(() => {
              if (window.Calendly) {
                clearInterval(checkCalendly);
                initWidget();
              }
            }, 200);

            // Clear interval after 10 seconds to prevent infinite loop
            setTimeout(() => clearInterval(checkCalendly), 10000);
          }
        }, 1000);
      }
    }, 1000); // Delay initialization to prioritize main content loading

    // Click handler for when badge is clicked but user is not authenticated
    const handleCalendlyClick = (e: MouseEvent) => {
      if (!isLoggedIn && e.target instanceof Element) {
        // Check if the click was on a Calendly badge element
        if (e.target.closest(".calendly-badge-widget")) {
          e.preventDefault();
          e.stopPropagation();

          // Show authentication message
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

          return false;
        }
      }
    };

    // Only add the listener if we're showing to unauthenticated users
    if (showUnauthenticated && !isLoggedIn) {
      document.addEventListener("click", handleCalendlyClick, {
        capture: true,
        passive: false,
      });
    }

    // Cleanup function
    return () => {
      clearTimeout(initializationDelay);
      document.removeEventListener("click", handleCalendlyClick, true);

      const badge = document.querySelector(".calendly-badge-widget");
      if (badge && badge.parentNode) {
        try {
          badge.parentNode.removeChild(badge);
        } catch (error) {
          console.error("Error removing Calendly badge widget:", error);
        }
      }
    };
  }, [isMounted, url, text, color, textColor, isLoggedIn, showUnauthenticated]);

  // This component doesn't render anything visible itself
  return null;
}

// Add TypeScript type definition for Calendly
declare global {
  interface Window {
    Calendly?: {
      initBadgeWidget: (options: {
        url: string;
        text: string;
        color: string;
        textColor: string;
      }) => void;
    };
  }
}
