"use client";

import { motion } from "framer-motion";

interface SplitTextProps {
  text: string;
  className?: string;
}

export function SplitText({ text, className }: SplitTextProps) {
  const words = text.split(" ");

  return (
    <motion.span
      className={`inline-flex flex-wrap justify-center ${className}`}
      initial="hidden"
      whileInView="visible"
      viewport={{ amount: 0.6 }}
      variants={{
        hidden: {},
        visible: {
          transition: {
            staggerChildren: 0.04,
          },
        },
      }}
    >
      {words.map((word, i) => (
        <motion.span
          key={i}
          className="inline-block mr-[0.25em]"
          variants={{
            hidden: {
              opacity: 0,
            },
            visible: {
              opacity: 1,
              transition: {
                duration: 0.5,
                ease: "easeOut",
              },
            },
          }}
        >
          {word}
        </motion.span>
      ))}
    </motion.span>
  );
}
