import { useMutation } from '@apollo/react-hooks';
import { Path, UserPreferences } from '@codement/api';
import gql from 'graphql-tag';
import { useEffect, useState } from 'react';
import { useHistory } from 'react-router';
import { createContainer } from 'unstated-next';

import { LocalStorage } from '@codement/ui/lib/localStorage';
import { routes } from '../router/routes';


const updatePreferencesMutation = gql`
  mutation updatePreferences($preferences: UserPreferencesInput!) {
    updatePreferences(preferences: $preferences) {
      id
      why
      practiceGoal
      codingAbility
    }
  }`;

const joinPaths = gql`mutation
joinPaths($paths: [String!]!) {
  joinPaths(paths: $paths)
}`;


const useWizard = () => {
  const history = useHistory();
  const [codingAbility, setCodingAbility] = useState(0);
  const [why, setWhy] = useState('');
  const [paths, setPaths] = useState<Path[]>([]);
  const [practiceGoal, setPracticeGoal] = useState(0);
  const wizardState = { codingAbility, why, paths, practiceGoal };

  const [updatePreferences] = useMutation<{
    updatePreferences: UserPreferences
  }>(updatePreferencesMutation);

  const [joinPathsMut] = useMutation<{ joinPaths: boolean }>(joinPaths);

  useEffect(() => {
    LocalStorage.onbordingPreferences = wizardState;
  }, [wizardState]);

  const submit = async () => {
    try {
      await joinPathsMut({ variables: { paths } });
      await updatePreferences({
        variables: {
          preferences: {
            why,
            codingAbility,
            practiceGoal
          }
        }
      });
      history.push(routes.onboardingWorkflowCompleted());
    } catch (e) {
      // TODO: Add a notification here
    }
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
    wizardState,
    submit
  };
};

export const Wizard = createContainer(useWizard);
