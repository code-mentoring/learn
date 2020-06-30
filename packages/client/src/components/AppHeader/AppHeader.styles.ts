import { TextField, theme as t } from '@codement/ui';
import styled, { css } from 'styled-components';
import { Color } from '@codement/ui/types/styled';

export const StyledAppHeader = styled.nav<{ minimal?: boolean }>`${({
  minimal
}) => css`
  padding: ${t.size('big')} ${t.size('lg')};

  ${minimal
    ? 'text-align: center;'
    : `
      display: grid;
      grid-column: span 2;
      grid-template-columns: 20rem 1fr repeat(4, min-content);
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


export const Figure = styled.div<{color: Color}>`
  display: flex;
  align-items: center;

  span {
    display: block;
    font-weight: ${t.fontWeight.bold};
    color: ${p => t.color(p.color)};
    margin-right: ${t.size('xtiny')};
  }
`;
