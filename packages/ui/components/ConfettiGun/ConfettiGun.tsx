import React, { useRef, useEffect } from 'react';
import confetti from 'canvas-confetti';

export const ConfettiGun = () => {
  const canvas = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    if (!canvas.current) return;

    const count = 200;

    const blast = (config: confetti.Options) => {
      const fire = (particleRatio: number, opts: confetti.Options) => {
        confetti({
          ...opts,
          particleCount: Math.floor(count * particleRatio),
          ...config
        });
      };

      fire(0.25, {
        spread: 26,
        startVelocity: 55
      });
      fire(0.2, {
        spread: 60
      });
      fire(0.35, {
        spread: 100,
        decay: 0.91
      });
      fire(0.1, {
        spread: 120,
        startVelocity: 25,
        decay: 0.92
      });
      fire(0.1, {
        spread: 120,
        startVelocity: 45
      });
    };


    blast({
      angle: 325,
      origin: { x: 0, y: 0 }
    });

    blast({
      angle: 215,
      origin: { x: 1, y: 0 }
    });

  }, [canvas.current]);

  return <canvas ref={canvas} />;
};
