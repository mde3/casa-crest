/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    fontFamily: {
      DMSans: ['DM Sans', 'sans-serif'],
    },
    extend: {
      colors: {
        'myblue': '#0025ba',
      },
    },
  },
  plugins: [],
}
