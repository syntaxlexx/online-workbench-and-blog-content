/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
      "./index.html",
      "./src/**/*.{js,ts,jsx,tsx}"
  ],
  theme: {
    extend: {
        fontFamily: {
            twitch: [
                'Inter',
                'Roobert',
                'Helvetica Neue',
                'Arial',
                'sans-serif'
            ]
        }
    },
  },
  plugins: [],
}
