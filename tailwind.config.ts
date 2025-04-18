import type { Config } from "tailwindcss"

const config = {
  darkMode: ["class"],
  content: [
    "./pages/**/*.{ts,tsx}",
    "./components/**/*.{ts,tsx}",
    "./app/**/*.{ts,tsx}",
    "./src/**/*.{ts,tsx}",
    "*.{js,ts,jsx,tsx,mdx}",
  ],
  prefix: "",
  theme: {
    container: {
      center: true,
      padding: "2rem",
      screens: {
        "2xl": "1400px",
      },
    },
    extend: {
      colors: {
        // Custom color palette
        black: {
          DEFAULT: '#000000',
          100: '#000000',
          200: '#000000',
          300: '#000000',
          400: '#000000',
          500: '#000000',
          600: '#333333',
          700: '#666666',
          800: '#999999',
          900: '#cccccc'
        },
        sgbus_green: {
          DEFAULT: '#00D800',
          100: '#002b00',
          200: '#005600',
          300: '#008100',
          400: '#00ab00',
          500: '#00d800',
          600: '#12ff12',
          700: '#4eff4e',
          800: '#89ff89',
          900: '#c4ffc4'
        },
        green: {
          DEFAULT: '#00FF00',
          100: '#003300',
          200: '#006600',
          300: '#009900',
          400: '#00cc00',
          500: '#00ff00',
          600: '#33ff33',
          700: '#66ff66',
          800: '#99ff99',
          900: '#ccffcc'
        },
        viridian: {
          DEFAULT: '#1B7D5E',
          100: '#061913',
          200: '#0b3226',
          300: '#114b39',
          400: '#16644c',
          500: '#1b7d5e',
          600: '#28b88b',
          700: '#4fd8ad',
          800: '#8ae5c8',
          900: '#c4f2e4'
        },
        page_bg: '#F3F7F4', // Background color
        // Light theme
        light: {
          primary: "#1B7D5E", // Viridian
          secondary: "#00D800", // SGBUS green
          accent: "#00FF00", // Green
          background: "#F3F7F4", // Specified background
        },
        // Dark theme
        dark: {
          primary: "#1B7D5E", // Viridian
          secondary: "#00D800", // SGBUS green
          accent: "#00FF00", // Green
          background: "#212529", // Very Dark Gray
        },
        border: "hsl(var(--border))",
        input: "hsl(var(--input))",
        ring: "hsl(var(--ring))",
        background: "hsl(var(--background))",
        foreground: "hsl(var(--foreground))",
        primary: {
          DEFAULT: "hsl(var(--primary))",
          foreground: "hsl(var(--primary-foreground))",
        },
        secondary: {
          DEFAULT: "hsl(var(--secondary))",
          foreground: "hsl(var(--secondary-foreground))",
        },
        accent: {
          DEFAULT: "hsl(var(--accent))",
          foreground: "hsl(var(--accent-foreground))",
        },
        destructive: {
          DEFAULT: "hsl(var(--destructive))",
          foreground: "hsl(var(--destructive-foreground))",
        },
        muted: {
          DEFAULT: "hsl(var(--muted))",
          foreground: "hsl(var(--muted-foreground))",
        },
        popover: {
          DEFAULT: "hsl(var(--popover))",
          foreground: "hsl(var(--popover-foreground))",
        },
        card: {
          DEFAULT: "hsl(var(--card))",
          foreground: "hsl(var(--card-foreground))",
        },
      },
      borderRadius: {
        lg: "var(--radius)",
        md: "calc(var(--radius) - 2px)",
        sm: "calc(var(--radius) - 4px)",
      },
      fontFamily: {
        sans: ["SF Pro Display", "var(--font-kanit)", "sans-serif"],
        kanit: ["var(--font-kanit)"],
      },
      keyframes: {
        "accordion-down": {
          from: { height: "0" },
          to: { height: "var(--radix-accordion-content-height)" },
        },
        "accordion-up": {
          from: { height: "var(--radix-accordion-content-height)" },
          to: { height: "0" },
        },
      },
      animation: {
        "accordion-down": "accordion-down 0.2s ease-out",
        "accordion-up": "accordion-up 0.2s ease-out",
      },
    },
  },
  plugins: [require("tailwindcss-animate")],
} satisfies Config

export default config
