import React from 'react';
import { Module as EModule } from '@codement/api';
import classnames from 'classnames';
import { Icon, theme } from '@codement/ui';
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
    <Icon icon="fire" size="medium" color={theme.colors.primary['500']} />
  </div>
  <span className="text-xs">{module.name}</span>
</div>;
