import React from 'react';

import styled from 'styled-components';
import { Path } from '../../containers/Path.container';
import styles from './ModuleTree.module.css';
import { Module } from './Module/Module';

export interface ModuleTreeProps { }

const PathTitle = styled.h1`
margin-top: 1.25rem;
margin-bottom: 1.25rem;
`;

export const ModuleTree: React.FC<ModuleTreeProps> = () => {

  const { currentPath, currentModules } = Path.useContainer();

  if (!currentPath) return null;

  return <div className={styles.tree}>
    <PathTitle>{currentPath.name}</PathTitle>

    <div className="modules">
      {currentModules?.map(m => <Module module={m} />)}
    </div>

  </div>;
};
