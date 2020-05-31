import { Path } from '@codement/api';
import { Button } from '@codement/ui';
import classnames from 'classnames';
import React, { useEffect, useState } from 'react';
import { useHistory, useLocation } from 'react-router';
import { Link } from 'react-router-dom';

import { Wizard } from '../../../containers/Wizard.container';
import { routes } from '../../../router/routes';
import { WizardSteps } from '../steps';
import styles from './wizard.module.css';

export interface FooterStepsProps {
  step: WizardSteps;
  backLink: string;
  nextLink?: string,
  submit?: () => void;
}

export const FooterSteps: React.FunctionComponent<FooterStepsProps> = ({
  nextLink,
  backLink,
  submit
}) => {
  const history = useHistory();
  const location = useLocation();
  const { wizardState } = Wizard.useContainer();
  const [disable, setDisable] = useState(true);

  return <>
    <Button className="absolute bottom-0 mb-6 mx-auto inset-x-0" color="transparent" text size="large">
      <Link className="text-grey-500" to={backLink}>Go back</Link>
    </Button>
    <div className={`absolute rightWiz bottomWiz flex items-center ${styles.footerSteps}`}>
      <div className="flex items-center">
        <div className="flex items-center">

          {Object.keys(wizardState as unknown as WizardSteps).map((key, i) => {
            let isFilled: boolean = false;
            const state = wizardState[key as keyof typeof wizardState];

            let redirect: string;
            if (key === WizardSteps.codingAbility) {
              redirect = routes.onboardingWorkflowCodingAbility();
              isFilled = true;
            }
            if (key === WizardSteps.why) redirect = routes.onboardingWorkflowWhy();
            if (key === WizardSteps.paths) redirect = routes.onboardingWorkflowPaths();
            if (key === WizardSteps.practiceGoal) {
              redirect = routes.onboardingWorkflowPracticeGoal();
            }
            if (Array.isArray(state)) {
              if ((state as Path[]).length > 0) isFilled = true;
            } else if (state) isFilled = true;

            useEffect(() => {
              if (location.pathname.includes('codingAbility')) {
                setDisable(false);
              }
              if (location.pathname.includes('why')) {
                setDisable(!wizardState.why);
              }
              if (location.pathname.includes('paths')) {
                setDisable(!(wizardState.paths.length > 0));
              }
              if (location.pathname.includes('practiceGoal')) {
                setDisable(!(wizardState.practiceGoal && wizardState.why
                  && wizardState.paths.length > 0));
              }
            }, [location.pathname, wizardState]);

            return <span
              key={key}
              className={classnames('w-4 h-4 rounded-circle', {
                'ml-4': i !== 0,
                'bg-grey-200 pointer-events-none': !isFilled,
                'bg-green-400 border-0': isFilled,
                'border-2 border-primary-500 border-solid': location.pathname.includes(`/${key}`)
              })}
              onClick={() => history.push(redirect)}
              onKeyDown={() => history.push(redirect)}
              role="button"
              tabIndex={0}
              aria-label="steps"
            />;
          })}
        </div>

        <Button
          className="ml-8"
          size="large"
          color="success"
          disabled={Boolean(disable)}
          onClick={() => (submit ? submit() : history.push(nextLink!))}
        > Next </Button>

      </div>
    </div>
  </>;
};
