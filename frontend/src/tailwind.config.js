/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./src/**/*.{js,jsx,ts,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        navy: {
          dark: '#020617',
        },
        safety: {
          blue: '#2563eb',
        }
      },
    },
  },
  plugins: [],
}