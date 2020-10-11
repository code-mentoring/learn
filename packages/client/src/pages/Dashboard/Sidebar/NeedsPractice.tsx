import React from 'react';
import { Icon, PathIcon, PathIconType, Text } from '@codement/ui';
import { SectionBody } from './DashboardSideBar.styles';
import { SectionHeader } from '../../../components/AppSidebar/SectionHeader';

// TODO: need to be replaced by real API and move to DashBoard.container
// it should return 8 eletments
const needsPractice = [
  {
    pathIcon: 'html',
    lessonName: 'Intro to headers'
  },
  {
    pathIcon: 'css',
    lessonIcon: 'plus',
    lessonName: 'CSS Tag selectors'
  },
  {
    pathIcon: 'js',
    lessonName: 'Javascript Varables'
  },
  {
    pathIcon: 'html',
    lessonName: 'Intro to List'
  },
  {
    pathIcon: 'css',
    lessonName: 'Intro to Align'
  },
  {
    pathIcon: 'js',
    lessonName: 'Javascript operators'
  },
  {
    pathIcon: 'html',
    lessonName: 'Intro to Elements'
  },
  {
    pathIcon: 'css',
    lessonName: 'Intro to position'
  }
];

export const NeedsPractice : React.FC<{}> = () =>
  <>
    <SectionHeader>
      <Icon icon="puzzle" color="grey.400" size="big" />
      <Text color="grey.400" fontWeight="bold" uppercase>Needs Practice</Text>
    </SectionHeader>
    <SectionBody rows={4}>
      {
        needsPractice.map(x =>
          <div key={x.lessonName}>
            <PathIcon icon={x.pathIcon as PathIconType} size="lg" />
            <Text color="grey.600" fontSize="xsm">{x.lessonName}</Text>
          </div>)
      }
    </SectionBody>
  </>;
