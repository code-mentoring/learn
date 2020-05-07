import { Button, Options, RadioList, SliderField, TextField } from '@codement/ui';
import React from 'react';
import { Switch, useHistory } from 'react-router';

import { AppHeader } from '../../components/AppHeader/AppHeader';
import { PathsList, SelectedPath } from '../../components/PathsList/PathsList';
import { Me } from '../../containers/Me.container';
import { Wizard } from '../../containers/Wizard.container';
import { routes } from '../../router/routes';
import { OnboardingStep } from './OnboardingStep';
import { steps } from './steps';

export interface WizardFormValues {
  codingAbility: number;
  why: string;
  paths: string[],
  practiceGoal: number
}


export const OnboardingPage = () => {
  const history = useHistory();

  const {
    codingAbility,
    setCodingAbility,
    why,
    setWhy,
    paths,
    setPaths,
    practiceGoal,
    setPracticeGoal
  } = Wizard.useContainer();
  const { refetch } = Me.useContainer();

  const radioOptions: Options[] = [
    { label: 'Casual', value: 1, subLabel: '1 lesson / day' },
    { label: 'Regular', value: 2, subLabel: '2 lessons / day' },
    { label: 'Serious', value: 3, subLabel: '3 lessons / day' },
    { label: 'Hardcore', value: 4, subLabel: '4 lessons / day' }
  ];

  return <div className="relative h-screen overflow-hidden bg-white">
    <AppHeader minimal />
    <Switch>

      {/* 1. Welcome page */}
      <OnboardingStep {...steps[0]} exact>
        <Button
          color="success"
          size="large"
          onClick={() => history.push(routes.onboardingWorkflowCodingAbility())}
        > Get started! </Button>
      </OnboardingStep>


      {/* 2. Coding ability */}
      <OnboardingStep {...steps[1]}>
        <SliderField
          value={codingAbility}
          onChange={(value: number) => setCodingAbility(value)}
        />
      </OnboardingStep>


      {/* 3. Why */}
      <OnboardingStep {...steps[2]}>
        <TextField
          textarea
          rows={4}
          onChange={(e: React.ChangeEvent<HTMLTextAreaElement>) => setWhy(e.target.value)}
          placeholder="I'm here because..."
          value={why}
        />
      </OnboardingStep>


      {/* 4. Paths */}
      <OnboardingStep {...steps[3]}>
        <PathsList
          selectedPaths={paths}
          onChange={(selectedPaths: SelectedPath[]) => setPaths(selectedPaths)}
        />
      </OnboardingStep>


      {/* 5. Practice Goal */}
      <OnboardingStep {...steps[4]} submit>
        <RadioList
          name="practiceGoal"
          options={radioOptions}
          value={practiceGoal || 0}
          onChange={(value: number) => setPracticeGoal(value)}
        />
      </OnboardingStep>


      {/* 6. Completed */}
      <OnboardingStep {...steps[5]}>
        <Button
          size="large"
          color="green"
          onClick={async () => {
            // TODO: Update in Wizard after submission
            await refetch(); // Update the user preferences
            history.push(routes.home());
          }}
        >Start learning!</Button>
      </OnboardingStep>

    </Switch>
  </div>;
};
