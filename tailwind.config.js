/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./src/**/*.{html,ts}",
  ],
  theme: {
    extend: {
      backgroundImage: {
        'custom-pattern': "url('/assets/homepage.jpg')",
      },
    },
  },
  plugins: [],
}

