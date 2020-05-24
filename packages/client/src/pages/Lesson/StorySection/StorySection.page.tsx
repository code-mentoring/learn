import React, { useState } from 'react';
import { Button, Icon } from '@codement/ui';
import { Lesson } from '@codement/api';

import { Character } from '../../../components/Character/Character';
import { CenterWrapper } from '../../Onboarding/Wizard/CenterWrapper';
import { LearnedConcepts } from '../LearnedConcepts';

export interface StorySectionPageProps {
  lesson: Lesson;
}

export interface StoryStepsProps {
  id: number;
  lessonId: number;
  order: number;
  content: string;
}

const mockStorySections = [
  { id: 1, lessonId: 1, lesson: { character: { name: 'ellie' } }, order: 0, content: 'Content 1' },
  { id: 2, lessonId: 1, lesson: { character: { name: 'ellie' } }, order: 1, content: 'Content 2', teaches: 1, concept: { id: 1, name: 'Concept 1', description: 'Concept 1 description', icon: 'plus', taughtIn: 1 } },
  { id: 3, lessonId: 1, lesson: { character: { name: 'ellie' } }, order: 2, content: 'Content 3', teaches: 1, concept: { id: 2, name: 'Concept 2', description: 'Concept 2 description', icon: 'plus', taughtIn: 1 } },
  { id: 4, lessonId: 1, lesson: { character: { name: 'ellie' } }, order: 3, content: 'Content 4', teaches: 1, concept: { id: 3, name: 'Concept 3', description: 'Concept 3 description', icon: 'plus', taughtIn: 1 } },
  { id: 5, lessonId: 1, lesson: { character: { name: 'ellie' } }, order: 4, content: 'Content 5', teaches: 1, concept: { id: 4, name: 'Concept 4', description: 'Concept 4 description', icon: 'plus', taughtIn: 1 } }
];

const mockLearnedConcepts = [
  { id: 1, lesson: 1 },
  { id: 2, lesson: 1 }
];


export const CharacterGraphic: React.FC = ({ children }) => <div className="absolute bottom-0 left-0 z-0">
  {children}
</div>;

export const StorySectionPage: React.FC<StorySectionPageProps> = ({ lesson }) => {

  const [learnedConcepts] = useState(mockLearnedConcepts);
  const [currentStorySection, setCurrentStorySection] = useState(mockStorySections[0]);
  const concepts = mockStorySections.map(c => c.concept).filter(c => c);
  const isLast = mockStorySections.length - 1 === currentStorySection.order;
  const [recap, setRecap] = useState(false);

  return <>
    <CenterWrapper>
      {recap
        ? <>
          <h1>So, to recap...</h1>
          <div className="flex">
            {concepts.map(c => <div key={c?.id} className="flex flex-col items-center">
              <Icon icon={c?.icon} size="large" />
              <div>{c?.name}</div>
              <div>{c?.description}</div>
            </div>)}

          </div>
          <Button>Begin lesson</Button>
        </>
        : currentStorySection.content || currentStorySection.concept?.description
    }
    </CenterWrapper>
    {!recap && <>
      <LearnedConcepts concepts={concepts} learnedConcepts={learnedConcepts} />
      <CharacterGraphic>
        <Character character={currentStorySection.lesson.character.name as 'ellie'} />
      </CharacterGraphic>
      <Button className="absolute bottom-0 mb-6 mx-auto inset-x-0" color="transparent" text size="large">
        <div
          className="text-grey-500"
          onClick={() => {
            if (isLast) {
              setRecap(true);
            } else {
              setCurrentStorySection(mockStorySections[currentStorySection.order + 1]);
            }
          }}
        >Next</div>
      </Button>
      <Button className="absolute bottom-0 mb-6 mr-6 right-0" color="transparent" text size="large">
        <div className="text-grey-500">Skip</div>
      </Button>
    </>}
  </>;
};
