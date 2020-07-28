import { DefaultTheme } from 'styled-components';
import { primary, secondary, tertiary, grey } from './colors';
import { Color, Size } from '../types/styled';

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
    error: tertiary['900'],

    code: {
      background: '#0A0041',
      color: '#fff',
    }
  },
  color: (color: Color = 'primary') => {
    const cn = color as keyof DefaultTheme['colors'];
    const hasDot = color.includes('.');
    const c = (hasDot) ? color : `${color}.500`; // Default to 500 color
    if (typeof theme.colors[cn] === 'string' && !hasDot) return theme.colors[cn] as string;
    // eslint-disable-next-line no-use-before-define
    return lookup(`colors.${c}`);
  },

  sizes: {
    none: '0rem',
    xtiny: '0.4rem',
    tiny: '0.8rem',
    xsm: '1.2rem',
    sm: '1.4rem',
    md: '1.6rem',
    big: '1.8rem',
    xbig: '2.4rem',
    lg: '2.8rem',
    xl: '3.6rem',
    huge: '4.8rem',
    giant: '6.4rem',
    massive: '7.2rem'
  },
  size(size: number | Size = 'md') {
    if (typeof size === 'number') return `${size}px`;
    return theme.sizes[size];
  },

  fontFamily: {
    sans: ['"Open Sans"', 'helvetica', 'sans-serif'].join(', '),
    title: ['"Butler"', 'serif'].join(', '),
    code: ['"Source Code Pro"', 'monospace'].join(', ')
  },
  fontWeight: { normal: 400, bold: 600, heavy: 800 },
  letterSpacing: {
    sm: '0.75px',
    md: '1px',
    lg: '2px'
  },

  borderRadius: {
    small: '2px',
    medium: '4px',
    default: '8px',
    large: '16px',
    circle: '50%'
  },
  borders: {
    main: `2px solid ${grey['200']}`
  },

  shadows: {
    main: `0 4px 10px ${grey[900]}10`,
    success: `0 4px 12px ${secondary[500]}25`,
    error: `0 4px 12px ${tertiary[500]}50`
  }
};


// Lookup a key in the theme like "lookup('colors.primary.100')"
function lookup<T = string>(str: string): T {
  // @ts-ignore
  return str.split('.').reduce((o, i) => o[i], theme);
}
