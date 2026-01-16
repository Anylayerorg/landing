'use client';

import { useEffect, useRef, useState } from 'react';
import { useInView, useMotionValue, useSpring } from 'framer-motion';

type CounterProps = {
  value: number;
  suffix?: string;
  prefix?: string;
};

const Counter = ({ value, suffix = '', prefix = '' }: CounterProps) => {
  const ref = useRef<HTMLSpanElement | null>(null);

  // Use once: true to ensure it doesn't reset to 0 when scrolling away
  const isInView = useInView(ref, { amount: 0.3, once: true });

  const motionValue = useMotionValue(0);
  const springValue = useSpring(motionValue, {
    stiffness: 60,
    damping: 30,
  });

  const [displayValue, setDisplayValue] = useState(0);
  const [isMounted, setIsMounted] = useState(false);

  useEffect(() => {
    setIsMounted(true);
  }, []);

  useEffect(() => {
    if (isInView && isMounted) {
      motionValue.set(value);
    }
  }, [isInView, value, motionValue, isMounted]);

  useEffect(() => {
    if (!isMounted) return;
    const unsubscribe = springValue.on('change', (latest) => {
      setDisplayValue(Math.floor(latest));
    });
    return unsubscribe;
  }, [springValue, isMounted]);

  if (!isMounted) return <span>{prefix}0{suffix}</span>;

  return (
    <span ref={ref}>
      {prefix}
      {displayValue}
      {suffix}
    </span>
  );
};

export default Counter;
