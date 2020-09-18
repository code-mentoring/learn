import { Icon, PathIcon, PathIconType, Text, theme as t } from '@codement/ui';
import React from 'react';

import styled from 'styled-components';
import { Paths } from '../../../containers/Paths.container';

const Widget = styled.div`
  text-align: center;
  justify-items: center;
  align-content: center;

  width:fit-content;
  height: ${t.size('huge')};
  padding: ${t.size('tiny')};

  display: grid;
  grid-template-columns: min-content auto;

  border: ${t.borders.main};
  box-sizing: border-box;
  border-radius: ${t.size('tiny')};

  div {
    font-weight: bold;
    text-align: left;
    padding: ${t.size('tiny')};
  }

  svg {
    display: inline-flex;
    align-self: center;
  }

`;

export const CurrentProgressWidget: React.FC<{}> = () => {

  const { currentPath } = Paths.useContainer();

  return <Widget>
    {currentPath
      ? <>
        <PathIcon icon={currentPath.icon as PathIconType} size="lg" />
        <div>
          <Text color="grey.500" uppercase>{currentPath.name}</Text>
          <Text variant="small" color="secondary.500">{currentPath.progress}% Completed</Text>
        </div>
      </>
      : <Icon icon="emptyIcon" size={3.2} color="grey.100" />}


  </Widget>;
};
