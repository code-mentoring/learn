import React, { useState, useEffect } from 'react';

export interface MemoryClockProps {
  time: number;
}

export const MemoryClock: React.FC<MemoryClockProps> = ({ time = 10 }) => {
  const [counter, setCounter] = useState(time);

  let displayMin = counter > 60 ? Math.floor((counter % 3600) / 60) % 60 : 0;
  let displaySec = counter > 0 ? Math.floor((counter % 3600) % 60) : 0;

  useEffect(() => {
    const timer =
      counter > 0 && setInterval(() => setCounter(counter - 1), 1000);
    return () => clearInterval(Number(timer));
  }, [counter]);

  return (
    <div>
      {displayMin} : {displaySec}
    </div>
  );
};
