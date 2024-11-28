/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./view/**/*.{html, ejs, js}",
    "./public/**/*.{html, js}",
    "./node_modules/flowbite/**/*.js"
  ],
  theme: {
    extend: {},
  },
  plugins: [
    require('flowbite/plugin')
  ],
}

