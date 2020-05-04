import 'rc-slider/assets/index.css';

import React from 'react';
import { SliderField } from '@code-mentoring/ui';

import { CodingAbilityIcon } from '../../components/Wizard/FooterIcons/CodingAbility';
import { Intro } from '../../components/Onboarding/Intro/Intro';
import { routes } from '../../router/routes';
import { EWizardSteps } from './OnboardWorkflow.page';
import { Wizard } from '../../containers/Wizard.container';
import { FooterSteps } from '../../components/Wizard/FooterSteps';
import { WizardIconsWrapper } from '../../components/Wizard/WizardIconsWrapper';
import { CenterWrapper } from '../../components/Wizard/CenterWrapper';


export const OnboardCodingAbility = () => {
  const { codingAbility, setCodingAbility } = Wizard.useContainer();

  return <>
    <CenterWrapper>
      <Intro
        title="How would you rate your coding codingAbility?"
        text="Don't worry, there is no wrong answer! We only ask so we can help you get to where you want to go"
      />
      <SliderField value={codingAbility} onChange={(value: number) => setCodingAbility(value)} />
    </CenterWrapper>
    <WizardIconsWrapper>
      <CodingAbilityIcon />
    </WizardIconsWrapper>
    <FooterSteps
      step={EWizardSteps.codingAbility}
      backLink={routes.onboardingWorkflow()}
      nextLink={routes.onboardingWorkflowWhy()}
    />
  </>;
};
