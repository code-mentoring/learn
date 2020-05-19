import React from 'react';

import { routes } from '../../router/routes';
import { OnboardingStepProps } from './OnboardingStep';
import { CodingAbilityIcon } from './Wizard/FooterIcons/CodingAbility';
import { WelcomeIcon } from './Wizard/FooterIcons/Welcome';
import { WhyIcon } from './Wizard/FooterIcons/Why';
import { PathsIcon } from './Wizard/FooterIcons/Paths';
import { CompletedLeftIcon } from './Wizard/FooterIcons/CompletedLeft';
import { CompletedMiddleIcon } from './Wizard/FooterIcons/CompletedMiddle';
import { CompletedRightIcon } from './Wizard/FooterIcons/CompletedRight';
import { PracticeGoalIcon } from './Wizard/FooterIcons/PracticeGoal';
import { Emoji } from './Wizard/Typography/Emoji';

export enum WizardSteps {
  welcome = 'welcome',
  codingAbility = 'codingAbility',
  why = 'why',
  paths = 'paths',
  practiceGoal = 'practiceGoal',
  completed = 'completed'
}

export const steps: (OnboardingStepProps & { path: string })[] = [
  {
    path: routes.onboardingWorkflow(),
    intro: {
      title: <Emoji text="Welcome to Code Mentoring ! 🎉" />,
      text: <>We’re excited you’re with us. Really! To get you started,
        help us understand a little bit about you.</>
    },
    graphic: <WelcomeIcon />
  },
  {
    path: routes.onboardingWorkflowCodingAbility(),
    intro: {
      title: 'How would you rate your coding skills?',
      text: <>Don’t worry, there’s no wrong answer! We only ask so
        we can help you get to where you want to go.</>
    },
    graphic: <CodingAbilityIcon />,
    footerSteps: {
      step: WizardSteps.codingAbility,
      backLink: routes.onboardingWorkflow(),
      nextLink: routes.onboardingWorkflowWhy()
    }
  },
  {
    path: routes.onboardingWorkflowWhy(),
    intro: {
      title: <Emoji text="Great! So... Why are you here? 😀" />,
      text: <>Looking for a career change? Always been interested in coding?
        We will put this on your profile so others can get to know you better.</>
    },
    graphic: <WhyIcon />,
    footerSteps: {
      step: WizardSteps.why,
      backLink: routes.onboardingWorkflowCodingAbility(),
      nextLink: routes.onboardingWorkflowPaths()
    }
  },
  {
    path: routes.onboardingWorkflowPaths(),
    intro: {
      title: 'What are you interested in learning?',
      text: <>Choose some of the base <span className="text-tertiary-500 border-tertiary-300 border-b-2 border-dashed">paths</span> to get you started. You’ll unlock
        more as you go, but these are here to get you started.</>
    },
    graphic: <PathsIcon />,
    footerSteps: {
      step: WizardSteps.paths,
      backLink: routes.onboardingWorkflowWhy(),
      nextLink: routes.onboardingWorkflowPracticeGoal()
    }
  },
  {
    path: routes.onboardingWorkflowPracticeGoal(),
    intro: {
      title: 'Nice! How often do you want to practice?',
      text: <>We recommend building a daily habit for any skill you want to learn.
        We can help you stick to your goal.</>
    },
    graphic: <PracticeGoalIcon />,
    footerSteps: {
      step: WizardSteps.practiceGoal,
      backLink: routes.onboardingWorkflowPaths(),
      nextLink: routes.onboardingWorkflowCompleted()
    }
  },
  {
    path: routes.onboardingWorkflowCompleted(),
    intro: {
      title: 'You’re good to go!',
      text: 'Thanks for introducing yourself. Let’s start learning some code!'
    },
    graphic: <>
      <CompletedLeftIcon />
      <CompletedMiddleIcon />
      <CompletedRightIcon />
    </ >
  }
];
