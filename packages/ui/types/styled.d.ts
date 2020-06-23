import 'styled-components';

export interface Colors {
  100: string;
  200: string;
  300: string;
  400: string;
  500: string;
  600: string;
  700: string;
  800: string;
  900: string;
}

declare module 'styled-components' {
  export interface DefaultTheme {
    colors: {
      primary: Colors,
      blue: Colors,
      secondary: Colors,
      green: Colors,
      tertiary: Colors,
      pink: Colors,

      transparent: string,
      white: string,
      black: string,
      grey: Colors,
      error: string
    },
    fontFamily: {
      sans: string[],
      title: string[]
    },
    borderRadius: {
      default: string,
      circle: string
    }
  }
}
