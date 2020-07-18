import React from 'react';
import throttle from 'lodash/throttle';

export const useCountdown = (
  callback: (t: number) => void,
  time = 30000
) => {
  const requestRef = React.useRef<number>();
  const startTime = React.useRef<number>();

  // Ticker function
  const animate = throttle((t: number) => {
    if (!startTime.current) startTime.current = t;
    const delta = startTime.current - t;
    let remaining = Math.floor(time + delta);
    if (remaining < 0) remaining = 0;
    callback(remaining);
    if (remaining > 0) requestRef.current = requestAnimationFrame(animate);
  }, 100);

  // Kick off the process
  React.useEffect(() => {
    requestRef.current = requestAnimationFrame(animate);
    return () => cancelAnimationFrame(requestRef.current!);
  }, []); // Make sure the effect runs only once
};


export const millisecondsConvert = (milliSeconds: number) => {
  const s = String(Math.floor(milliSeconds / 1000)).padStart(2, '0');
  const ms = String(Math.floor((milliSeconds % 1000) / 60)).padStart(2, '0');
  return `${s}:${ms}`;
};
