import React, { useState, useEffect } from 'react';
import tickSound from './tick-sound.mp3';
import tockSound from './tock-sound.mp3';

import { StyledCardProgress, StyledTimer } from './MemoryClock.styles';

export interface MemoryClockProps {
  time: number;
  onDone: (cb: any) => void;
}
const MemoryClock: React.FC<MemoryClockProps> = ({ time, onDone }) => {
  const [counter, setCounter] = useState(time);

  const [tickTockCounter, setTickTockCounter] = useState(0);

  const [animDuration, setAnimDuration] = useState<null | string>(null);

  const tickAudio = new Audio(tickSound);
  const tockAudio = new Audio(tockSound);

  function addTickTockSound(): void {
    setTickTockCounter(tickTockCounter + 1);
    if (tickTockCounter === 2) {
      tickAudio.play();
    }
    if (tickTockCounter === 4) {
      tockAudio.play();
      setTickTockCounter(0);
    }
  }

  useEffect(() => {
    const timer = counter > 0 && setInterval(() => setCounter(counter - 1), 1000);
    addTickTockSound();
    if (counter <= 10 && counter > 5) {
      setAnimDuration('1000ms');
    } else if (counter <= 5 && counter > 3) {
      setAnimDuration('500ms');
    } else if (counter <= 3 && counter > 2) {
      setAnimDuration('250ms');
    } else if (counter <= 2 && counter > 1) {
      setAnimDuration('125ms');
    } else if (counter <= 1) {
      setAnimDuration('62.5ms');
    }

    if (counter === 0) {
      setAnimDuration('0ms');
      return onDone((cb: any) => cb());
    }
    return () => clearInterval(Number(timer));
  }, [counter, onDone]);

  const min = counter > 60 ? Math.floor((counter % 3600) / 60) % 60 : 0;
  const sec = counter > 0 ? Math.floor((counter % 3600) % 60) : 0;

  const displayMin = min >= 10 ? String(min) : `0${String(min)}`;
  const displaySec = sec >= 10 ? String(sec) : `0${String(sec)}`;

  return (
    <StyledCardProgress duration={animDuration}>
      <StyledTimer duration={animDuration}>
        {displayMin} : {displaySec}
      </StyledTimer>
    </StyledCardProgress>
  );
};

export default MemoryClock;
