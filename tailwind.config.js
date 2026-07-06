/** @type {import('tailwindcss').Config} */
module.exports = {
  darkMode: ["class"],
  content: ["./index.html", "./src/**/*.{ts,tsx,js,jsx}"],
  theme: {
    extend: {
      borderRadius: {
        lg: 'var(--radius)',
        md: 'calc(var(--radius) - 2px)',
        sm: 'calc(var(--radius) - 4px)'
      },
      colors: {
        background: 'hsl(var(--background))',
        foreground: 'hsl(var(--foreground))',
        border: 'hsl(var(--border))',
        ring: 'hsl(var(--ring))',
        muted: {
          DEFAULT: 'hsl(var(--muted))',
          foreground: 'hsl(var(--muted-foreground))'
        },
        court: {
          deep: '#081F17',
          DEFAULT: '#0D2E22',
          light: '#163D2E',
        },
        chalk: '#F7F3E8',
        sage: {
          DEFAULT: '#C2CDBA',
          muted: '#8A9C8C',
        },
        purple: {
          DEFAULT: '#57268B',
          hi: '#A374DC',
          deep: '#3A1968',
          coach: '#8A5BC7',
        },
        gold: {
          DEFAULT: '#C9A445',
          hi: '#E8CF86',
        },
        lawn: '#DFF25E',
        coach: {
          technician: '#8A5BC7',
          tactician: '#6FA3C7',
          grinder: '#C9A445',
          entertainer: '#63B57F',
        },
      },
      fontFamily: {
        heading: ['Fraunces', 'serif'],
        body: ['Inter', 'sans-serif'],
        display: ['Fraunces', 'serif'],
      },
      keyframes: {
        'accordion-down': {
          from: { height: '0' },
          to: { height: 'var(--radix-accordion-content-height)' }
        },
        'accordion-up': {
          from: { height: 'var(--radix-accordion-content-height)' },
          to: { height: '0' }
        }
      },
      animation: {
        'accordion-down': 'accordion-down 0.2s ease-out',
        'accordion-up': 'accordion-up 0.2s ease-out'
      }
    }
  },
  plugins: [require("tailwindcss-animate")],
}
