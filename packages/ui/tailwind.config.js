// const defaultTheme = require('tailwindcss/defaultTheme')

const primary = {
  100: '#F6F8FF',
  200: '#D5DEFF',
  300: '#8F9FF0',
  400: '#5665E7',
  500: '#1F00C5',
  600: '#1A00A2',
  700: '#170090',
  800: '#14007E',
  900: '#11006C'
};

const secondary = {
  100: '#F3FAF8',
  200: '#D5F7ED',
  300: '#99F4DA',
  400: '#23DDB8',
  500: '#0DD2AB',
  600: '#0BB996',
  700: '#1B9F85',
  800: '#1D826D',
  900: '#156555'
};

const tertiary = {
  100: '#FFF8FC',
  200: '#FFEEF8',
  300: '#FFD6ED',
  400: '#FFA8D9',
  500: '#FF91D0',
  600: '#F86ABB',
  700: '#DF469D',
  800: '#C43586',
  900: '#962465'
};

module.exports = {
  theme: {
    minWidth: {
      '0': '0',
      '1/4': '25%',
      '1/2': '50%',
      '3/4': '75%',
      'full': '100%',
    },

    colors: {
      primary,
      blue: primary,
      secondary,
      green: secondary,
      tertiary,
      pink: tertiary,

      transparent: 'rgba(0,0,0,0)',
      white: '#fff',
      black: '#000',
      grey: {
        100: '#F8F7FC',
        200: '#EAE7F6',
        300: '#DCD8F0',
        400: '#CEC8EB',
        500: '#C0B9E5',
        600: '#B2AAE0',
        700: '#928CB8',
        800: '#514E66',
        900: '#211F29'
      },
      error: tertiary['900']
    },
    linearGradientColors: theme => ({
      // lightBlue: ['red', 'white' ]
      lightBlue: [theme('colors.white'), theme('colors.blue.200')]
    }),

    fontFamily: {
      sans: ['"Open Sans"', 'helvetica', 'sans-serif'],
      title: ['"Butler"', 'serif']
    },
    borderRadius: {
      default: '8px',
      circle: '50%'
    }
  },
  corePlugins: {},
  plugins: [require('tailwindcss-gradients')],
  variants: {
    borderWidth: ['responsive', 'last', 'hover', 'focus']
  }
};
