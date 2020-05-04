import React from 'react';
import { Button } from '@code-mentoring/ui';
import { useHistory } from 'react-router';

import { CompletedLeftIcon } from '../../components/Wizard/FooterIcons/CompletedLeft';
import { CompletedMiddleIcon } from '../../components/Wizard/FooterIcons/CompletedMiddle';
import { CompletedRightIcon } from '../../components/Wizard/FooterIcons/CompletedRight';
import { Me } from '../../containers/Me.container';
import { Intro } from '../../components/Onboarding/Intro/Intro';
import { routes } from '../../router/routes';
import { WizardIconsWrapper } from '../../components/Wizard/WizardIconsWrapper';
import { CenterWrapper } from '../../components/Wizard/CenterWrapper';

export const OnboardCompleted = () => {
  const history = useHistory();
  const { refetch } = Me.useContainer();

  return <>
    <CenterWrapper>
      <Intro
        title="You are good to go!"
        text="Thanks for introducing yourself. Let's start learning some code!"
      />
      <Button
        size="large"
        color="green"
        onClick={async () => {
          await refetch();
          history.push(routes.home());
        }}
      >Start learning!</Button>
    </CenterWrapper>
    <WizardIconsWrapper>
      <CompletedLeftIcon />
      <CompletedMiddleIcon />
      <CompletedRightIcon />
    </WizardIconsWrapper>
  </>;
};
