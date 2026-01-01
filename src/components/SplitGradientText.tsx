"use client";

import { motion } from "framer-motion";

type Chunk =
  | { type: "text"; value: string }
  | { type: "gradient"; value: string };

export function SplitGradientText({
  chunks,
  className,
}: {
  chunks: Chunk[];
  className?: string;
}) {
  return (
    <motion.h2
      className={className}
      initial="hidden"
      whileInView="visible"
      viewport={{ amount: 0.6}}
      variants={{
        hidden: {},
        visible: {
          transition: {
            staggerChildren: 0.04,
          },
        },
      }}
    >
      {chunks.map((chunk, i) => (
        <span key={i} className="">
          {chunk.value.split(" ").map((word, j) => (
            <motion.span
              key={j}
              className={`inline-block mr-[0.25em] ${
                chunk.type === "gradient"
                  ? "bg-gradient-to-r from-blueprimary to-lightblueprimary bg-clip-text text-transparent"
                  : ""
              }`}
              variants={{
                hidden: { opacity: 0 },
                visible: {
                  opacity: 1,
                  transition: { duration: 0.45, ease: "easeOut" },
                },
              }}
            >
              {word}
            </motion.span>
          ))}
        </span>
      ))}
    </motion.h2>
  );
}
