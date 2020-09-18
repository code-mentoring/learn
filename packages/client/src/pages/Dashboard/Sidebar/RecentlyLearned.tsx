import React from 'react';
import { Icon, PathIcon, PathIconType, Text } from '@codement/ui';
import { SectionHeader, SectionBody } from './DashbaordSideBar.styles';

// TODO: need to be replaced by real API and move to DashBoard.container
// it should return 3 eletments
const recentlyLearned = [
  {
    pathIcon: 'html',
    lessonName: 'Intro to Attributes'
  },
  {
    pathIcon: 'css',
    lessonName: 'CSS Display'
  },
  {
    pathIcon: 'js',
    lessonName: 'Javascript Objects'
  }
];

export const RecentlyLearned : React.FC<{}> = () =>
  <>
    <SectionHeader>
      <Icon icon="history" color="grey.400" size="big" />
      <Text color="grey.400" fontWeight="bold" uppercase>Recently learned</Text>
    </SectionHeader>
    <SectionBody rows={2}>
      {
        recentlyLearned.map(x =>
          <div key={x.lessonName}>
            <PathIcon icon={x.pathIcon as PathIconType} size="lg" />
            <Text color="grey.600" fontSize="xsm">{x.lessonName}</Text>
          </div>)
      }
    </SectionBody>
  </>;
