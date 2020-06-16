import React from 'react';
import styled from 'styled-components';

import { Module as EModule, UserModule, UserConcept, ModuleType } from '@codement/api/types';
import { theme } from '@codement/ui';
import { ModuleIcon } from './Icons/Icon';

export interface ModuleProps {
  module: EModule,
  myModule?: UserModule,
  myConcepts?: UserConcept[]
}

const ModuleContainer = styled.div`
  text-align: center;
  margin: 1.5rem;
  color: ${props => props.theme.colors.primary['500']};

`;

const IconContainer = styled.div`
  position: relative;
  display: flex;
  height: 3rem;
  width: 3rem;
  margin-right: auto;
  margin-left: auto;
  & svg{
    position: absolute;
    left: 50%;
    top: 50%;
    transform: translate(-50%, -50%);
  };
  & div {
    display:flex;
    position: absolute;
    left: 85%;
    top: 20%;
    transform: translate(-50%, -50%);
    & span{
      font-size: 0.5rem;
      color: ${props => props.theme.colors.white};
      z-index: 100;
    };
  }

`;

const ModuleNameWrapper = styled.span<{isLocked: boolean}>`
  color: ${props => (props.isLocked ? props.theme.colors.grey['700'] : props.theme.colors.grey['900'])};
  font-size: 0.75rem;

`;

export const Module: React.FC<ModuleProps> = ({
  module,
  myModule,
  myConcepts
}) => {
  const isCompleted = myModule?.completedAt;
  const isOpen = myModule && !myModule.completedAt;
  const isLocked = !myModule;

  return <ModuleContainer>
    <IconContainer>
      <ModuleIcon
        icon={module.type === ModuleType.Lesson ? 'hexagon' : 'octagon'}
        size={3}
        // eslint-disable-next-line no-nested-ternary
        color={isCompleted ? theme.colors.secondary['500'] : isOpen ? theme.colors.primary['400'] : theme.colors.white}
        stroke={isLocked ? theme.colors.grey['500'] : undefined}
      />

      <ModuleIcon
        icon="fire"
        size="small"
        color={isLocked ? theme.colors.grey['500'] : theme.colors.white}
      />

      <div>
        { module.type !== ModuleType.Assignment
        && <ModuleIcon
          icon="circle"
          size="small"
          // eslint-disable-next-line no-nested-ternary
          color={isCompleted ? theme.colors.secondary['500'] : isOpen ? theme.colors.primary['400'] : theme.colors.grey['500']}
          stroke={isLocked ? undefined : theme.colors.white}
        /> }

        {/* completed status with check mark in the circle. */}
        { module.type !== ModuleType.Assignment
        && isCompleted
        && <ModuleIcon
          icon="check"
          size={0.75}
          color={theme.colors.white}
        />}

        {/* open status with number of completed concepts in the circle. */}
        { module.type !== ModuleType.Assignment
          && isOpen
          && <span> { myConcepts?.length } </span> }
      </div>
    </IconContainer>

    <ModuleNameWrapper isLocked={isLocked}> {module.name} </ModuleNameWrapper>

  </ModuleContainer>;
};
