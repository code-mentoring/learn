// const defaultTheme = require('tailwindcss/defaultTheme')

const primary = {
  100: '#FAF9FF',
  200: '#f4f2fb',
  400: '#C4BEE0',
  500: '#1F00C5',
  900: '#1F00C5',
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
        500: '#C4BEE0',
        900: '#11006C'
      }
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
