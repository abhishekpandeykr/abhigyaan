/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ['./src/**/*.{html,js,svelte,ts}'], // or appropriate path for your project
  theme: {
    extend: {
      fontFamily: {
        tuffy: ['tuffy', 'sans-serif'],
      },
    },
  },
  plugins: [],
};
