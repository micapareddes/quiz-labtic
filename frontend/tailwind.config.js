/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./src/**/*.{html,js}"],
  theme: {
    extend: {
      backgroundImage: {
        'geometrical': "url('../img/bg.svg')"
      },
      width: {
        '1/100': '1%',
      },
    }
  },
  plugins: [],
}