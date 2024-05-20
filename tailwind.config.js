/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
      backgroundImage: {
        "animation-gif": "url('./public/David.gif')",
      },
      fontFamily: {
        sans: ["Satoshi", "sans-serif"],
      },
      animation: {
        "fade-in": "fade-in 1s ease-out",
        "invert-colors": "invert-colors 1s ease-out",
      },
      keyframes: {
        "fade-in": {
          "0%": { opacity: "0" },
          "100%": { opacity: "100" },
        },
        "invert-colors": {
          "0%": { backgroundColor: "bg-black", color: "text-yellow-100" },
          "100%": { backgroundColor: "bg-yellow-100", color: "text-black" },
        },
      },
    },
  },
  plugins: [],
};
