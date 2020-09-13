import { Text, theme as t, Icon } from '@codement/ui';
import { Card, CardProps } from '@codement/ui/components/Card/Card';
import React from 'react';
import styled from 'styled-components';
import { LeaderboardContent } from './LeaderBoardContent';
import { LeaderboardNavTab } from './LeaderBoardTab';


const Widget = styled(Card)`
  h3 {
    display: flex;
    align-items: center;
    justify-content: center;
    text-align: center;
    margin-bottom: ${t.size('sm')};

    svg { margin-right: ${t.size('xsm')}}
  }
`;

const StyledIcon = styled(Icon)`
  margin-right: ${t.size('md')};
`;

export const LeaderboardWidget: React.FC<CardProps> = props =>
  <Widget {...props}>
    <Text variant="h3" color="grey.400" uppercase>
      <StyledIcon icon="starCircle" size="md" color="grey.400" />
      Leaderboard
    </Text>
    <LeaderboardNavTab />
    <LeaderboardContent />
  </Widget>;
