import throttle from 'lodash/throttle';
import React, { useMemo, useState } from 'react';

import { StyledCardProgress } from './MemoryClock.styles';
import tickSound from './tick.wav';
import tockSound from './tock.wav';
import buzzerSound from './buzzer.wav';
import { millisecondsConvert, useCountdown } from './useTimer';

const audioTick = new Audio(tickSound);
const tockAudio = new Audio(tockSound);
const buzzerAudio = new Audio(buzzerSound);


export interface MemoryClockProps {
  time?: number;
  onDone?: () => void;
}


const MemoryClock: React.FC<MemoryClockProps> = ({
  time = 12000,
  onDone
}) => {
  const [counter, setCounter] = useState(time);

  const playSound = throttle((t: number) => {
    if (t <= 0) buzzerAudio.play();
    else {
      const s = Math.round(t / 1000);
      const tick = s % 2 === 0;
      if (tick) audioTick.play();
      else tockAudio.play();
    }
  }, 1000);

  useCountdown(timeLeft => {
    setCounter(timeLeft);
    playSound(timeLeft);
    if (timeLeft <= 0 && onDone) onDone();
  }, time);

  const formatted = useMemo(
    () => millisecondsConvert(counter),
    [counter]
  );

  return <StyledCardProgress duration={counter}>
    {formatted}
  </StyledCardProgress>;
};

export default MemoryClock;
