"use client";

import { useEffect, useState } from "react";

export function SmoothCursor() {
  const [position, setPosition] = useState({ x: 0, y: 0 });
  const [hidden, setHidden] = useState(true);
  const [clicked, setClicked] = useState(false);
  const [linkHovered, setLinkHovered] = useState(false);
  const [isMounted, setIsMounted] = useState(false);
  const [isTouchDevice, setIsTouchDevice] = useState(false);

  useEffect(() => {
    setIsMounted(true);
    setIsTouchDevice(navigator.maxTouchPoints > 0);

    const updatePosition = (e: MouseEvent) => {
      setPosition({ x: e.clientX, y: e.clientY });
      setHidden(false);
    };

    const handleMouseDown = () => setClicked(true);
    const handleMouseUp = () => setClicked(false);

    const handleMouseEnterLink = (e: MouseEvent) => {
      if (
        (e.target as HTMLElement).tagName === "A" ||
        (e.target as HTMLElement).tagName === "BUTTON" ||
        (e.target as HTMLElement).closest("a") ||
        (e.target as HTMLElement).closest("button")
      ) {
        setLinkHovered(true);
      }
    };

    const handleMouseLeaveLink = (e: MouseEvent) => {
      if (
        (e.target as HTMLElement).tagName === "A" ||
        (e.target as HTMLElement).tagName === "BUTTON" ||
        (e.target as HTMLElement).closest("a") ||
        (e.target as HTMLElement).closest("button")
      ) {
        setLinkHovered(false);
      }
    };

    const handleMouseLeave = () => setHidden(true);
    const handleMouseEnter = () => setHidden(false);

    document.addEventListener("mousemove", updatePosition);
    document.addEventListener("mousedown", handleMouseDown);
    document.addEventListener("mouseup", handleMouseUp);
    document.addEventListener("mouseleave", handleMouseLeave);
    document.addEventListener("mouseenter", handleMouseEnter);

    document.querySelectorAll("a, button").forEach((el) => {
      el.addEventListener("mouseenter", handleMouseEnterLink as EventListener);
      el.addEventListener("mouseleave", handleMouseLeaveLink as EventListener);
    });

    return () => {
      document.removeEventListener("mousemove", updatePosition);
      document.removeEventListener("mousedown", handleMouseDown);
      document.removeEventListener("mouseup", handleMouseUp);
      document.removeEventListener("mouseleave", handleMouseLeave);
      document.removeEventListener("mouseenter", handleMouseEnter);

      document.querySelectorAll("a, button").forEach((el) => {
        el.removeEventListener(
          "mouseenter",
          handleMouseEnterLink as EventListener
        );
        el.removeEventListener(
          "mouseleave",
          handleMouseLeaveLink as EventListener
        );
      });
    };
  }, []);

  // Don't render anything during SSR or on touch devices
  if (!isMounted || isTouchDevice) return null;

  return (
    <div
      className={`fixed z-[999] pointer-events-none transition-opacity duration-300 ${
        hidden ? "opacity-0" : "opacity-100"
      }`}
      style={{
        left: `${position.x}px`,
        top: `${position.y}px`,
      }}
    >
      <div
        className={`relative flex items-center justify-center ${
          clicked ? "scale-90" : "scale-100"
        } ${
          linkHovered ? "scale-150" : "scale-100"
        } transition-transform duration-300`}
        style={{
          transform: `translate(-50%, -50%)`,
        }}
      >
        <div
          className={`absolute rounded-full ${
            linkHovered ? "bg-transparent border border-primary" : "bg-primary"
          } transition-all duration-300`}
          style={{
            width: linkHovered ? "40px" : "8px",
            height: linkHovered ? "40px" : "8px",
            opacity: 0.5,
          }}
        ></div>
      </div>
    </div>
  );
}
