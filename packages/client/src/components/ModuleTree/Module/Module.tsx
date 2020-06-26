import { Module as EModule } from '@codement/api';
import { Icon } from '@codement/ui';
import classnames from 'classnames';
import React from 'react';

import Hex from './hex.svg';
import styles from './Module.module.css';

export interface ModuleProps {
  module: EModule
}

export const Module: React.FC<ModuleProps> = ({
  module
}) => <div className={styles.module}>
  <div className="relative">
    <Hex
      className={classnames('h-12 stroke-2', {
        // TODO: Add completed to module
        completed: false
      })}
    />
    <Icon icon="fire" size="md" color="primary" />
  </div>
  <span className="text-xs">{module.name}</span>
</div>;
