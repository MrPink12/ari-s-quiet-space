import type { Config } from "tailwindcss";

export default {
  darkMode: ["class"],
  content: ["./pages/**/*.{ts,tsx}", "./components/**/*.{ts,tsx}", "./app/**/*.{ts,tsx}", "./src/**/*.{ts,tsx}"],
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
      fontFamily: {
        sans: ['Inter', '-apple-system', 'BlinkMacSystemFont', 'sans-serif'],
      },
      fontSize: {
        'ari-body': ['1.0625rem', { lineHeight: '1.8', letterSpacing: '-0.01em' }],
        'ari-heading': ['1.75rem', { lineHeight: '1.35', letterSpacing: '-0.02em', fontWeight: '300' }],
        'ari-subheading': ['1.125rem', { lineHeight: '1.6', letterSpacing: '-0.01em' }],
        'ari-small': ['0.875rem', { lineHeight: '1.6', letterSpacing: '0' }],
        'ari-input': ['1.0625rem', { lineHeight: '1.5', letterSpacing: '-0.01em' }],
      },
      maxWidth: {
        'ari': '800px',
        'ari-narrow': '480px',
      },
      colors: {
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
        destructive: {
          DEFAULT: "hsl(var(--destructive))",
          foreground: "hsl(var(--destructive-foreground))",
        },
        muted: {
          DEFAULT: "hsl(var(--muted))",
          foreground: "hsl(var(--muted-foreground))",
        },
        accent: {
          DEFAULT: "hsl(var(--accent))",
          foreground: "hsl(var(--accent-foreground))",
        },
        popover: {
          DEFAULT: "hsl(var(--popover))",
          foreground: "hsl(var(--popover-foreground))",
        },
        card: {
          DEFAULT: "hsl(var(--card))",
          foreground: "hsl(var(--card-foreground))",
        },
        sidebar: {
          DEFAULT: "hsl(var(--sidebar-background))",
          foreground: "hsl(var(--sidebar-foreground))",
          primary: "hsl(var(--sidebar-primary))",
          "primary-foreground": "hsl(var(--sidebar-primary-foreground))",
          accent: "hsl(var(--sidebar-accent))",
          "accent-foreground": "hsl(var(--sidebar-accent-foreground))",
          border: "hsl(var(--sidebar-border))",
          ring: "hsl(var(--sidebar-ring))",
        },
        ari: {
          message: "hsl(var(--ari-message-bg))",
          "message-text": "hsl(var(--ari-message-text))",
          "user-text": "hsl(var(--ari-user-text))",
        },
      },
      borderRadius: {
        lg: "var(--radius)",
        md: "calc(var(--radius) - 2px)",
        sm: "calc(var(--radius) - 4px)",
      },
      boxShadow: {
        'ari-subtle': '0 1px 3px 0 rgba(0, 0, 0, 0.02)',
        'ari-soft': '0 2px 8px -2px rgba(0, 0, 0, 0.04)',
        'ari-focus': '0 0 0 2px hsl(210 25% 55% / 0.15)',
      },
      transitionDuration: {
        'ari-slow': '450ms',
        'ari-medium': '300ms',
      },
      transitionTimingFunction: {
        'ari': 'cubic-bezier(0.25, 0.1, 0.25, 1)',
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
} satisfies Config;
