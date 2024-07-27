/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      fontFamily:{
        Ubuntu: ['Ubuntu'],
        'playwrite': ['"Playwrite DK Uloopet"', 'sans-serif'],
        'josefin': ["Josefin Sans", "sans-serif"]
      
      }
    },
  },
  plugins: [],
}