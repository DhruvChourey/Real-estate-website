/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        parchment: {
          50: '#F6F3EC',
          100: '#F1ECE2',
          200: '#E7E0D3',
          300: '#DCD3C3',
          400: '#CEBEA9',
          DEFAULT: '#F4EFE7',
        },
        charcoal: {
          950: '#0C0D0E',
          DEFAULT: '#121315',
          900: '#17181A',
          800: '#232528',
          700: '#383B40',
          600: '#555960',
          500: '#797D85',
          400: '#A4A8B0',
        },
        bronze: {
          light: '#BA9C7D',
          DEFAULT: '#91714E',
          dark: '#6F5436',
          muted: '#A89279',
        },
        olive: {
          light: '#77826C',
          DEFAULT: '#5A6352',
          dark: '#41473A',
        },
        stone: {
          50: '#FBF9F5',
          100: '#F3EFE9',
          200: '#E4DDD2',
          300: '#D6CDBF',
          400: '#B5A997',
          500: '#877B69',
          600: '#5F5547',
          border: '#E3DDD2',
          darkborder: '#27292D',
        }
      },
      fontFamily: {
        serif: ['"Cormorant Garamond"', 'Cormorant', 'Georgia', 'serif'],
        sans: ['"Plus Jakarta Sans"', 'Inter', 'system-ui', 'sans-serif'],
        display: ['"Cormorant Garamond"', 'serif'],
      },
      letterSpacing: {
        'luxury': '0.22em',
        'subtle': '0.08em',
        'widest': '0.18em',
      },
      lineHeight: {
        'relaxed-luxury': '1.75',
      },
      boxShadow: {
        'subtle-elevated': '0 20px 40px -15px rgba(22, 20, 16, 0.07)',
        'luxury-card': '0 16px 36px -10px rgba(22, 20, 16, 0.08), 0 2px 8px -2px rgba(22, 20, 16, 0.03)',
        'luxury-panel': '0 12px 32px -6px rgba(28, 25, 20, 0.06), 0 2px 6px -1px rgba(28, 25, 20, 0.03)',
        'deep': '0 25px 60px -15px rgba(0, 0, 0, 0.3)',
      }
    },
  },
  plugins: [],
}
