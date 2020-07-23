import React, { useState, useMemo, useEffect } from 'react';
import { QuestionMultiChoice } from '@codement/api';
import { Code, CodeSlot } from '../../Code';
import { RadioList, Card } from '@codement/ui';
import styled from 'styled-components';
import { Lesson } from '../../../../../containers/Lesson.container';

export interface QMultiChoiceProps {
  question: QuestionMultiChoice
}

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
  const {setFooterButtonClick, completeQuestion, questionGrade: questionState} = Lesson.useContainer();
  const [value, setValue] = useState<number | null>(null);

  const v = useMemo<CodeSlot>(() => ({
    value: (value !== null) ? q.options[value] : null,
    grade: questionState
  }), [value, questionState]);

  const check = () => {
    // TODO: API call
    completeQuestion(false);
  };

  // Once value is populated, enable footer button
  useEffect(() => {
    if (value !== null && value !== undefined) setFooterButtonClick(check);
  }, [value]);

  return <>
    <Code code={q.code} values={[v]} />
    <RightSide>
      <Card>
        <RadioList
          onChange={setValue}
          options={q.options.map((o, i) => ({
            label: o,
            value: i
          }))}
        />
      </Card>
    </RightSide>
  </>
}
