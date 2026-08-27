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
<<<<<<< HEAD
        // Shopify Design System Tokens
        shopify: {
          aloe: "#c1fbd4",
          aloeHover: "#a8f5c2",
          aloeText: "#004c3f",
          pistachio: "#d4f9e0",
          night: "#000000",
          nightElevated: "#0a0a0a",
          surfaceDark: "#1e2c31",
          cream: "#fbfbf5",
          ink: "#000000",
          shade30: "#d4d4d8",
          shade40: "#a1a1aa",
          shade50: "#71717a",
          shade60: "#52525b",
          shade70: "#3f3f46",
          hairlineLight: "#e4e4e7",
          hairlineDark: "#1e2c31",
          linkMint: "#99b3ad",
=======
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
>>>>>>> 7ee9ca6f04322930ec29228c493ddb72ee250ce5
        },
      },
      borderRadius: {
        none: "0px",
        xs: "4px",
        sm: "6px",
        DEFAULT: "8px",
        md: "8px",
        lg: "12px",
<<<<<<< HEAD
        xl: "16px",
        "2xl": "20px",
        "3xl": "24px",
        pill: "9999px",
=======
        xl: "20px",
>>>>>>> 7ee9ca6f04322930ec29228c493ddb72ee250ce5
        full: "9999px",
      },
      fontFamily: {
        display: ["'NeueHaasGrotesk Display'", "-apple-system", "BlinkMacSystemFont", "'Segoe UI'", "Roboto", "Helvetica", "Arial", "sans-serif"],
        body: ["'Inter Variable'", "Inter", "-apple-system", "BlinkMacSystemFont", "'Segoe UI'", "Roboto", "sans-serif"],
        mono: ["ui-monospace", "SFMono-Regular", "Menlo", "Monaco", "Consolas", "monospace"],
      },
      fontSize: {
<<<<<<< HEAD
        "display-xxl": ["76px", { lineHeight: "1.0", letterSpacing: "1.5px", fontWeight: "300" }],
        "display-xl": ["56px", { lineHeight: "1.05", letterSpacing: "0.5px", fontWeight: "300" }],
        "display-lg": ["44px", { lineHeight: "1.12", letterSpacing: "0px", fontWeight: "300" }],
        "heading-xl": ["28px", { lineHeight: "1.28", letterSpacing: "0.42px", fontWeight: "500" }],
        "heading-lg": ["24px", { lineHeight: "1.14", letterSpacing: "0.36px", fontWeight: "400" }],
        "heading-md": ["20px", { lineHeight: "1.4", letterSpacing: "0.3px", fontWeight: "500" }],
        "body-lg": ["18px", { lineHeight: "1.56", fontWeight: "500" }],
        "body-md": ["16px", { lineHeight: "1.5", fontWeight: "400" }],
        "body-strong": ["16px", { lineHeight: "1.5", fontWeight: "600" }],
        caption: ["14px", { lineHeight: "1.49", letterSpacing: "0.28px", fontWeight: "500" }],
        micro: ["13px", { lineHeight: "1.5", letterSpacing: "-0.13px", fontWeight: "500" }],
        "eyebrow-cap": ["12px", { lineHeight: "1.2", letterSpacing: "0.72px", fontWeight: "500" }],
      },
      boxShadow: {
        "shopify-card": "0 1px 3px rgba(0,0,0,0.06), 0 1px 2px rgba(0,0,0,0.04)",
        "shopify-hover": "0 8px 30px rgba(0,0,0,0.08)",
        "shopify-glow": "0 0 40px rgba(193, 251, 212, 0.25)",
=======
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
>>>>>>> 7ee9ca6f04322930ec29228c493ddb72ee250ce5
      },
    },
  },
  plugins: [],
};

export default config;
