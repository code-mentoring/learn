import React from 'react';
import { TextField } from '@code-mentoring/ui';

import { routes } from '../../router/routes';
import { Intro } from '../../components/Onboarding/Intro/Intro';
import { EWizardSteps } from './OnboardWorkflow.page';
import { Wizard } from '../../containers/Wizard.container';
import { FooterSteps } from '../../components/Wizard/FooterSteps';
import { WizardIconsWrapper } from '../../components/Wizard/WizardIconsWrapper';
import { CenterWrapper } from '../../components/Wizard/CenterWrapper';
import { WhyIcon } from '../../components/Wizard/FooterIcons/Why';


export const OnboardWhy = () => {
  const { why, setWhy } = Wizard.useContainer();

  return <>
    <CenterWrapper>
      <Intro
        title="Great! So... Why are you here?"
        text="Looking for a career change? Always been interested in coding? We will put this on your profile so others can get to know you better."
      />
      <TextField
        textarea
        rows={4}
        onChange={(e: React.ChangeEvent<HTMLTextAreaElement>) => setWhy(e.target.value)}
        placeholder="I'm here because..."
        value={why}
      />
    </CenterWrapper>
    <WizardIconsWrapper>
      <WhyIcon />
    </WizardIconsWrapper>
    <FooterSteps
      backLink={routes.onboardingWorkflowCodingAbility()}
      nextLink={routes.onboardingWorkflowPaths()}
      step={EWizardSteps.why}
    />
  </>;
};
