const defaultTheme = require('tailwindcss/defaultTheme')

module.exports = {
  content: [
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        primary: {
          50: '#FFF5F5',
          100: '#FFE6E6',
          200: '#FFB3B3',
          300: '#FF8080',
          400: '#FF4D4D',
          500: '#FF1A1A',
          600: '#CC0000',
          700: '#990000',
          800: '#660000',
          900: '#330000',
        },
        cream: '#FDF5F3',  // New soft pink-tinted cream color
        brown: {
          light: '#D4B499',
          DEFAULT: '#A47551',
          dark: '#744924',
        },
        rosegold: '#B76E79',
      },
      fontFamily: {
        sans: ['Inter var', ...defaultTheme.fontFamily.sans],
        serif: ['Playfair Display', ...defaultTheme.fontFamily.serif],
      },
    },
  },
  plugins: [],
}
