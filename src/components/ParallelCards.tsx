"use client";

import { motion, useScroll, useTransform } from "framer-motion";
import Image from "next/image";
import { useRef, useState, useEffect } from "react";
import { SplitText } from "./SplitText";

const data = [
  {
    title: "Human identity signals",
    description:
      "Human Trust measures the credibility, reliability, and behavioral consistency of a real person without exposing their private data.",
    line2:
      "It is built from identity proofs, behavioral signals, achievements, and verifiable reputation.",
    image: "/human-identity.svg",
    signals: [
      { icon: "ic-chatgpt.svg", label: "ChatGpt" },
      { icon: "ic-anthropic.svg", label: "Anthropic" },
      { icon: "ic-mistral.svg", label: "Mistral" },
      { icon: "ic-meta.svg", label: "Meta" },
      { icon: "ic-docker.svg", label: "Docker" },
      { icon: "ic-gemini.svg", label: "Gemini" },
    ],
  },
  {
    title: "Wallet activity rotation",
    description:
      "Wallet Trust evaluates how trustworthy a blockchain wallet is based entirely on on-chain patterns, behavior, risk signals, and historical performance.",
    line2:
      "It is risk intelligence + behavioral analytics + reputation scoring combined into a trust value.",
    image: "/wallet-activity.svg",
    signals: [
      { icon: "ic-chatgpt.svg", label: "ChatGpt" },
      { icon: "ic-anthropic.svg", label: "Anthropic" },
      { icon: "ic-mistral.svg", label: "Mistral" },
      { icon: "ic-meta.svg", label: "Meta" },
      { icon: "ic-docker.svg", label: "Docker" },
      { icon: "ic-gemini.svg", label: "Gemini" },
    ],
  },
  {
    title: "AI verified behavior",
    description:
      "AI Agent Trust measures how reliable, predictable, and safe an autonomous agent is.",
    line2:
      "Anylayer gives every AI agent a .zks identity and evaluates its behavior over time.",
    image: "/ai-verified.svg",
    signals: [
      { icon: "ic-chatgpt.svg", label: "ChatGpt" },
      { icon: "ic-anthropic.svg", label: "Anthropic" },
      { icon: "ic-mistral.svg", label: "Mistral" },
      { icon: "ic-meta.svg", label: "Meta" },
      { icon: "ic-docker.svg", label: "Docker" },
      { icon: "ic-gemini.svg", label: "Gemini" },
    ],
  },
];

export default function ParallelCards({ sectionId }: { sectionId: string }) {
  const CARD_HEIGHT = 662;
  const IMAGE_VIEWPORT_HEIGHT = 534;

  const containerRef = useRef<HTMLDivElement>(null);
  const total = data.length;
  const [active, setActive] = useState(0);

  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start start", "end end"],
  });

  const translateY = useTransform(
    scrollYProgress,
    [0, 1],
    [0, -(total - 1) * IMAGE_VIEWPORT_HEIGHT]
  );

  useEffect(() => {
    return scrollYProgress.on("change", (v) => {
      setActive(Math.min(total - 1, Math.floor(v * total)));
    });
  }, [scrollYProgress, total]);

  return (
    <section id={sectionId} className="relative py-10 md:py-32">
      {/* ================= HEADER ================= */}
      <div className="relative z-10 max-w-[47rem] mx-auto text-center px-5">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ amount: 0.6 }}
          transition={{ duration: 0.6 }}
          className="mb-4 inline-flex items-center gap-3 rounded-full bg-white/5 px-6 py-3"
        >
          <span className="text-sm text-white/50">
            Human, Wallet & AI Agent
          </span>
        </motion.div>

        <h2 className="text-[1.5rem] md:text-[1.875rem] lg:text-[3.25rem] font-medium text-white mb-6 leading-tight">
          <SplitText text="Three dimension of trust for the digital internet" />
        </h2>

        <p className="text-white/60 max-w-md mx-auto">
          <SplitText text="Trust becomes a reusable asset that follows users across applications and chains." />
        </p>
      </div>

      {/* ================= DESKTOP (STICKY PARALLAX) ================= */}
      <div className="hidden md:block">
        <div
          ref={containerRef}
          style={{ height: `${total * 100}vh` }}
          className="relative mt-16"
        >
          <div className="sticky top-20 h-screen flex items-center">
            {/* Gradient */}
            <div className="absolute inset-0 -z-10 rounded-[20px] bg-[linear-gradient(to_bottom,#0C0C11_12%,#231B3D_32%,#4E3391_60%,rgba(91,108,222,0.67)_70%,#0C0C11_100%)]" />

            <div
              className="bg-[#121119] rounded-[20px] mx-auto w-full max-w-screen-xl px-12 py-16"
              style={{ height: CARD_HEIGHT }}
            >
              <div className="grid grid-cols-2 gap-16 h-full">
                {/* IMAGE COLUMN */}
                <div
                  className="relative overflow-hidden flex justify-center"
                  style={{ height: IMAGE_VIEWPORT_HEIGHT }}
                >
                  <motion.div style={{ y: translateY }}>
                    {data.map((item, i) => (
                      <div
                        key={i}
                        className="flex items-center justify-center"
                        style={{ height: IMAGE_VIEWPORT_HEIGHT }}
                      >
                        <Image
                          src={item.image}
                          alt={item.title}
                          width={320}
                          height={320}
                          className="object-contain"
                        />
                      </div>
                    ))}
                  </motion.div>
                </div>

                {/* TEXT COLUMN */}
                <div className="flex flex-col justify-between">
                  <div>
                    <motion.h3
                      key={active}
                      initial={{ opacity: 0 }}
                      animate={{ opacity: 1 }}
                      transition={{ duration: 0.4 }}
                      className="text-3xl text-white mb-6"
                    >
                      {data[active].title}
                    </motion.h3>

                    <p className="text-white/60 mb-2">
                      {data[active].description}
                    </p>
                    <p className="text-white/60">
                      {data[active].line2}
                    </p>

                    <div className="flex gap-4 mt-8">
                      {data[active].signals.map((s, i) => (
                        <Image
                          key={i}
                          src={s.icon}
                          alt={s.label}
                          width={18}
                          height={18}
                        />
                      ))}
                    </div>
                  </div>

                  {/* INDICATORS */}
                  <div className="space-y-3 pt-10">
                    {data.map((item, i) => (
                      <div
                        key={i}
                        className={`flex gap-4 ${
                          i === active ? "text-white" : "text-white/40"
                        }`}
                      >
                        <span>{String(i + 1).padStart(2, "0")}</span>
                        <span className="uppercase text-sm">
                          {item.title}
                        </span>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* ================= MOBILE (NORMAL SCROLL) ================= */}
      <div className="md:hidden mt-16 space-y-8 px-5">
        {data.map((item, sectionIndex) => (
          <div
            key={sectionIndex}
            className="relative rounded-[20px] bg-[#121119] px-6 py-10 overflow-hidden"
          >
            <div className="absolute inset-0 -z-10 bg-[linear-gradient(to_bottom,#0C0C11_12%,#231B3D_32%,#4E3391_60%,rgba(91,108,222,0.67)_70%,#0C0C11_100%)]" />

            <h3 className="text-xl text-white mb-4">{item.title}</h3>
            <p className="text-white/60 mb-2 text-sm">{item.description}</p>
            <p className="text-white/60 mb-6 text-sm">{item.line2}</p>

            <div className="flex gap-4  mb-10">
              {item.signals.map((s, i) => (
                <Image
                  key={i}
                  src={s.icon}
                  alt={s.label}
                  width={18}
                  height={18}
                />
              ))}
            </div>

            <div className="flex justify-center">
              <Image
                src={item.image}
                alt={item.title}
                width={240}
                height={240}
                className="object-contain"
              />
            </div>

            <div className="mt-10">
              {data.map((item, i) => (
                      <div
                        key={i}
                        className={`flex gap-4 mb-2 ${
                          i === sectionIndex ? "text-white" : "text-white/40"
                        }`}
                      >
                        <span>{String(i + 1).padStart(2, "0")}</span>
                        <span className="uppercase text-sm">
                          {item.title}
                        </span>
                      </div>
                    ))}
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}
