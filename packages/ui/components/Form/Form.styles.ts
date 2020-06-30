import styled from 'styled-components';

export const StyledForm = styled.form<{ cols?: number }>`
  display: grid;
  grid-template-columns: repeat(${p => p.cols}, 1fr);
  button {
    width: 100%;
    grid-column: span 2;
  }
`;

StyledForm.defaultProps = { cols: 2 };
