import React from 'react';
import { Button } from '@code-mentoring/ui';

import { useHistory } from 'react-router';
import { WelcomeIcon } from '../../components/Wizard/FooterIcons/Welcome';
import { routes } from '../../router/routes';
import { Intro } from '../../components/Onboarding/Intro/Intro';
import { WizardIconsWrapper } from '../../components/Wizard/WizardIconsWrapper';
import { CenterWrapper } from '../../components/Wizard/CenterWrapper';

export const OnboardWelcome = () => {
  const history = useHistory();
  return <>
    <CenterWrapper>
      <Intro
        title="Welcome to Code Mentoring!"
        text="We are excited you're with us. Really! To get you started, help us understand a little bit about you."
      />
      <Button
        color="success"
        size="large"
        onClick={() => history.push(routes.onboardingWorkflowCodingAbility())}
      >
        Get started!
      </Button>
    </CenterWrapper>
    <WizardIconsWrapper>
      <WelcomeIcon />
    </WizardIconsWrapper>
  </>;
};
