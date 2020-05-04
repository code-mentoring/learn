import React from 'react';
import { Route } from 'react-router';

import classnames from 'classnames';
import { Wizard } from '../../containers/Wizard.container';
import { CenterWrapper } from './Wizard/CenterWrapper';
import { FooterSteps, FooterStepsProps } from './Wizard/FooterSteps';
import { WizardIconsWrapper } from './Wizard/WizardIconsWrapper';

export interface OnboardingStepProps {
  path: string;
  intro: {
    className?: string;
    title: string;
    text: string;
  };
  graphic: React.ReactNode;
  footerSteps?: FooterStepsProps
  submit?: boolean;
}

export const OnboardingStep: React.FC<OnboardingStepProps> = ({
  path,
  intro,
  graphic,
  footerSteps,
  submit,
  children
}) => {
  const { submit: submitWizard } = Wizard.useContainer();
  return <Route exact path={path}>
    <CenterWrapper>
      <div className={classnames('flex flex-col items-center', intro.className)}>
        <h3 className="mb-3">{intro.title}</h3>
        <p className="text-center mb-8">{intro.text}</p>
      </div>
      {children}
    </CenterWrapper>

    <WizardIconsWrapper> {graphic} </WizardIconsWrapper>

    {footerSteps && <FooterSteps
      {...footerSteps}
      submit={submit ? submitWizard : undefined}
    />}
  </Route>;
};
