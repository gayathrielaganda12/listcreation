
/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./src/**/*.{js,jsx,ts,tsx}",
  ],
  theme: {
    extend: {
      fontFamily: {
        'frank-ruhl-libre': ['Frank Ruhl Libre', 'serif'],
        'montserrat': ['Montserrat', 'sans-serif'],
        'roboto': ['Roboto', 'sans-serif'],
        'roboto-flex': ['Roboto Flex', 'sans-serif'],
      },
    },
  },
  plugins: [],
}