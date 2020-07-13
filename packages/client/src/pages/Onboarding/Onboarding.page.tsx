import { Button, Options, RadioList, SliderField, Text, TextField } from '@codement/ui';
import { Me } from '@codement/ui/lib/containers/Me.container';
import React, { useMemo } from 'react';
import Emoji from 'react-emoji-render';
import { Redirect, useHistory } from 'react-router-dom';

import { AppHeader } from '../../components/AppHeader/AppHeader';
import { PathsList } from '../../components/PathsList/PathsList';
import { Onboarding } from '../../containers/Onboarding.container';
import { routes } from '../../router/routes';
import { BackButton, Center, Footer, Graphic, NextButton, Step, StyledPage, Wrapper } from './Onboarding.styles';
import { SliderText } from './Slider';
import { steps } from './steps';


const radioOptions: Options[] = [
  { label: 'Casual', value: 1, subLabel: '1 lesson / day' },
  { label: 'Regular', value: 2, subLabel: '2 lessons / day' },
  { label: 'Serious', value: 3, subLabel: '3 lessons / day' },
  { label: 'Hardcore', value: 4, subLabel: '4 lessons / day' }
];


export const OnboardingPage = () => {

  const { me } = Me.useContainer();
  const history = useHistory();
  const { goTo, page, values, setValue, step, valid, hold } = Onboarding.useContainer();

  const content = useMemo(() => {
    switch (page) {
      /* 1. Welcome page */
      case 0: return <Button
        color="secondary"
        size="large"
        onClick={() => goTo(1)}
      > Get started! </Button>;


      /* 2. Coding ability */
      case 1: return <SliderText value={values.codingAbility}>
        <SliderField
          value={values.codingAbility}
          onChange={v => setValue('codingAbility', v)}
        />
      </SliderText>;


      /* 3. Why */
      case 2: return <TextField
        textarea
        rows={4}
        onChange={(e: React.ChangeEvent<HTMLTextAreaElement>) => setValue('why', e.target.value)}
        placeholder="I'm here because..."
        value={values.why}
      />;


      /* 4. Paths */
      case 3: return <PathsList
        selectedPaths={values.paths}
        onChange={v => setValue('paths', v)}
      />;


      /* 5. Practice Goal */
      case 4: return <RadioList
        name="practiceGoal"
        options={radioOptions}
        value={values.practiceGoal || 0}
        onChange={v => setValue('practiceGoal', v)}
      />;


      /* 6. Completed */
      case 5: return <Button
        size="large"
        color="secondary"
        onClick={() => history.push(routes.home())}
      > Start learning! </Button>;

      default: return null;
    }
  }, [step, values]);


  // If the user has already filled out form, redirect.
  // "hold" is used here to wait for the last page ONLY on first time
  if (me?.userPreferences && !hold) return <Redirect to={routes.home()} />;

  return <StyledPage title="Welcome to Code Mentoring!">
    <AppHeader minimal />

    <Wrapper>
      <Center>
        <Text variant="h2"><Emoji text={step.title} /></Text>
        <Text>{step.text}</Text>
        {content}
      </Center>
    </Wrapper>

    <Graphic>{step.graphic}</Graphic>

    {(page !== 0) && (page !== steps.length - 1) && <Footer>
      {new Array(steps.length - 2).fill(1).map((_, i) => <Step
        active={(i + 1) === page}
        completed={valid[i + 1]}
        onClick={() => goTo(i + 1)}
      />)}
      <BackButton
        text
        size="large"
        onClick={() => goTo(page - 1)}
      >Back</BackButton>
      <NextButton
        size="large"
        color="secondary"
        disabled={!valid[page]}
        onClick={() => goTo(page + 1)}
      > Next </NextButton>
    </Footer>}
  </StyledPage>;
};
