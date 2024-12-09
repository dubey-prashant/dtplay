/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ['./views/**/*.{html,ejs}'],
  theme: {
    extend: {},
  },
  plugins: [],
};
// npx tailwindcss -i ./input.css -o ./public/index.css --watch
