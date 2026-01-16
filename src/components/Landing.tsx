import React, { useState, useEffect, useRef } from 'react';
import { AnimatePresence, motion, useMotionValueEvent, useScroll } from 'framer-motion';
import Image from 'next/image';
import ClientsLogo from './ClientsLogo';
import ParallelCards from './ParallelCards';
import IndustrialCapital from './IndustrialCapital';
import CodeIntegration from './CodeIntegration';
import Faqs from './Faqs';
import { Footer } from './layout/Footer';
import IndustrialArchitecture from './IndustrialArchitecture';
import Architecture from './Architecture';
import { Header } from './layout/Header';
import AutoPopupModal from './Popup';
import { 
  Shield, 
  Lock, 
  Cpu, 
  Globe, 
  Fingerprint, 
  Zap, 
  Activity, 
  ShieldCheck, 
  Search,
  Database,
  Terminal,
  Server,
  Network,
  Maximize2,
  ChevronRight,
  MoreHorizontal,
  Settings,
  Box,
  Sparkles,
  Plus,
  Layers,
  Lock as LockIcon
} from 'lucide-react';

const PROCESS_DATA = [
  {
    id: "01",
    title: "Enroll",
    desc: "Create a private ZK identity; link multiple wallets or bind an agent to a controller.",
    icon: <Fingerprint className="w-6 h-6" />,
    color: "#A683FF"
  },
  {
    id: "02",
    title: "Aggregate",
    desc: "Reputation composes from on/off‑chain signals (repayments, activity, contributions). commitments are anchored on‑chain.",
    icon: <Activity className="w-6 h-6" />,
    color: "#8B5CF6"
  },
  {
    id: "03",
    title: "Prove",
    desc: "Share selective, zero‑knowledge proofs like “credit ≥ 720,” or “agent within policy.”",
    icon: <ShieldCheck className="w-6 h-6" />,
    color: "#7C3AED"
  },
  {
    id: "04",
    title: "Verify & Act",
    desc: "dApps accept the proof and apply pricing, gates, or limits. No PII, no portfolio dumps.",
    icon: <Zap className="w-6 h-6" />,
    color: "#6D28D9"
  }
];

const ProcessFlow = () => {
  const [design, setDesign] = useState(1);
  const containerRef = useRef(null);
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start end", "end start"]
  });

  return (
    <div ref={containerRef} className="bg-black py-32 md:py-48 relative border-t border-white/5">
      {/* Design Switcher */}
      <div className="absolute top-12 left-1/2 -translate-x-1/2 z-50 flex gap-2 bg-white/5 p-1 rounded-full border border-white/10 backdrop-blur-xl">
        {[1, 2, 3, 4, 5].map((d) => (
          <button
            key={d}
            onClick={() => setDesign(d)}
            className={`px-4 py-1.5 rounded-full text-[10px] font-black uppercase tracking-widest transition-all ${
              design === d ? 'bg-lightblueprimary text-black' : 'text-white/40 hover:text-white'
            }`}
          >
            Design {d}
          </button>
        ))}
      </div>

      <div className="max-w-7xl mx-auto px-6">
        <div className="mb-24 text-center space-y-4">
          <span className="text-lightblueprimary font-mono text-[10px] uppercase tracking-[0.5em] font-black">Architecture Flow</span>
          <h2 className="text-4xl md:text-6xl font-black tracking-tighter uppercase italic text-white leading-none">
            How .any <span className="text-white/20">Works.</span>
          </h2>
        </div>

        {/* Option 1: The Signal Line */}
        {design === 1 && (
          <div className="relative max-w-4xl mx-auto">
            <div className="absolute left-1/2 top-0 bottom-0 w-px bg-white/10 -translate-x-1/2">
              <motion.div 
                style={{ height: "100%", scaleY: scrollYProgress, transformOrigin: "top" }}
                className="w-full bg-lightblueprimary shadow-[0_0_20px_rgba(166,131,255,0.8)]"
              />
            </div>
            <div className="space-y-32">
              {PROCESS_DATA.map((p, i) => (
                <motion.div 
                  key={i}
                  initial={{ opacity: 0, x: i % 2 === 0 ? -40 : 40 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true, margin: "-100px" }}
                  className={`flex items-center gap-12 ${i % 2 === 0 ? 'flex-row' : 'flex-row-reverse'} text-left`}
                >
                  <div className="flex-1 space-y-4">
                    <div className="flex items-center gap-4">
                      <span className="text-4xl font-black text-white/10 font-mono tracking-tighter italic">{p.id}</span>
                      <h3 className="text-2xl font-black uppercase tracking-tight text-lightblueprimary italic">{p.title}</h3>
                    </div>
                    <p className="text-white/40 text-lg leading-relaxed font-medium italic">{p.desc}</p>
                  </div>
                  <div className="relative flex items-center justify-center">
                    <div className="w-12 h-12 rounded-full bg-black border border-lightblueprimary flex items-center justify-center z-10 shadow-[0_0_30px_rgba(166,131,255,0.3)]">
                      {p.icon}
                    </div>
                  </div>
                  <div className="flex-1" />
                </motion.div>
              ))}
            </div>
          </div>
        )}

        {/* Option 2: The Depth Stack */}
        {design === 2 && (
          <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
            {PROCESS_DATA.map((p, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, y: 40, scale: 0.9 }}
                whileInView={{ opacity: 1, y: 0, scale: 1 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.15, duration: 0.8 }}
                className="relative group perspective-[1000px]"
              >
                <div className="absolute inset-0 bg-lightblueprimary/5 blur-[60px] rounded-full opacity-0 group-hover:opacity-100 transition-opacity" />
                <div className="relative space-y-8 p-8 border-l border-white/5 hover:border-lightblueprimary/40 transition-colors">
                  <span className="text-8xl font-black text-white/[0.03] absolute -top-4 -left-4 font-mono select-none">{p.id}</span>
                  <div className="w-14 h-14 rounded-2xl bg-white/[0.03] flex items-center justify-center text-lightblueprimary group-hover:scale-110 transition-transform duration-500">
                    {p.icon}
                  </div>
                  <div className="space-y-4">
                    <h3 className="text-2xl font-black uppercase tracking-tighter italic text-white group-hover:text-lightblueprimary transition-colors">{p.title}</h3>
                    <p className="text-white/30 text-base leading-relaxed font-medium">{p.desc}</p>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        )}

        {/* Option 3: Kinetic Beam */}
        {design === 3 && (
          <div className="space-y-4">
            {PROCESS_DATA.map((p, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0.2 }}
                whileInView={{ opacity: 1 }}
                viewport={{ margin: "-200px" }}
                className="group relative py-12 flex flex-col md:flex-row items-center gap-12 border-b border-white/5 last:border-0"
              >
                <div className="absolute inset-0 bg-gradient-to-r from-lightblueprimary/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity" />
                <div className="flex items-center gap-8 min-w-[240px]">
                  <span className="text-2xl font-mono font-black text-lightblueprimary opacity-40">{p.id}</span>
                  <h3 className="text-4xl md:text-5xl font-black uppercase tracking-tighter italic text-white">{p.title}</h3>
                </div>
                <p className="flex-1 text-white/40 text-xl leading-relaxed font-medium italic group-hover:text-white transition-colors duration-500">
                  {p.desc}
                </p>
                <div className="w-16 h-16 rounded-full border border-white/10 flex items-center justify-center text-white/20 group-hover:text-lightblueprimary group-hover:border-lightblueprimary transition-all duration-500 rotate-45 group-hover:rotate-0">
                  <Plus size={24} />
                </div>
              </motion.div>
            ))}
          </div>
        )}

        {/* Option 4: Orbital Node */}
        {design === 4 && (
          <div className="relative h-[600px] flex items-center justify-center overflow-hidden">
            <div className="absolute inset-0 pointer-events-none">
              <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[800px] border border-white/5 rounded-full animate-[spin_60s_linear_infinite]" />
              <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[500px] h-[500px] border border-white/10 rounded-full animate-[spin_40s_linear_infinite_reverse]" />
            </div>
            
            <div className="relative z-10 grid grid-cols-1 md:grid-cols-2 gap-x-32 gap-y-16">
              {PROCESS_DATA.map((p, i) => (
                <motion.div
                  key={i}
                  animate={{ y: [0, i % 2 === 0 ? 15 : -15, 0] }}
                  transition={{ duration: 4, repeat: Infinity, ease: "easeInOut", delay: i * 0.5 }}
                  className="max-w-xs space-y-4 group cursor-default"
                >
                  <div className="flex items-center gap-4">
                    <div className="w-12 h-12 rounded-full bg-lightblueprimary/10 border border-lightblueprimary/30 flex items-center justify-center text-lightblueprimary shadow-[0_0_20px_rgba(166,131,255,0.2)] group-hover:scale-110 group-hover:shadow-[0_0_40px_rgba(166,131,255,0.4)] transition-all">
                      {p.icon}
                    </div>
                    <h3 className="text-xl font-black uppercase tracking-widest text-white italic group-hover:text-lightblueprimary transition-colors">{p.title}</h3>
                  </div>
                  <p className="text-white/30 text-sm leading-relaxed font-medium pl-16 group-hover:text-white/60 transition-colors">{p.desc}</p>
                </motion.div>
              ))}
            </div>
          </div>
        )}

        {/* Option 5: Brutalist Typographic */}
        {design === 5 && (
          <div className="space-y-16 py-12">
            {PROCESS_DATA.map((p, i) => (
              <motion.div 
                key={i}
                whileHover={{ x: 20 }}
                className="group cursor-default border-l-4 border-white/5 hover:border-lightblueprimary pl-12 transition-all duration-500"
              >
                <div className="flex flex-col md:flex-row md:items-end gap-6 md:gap-12">
                  <h3 className="text-6xl md:text-9xl font-black uppercase tracking-tighter italic text-white/5 group-hover:text-white transition-all duration-700 leading-none">
                    {p.title}
                  </h3>
                  <div className="pb-4 space-y-4 max-w-xl opacity-40 group-hover:opacity-100 transition-all duration-700">
                    <div className="flex items-center gap-4">
                      <span className="text-lightblueprimary font-mono text-sm font-black uppercase tracking-[0.3em]">Step 0{i+1}</span>
                      <div className="h-px w-12 bg-lightblueprimary/40" />
                    </div>
                    <p className="text-white text-xl md:text-2xl font-medium tracking-tight italic leading-snug">
                      {p.desc}
                    </p>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

const trustScoreFeatures = [
    {
      title: "Sybil resistance",
      description: "Sybil resistance prevents fake accounts and multi-wallet abuse through reputation and trustscore",
      icon: '/knight-shield.svg'
    },
    {
      title: "AI + Human scoring",
      description: "AI Engine evaluates behavior, risk, and reliability for humans, wallets, and autonomous agents.",
      icon: '/robotic.svg'
    },
    {
      title: "zero-knowledge prove",
      description: "zero-knowledge proof verify identity, reputation, and trust without exposing personal data",
      icon: '/circle-lock.svg',
      isPurple: true
    },
    {
      title: "Cross-chain comparability",
      description: "Cross-chain support works across multiple blockchains, allowing identity and trust move freely",
      icon: '/flow.svg'
    }
  ];

export default function HomePage() {
  return <LandingPage />;
}

interface LandingPageProps {
  enableRevolvingAnimation?: boolean;
}

export function LandingPage({ enableRevolvingAnimation = false }: LandingPageProps = {}) {
  const words = ['Humans', 'Wallets', 'AI Agents'];
  const [currentWordIndex, setCurrentWordIndex] = useState(0);
  const [currentText, setCurrentText] = useState('');
  const [isDeleting, setIsDeleting] = useState(false);

  useEffect(() => {
    const currentWord = words[currentWordIndex];
    const typingSpeed = isDeleting ? 50 : 100;
    const pauseTime = isDeleting ? 500 : 2000;

    const timer = setTimeout(() => {
      if (!isDeleting) {
        // Typing forward
        if (currentText.length < currentWord.length) {
          setCurrentText(currentWord.slice(0, currentText.length + 1));
        } else {
          // Finished typing, wait then start deleting
          setTimeout(() => setIsDeleting(true), pauseTime);
        }
      } else {
        // Deleting backward
        if (currentText.length > 0) {
          setCurrentText(currentText.slice(0, -1));
        } else {
          // Finished deleting, move to next word
          setIsDeleting(false);
          setCurrentWordIndex((prev) => (prev + 1) % words.length);
        }
      }
    }, typingSpeed);

    return () => clearTimeout(timer);
  }, [currentText, isDeleting, currentWordIndex, words]);

  const Badge = ({ label, subtitle }: { label: string, subtitle: string }) => (
    <div className="flex items-center justify-start gap-3 mb-12">
      <div className="w-1.5 h-1.5 rounded-full bg-lightblueprimary shadow-[0_0_12px_rgba(166,131,255,0.8)] animate-pulse" />
      <span className="text-lightblueprimary font-mono text-[10px] uppercase tracking-[0.4em] font-black">{label}</span>
      <div className="h-px w-8 bg-white/10" />
      <span className="text-white/20 font-mono text-[10px] uppercase tracking-[0.4em]">{subtitle}</span>
    </div>
  );

  // --- TRUST SCORE SECTION (Infinex-Inspired Design) ---
  const TrustScoreSection = () => (
    <div className="flex flex-col items-center text-center">
      {/* Header Area */}
      <div className="mb-20 space-y-4">
        <span className="text-lightblueprimary font-mono text-[10px] uppercase tracking-[0.6em] font-black opacity-60">
          Trust Protocol
        </span>
        <h2 className="text-[2.5rem] md:text-[4.5rem] font-geist font-black uppercase text-primaryText leading-[0.95] tracking-tighter lg:tracking-[-0.05em] max-w-4xl mx-auto">
          Trustscore that <br className="hidden md:block" />
          unlocks <span className="text-lightblueprimary">Anything</span>
        </h2>
      </div>

      {/* 4-Column Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8 md:gap-x-12 md:gap-y-16 w-full text-left max-w-5xl">
        {trustScoreFeatures.map((f: any, i) => (
          <div key={i} className="space-y-5 group">
          <div className={`w-8 h-8 flex items-center justify-center transition-all duration-300 ${f.isPurple ? 'text-purple-400' : 'text-white'}`}>
            <Image 
              src={f.icon} 
              alt={f.title} 
              width={28} 
              height={28} 
              className={`w-full h-full object-contain ${f.isPurple ? 'opacity-100' : 'opacity-60'}`} 
            />
          </div>
            <div className="space-y-2">
              <h4 className="text-lg font-medium text-white tracking-tight">
                {f.title}
              </h4>
              <p className="text-xs md:text-sm text-white/30 leading-relaxed font-light max-w-[240px]">
                {f.description}
              </p>
            </div>
          </div>
        ))}
      </div>

      {/* Button - Moved below grid */}
      <div className="mt-24">
        <button className="bg-lightblueprimary text-black px-10 py-4 rounded-full font-bold text-[11px] uppercase tracking-[0.2em] transition-[filter,transform,box-shadow,background-color] duration-300 hover:brightness-110 active:scale-[0.98] shadow-[0_10px_30px_rgba(166,131,255,0.2)]">
          Explore Protocol
        </button>
      </div>
    </div>
  );

  return (
    <>
    <div className="relative w-full min-w-full font-geist">
        {/* Header & Banner */}
        <Header />
        <section className="relative pt-20 lg:pt-24 pb-10 lg:pb-20 overflow-hidden bg-[url('/swatch.png')] bg-cover bg-top ">
          {/* Banner Section */}
          <div className="relative overflow-hidden max-w-screen-xl mx-auto">
            <div className="relative max-w-[800px] mx-auto px-5 pt-16 md:pt-20 pb-10 md:pb-24 z-10">
                <motion.div
                  initial={{ opacity: 0 }}
                  whileInView={{ opacity: 1 }}
                  viewport={{ once: true, amount: 0.2 }}
                  transition={{ duration: 0.8 }}
                  className="text-center"
                >
                  <div className="space-y-6 z-10 text-center">
                    <div className="flex items-center justify-center gap-3 mb-6">
                      <div className="w-1.5 h-1.5 rounded-full bg-lightblueprimary shadow-[0_0_12px_rgba(166,131,255,0.8)] animate-pulse" />
                      <span className="text-lightblueprimary font-mono text-[10px] uppercase tracking-[0.4em] font-black">Core</span>
                      <div className="h-px w-8 bg-white/10" />
                      <span className="text-white/20 font-mono text-[10px] uppercase tracking-[0.4em]">Identity & Reputation Layer</span>
                    </div>
                  <h1 className="text-[3rem] md:text-[3.5rem] lg:text-[5rem] font-geist font-black uppercase leading-none text-primaryText tracking-tighter lg:tracking-[-0.05em]">
                      Multi-layered Trust Engine for{' '}
                    <span className="bg-gradient-to-r from-blueprimary to-lightblueprimary bg-clip-text text-transparent inline-block leading-tight min-w-[214px] md:min-w-[357px] text-left">
                        {currentText}
                        <span className="animate-pulse">|</span>
                      </span>
                    </h1>
                  <p className="text-primaryText/60 text-sm md:text-lg tracking-[-2%]">
                      A zero-knowledge trust layer that powers capital-efficient applications — from authentication to payments, launches, lending and more.
                    </p>
                    <div className="flex flex-col md:flex-row gap-6 items-center justify-center pt-4 md:pt-8">
                      <a
                        href="https://app.anylayer.org"
                        target="_blank"
                        rel="noopener noreferrer"
                        className="group relative max-w-72 md:max-w-44 w-full active:translate-y-0.5 transition-all"
                      >
                        <div className="absolute inset-0 bg-lightblueprimary blur-2xl opacity-20 group-hover:opacity-40 transition-opacity" />
                        <div className="relative bg-gradient-to-r from-blueprimary to-lightblueprimary text-primaryText font-semibold px-8 py-3.5 rounded-full transition-all text-sm lg:text-base text-center flex items-center justify-center gap-3 shadow-[0_8px_30px_rgba(166,131,255,0.2)]">
                        <span>Create ID</span>
                          <Image src="/button-arrow.svg" alt="launch app" width="14" height="14" className="w-3.5 h-3.5 lg:w-[14px] lg:h-[14px]" />
                        </div>
                      </a>
                      <a
                        href="https://drive.google.com/file/d/1yACxELpR1Qt34hMYH0DDyi6sHTQuZjVG/view?usp=sharing"
                        target="_blank"
                        rel="noopener noreferrer"
                        className="group relative max-w-72 md:max-w-44 w-full active:translate-y-0.5 transition-all"
                      >
                        <div className="absolute inset-0 bg-white blur-2xl opacity-5 group-hover:opacity-10 transition-opacity" />
                        <div className="relative bg-white/5 hover:bg-white/10 border border-white/10 text-primaryText font-medium px-8 py-3.5 rounded-full transition-all text-sm lg:text-base text-center flex items-center justify-center">
                        Documentation
                        </div>
                      </a>
                    </div>
                  </div>
                </motion.div>
            </div>
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 1, delay: 0.4, ease: "easeOut" }}
              className="absolute left-52 top-0 hidden md:block"
            >
              <Image 
                src={'/left-banner-angle.svg'} 
                alt='Left Angle' 
                width={544} 
                height={544} 
                className="w-60 h-60 lg:w-[544px] lg:h-[544px]"
              />
            </motion.div>
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 1, ease: "easeOut", delay: 0.4 }}
              className="absolute right-64 top-0 hidden md:block"
            >
              <Image 
                src={'/right-banner-angle.svg'} 
                alt='Right Angle' 
                width={544} 
                height={544} 
                className="w-60 h-60 lg:w-[544px] lg:h-[544px]"
              />
            </motion.div>
            {/* <Image src={'/right-banner-angle.svg'} alt='Right Angle' width={544} height={544} className="absolute right-64 top-0 w-32 h-32 md:w-48 md:h-48 lg:w-[544px] lg:h-[544px]"/> */}
            {/* Right side shield box */}
            <div className="hidden md:block bg-[#1C1C26]/90 rounded-xl p-4 border border-gray-700/20 max-w-[278px] w-full absolute right-0 top-10 opacity-15">
              <div className="flex items-start justify-between mb-4">
                <div className="flex items-center gap-2">
                  <div className="w-8 h-8 bg-[#CCD1E9]/5 rounded-full flex items-center justify-center">
                    <Image src={'/knight-shield.svg'} alt='Shield' width={16} height={16} />
                  </div>
                  <div className='flex flex-col'>
                    <span className="text-[#C9D1D9] text-xs font-medium font-geist">Current Tier</span>
                    <span className="text-lg font-bold text-[#CCD1E9] font-mono">Bronze</span>
                  </div>
                </div>
              </div>

              <div className='h-[1.5px] bg-[#E3E3FE]/5 mt-8 mb-3' />

              <div className="flex items-center justify-between">
                <div className="text-[#CCD1E9] text-xs font-geist">Progress to Silver</div>
                <div className="text-[#CCD1E9] text-xs font-geist">6%</div>
              </div>
              <div className='w-full h-1 bg-[#A683FF] mt-2' />
            </div>
            {/* Left side trust score box */}
            <div className="hidden md:block bg-[#1C1C26]/90 rounded-xl p-4 border border-gray-700/20 max-w-[237px] w-full absolute left-0 bottom-0 opacity-15">
              <div className="flex items-start justify-between mb-4">
                <div className="flex items-center gap-2">
                  <div className="w-8 h-8 bg-[#CCD1E9]/5 rounded-full flex items-center justify-center">
                    <Image src={'/knight-shield.svg'} alt='Shield' width={16} height={16} />
                  </div>
                  <span className="text-[#C9D1D9] text-xs font-medium font-geist">Total Trust Score</span>
                </div>
              </div>

              <div className='h-[1.5px] bg-[#E3E3FE]/5 mt-8 mb-3' />

              <div className="flex items-center justify-between">
                <motion.div
                  initial={{ scale: 0.5, opacity: 0 }}
                  animate={{ scale: 1, opacity: 1 }}
                  transition={{ duration: 0.5, delay: 0.4 }}
                  className="text-lg font-bold text-[#CCD1E9] font-mono"
                >
                  120
                </motion.div>
                <div className="text-[#A683FF] text-xs font-geist">+39 this month</div>
              </div>
            </div>
          </div>
        </section>

        {/* Partner Logos */}
        <ClientsLogo />

        <Image src="/header-purple-shade.svg" alt="Header Background Gradient" width="906" height="306" className="absolute top-0 left-0" />
        <Image src="/left-purple-shade.svg" alt="Background Gradient" width="622" height="1966" className="absolute top-96 left-0" />
        <Image src="/left-purple-shade.svg" alt="Background Gradient" width="622" height="1966" className="absolute bottom-96 left-0" />
        <Image src="/right-shade.svg" alt="Background Gradient" width="722" height="1966" className="absolute bottom-32 right-0" />

        {/* Section 2 charts */}
        <section id="reputation" className="px-5 py-10 md:py-20 max-w-screen-xl mx-auto">
          <div className="flex flex-wrap justify-between items-center gap-2">
            <div
              className="max-w-[39rem] mx-auto flex flex-col items-center"
            >
              <div className="flex items-center justify-center gap-3 mb-6">
                <div className="w-1.5 h-1.5 rounded-full bg-lightblueprimary shadow-[0_0_12px_rgba(166,131,255,0.8)] animate-pulse" />
                <span className="text-lightblueprimary font-mono text-[10px] uppercase tracking-[0.4em] font-black">Signal</span>
                <div className="h-px w-8 bg-white/10" />
                <span className="text-white/20 font-mono text-[10px] uppercase tracking-[0.4em]">Trust Analytics</span>
              </div>
              <h2 className="text-[2.25rem] lg:text-[3.25rem] font-geist font-black uppercase text-primaryText mb-6 leading-[110%] tracking-tighter lg:tracking-[-0.05em] text-center">
                {" "}
                Understand and verify <span className='bg-gradient-to-r from-blueprimary to-lightblueprimary bg-clip-text text-transparent'> trust </span> across every <span className='bg-gradient-to-r from-blueprimary to-lightblueprimary bg-clip-text text-transparent'> Signal</span>
              </h2>
              <p className="text-primaryText/60 text-base text-center px-10 ">
                Explore reputation growth, verify real users, and see what drives trust with clean visual insights and instant scoring.
              </p>
            </div>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-5 gap-5 items-stretch mt-20">
            {/* Wallet ID */}
            <div
              className='md:col-span-2'
            >
              <div className="px-6 pb-7 pt-10 rounded-[20px] bg-[#121119] h-full">
                <Image
                  src="/updated-trust-cards.svg"
                  alt="See what drives reputation clearly"
                  width="400"
                  height="319"
                  className="w-full h-[240px] md:h-[319px] object-contain mb-6 md:mb-10"
                />
                <h3 className="text-primaryText text-xl md:text-2xl font-medium mb-1 tracking-tighter">
                  {"See what drives reputation clearly"}
                </h3>
                <p className="text-primaryText/60 text-sm md:text-base tracking-tighter">
                  {
                    "Break down trust into identity, behavior, and wallet activity at a glance for everyone."
                  }
                </p>
              </div>
            </div>
            <div
              className="md:col-span-3"
            >
              <div className="px-6 pb-7 pt-10 rounded-[20px] bg-[#121119] h-full">
                <Image
                  src="/line-chart.svg"
                  alt="Real-time trust, always up-to-date"
                  width="658"
                  height="319"
                  className="w-full h-[190px] md:h-[319px] object-contain mb-6 md:mb-10"
                />
                <h3 className="text-primaryText text-xl md:text-2xl font-medium mb-1 tracking-tighter">
                  {"Real-time trust, always up-to-date"}
                </h3>
                <p className="text-primaryText/60 text-sm md:text-base tracking-tighter">
                  {
                    "Track every score change instantly across identity, wallets, and actions, allowing you to monitor growth, risks, and performance without revealing sensitive data."
                  }
                </p>
              </div>
            </div>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-5 gap-5 items-stretch mt-5">
            <div
              className="md:col-span-3"
            >
              <div className="px-6 pb-7 pt-10 rounded-[20px] bg-[#121119] h-full">
                <Image
                  src="/trust-history.svg"
                  alt="Follow every action that shapes trust"
                  width="690"
                  height="350"
                  className="w-full h-[200px] md:h-[350px] object-contain"
                />
                <h3 className="text-primaryText text-xl md:text-2xl font-medium mt-3 mb-1 tracking-tighter">
                  {"Follow every action that shapes trust"}
                </h3>
                <p className="text-primaryText/60 text-sm md:text-base tracking-tighter">
                  {
                    "View history, scores, and signals from swaps, claims, bridges, and governance, helping you understand how each action contributes to reputation growth and long-term credibility."
                  }
                </p>
              </div>
            </div>
            <div
              className="md:col-span-2"
            >
              <div className="px-6 pb-7 pt-10 rounded-[20px] bg-[#121119] h-full">
                <Image
                  src="/chain-card-updated.svg"
                  alt="Verify credibility anywhere on-chain"
                  width="400"
                  height="350"
                  className="w-full h-[270px] md:h-[350px] object-contain"
                />
                <h3 className="text-primaryText text-xl md:text-2xl font-medium mt-3 mb-1 tracking-tighter">
                  {"Verify credibility anywhere on-chain"}
                </h3>
                <p className="text-primaryText/60 text-sm md:text-base tracking-tighter">
                  {
                    "Gamified reputation building with rewards and special recognition."
                  }
                </p>
              </div>
            </div>
          </div>
        </section>

        <ProcessFlow />

        <IndustrialArchitecture />

        {/* Section Trust Score */}
        <section id="trustScore" className="py-24 md:py-32 px-5 max-w-screen-xl mx-auto z-10 relative border-t border-white/5">
          <TrustScoreSection />
        </section>

        <Architecture />

        <ParallelCards sectionId="dimension" />

        <IndustrialCapital />

        <CodeIntegration />

        <Faqs />

        <Footer />

        <AutoPopupModal />
      </div>
    </>
  );
}