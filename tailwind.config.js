/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
   mode: "jit",
  theme: {
    screens: {
      'sm': {'min': '320px', 'max': '640px'}, // Small screens, such as mobile
      'md': {'min': '641px', 'max': '1024px'}, // Large screens, such as laptops
      'lg': '1025px',
    },
    extend: {
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
}

