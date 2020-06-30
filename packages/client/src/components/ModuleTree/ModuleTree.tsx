import { Card, Text, Loader, theme } from '@codement/ui';
import React from 'react';

import styled from 'styled-components';
import { Paths } from '../../containers/Paths.container';
import { Module } from './Module/Module';

export interface ModuleTreeProps { }

const StyledCard = styled(Card)`
  text-align: center;

  h2 {
    margin-bottom: ${theme.size('xl')};
  }
`;

export const ModuleTree: React.FC<ModuleTreeProps> = props => {

  const { currentPath, currentModules } = Paths.useContainer();

  return <StyledCard {...props}>
    {!currentPath
      ? <Loader />
      : <>
        <Text as="h2" color="grey.600">{currentPath.name}</Text>

        <div>
          {currentModules?.map(m => <Module module={m} />)}
        </div>
      </>
    }
  </StyledCard>;
};
