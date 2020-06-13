import React from 'react';
// import classnames from 'classnames';

import { Module as EModule, UserModule, UserConcept } from '@codement/api';
import { theme } from '@codement/ui';

import { ModuleIcon } from './Icons/Icon';

export interface ModuleProps {
  module: EModule,
  myModule?: UserModule,
  myConcepts?: UserConcept[]
}

export const Module: React.FC<ModuleProps> = ({
  module,
  myModule,
  myConcepts
}) => {
  const isCompleted = myModule?.completedAt;
  const isOpen = myModule && !myModule.completedAt;
  const isLocked = !myModule;

  let polygonColor : string;
  if (isCompleted) polygonColor = theme.colors.secondary['500'];
  else if (isOpen) polygonColor = theme.colors.primary['400'];
  else polygonColor = theme.colors.white;

  let cirlceColor : string;
  if (isCompleted) cirlceColor = theme.colors.secondary['500'];
  else if (isOpen) cirlceColor = theme.colors.primary['400'];
  else cirlceColor = theme.colors.grey['500'];

  return <div style={{
    textAlign: 'center',
    marginBottom: '1.5rem',
    color: theme.colors.primary['500'] }}
  >

    <div style={{
      position: 'relative',
      display: 'flex',
      height: '3rem',
      width: '3rem',
      marginRight: 'auto',
      marginLeft: 'auto' }}
    >

      <ModuleIcon
        icon={module.type === 'lesson' ? 'hexagon' : 'octagon'}
        position="absolute"
        size={3}
        fill={polygonColor}
        stroke={isLocked ? theme.colors.grey['500'] : undefined}
        left="50%"
        top="50%"
        transform="translate(-50%, -50%)"
      />

      { module.type !== 'assignment'
      && <ModuleIcon
        icon="circle"
        position="absolute"
        size="small"
        fill={cirlceColor}
        stroke={isLocked ? undefined : theme.colors.white}
        left="85%"
        top="20%"
        transform="translate(-50%, -50%)"
      /> }

      {/* completed status with check mark in the circle. */}
      { module.type !== 'assignment'
      && isCompleted
      && <ModuleIcon
        icon="check"
        position="absolute"
        size={0.75}
        color={theme.colors.white}
        fill={theme.colors.white}
        left="85%"
        top="20%"
        transform="translate(-50%, -50%)"
      />}

      {/* open status with number of completed concepts in the circle. */}
      { module.type !== 'assignment'
      && isOpen
      && <span style={{
        left: '80%',
        top: '7%',
        position: 'absolute',
        fontSize: '0.5rem',
        color: theme.colors.white }}
      >{myConcepts?.length}</span> }

      <ModuleIcon
        icon="fire"
        position="absolute"
        size="small"
        fill={isLocked ? theme.colors.grey['500'] : theme.colors.white}
        left="50%"
        top="50%"
        transform="translate(-50%, -50%)"
      />
    </div>
    <span style={{
      color: isLocked ? theme.colors.grey['700'] : theme.colors.grey['900'],
      fontSize: '0.75rem' }}
    >{module.name}</span>
  </div>;
};
