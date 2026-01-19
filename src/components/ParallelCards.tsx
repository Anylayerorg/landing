"use client";

import { motion, useScroll, useTransform } from "framer-motion";
import Image from "next/image";
import { useRef, useState, useEffect } from "react";

const data = [
  {
    title: "Human identity signals",
    description:
      "Human Trust measures the reliability and behavioral consistency of a real person. It is built from identity proofs, on/off‑chain behavior, achievements, and verifiable reputation.",
    line2: "",
    image: "/human-identity.svg",
    signals: [
      { icon: "ic-linkedin.svg", label: "Linkedin" },
      { icon: "ic-bag.svg", label: "Bag" },
      { icon: "ic-university.svg", label: "University" },
      { icon: "ic-user.svg", label: "User" },
    ],
  },
  {
    title: "Wallet activity rotation",
    description:
      "Wallet Trust reflects address‑level behavior and operational hygiene. It is built from wallet age, repayments and collateral health, trading integrity, liquidity activity, and address age—summarized without exposing balances.",
    line2: "",
    image: "/wallet-activity.svg",
    signals: [
      { icon: "ic-exchange.svg", label: "Exchange" },
      { icon: "ic-stack.svg", label: "Stack" },
      { icon: "ic-bank.svg", label: "Bank" },
      { icon: "ic-preview.svg", label: "Preview" },
    ],
  },
  {
    title: "AI verified behavior",
    description:
      "Agent Trust captures outcome reliability for autonomous agents. It is built from task‑completion success, incident rates, execution quality (e.g., slippage/latency), and user feedback—provable without sharing logs or strategies.",
    line2: "",
    image: "/ai-verified.svg",
    signals: [
      { icon: "ic-processor.svg", label: "Processor" },
    ],
  },
];

export default function ParallelCards({ sectionId }: { sectionId: string }) {
  const CARD_HEIGHT = 662;
  const IMAGE_VIEWPORT_HEIGHT = 534;

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
    ["0%", "0%"]
  );

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
    <section id={sectionId} className="relative py-10 md:py-20" ref={sectionRef}>
      {/* ================= HEADER ================= */}
      <div className="relative z-10 max-w-[60rem] mx-auto text-center px-5 flex flex-col items-center">
        <div className="mb-6">
          <div className="inline-flex items-center gap-3 px-3 py-1 rounded-full bg-white/[0.02] border border-white/5 backdrop-blur-sm">
            <div className="w-1 h-1 rounded-full bg-lightblueprimary" />
            <span className="text-[9px] font-mono uppercase tracking-[0.3em] text-white/40">Dimensions // Multichain Trust Layer</span>
          </div>
        </div>

        <h2 className="text-[1.75rem] md:text-[3.5rem] lg:text-[4.5rem] font-geist font-black uppercase text-primaryText mb-6 leading-[1.1] tracking-tighter lg:tracking-[-0.05em]">
          Dimensions of trust <br className="hidden md:block" /> for the digital internet
        </h2>

        <p className="text-primaryText/60 max-w-md mx-auto">
          Trust becomes a reusable asset that follows users across applications and chains.
        </p>
      </div>

      {/* ================= DESKTOP (STICKY PARALLAX) ================= */}
      <div className="hidden md:block">
        <div
          ref={containerRef}
          style={{ height: `${total * 100}vh` }}
          className="relative mt-10"
        >
          <div className="sticky top-20 h-screen flex">
            {/* Gradient — bound to card sticky */}
            <motion.div
              style={{ y: gradientY }}
              className="absolute -top-40 h-full inset-0 -z-10 rounded-[20px] bg-[linear-gradient(to_bottom,#0C0C11_12%,#231B3D_32%,#4E3391_60%,rgba(91,108,222,0.67)_70%,#0C0C11_100%)]"
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
                  <div
                    key={active}
                  >
                    <motion.h3
                      initial={{ opacity: 0 }}
                      animate={{ opacity: 1 }}
                      transition={{ duration: 0.4, ease: "easeOut" }}
                      className="text-3xl text-primaryText mb-6">
                      {data[active].title}
                    </motion.h3>
                    <motion.p initial={{ opacity: 0 }}
                      animate={{ opacity: 1 }}
                      transition={{ duration: 0.4, ease: "easeOut", delay: 0.1 }} className="text-primaryText/60">
                      {data[active].description}
                    </motion.p>
                    <motion.p initial={{ opacity: 0 }}
                      animate={{ opacity: 1 }}
                      transition={{ duration: 0.4, ease: "easeOut", delay: 0.2 }} className="text-primaryText/60">
                      {data[active].line2}
                    </motion.p>

                    {/* Signal badges */}
                    <motion.div initial={{ opacity: 0 }}
                      animate={{ opacity: 1 }}
                      transition={{ duration: 0.4, ease: "easeOut", delay: 0.3 }} className="flex flex-wrap gap-5 mt-10">
                      {data[active].signals.map((signal, index) => (
                        <Image key={index} src={signal.icon} alt={signal.label} width={20} height={20} />
                      ))}
                    </motion.div>
                  </div>

                  {/* INDICATORS */}
                  <div className="space-y-3 pt-10">
                    {data.map((item, i) => (
                      <div
                        key={i}
                        className={`flex gap-4 ${i === active ? "text-primaryText" : "text-primaryText/40"
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
                  className={`flex gap-4 mb-2 ${i === sectionIndex ? "text-white" : "text-white/40"
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
