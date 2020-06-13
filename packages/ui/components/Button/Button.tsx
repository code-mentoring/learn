import React, { HTMLAttributes } from 'react';
import styled, { css } from 'styled-components';
import { Icon } from '@codement/ui';

enum BtnType {
  primary = 'primary',
  secondary = 'secondary',
  tertiary = 'tertiary',
  transparent = 'transparent'
}

export interface ButtonProps extends HTMLAttributes<any> {
  text?: boolean;
  btnType?: 'primary' | 'secondary' | 'tertiary' | 'transparent'
  disabled?: boolean;
  size?: string;
  icon?: boolean;
  iconName?: string;
}

export const Button: React.FC<ButtonProps> = ({
  icon,
  iconName,
  children,
  ...props
}) => (
  <StyledButton
    {...props}
  >
    { icon && <Icon className="inline-block" icon={iconName} />}
    { children }
  </StyledButton>
);

export const StyledButton = styled.button<ButtonProps>`
  display: inline-block;
  font-weight: 800;
  height: 2.25rem;
  line-height: 2.25rem;
  padding-left: 0.75rem;
  padding-right: 0.75rem;
  border-radius: 0.5rem;
  letter-spacing: 0.05em;
  font-size: 0.875rem;
  color: ${props => props.theme.colors.white};
  text-transform: uppercase;
  background-color: ${props => props.theme.colors.primary['500']};

  &:hover {
    background-color: ${props => props.theme.colors.primary['400']};
  }

  &:focus {
    background-color: ${props => props.theme.colors.primary['600']};
  }

  ${({ size }) => size === 'large' && css`
    padding-left: 0.75rem;
    padding-right: 0.75rem;
    height: 3rem;
    line-height: 3rem;
    font-size: 1rem;
  `}

  ${({ btnType }) => btnType === BtnType.secondary && css`
    background-color: ${props => props.theme.colors.secondary['500']};
    &:hover {
      background-color: ${props => props.theme.colors.secondary['400']};
    }
    &:focus {
    background-color: ${props => props.theme.colors.secondary['600']};
    }
  `}

  ${({ btnType }) => btnType === BtnType.tertiary && css`
    background-color: ${props => props.theme.colors.tertiary['500']};
    &:hover {
      background-color: ${props => props.theme.colors.tertiary['400']};
    }
    &:focus {
    background-color: ${props => props.theme.colors.tertiary['600']};
    }
  `}

  ${({ btnType }) => btnType === BtnType.transparent && css`
    color: ${props => props.theme.colors.primary['500']};
    background-color: ${props => props.theme.colors.transparent};
    &:hover {
      background-color: ${props => props.theme.colors.transparent};
    }
    &:focus {
    background-color: ${props => props.theme.colors.transparent};
    color: ${props => props.theme.colors.grey['500']};
    }
  `}

  ${({ disabled }) => disabled && css`
    cursor: not-allowed;
    background-color: ${props => props.theme.colors.grey['300']};
    &:hover {
      background-color: ${props => props.theme.colors.grey['300']};
    }
  `}
`;

// import React from 'react';
// import classnames from 'classnames';
// import { Icon } from '@codement/ui';

// interface LearnedConceptsProps {
//   concepts: any[];
//   learnedConcepts: any[];
// }

// export const LearnedConcepts: React.FC<LearnedConceptsProps> = ({
//   concepts,
//   learnedConcepts
// }) => <div className="flex flex-col items-center absolute right-0 mr-6 w-20">
//   <h4 className="text-center my-3">Learned concepts</h4>
//   {concepts.map(concept => {
//     const learned = learnedConcepts.map(lc => lc.id).includes(concept.id);
//     return <div
//       key={concept.id}
//       className={classnames('w-10 h-10 border-2 rounded-circle mb-3 flex flex-col justify-center bg-secondary-100 text-secondary-600', {
//         'text-grey-200 bg-white': !learned })}
//     >
//       {learned && <Icon icon={concept.icon} />}
//     </div>;
//   })}
// </div>;
