import React from 'react';

import { Path } from '../../containers/Path.container';
import styles from './ModuleTree.module.css';
import { Module } from './Module/Module';


export interface ModuleTreeProps { }

export const ModuleTree: React.FC<ModuleTreeProps> = () => {

  const { currentPath, currentModules } = Path.useContainer();

  if (!currentPath) return null;

  return <div className={styles.tree}>
    <h1 className="my-5">{currentPath.name}</h1>

    <div className="modules">
      {currentModules?.map(m => <Module module={m} />)}
    </div>

  </div>;
};
