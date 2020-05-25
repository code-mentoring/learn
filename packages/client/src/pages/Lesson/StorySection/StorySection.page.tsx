import React, { useState } from 'react';
import { Button, Icon, Loader } from '@codement/ui';
import { Lesson, UserConcept } from '@codement/api';
import { useQuery, useMutation } from '@apollo/react-hooks';
import gql from 'graphql-tag';

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

const getLearnedConcept = gql`
query {
  userLearnedConcepts {
    id
    conceptId
    learned
    concept {
      id
      name
      icon
      taughtInId
      taughtIn{
        id
        pathId
      }
    }
  }
}`;

const learnedConcept = gql`
mutation learnConcept($conceptId: String!) {
  learnConcept(conceptId: $conceptId)
}`;
export const CharacterGraphic: React.FC = ({ children }) => <div className="absolute bottom-0 left-0 z-0">
  {children}
</div>;

export const StorySectionPage: React.FC<StorySectionPageProps> = ({ lesson }) => {

  const { data, loading } = useQuery<{userLearnedConcepts: UserConcept[]}>(getLearnedConcept);
  const learnedConcepts = data?.userLearnedConcepts.map(lc => lc.concept) || [];

  const [currentStorySection, setCurrentStorySection] = useState(lesson.storySection[0]);
  const [currentLearnedConcepts, setLearnedConcept] = useState(learnedConcepts);
  const concepts = lesson.storySection.map(c => c.teaches).filter(c => c);
  const isLast = lesson.storySection.length - 1 === currentStorySection.order;
  const [recap, setRecap] = useState(false);

  if (loading) return <Loader />;

  const handleNextButton = async () => {
    if (isLast) {
      setRecap(true);
    } else {
      setCurrentStorySection(lesson.storySection[currentStorySection.order + 1]);
      currentLearnedConcepts.push(currentStorySection.teaches);
      setLearnedConcept(currentLearnedConcepts);
      useMutation<{conceptId: string}>(
        learnedConcept,
        { variables: { conceptId: currentStorySection.teachesId } }
      );
    }
  };

  return <>
    <CenterWrapper>
      <h1>{recap ? 'So, to recap...' : currentStorySection.teaches.name}</h1>
      <div className="flex">
        {recap
          ? concepts.map(c => <div key={c?.id} className="flex flex-col items-center">
            <Icon icon="plus" size="large" />
            <div>{c?.name}</div>
            <div>{c?.description}</div>
          </div>)
          : currentStorySection.teaches?.description || currentStorySection.content }
   
      </div>
      {recap && <Button>Begin lesson</Button>}
    </CenterWrapper>
    {!recap && <>
      <LearnedConcepts concepts={concepts} learnedConcepts={currentLearnedConcepts} />
      <CharacterGraphic>
        <Character character={lesson.module?.path?.character?.name as 'ellie'} />
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
      <Button className="absolute bottom-0 mb-6 mr-6 right-0" color="transparent" text size="large">
        <div className="text-grey-500">Skip</div>
      </Button>
    </>}
  </>;
};
