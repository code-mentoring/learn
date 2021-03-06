import React from 'react';
import { PathIcon, PathIconType, Text } from '@codement/ui';
import { SectionBody } from './DashboardSideBar.styles';
import { SectionHeader } from '../../../components/AppSidebar/SectionHeader';

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
    <SectionHeader icon="history">
      Recently learned
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
