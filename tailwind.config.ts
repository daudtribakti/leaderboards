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
          red: '#E4002B',
          'red-glow': 'rgba(228, 0, 43, 0.35)',
        },
        gold: '#F5C542',
        silver: '#C0C5CE',
        bronze: '#CD7F32',
        accent: {
          blue: '#3B82F6',
          orange: '#F97316',
        },
        surface: {
          deep: '#070A12',
          glass: 'rgba(255, 255, 255, 0.06)',
        },
      },
      fontFamily: {
        display: ['Syne', 'system-ui', 'sans-serif'],
        sans: ['"Plus Jakarta Sans"', 'system-ui', 'sans-serif'],
      },
      boxShadow: {
        glass: '0 8px 32px rgba(0, 0, 0, 0.4)',
        glow: '0 0 40px rgba(228, 0, 43, 0.25)',
        gold: '0 0 48px rgba(245, 197, 66, 0.35)',
      },
      animation: {
        shimmer: 'shimmer 1.8s ease-in-out infinite',
        float: 'float 4s ease-in-out infinite',
        'gradient-shift': 'gradient-shift 12s ease infinite',
        sparkle: 'sparkle 2s ease-in-out infinite',
      },
      keyframes: {
        shimmer: {
          '0%': { backgroundPosition: '-200% 0' },
          '100%': { backgroundPosition: '200% 0' },
        },
        float: {
          '0%, 100%': { transform: 'translateY(0)' },
          '50%': { transform: 'translateY(-10px)' },
        },
        'gradient-shift': {
          '0%, 100%': { backgroundPosition: '0% 50%' },
          '50%': { backgroundPosition: '100% 50%' },
        },
        sparkle: {
          '0%, 100%': { opacity: '0.4', transform: 'scale(0.9)' },
          '50%': { opacity: '1', transform: 'scale(1.1)' },
        },
      },
    },
  },
  plugins: [],
} satisfies Config
