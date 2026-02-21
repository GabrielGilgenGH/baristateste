/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{ts,tsx}'],
  theme: {
    extend: {
      colors: {
        brand: {
          base: '#1f140f',
          surface: '#4a372c',
          surfaceSoft: '#5c4638',
          cream: '#f4e8d8',
          charcoal: '#f1e6d7',
          espresso: '#fff8ef',
          copper: '#c27a3a',
          warmGray: '#8f6f5a',
          ink: '#1f140f',
        },
      },
      borderRadius: {
        lg: '1.25rem',
        xl: '1.75rem',
        '2xl': '2.5rem',
      },
      boxShadow: {
        soft: '0 20px 45px rgba(0, 0, 0, 0.28)',
        medium: '0 25px 55px rgba(0, 0, 0, 0.35)',
      },
      fontFamily: {
        sans: ['"Plus Jakarta Sans"', 'Inter', 'system-ui', 'sans-serif'],
        display: ['"Playfair Display"', 'Georgia', 'serif'],
      },
    },
  },
  plugins: [],
}
