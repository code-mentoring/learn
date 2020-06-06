import { DefaultTheme } from 'styled-components';
import { primary, secondary, tertiary, grey } from './colors';

export const theme: DefaultTheme = {
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
    grey,
    error: tertiary['900']
  },
  fontFamily: {
    sans: ['"Open Sans"', 'helvetica', 'sans-serif'],
    title: ['"Butler"', 'serif']
  },
  borderRadius: {
    default: '8px',
    circle: '50%'
  }
};
