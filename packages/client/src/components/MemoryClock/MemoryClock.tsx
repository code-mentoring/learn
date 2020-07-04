import React, { useState, useEffect } from 'react';

export interface MemoryClockProps {
  time: number;
}

export const MemoryClock: React.FC<MemoryClockProps> = ({ time = 10 }) => {
  const [counter, setCounter] = useState(time);

  const [tickTockCounter, setTickTockCounter] = useState(0);

  useEffect(() => {
    const timer =
      counter > 0 && setInterval(() => setCounter(counter - 1), 1000);
    addTickTockSound();

    return () => clearInterval(Number(timer));
  }, [counter]);

  function addTickTockSound(): void {
    setTickTockCounter(tickTockCounter + 1);
    if (tickTockCounter === 2) {
      console.log('play TICK sound');
    }
    if (tickTockCounter === 4) {
      console.log('play TOCK sound');
      setTickTockCounter(0);
    }
  }

  const min = counter > 60 ? Math.floor((counter % 3600) / 60) % 60 : 0;
  const sec = counter > 0 ? Math.floor((counter % 3600) % 60) : 0;

  const displayMin = min >= 10 ? String(min) : `0${String(min)}`;
  const displaySec = sec >= 10 ? String(sec) : `0${String(sec)}`;

  return (
    <div>
      {displayMin} : {displaySec}
    </div>
  );
};
