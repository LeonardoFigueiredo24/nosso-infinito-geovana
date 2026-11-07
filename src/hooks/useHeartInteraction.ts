'use client';
import { useCallback, useEffect, useRef, useState } from 'react';

/** A interação acumula 2,4 s. Um toque também inicia o gesto acessível. */
export function useHeartInteraction() {
  const [progress, setProgress] = useState(0);
  const [active, setActive] = useState(false);
  const [tapped, setTapped] = useState(false);
  const elapsed = useRef(0);
  const ready = progress >= 1;
  useEffect(() => {
    if ((!active && !tapped) || ready) return;
    let previous = performance.now();
    const timer = window.setInterval(() => {
      const now = performance.now();
      elapsed.current = Math.min(2400, elapsed.current + Math.min(now - previous, 100));
      previous = now;
      setProgress(elapsed.current / 2400);
    }, 40);
    return () => clearInterval(timer);
  }, [active, tapped, ready]);
  const touch = useCallback(() => setTapped(true), []);
  return { progress, active, ready, touch, setActive };
}
