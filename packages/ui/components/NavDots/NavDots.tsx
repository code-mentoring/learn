import React, { useState, useEffect } from 'react';
import styled from 'styled-components';
import { theme as t } from '@codement/ui/css/theme';

export interface NavDotsProps extends Omit<React.HTMLProps<HTMLElement>, 'onChange'> {
  value?: number;
  steps: boolean[];
  onChange?: (page: number) => void;
}

const Step = styled.span<{ completed?: boolean, active?: boolean }>`
  display: block;
  width: ${t.size('big')};
  height: ${t.size('big')};
  border: ${t.borders.main};
  border-radius: 50%;
  margin-left: ${t.size('tiny')};

  ${p => p.completed && `
    border-color: ${t.color('green')};
    background: ${t.color('green')};
    cursor: pointer;
  `};

  ${p => p.active && `
    border-color: ${t.color('primary')};
    background: ${t.color('white')};
  `};
`;

const Nav = styled.nav`
  display: flex;
  align-items: center;
`;

export const NavDots: React.FC<NavDotsProps> = ({
  steps, value = 0, onChange, ...props
}) => {
  const [page, setPage] = useState(value);

  useEffect(() => onChange?.(page), [page]);
  useEffect(() => setPage(value), [value]);

  // @ts-ignore
  return <Nav {...props}>
    {steps.map((_, i) => <Step
      active={i === page}
      completed={steps[i]}
      onClick={() => setPage(i)}
    />)}
  </Nav>;
};
