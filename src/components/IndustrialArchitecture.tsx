'use client';

import React, { useRef, useState, useEffect } from 'react';
import { motion, AnimatePresence, useScroll } from 'framer-motion';
import Image from 'next/image';
import { Fingerprint, ShieldCheck, Lock, Blocks } from 'lucide-react';

const layers = [
  {
    id: '01',
    title: 'Identity Layer',
    subtitle: 'any name service',
    description: (
      <>
        Your core <span className="text-lightblueprimary font-bold">.any</span> identity that links wallets and accounts into one privacy-first profile you control.
      </>
    ),
    visual: (
      <div className="flex items-center justify-center text-lightblueprimary/90">
        <Fingerprint size={120} strokeWidth={1.2} />
      </div>
    )
  },
  {
    id: '02',
    title: 'Reputation Layer',
    subtitle: 'on-chain trustworthiness',
    description: 'The score and status built from your onchain activity and achievements, forming a portable measure of trust.',
    visual: (
      <div className="flex items-center justify-center text-lightblueprimary/90">
        <ShieldCheck size={120} strokeWidth={1.2} />
      </div>
    )
  },
  {
    id: '03',
    title: 'Proof Layer',
    subtitle: 'Proof of Trust with Privacy',
    description: 'Zero-knowledge proofs that let you verify reputation, eligibility, or attributes without exposing your data.',
    visual: (
      <div className="flex items-center justify-center text-lightblueprimary/90">
        <Lock size={120} strokeWidth={1.2} />
      </div>
    )
  },
  {
    id: '04',
    title: 'Utility Layer',
    subtitle: 'Reputation based applications',
    description: 'Where apps use your identity, reputation, and proofs to unlock access, rewards, payments, and permissions.',
    visual: (
      <div className="flex items-center justify-center text-lightblueprimary/90">
        <Blocks size={120} strokeWidth={1.2} />
      </div>
    )
  }
];

// --- 3D Glass Visual Component ---
const GlassVisual = ({ visual, id }: { visual: React.ReactNode, id: string }) => {
  return (
    <div className="relative w-[300px] h-[300px] md:w-[500px] md:h-[500px] flex items-center justify-center" style={{ perspective: '1200px' }}>
      {/* Background Glow */}
      <div className="absolute inset-0 bg-lightblueprimary/10 blur-[120px] rounded-full opacity-30 animate-pulse" />
      
      {/* 3D Glass Stack */}
      <motion.div 
        initial={{ rotateY: 30, rotateX: 10 }}
        animate={{ rotateY: 35, rotateX: 15 }}
        transition={{ duration: 5, repeat: Infinity, repeatType: "reverse", ease: "easeInOut" }}
        className="relative flex flex-col items-center"
      >
        {/* Top Plate */}
        <motion.div 
          animate={{ y: [0, -15, 0] }}
          transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }}
          className="relative w-56 h-40 md:w-80 md:h-56 bg-white/[0.04] backdrop-blur-2xl border border-white/20 rounded-[48px] shadow-[0_40px_80px_rgba(0,0,0,0.6)] flex items-center justify-center overflow-hidden z-20"
        >
          {/* Reflective Glaze */}
          <div className="absolute inset-0 bg-gradient-to-br from-white/10 via-transparent to-transparent pointer-events-none" />
          <div className="absolute -top-[50%] -left-[50%] w-[200%] h-[200%] bg-gradient-to-tr from-transparent via-white/[0.02] to-transparent rotate-45 pointer-events-none" />

          {/* The Content Visual */}
          <div className="relative z-10">
            {visual}
          </div>

          {/* Small Float ID in corner */}
          <div className="absolute top-6 right-8 text-white/5 font-mono text-4xl font-bold italic select-none">
            {id}
          </div>
        </motion.div>

        {/* Middle Plate (Floating Layer) */}
        <motion.div 
          animate={{ y: [10, -5, 10] }}
          transition={{ duration: 4, repeat: Infinity, ease: "easeInOut", delay: 0.5 }}
          className="absolute top-12 md:top-16 w-52 h-36 md:w-72 md:h-52 bg-white/[0.02] backdrop-blur-lg border border-white/10 rounded-[44px] -z-10" 
        />

        {/* Bottom Shadow Plate */}
        <div className="absolute top-28 md:top-36 w-48 h-32 md:w-64 md:h-44 bg-lightblueprimary/10 blur-3xl rounded-[40px] -z-20 transform translate-y-12 md:translate-y-24 opacity-40" />
      </motion.div>

      {/* Floating Orbital Chips */}
      {[...Array(4)].map((_, i) => (
        <motion.div
          key={i}
          animate={{
            y: [0, -60, 0],
            x: [0, 30, 0],
            rotate: [0, 360],
            opacity: [0.2, 0.5, 0.2]
          }}
          transition={{
            duration: 8 + i * 2,
            repeat: Infinity,
            delay: i * 1.5,
            ease: "easeInOut"
          }}
          className="absolute w-8 h-8 md:w-12 md:h-12 bg-white/[0.03] backdrop-blur-xl border border-white/10 rounded-2xl shadow-xl"
          style={{
            top: `${15 + i * 20}%`,
            left: `${10 + i * 25}%`,
          }}
        >
          <div className="absolute inset-0 bg-gradient-to-tr from-lightblueprimary/10 to-transparent" />
        </motion.div>
      ))}
    </div>
  );
};

const IndustrialArchitecture = () => {
  const containerRef = useRef<HTMLDivElement>(null);
  const [active, setActive] = useState(0);
  const total = layers.length;

  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start start", "end end"],
  });

  useEffect(() => {
    return scrollYProgress.on("change", (v) => {
      const index = Math.min(total - 1, Math.floor(v * total));
      setActive(index);
    });
  }, [scrollYProgress, total]);

  return (
    <section 
      ref={containerRef} 
      id="architecture" 
      className="relative bg-[#08080C] overflow-visible"
      style={{ height: `${total * 100}vh` }}
    >
      {/* IMMERSIVE STICKY FRAME */}
      <div className="sticky top-0 h-screen w-full flex items-center justify-center overflow-hidden">
        
        {/* Background Technical Dotted Pattern */}
        <div className="absolute inset-0 pointer-events-none opacity-[0.03]">
          <div className="absolute top-0 left-0 w-full h-full bg-[url('/dotted-pattern.png')] bg-repeat" />
        </div>

        {/* Subtle Ambient Glows */}
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-full h-full bg-blueprimary/5 blur-[180px] rounded-full pointer-events-none opacity-40" />

        {/* Content Container */}
        <div className="max-w-screen-xl mx-auto px-6 w-full relative z-10">
          <div className="grid md:grid-cols-2 gap-12 md:gap-32 items-center">
            
            {/* Left Column: Redesigned Representative 3D Icons */}
            <div className="relative flex justify-center items-center h-[40vh] md:h-[60vh]">
              <AnimatePresence mode="wait">
                <motion.div
                  key={active}
                  initial={{ opacity: 0, scale: 0.8, y: 60, rotateY: 20 }}
                  animate={{ opacity: 1, scale: 1, y: 0, rotateY: 0 }}
                  exit={{ opacity: 0, scale: 1.1, y: -60, rotateY: -20 }}
                  transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
                >
                  <GlassVisual visual={layers[active].visual} id={layers[active].id} />
                </motion.div>
              </AnimatePresence>
            </div>

            {/* Right Column: Text Information */}
            <div className="relative">
              {/* Vertical Progress Bar */}
              <div className="absolute -left-12 md:-left-24 top-0 bottom-0 w-px bg-white/5 hidden md:block">
                <motion.div 
                  className="w-2.5 h-2.5 rounded-full bg-lightblueprimary absolute -left-[4px] shadow-[0_0_20px_rgba(166,131,255,1)] border border-white/20"
                  animate={{ top: `${(active / (total - 1)) * 100}%` }}
                  transition={{ type: "spring", stiffness: 70, damping: 15 }}
                />
              </div>

              <AnimatePresence mode="wait">
                <motion.div
                  key={active}
                  initial={{ opacity: 0, x: 50 }}
                  animate={{ opacity: 1, x: 0 }}
                  exit={{ opacity: 0, x: -50 }}
                  transition={{ duration: 0.6, ease: "easeOut" }}
                  className="space-y-10"
                >
                  <div className="relative">
                    <span className="text-8xl md:text-[14rem] font-medium text-white/[0.02] font-mono leading-none block -mb-12 md:-mb-24 pointer-events-none">
                      {layers[active].id}
                    </span>
                    <div className="flex flex-col relative z-10">
                      <h3 className="text-4xl md:text-7xl font-medium text-white tracking-tighter leading-tight">
                        {layers[active].title}
                      </h3>
                      <p className="text-lightblueprimary/60 font-mono text-xs md:text-sm uppercase tracking-[0.4em] font-bold mt-2">
                        {layers[active].subtitle}
                      </p>
                    </div>
                  </div>

                  <p className="text-white/40 text-base md:text-xl font-light leading-relaxed max-w-xl pl-0 md:pl-28 border-l border-white/5 ml-0 md:ml-10">
                    {layers[active].description}
                  </p>

                  <div className="pt-8 pl-0 md:pl-28 ml-0 md:ml-10">
                    <a
                      href="https://docs.onzks.com"
                      target="_blank"
                      rel="noopener noreferrer"
                      className="group flex items-center gap-6 transition-all w-fit"
                    >
                      <span className="text-sm uppercase tracking-[0.25em] font-bold text-white/30 group-hover:text-white transition-colors">Explore Layer</span>
                      <div className="w-14 h-14 rounded-full border border-white/10 flex items-center justify-center group-hover:border-lightblueprimary group-hover:bg-lightblueprimary/10 transition-all duration-500 shadow-2xl bg-white/[0.02]">
                        <Image src="/button-arrow.svg" alt="arrow" width={16} height={16} className="opacity-30 group-hover:opacity-100 group-hover:translate-x-1.5 transition-all duration-500" />
                      </div>
                    </a>
                  </div>
                </motion.div>
              </AnimatePresence>
            </div>

          </div>
        </div>

        {/* BOTTOM GRADIENT DESIGN */}
        <div className="absolute bottom-0 left-0 w-full h-[2px] bg-gradient-to-r from-transparent via-lightblueprimary/40 to-transparent shadow-[0_0_20px_rgba(166,131,255,0.2)]" />
      </div>
    </section>
  );
};

export default IndustrialArchitecture;
