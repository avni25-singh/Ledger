/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{js,jsx}'],
  theme: {
    extend: {
      colors: {
        ink: {
          950: '#080B0F',
          900: '#0B0F14',
          800: '#131A22',
          700: '#1B2530',
          600: '#28333F',
        },
        mist: {
          400: '#5C6B79',
          300: '#7C8B9A',
          200: '#AAB8C4',
          100: '#E8EDF2',
        },
        amber: {
          500: '#FFB454',
          400: '#FFC876',
          300: '#FFDDA6',
        },
        teal: {
          500: '#3FD6C0',
          400: '#67E2D1',
        },
        rose: {
          500: '#FF6B6B',
          400: '#FF8A8A',
        },
      },
      fontFamily: {
        display: ['"Space Grotesk"', 'sans-serif'],
        mono: ['"IBM Plex Mono"', 'monospace'],
        body: ['Inter', 'sans-serif'],
      },
      backgroundImage: {
        'grid-fade': 'linear-gradient(180deg, rgba(255,180,84,0.06) 0%, rgba(255,180,84,0) 60%)',
      },
      keyframes: {
        ticker: {
          '0%': { transform: 'translateX(0%)' },
          '100%': { transform: 'translateX(-50%)' },
        },
        pulseDot: {
          '0%, 100%': { opacity: 1 },
          '50%': { opacity: 0.35 },
        },
      },
      animation: {
        ticker: 'ticker 40s linear infinite',
        pulseDot: 'pulseDot 1.6s ease-in-out infinite',
      },
    },
  },
  plugins: [],
}
