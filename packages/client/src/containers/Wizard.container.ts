import { createContainer } from 'unstated-next';
import { useState } from 'react';

import { SelectedPath } from '../components/PathsList/PathsList';


const useWizard = () => {
  const [codingAbility, setCodingAbility] = useState(0);
  const [why, setWhy] = useState('');
  const [paths, setPaths] = useState<SelectedPath[]>([]);
  const [practiceGoal, setPracticeGoal] = useState(0);

  const wizardState = {
    codingAbility,
    why,
    paths,
    practiceGoal
  };

  return {
    codingAbility,
    setCodingAbility,
    why,
    setWhy,
    paths,
    setPaths,
    practiceGoal,
    setPracticeGoal,
    wizardState
  };
};

export const Wizard = createContainer(useWizard);
