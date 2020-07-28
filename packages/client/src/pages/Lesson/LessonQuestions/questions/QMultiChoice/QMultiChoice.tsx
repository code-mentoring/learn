import { QuestionMultiChoice } from '@codement/api';
import { Card, RadioList } from '@codement/ui';
import shuffle from 'lodash/shuffle';
import React, { useEffect, useMemo, useState } from 'react';
import styled from 'styled-components';
import { Lesson } from '../../../../../containers/Lesson.container';
import { Question } from '../../../../../containers/Question.container';
import { Code, CodeSlot } from '../../Code';

export interface QMultiChoiceProps {
  question: QuestionMultiChoice
}

const Wrapper = styled.div`
  display: flex;
  & > * {
    flex-basis: 50%;
    justify-content: center;
  }
`;

const RightSide = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  min-height: 60rem;

  ${Card} {
    min-width: 40rem;
  }
`;

export const QMultiChoice: React.FC<QMultiChoiceProps> = ({ question: q }) => {
  const { setFooterButtonClick } = Lesson.useContainer();
  const { questionGrade, checkAnswer } = Question.useContainer();
  const [value, setValue] = useState<number | null>(null);

  const options = useMemo(() => shuffle(q.options), [q.options]);

  const v = useMemo<CodeSlot>(() => ({
    value: (value !== null) ? options[value] : null,
    grade: questionGrade
  }), [value, questionGrade, options]);


  const check = () => {
    checkAnswer(options[value!]);
  };

  // Once value is populated, enable footer button
  useEffect(() => {
    if (value !== null && value !== undefined) setFooterButtonClick(check);
  }, [value]);

  return <Wrapper>
    <Code code={q.code} values={[v]} />
    <RightSide>
      <Card>
        <RadioList
          onChange={setValue}
          options={options.map((o, i) => ({
            label: o,
            value: i
          }))}
          disabled={questionGrade !== null}
        />
      </Card>
    </RightSide>
  </Wrapper>;
};
