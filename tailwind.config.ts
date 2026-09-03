import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
    "./lib/**/*.{js,ts,jsx,tsx,mdx}",
  ],

  theme: {
    extend: {
      colors: {
        navy: {
          50: "#eef1f7",
          100: "#d6ddec",
          200: "#adbad9",
          300: "#7e93bf",
          400: "#4d699f",
          500: "#2c4879",
          600: "#1a3260",
          700: "#12244a",
          800: "#0b1a38",
          900: "#071228",
          950: "#040d1c",
          DEFAULT: "#0b2452",
        },

        green: {
          50: "#eafaf1",
          100: "#cdf2dd",
          200: "#9be5bd",
          300: "#61d097",
          400: "#31b674",
          500: "#158a44",
          600: "#0f7a3c",
          700: "#0c6032",
          800: "#0a4c29",
          900: "#083e22",
          DEFAULT: "#0f7a3c",
        },

        sand: {
          50: "#fbf9f4",
          100: "#f6f2e7",
          200: "#efe8d4",
          300: "#e2d6b5",
        },

        ink: "#12161c",
      },

      fontFamily: {
        display: ["var(--font-display)", "serif"],
        sans: ["var(--font-sans)", "sans-serif"],
      },

      maxWidth: {
        "8xl": "1400px",
      },

      boxShadow: {
        premium: "0 20px 60px -15px rgba(11,36,82,0.25)",
        card: "0 10px 40px -10px rgba(11,36,82,0.18)",
        floating: "0 25px 70px -20px rgba(11,36,82,0.28)",
        soft: "0 4px 20px -5px rgba(11,36,82,0.10)",
      },

      backgroundImage: {
        "navy-gradient":
          "linear-gradient(135deg, #0b2452 0%, #12305e 45%, #0a4c29 130%)",

        "hero-scrim":
          "linear-gradient(180deg, rgba(7,18,40,0.15) 0%, rgba(7,18,40,0.55) 55%, rgba(7,18,40,0.9) 100%)",
      },

      keyframes: {
        fadeUp: {
          "0%": {
            opacity: "0",
            transform: "translateY(24px)",
          },
          "100%": {
            opacity: "1",
            transform: "translateY(0)",
          },
        },

        marquee: {
          "0%": {
            transform: "translateX(0)",
          },
          "100%": {
            transform: "translateX(-50%)",
          },
        },
      },

      animation: {
        fadeUp:
          "fadeUp 0.8s cubic-bezier(0.16, 1, 0.3, 1) forwards",

        marquee: "marquee 32s linear infinite",
      },
    },
  },

  plugins: [],
};

export default config;