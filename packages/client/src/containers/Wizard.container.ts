import { createContainer } from 'unstated-next';
import { useState, useEffect } from 'react';
import gql from 'graphql-tag';

import { UserPreferences } from '@codement/api';
import { useMutation } from '@apollo/react-hooks';
import { useHistory } from 'react-router';
import { routes } from '../router/routes';
import { SelectedPath } from '../components/PathsList/PathsList';
import { LocalStorage } from '../lib/localStorage';


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
  const [paths, setPaths] = useState<SelectedPath[]>([]);
  const [practiceGoal, setPracticeGoal] = useState(0);
  const wizardState = { codingAbility, why, paths, practiceGoal };

  const [updatePreferences] = useMutation<{
    updatePreferences: UserPreferences
  }>(updatePreferencesMutation);

  const [joinPathsMut] = useMutation<{ joinPaths: boolean }>(joinPaths);

  useEffect(() => {
    LocalStorage.preferences = JSON.stringify(wizardState);
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
