/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{js,ts,jsx,tsx}'],
  theme: {
    extend: {
      colors: {
        leather: {
          900: '#1c130b',
          800: '#241810',
          700: '#2e1f13',
          600: '#3a2818',
          500: '#4a3420',
          400: '#5e4427',
        },
        page: {
          50: '#f7efdc',
          100: '#f0e6d0',
          200: '#e6dabf',
          300: '#d8c9a6',
          400: '#c2b187',
          edge: '#cdbb94',
        },
        sepia: {
          800: '#3d2b1a',
          700: '#4d3724',
          600: '#5f4730',
          500: '#7a5c3e',
          400: '#9a7b53',
        },
        brass: {
          600: '#7c6433',
          500: '#9a7b3f',
          400: '#b89a52',
          300: '#d4b870',
        },
        photo: {
          50: '#d8d2c2',
          100: '#c4bda9',
          200: '#b0a890',
          300: '#968d76',
          400: '#7a7259',
        },
        ink: '#2a1f12',
        gold: '#c9a84c',
        wax: '#6b1f1c',
      },
      fontFamily: {
        fell: ['"IM Fell English"', 'serif'],
        fellsc: ['"IM Fell English SC"', 'serif'],
        elite: ['"Special Elite"', 'monospace'],
        oldstandard: ['"Old Standard TT"', 'serif'],
        playfair: ['"Playfair Display"', 'serif'],
      },
    },
  },
  plugins: [],
};
