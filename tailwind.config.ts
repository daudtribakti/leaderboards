import type { Config } from 'tailwindcss'

export default {
  content: [
    './app/components/**/*.{js,vue,ts}',
    './app/layouts/**/*.vue',
    './app/pages/**/*.vue',
    './app/plugins/**/*.{js,ts}',
    './app/app.vue',
  ],
  theme: {
    extend: {
      colors: {
        kalbe: {
          green: '#15803D',
          'green-deep': '#14532D',
          'green-dark': '#052E16',
          lime: '#84CC16',
          'lime-soft': '#BEF264',
          mint: '#F0FDF4',
          sky: '#38BDF8',
          red: '#E4002B',
        },
        gold: '#CA8A04',
        silver: '#94A3B8',
        bronze: '#B45309',
        surface: {
          page: '#F8FAF9',
          card: '#FFFFFF',
        },
      },
      fontFamily: {
        display: ['Outfit', 'system-ui', 'sans-serif'],
        sans: ['"DM Sans"', 'system-ui', 'sans-serif'],
      },
      fontSize: {
        '2xs': ['0.625rem', { lineHeight: '0.875rem' }],
      },
      borderRadius: {
        '2xl': '1rem',
        '3xl': '1.25rem',
      },
      boxShadow: {
        soft: '0 1px 3px rgba(15, 23, 42, 0.06), 0 4px 16px rgba(21, 128, 61, 0.06)',
        card: '0 1px 2px rgba(15, 23, 42, 0.04), 0 8px 24px rgba(21, 128, 61, 0.08)',
        glow: '0 4px 20px rgba(21, 128, 61, 0.18)',
        gold: '0 4px 16px rgba(202, 138, 4, 0.25)',
        lime: '0 2px 12px rgba(132, 204, 22, 0.3)',
        float: '0 12px 32px rgba(21, 128, 61, 0.12)',
      },
      animation: {
        shimmer: 'shimmer 1.8s ease-in-out infinite',
        float: 'float 4s ease-in-out infinite',
        sparkle: 'sparkle 2s ease-in-out infinite',
      },
      keyframes: {
        shimmer: {
          '0%': { backgroundPosition: '-200% 0' },
          '100%': { backgroundPosition: '200% 0' },
        },
        float: {
          '0%, 100%': { transform: 'translateY(0)' },
          '50%': { transform: 'translateY(-6px)' },
        },
        sparkle: {
          '0%, 100%': { opacity: '0.5', transform: 'scale(0.95)' },
          '50%': { opacity: '1', transform: 'scale(1.05)' },
        },
      },
    },
  },
  plugins: [],
} satisfies Config
