import React from 'react';
import { Card, CardProps } from '@codement/ui/components/Card/Card';
import { Link } from 'react-router-dom';
import styled from 'styled-components';

// TODO: Change the Link's addresses

export interface DropdownMenuProps extends CardProps {
  title: string;
  subjects: string[];
  data?: object;
}

export const Styledh4 = styled.h4`
margin-bottom: 1rem;
text-align: center;
`;

export const DropdownMenu: React.FC<DropdownMenuProps> = ({ title, subjects, ...props }) => (
  <Card padding={4} {...props}>
    <Styledh4>{title}</Styledh4>
    {subjects && (
      subjects.map(item => (
        <Link to={`/${item}`} key={item}>{item}</Link>
      ))
    )
    }
  </Card>
);
