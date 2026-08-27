import type { Config } from "tailwindcss";

const config: Config = {
  darkMode: ["class"],
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
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
        // Etsy Design System Tokens
        etsy: {
          orange: "#f1641e",
          orangePressed: "#d44e0d",
          brown: "#a66523",
          ink: "#222222",
          body: "#3f3f3f",
          muted: "#595959",
          mutedSoft: "#757575",
          hairline: "#d6d6d6",
          hairlineSoft: "#e6e6e6",
          borderStrong: "#bdbdbd",
          canvas: "#ffffff",
          surfaceSoft: "#f6f6f6",
          surfaceCard: "#ffffff",
          surfaceCream: "#fdf6e8",
          surfaceCreamStrong: "#f5e8c8",
          linkBlue: "#258ddb",
          success: "#258635",
          error: "#b3261e",
        },
      },
      borderRadius: {
        none: "0px",
        xs: "4px",
        sm: "6px",
        DEFAULT: "8px",
        md: "8px",
        lg: "12px",
        xl: "20px",
        full: "9999px",
      },
      fontSize: {
        wordmark: ["36px", { lineHeight: "1.0", letterSpacing: "-0.5px" }],
        "display-xl": ["32px", { lineHeight: "1.2", letterSpacing: "-0.3px", fontWeight: "600" }],
        "display-lg": ["28px", { lineHeight: "1.25", fontWeight: "600" }],
        "heading-lg": ["22px", { lineHeight: "1.27", fontWeight: "600" }],
        "heading-md": ["18px", { lineHeight: "1.33", fontWeight: "500" }],
        "title-md": ["16px", { lineHeight: "1.5", fontWeight: "500" }],
        "body-md": ["16px", { lineHeight: "1.5", fontWeight: "400" }],
        "body-sm": ["14px", { lineHeight: "1.43", fontWeight: "400" }],
        caption: ["13px", { lineHeight: "1.38", fontWeight: "400" }],
        "button-md": ["16px", { lineHeight: "1.25", fontWeight: "600" }],
        "button-sm": ["14px", { lineHeight: "1.29", fontWeight: "600" }],
        badge: ["11px", { lineHeight: "1.27", letterSpacing: "0.2px", fontWeight: "600" }],
      },
      boxShadow: {
        "etsy-card": "rgba(0, 0, 0, 0.04) 0 1px 4px 0, rgba(0, 0, 0, 0.08) 0 4px 12px 0",
      },
    },
  },
  plugins: [],
};

export default config;
