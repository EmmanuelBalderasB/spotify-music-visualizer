/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
      backgroundImage: {
        "animation-gif": "url('../assets/images/animation.gif')",
      },
    },
  },
  plugins: [],
};
