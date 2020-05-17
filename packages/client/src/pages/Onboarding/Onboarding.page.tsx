import { Button, Options, RadioList, SliderField, TextField } from '@codement/ui';
import React, { useEffect, useState } from 'react';
import { Switch, useHistory } from 'react-router';

import { AppHeader } from '../../components/AppHeader/AppHeader';
import { PathsList, SelectedPath } from '../../components/PathsList/PathsList';
import { Me } from '../../containers/Me.container';
import { Wizard } from '../../containers/Wizard.container';
import { routes } from '../../router/routes';
import { OnboardingStep } from './OnboardingStep';
import { steps } from './steps';
import { SliderText } from './Wizard/Typography/SliderText';
import { LocalStorage } from '../../lib/localStorage';

export interface WizardFormValues {
  codingAbility: number;
  why: string;
  paths: SelectedPath[],
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

  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (LocalStorage.preferences) {
      setCodingAbility(
        Number(((LocalStorage.preferences as unknown) as WizardFormValues).codingAbility || 0)
      );
      setWhy(((LocalStorage.preferences as unknown) as WizardFormValues).why || '');
      setPaths(((LocalStorage.preferences as unknown) as WizardFormValues).paths || []);
      setPracticeGoal(
        Number(((LocalStorage.preferences as unknown) as WizardFormValues).practiceGoal || 0)
      );
    }
    setLoading(false);
  }, []);

  if (loading) return <></>;

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
        <SliderText value={codingAbility}>
          <SliderField
            value={codingAbility}
            onChange={(value: number) => setCodingAbility(value)}
          />
        </SliderText>
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
          color="success"
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
