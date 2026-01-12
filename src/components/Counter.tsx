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

  // IMPORTANT: no `once: true`
  const isInView = useInView(ref, { amount: 0.6 });

  const motionValue = useMotionValue(0);
  const springValue = useSpring(motionValue, {
    stiffness: 100,
    damping: 30,
  });

  const [displayValue, setDisplayValue] = useState(0);

  useEffect(() => {
    if (isInView) {
      motionValue.set(value);
    } else {
      // reset when leaving viewport
      motionValue.set(0);
      setDisplayValue(0);
    }
  }, [isInView, value, motionValue]);

  useEffect(() => {
    const unsubscribe = springValue.on('change', (latest) => {
      setDisplayValue(Math.floor(latest));
    });
    return unsubscribe;
  }, [springValue]);

  return (
    <span ref={ref}>
      {prefix}
      {displayValue}
      {suffix}
    </span>
  );
};

export default Counter;
