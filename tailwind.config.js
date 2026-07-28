/** @type {import('tailwindcss').Config} */

export default {
  darkMode: "class",
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    container: {
      center: true,
      padding: {
        DEFAULT: "1rem",
        sm: "1.25rem",
        lg: "2rem",
        xl: "2.5rem",
      },
      screens: {
        "2xl": "1360px",
      },
    },
    extend: {
      colors: {
        ink: {
          base: "#0E0E10",
          canvas: "#121212",
          surface: "#1A1A1D",
          smoke: "#1E1E22",
          divider: "rgba(255,255,255,0.07)",
        },
        accent: {
          DEFAULT: "#D97706",
          burnt: "#D97706",
          gold: "#F4B860",
        },
        text: {
          primary: "#FFFFFF",
          secondary: "#CFCFCF",
          muted: "#8B8B8F",
        },
        success: "#10B981",
        danger: "#EF4444",
      },
      fontFamily: {
        sans: [
          "Inter",
          "SF Pro Display",
          "Manrope",
          "system-ui",
          "-apple-system",
          "sans-serif",
        ],
        display: [
          "Manrope",
          "SF Pro Display",
          "Inter",
          "system-ui",
          "sans-serif",
        ],
      },
      boxShadow: {
        soft: "0 10px 40px -20px rgba(0,0,0,0.55)",
        glow: "0 0 40px -10px rgba(217, 119, 6, 0.35)",
        "glow-gold": "0 0 50px -12px rgba(244, 184, 96, 0.35)",
        card: "0 20px 60px -24px rgba(0,0,0,0.7)",
        lift: "0 30px 80px -30px rgba(0,0,0,0.85)",
      },
      borderRadius: {
        luxury: "20px",
        "3xl": "24px",
        "4xl": "32px",
      },
      backdropBlur: {
        xs: "2px",
      },
      animation: {
        "fade-up": "fadeUp .7s cubic-bezier(.2,.8,.2,1) both",
        shimmer: "shimmer 2.5s linear infinite",
        "pulse-soft": "pulseSoft 3s ease-in-out infinite",
        "float-slow": "floatSlow 7s ease-in-out infinite",
      },
      keyframes: {
        fadeUp: {
          "0%": { opacity: "0", transform: "translateY(14px)" },
          "100%": { opacity: "1", transform: "translateY(0)" },
        },
        shimmer: {
          "0%": { backgroundPosition: "-400px 0" },
          "100%": { backgroundPosition: "400px 0" },
        },
        pulseSoft: {
          "0%, 100%": { opacity: "1" },
          "50%": { opacity: ".7" },
        },
        floatSlow: {
          "0%, 100%": { transform: "translateY(0)" },
          "50%": { transform: "translateY(-6px)" },
        },
      },
    },
  },
  plugins: [],
};
