import React from 'react';
import { Switch, Route, RouteComponentProps } from 'react-router';

import { Button } from '@codement/ui';
import { Link } from 'react-router-dom';
import { Character } from '../../../components/Character/Character';
import { routes } from '../../../router/routes';
import { CenterWrapper } from '../../Onboarding/Wizard/CenterWrapper';
import { LearnedConcepts } from '../LearnedConcepts';
import { LessonHeader } from '../LessonHeader';

export interface StoryStepsProps {
  id: number;
  lessonId: number;
  order: number;
  content: string;
}

const mockStorySteps = [
  { id: 1, lessonId: 1, lesson: { character: { name: 'ellie' } }, order: 1, content: 'Content 1' },
  { id: 2, lessonId: 1, lesson: { character: { name: 'ellie' } }, order: 2, content: 'Content 2' },
  { id: 3, lessonId: 1, lesson: { character: { name: 'ellie' } }, order: 3, content: 'Content 3' },
  { id: 4, lessonId: 1, lesson: { character: { name: 'ellie' } }, order: 4, content: 'Content 4' },
  { id: 5, lessonId: 1, lesson: { character: { name: 'ellie' } }, order: 5, content: 'Content 5' }
];

export const StorySectionPage: React.FC<RouteComponentProps> = props => {
  console.log('PROPS', props);
  return <div className="relative h-screen overflow-hidden bg-white">
    <LessonHeader pathName="Intro to HTML" />
    <Switch>

      {/* 1. Sections */}
      {mockStorySteps.map(({ id, lessonId, order, content, lesson }) => <Route
        key={id}
        path={routes.lessonStory({
          lessonId,
          order
        })}
      >
        <CenterWrapper>{content}</CenterWrapper>
        <LearnedConcepts concepts={mockStorySteps} {...props} />
        <CharacterGraphic>
          <Character character={lesson.character.name as 'ellie'} />
        </CharacterGraphic>
        <Button
          className="absolute bottom-0 mb-6 mx-auto inset-x-0"
          icon="arrowBottom"
          color="transparent"
          iconColor="blue-500"
          iconSize={6}

          size="large"
        >
          <Link className="text-blue-500" to="/">Next</Link>
        </Button>
        <Button
          className="absolute bottom-0 mb-6 mr-6 right-0"
          icon="arrowRight"
          iconColor="grey-500"
          color="transparent"
          text
          size="large"
          iconSize={6}


        >
          <Link className="text-grey-500 ml-4 " to="/">Skip</Link>
        </Button>
      </Route>)}


      {/* 2. Recap */}
      {/* <Route path={routes.lessonStoryRecap()}>
        <h2>So, to recap...</h2>
        {mockStorySteps.map({})}
      </Route> */}

    </Switch>
  </div>;
};

export const CharacterGraphic: React.FC = ({ children }) => <div className="absolute bottom-0 left-0 z-0">
  {children}
</div>;
