"use client";

import { motion, useScroll, useTransform } from "framer-motion";
import Image from "next/image";
import { useRef, useState, useEffect } from "react";
import {
  Briefcase,
  GraduationCap,
  User,
  Linkedin,
  ArrowLeftRight,
  Layers,
  Landmark,
  ImageIcon,
  Cpu,
} from "lucide-react";

const data = [
  {
    title: "Human identity signals",
    description:
      "Human Trust measures the credibility, reliability, and behavioral consistency of a real person without exposing their private data. ",
    line2: "It is built from identity proofs, behavioral signals, achievements, and verifiable reputation.",
    image: "/human-identity.svg",
    signals: [
      { icon: Linkedin, label: "Socials" },
      { icon: Briefcase, label: "Profession" },
      { icon: GraduationCap, label: "Education" },
      { icon: User, label: "Identity" },
    ],
  },
  {
    title: "Wallet activity rotation",
    description:
      "Wallet Trust evaluates how trustworthy a blockchain wallet is based entirely on on-chain patterns, behavior, risk signals, and historical performance. ",
    line2: "It is not just wallet age, It is risk intelligence + behavioral analytics + reputation scoring combined into a trust value.",
    image: "/wallet-activity.svg",
    signals: [
      { icon: ArrowLeftRight, label: "Swaps" },
      { icon: Layers, label: "Staking" },
      { icon: Landmark, label: "Governance" },
      { icon: ImageIcon, label: "NFTs" },
    ],
  },
  {
    title: "AI verified behavior",
    description:
      "AI Agent Trust measures how reliable, predictable, and safe an autonomous agent is. As AI systems begin performing tasks, making decisions, or even moving funds, they need identity, accountability, and trust—just like humans. ",
    line2: "Anylayer gives every AI agent a .zks identity and evaluates its behavior over time.",
    image: "/ai-verified.svg",
    signals: [
      { icon: Cpu, label: "Automation" },
    ],
  },
];

export default function ParallelCards({sectionId}: {sectionId: string}) {
  const CARD_HEIGHT = 662;
  const IMAGE_VIEWPORT_HEIGHT = 534; // visible image area
  const containerRef = useRef<HTMLDivElement>(null);
  const sectionRef = useRef<HTMLDivElement>(null);
  const total = data.length;
  const [active, setActive] = useState(0);

  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start start", "end end"],
  });
  /** Sticky gradient reveal (vertical, not opacity) */
  const gradientY = useTransform(
    scrollYProgress,
    [0.05, 0.3],
    ["20%", "0%"]
  );

  /* 🔑 ONE IMAGE PER SCROLL STEP */
  const translateY = useTransform(
    scrollYProgress,
    [0, 1],
    [0, -(total - 1) * IMAGE_VIEWPORT_HEIGHT]
  );

  /* Active index */
  useEffect(() => {
    return scrollYProgress.on("change", (v) => {
      setActive(Math.min(total - 1, Math.floor(v * total)));
    });
  }, [scrollYProgress]);

  return (
    <section className="py-32 relative" id={sectionId}
      ref={sectionRef}>
      <div className="flex flex-wrap justify-between items-center gap-2 z-10 relative">
        <motion.div
          initial={{ opacity: 0, y: 50 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ amount: 0.6 }}
          transition={{ duration: 0.6, delay: 0.2 }}
          className="max-w-[47rem] mx-auto flex flex-wrap justify-center items-center "
        >
          <div className="mb-3 inline-flex items-center justify-center gap-3 rounded-full bg-white/5 px-6 py-3">
            <span className="text-sm text-white/50">Human, Wallet & AI Agent</span>
          </div>
          <h2 className="text-[1.5rem] md:text-[1.875rem] lg:text-[3.25rem] font-medium text-primaryText mb-6 leading-tight text-center">
            {" "}
            Three dimension of trust for the digital internet
          </h2>
          <p className="text-primaryText/60 text-base text-center px-10 max-w-[413px]">
            Trust becomes a reusable asset that follows users across applications and chains.
          </p>
        </motion.div>
      </div>

      <div
        ref={containerRef}
        style={{ height: `${total * 100}vh` }}
        className="relative"
      >
        <div className="sticky top-0 h-screen flex items-center">
          {/* Gradient — bound to card sticky */}
          <motion.div
            style={{ y: gradientY }}
            className="absolute inset-0 -z-10 rounded-[20px] bg-[linear-gradient(to_bottom,#0C0C11_12%,#231B3D_32%,#4E3391_60%,rgba(91,108,222,0.67)_70%,#0C0C11_100%)]"
          />
          <div
            className="bg-[#121119] rounded-[20px] mx-auto w-full max-w-screen-xl px-12 py-16"
            style={{ height: CARD_HEIGHT }}
          >
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 h-full">
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
                        className="w-full h-auto object-contain"
                      />
                    </div>
                  ))}
                </motion.div>
              </div>

              {/* TEXT COLUMN */}
              <div className="flex flex-col justify-between">
                <motion.div
                  key={active}
                  initial={{ opacity: 0, y: 24 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.4, ease: "easeOut" }}
                >
                  <h3 className="text-3xl text-white mb-6">
                    {data[active].title}
                  </h3>
                  <p className="text-white/60">
                    {data[active].description}
                  </p>
                  <p className="text-white/60">
                    {data[active].line2}
                  </p>

                  {/* Signal badges */}
                      <div className="flex flex-wrap gap-3 mt-10">
                        {data[active].signals.map((signal, index) => {
                          const SignalIcon = signal.icon;
                          return (
                            <div 
                              key={index}
                              className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-white/5"
                            >
                              <SignalIcon className="w-5 h-5 text-white/50" />
                              <span className="text-sm text-white/50">{signal.label}</span>
                            </div>
                          );
                        })}
                      </div>
                </motion.div>

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
    </section>
  );
}