/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
      colors: {
        bg:        "#120a05",
        gold:      "#c9a455",
        goldLight: "#e8c97a",
        cream:     "#f0e6d0",
        bronze:    "#8b6332",
        muted:     "#a08060",
      },
      fontFamily: {
        cinzel:   ["Cinzel", "serif"],
        playfair: ["Playfair Display", "serif"],
        jost:     ["Jost", "sans-serif"],
        seasons:  ["'The Seasons'", "serif"],
      },
    },
  },
  plugins: [],
};
