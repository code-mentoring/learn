import React from 'react';
import { RadioList, Options } from '@code-mentoring/ui';
import gql from 'graphql-tag';
import { useMutation } from '@apollo/react-hooks';
import { UserPreferences } from '@code-mentoring/api';

import { useHistory } from 'react-router';
import { PracticeGoalIcon } from '../../components/Wizard/FooterIcons/PracticeGoal';
import { Wizard } from '../../containers/Wizard.container';
import { Intro } from '../../components/Onboarding/Intro/Intro';
import { EWizardSteps } from './OnboardWorkflow.page';
import { routes } from '../../router/routes';
import { FooterSteps } from '../../components/Wizard/FooterSteps';
import { WizardIconsWrapper } from '../../components/Wizard/WizardIconsWrapper';
import { CenterWrapper } from '../../components/Wizard/CenterWrapper';


const updatePreferencesMutation = gql`
mutation updatePreferences($preferences: UserPreferencesInput!) {
  updatePreferences(preferences: $preferences) {
    id
    why
    practiceGoal
    codingAbility
  }
}
`;

const joinPaths = gql`
mutation joinPaths($paths: [String!]!) {
  joinPaths(paths: $paths) 
}
`;

export const OnboardPracticeGoal = () => {
  const history = useHistory();
  const { paths, why, codingAbility, practiceGoal, setPracticeGoal } = Wizard.useContainer();
  const [updatePreferences] = useMutation<{
    updatePreferences: UserPreferences
  }>(updatePreferencesMutation);
  const [joinPathsMut] = useMutation<{joinPaths: boolean}>(joinPaths);

  const radioOptions: Options[] = [
    { label: 'Casual', value: 1, subLabel: '1 lesson / day' },
    { label: 'Regular', value: 2, subLabel: '2 lessons / day' },
    { label: 'Serious', value: 3, subLabel: '3 lessons / day' },
    { label: 'Hardcore', value: 4, subLabel: '4 lessons / day' }
  ];

  return <>
    <CenterWrapper>
      <Intro
        title="Nice! How often do you want to practice?"
        text="We recommend building a daily habit for any skill you want to learn. We can help you stick to your goal."
      />
      <RadioList
        name="practiceGoal"
        options={radioOptions}
        value={practiceGoal || 0}
        onChange={(value: number) => setPracticeGoal(value)}
      />
    </CenterWrapper>
    <WizardIconsWrapper>
      <PracticeGoalIcon />
    </WizardIconsWrapper>
    <FooterSteps
      step={EWizardSteps.practiceGoal}
      backLink={routes.onboardingWorkflowPaths()}
      submit={async () => {
        try {
          await joinPathsMut({ variables: { paths } });
          await updatePreferences({ variables: { preferences: {
            why,
            codingAbility,
            practiceGoal
          } } });
          history.push(routes.onboardingWorkflowCompleted());
        } catch (e) {
          // TODO: Add a notification here
        }
      }}
    />
  </>;
};
