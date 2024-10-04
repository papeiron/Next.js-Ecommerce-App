import type { Config } from 'tailwindcss';

const config = {
  darkMode: ['class'],
  content: [
    './pages/**/*.{ts,tsx}',
    './components/**/*.{ts,tsx}',
    './app/**/*.{ts,tsx}',
    './src/**/*.{ts,tsx}',
    './@/**/*.{ts,tsx}',
  ],
  prefix: '',
  theme: {
    container: {
      center: true,
      padding: '2rem',
      screens: {
        '2xl': '1400px',
      },
    },
    extend: {
      colors: {
        'orange-1': '#f27a1a',
        'dark-blue-1': '#1f1e2c',
        'dark-blue-2': '#2b3e47',
        'blue-custom-1': '#2279a4',
        'blue-custom-2': '#1a5d7f',
        'gray-custom-1': '#353535',
        'gray-custom-2': '#acadaf',
        'gray-custom-3': '#9c9c9c',
        'gray-custom-4': '#f5f5f5',
        'gray-custom-5': '#a3a3a3',
        cream: {
          50: '#FFF4ED',
          100: '#FFE2CC',
          200: '#FECBAA',
          300: '#FDA774',
          400: '#FB773C',
          500: '#F95316',
          600: '#EA390C',
          700: '#C2280C',
          800: '#9A2112',
          900: '#7C1E12',
          950: '#430C07',
        },
      },
      backgroundImage: {
        'custom-orange-gradient-1':
          'linear-gradient(45deg, rgba(237, 113, 13, 1) 0%, rgba(255, 255, 255, 1) 100%)',
        'hero-pattern': "url('/category-blob-bg.png')",
        'statistic-1': 'linear-gradient(to right, #ffa0be , #ff7396 )',
        'statistic-2': 'linear-gradient(to right, #d7acff , #b881ff )',
        'statistic-3': 'linear-gradient(to right, #88e2c0 , #5bc897 )',
      },
      keyframes: {
        'accordion-down': {
          from: { height: '0px', opacity: '0' },
          to: { height: 'var(--radix-accordion-content-height)', opacity: '1' },
        },
        'accordion-up': {
          from: { height: 'var(--radix-accordion-content-height)', opacity: '1' },
          to: { height: '0', opacity: '0' },
        },
        bubble: {
          from: { top: '-200px' },
          to: { top: '0' },
        },
        shake: {
          '0%': { transform: 'translateX(0)', borderColor: '#f87171' },
          '10%': { transform: 'translateX(-1px)', borderColor: '#f87171' },
          '20%': { transform: 'translateX(1px)', borderColor: '#f87171' },
          '30%': { transform: 'translateX(-1px)', borderColor: '##fca5a5' },
          '40%': { transform: 'translateX(1px)', borderColor: '##fca5a5' },
          '50%': { transform: 'translateX(-0.5px)', borderColor: '##fecaca' },
          '60%': { transform: 'translateX(0.5px)', borderColor: '##fecaca' },
          '70%': { transform: 'translateX(-0.5px)', borderColor: '###fee2e2' },
          '80%': { transform: 'translateX(0.5px)', borderColor: '###fee2e2' },
          '90%': { transform: 'translateX(-0.5px)', borderColor: '###fef2f2' },
          '100%': { transform: 'translateX(0)' },
        },
        bounceIn: {
          '0%': { opacity: '0', transform: 'scale3d(.3, .3, .3)' },
          '20%': { transform: 'scale3d(1.1, 1.1, 1.1)' },
          '40%': { transform: 'scale3d(.9, .9, .9)' },
          '60%': { opacity: '1', transform: 'scale3d(1.03, 1.03, 1.03)' },
          '80%': { transform: 'scale3d(.97, .97, .97)' },
          '100%': { opacity: '1', transform: 'scale3d(1, 1, 1)' },
        },
        accordion: {
          from: { height: '0', opacity: '0' },
          to: { height: 'auto', opacity: '1' },
        },
        slide: {
          '0%': {
            transform: 'translateX(0)',
          },
          '100%': {
            transform: 'translateX(-100%)',
          },
        },
        fadeIn: {
          '0%': {
            opacity: '0',
            transform: 'translateY(-20px)',
          },
          '100%': {
            opacity: '1',
            transform: 'translateY(0)',
          },
        },
        heartbeat: {
          '0%': { transform: 'scale(1)' },
          '14%': { transform: 'scale(1.3)' },
          '28%': { transform: 'scale(1)' },
          '42%': { transform: 'scale(1.3)' },
          '70%': { transform: 'scale(1)' },
        },
      },
      animation: {
        'accordion-down': 'accordion-down 0.2s ease-out',
        'accordion-up': 'accordion-up 0.2s ease-out',
        shake: 'shake 0.75s cubic-bezier(.36,.07,.19,.97) both',
        bounceIn: 'bounceIn 0.75s cubic-bezier(0.215, 0.610, 0.355, 1.000)',
        slide: 'slide 150s linear infinite',
        accordion: 'accordion 0.3s ease-in-out',
        fadeIn: 'fadeIn 0.3s ease-in-out',
        heartbeat: 'heartbeat 1s ease-in-out',
      },
      gridTemplateColumns: {
        'custom-1-5': '1fr 5fr',
        'custom-orders': '0.8fr 1fr 1fr 0.5fr 0.3fr',
      },
    },
  },
  plugins: [require('tailwindcss-animate')],
} satisfies Config;

export default config;
