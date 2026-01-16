'use client';

import React, { useRef, useState, useEffect } from 'react';
import { motion, AnimatePresence, useScroll, useMotionValue, useTransform, animate } from 'framer-motion';
import Image from 'next/image';
import Link from 'next/link';
import { ArrowRight } from 'lucide-react';

const layers = [
  {
    id: '01',
    title: 'Identity Layer',
    subtitle: 'THE ANCHOR',
    description: 'Your core .any identity that links wallets and accounts into one privacy-first profile you control.',
    cta: 'See Identity Specs',
    visualSrc: '/identity-layer.svg',
    iconSrc: '/identity-bgicon.svg',
    color: 'rgba(166, 131, 255, 1)',
    link: '/identity',
  },
  {
    id: '02',
    title: 'Reputation Layer',
    subtitle: 'THE MULTIPLIER',
    description: 'The portable measure of trust built from your onchain activity and achievements, forming a compounding status.',
    cta: 'View Trust Model',
    visualSrc: '/reputation-layer.svg',
    iconSrc: '/reputation-bgicon.svg',
    color: 'rgba(59, 130, 246, 1)',
    link: 'https://docs.onzks.com',
  },
  {
    id: '03',
    title: 'Proof Layer',
    subtitle: 'THE SHIELD',
    description: 'Zero-knowledge proofs that let you verify facts privately without exposing sensitive data.',
    cta: 'Explore Proof Tech',
    visualSrc: '/proof-layer.svg',
    iconSrc: '/proof-bgicon.svg',
    color: 'rgba(16, 185, 129, 1)',
    link: 'https://docs.onzks.com',
  },
  {
    id: '04',
    title: 'Utility Layer',
    subtitle: 'THE UNLOCK',
    description: 'Where apps use your identity and proofs to unlock access, rewards, and permissions through a secure gateway.',
    cta: 'Discover App Utility',
    visualSrc: '/utility-layer.svg',
    iconSrc: '/utility-bgicon.svg',
    color: 'rgba(166, 131, 255, 1)',
    link: 'https://docs.onzks.com',
  }
];

// --- Internal Score Counter with Fluctuations ---
const ScoreCounter = ({ value }: { value: number }) => {
  const count = useMotionValue(value - 500);
  const [display, setDisplay] = useState(value - 500);
  const [isMounted, setIsMounted] = useState(false);

  useEffect(() => {
    setIsMounted(true);
  }, []);

  useEffect(() => {
    if (!isMounted) return;
    
    // Initial count up
    const controls = animate(count, value, { 
      duration: 3, 
      ease: [0.16, 1, 0.3, 1] 
    });
    
    const unsubscribe = count.on("change", (latest) => setDisplay(Math.round(latest)));

    // Small fluctuations after initial count
    const interval = setInterval(() => {
      const fluctuation = value + (Math.random() * 40 - 20);
      animate(count, fluctuation, { duration: 2, ease: "easeInOut" });
    }, 3000);

    return () => {
      controls.stop();
      unsubscribe();
      clearInterval(interval);
    };
  }, [value, count, isMounted]);

  if (!isMounted) return <span>{(value - 500).toLocaleString()}</span>;

  return <span>{display.toLocaleString()}</span>;
};

// --- Internal Score Gainer Effect ---
const ScoreGainer = () => {
  const gainTypes = [
    { text: 'Wallet Age', color: 'text-green-400' },
    { text: 'NFT Holder', color: 'text-blue-400' },
    { text: 'Transaction', color: 'text-emerald-400' },
    { text: 'Governance', color: 'text-purple-400' },
    { text: 'Sybil Check', color: 'text-lightblueprimary' },
    { text: 'Swap Volume', color: 'text-cyan-400' },
    { text: 'Early Adopter', color: 'text-yellow-400' },
  ];

  const [gains, setGains] = useState<{ id: number; label: string; value: string; x: number; y: number; color: string }[]>([]);

  useEffect(() => {
    const interval = setInterval(() => {
      const id = Date.now();
      const type = gainTypes[Math.floor(Math.random() * gainTypes.length)];
      const val = `+${Math.floor(Math.random() * 100 + 10)}`;
      
      // Scatter points around the shield area
      const x = (Math.random() - 0.5) * 350; 
      const y = (Math.random() - 0.5) * 300;
      
      setGains(prev => [...prev.slice(-5), { id, label: type.text, value: val, x, y, color: type.color }]);
      
      setTimeout(() => {
        setGains(prev => prev.filter(g => g.id !== id));
      }, 2500);
    }, 1200);

    return () => clearInterval(interval);
  }, []);

  return (
    <div className="absolute inset-0 pointer-events-none flex items-center justify-center">
      <AnimatePresence>
        {gains.map((gain) => (
          <motion.div
            key={gain.id}
            initial={{ opacity: 0, scale: 0.5, filter: "blur(4px)" }}
            animate={{ opacity: [0, 1, 1, 0], scale: [0.8, 1, 1, 0.9], filter: "blur(0px)" }}
            exit={{ opacity: 0 }}
            transition={{ duration: 2, ease: "easeOut" }}
            className="absolute flex flex-col items-center z-50"
            style={{ x: gain.x, y: gain.y }}
          >
            <div className={`font-mono font-black text-[10px] md:text-sm ${gain.color} drop-shadow-[0_0_12px_rgba(0,0,0,0.8)]`}>
              {gain.value}
            </div>
            <div className="text-[7px] md:text-[9px] uppercase tracking-[0.2em] text-white/40 font-bold bg-black/40 px-2 py-0.5 rounded-full border border-white/5 backdrop-blur-sm mt-1">
              {gain.label}
            </div>
          </motion.div>
        ))}
      </AnimatePresence>
    </div>
  );
};

// --- Internal Reputation Rising Effect (Now just ScoreGainer) ---
const ReputationRising = () => {
  return (
    <div className="absolute inset-0 pointer-events-none flex items-center justify-center scale-[0.8] md:scale-100">
      <ScoreGainer />
    </div>
  );
};

// --- Internal Rising Identity Text for Identity Layer ---
const RisingIdentityText = () => {
  const identities = [
    'BTC.any', 'Eth.any', 'DeFi.any', 'AI.any', 'RWA.any', 
    'Swap.any', 'Whale.any', 'Pump.any', 'Meme.any', 'Perps.any', 
    'Base.any', 'business.any', 'payment.any', 'social.any', 'School.any'
  ];

  return (
    <div className="absolute inset-0 pointer-events-none overflow-hidden flex items-center justify-center scale-[0.8] md:scale-100">
      <div className="relative w-full h-full max-w-2xl mx-auto">
        {identities.map((text, i) => (
          <motion.div
            key={i}
            initial={{ y: 400, opacity: 0, x: (i % 5 - 2) * 120 }}
            animate={{ 
              y: -500, 
              opacity: [0, 0.6, 0.6, 0],
              x: (i % 5 - 2) * 120 + Math.sin(i) * 30 
            }}
            transition={{
              duration: 10 + Math.random() * 5,
              repeat: Infinity,
              delay: i * 0.6,
              ease: "linear"
            }}
            className="absolute font-mono text-[9px] md:text-sm text-lightblueprimary/30 font-bold tracking-widest whitespace-nowrap"
            style={{ 
              left: '50%', 
              marginLeft: '-40px',
              top: '50%'
            }}
          >
            {text}
          </motion.div>
        ))}
      </div>
    </div>
  );
};

// --- Internal Utility Hub Effect for Utility Layer ---
const UtilityHub = () => {
  const utilityTags = [
    'Lending', 'AI', 'Gaming', 'Insurance', 'RWA', 
    'Loyalty', 'Airdrop', 'DEX', 'Perps', 'Launchpad'
  ];

  const [visibleTags, setVisibleTags] = useState<{ id: number; text: string; side: 'left' | 'right'; y: number }[]>([]);

  useEffect(() => {
    let tagCounter = 0;
    const interval = setInterval(() => {
      const id = Date.now();
      const text = utilityTags[tagCounter % utilityTags.length];
      const side = Math.random() > 0.5 ? 'right' : 'left';
      const yOffset = (Math.random() - 0.5) * 200; // Vary height slightly
      
      setVisibleTags(prev => {
        // Keep up to 2 per side
        const leftCount = prev.filter(t => t.side === 'left').length;
        const rightCount = prev.filter(t => t.side === 'right').length;
        
        if (side === 'left' && leftCount >= 2) return prev;
        if (side === 'right' && rightCount >= 2) return prev;
        
        return [...prev, { id, text, side, y: yOffset }];
      });

      setTimeout(() => {
        setVisibleTags(prev => prev.filter(t => t.id !== id));
      }, 4000);

      tagCounter++;
    }, 1500); // Staggered appearance every 1.5s

    return () => clearInterval(interval);
  }, [utilityTags.length]);

  return (
    <div className="absolute inset-0 pointer-events-none flex items-center justify-center">
      <div className="relative w-full h-full flex items-center justify-center scale-[0.8] md:scale-100">
        {/* Staggered Side Text Tags */}
        <div className="absolute inset-0 z-20">
          <AnimatePresence>
            {visibleTags.map((tag) => (
              <motion.div
                key={tag.id}
                initial={{ x: tag.side === 'left' ? -40 : 40, opacity: 0 }}
                animate={{ x: tag.side === 'left' ? 0 : 0, opacity: 1 }}
                exit={{ x: tag.side === 'left' ? 40 : -40, opacity: 0 }}
                transition={{ duration: 1.2, ease: "easeOut" }}
                className="absolute bg-white/5 backdrop-blur-md border border-white/10 px-4 py-1.5 rounded-full"
                style={{ 
                  left: tag.side === 'left' ? '10%' : 'auto', 
                  right: tag.side === 'right' ? '10%' : 'auto',
                  top: `calc(50% + ${tag.y}px)`
                }}
              >
                <span className={`text-[10px] md:text-xs font-mono font-bold tracking-widest uppercase ${tag.side === 'left' ? 'text-lightblueprimary' : 'text-white/60'}`}>
                  {tag.text}
                </span>
              </motion.div>
            ))}
          </AnimatePresence>
        </div>

        {/* Pulsing connection circles */}
        {[1, 2, 3].map((i) => (
          <motion.div
            key={i}
            initial={{ scale: 0.6, opacity: 0 }}
            animate={{ scale: 1.4, opacity: [0, 0.15, 0] }}
            transition={{
              duration: 5,
              repeat: Infinity,
              delay: i * 1.6,
              ease: "easeOut"
            }}
            className="absolute w-[300px] h-[300px] md:w-[500px] md:h-[500px] border border-white/5 rounded-[40px] rotate-45"
          />
        ))}
        
        {/* Data Transmission Particles */}
        {Array.from({ length: 12 }).map((_, i) => (
          <motion.div
            key={i}
            initial={{ opacity: 0, scale: 0 }}
            animate={{ 
              opacity: [0, 1, 0],
              scale: [0, 1.5, 0],
              x: [0, (Math.random() - 0.5) * 400],
              y: [0, (Math.random() - 0.5) * 400],
            }}
            transition={{
              duration: 4,
              repeat: Infinity,
              delay: i * 0.3,
              ease: "easeOut"
            }}
            className="absolute w-1 h-1 bg-lightblueprimary/40 rounded-full"
          />
        ))}
      </div>
    </div>
  );
};

// --- Internal Solid Rotating Ring for Proof Layer ---
const SolidRotatingRing = () => {
  return (
    <div className="absolute inset-0 pointer-events-none flex items-center justify-center" style={{ perspective: '1000px' }}>
      <div 
        className="relative flex items-center justify-center scale-[0.6] md:scale-100"
        style={{ 
          transform: 'rotateX(75deg) rotateY(-10deg)',
          transformStyle: 'preserve-3d' 
        }}
      >
        {/* The Solid Physical Ring */}
        <div 
          className="absolute border-[16px] border-lightblueprimary/20 rounded-full"
          style={{ 
            width: '480px', 
            height: '480px',
            boxShadow: 'inset 0 0 40px rgba(166, 131, 255, 0.1), 0 0 40px rgba(166, 131, 255, 0.1)',
            transform: 'translateZ(0px)'
          }}
        >
          {/* Inner highlight for "solid" look */}
          <div className="absolute inset-0 border border-white/10 rounded-full" />
          <div className="absolute -inset-[1px] border border-black/20 rounded-full" />
          
          {/* Light Streaks passing through the ring */}
          <motion.div
            animate={{ rotate: 360 }}
            transition={{ duration: 4, repeat: Infinity, ease: "linear" }}
            className="absolute inset-0"
          >
            <div 
              className="absolute top-0 left-1/2 -translate-x-1/2 w-32 h-4 bg-gradient-to-r from-transparent via-lightblueprimary to-transparent blur-md opacity-80"
              style={{ transform: 'translateY(-10px)' }}
            />
          </motion.div>

          <motion.div
            animate={{ rotate: -360 }}
            transition={{ duration: 7, repeat: Infinity, ease: "linear" }}
            className="absolute inset-0"
          >
            <div 
              className="absolute bottom-0 left-1/2 -translate-x-1/2 w-48 h-4 bg-gradient-to-r from-transparent via-white/40 to-transparent blur-lg opacity-40"
              style={{ transform: 'translateY(10px)' }}
            />
          </motion.div>
        </div>

        {/* Secondary Inner Ring */}
        <div 
          className="absolute border-[4px] border-lightblueprimary/10 rounded-full"
          style={{ 
            width: '400px', 
            height: '400px',
            transform: 'translateZ(10px)'
          }}
        />
      </div>
    </div>
  );
};

const LuminousVisual = ({ active }: { active: number }) => {
  const purpleGlow = "rgba(166, 131, 255, 0.4)"; // Uniform purple for all layers

  return (
    <div className="relative w-full h-full flex items-center justify-center">
      <AnimatePresence mode="popLayout">
        <motion.div
          key={active}
          initial={{ opacity: 0, scale: 0.9, y: 10, filter: 'blur(10px)' }}
          animate={{ opacity: 1, scale: 1, y: 0, filter: 'blur(0px)' }}
          exit={{ opacity: 0, scale: 1.05, y: -10, filter: 'blur(10px)' }}
          transition={{ duration: 0.3, ease: "easeOut" }}
          className="relative w-[240px] h-[240px] md:w-[600px] md:h-[600px] flex items-center justify-center"
        >
          {/* Main Glow Backdrop - NOW UNIFORM PURPLE */}
          <motion.div 
            animate={{ 
              opacity: [0.15, 0.3, 0.15],
              scale: [1, 1.2, 1]
            }}
            transition={{ duration: 5, repeat: Infinity, ease: "easeInOut" }}
            className="absolute inset-0 blur-[120px] rounded-full pointer-events-none"
            style={{ backgroundColor: purpleGlow }}
          />

          {/* Asset Container (Bouncing removed) */}
          <motion.div className="relative z-10 w-full h-full flex items-center justify-center" style={{ transformStyle: 'preserve-3d' }}>
            <div className="relative w-full h-full flex items-center justify-center">
              <Image 
                src={layers[active].visualSrc} 
                alt="" 
                width={600} 
                height={600} 
                className="w-full h-full object-contain drop-shadow-[0_40px_80px_rgba(0,0,0,0.6)]"
                priority
              />

                      {/* Redesigned Total Trust Score Display - NOW RECTANGULAR & BELOW */}
                      {active === 1 && (
                        <div className="absolute bottom-10 md:bottom-16 left-1/2 -translate-x-1/2 z-20 w-[240px] md:w-[320px] scale-[0.8] md:scale-100">
                          <motion.div 
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            className="relative"
                          >
                            {/* Industrial Score Plate - Horizontal Rectangular */}
                            <div className="relative bg-[#0D0D12]/90 backdrop-blur-xl border border-white/10 px-4 md:px-6 py-3 md:py-4 rounded-[16px] md:rounded-[20px] shadow-[0_20px_40px_rgba(0,0,0,0.6)] flex items-center justify-between gap-4 md:gap-6">
                              
                              <div className="flex flex-col gap-0.5 md:gap-1">
                                <div className="flex items-center gap-1.5">
                                  <div className="w-1 h-1 rounded-full bg-lightblueprimary" />
                                  <span className="text-[7px] md:text-[8px] font-mono text-white/30 uppercase tracking-[0.2em] font-black">Trust Index</span>
                                </div>
                                <div className="text-xl md:text-3xl font-mono text-white font-black tracking-tighter">
                                  <ScoreCounter value={8402} />
                                </div>
                              </div>

                              <div className="h-8 md:h-10 w-px bg-white/5" />

                              <div className="flex flex-col gap-0.5 md:gap-1 flex-1">
                                <div className="flex justify-between items-center text-[6px] md:text-[7px] font-mono uppercase tracking-widest text-white/20">
                                  <span>Verification</span>
                                  <span className="text-lightblueprimary">HUMAN</span>
                                </div>
                                <div className="w-full h-1 bg-white/5 rounded-full overflow-hidden mt-1">
                                  <motion.div 
                                    initial={{ width: 0 }}
                                    animate={{ width: '84%' }}
                                    transition={{ duration: 2, delay: 0.5 }}
                                    className="h-full bg-gradient-to-r from-blueprimary to-lightblueprimary"
                                  />
                                </div>
                              </div>
                            </div>
                          </motion.div>
                        </div>
                      )}
            </div>

            {/* Effects Rendered ON TOP of the Asset */}
            <div className="absolute inset-0 z-50 pointer-events-none">
              {/* Rising Identity Text (Only for Identity Layer) */}
              {active === 0 && <RisingIdentityText />}

              {/* Reputation Rising Effect (Only for Reputation Layer) */}
              {active === 1 && <ReputationRising />}
              
              {/* Solid Ring Effect (Only for Proof Layer) */}
              {active === 2 && <SolidRotatingRing />}

              {/* Utility Hub Effect (Only for Utility Layer) */}
              {active === 3 && <UtilityHub />}
            </div>
          </motion.div>

          {/* Ground Reflection Shadow */}
          <div className="absolute -bottom-16 left-1/2 -translate-x-1/2 w-72 h-8 bg-black/80 blur-3xl rounded-full opacity-50 pointer-events-none" />
        </motion.div>
      </AnimatePresence>
    </div>
  );
};

const IndustrialArchitecture = () => {
  const [active, setActive] = useState(0);
  const total = layers.length;

  return (
    <section 
      id="architecture" 
      className="relative bg-[#08080C] overflow-hidden select-none py-20 md:py-32"
    >
      {/* Background Atmosphere */}
      <div className="absolute inset-0 pointer-events-none bg-[radial-gradient(circle_at_50%_50%,rgba(166,131,255,0.03),transparent_70%)]" />

      <div className="max-w-screen-xl mx-auto px-6 md:px-10 w-full relative z-10">
        <div className="flex flex-col md:grid md:grid-cols-2 gap-10 md:gap-40 items-center mb-24">
          
          {/* Left Column: Clean Text */}
          <div className="order-2 md:order-1 relative min-h-[400px] flex flex-col justify-center items-center md:items-start text-center md:text-left">
            <AnimatePresence mode="wait">
              <motion.div
                key={active}
                initial={{ opacity: 0, x: -10, filter: 'blur(5px)' }}
                animate={{ opacity: 1, x: 0, filter: 'blur(0px)' }}
                exit={{ opacity: 0, x: 5, filter: 'blur(5px)' }}
                transition={{ duration: 0.25, ease: "easeOut" }}
                className="space-y-6 md:space-y-8"
              >
                <div className="space-y-4">
                  <div className="flex items-center justify-center md:justify-start gap-3">
                    <span className="text-lightblueprimary font-mono text-[10px] uppercase tracking-[0.4em] font-black">
                      {layers[active].id}
                    </span>
                    <div className="h-px w-8 bg-lightblueprimary/20" />
                    <span className="text-white/20 font-mono text-[10px] uppercase tracking-[0.4em]">
                      {layers[active].subtitle}
                    </span>
                  </div>
                  
                  <div className="flex items-center justify-center md:justify-start">
                    <h3 className="text-4xl md:text-6xl font-geist font-black uppercase text-white tracking-tighter lg:tracking-[-0.05em] leading-none">
                      {layers[active].title}
                    </h3>
                  </div>
                </div>

                <p className="text-white/40 text-base md:text-xl font-light leading-relaxed max-w-lg">
                  {layers[active].description}
                </p>

                <div className="pt-2 md:pt-4 flex justify-center md:justify-start">
                  <Link
                    href={layers[active].link}
                    target={layers[active].link.startsWith('http') ? "_blank" : "_self"}
                    rel={layers[active].link.startsWith('http') ? "noopener noreferrer" : ""}
                    className="relative active:translate-y-0.5 transition-all w-fit block group"
                  >
                    <div className={`absolute inset-0 blur-2xl opacity-0 group-hover:opacity-20 transition-opacity ${active === 0 ? 'bg-lightblueprimary' : 'bg-white'}`} />
                    <div className={`relative px-8 md:px-10 py-3 md:py-4 backdrop-blur-xl font-black rounded-full transition-all text-[10px] md:text-[11px] tracking-[0.3em] uppercase flex items-center gap-4 border shadow-2xl ${
                      active === 0 
                        ? 'bg-lightblueprimary text-black border-lightblueprimary' 
                        : 'bg-white/[0.03] text-white border-white/10'
                    }`}>
                      {layers[active].cta}
                      <ArrowRight size={16} className={`${active === 0 ? 'text-black' : 'text-white/40 group-hover:text-white'} transition-all`} />
                    </div>
                  </Link>
                </div>
              </motion.div>
            </AnimatePresence>
          </div>

          {/* Right Column: Luminous Visual */}
          <div className="order-1 md:order-2 relative flex justify-center items-center h-[35vh] md:h-[60vh] w-full">
             <LuminousVisual active={active} />
          </div>
        </div>

        {/* --- SUBTLE MINIMAL SELECTOR --- */}
        <div className="flex justify-center mt-12">
          <div className="inline-flex items-center bg-[#0D0D12]/40 backdrop-blur-md border border-white/5 rounded-full px-2 py-1.5 shadow-2xl">
            {layers.map((layer, i) => (
              <button
                key={layer.id}
                onClick={() => setActive(i)}
                className="relative px-6 py-2.5 outline-none"
              >
                <div className="relative z-10 flex items-center gap-2">
                  <span className={`font-mono text-[9px] font-black tracking-widest transition-colors ${active === i ? 'text-lightblueprimary' : 'text-white/20'}`}>
                    {layer.id}
                  </span>
                  <span className={`text-[10px] uppercase tracking-[0.2em] font-medium transition-colors ${active === i ? 'text-white' : 'text-white/10'}`}>
                    {layer.title.replace(' Layer', '')}
                  </span>
                </div>

                {active === i && (
                  <motion.div
                    layoutId="activeArchitectureTab"
                    className="absolute inset-0 bg-white/5 border border-white/10 rounded-full z-0"
                    transition={{ type: "spring", stiffness: 600, damping: 30 }}
                  />
                )}
              </button>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

export default IndustrialArchitecture;
