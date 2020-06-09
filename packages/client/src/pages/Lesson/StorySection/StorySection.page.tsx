import React, { useState, Dispatch, SetStateAction } from 'react';
import { Button, Icon } from '@codement/ui';
import { Lesson } from '@codement/api';
import { Prompt } from 'react-router';

import { CenterWrapper } from '../../Onboarding/Wizard/CenterWrapper';
import { LearnedConcepts } from '../LearnedConcepts';
import { Character } from '../../../components/Character/Character';
import { Path } from '../../../containers/Path.container';

export interface StorySectionPageProps {
  lesson: Lesson;
  setSkipped: Dispatch<SetStateAction<boolean>>;
}

export const CharacterGraphic: React.FC = ({ children }) => <div className="absolute bottom-0 left-0 z-0">
  {children}
</div>;

export const StorySectionPage: React.FC<StorySectionPageProps> = ({ lesson, setSkipped }) => {
  const { currentPath } = Path.useContainer();
  lesson.storySection.sort((a, b) => a.order - b.order);

  const [recap, setRecap] = useState(false);
  const [currentStorySection, setCurrentStorySection] = useState(lesson.storySection[0]);

  const [learnedConcepts, setLearnedConcepts] = useState<string[]>([]);
  const concepts = lesson.storySection.map(c => c.concept).filter(c => c);
  const isLast = lesson.storySection.length === currentStorySection.order;

  const handleNextButton = async () => {
    if (isLast) {
      setRecap(true);
      try {
        // await learnConcept({ variables: { conceptId: currentStorySection.teachesId } });
      } catch (e) {
        // TODO: show a notfification
      }
    } else {
      setLearnedConcepts(learnedConcepts.concat([currentStorySection.conceptId]));
      setCurrentStorySection(
        lesson.storySection
          .find(s => s.order === currentStorySection.order + 1)!
      );
    }
  };

  return <>
    <Prompt
      when={!recap}
      message="Are you sure you want to leave?"
    />
    <CenterWrapper>
      <h1>{recap ? 'So, to recap...' : currentStorySection.concept.name}</h1>
      <div className="flex">
        {recap
          ? concepts.map(c => <div key={c?.id} className="flex flex-col items-center">
            <Icon icon="plus" size="large" />
            <div>{c?.name}</div>
            <div>{c?.description}</div>
          </div>)
          : currentStorySection.concept?.description || currentStorySection.content }
      </div>
      {recap && <Button>Begin lesson</Button>}
    </CenterWrapper>
    {!recap && <>
      <LearnedConcepts concepts={concepts} learnedConcepts={learnedConcepts} />
      <CharacterGraphic>
        <Character character={currentPath?.character?.name as 'ellie'} />
      </CharacterGraphic>
      <Button className="absolute bottom-0 mb-6 mx-auto inset-x-0" color="transparent" text size="large">
        <div
          className="text-grey-500"
          onClick={handleNextButton}
          onKeyDown={(e: React.KeyboardEvent<HTMLDivElement>) => {
            if (e.key === 'Enter') {
              handleNextButton();
            }
          }}
          role="button"
          tabIndex={0}
        >Next</div>
      </Button>
      <Button onClick={() => setSkipped(true)} className="absolute bottom-0 mb-6 mr-6 right-0" color="transparent" text size="large">
        <div className="text-grey-500">Skip</div>
      </Button>
    </>}
  </>;
};
