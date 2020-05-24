import React from 'react';
import classnames from 'classnames';
import { Icon } from '@codement/ui';

interface LearnedConceptsProps {
  concepts: any[];
  learnedConcepts: any[];
}

export const LearnedConcepts: React.FC<LearnedConceptsProps> = ({
  concepts,
  learnedConcepts
}) => <div className="flex flex-col items-center absolute right-0 mr-6 w-20">
  <h4 className="text-center my-3">Learned concepts</h4>
  {concepts.map(concept => {
    const learned = learnedConcepts.map(lc => lc.id).includes(concept.id);
    return <div
      key={concept.id}
      className={classnames('w-10 h-10 border-2 rounded-circle mb-3 flex flex-col justify-center bg-secondary-100 text-secondary-600', {
        'text-grey-200 bg-white': !learned })}
    >
      {learned && <Icon icon={concept.icon} />}
    </div>;
  })}
</div>;
