import type { Config } from 'tailwindcss';

const config: Config = {
  content: ['./src/**/*.{ts,tsx}'],
  theme: {
    extend: {
      colors: {
        royalBlue: '#0A1F44',
        oliveGreen: '#556B2F',
        gold: '#D4AF37',
        appBg: '#070B14',
        cardBg: '#0E1629',
        textPrimary: '#F5F7FF',
        textMuted: '#B5C0D0',
      },
    },
  },
  plugins: [],
};

export default config;
