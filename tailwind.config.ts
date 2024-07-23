/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./app/**/*.{ts,tsx}",
    "./src/**/*.{ts,tsx}"
  ],
  theme: {
    extend: {
      colors: {
        gotBlack: '#1b1b1b',
        gotGold: '#d4af37',
        gotRed: '#8b0000',
        gotGray: '#2f2f2f',
      },
      fontFamily: {
        got: ['"Cinzel"', 'serif'],
      },
    },
  },
  plugins: [
    require('@tailwindcss/typography'),
  ],
}
