import React from 'react';

import { PathsIcon } from '../../components/Wizard/FooterIcons/Paths';
import { Wizard } from '../../containers/Wizard.container';
import { Intro } from '../../components/Onboarding/Intro/Intro';
import { PathsList, SelectedPath } from '../../components/PathsList/PathsList';
import { routes } from '../../router/routes';
import { EWizardSteps } from './OnboardWorkflow.page';
import { FooterSteps } from '../../components/Wizard/FooterSteps';
import { WizardIconsWrapper } from '../../components/Wizard/WizardIconsWrapper';
import { CenterWrapper } from '../../components/Wizard/CenterWrapper';


export const OnboardPaths = () => {
  const { paths, setPaths } = Wizard.useContainer();

  return <>
    <CenterWrapper>
      <Intro
        title="What are you interested in learning?"
        text="Choose some of the base paths to get you started. You'll unlock more as you go, but these are here to get you started."
      />
      <PathsList
        selectedPaths={paths}
        onChange={(selectedPaths: SelectedPath[]) => setPaths(selectedPaths)}
      />
    </CenterWrapper>
    <WizardIconsWrapper>
      <PathsIcon />
    </WizardIconsWrapper>
    <FooterSteps
      backLink={routes.onboardingWorkflowWhy()}
      nextLink={routes.onboardingWorkflowPracticeGoal()}
      step={EWizardSteps.paths}
    />
  </>;
};
