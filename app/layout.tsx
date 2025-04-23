"use client";

import type React from "react";
import "./globals.css";
import { ThemeProvider } from "@/components/theme-provider";
import { AuthProvider } from "@/context/auth-context";
import { ReactQueryProvider } from "@/context/query-provider";
import NextAuthProvider from "@/components/providers/session-provider";
import { Toaster } from "sonner";
import { CalendlyBadgeWidget } from "@/components/calendly-badge-widget";
import { Inter } from "next/font/google";
import Script from "next/script";
import { useState, useEffect, useCallback } from "react";
import LoadingScreen from "@/components/loading-screen";
import Head from "next/head";

// Optimize font loading
const inter = Inter({
  subsets: ["latin"],
  display: "swap",
  preload: true,
  fallback: ["system-ui", "Arial", "sans-serif"],
});

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const [isLoading, setIsLoading] = useState(true);

  // Optimize the loading check with useCallback to prevent unnecessary re-renders
  const handleLoad = useCallback(() => {
    // Add a small delay to ensure smooth transition
    setTimeout(() => setIsLoading(false), 500);
  }, []);

  useEffect(() => {
    // Check if the document is already loaded
    if (document.readyState === "complete") {
      setIsLoading(false);
      return;
    }

    // Add event listener for when the page finishes loading
    window.addEventListener("load", handleLoad);

    // Fallback timer in case load event doesn't fire
    const fallbackTimer = setTimeout(() => {
      setIsLoading(false);
    }, 3000);

    return () => {
      window.removeEventListener("load", handleLoad);
      clearTimeout(fallbackTimer);
    };
  }, [handleLoad]);

  return (
    <html lang="en" suppressHydrationWarning className="light">
      <head>
        {/* Performance optimizations */}
        <meta
          name="viewport"
          content="width=device-width, initial-scale=1, viewport-fit=cover"
        />
        <meta httpEquiv="X-UA-Compatible" content="IE=edge" />
        <meta name="mobile-web-app-capable" content="yes" />
        <meta name="apple-mobile-web-app-capable" content="yes" />
        <meta name="apple-mobile-web-app-status-bar-style" content="default" />
        <meta name="theme-color" content="#03c76e" />

        {/* Resource hints */}
        <link
          rel="preconnect"
          href="https://assets.calendly.com"
          crossOrigin="anonymous"
        />
        <link rel="dns-prefetch" href="https://assets.calendly.com" />

        {/* Favicon */}
        <link rel="icon" href="/malfoy_favicon.ico" sizes="any" />
        <link rel="apple-touch-icon" href="/malfoy_favicon.ico" />

        {/* External scripts */}
        <Script
          src="https://assets.calendly.com/assets/external/widget.js"
          strategy="lazyOnload"
        />
      </head>
      <body
        className={`font-sans antialiased ${inter.className}`}
        suppressHydrationWarning
        style={{
          scrollBehavior: "smooth",
          WebkitTextSizeAdjust: "100%",
          overscrollBehavior: "none",
        }}
      >
        <LoadingScreen isLoading={isLoading} />
        <NextAuthProvider>
          <ThemeProvider
            attribute="class"
            defaultTheme="light"
            enableSystem={false}
            disableTransitionOnChange
            forcedTheme="light"
          >
            <ReactQueryProvider>
              <AuthProvider>{children}</AuthProvider>
            </ReactQueryProvider>
          </ThemeProvider>
        </NextAuthProvider>
        <Toaster position="top-right" richColors closeButton />
      </body>
    </html>
  );
}
