'use client';

import React, { useRef, useState, useEffect } from 'react';
import { motion, AnimatePresence, useScroll, useTransform } from 'framer-motion';
import Image from 'next/image';
import { ArrowRight } from 'lucide-react';

const layers = [
  {
    id: '01',
    title: 'Identity Layer',
    subtitle: 'THE MONOLITH',
    description: (
      <>
        Your core <span className="text-lightblueprimary font-bold">.any</span> identity that links wallets and accounts into one privacy-first profile you control.
      </>
    ),
    cta: 'See Identity Specs'
  },
  {
    id: '02',
    title: 'Reputation Layer',
    subtitle: 'THE ASTROLABE',
    description: 'The score and status built from your onchain activity and achievements, forming a portable measure of trust.',
    cta: 'View Trust Model'
  },
  {
    id: '03',
    title: 'Proof Layer',
    subtitle: 'THE CRYSTALLINE VAULT',
    description: 'Zero-knowledge proofs that let you verify reputation, eligibility, or attributes without exposing your data.',
    cta: 'Explore Proof Tech'
  },
  {
    id: '04',
    title: 'Utility Layer',
    subtitle: 'THE POWER PLANT',
    description: 'Where apps use your identity, reputation, and proofs to unlock access, rewards, payments, and permissions.',
    cta: 'Discover App Utility'
  }
];

// --- 3D Mechanical Core Component ---
const MechanicalCore = ({ active }: { active: number }) => {
  return (
    <div className="relative w-[300px] h-[300px] md:w-[500px] md:h-[500px] flex items-center justify-center" style={{ perspective: '2000px' }}>
      
      {/* Dynamic Ambient Environment */}
      <motion.div 
        animate={{ 
          opacity: [0.1, 0.2, 0.1],
          scale: [1, 1.1, 1],
          backgroundColor: active === 0 ? 'rgba(166,131,255,0.05)' : active === 1 ? 'rgba(59,130,246,0.05)' : 'rgba(166,131,255,0.08)'
        }}
        transition={{ duration: 4, repeat: Infinity }}
        className="absolute inset-0 blur-[120px] rounded-full" 
      />

      <div className="relative" style={{ transformStyle: 'preserve-3d' }}>
        
        {/* STAGE 1 & 2: THE MONOLITH / CENTRAL CORE */}
        <motion.div
          animate={{
            rotateY: [0, 360],
            scale: active === 0 ? 1 : active === 1 ? 0.4 : 0.6,
            y: active === 3 ? -50 : 0
          }}
          transition={{ 
            rotateY: { duration: 20, repeat: Infinity, ease: "linear" },
            scale: { duration: 0.8, ease: [0.16, 1, 0.3, 1] },
            y: { duration: 0.8, ease: [0.16, 1, 0.3, 1] }
          }}
          style={{ transformStyle: 'preserve-3d' }}
          className="relative w-32 h-48 md:w-40 md:h-64 flex items-center justify-center"
        >
          {/* 3D Pillar Sides */}
          {[0, 90, 180, 270].map((deg) => (
            <div 
              key={deg}
              className="absolute inset-0 bg-white/[0.03] backdrop-blur-md border border-white/10"
              style={{ 
                transform: `rotateY(${deg}deg) translateZ(${typeof window !== 'undefined' && window.innerWidth < 768 ? '64px' : '80px'})`,
                backfaceVisibility: 'hidden'
              }}
            >
              <div className="absolute inset-0 bg-gradient-to-b from-lightblueprimary/10 to-transparent opacity-50" />
            </div>
          ))}
          
          {/* Glowing Internal Core */}
          <motion.div 
            animate={{ 
              opacity: [0.4, 0.8, 0.4],
              scale: [0.8, 1, 0.8]
            }}
            transition={{ duration: 2, repeat: Infinity }}
            className="absolute w-12 h-24 bg-lightblueprimary blur-2xl rounded-full opacity-50" 
          />
        </motion.div>

        {/* STAGE 2: THE ASTROLABE RINGS (REPUTATION) */}
        <AnimatePresence>
          {active >= 1 && (
            <motion.div
              initial={{ opacity: 0, scale: 0.5, rotateX: 70 }}
              animate={{ opacity: 1, scale: 1, rotateX: 75 }}
              exit={{ opacity: 0, scale: 1.2 }}
              className="absolute inset-0 flex items-center justify-center"
              style={{ transformStyle: 'preserve-3d' }}
            >
              {[180, 240, 300].map((size, i) => (
                <motion.div
                  key={size}
                  animate={{ rotateZ: i % 2 === 0 ? 360 : -360 }}
                  transition={{ duration: 10 + i * 5, repeat: Infinity, ease: "linear" }}
                  className="absolute border border-lightblueprimary/30 rounded-full"
                  style={{ 
                    width: size, 
                    height: size,
                    transformStyle: 'preserve-3d',
                    boxShadow: '0 0 20px rgba(166,131,255,0.1)'
                  }}
                >
                  {/* Floating Data Nodes on Rings */}
                  <div className="absolute top-0 left-1/2 -translate-x-1/2 w-2 h-2 bg-white rounded-full shadow-[0_0_10px_rgba(255,255,255,0.8)]" />
                </motion.div>
              ))}
            </motion.div>
          )}
        </AnimatePresence>

        {/* STAGE 3: THE CRYSTALLINE VAULT (PROOF) */}
        <AnimatePresence>
          {active >= 2 && (
            <motion.div
              initial={{ opacity: 0, scale: 0.8 }}
              animate={{ opacity: 1, scale: 1.1 }}
              exit={{ opacity: 0, scale: 1.5 }}
              className="absolute inset-0 flex items-center justify-center pointer-events-none"
              style={{ transformStyle: 'preserve-3d' }}
            >
              {/* Refractive Sphere Shell */}
              <div className="w-[320px] h-[320px] md:w-[400px] md:h-[400px] rounded-full border border-white/10 bg-white/[0.02] backdrop-blur-xl relative overflow-hidden">
                <div className="absolute inset-0 bg-gradient-to-br from-white/10 via-transparent to-transparent" />
                <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_0%,rgba(255,255,255,0.1),transparent_50%)]" />
                
                {/* ZK Proof Geometric Etchings */}
                <svg className="absolute inset-0 w-full h-full opacity-20" viewBox="0 0 100 100">
                  <path d="M50 5 L95 25 L95 75 L50 95 L5 75 L5 25 Z" fill="none" stroke="currentColor" strokeWidth="0.5" />
                  <circle cx="50" cy="50" r="30" fill="none" stroke="currentColor" strokeWidth="0.2" />
                </svg>
              </div>
            </motion.div>
          )}
        </AnimatePresence>

        {/* STAGE 4: THE POWER PLANT DOCKING (UTILITY) */}
        <AnimatePresence>
          {active === 3 && (
            <motion.div
              initial={{ opacity: 0, y: 100 }}
              animate={{ opacity: 1, y: 0 }}
              className="absolute inset-0 flex items-center justify-center"
              style={{ transformStyle: 'preserve-3d' }}
            >
              {/* Industrial Frame */}
              <div className="w-full h-full flex flex-col items-center justify-between py-10">
                <div className="w-64 h-2 bg-white/10 rounded-full border border-white/5 shadow-2xl" />
                
                {/* Light Beams */}
                <div className="absolute inset-0 flex justify-around pointer-events-none">
                  {[...Array(4)].map((_, i) => (
                    <motion.div
                      key={i}
                      initial={{ height: 0 }}
                      animate={{ height: '100vh' }}
                      className="w-px bg-gradient-to-b from-lightblueprimary via-lightblueprimary/20 to-transparent opacity-20"
                    />
                  ))}
                </div>

                <div className="w-64 h-2 bg-white/10 rounded-full border border-white/5 shadow-2xl" />
              </div>
            </motion.div>
          )}
        </AnimatePresence>

      </div>
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
      <div className="sticky top-0 h-screen w-full flex items-center justify-center overflow-hidden">
        
        {/* Very Subtle Background Detail */}
        <div className="absolute inset-0 pointer-events-none opacity-[0.01]">
          <div className="absolute top-0 left-0 w-full h-full bg-[url('/dotted-pattern.png')] bg-repeat" />
        </div>

        <div className="max-w-screen-xl mx-auto px-10 w-full relative z-10">
          <div className="grid md:grid-cols-2 gap-20 md:gap-40 items-center">
            
            {/* Left Column: Clean, Well-Spaced Text */}
            <div className="relative min-h-[400px] flex flex-col justify-center">
              <AnimatePresence mode="wait">
                <motion.div
                  key={active}
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  exit={{ opacity: 0, x: 10 }}
                  transition={{ duration: 0.5, ease: [0.16, 1, 0.3, 1] }}
                  className="space-y-8"
                >
                  <div className="space-y-2">
                    <div className="flex items-center gap-3">
                      <span className="text-lightblueprimary font-mono text-[10px] uppercase tracking-[0.4em] font-black">
                        {layers[active].id}
                      </span>
                      <div className="h-px w-8 bg-lightblueprimary/20" />
                      <span className="text-white/20 font-mono text-[10px] uppercase tracking-[0.4em]">
                        {layers[active].subtitle}
                      </span>
                    </div>
                    <h3 className="text-4xl md:text-6xl font-medium text-white tracking-tight leading-none">
                      {layers[active].title}
                    </h3>
                  </div>

                  <p className="text-white/40 text-lg md:text-xl font-light leading-relaxed max-w-lg">
                    {layers[active].description}
                  </p>

                  <div className="pt-4">
                    <a
                      href="https://docs.onzks.com"
                      target="_blank"
                      rel="noopener noreferrer"
                      className="group flex items-center gap-4 transition-all w-fit"
                    >
                      <span className="text-[10px] uppercase tracking-[0.3em] font-bold text-white/30 group-hover:text-white transition-colors">
                        {layers[active].cta}
                      </span>
                      <div className="w-10 h-10 rounded-full border border-white/5 flex items-center justify-center group-hover:border-lightblueprimary/30 group-hover:bg-lightblueprimary/5 transition-all duration-500">
                        <ArrowRight size={14} className="text-white/20 group-hover:text-white transition-all group-hover:translate-x-0.5" />
                      </div>
                    </a>
                  </div>
                </motion.div>
              </AnimatePresence>
            </div>

            {/* Right Column: Mechanical Core Assembly */}
            <div className="relative flex justify-center items-center h-[40vh] md:h-[60vh]">
               <MechanicalCore active={active} />
            </div>

          </div>
        </div>

        {/* Minimal Progress Indicator (Side) */}
        <div className="absolute right-12 top-1/2 -translate-y-1/2 flex flex-col gap-4 hidden lg:flex">
          {layers.map((_, i) => (
            <motion.div 
              key={i}
              animate={{ 
                height: active === i ? 24 : 8,
                backgroundColor: active === i ? 'rgba(166, 131, 255, 1)' : 'rgba(255, 255, 255, 0.1)'
              }}
              className="w-1 rounded-full transition-all duration-500"
            />
          ))}
        </div>

        {/* Subtle Bottom Border */}
        <div className="absolute bottom-0 left-10 right-10 h-px bg-gradient-to-r from-transparent via-white/5 to-transparent" />
      </div>
    </section>
  );
};

export default IndustrialArchitecture;
