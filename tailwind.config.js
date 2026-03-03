/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{ts,tsx}'],
  theme: {
    extend: {
      colors: {
        brand: {
          base: '#120806',
          surface: '#1A0F0C',
          surfaceSoft: '#221410',
          cream: '#CBB9AA',
          charcoal: '#F4EFE9',
          espresso: '#F4EFE9',
          copper: '#D08A45',
          copperHover: '#E39A52',
          copperPressed: '#B8743A',
          warmGray: '#3A2720',
          ink: '#120806',
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
