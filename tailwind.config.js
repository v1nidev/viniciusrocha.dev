const colors = require('tailwindcss/colors')

module.exports = {
  purge: {
    content: [
      "src/**/*.njk",
      "src/**/*.md"
    ],
    options: {
      whitelist: [],
    },
  },
  theme: {
    screens: getScreenSettings(),
    fontSize: getFontSizeSettings(),
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
      letterSpacing: {
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
};

/**
 * Fluid typography
 * https://davidhellmann.com/blog/development/tailwindcss-fluid-typography-with-css-clamp
 * https://websemantics.uk/tools/responsive-font-calculator/
 */

function getBasicSettings() {
  return {
    typography: {
      fontSizeMin: 1.125,
      fontSizeMax: 1.25,
      msFactorMin: 1.125,
      msFactorMax: 1.2,
      // lineHeight: 1.6,
    },
    screensRem: {
      min: 20,
      sm: 40,
      md: 48,
      lg: 64,
      xl: 80,
      '2xl': 96,
    },
    // grid: {
    //   cols: 24,
    // },
  }
}

function remToPx(rem) {
  return `${rem * 16}px`
}

function getScreenSettings() {
  const settings = getBasicSettings()

  return {
    sm: remToPx(settings.screensRem.sm),
    md: remToPx(settings.screensRem.md),
    lg: remToPx(settings.screensRem.lg),
    xl: remToPx(settings.screensRem.xl),
    '2xl': remToPx(settings.screensRem['2xl']),
  }
}

function getFontSizeSettings() {
  const settings = getBasicSettings()
  const fsMin = settings.typography.fontSizeMin
  const fsMax = settings.typography.fontSizeMax
  const msFactorMin = settings.typography.msFactorMin
  const msFactorMax = settings.typography.msFactorMax
  const screenMin = settings.screensRem.min
  const screenMax = settings.screensRem['2xl']

  // Calc Min and Max Fontsize
  const calcMulti = (multiMin = 0, multiMax = null) => {
    return {
      fsMin: fsMin * Math.pow(msFactorMin, multiMin),
      fsMax: fsMax * Math.pow(msFactorMax, multiMax || multiMin),
    }
  }

  // build the clamp property
  const clamp = (multiMin = 0, multiMax = null) => {
    const _calcMulti = calcMulti(multiMin, multiMax || multiMin)
    const _fsMin = _calcMulti.fsMin
    const _fsMax = _calcMulti.fsMax
    return `clamp(${_fsMin}rem, calc(${_fsMin}rem + (${_fsMax} - ${_fsMin}) * ((100vw - ${screenMin}rem) / (${screenMax} - ${screenMin}))), ${_fsMax}rem)`
  }
  
  return {
    '2xs': clamp(-3.5),
    xs: clamp(-2.4),
    sm: clamp(-1),
    base: clamp(0),
    lg: clamp(1),
    xl: clamp(2),
    '2xl': clamp(3),
    '3xl': clamp(4),
    '4xl': clamp(5),
    '5xl': clamp(6),
    '6xl': clamp(7),
    '7xl': clamp(8),
    '8xl': clamp(9),
    '9xl': clamp(10),
  }
}