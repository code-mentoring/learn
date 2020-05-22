import React from 'react';
import classnames from 'classnames';
import { Icon } from '@codement/ui';
import { RouteComponentProps } from 'react-router';
import { StoryStepsProps } from './StorySection/StorySection.page';

interface LearnedConceptsProps {
  concepts: StoryStepsProps[];
  pathIcon?: string;
}

export const LearnedConcepts: React.FC<RouteComponentProps & LearnedConceptsProps> = ({
  concepts,
  pathIcon,
  match
}) => <div className="flex flex-col items-center absolute right-0 mr-6 w-20">
  <h4 className="text-center my-3">Learned concepts</h4>
  {concepts.map(concept => {
    //@ts-ignore
    const learned = parseInt(match.params.order!) > concept.order;
    return <div
      key={concept.id}
      className={classnames('w-10 h-10 border-2 rounded-circle mb-3 flex flex-col justify-center bg-secondary-100 text-secondary-600', {
        'text-grey-200 bg-white': !learned })}
    >
         
      {
       //@ts-ignore
      learned && <Icon icon={pathIcon || 'plus'} />}
    </div>;
  })}
</div>;
