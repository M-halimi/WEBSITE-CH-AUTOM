import * as React from "react";

interface PlatformIconProps {
  slug?: string;
  name?: string;
  className?: string;
  size?: "xs" | "sm" | "md" | "lg";
  withBadge?: boolean;
}

export function PlatformIcon({
  slug = "",
  name = "",
  className = "",
  size = "sm",
  withBadge = true,
}: PlatformIconProps) {
  const normalized = (slug || name || "").toLowerCase().trim().replace(/\s+/g, "-");

  // Determine size classes
  const sizeMap = {
    xs: { box: "h-5 w-5", icon: "h-3 w-3", text: "text-[9px]" },
    sm: { box: "h-7 w-7", icon: "h-4 w-4", text: "text-[11px]" },
    md: { box: "h-8 w-8", icon: "h-4.5 w-4.5", text: "text-xs" },
    lg: { box: "h-10 w-10", icon: "h-5 w-5", text: "text-sm" },
  };

  const currentSize = sizeMap[size] || sizeMap.sm;

  // Real SVG Logos for 40+ Major Automation Engines & AI Platforms
  const renderSvg = () => {
    // 1. WhatsApp
    if (normalized.includes("whatsapp")) {
      return (
        <svg viewBox="0 0 24 24" fill="none" className={currentSize.icon} aria-label="WhatsApp">
          <path
            fill="#25D366"
            d="M12.04 2C6.58 2 2.13 6.45 2.13 11.91C2.13 13.66 2.59 15.36 3.45 16.86L2.05 22L7.3 20.62C8.75 21.41 10.38 21.83 12.04 21.83C17.5 21.83 21.95 17.38 21.95 11.92C21.95 6.46 17.5 2 12.04 2Z"
          />
          <path
            fill="#FFFFFF"
            d="M17.5 14.33C17.2 14.18 15.73 13.45 15.45 13.35C15.18 13.25 14.98 13.2 14.78 13.5C14.58 13.8 14.01 14.47 13.84 14.67C13.66 14.87 13.49 14.89 13.19 14.74C12.89 14.59 11.92 14.28 10.78 13.26C9.89 12.47 9.29 11.49 9.12 11.19C8.94 10.89 9.1 10.73 9.25 10.58C9.39 10.45 9.55 10.23 9.7 10.06C9.85 9.88 9.9 9.76 10 9.56C10.1 9.36 10.05 9.18 9.98 9.03C9.9 8.88 9.3 7.42 9.06 6.82C8.81 6.24 8.57 6.32 8.39 6.31C8.22 6.3 8.02 6.3 7.82 6.3C7.62 6.3 7.3 6.38 7.03 6.67C6.75 6.97 6 7.67 6 9.12C6 10.57 7.05 11.97 7.2 12.17C7.35 12.37 9.27 15.33 12.22 16.6C12.92 16.9 13.47 17.09 13.9 17.22C14.61 17.45 15.25 17.42 15.76 17.34C16.33 17.25 17.51 16.62 17.76 15.92C18 15.22 18 14.62 17.93 14.49C17.85 14.37 17.7 14.33 17.5 14.33Z"
          />
        </svg>
      );
    }

    // 2. n8n
    if (normalized.includes("n8n")) {
      return (
        <svg viewBox="0 0 24 24" fill="none" className={currentSize.icon} aria-label="n8n">
          <rect width="24" height="24" rx="5" fill="#FF6D5A" />
          <path
            fill="#FFFFFF"
            d="M6 14.5C6 13.12 7.12 12 8.5 12C9.88 12 11 13.12 11 14.5C11 15.88 9.88 17 8.5 17C7.12 17 6 15.88 6 14.5ZM13 9.5C13 8.12 14.12 7 15.5 7C16.88 7 18 8.12 18 9.5C18 10.88 16.88 12 15.5 12C14.12 12 13 10.88 13 9.5ZM10.5 13.5L13.5 10.5"
            stroke="#FFFFFF"
            strokeWidth="1.5"
            strokeLinecap="round"
          />
        </svg>
      );
    }

    // 3. Make.com
    if (normalized.includes("make")) {
      return (
        <svg viewBox="0 0 24 24" fill="none" className={currentSize.icon} aria-label="Make.com">
          <rect width="24" height="24" rx="5" fill="#6D28D9" />
          <path d="M5.5 16.5L10 8L14.5 16.5H5.5Z" fill="#A855F7" />
          <path d="M13.5 8L18.5 16.5H15.5L12 10.5L13.5 8Z" fill="#FFFFFF" />
        </svg>
      );
    }

    // 4. OpenAI / GPT-4o
    if (normalized.includes("openai") || normalized.includes("gpt")) {
      return (
        <svg viewBox="0 0 24 24" fill="none" className={currentSize.icon} aria-label="OpenAI">
          <rect width="24" height="24" rx="5" fill="#10A37F" />
          <path
            fill="#FFFFFF"
            d="M18.6 10.6c-.2-.9-.8-1.7-1.6-2.1-.5-.3-1.1-.4-1.7-.4v-.8c0-.9-.5-1.8-1.3-2.3-.9-.5-2-.5-2.9 0l-.8.5c-.4-.5-1-.9-1.6-1.1-.9-.3-1.9-.1-2.6.5-.8.6-1.2 1.5-1.2 2.5v.7c-.5.2-1 .5-1.4.9-.8.9-1 2.1-.6 3.2-.2.5-.2 1.1 0 1.6.2.9.8 1.7 1.6 2.1.5.3 1.1.4 1.7.4v.8c0 .9.5 1.8 1.3 2.3.9.5 2 .5 2.9 0l.8-.5c.4.5 1 .9 1.6 1.1.9.3 1.9.1 2.6-.5.8-.6 1.2-1.5 1.2-2.5v-.7c.5-.2 1-.5 1.4-.9.8-.9 1-2.1.6-3.2.3-.6.3-1.2.1-1.7zm-6.6 6.3l-2.1-1.2v-2.4l2.1 1.2v2.4zm-1.1-4.2l-2.1-1.2 2.1-1.2 2.1 1.2-2.1 1.2zm3.2 1.8l-2.1-1.2v-2.4l2.1 1.2v2.4zm-1.1-4.2l-2.1-1.2 2.1-1.2 2.1 1.2-2.1 1.2z"
          />
        </svg>
      );
    }

    // 5. Claude / Anthropic
    if (normalized.includes("claude") || normalized.includes("anthropic")) {
      return (
        <svg viewBox="0 0 24 24" fill="none" className={currentSize.icon} aria-label="Claude">
          <rect width="24" height="24" rx="5" fill="#D97706" />
          <path
            fill="#FFFFFF"
            d="M12 4.5L14.2 9.8L19.5 12L14.2 14.2L12 19.5L9.8 14.2L4.5 12L9.8 9.8L12 4.5Z"
          />
        </svg>
      );
    }

    // 6. DeepSeek
    if (normalized.includes("deepseek")) {
      return (
        <svg viewBox="0 0 24 24" fill="none" className={currentSize.icon} aria-label="DeepSeek">
          <rect width="24" height="24" rx="5" fill="#0284C7" />
          <path
            fill="#FFFFFF"
            d="M6 12C6 8.69 8.69 6 12 6C15.31 6 18 8.69 18 12C18 15.31 15.31 18 12 18H6V12ZM12 8C9.79 8 8 9.79 8 12C8 14.21 9.79 16 12 16C14.21 16 16 14.21 16 12C16 9.79 14.21 8 12 8Z"
          />
        </svg>
      );
    }

    // 7. Google Gemini
    if (normalized.includes("gemini")) {
      return (
        <svg viewBox="0 0 24 24" fill="none" className={currentSize.icon} aria-label="Google Gemini">
          <rect width="24" height="24" rx="5" fill="#1A73E8" />
          <path
            fill="#FFFFFF"
            d="M12 3C12 7.97 7.97 12 3 12C7.97 12 12 16.03 12 21C12 16.03 16.03 12 21 12C16.03 12 12 7.97 12 3Z"
          />
        </svg>
      );
    }

    // 8. Shopify
    if (normalized.includes("shopify")) {
      return (
        <svg viewBox="0 0 24 24" fill="none" className={currentSize.icon} aria-label="Shopify">
          <rect width="24" height="24" rx="5" fill="#008060" />
          <path
            fill="#FFFFFF"
            d="M16.5 5.5l-1.5-.5c-.2-.1-.5 0-.6.2l-.7 1.6c-.1.3-.4.5-.7.5h-.1c-.3 0-.6-.2-.7-.5l-.7-1.6c-.1-.2-.4-.3-.6-.2l-1.5.5c-.3.1-.4.4-.3.7l3 11.5c.1.3.4.5.7.5s.6-.2.7-.5l3-11.5c.1-.3 0-.6-.3-.7z"
          />
          <path
            fill="#95BF47"
            d="M12.5 10c-1.4 0-2.5.8-2.5 1.8 0 1.9 2.8 1.6 2.8 2.8 0 .4-.4.7-1 .7-.8 0-1.5-.4-1.8-.8l-.8 1c.5.7 1.5 1.2 2.6 1.2 1.6 0 2.7-.8 2.7-2 0-2.1-2.8-1.7-2.8-2.8 0-.4.3-.6.8-.6.6 0 1.2.3 1.5.6l.8-1c-.5-.6-1.3-.9-2.2-.9z"
          />
        </svg>
      );
    }

    // 9. WooCommerce
    if (normalized.includes("woo") || normalized.includes("woocommerce")) {
      return (
        <svg viewBox="0 0 24 24" fill="none" className={currentSize.icon} aria-label="WooCommerce">
          <rect width="24" height="24" rx="5" fill="#96588A" />
          <path
            fill="#FFFFFF"
            d="M5 8H19C19 14 16 17 12 17C8 17 5 14 5 8ZM8 10C7.4 10 7 10.4 7 11C7 11.6 7.4 12 8 12C8.6 12 9 11.6 9 11C9 10.4 8.6 10 8 10ZM16 10C15.4 10 15 10.4 15 11C15 11.6 15.4 12 16 12C16.6 12 17 11.6 17 11C17 10.4 16.6 10 16 10Z"
          />
        </svg>
      );
    }

    // 10. YouCan
    if (normalized.includes("youcan")) {
      return (
        <svg viewBox="0 0 24 24" fill="none" className={currentSize.icon} aria-label="YouCan">
          <rect width="24" height="24" rx="5" fill="#0052FF" />
          <path
            fill="#FFFFFF"
            d="M7 6L12 13L17 6H14.5L12 9.8L9.5 6H7ZM11 13V18H13V13H11Z"
          />
        </svg>
      );
    }

    // 11. Google Sheets
    if (normalized.includes("sheets") || normalized.includes("google-sheet")) {
      return (
        <svg viewBox="0 0 24 24" fill="none" className={currentSize.icon} aria-label="Google Sheets">
          <rect width="24" height="24" rx="5" fill="#0F9D58" />
          <path fill="#FFFFFF" d="M7 5H14L17 8V19H7V5Z" />
          <path fill="#0F9D58" d="M9 11H15V12.5H9V11ZM9 14H15V15.5H9V14ZM9 17H13V18H9V17Z" />
          <path fill="#57CA85" d="M14 5V8H17L14 5Z" />
        </svg>
      );
    }

    // 12. Notion
    if (normalized.includes("notion")) {
      return (
        <svg viewBox="0 0 24 24" fill="none" className={currentSize.icon} aria-label="Notion">
          <rect width="24" height="24" rx="5" fill="#000000" />
          <path fill="#FFFFFF" d="M6.5 6.5L9 6.2L15.5 15.5V6.5H17.5V17.5L15 17.8L8.5 8.5V17.5H6.5V6.5Z" />
        </svg>
      );
    }

    // 13. Airtable
    if (normalized.includes("airtable")) {
      return (
        <svg viewBox="0 0 24 24" fill="none" className={currentSize.icon} aria-label="Airtable">
          <rect width="24" height="24" rx="5" fill="#FCB400" />
          <path fill="#FFFFFF" d="M12 5L4 9.5L12 14L20 9.5L12 5ZM4 11.5L12 16V19.5L4 15V11.5ZM20 11.5V15L12 19.5V16L20 11.5Z" />
        </svg>
      );
    }

    // 14. Stripe
    if (normalized.includes("stripe")) {
      return (
        <svg viewBox="0 0 24 24" fill="none" className={currentSize.icon} aria-label="Stripe">
          <rect width="24" height="24" rx="5" fill="#635BFF" />
          <path
            fill="#FFFFFF"
            d="M13.8 9.2c0-.7-.6-1.1-1.6-1.1-1.4 0-2.4.6-2.4.6l-.4-1.6s1.2-.6 2.9-.6c2.4 0 3.7 1.2 3.7 3.2v5.3h-2.1v-1.1c-.6.8-1.6 1.3-2.6 1.3-1.8 0-3-.9-3-2.6 0-2 1.7-2.7 3.9-2.7h1.5v-.7zm-1.8 3.8c-1.1 0-1.8.4-1.8 1.3 0 .8.6 1.2 1.4 1.2.9 0 1.8-.7 1.8-1.5v-1h-1.4z"
          />
        </svg>
      );
    }

    // 15. PayPal
    if (normalized.includes("paypal")) {
      return (
        <svg viewBox="0 0 24 24" fill="none" className={currentSize.icon} aria-label="PayPal">
          <rect width="24" height="24" rx="5" fill="#003087" />
          <path
            fill="#0079C1"
            d="M8.5 6H13C15.5 6 17 7.2 16.5 9.5C16 11.8 14 13.5 11.5 13.5H9.5L8.5 19H6L8.5 6Z"
          />
          <path
            fill="#00457C"
            d="M10.5 8H14.5C16.5 8 17.5 9 17 11C16.5 13 14.8 14.5 12.5 14.5H10.8L9.8 20H8L10.5 8Z"
          />
        </svg>
      );
    }

    // 16. Meta Ads / Facebook
    if (normalized.includes("meta") || normalized.includes("facebook")) {
      return (
        <svg viewBox="0 0 24 24" fill="none" className={currentSize.icon} aria-label="Meta">
          <rect width="24" height="24" rx="5" fill="#0081FB" />
          <path
            fill="#FFFFFF"
            d="M16.5 8C15.1 8 13.8 8.8 12.8 10C11.8 8.8 10.5 8 9.1 8C6.8 8 5 9.8 5 12.1C5 14.4 6.8 16.2 9.1 16.2C10.6 16.2 11.9 15.3 12.8 14.1C13.8 15.3 15 16.2 16.5 16.2C18.8 16.2 20.6 14.4 20.6 12.1C20.6 9.8 18.8 8 16.5 8ZM9.1 14.5C7.8 14.5 6.7 13.4 6.7 12.1C6.7 10.8 7.8 9.7 9.1 9.7C10.2 9.7 11.1 10.5 11.7 11.5C11.2 12.8 10.2 14.5 9.1 14.5ZM16.5 14.5C15.4 14.5 14.4 12.8 13.9 11.5C14.5 10.5 15.4 9.7 16.5 9.7C17.8 9.7 18.9 10.8 18.9 12.1C18.9 13.4 17.8 14.5 16.5 14.5Z"
          />
        </svg>
      );
    }

    // 17. Telegram
    if (normalized.includes("telegram")) {
      return (
        <svg viewBox="0 0 24 24" fill="none" className={currentSize.icon} aria-label="Telegram">
          <rect width="24" height="24" rx="5" fill="#229ED9" />
          <path fill="#FFFFFF" d="M17.5 7L5.5 11.6L9.5 13.2L15 9.5L10.8 14.2V17.5L13.2 15.2L16.5 17L17.5 7Z" />
        </svg>
      );
    }

    // 18. Discord
    if (normalized.includes("discord")) {
      return (
        <svg viewBox="0 0 24 24" fill="none" className={currentSize.icon} aria-label="Discord">
          <rect width="24" height="24" rx="5" fill="#5865F2" />
          <path
            fill="#FFFFFF"
            d="M17.5 7C16.3 6.4 15 6 13.7 5.8C13.5 6.1 13.3 6.6 13.1 7C11.7 6.8 10.3 6.8 8.9 7C8.7 6.6 8.5 6.1 8.3 5.8C7 6 5.7 6.4 4.5 7C2.5 10.2 2 13.3 2.2 16.4C3.8 17.6 5.4 18.3 6.9 18.8C7.3 18.2 7.7 17.6 8 16.9C7.4 16.7 6.9 16.4 6.4 16C6.5 15.9 6.7 15.8 6.8 15.7C9.8 17.1 14.2 17.1 17.2 15.7C17.3 15.8 17.5 15.9 17.6 16C17.1 16.4 16.6 16.7 16 16.9C16.3 17.6 16.7 18.2 17.1 18.8C18.6 18.3 20.2 17.6 21.8 16.4C22.1 12.8 21.1 9.8 17.5 7ZM8.5 14C7.7 14 7 13.3 7 12.5C7 11.7 7.7 11 8.5 11C9.3 11 10 11.7 10 12.5C10 13.3 9.3 14 8.5 14ZM15.5 14C14.7 14 14 13.3 14 12.5C14 11.7 14.7 11 15.5 11C16.3 11 17 11.7 17 12.5C17 13.3 16.3 14 15.5 14Z"
          />
        </svg>
      );
    }

    // 19. Slack
    if (normalized.includes("slack")) {
      return (
        <svg viewBox="0 0 24 24" fill="none" className={currentSize.icon} aria-label="Slack">
          <rect width="24" height="24" rx="5" fill="#4A154B" />
          <circle cx="8" cy="9" r="1.5" fill="#36C5F0" />
          <circle cx="15" cy="8" r="1.5" fill="#2EB67D" />
          <circle cx="16" cy="15" r="1.5" fill="#E01E5A" />
          <circle cx="9" cy="16" r="1.5" fill="#ECB22E" />
        </svg>
      );
    }

    // 20. HubSpot
    if (normalized.includes("hubspot")) {
      return (
        <svg viewBox="0 0 24 24" fill="none" className={currentSize.icon} aria-label="HubSpot">
          <rect width="24" height="24" rx="5" fill="#FF7A59" />
          <path
            fill="#FFFFFF"
            d="M15.5 11V8.5C16.1 8.2 16.5 7.7 16.5 7C16.5 6.2 15.8 5.5 15 5.5C14.2 5.5 13.5 6.2 13.5 7C13.5 7.7 13.9 8.2 14.5 8.5V11H12.2C11.9 10.4 11.2 10 10.5 10C9.4 10 8.5 10.9 8.5 12C8.5 13.1 9.4 14 10.5 14C11.2 14 11.9 13.6 12.2 13H14.5V15.5C13.9 15.8 13.5 16.3 13.5 17C13.5 17.8 14.2 18.5 15 18.5C15.8 18.5 16.5 17.8 16.5 17C16.5 16.3 16.1 15.8 15.5 15.5V13C16.9 13 18 11.9 18 10.5C18 9.1 16.9 8 15.5 8V11Z"
          />
        </svg>
      );
    }

    // 21. Zapier
    if (normalized.includes("zapier")) {
      return (
        <svg viewBox="0 0 24 24" fill="none" className={currentSize.icon} aria-label="Zapier">
          <rect width="24" height="24" rx="5" fill="#FF4A00" />
          <path fill="#FFFFFF" d="M13 5L6 14H11L10 19L17 10H12L13 5Z" />
        </svg>
      );
    }

    // 22. Supabase
    if (normalized.includes("supabase")) {
      return (
        <svg viewBox="0 0 24 24" fill="none" className={currentSize.icon} aria-label="Supabase">
          <rect width="24" height="24" rx="5" fill="#1F2937" />
          <path
            fill="#3ECF8E"
            d="M13.5 4.5L5 14.5H12L10.5 19.5L19 9.5H12L13.5 4.5Z"
          />
        </svg>
      );
    }

    // 23. Twilio
    if (normalized.includes("twilio") || normalized.includes("sms")) {
      return (
        <svg viewBox="0 0 24 24" fill="none" className={currentSize.icon} aria-label="Twilio">
          <rect width="24" height="24" rx="5" fill="#F22F46" />
          <circle cx="8" cy="8" r="2" fill="#FFFFFF" />
          <circle cx="16" cy="8" r="2" fill="#FFFFFF" />
          <circle cx="8" cy="16" r="2" fill="#FFFFFF" />
          <circle cx="16" cy="16" r="2" fill="#FFFFFF" />
        </svg>
      );
    }

    // 24. Mailchimp / Klaviyo / Email
    if (normalized.includes("mailchimp") || normalized.includes("klaviyo") || normalized.includes("gmail") || normalized.includes("resend") || normalized.includes("email")) {
      return (
        <svg viewBox="0 0 24 24" fill="none" className={currentSize.icon} aria-label="Email / Newsletter">
          <rect width="24" height="24" rx="5" fill="#EA4335" />
          <path fill="#FFFFFF" d="M5 7L12 12.5L19 7V17H5V7ZM6.5 7H17.5L12 11.3L6.5 7Z" />
        </svg>
      );
    }

    // 25. TikTok / TikTok Ads
    if (normalized.includes("tiktok")) {
      return (
        <svg viewBox="0 0 24 24" fill="none" className={currentSize.icon} aria-label="TikTok">
          <rect width="24" height="24" rx="5" fill="#000000" />
          <path
            fill="#25F4EE"
            d="M13.5 6C14.2 7.2 15.5 8 17 8.2V11C15.6 11 14.4 10.5 13.5 9.7V15C13.5 17.2 11.7 19 9.5 19C7.3 19 5.5 17.2 5.5 15C5.5 12.8 7.3 11 9.5 11V13.5C8.7 13.5 8 14.2 8 15C8 15.8 8.7 16.5 9.5 16.5C10.3 16.5 11 15.8 11 15V6H13.5Z"
          />
          <path
            fill="#FE2C55"
            d="M14 6C14.7 7.2 16 8 17.5 8.2V10.5C16.1 10.5 14.9 10 14 9.2V14.5C14 16.7 12.2 18.5 10 18.5C7.8 18.5 6 16.7 6 14.5C6 12.3 7.8 10.5 10 10.5V13C9.2 13 8.5 13.7 8.5 14.5C8.5 15.3 9.2 16 10 16C10.8 16 11.5 15.3 11.5 14.5V6H14Z"
          />
        </svg>
      );
    }

    // 26. GitHub
    if (normalized.includes("github")) {
      return (
        <svg viewBox="0 0 24 24" fill="none" className={currentSize.icon} aria-label="GitHub">
          <rect width="24" height="24" rx="5" fill="#24292E" />
          <path
            fill="#FFFFFF"
            d="M12 4C7.58 4 4 7.58 4 12C4 15.54 6.29 18.53 9.47 19.59C9.87 19.66 10.02 19.42 10.02 19.21C10.02 19.02 10.01 18.39 10.01 17.72C8 18.09 7.48 17.15 7.32 16.7C7.23 16.47 6.84 15.76 6.5 15.57C6.22 15.42 5.82 15.05 6.49 15.04C7.12 15.03 7.57 15.62 7.72 15.86C8.44 17.07 9.59 16.73 9.98 16.55C10.05 16.03 10.26 15.68 10.49 15.48C8.71 15.28 6.84 14.59 6.84 11.53C6.84 10.66 7.15 9.94 7.66 9.38C7.58 9.18 7.3 8.36 7.74 7.27C7.74 7.27 8.41 7.06 9.94 8.09C10.58 7.91 11.26 7.82 11.94 7.82C12.62 7.82 13.3 7.91 13.94 8.09C15.47 7.05 16.14 7.27 16.14 7.27C16.58 8.36 16.3 9.18 16.22 9.38C16.73 9.94 17.04 10.65 17.04 11.53C17.04 14.6 15.16 15.28 13.38 15.48C13.67 15.73 13.92 16.21 13.92 16.96C13.92 18.04 13.91 18.91 13.91 19.21C13.91 19.42 14.06 19.67 14.46 19.59C17.65 18.53 19.94 15.53 19.94 12C19.94 7.58 16.36 4 12 4Z"
          />
        </svg>
      );
    }

    // 27. PostgreSQL / MySQL / Database
    if (normalized.includes("postgres") || normalized.includes("sql") || normalized.includes("mongo") || normalized.includes("database")) {
      return (
        <svg viewBox="0 0 24 24" fill="none" className={currentSize.icon} aria-label="Database">
          <rect width="24" height="24" rx="5" fill="#336791" />
          <path
            fill="#FFFFFF"
            d="M12 4C7.5 4 6 5.5 6 7V17C6 18.5 7.5 20 12 20C16.5 20 18 18.5 18 17V7C18 5.5 16.5 4 12 4ZM12 6C15.5 6 16 7 16 7C16 7 15.5 8 12 8C8.5 8 8 7 8 7C8 7 8.5 6 12 6ZM16 17C16 17 15.5 18 12 18C8.5 18 8 17 8 17V15.5C9 16 10.5 16.5 12 16.5C13.5 16.5 15 16 16 15.5V17ZM16 13C16 13 15.5 14 12 14C8.5 14 8 13 8 13V11.5C9 12 10.5 12.5 12 12.5C13.5 12.5 15 12 16 11.5V13Z"
          />
        </svg>
      );
    }

    // Generic Fallback Engine Icon (Stylized Monogram)
    return (
      <div
        className={`${currentSize.box} rounded-lg bg-amber-500/15 border border-amber-500/30 text-amber-500 flex items-center justify-center font-bold ${currentSize.text}`}
      >
        {(name || slug || "App").charAt(0).toUpperCase()}
      </div>
    );
  };

  if (!withBadge) {
    return (
      <span className={`inline-flex items-center justify-center ${className}`} title={name || slug}>
        {renderSvg()}
      </span>
    );
  }

  return (
    <div
      className={`relative inline-flex items-center justify-center shrink-0 transition-transform hover:scale-110 ${className}`}
      title={name || slug}
    >
      {renderSvg()}
    </div>
  );
}
