const colors = require('tailwindcss/colors')

module.exports = {
  purge: {
    content: [
      // "src/**/*.njk",
      // "src/**/*.md",
      "dist/**/*.html",
    ],
    safelist: [
      'scale-x-225',
      '-mx-3',
      'px-3',
      'text-gray-800',
      'lg:bg-green-200',
      'opacity-40',
    ],
    options: {
      whitelist: [],
    },
  },
  theme: {
    colors: {
      transparent: 'transparent',
      current: 'currentColor',
      black: colors.black,
      white: colors.white,
      gray: colors.trueGray,
      green: {
        200: '#E3F3A1',
        500: '#CDE56B',
        800: '#BFE429',
      }
    },
    extend: {
      fontSize: {
        '2xs': ['.625rem', '.75rem'],
        '9xl': '7.25rem'
      },
      letterSpacing: {
        wide: '.075em',
        wider: '.15em',
        widest: '.3em',
      },
      rotate: {
        '-35': '-35deg',
      },
      scale: {
        '102': '1.02',
        '225': '2.25',
        '300': '3',
      },
      animation: {
        'ping-slow': 'ping 2s cubic-bezier(0, 0, 0.2, 1) infinite',
      }
    }
  },
  variants: {},
  plugins: [],
}