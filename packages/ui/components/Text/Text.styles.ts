import styled, { css, DefaultTheme, ThemedStyledProps } from 'styled-components';

import { Color, Size } from '../../types/styled';


interface BaseTypeProps {
  color?: Color,
  fontSize?: Size | number,
  letterSpacing?: keyof DefaultTheme['letterSpacing'],
  fontFamily?: keyof DefaultTheme['fontFamily'],
  fontWeight?: keyof DefaultTheme['fontWeight'],
  uppercase?: boolean
}

const baseText = css<BaseTypeProps>(({
  theme: t,
  color,
  fontSize = 'md',
  fontFamily,
  letterSpacing,
  fontWeight,
  uppercase
}) => {
  const styles: ThemedStyledProps<any, any> = {};
  if (color) styles.color = t.color(color);
  if (fontSize) styles.fontSize = t.size(fontSize);
  if (letterSpacing) styles.letterSpacing = t.letterSpacing[letterSpacing];
  if (fontFamily) styles.fontFamily = t.fontFamily[fontFamily];
  if (fontWeight) styles.fontWeight = t.fontWeight[fontWeight];
  if (uppercase) styles.textTransform = 'uppercase';
  styles.lineHeight = 1.75;
  return styles;
});


export const title = styled.h1`${baseText}`;
title.defaultProps = { color: 'primary', fontFamily: 'title', fontSize: 'giant', fontWeight: 'heavy', letterSpacing: 'sm' };

export const subTitle = styled.h2`${baseText}`;
subTitle.defaultProps = { color: 'secondary', fontFamily: 'title', fontSize: 'xl', fontWeight: 'bold', letterSpacing: 'sm' };

export const h1 = styled.h1`${baseText}`;
h1.defaultProps = { color: 'primary.400', fontSize: 'xbig', fontWeight: 'heavy' };

export const h2 = styled.h2`${baseText}`;
h2.defaultProps = { color: 'primary', fontSize: 21, fontWeight: 'bold' };

export const h3 = styled.h3`${baseText}`;
h3.defaultProps = { color: 'primary.300', fontSize: 'big', fontWeight: 'bold' };

// export const h4 = styled.h4`${baseText}`;
// h4.defaultProps = { color: 'grey', fontSize: 'xsm', fontWeight: 'heavy' };

export const h5 = styled.h5`${baseText}`;
h5.defaultProps = { color: 'grey', fontSize: 'xsm', fontWeight: 'heavy', uppercase: true, letterSpacing: 'sm' };

// export const h6 = styled.h6`${baseText}`;

export const body1 = styled.p`${baseText}`;
body1.defaultProps = { color: 'grey.900', letterSpacing: 'sm' };

export const body2 = styled.span`${baseText}`;
body2.defaultProps = { color: 'grey.700', fontSize: 'sm' };

export const span = styled.span`${baseText}`;
span.defaultProps = { color: 'grey.700', fontSize: 'sm' };

export const small = styled.small`${baseText}`;
small.defaultProps = { color: 'grey.600', fontSize: 'xsm', letterSpacing: 'sm' };

export const strong = styled.strong`${baseText}`;
