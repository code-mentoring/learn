import React from 'react';
import classnames from 'classnames';

import { Module as EModule, UserModule, UserConcept } from '@codement/api';
import { Icon, theme } from '@codement/ui';
import styles from './Module.module.css';
import { Hexagon } from './hexagon';
import { Circle } from './circle';
import { Octagon } from './octagon';

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

  const statusClass = classnames({
    [`${styles.completed}`]: isCompleted,
    [`${styles.open}`]: isOpen,
    [`${styles.locked}`]: isLocked
  });

  return <div className={styles.module}>
    <div className="relative">
      { module.type === 'lesson'
        && <Hexagon className={classnames('h-12', statusClass)} /> }

      { module.type === 'assignment'
        && <Octagon className={classnames('h-12', statusClass)} /> }

      { module.type !== 'assignment'
        && <Circle className={classnames('absolute h-4', statusClass, styles.circle)} /> }

      {/* completed status with check mark in the circle. */}
      { module.type !== 'assignment'
        && isCompleted
        && <Icon icon="check" size={3} color="white" className={styles.check} /> }

      {/* open status with number of completed concepts in the circle. */}
      { module.type !== 'assignment'
        && isOpen
        && <span className={styles.number}>{myConcepts?.length} </span>}

      <Icon icon="fire" size={4} color={isLocked ? 'grey-500' : 'white'} />
    </div>
    <span style={{
      color: isLocked ? theme.colors.grey['700'] : theme.colors.grey['900'],
      fontSize: `${0.75}rem` }}
    >{module.name}</span>
  </div>;
};
