import { QuestionMemory } from '@codement/api';
import { theme as t } from '@codement/ui';
import shuffle from 'lodash/shuffle';
import React, { useEffect, useMemo, useState } from 'react';
import styled from 'styled-components';
import { Question } from '../../../../../containers/Question.container';
import MemoryClock from './MemoryClock/MemoryClock';
import { MemoryGameCard } from './MemoryGameCard/MemoryGameCard';

export interface QMemoryProps {
  question: QuestionMemory
}

const MemoryGame = styled.div`
  display: grid;
  justify-items: center;
  flex-basis: 100%;
  grid-template-columns: repeat(4, 1fr);
  grid-gap: ${t.size()};
  padding: ${t.size('big')};
`;

const ClockRow = styled.div`
  grid-column: span 4;
`;

export const QMemory: React.FC<QMemoryProps> = ({ question: q }) => {
  const { completeQuestion, questionGrade } = Question.useContainer();
  const [flip1, setFlip1] = useState<number>();
  const [flip2, setFlip2] = useState<number>();
  const [correct, setCorrect] = useState<number[]>([]);
  const [clockRunning, setClockRunning] = useState(false);


  // Get randomized list of cards with their answers
  const [answers, cards] = useMemo(() => {
    // Turn the pairs into sorted, combined strings as a single array of strings
    const a = q.pairs.reduce((_a, cur) => {
      _a.push(cur.sort().join(':'));
      return _a;
    }, []);
    const c = shuffle(q.pairs.flat());
    return [a, c];
  }, [q]);


  // On card click, flip first, then the second
  const flip = (i: number) => {
    if (!clockRunning) setClockRunning(true); // Start the clock on the first click
    if (flip1 === undefined) return setFlip1(i);
    if (flip2 === undefined) setFlip2(i);
  };

  const resetFlip = () => {
    setFlip1(undefined);
    setFlip2(undefined);
  };

  // Handle flips
  useEffect(() => {
    if (flip1 === undefined || flip2 === undefined) return;
    const answer = [cards[flip1], cards[flip2]].sort().join(':');
    // If the answers don't match
    if (!answers.includes(answer)) {
      setTimeout(resetFlip, 500);
    } else {
      setCorrect(c => [...c, flip1, flip2]);
      resetFlip();
    }
  }, [flip1, flip2]);


  // Handle all answers correct
  useEffect(() => {
    if (correct.length === cards.length) {
      completeQuestion(true);
    }
  }, [correct]);


  // Stop the clock once completed
  useEffect(() => {
    if (questionGrade !== null) setClockRunning(false);
  }, [questionGrade]);

  return <MemoryGame>
    <ClockRow>
      <MemoryClock
        onDone={() => completeQuestion(false)}
        running={clockRunning}
      />
    </ClockRow>

    {cards.map((c, i) => {
      const isCorrect = correct.includes(i);
      const state = isCorrect ? 'correct' : (questionGrade !== null) ? 'incorrect' : undefined;
      return <MemoryGameCard
        flipped={isCorrect || [flip1, flip2].includes(i)}
        onClick={state ? undefined : () => flip(i)}
        state={state}
        // eslint-disable-next-line react/no-array-index-key
        key={i}
      >{c}</MemoryGameCard>;
    })}
  </MemoryGame>;
};
