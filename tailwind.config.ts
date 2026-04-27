import type { Config } from "tailwindcss";

export default {
  darkMode: ["class"],
  content: [
    "./src/pages/**/*.{ts,tsx}",
    "./src/components/**/*.{ts,tsx}",
    "./src/app/**/*.{ts,tsx}"
  ],
  theme: {
    extend: {
      colors: {
        royalBlue: "#0A1F44",
        olive: "#556B2F",
        gold: "#D4AF37",
        bgPrimary: "#070B14",
        cardPrimary: "#0E1629",
        textPrimary: "#F5F7FF",
        textMuted: "#B5C0D0"
      },
      boxShadow: {
        luxe: "0 10px 30px rgba(10,31,68,0.45)"
      }
    }
  },
  plugins: []
} satisfies Config;
