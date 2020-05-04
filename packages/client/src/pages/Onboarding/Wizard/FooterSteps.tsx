import { Button } from '@code-mentoring/ui';
import classnames from 'classnames';
import React from 'react';
import { useHistory, useLocation } from 'react-router';
import { Link } from 'react-router-dom';

import { SelectedPath } from '../../../components/PathsList/PathsList';
import { Wizard } from '../../../containers/Wizard.container';
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
  submit,
  step
}) => {
  const history = useHistory();
  const location = useLocation();
  const { wizardState } = Wizard.useContainer();

  const state = wizardState[step as keyof typeof wizardState];

  return <div className={`absolute rightWiz bottomWiz flex items-center ${styles.footerSteps}`}>

    <h4 className="mr-32 w-20">
      <Link to={backLink}>Go back</Link>
    </h4>

    <div className="flex items-center">
      <div className="flex items-center">

        {Object.keys(wizardState as unknown as WizardSteps).map((key, i) => {
          let isFilled: boolean = false;

          if (Array.isArray(state)) {
            if ((state as SelectedPath[]).length > 0) isFilled = true;
          } else if (state) isFilled = true;

          return <span
            key={key}
            className={classnames('w-4 h-4 rounded-circle', {
              'ml-4': i !== 0,
              'bg-grey-200': !isFilled,
              'bg-green-400 border-0': isFilled,
              'border-2 border-primary-500 border-solid': location.pathname.includes(`/${key}`)
            })}
          />;
        })}
      </div>

      <Button
        className="ml-8"
        size="large"
        color="green"
        disabled={Boolean()}
        onClick={() => (submit ? submit() : history.push(nextLink!))}
      > Next </Button>

    </div>
  </div>;
};
