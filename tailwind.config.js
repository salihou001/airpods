/** @type {import('tailwindcss').Config} */
module.exports = {
  darkMode: "class",
  content: ["./src/**/*.{html,ts}"],
  theme: {
    extend: {
      colors: {
        primary: "#cf2e87",
        blackgray: "#1F2937",
      },
    },
  },
  plugins: []
};
