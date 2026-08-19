/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{js,jsx}'],
  theme: {
    extend: {
      colors: {
        cream: '#F8F5EF',
        oat: '#F1ECE2',
        ink: '#2E2A25',
        smoke: '#6B655E',
        leaf: '#6F7D4E',
        moss: '#55633B',
        wheat: '#D7C8A3',
        line: '#E3DDD2'
      },
      fontFamily: {
        display: ['Playfair Display', 'serif'],
        sans: ['Inter', 'sans-serif']
      },
      boxShadow: {
        soft: '0 18px 45px rgba(46, 42, 37, 0.08)',
        lift: '0 16px 35px rgba(46, 42, 37, 0.12)'
      }
    }
  },
  plugins: []
}
