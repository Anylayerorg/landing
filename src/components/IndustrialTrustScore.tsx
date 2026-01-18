'use client';

import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import Image from 'next/image';

const Counter = ({ value, duration = 2 }: { value: number, duration?: number }) => {
  const [count, setCount] = useState(0);
  const [isMounted, setIsMounted] = useState(false);
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, amount: 0.1 });

  useEffect(() => {
    setIsMounted(true);
  }, []);

  useEffect(() => {
    if (!isMounted || !isInView) return;

    let startTime: number | null = null;
    let animationFrameId: number;

    const step = (timestamp: number) => {
      if (!startTime) startTime = timestamp;
      const progress = Math.min((timestamp - startTime) / (duration * 1000), 1);
      setCount(Math.floor(progress * value));
      if (progress < 1) {
        animationFrameId = window.requestAnimationFrame(step);
      }
    };

    animationFrameId = window.requestAnimationFrame(step);
    return () => window.cancelAnimationFrame(animationFrameId);
  }, [value, duration, isMounted, isInView]);

  if (!isMounted) return <span>{value}</span>;

  return <span ref={ref}>{isInView ? count : value}</span>;
};

const IndustrialTrustScore = () => {
  return (
    <section id="trustScore" className="py-24 md:py-48 px-6 bg-[#08080C] overflow-hidden">
      <div className="max-w-screen-xl mx-auto relative z-10">
        <div className="grid lg:grid-cols-2 gap-20 lg:gap-32 items-center">

          {/* Left Content - Precise Layout kept */}
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
          >
            <div className="flex items-center gap-3 mb-6">
              <div className="w-1.5 h-1.5 rounded-full bg-lightblueprimary shadow-[0_0_12px_rgba(166,131,255,0.8)] animate-pulse" />
              <span className="text-lightblueprimary font-mono text-[10px] uppercase tracking-[0.4em] font-black">Velocity</span>
              <div className="h-px w-8 bg-white/10" />
              <span className="text-lightblueprimary font-mono text-[10px] uppercase tracking-[0.4em]">Trust Engine</span>
            </div>
            <h2 className="text-[3.5rem] md:text-[5.5rem] font-geist font-black uppercase text-primaryText mb-10 leading-[0.9] tracking-tighter lg:tracking-[-0.05em]">
              Trustscore that <br />
              <span className="text-lightblueprimary">unlocks</span> Anything
            </h2>
            <p className="text-primaryText/40 text-lg md:text-xl font-light leading-relaxed max-w-lg">
              Anylayer computes a dynamic Trust Index (0–9000) using identity, on-chain behavior, proofs, achievements, and agent reliability — all privately verified.
            </p>
          </motion.div>

          {/* Right Content - Technical Industrial HUD (Solid, Dark, No Glass) */}
          <div className="relative h-[600px] flex items-center justify-center">

            {/* Base Module Panel */}
            <motion.div
              initial={{ opacity: 0, scale: 0.95, rotateY: -10 }}
              whileInView={{ opacity: 1, scale: 1, rotateY: -15 }}
              viewport={{ once: true }}
              transition={{ duration: 1.2, ease: "easeOut" }}
              className="absolute w-full max-w-[500px] h-[440px] bg-[#0E0E14] border border-white/10 rounded-[40px] p-10 flex flex-col justify-between shadow-[0_60px_120px_rgba(0,0,0,0.9)] overflow-hidden"
              style={{ transformStyle: 'preserve-3d' }}
            >
              {/* Technical Grid Overlay */}
              <div className="absolute inset-0 opacity-10 pointer-events-none"
                style={{
                  backgroundImage: `linear-gradient(rgba(255,255,255,0.05) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,0.05) 1px, transparent 1px)`,
                  backgroundSize: '30px 30px'
                }}
              />

              <div className="flex justify-between items-center mb-12 pb-8 border-b border-white/5 relative z-10">
                <div className="space-y-1">
                  <div className="text-white/20 text-[10px] uppercase tracking-[0.3em] font-black">Identity Module</div>
                  <div className="text-lightblueprimary/80 font-mono text-sm tracking-tighter uppercase">ID 0xA6...91F2</div>
                </div>
                <div className="w-12 h-12 rounded-2xl bg-white/[0.03] border border-white/10 flex items-center justify-center">
                  <div className="w-2.5 h-2.5 rounded-full bg-lightblueprimary animate-pulse shadow-[0_0_20px_rgba(166,131,255,1)]" />
                </div>
              </div>

              <div className="grid grid-cols-2 gap-y-12 relative z-10">
                {[
                  { label: "HUMAN", value: "VERIFIED" },
                  { label: "WALLET AGE", value: "90+ DAYS" },
                  { label: "ACTIVITY", value: "CONSISTENT" },
                  { label: "SECURITY", value: "ZKS ENCLAVE" }
                ].map((item, i) => (
                  <div key={i} className="space-y-2">
                    <div className="text-white/10 text-[10px] uppercase tracking-[0.2em] font-black">{item.label}</div>
                    <div className="text-primaryText/70 text-base font-medium tracking-tight font-mono">{item.value}</div>
                  </div>
                ))}
              </div>

              {/* Console Accents */}
              <div className="mt-12 pt-8 border-t border-white/5 flex items-center justify-between relative z-10">
                <div className="text-white/[0.05] font-mono text-[10px] uppercase tracking-[0.4em]">AUTH STATUS: VALID</div>
                <div className="flex gap-1.5">
                  {[...Array(3)].map((_, i) => (
                    <div key={i} className="w-1.5 h-1.5 rounded-full bg-lightblueprimary/20" />
                  ))}
                </div>
              </div>
            </motion.div>

            {/* Foreground Score Unit */}
            <motion.div
              initial={{ opacity: 0, y: 80, x: 40, rotateX: 15 }}
              whileInView={{ opacity: 1, y: 20, x: 60, rotateX: 10 }}
              viewport={{ once: true }}
              transition={{ duration: 1, delay: 0.4, ease: "easeOut" }}
              className="absolute w-full max-w-[400px] h-[280px] bg-[#16161D] border-t border-x border-white/10 rounded-[48px] p-10 flex flex-col justify-between shadow-[0_80px_150px_rgba(0,0,0,1)] group overflow-hidden"
            >
              {/* Internal Bezel Effect */}
              <div className="absolute inset-0 border-[20px] border-white/[0.01] pointer-events-none rounded-[48px]" />

              <div className="relative z-10 flex items-center gap-6">
                <div className="w-18 h-18 rounded-3xl bg-white/[0.02] border border-white/10 flex items-center justify-center transition-all duration-700 group-hover:border-lightblueprimary/40 shadow-inner">
                  <Image src="/knight-shield.svg" alt="Shield" width={40} height={40} className="opacity-40" />
                </div>
                <div className="space-y-1">
                  <h3 className="text-primaryText text-xl font-medium tracking-tight uppercase tracking-[0.15em]">Trust Score</h3>
                  <div className="flex items-center gap-2">
                    <div className="h-0.5 w-16 bg-lightblueprimary/60 rounded-full" />
                    <span className="text-lightblueprimary/40 text-[10px] uppercase font-black tracking-widest font-mono">ENCRYPTED</span>
                  </div>
                </div>
              </div>

              <div className="relative z-10 flex items-end justify-between border-t border-white/5 pt-8">
                <div className="space-y-1">
                  <div className="text-[10px] uppercase tracking-[0.4em] text-white/10 font-black mb-2">INDEX VAL</div>
                  <div className="text-8xl font-medium text-primaryText tracking-tighter flex items-baseline leading-none">
                    <Counter value={120} />
                  </div>
                </div>
                <div className="text-right space-y-4 pb-1">
                  <div className="text-lightblueprimary text-base font-bold font-mono tracking-tighter">
                    +39.20
                  </div>
                  <div className="w-32 h-2 bg-white/5 rounded-full overflow-hidden border border-white/5">
                    <motion.div
                      initial={{ width: 0 }}
                      whileInView={{ width: "70%" }}
                      transition={{ duration: 2, delay: 1 }}
                      className="h-full bg-lightblueprimary shadow-[0_0_25px_rgba(166,131,255,1)]"
                    />
                  </div>
                </div>
              </div>
            </motion.div>
          </div>

        </div>
      </div>
    </section>
  );
};

export default IndustrialTrustScore;
