import throttle from 'lodash/throttle';
import React, { useMemo, useState, useEffect } from 'react';

import { StyledCardProgress } from './MemoryClock.styles';
import tickSound from './tick.wav';
import tockSound from './tock.wav';
import buzzerSound from './buzzer.wav';
import { millisecondsConvert, useCountdown } from './useTimer';

const audioTick = new Audio(tickSound);
const audioTock = new Audio(tockSound);
const buzzerAudio = new Audio(buzzerSound);


export interface MemoryClockProps {
  time?: number;
  running?: boolean;
  onDone?: () => void;
}


const MemoryClock: React.FC<MemoryClockProps> = ({
  time = 30000,
  running = false,
  onDone,
}) => {

  const [counter, setCounter] = useState(time);
  const formatted = useMemo(() => millisecondsConvert(counter), [counter]);

  useCountdown(timeLeft => {
    setCounter(timeLeft);
    if (timeLeft <= 0 && onDone) onDone();
  }, time, running);


  const playSound = useMemo(() => throttle((t: number) => {
    if (t <= 0) buzzerAudio.play();
    else if (t <= 10000) {
      const s = Math.round(t / 1000);
      const tick = s % 2 === 0;
      if (tick) audioTick.play();
      else audioTock.play();
    }
    // Only play once every second
  }, 1000), []);

  // Play sound on tick, or stop clock when stopped
  useEffect(() => {
    if (running) playSound(counter);
    else {
      // stopClock();
      playSound.cancel();
    }
  }, [running, counter])

  return <StyledCardProgress duration={counter} started={running}>
    {formatted}
  </StyledCardProgress>;
};

export default MemoryClock;
