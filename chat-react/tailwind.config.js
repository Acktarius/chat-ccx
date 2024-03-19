/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {},
    colors: {
      transparent: 'transparent',
      current: 'currentColor',
      'white': {
        100: '#FFF'
      },
      'jaune': {
        400: '#FFA500'
      },
      'orange': {
        500: '#aa5500'
      },
      'grey': {
        600: '#808080',
        700: '#343a40',
        900: '#181a20'
      },
      'black': {
        900: '#000'
      }
    }
  },
  plugins: [],
}