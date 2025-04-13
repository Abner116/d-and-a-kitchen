/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
      colors: {
        primary: "#f97316", // orange-500
        secondary: "#ea580c", // orange-600
      },
    },
  },
  plugins: [],
};
