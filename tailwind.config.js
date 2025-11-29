/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./App.tsx", "./components/**/*.{js,jsx,ts,tsx}", "./src/**/*.{js,jsx,ts,tsx}"],
  presets: [require("nativewind/preset")],
  theme: {
    extend: {
      colors: {
        background: "#0a0a0a",
        surface: "#1a1a1a",
        primary: "#809FFF", // Azul principal
        secondary: "#06b6d4", // cyan-500
        accent: "#f472b6", // pink-400
        "orange-dark": "#C2410C",
        "orange-mid": "#EA580C",
        "orange-light": "#FB923C",
        "glass-border": "rgba(255, 255, 255, 0.1)",
        "glass-bg": "rgba(255, 255, 255, 0.05)",
      },
    },
  },
  plugins: [],
}

