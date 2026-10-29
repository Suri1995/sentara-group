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
          50: "#f1f6f3",
          100: "#dcebe2",
          200: "#b9d5c3",
          300: "#8ebaa0",
          400: "#5f9678",
          500: "#3f775b",
          600: "#315f49",
          700: "#274c3b",
          800: "#1d3b2e",
          900: "#142b21",
          DEFAULT: "#315f49",
        },

        sand: {
          50: "#f8f7f3",
          100: "#efeee9",
          200: "#e4e2da",
          300: "#d5d1c6",
        },

        brass: {
          50: "#fbf7ed",
          100: "#f1e5c8",
          300: "#c8a96b",
          500: "#a98245",
          700: "#765a2f",
          DEFAULT: "#a98245",
        },

        ink: "#151a1b",
      },

      fontFamily: {
        display: ["var(--font-jakarta)", "sans-serif"],
        sans: ["var(--font-jakarta)", "sans-serif"],
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
          "linear-gradient(180deg, rgba(7,18,40,0.15) 0%, rgba(7,18,40,0.15) 55%, rgba(7,18,40,0.10) 100%)",
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
