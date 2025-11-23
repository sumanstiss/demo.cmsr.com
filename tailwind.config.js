/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        primary: '#0C4A8C',
        secondary: '#FFBF00',
      },
    },
  },
  plugins: [],
}

