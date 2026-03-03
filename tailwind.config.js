/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{ts,tsx}'],
  theme: {
    extend: {
      colors: {
        brand: {
          base: '#110907',
          surface: '#1B120F',
          surfaceSoft: '#241916',
          cream: '#D4C8B8',
          charcoal: '#F5F1EA',
          espresso: '#F5F1EA',
          copper: '#D4AF37',
          copperHover: '#BE982F',
          copperPressed: '#A78328',
          sage: '#8FA77D',
          sageHover: '#778F66',
          warmGray: '#3A2C27',
          ink: '#110907',
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
