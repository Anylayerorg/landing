'use client';

import React, { useRef, useState, useEffect } from 'react';
import { motion, AnimatePresence, useScroll } from 'framer-motion';
import Image from 'next/image';

const layers = [
  {
    id: '01',
    title: 'Identity Layer',
    subtitle: 'any name service',
    description: 'Your core .any identity that links wallets and accounts into one privacy-first profile you control.',
    icon: (
      <svg width="28" height="28" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
        <circle cx="12" cy="12" r="9" stroke="currentColor" strokeWidth="1.2" strokeOpacity="0.2"/>
        <path d="M12 7C12 8.65685 10.6569 10 9 10C7.34315 10 6 8.65685 6 7C6 5.34315 7.34315 4 9 4C10.6569 4 12 5.34315 12 7Z" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
        <path d="M4 18C4 15.7909 5.79086 14 8 14H10C12.2091 14 14 15.7909 14 18V20" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round"/>
        <circle cx="18" cy="12" r="3" stroke="currentColor" strokeWidth="1.2" strokeDasharray="2 2"/>
      </svg>
    ),
    visual: (
      <svg width="160" height="160" viewBox="0 0 160 160" fill="none" xmlns="http://www.w3.org/2000/svg">
        <motion.circle 
          cx="80" cy="80" r="70" 
          stroke="currentColor" strokeWidth="1" strokeOpacity="0.1" 
          strokeDasharray="4 4"
          animate={{ rotate: 360 }}
          transition={{ duration: 20, repeat: Infinity, ease: "linear" }}
        />
        <motion.circle 
          cx="80" cy="80" r="50" 
          stroke="currentColor" strokeWidth="1" strokeOpacity="0.2"
          animate={{ rotate: -360 }}
          transition={{ duration: 15, repeat: Infinity, ease: "linear" }}
        />
        {/* Human Silhouette */}
        <motion.path 
          d="M80 75C88.2843 75 95 66.7157 95 56.5C95 46.2843 88.2843 38 80 38C71.7157 38 65 46.2843 65 56.5C65 66.7157 71.7157 75 80 75Z" 
          stroke="currentColor" strokeWidth="3" strokeLinecap="round"
          animate={{ y: [0, -5, 0] }}
          transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }}
        />
        <motion.path 
          d="M50 115C50 101.193 63.4315 90 80 90C96.5685 90 110 101.193 110 115V122H50V115Z" 
          stroke="currentColor" strokeWidth="3" strokeLinecap="round"
          animate={{ scale: [1, 1.02, 1] }}
          transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }}
        />
        {/* Orbital Nodes */}
        {[0, 120, 240].map((angle, i) => (
          <motion.circle
            key={i}
            cx={80 + Math.cos(angle * Math.PI / 180) * 50}
            cy={80 + Math.sin(angle * Math.PI / 180) * 50}
            r="6"
            fill="currentColor"
            animate={{ scale: [1, 1.5, 1], opacity: [0.5, 1, 0.5] }}
            transition={{ duration: 3, repeat: Infinity, delay: i }}
          />
        ))}
      </svg>
    )
  },
  {
    id: '02',
    title: 'Reputation Layer',
    subtitle: 'on-chain trustworthiness',
    description: 'The score and status built from your onchain activity and achievements, forming a portable measure of trust.',
    icon: (
      <svg width="28" height="28" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
        <path d="M12 2L4 5V11C4 16.5228 12 22 12 22C12 22 20 16.5228 20 11V5L12 2Z" stroke="currentColor" strokeWidth="1.5" strokeLinejoin="round"/>
        <path d="M8 10L11 13L16 8" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
      </svg>
    ),
    visual: (
      <svg width="160" height="160" viewBox="0 0 160 160" fill="none" xmlns="http://www.w3.org/2000/svg">
        {/* Shield Frame */}
        <motion.path 
          d="M80 20L30 35V80C30 115 80 145 80 145C80 145 130 115 130 80V35L80 20Z" 
          stroke="currentColor" strokeWidth="3" strokeLinejoin="round"
          animate={{ strokeOpacity: [0.3, 1, 0.3] }}
          transition={{ duration: 3, repeat: Infinity }}
        />
        {/* Inner Score Meter */}
        <motion.circle 
          cx="80" cy="85" r="35" 
          stroke="currentColor" strokeWidth="2" strokeOpacity="0.1"
        />
        <motion.path 
          d="M55 105C60 90 70 80 80 80C90 80 100 90 105 105" 
          stroke="currentColor" strokeWidth="4" strokeLinecap="round"
          initial={{ pathLength: 0 }}
          animate={{ pathLength: 0.8 }}
          transition={{ duration: 2, repeat: Infinity, repeatType: "reverse" }}
        />
        <motion.path 
          d="M65 75L75 85L95 65" 
          stroke="currentColor" strokeWidth="5" strokeLinecap="round" strokeLinejoin="round"
          animate={{ scale: [0.9, 1.1, 0.9], filter: ["blur(0px)", "blur(2px)", "blur(0px)"] }}
          transition={{ duration: 2, repeat: Infinity }}
        />
      </svg>
    )
  },
  {
    id: '03',
    title: 'Proof Layer',
    subtitle: 'Proof of Trust with Privacy',
    description: 'Zero-knowledge proofs that let you verify reputation, eligibility, or attributes without exposing your data.',
    icon: (
      <svg width="28" height="28" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
        <rect x="5" y="11" width="14" height="10" rx="2" stroke="currentColor" strokeWidth="1.5"/>
        <path d="M8 11V7C8 4.79086 9.79086 3 12 3C14.2091 3 16 4.79086 16 7V11" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round"/>
      </svg>
    ),
    visual: (
      <svg width="160" height="160" viewBox="0 0 160 160" fill="none" xmlns="http://www.w3.org/2000/svg">
        {/* Lock Base */}
        <rect x="40" y="70" width="80" height="60" rx="8" stroke="currentColor" strokeWidth="3" />
        {/* Moving Lock Shackle */}
        <motion.path 
          d="M55 70V45C55 31.1929 66.1929 20 80 20C93.8071 20 105 31.1929 105 45V70" 
          stroke="currentColor" strokeWidth="3" strokeLinecap="round"
          animate={{ y: [0, -8, 0] }}
          transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }}
        />
        {/* Scanning Line */}
        <motion.rect 
          x="45" y="80" width="70" height="2" 
          fill="currentColor"
          animate={{ y: [0, 40, 0], opacity: [0, 1, 0] }}
          transition={{ duration: 3, repeat: Infinity, ease: "linear" }}
        />
        {/* ZK Privacy Dots */}
        {[...Array(6)].map((_, i) => (
          <motion.circle
            key={i}
            cx={55 + (i % 3) * 25}
            cy={90 + Math.floor(i / 3) * 25}
            r="3"
            fill="currentColor"
            animate={{ opacity: [0.1, 0.8, 0.1] }}
            transition={{ duration: 1.5, repeat: Infinity, delay: i * 0.2 }}
          />
        ))}
      </svg>
    )
  },
  {
    id: '04',
    title: 'Utility Layer',
    subtitle: 'Reputation based applications',
    description: 'Where apps use your identity, reputation, and proofs to unlock access, rewards, payments, and permissions.',
    icon: (
      <svg width="28" height="28" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
        <rect x="3" y="3" width="7" height="7" rx="1.5" stroke="currentColor" strokeWidth="1.5" strokeOpacity="0.4"/>
        <rect x="14" y="14" width="7" height="7" rx="1.5" stroke="currentColor" strokeWidth="1.5"/>
      </svg>
    ),
    visual: (
      <svg width="160" height="160" viewBox="0 0 160 160" fill="none" xmlns="http://www.w3.org/2000/svg">
        {/* Core Hub */}
        <rect x="65" y="65" width="30" height="30" rx="4" stroke="currentColor" strokeWidth="3" />
        {/* Connection Arms */}
        {[0, 90, 180, 270].map((rot, i) => (
          <g key={i} transform={`rotate(${rot} 80 80)`}>
            <motion.path 
              d="M80 65V35M80 35H100" 
              stroke="currentColor" strokeWidth="2" strokeLinecap="round"
              animate={{ pathLength: [0, 1, 0] }}
              transition={{ duration: 4, repeat: Infinity, delay: i * 0.5 }}
            />
            <motion.rect 
              x="100" y="30" width="15" height="15" rx="3" 
              stroke="currentColor" strokeWidth="2" strokeOpacity="0.3"
              animate={{ scale: [1, 1.2, 1], fillOpacity: [0, 0.2, 0] }}
              fill="currentColor"
              transition={{ duration: 2, repeat: Infinity, delay: i * 0.5 }}
            />
          </g>
        ))}
        {/* Pulse Core */}
        <motion.circle 
          cx="80" cy="80" r="10" 
          fill="currentColor"
          animate={{ scale: [1, 2, 1], opacity: [0.5, 0, 0.5] }}
          transition={{ duration: 2, repeat: Infinity }}
        />
      </svg>
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
          <div className="relative z-10 text-lightblueprimary/90">
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
                    <div className="flex items-center gap-8 relative z-10">
                      {/* Small inline icon - Match the redesigned theme */}
                      <div className="relative w-16 h-16 rounded-2xl bg-white/[0.03] border border-white/10 flex items-center justify-center flex-shrink-0 backdrop-blur-xl shadow-2xl overflow-hidden group">
                        <div className="absolute inset-0 bg-gradient-to-br from-white/5 to-transparent opacity-50" />
                        <div className="text-lightblueprimary relative z-10">
                          {layers[active].icon}
                        </div>
                        <motion.div 
                          className="absolute inset-0 border border-lightblueprimary/20 rounded-2xl pointer-events-none"
                          animate={{ opacity: [0.2, 0.5, 0.2] }}
                          transition={{ duration: 2, repeat: Infinity }}
                        />
                      </div>
                      
                      <div>
                        <h3 className="text-4xl md:text-7xl font-medium text-white tracking-tighter leading-tight">
                          {layers[active].title}
                        </h3>
                        <p className="text-lightblueprimary/60 font-mono text-xs md:text-sm uppercase tracking-[0.4em] font-bold mt-2">
                          {layers[active].subtitle}
                        </p>
                      </div>
                    </div>
                  </div>

                  <p className="text-white/40 text-lg md:text-2xl font-light leading-relaxed max-w-xl pl-0 md:pl-28 border-l border-white/5 ml-0 md:ml-10">
                    {layers[active].description}
                  </p>

                  <div className="pt-8 pl-0 md:pl-28 ml-0 md:ml-10">
                    <a
                      href="https://docs.onzks.com"
                      target="_blank"
                      rel="noopener noreferrer"
                      className="group flex items-center gap-6 transition-all w-fit"
                    >
                      <span className="text-sm uppercase tracking-[0.25em] font-bold text-white/30 group-hover:text-white transition-colors">Documentation</span>
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
