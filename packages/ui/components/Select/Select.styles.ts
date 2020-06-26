import styled, { css } from 'styled-components';

export const StyledSelect = styled.div`${({ theme: t }) => css`
  height: ${t.size('xl')};
`}`;
