/** @type {import('tailwindcss').Config} */
export default {
  content: ['./src/**/*.{astro,html,js,jsx,md,mdx,svelte,ts,tsx,vue}'],
  darkMode: 'class',
  theme: {
    extend: {
      colors: {
        paper: '#F4F0E8',
        'paper-card': '#FBF8F1',
        ink: '#2C2C2C',
        'ink-light': '#6B6B6B',
        cyan: {
          dark: '#4A6B5A',
          light: '#6B9E8A',
        },
        cinnabar: {
          DEFAULT: '#A0453E',
          light: '#C86B64',
        },
        smoke: '#DDD3C4',
        'dark-bg': '#1A1A1E',
        'dark-card': '#242428',
        'dark-border': '#2E2E32',
        'dark-text': '#E8E4DF',
        'dark-text-secondary': '#9E9A95',
      },
      fontFamily: {
        body: ['LXGW WenKai', 'Noto Serif SC', 'serif'],
        heading: ['Noto Serif SC', 'Source Han Serif SC', 'serif'],
        mono: ['JetBrains Mono', 'Fira Code', 'monospace'],
      },
      maxWidth: {
        prose: '680px',
      },
      lineHeight: {
        relaxed: '1.85',
      },
    },
  },
  plugins: [],
};
