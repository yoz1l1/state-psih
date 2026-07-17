/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{js,ts,jsx,tsx}'],
  theme: {
    extend: {
      colors: {
        paper: {
          50: '#fbf6e9',
          100: '#f4ecd8',
          200: '#ece0c0',
          300: '#dccca0',
          400: '#c9b585',
          500: '#a8915f',
          600: '#7a6440',
          700: '#4d3d24',
          800: '#2e2415',
          900: '#1a140b',
        },
        ink: {
          50: '#f3eee2',
          100: '#e2dccb',
          200: '#c4b89e',
          300: '#8c7d5a',
          400: '#5a4d31',
          500: '#3a3015',
          600: '#2a2310',
          700: '#1d180b',
          800: '#120f06',
          900: '#0a0804',
        },
        rust: '#7a2e1d',
        sepia: '#6b4423',
      },
      fontFamily: {
        blackletter: ['UnifrakturMaguntia', 'serif'],
        fell: ['"IM Fell English"', 'serif'],
        fellsc: ['"IM Fell English SC"', 'serif'],
        playfair: ['"Playfair Display"', 'serif'],
        oldstandard: ['"Old Standard TT"', 'serif'],
      },
    },
  },
  plugins: [],
};
