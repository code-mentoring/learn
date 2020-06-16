import React from 'react';
import { Card, CardProps } from '@codement/ui/components/Card/Card';
import { Link } from 'react-router-dom';

// TODO: Change the Link's addresses

export interface DropdownMenuProps extends CardProps {
  title: string;
  subjects: string[];
  data?: object;
}

export const DropdownMenu: React.FC<DropdownMenuProps> = ({ title, subjects, ...props }) => (
  <Card padding={4} {...props}>
    <h4>{title}</h4>
    {subjects && (
      subjects.map(item => (
        <Link to={`/${item}`} key={item}>{item}</Link>
      ))
    )
    }
  </Card>
);
