import { QuestionDragDrop } from '@codement/api';
import shuffle from 'lodash/shuffle';
import React, { useEffect, useMemo, useState } from 'react';
import styled from 'styled-components';
import { Lesson } from '../../../../../containers/Lesson.container';
import { Question } from '../../../../../containers/Question.container';
import { Code, CodeSlotValue } from '../../Code/Code';
import { DragAnswer } from './DragAnswer';

export interface QDragDropProps {
  question: QuestionDragDrop
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
`;

export const QDragDrop: React.FC<QDragDropProps> = ({ question: q }) => {
  const { setFooterButtonClick } = Lesson.useContainer();
  const { questionGrade, checkAnswer, gradeData } = Question.useContainer();

  const [values, setValues] = useState<(number | null)[]>(
    new Array(q.slots).fill(null) // Initialize to number of droppable slots
  );

  const options = useMemo(() => shuffle(q.options), [q.options]);

  const v = useMemo<CodeSlotValue[]>(
    () => values.map((_v, i) => ({
      value: (_v !== null) ? options[_v] : null,
      grade: gradeData ? gradeData[i] : null
    })),
    [values, questionGrade, options, gradeData]
  );


  const updateValue = (index: number, value: string | null) => {
    setValues(v => {
      const _v = [...v];
      _v[index] = value ? options.indexOf(value) : null;
      return _v;
    });
  }

  const remove = (idx: number) => {
    updateValue(idx, null);
  };

  const check = () => {
    checkAnswer(values.map(val => options[val!]));
  };

  // Once value is populated, enable footer button
  useEffect(() => {
    if (values.every(v => v !== null)) setFooterButtonClick(check);
  }, [values]);

  return <Wrapper>
    <Code
      code={q.code}
      values={v}
      drag
      onRemove={remove}
      onDrop={updateValue}
    />
    <RightSide>
      {options.map((o, i) => <DragAnswer
        value={o}
        key={o}
        used={values.includes(i)}
      />)}
    </RightSide>
  </Wrapper>;
};
