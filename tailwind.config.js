/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
      backgroundImage: {
        "animation-gif":
          "url('https://utfs.io/f/686da3e2-cb87-452f-ac83-64b59003233f-opdnxw.gif')",
      },
      fontFamily: {
        sans: ["Satoshi", "sans-serif"],
      },
      animation: {
        "fade-in": "fade-in 1s ease-out",
        "invert-colors": "invert-colors 1s ease-out",
        "fade-in-out": "fade-in-out 3s ease-in-out infinite",
        swipe: "swipe 2s ease-in-out infinite",
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
        "fade-in-out": {
          "0%": { opacity: "0" },
          "50%": { opacity: "100" },
          "100%": { opacity: "0" },
        },
        swipe: {
          "0%": { transform: "translateY(100%)", opacity: "0" },
          "10%": { transform: "translateY(50%)", opacity: "100" },
          "90%": { transform: "translateY(50%)", opacity: "100" },
          "100%": { transform: "translateY(0%)", opacity: "0" },
        },
      },
    },
  },
  plugins: [],
};
