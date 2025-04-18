"use client";

import { useEffect, useRef, useState } from "react";

export function SmoothCursor() {
  const cursorRef = useRef<HTMLDivElement>(null);
  const [hidden, setHidden] = useState(true);
  const [clicked, setClicked] = useState(false);
  const [linkHovered, setLinkHovered] = useState(false);
  const [isMounted, setIsMounted] = useState(false);
  const [isTouchDevice, setIsTouchDevice] = useState(false);
  const mousePosition = useRef({ x: 0, y: 0 });
  const cursorPosition = useRef({ x: 0, y: 0 });
  const animationFrameId = useRef<number | null>(null);

  useEffect(() => {
    setIsMounted(true);
    setIsTouchDevice(navigator.maxTouchPoints > 0);

    const updateMousePosition = (e: MouseEvent) => {
      mousePosition.current = { x: e.clientX, y: e.clientY };
      setHidden(false);
    };

    // Animation loop for smooth cursor movement
    const animateCursor = () => {
      if (cursorRef.current) {
        // Smoothly interpolate between current cursor position and mouse position
        const dx = mousePosition.current.x - cursorPosition.current.x;
        const dy = mousePosition.current.y - cursorPosition.current.y;

        // Apply easing (0.2 means it will move 20% of the remaining distance each frame)
        cursorPosition.current.x += dx * 0.2;
        cursorPosition.current.y += dy * 0.2;

        // Apply the transform instead of changing left/top properties
        cursorRef.current.style.transform = `translate3d(${cursorPosition.current.x}px, ${cursorPosition.current.y}px, 0)`;
      }

      animationFrameId.current = requestAnimationFrame(animateCursor);
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

    document.addEventListener("mousemove", updateMousePosition, {
      passive: true,
    });
    document.addEventListener("mousedown", handleMouseDown);
    document.addEventListener("mouseup", handleMouseUp);
    document.addEventListener("mouseleave", handleMouseLeave);
    document.addEventListener("mouseenter", handleMouseEnter);

    document.querySelectorAll("a, button").forEach((el) => {
      el.addEventListener("mouseenter", handleMouseEnterLink as EventListener);
      el.addEventListener("mouseleave", handleMouseLeaveLink as EventListener);
    });

    // Start the animation loop
    animationFrameId.current = requestAnimationFrame(animateCursor);

    return () => {
      document.removeEventListener("mousemove", updateMousePosition);
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

      // Cancel animation frame on cleanup
      if (animationFrameId.current !== null) {
        cancelAnimationFrame(animationFrameId.current);
      }
    };
  }, []);

  // Don't render anything during SSR or on touch devices
  if (!isMounted || isTouchDevice) return null;

  return (
    <div
      ref={cursorRef}
      className={`fixed z-[999] pointer-events-none transition-opacity duration-300 ${
        hidden ? "opacity-0" : "opacity-100"
      }`}
      style={{
        left: 0,
        top: 0,
        transform: "translate3d(0px, 0px, 0)",
        willChange: "transform",
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
