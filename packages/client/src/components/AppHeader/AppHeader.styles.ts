import { TextField, theme as t } from '@codement/ui';
import { fade } from '@codement/ui/css/animations';
import styled, { css } from 'styled-components';
import { Color } from '@codement/ui/types/styled';

export const StyledAppHeader = styled.nav<{ minimal?: boolean }>`${({
  minimal
}) => css`
  padding: ${t.size('xsm')} ${t.size('lg')};
  animation: ${fade} 0.5s ease-out;
  background:${t.colors.white};
  box-shadow: 0px 2px 10px ${t.colors.primary[200]};

  ${minimal
    ? 'text-align: center;'
    : `
      display: grid;
      grid-column: span 2;
      grid-template-columns: 28rem 1fr repeat(3, min-content);
      grid-gap: ${t.size('lg')};
      align-items: center;
    `}

  svg.logo {
    height: ${t.size('huge')}
  }
`}`;


export const Search = styled(TextField)`
  color: ${t.color('grey.900')};

  input {
    background: ${t.color('primary.100')};
    border: none;
    &::placeholder {
      color: ${t.color('grey.700')};
      opacity: 1;
    }
  }
`;


export const Figure = styled.div<{color: Color, background: Color}>`
  display: flex;
  align-items: center;

  background: ${p => t.color(p.background)};
  border-radius: 18px;
  height: ${t.size('xl')};
  padding:${t.size('xtiny')};

  span {
    display: block;
    font-weight: ${t.fontWeight.bold};
    color: ${p => t.color(p.color)};
    margin-right: ${t.size('xtiny')};
    padding-left: ${t.size('xtiny')};
  }
`;

export const CenterPosition = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
`;

export const User = styled.div`
  text-align: center;
  justify-items: center;
  align-content: center;
  
  width:fit-content;
  height: ${t.size('huge')};
  padding: ${t.size('tiny')};
  
  display: grid;
  grid-template-columns: min-content auto min-content;
  
  border: ${t.borders.main};
  box-sizing: border-box;
  border-radius: ${t.size('tiny')};

  small {
    align-self: center;
    padding: ${t.size('tiny')};
    font-weight: bold;
  }
`;
