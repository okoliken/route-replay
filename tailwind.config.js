/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./index.html",
    "./src/**/*.{vue,js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors:{
        textSoftGrey:'#B9BCC8',
        textDark:'#000005',
        textDarkGrey:'#667085',
        shuttlersDark:'#09090F',
        shuttlersGrey:'#E0E6ED',
        shuttlersPurple:'#4848ED',
        shuttlersGreen:'#058344',
      }
    },
  },
  plugins: [],
}

