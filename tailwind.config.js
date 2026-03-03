/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{ts,tsx}'],
  theme: {
    extend: {
      colors: {
        brand: {
          base: '#120B08',
          surface: '#221512',
          surfaceSoft: '#2A1A16',
          cream: '#D9CBB8',
          charcoal: '#F0E6DA',
          espresso: '#FBF7F1',
          copper: '#C9A24D',
          copperHover: '#B58B33',
          copperPressed: '#8E6B22',
          teal: '#1FA392',
          tealSoft: '#2BB7A8',
          tealHover: '#168A7D',
          brassSoft: '#D8B56A',
          warmGray: '#4A2F27',
          ink: '#0B0A09',
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
