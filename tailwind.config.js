/** @type {import('tailwindcss').Config} */
export default {
  darkMode: "class",
  mode: "dark",
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    screens: {
      sm: { min: "320px", max: "640px" },
      md: { min: "641px", max: "1024px" },
      lg: "1025px",
      xs: "450px",
    },
    extend: {
      colors: {
        primary: "#050816",
        secondary: "#aaa6c3",
        tertiary: "#151030",
        "black-100": "#100d25",
        "black-200": "#090325",
        "white-100": "#f3f3f3",
        primary1: "#854CE6",
        background1: "#222A35",
        button: "#854CE6",
        background2: "#19212C",
        text: "#C8CFD8",
        text1: "#F2F5F7",
        text2: "#626970",
        text3: "#575C66",
        footerBackground: "#00012B",
      },
      boxShadow: {
        card: "0px 35px 120px -15px #211e35",
      },
      animation: {
        text: "text 5s ease infinite",
      },
      keyframes: {
        text: {
          "0%, 100%": {
            "background-size": "200% 200%",
            "background-position": "left center",
          },
          "50%": {
            "background-size": "200% 200%",
            "background-position": "right center",
          },
        },
      },
    },
  },
  plugins: [],
};
