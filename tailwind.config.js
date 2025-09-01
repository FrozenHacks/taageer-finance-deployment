/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
    "./pages/**/*.{ts,tsx}",
    "./components/**/*.{ts,tsx}",
    "./app/**/*.{ts,tsx}",
  ],
  theme: {
    extend: {
      fontFamily: {
        montserrat: ['"Montserrat"', "sans-serif"],
      },
      boxShadow: {
        "language-button":
          "inset 0 2px 1px #FFFFFF38, inset 0 -2px 0.3px #0E387D2E, 0 2px 5px #1458C92B",
      },
      backgroundImage: {
        "gradient-button": "linear-gradient(to bottom, #067CAC, #09347A)",
        "gradient-button-selected":
          "linear-gradient(to bottom, #FFFFFF, #CCCCCC)",
      },
    },
  },
  plugins: [],
};
