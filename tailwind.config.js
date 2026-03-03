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
          copper: '#E0B34A',
          copperHover: '#C9982F',
          copperPressed: '#8F671C',
          teal: '#1FB8A5',
          tealSoft: '#37CFBE',
          tealHover: '#148879',
          brassSoft: '#F0C56A',
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
