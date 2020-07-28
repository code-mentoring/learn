import throttle from 'lodash/throttle';
import React from 'react';

export const useCountdown = (
  callback: (t: number) => void,
  time = 30000,
  running = false
) => {
  const requestRef = React.useRef<number>();
  const startTime = React.useRef<number>();

  // Ticker function
  const animate = (running:boolean) => throttle((t: number) => {
    if (!startTime.current) startTime.current = t;
    const delta = startTime.current - t;
    let remaining = Math.floor(time + delta);
    if (remaining < 0) remaining = 0;

    if (remaining > 0 && running) requestRef.current = requestAnimationFrame(animate(true));
    callback(remaining);
  }, 100); // 10 times a second

  // Kick off the process when stopped is set to false
  React.useEffect(() => {
    if (requestRef.current) window.cancelAnimationFrame(requestRef.current);
    if (running) requestRef.current = requestAnimationFrame(animate(running));
    else cancelAnimationFrame(requestRef.current!);
    return () => cancelAnimationFrame(requestRef.current!);
  }, [running]); // Make sure the effect runs only once
};


export const millisecondsConvert = (milliSeconds: number) => {
  const s = String(Math.floor(milliSeconds / 1000)).padStart(2, '0');
  const ms = String(Math.floor((milliSeconds % 1000) / 60)).padStart(2, '0');
  return `${s}:${ms}`;
};
