const palette = require("./src/core/theme/palette");

/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./App.tsx", "./components/**/*.{js,jsx,ts,tsx}", "./src/**/*.{js,jsx,ts,tsx}"],
  presets: [require("nativewind/preset")],
  theme: {
    extend: {
      colors: {
        background: palette.background,
        surface: palette.surface,
        primary: palette.primary,
        secondary: palette.secondary,
        accent: palette.accent,
        "orange-dark": palette.orangeDark,
        "orange-mid": palette.orangeMid,
        "orange-light": palette.orangeLight,
        "glass-border": palette.glassBorder,
        "glass-bg": palette.glassBg,
      },
    },
  },
  plugins: [],
}

