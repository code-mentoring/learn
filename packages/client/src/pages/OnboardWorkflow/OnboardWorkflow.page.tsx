import React from 'react';
import { Switch, Route } from 'react-router';

import { routes } from '../../router/routes';
import { OnboardWelcome } from './OnboardWelcome.page';
import { OnboardCodingAbility } from './OnboardCodingAbility.page';
import { OnboardWhy } from './OnboardWhy.page';
import { OnboardPaths } from './OnboardPaths.page';
import { OnboardPracticeGoal } from './OnboardPracticeGoal.page';
import { OnboardCompleted } from './OnboardCompleted.page';
import { Wizard } from '../../containers/Wizard.container';
import { AppHeader } from '../../components/AppHeader/AppHeader';

export enum EWizardSteps {
  welcome = 'welcome',
  codingAbility = 'codingAbility',
  why = 'why',
  paths = 'paths',
  practiceGoal = 'practiceGoal',
  completed = 'completed'
}

export interface WizardFormValues {
  codingAbility: number;
  why: string;
  paths: string[],
  practiceGoal: number
}

export const OnboardingWorkflowPage = () => <div className="relative h-screen overflow-hidden bg-white">
  <AppHeader minimal />
  <Switch>
    <Route exact path={routes.onboardingWorkflow()} component={OnboardWelcome} />
    <Route path={routes.onboardingWorkflowCompleted()} component={OnboardCompleted} />
    <Wizard.Provider>
      <Route path={routes.onboardingWorkflowCodingAbility()} component={OnboardCodingAbility} />
      <Route path={routes.onboardingWorkflowWhy()} component={OnboardWhy} />
      <Route path={routes.onboardingWorkflowPaths()} component={OnboardPaths} />
      <Route path={routes.onboardingWorkflowPracticeGoal()} component={OnboardPracticeGoal} />
    </Wizard.Provider>
  </Switch>
</div>;
