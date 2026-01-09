/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{ts,tsx}'],
  theme: {
    extend: {
      colors: {
        paper: '#F2F0E6',
        ink: '#1A1A1A',
        muted: '#666666',
        'paper-2': '#EEECE2',
        'ink-2': '#222222',
      },
      fontFamily: {
        serif: [
          'Cormorant Garamond',
          'EB Garamond',
          'Garamond',
          'Times New Roman',
          'Times',
          'serif',
        ],
        sans: ['Inter', 'system-ui', '-apple-system', 'Segoe UI', 'Roboto', 'Helvetica', 'Arial', 'sans-serif'],
      },
      boxShadow: {
        subtle: '0 14px 40px rgba(0,0,0,0.10)',
      },
      transitionTimingFunction: {
        'ios': 'cubic-bezier(0.22, 1, 0.36, 1)',
      },
    },
  },
  plugins: [],
}

