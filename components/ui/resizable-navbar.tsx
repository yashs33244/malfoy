"use client";
import { cn } from "@/lib/utils";
import { IconMenu2, IconX } from "@tabler/icons-react";
import {
  motion,
  AnimatePresence,
  useScroll,
  useMotionValueEvent,
} from "motion/react";

import React, { useRef, useState } from "react";

interface NavbarProps {
  children: React.ReactNode;
  className?: string;
}

interface NavBodyProps {
  children: React.ReactNode;
  className?: string;
}

interface NavItemsProps {
  items: {
    name: string;
    link: string;
  }[];
  className?: string;
  onItemClick?: () => void;
}

interface MobileNavProps {
  children: React.ReactNode;
  className?: string;
}

interface MobileNavHeaderProps {
  children: React.ReactNode;
  className?: string;
}

interface MobileNavMenuProps {
  children: React.ReactNode;
  className?: string;
  isOpen: boolean;
  onClose: () => void;
}

export const Navbar = ({ children, className }: NavbarProps) => {
  const ref = useRef<HTMLDivElement>(null);
  const { scrollY } = useScroll();
  const [isScrolled, setIsScrolled] = useState(false);
  const prevScrollY = useRef(0);

  // Track scroll position to control navbar width
  useMotionValueEvent(scrollY, "change", (latest) => {
    // Detect even the smallest scroll direction change
    const scrollingDown = latest > prevScrollY.current;
    const scrollingUp = latest < prevScrollY.current;

    // Immediate response to scroll direction
    if (scrollingDown) {
      setIsScrolled(true); // 60% width
    } else if (scrollingUp) {
      setIsScrolled(false); // 80% width
    }

    // Save current position for next comparison
    prevScrollY.current = latest;
  });

  return (
    <motion.div
      ref={ref}
      className={cn(
        "fixed inset-x-0 top-0 z-40 w-full flex justify-center",
        className
      )}
    >
      <motion.div
        className="w-full"
        animate={{
          width: isScrolled ? "60%" : "80%",
        }}
        transition={{
          type: "spring",
          stiffness: 400,
          damping: 40,
          duration: 0.1,
        }}
      >
        {children}
      </motion.div>
    </motion.div>
  );
};

export const NavBody = ({ children, className }: NavBodyProps) => {
  return (
    <motion.div
      style={{
        width: "100%",
        padding: "8px 24px",
        borderRadius: "9999px",
        marginTop: "16px",
      }}
      className={cn(
        "relative z-[60] flex flex-row items-center justify-between self-start rounded-full lg:flex bg-white/30 dark:bg-neutral-950/30 backdrop-blur-xl",
        className
      )}
      animate={{
        boxShadow:
          "0 0 24px rgba(34, 42, 53, 0.15), 0 1px 1px rgba(0, 0, 0, 0.08), 0 0 0 1px rgba(34, 42, 53, 0.08), 0 0 8px rgba(34, 42, 53, 0.12), 0 16px 68px rgba(47, 48, 55, 0.1), 0 1px 0 rgba(255, 255, 255, 0.15) inset",
      }}
    >
      {children}
    </motion.div>
  );
};

export const NavItems = ({ items, className, onItemClick }: NavItemsProps) => {
  const [hovered, setHovered] = useState<number | null>(null);

  return (
    <motion.div
      onMouseLeave={() => setHovered(null)}
      className={cn(
        "absolute inset-0 hidden flex-1 flex-row items-center justify-center space-x-2 text-sm font-medium text-zinc-600 lg:flex lg:space-x-2",
        className
      )}
    >
      {items.map((item, idx) => (
        <a
          onMouseEnter={() => setHovered(idx)}
          onClick={onItemClick}
          className="relative px-4 py-2 text-neutral-600 dark:text-neutral-300"
          key={`link-${idx}`}
          href={item.link}
        >
          {hovered === idx && (
            <motion.div
              layoutId="hovered"
              className="absolute inset-0 h-full w-full rounded-full bg-gray-100 dark:bg-neutral-800"
              transition={{
                type: "spring",
                stiffness: 300,
                damping: 100,
              }}
            />
          )}
          <span className="relative z-20">{item.name}</span>
        </a>
      ))}
    </motion.div>
  );
};

export const MobileNav = ({ children, className }: MobileNavProps) => {
  return (
    <motion.div
      style={{
        width: "100%",
        padding: "12px 16px",
        borderRadius: "9999px",
        marginTop: "16px",
      }}
      className={cn(
        "relative z-50 flex flex-col items-center justify-between py-2 lg:hidden rounded-full bg-white/30 dark:bg-neutral-950/30 backdrop-blur-xl",
        className
      )}
      animate={{
        boxShadow:
          "0 0 24px rgba(34, 42, 53, 0.15), 0 1px 1px rgba(0, 0, 0, 0.08), 0 0 0 1px rgba(34, 42, 53, 0.08), 0 0 8px rgba(34, 42, 53, 0.12), 0 16px 68px rgba(47, 48, 55, 0.1), 0 1px 0 rgba(255, 255, 255, 0.15) inset",
      }}
    >
      {children}
    </motion.div>
  );
};

export const MobileNavHeader = ({
  children,
  className,
}: MobileNavHeaderProps) => {
  return (
    <div
      className={cn(
        "flex w-full flex-row items-center justify-between",
        className
      )}
    >
      {children}
    </div>
  );
};

export const MobileNavMenu = ({
  children,
  className,
  isOpen,
  onClose,
}: MobileNavMenuProps) => {
  return (
    <AnimatePresence>
      {isOpen && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{
            duration: 0.1,
            ease: "easeInOut",
          }}
          className={cn(
            "absolute inset-x-0 mx-auto top-16 z-50 flex w-full flex-col items-start justify-start gap-4 rounded-lg bg-white/30 backdrop-blur-xl px-4 py-8 dark:bg-neutral-950/30",
            className
          )}
          style={{
            width: "100%",
            boxShadow:
              "0 0 24px rgba(34, 42, 53, 0.15), 0 1px 1px rgba(0, 0, 0, 0.08), 0 0 0 1px rgba(34, 42, 53, 0.08), 0 0 8px rgba(34, 42, 53, 0.12), 0 16px 68px rgba(47, 48, 55, 0.1), 0 1px 0 rgba(255, 255, 255, 0.15) inset",
          }}
        >
          {children}
        </motion.div>
      )}
    </AnimatePresence>
  );
};

export const MobileNavToggle = ({
  isOpen,
  onClick,
}: {
  isOpen: boolean;
  onClick: () => void;
}) => {
  return isOpen ? (
    <IconX className="text-black dark:text-white" onClick={onClick} />
  ) : (
    <IconMenu2 className="text-black dark:text-white" onClick={onClick} />
  );
};

export const NavbarLogo = () => {
  return (
    <a
      href="#"
      className="relative z-20 mr-4 flex items-center space-x-2 px-2 py-1 text-sm font-normal text-black"
    >
      <img
        src="https://ysingla.notion.site/image/https%3A%2F%2Fprod-files-secure.s3.us-west-2.amazonaws.com%2Fe12b42ac-4e54-476f-a4f5-7d6bdb1e61e2%2F714beba9-2afc-440e-b1c8-8d95f9c03bda%2Fproductnerd_a_modern_logo_for_a_company_called_greenmind_that_2b7c439c-f8f7-48bc-8446-0d129b699a3f_2-removebg-preview.png?table=block&id=1cfe6255-f338-81c4-9a65-c21f3b88d852&spaceId=e6b92090-480d-4e79-a4a6-82eca60a06b3&width=250&userId=&cache=v2"
        alt="logo"
        width={30}
        height={30}
      />
      <span className="font-bold text-black dark:text-white ">Malfoy</span>
    </a>
  );
};

export const NavbarButton = ({
  href,
  as: Tag = "a",
  children,
  className,
  variant = "primary",
  ...props
}: {
  href?: string;
  as?: React.ElementType;
  children: React.ReactNode;
  className?: string;
  variant?: "primary" | "secondary" | "dark" | "gradient";
} & (
  | React.ComponentPropsWithoutRef<"a">
  | React.ComponentPropsWithoutRef<"button">
)) => {
  const baseStyles =
    "px-4 py-2 rounded-md bg-white button bg-white text-black text-sm font-bold relative cursor-pointer inline-block text-center";

  const variantStyles = {
    primary:
      "shadow-[0_0_24px_rgba(34,_42,_53,_0.06),_0_1px_1px_rgba(0,_0,_0,_0.05),_0_0_0_1px_rgba(34,_42,_53,_0.04),_0_0_4px_rgba(34,_42,_53,_0.08),_0_16px_68px_rgba(47,_48,_55,_0.05),_0_1px_0_rgba(255,_255,_255,_0.1)_inset]",
    secondary: "bg-transparent shadow-none dark:text-white",
    dark: "bg-black text-white shadow-[0_0_24px_rgba(34,_42,_53,_0.06),_0_1px_1px_rgba(0,_0,_0,_0.05),_0_0_0_1px_rgba(34,_42,_53,_0.04),_0_0_4px_rgba(34,_42,_53,_0.08),_0_16px_68px_rgba(47,_48,_55,_0.05),_0_1px_0_rgba(255,_255,_255,_0.1)_inset]",
    gradient:
      "bg-gradient-to-b from-blue-500 to-blue-700 text-white shadow-[0px_2px_0px_0px_rgba(255,255,255,0.3)_inset]",
  };

  return (
    <Tag
      href={href || undefined}
      className={cn(baseStyles, variantStyles[variant], className)}
      {...props}
    >
      {children}
    </Tag>
  );
};
