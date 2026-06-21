import type { Config } from 'tailwindcss';

export default {
  content: ['./index.html', './src/**/*.{js,jsx,ts,tsx}'],
  theme: {
    extend: {
      boxShadow: {
        glow: '0 30px 120px -65px rgba(56,189,248,0.75)',
      },
      colors: {
        surface: '#08101f',
        surfaceSoft: '#0f172a',
        surfaceLight: '#111827',
      },
    },
  },
  plugins: [],
} satisfies Config;
