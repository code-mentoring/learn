import React from 'react';
import classnames from 'classnames';
import { Icon } from '@codement/ui';

interface LearnedConceptsProps {
  concepts: Concept[];
}

// TODO: Update with real concepts

const mockConcepts = [
  { name: 'Concept 1', icon: 'plus', learned: true },
  { name: 'Concept 2', icon: 'plus', learned: true },
  { name: 'Concept 3', icon: 'minus', learned: false }
];

export const LearnedConcepts: React.FC<LearnedConceptsProps> = ({ concepts }) =>
  <div className="flex flex-col items-center">
    <h4 className="text-center my-3">Learned concepts</h4>
    {mockConcepts.map(concept => <div className={classnames('w-10 h-10 border-2 rounded-circle mb-3 flex flex-col justify-center bg-secondary-100 text-secondary-600', {
      'text-grey-200 bg-white': !concept.learned })}>
      {concept.learned && <Icon icon={concept.icon} />}
    </div>)}
  </div>;
