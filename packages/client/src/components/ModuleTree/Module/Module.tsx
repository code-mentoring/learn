import React from 'react';
import { Module as EModule } from '@codement/api';
import classnames from 'classnames';
import { Icon } from '@codement/ui';
import { primary } from '@codement/ui/css/colors';
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
    <Icon icon="fire" size="medium" color={primary['500']} />
  </div>
  <span className="text-xs">{module.name}</span>
</div>;
