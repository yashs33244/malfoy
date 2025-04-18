"use client";

import React from "react";

interface SimpleHeadingProps {
  children: React.ReactNode;
  as?: "h1" | "h2" | "h3" | "h4" | "h5" | "h6";
  className?: string;
}

export default function SimpleHeading({
  children,
  as = "h2",
  className = "",
}: SimpleHeadingProps) {
  const Component = as;

  const baseStyles = "font-bold tracking-tight";
  const sizeStyles = {
    h1: "text-4xl md:text-5xl",
    h2: "text-3xl md:text-4xl",
    h3: "text-2xl md:text-3xl",
    h4: "text-xl md:text-2xl",
    h5: "text-lg md:text-xl",
    h6: "text-base md:text-lg",
  };

  const combinedClassName = `${baseStyles} ${sizeStyles[as]} ${className}`;

  return <Component className={combinedClassName}>{children}</Component>;
}
