import React, { useState, useEffect } from 'react';

export interface MemoryClockProps {
  time: number;
}

export const MemoryClock: React.FC<MemoryClockProps> = ({ time = 10 }) => {
  //let timeMillisec = time * 1000;
  const timeMillisec = time * 1000;

  const [counter, setCounter] = useState(timeMillisec);

  useEffect(() => {
    const timer =
      counter > 0 && setInterval(() => setCounter(counter - 1), 1000);
    return () => clearInterval(Number(timer));
  }, [counter]);

  return <div>CounterTest: {counter}</div>;
};
