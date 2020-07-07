import 'styled-components';

export type Color =
  'primary' | 'primary.100' | 'primary.200' | 'primary.300' | 'primary.400' | 'primary.500' | 'primary.600' | 'primary.700' | 'primary.800' | 'primary.900' |
  'blue' | 'blue.100' | 'blue.200' | 'blue.300' | 'blue.400' | 'blue.500' | 'blue.600' | 'blue.700' | 'blue.800' | 'blue.900' |
  'secondary' | 'secondary.100' | 'secondary.200' | 'secondary.300' | 'secondary.400' | 'secondary.500' | 'secondary.600' | 'secondary.700' | 'secondary.800' | 'secondary.900' |
  'green' | 'green.100' | 'green.200' | 'green.300' | 'green.400' | 'green.500' | 'green.600' | 'green.700' | 'green.800' | 'green.900' |
  'tertiary' | 'tertiary.100' | 'tertiary.200' | 'tertiary.300' | 'tertiary.400' | 'tertiary.500' | 'tertiary.600' | 'tertiary.700' | 'tertiary.800' | 'tertiary.900' |
  'pink' | 'pink.100' | 'pink.200' | 'pink.300' | 'pink.400' | 'pink.500' | 'pink.600' | 'pink.700' | 'pink.800' | 'pink.900' |
  'grey' | 'grey.100' | 'grey.200' | 'grey.300' | 'grey.400' | 'grey.500' | 'grey.600' | 'grey.700' | 'grey.800' | 'grey.900' |
  'error' | 'white' | 'transparent';

interface Colors {
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

export type Size = 'none' | 'xtiny' | 'tiny' | 'xsm' | 'sm' | 'md' | 'big' | 'xbig' | 'lg' | 'xl' | 'huge' | 'giant' | 'massive';

declare module 'styled-components' {
  export interface DefaultTheme {
    colors: {
      primary: Colors,
      blue: Colors,
      secondary: Colors,
      green: Colors,
      tertiary: Colors,
      pink: Colors,
      grey: Colors,

      transparent: string,
      white: string,
      black: string,
      error: string
    },
    color(color?: Color): string,

    sizes: { [size in Size]: string },
    size(size?: number | Size): string,

    fontFamily: { sans: string, title: string, code: string },
    fontWeight: { normal: 400, bold: 600, heavy: 800 },
    letterSpacing: { sm: string; md: string; lg: string; }
    borderRadius: { small: string, medium: string, default: string, circle: string, large: string }
    borders: {main: string}
    shadows: {main: string}
  }
  // export interface DefaultTheme {
  //   colors: {
  //     primary: Colors,
  //     blue: Colors,
  //     secondary: Colors,
  //     green: Colors,
  //     tertiary: Colors,
  //     pink: Colors,
  //     grey: Colors,

  //     transparent: string,
  //     white: string,
  //     black: string,
  //     error: string
  //   },
  //   color(color?: Color): string,

  //   sizes: { [size in Size]: string },
  //   size(size?: number | Size): string,

  //   fontFamily: { sans: string, title: string },
  //   fontWeight: { normal: 400, bold: 600, heavy: 800 },
  //   letterSpacing: { sm: string; md: string; lg: string; }
  //   borderRadius: { small: string, medium: string, default: string, circle: string }
  //   borders: {main: string}
  // }
}
