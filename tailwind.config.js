/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        'primary': '#086FA4',
        'bg_promary':'#111827',
        'bg_secoundary':'#D1D5DB'
      },
      fontFamily: {
        'nunito': ['Nunito', 'sans-serif']
      },
      maxWidth: {
        'container': '1400px',
      }
    },
  },
  plugins: [],
}

