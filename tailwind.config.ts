import defaultTheme from "tailwindcss/defaultTheme";

/** @type {import('tailwindcss').Config} */
export default {
  darkMode: "class",
  content: ["./index.html", "./src/**/*.{ts,tsx}"],
  theme: {
    // Mobile-first: xs ≥450, sm ≥640, md ≥768, lg ≥1024, xl ≥1280, 2xl ≥1536
    screens: {
      xs: "450px",
      ...defaultTheme.screens,
    },
    extend: {
      fontFamily: {
        // Body text
        sans: ['"Plus Jakarta Sans"', ...defaultTheme.fontFamily.sans],
        // Headings, names, big numbers
        display: ["Sora", ...defaultTheme.fontFamily.sans],
        // Small technical labels: eyebrows, dates, indexes
        mono: ['"JetBrains Mono"', ...defaultTheme.fontFamily.mono],
      },
      colors: {
        primary: "#050816",
        secondary: "#aaa6c3",
        tertiary: "#1d1836",
        common_voilet_color: "#915EFF",
        text2: "#626970",
        text3: "#575C66",
      },
      animation: {
        text: "text 5s ease infinite",
        // CSS (not JS) so it plays on time even while the 3D model is parsing
        "fade-up": "fade-up 0.6s ease-out 0.3s both",
      },
      keyframes: {
        "fade-up": {
          from: { opacity: "0", transform: "translateY(8px)" },
          to: { opacity: "1", transform: "translateY(0)" },
        },
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
