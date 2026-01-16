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

  const isInView = useInView(ref, { amount: 0.1, once: true });

  const motionValue = useMotionValue(0);
  const springValue = useSpring(motionValue, {
    stiffness: 40,
    damping: 20,
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

  // Fallback to ensure value shows even if animation doesn't trigger
  useEffect(() => {
    if (isMounted && !isInView) {
      const timer = setTimeout(() => {
        if (displayValue === 0) setDisplayValue(value);
      }, 2000);
      return () => clearTimeout(timer);
    }
  }, [isMounted, isInView, displayValue, value]);

  if (!isMounted) return <span>{prefix}{value}{suffix}</span>;

  return (
    <span ref={ref}>
      {prefix}
      {displayValue || value}
      {suffix}
    </span>
  );
};

export default Counter;
