import { PathIcon, theme as t, PathIconType, MenuPop, Card, Text, Box, Icon } from '@codement/ui';
import React from 'react';
import styled from 'styled-components';

import { Paths } from '../../../containers/Paths.container';

const StyledPathSelector = styled.div``;

const CircleButton = styled.button`
  background: ${t.color('grey.100')};
  width: ${t.size('huge')};
  height: ${t.size('huge')};
  border-radius: 50%;
  display: flex;
  align-items: center;
  justify-content: center;
  cursor: pointer;
  transition: all 0.1s ease-out;
  &:hover { background: ${t.color('grey.200')}}
`;

const PathListCard = styled(Card)`
  svg { margin-right: ${t.size('sm')} }
  div {
    display: flex;
    align-items: center;
    text-transform: capitalize;
  }
`;

const PathItem = styled(Box)`
  padding: ${t.size('tiny')} ${t.size('sm')};
  cursor: pointer;

  &:hover { background: ${t.color('primary.100')}; }
`;

const PathList: React.FC = () => {
  const { myPaths, setCurrentPathId } = Paths.useContainer();
  return <PathListCard padding="none">
    {myPaths?.map(p => <PathItem
      padding="tiny"
      onClick={() => setCurrentPathId(p.id)}
    >
      <PathIcon icon={p.icon as PathIconType} size="big" />
      <Text> {p.name} </Text>
    </PathItem>)}
  </PathListCard>;
};


export const PathSelector = () => {
  const { currentPath } = Paths.useContainer();
  if (!currentPath) return <Icon icon="emptyIcon" size="huge" color="grey.100" />;

  return <StyledPathSelector>
    <MenuPop overlay={<PathList />} placement="bottom">
      <CircleButton>
        <PathIcon icon={currentPath.icon as PathIconType} size="lg" />
      </CircleButton>
    </MenuPop>
  </StyledPathSelector>;
};
