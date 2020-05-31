import { generatePath } from 'react-router';
import { CONFIG } from '../config';

interface Params {
  [key: string]: number | string;
}

export const linkParams = <T extends Params = {}>(
  link: string,
  usePrefix = true
) =>
    (params?: T | false) => {
      const l = `${usePrefix ? CONFIG.prefix : ''}${link}`;
      if (params === false) return l;

      return generatePath(l, params);
    };

export const routes = {
  login: linkParams('/login'),
  logout: linkParams('/logout'),

  // Authed
  home: linkParams('/'),
  users: linkParams('/users'),

  // Onboarding workflow
  onboardingWorkflow: linkParams('/welcome'),
  onboardingWorkflowCodingAbility: linkParams('/welcome/codingAbility'),
  onboardingWorkflowWhy: linkParams('/welcome/why'),
  onboardingWorkflowPaths: linkParams('/welcome/paths'),
  onboardingWorkflowPracticeGoal: linkParams('/welcome/practiceGoal'),
  onboardingWorkflowCompleted: linkParams('/welcome/completed')
};
