import React from 'react';
import { Route } from 'react-router';

import classnames from 'classnames';
import styled from 'styled-components';
import { Wizard } from '../../containers/Wizard.container';
import { CenterWrapper } from './Wizard/CenterWrapper';
import { FooterSteps, FooterStepsProps } from './Wizard/FooterSteps';
import { WizardIconsWrapper } from './Wizard/WizardIconsWrapper';

export interface OnboardingStepProps {
  path: string;
  intro: {
    className?: string;
    title: React.ReactNode;
    text: React.ReactNode;
  };
  graphic: React.ReactNode;
  footerSteps?: FooterStepsProps
  submit?: boolean;
  exact?: boolean;
}

const Styledp = styled.p`
font-size: 1.125rem;
text-align: center;
margin-bottom: 2rem;
`;

export const OnboardingStep: React.FC<OnboardingStepProps> = ({
  path,
  intro,
  graphic,
  footerSteps,
  submit,
  children,
  exact
}) => {
  const { submit: submitWizard } = Wizard.useContainer();
  return <Route exact={exact} path={path}>
    <CenterWrapper>
      <div className={classnames('flex flex-col items-center', intro.className)}>
        <h3>{intro.title}</h3>
        <Styledp>{intro.text}</Styledp>
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
