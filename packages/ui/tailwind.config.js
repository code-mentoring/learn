// const defaultTheme = require('tailwindcss/defaultTheme')

const primary = {
  100: '#998BE4',
  200: '#5C45D4',
  300: '#472ECF',
  400: '#3317CA',
  500: '#1F00C5',
  600: '#1A00A2',
  700: '#170090',
  800: '#14007E',
  900: '#11006C',
}

const secondary = {
  100: '#F3FAF8',
  400: '#23ddb8',
  500: '#0DD2AB',
  600: '#0bb996',
  900: '#0bb996',
};

const tertiary = {
  100: '#FFF8FC',
  400: '#ffa8d9',
  500: '#FF91D0',
  600: '#f86abb',
  900: '#f86abb',
};

module.exports = {
  theme: {
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
      lightBlue: [theme('colors.white'), theme('colors.blue.200') ]
    }),


    fontFamily: {
      sans: ['"Open Sans"', 'helvetica', 'sans-serif'],
      title: ['"Butler"', 'serif'],
    },
    borderRadius: {
      default: '8px'
    }
  },
  corePlugins: {},
  plugins: [
    require('tailwindcss-gradients')
  ],
}
