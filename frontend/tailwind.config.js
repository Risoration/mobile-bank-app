/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{js,ts,jsx,tsx}'],
  darkMode: 'class',
  theme: {
    extend: {
      colors: {
        'theme-success': 'rgb(var(--color-theme-success) / <alpha-value>)',
        'theme-error': 'rgb(var(--color-theme-error) / <alpha-value>)',
        'theme-warning': 'rgb(var(--color-theme-warning) / <alpha-value>)',
        'theme-info': 'rgb(var(--color-theme-info) / <alpha-value>)',
        'theme-primary': 'rgb(var(--color-theme-primary) / <alpha-value>)',
        'theme-background':
          'rgb(var(--color-theme-background) / <alpha-value>)',
        'theme-surface': 'rgb(var(--color-theme-surface) / <alpha-value>)',
        'theme-text': 'rgb(var(--color-theme-text-primary) / <alpha-value>)',
      },
    },
  },
  plugins: [],
};
