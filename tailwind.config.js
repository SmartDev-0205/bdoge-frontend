/** @type {import('tailwindcss').Config} */

module.exports = {
  content: [
    "./src/**/*.{js,jsx,ts,tsx}",
  ],
  theme: {
    extend: {

      backgroundImage: {
        'background-image': "url('background.jpg')"
      }
    },
    fontFamily: {
      'space-grotesk': ['Space Grotesk', 'sans-serif'],
    },
  },
  plugins: [],
}

