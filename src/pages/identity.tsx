import React, { useRef, useState } from 'react';
import Head from 'next/head';
import { motion, useScroll, useTransform, useSpring, AnimatePresence } from 'framer-motion';
import { Header } from '@/components/layout/Header';
import { Footer } from '@/components/layout/Footer';
import { 
  ShieldCheck,
  Users,
  Fingerprint,
  FileCheck,
  CreditCard,
  Verified,
  Award,
  History,
  PenTool,
  CheckCircle2,
  ChevronRight,
  Plus
} from 'lucide-react';

const PROBLEM_DATA = {
  title: "Today, identity onchain is broken.",
  problems: [
    { id: "01", title: "Addresses", label: "Unreadable", desc: "Wallet addresses are complex hex strings never meant for human recognition." },
    { id: "02", title: "Handles", label: "Fragmented", desc: "Social handles are siloed across platforms, causing a disjointed digital UX." },
    { id: "03", title: "Reputation", label: "Resets Everywhere", desc: "Your trust history vanishes every time you switch to a new application or chain." },
    { id: "04", title: "Privacy", label: "Optional", desc: "Onchain privacy is treated as a premium feature, not a default requirement." }
  ],
  solution: ".any exists to fix this — by separating identity from addresses, and trust from exposure."
};

const Section = React.forwardRef<HTMLElement, { children: React.ReactNode, className?: string, id?: string }>(
  ({ children, className = "", id = "" }, ref) => (
    <section ref={ref} id={id} className={`px-6 md:px-12 relative overflow-hidden ${className}`}>
      <div className="max-w-7xl mx-auto relative z-10">
        {children}
      </div>
    </section>
  )
);
Section.displayName = "Section";

const IdentityHero = () => (
  <section className="relative min-h-screen flex flex-col justify-end bg-black overflow-hidden pb-32">
    {/* Atmospheric Background */}
    <div className="absolute top-0 left-0 w-full h-full bg-[radial-gradient(circle_at_50%_40%,rgba(166,131,255,0.1),transparent_70%)]" />
    
    <div className="max-w-7xl mx-auto px-6 md:px-12 relative z-10 w-full text-center space-y-12">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8, ease: "easeOut" }}
      >
        <h1 className="text-6xl md:text-[180px] font-black text-white leading-none tracking-tighter italic select-none">
          BE <span className="relative inline-block group">
            <span className="text-white/20">ANY</span>
            <motion.div 
              initial={{ width: 0 }}
              whileInView={{ width: "100%" }}
              transition={{ delay: 0.5, duration: 0.8 }}
              className="absolute -bottom-2 left-0 h-1.5 md:h-2.5 bg-white/10 rounded-full" 
            />
          </span>THING.
        </h1>
      </motion.div>

      <motion.div 
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.6, duration: 1 }}
        className="flex flex-col md:flex-row items-center justify-center gap-12 pt-12"
      >
        <p className="text-white/40 text-sm md:text-lg font-light tracking-[0.3em] uppercase">Your Identity, Your Control.</p>
        <div className="relative">
          <button className="relative px-12 py-4 bg-white text-black font-black rounded-full hover:scale-105 transition-all shadow-xl active:scale-95 text-xs md:text-sm uppercase tracking-widest">
            Create a .any <span className="opacity-40 text-[10px] ml-1">(coming soon)</span>
          </button>
        </div>
      </motion.div>
    </div>
  </section>
);

const IdentityProblem = () => {
  return (
    <Section className="bg-black text-white py-24 border-b border-white/5" id="problem">
      <div className="max-w-7xl mx-auto space-y-24">
        {/* Compact Title - Matching user's preferred style but smaller */}
        <div className="space-y-2">
          <span className="text-lightblueprimary font-mono text-[10px] uppercase tracking-[0.5em] block opacity-60">
            The Current State
          </span>
          <h2 className="text-4xl md:text-6xl font-black tracking-tighter uppercase leading-none italic">
            Today, Identity Onchain is <span className="text-white/20">Broken.</span>
          </h2>
        </div>

        {/* Minimalist Horizontal Problem Strip */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-px bg-white/5 border border-white/5">
          {PROBLEM_DATA.problems.map((p, i) => (
            <div 
              key={i} 
              className="bg-black p-8 space-y-6 hover:bg-white/[0.02] transition-colors group cursor-default"
            >
              <div className="flex flex-col gap-1">
                <span className="text-[10px] font-mono text-white/20 uppercase tracking-[0.3em] group-hover:text-lightblueprimary transition-colors">
                  Case 0{i + 1} // {p.title}
                </span>
                <h3 className="text-xl font-black uppercase tracking-tight text-white/90">
                  {p.label}
                </h3>
              </div>
              <p className="text-white/40 text-xs leading-relaxed font-medium">
                {p.desc}
              </p>
            </div>
          ))}
        </div>

        {/* The Fix - Minimalist and Integrated */}
        <div className="pt-8 flex flex-col md:flex-row items-center justify-between gap-8 border-t border-white/5">
           <p className="text-xl md:text-2xl font-medium tracking-tight max-w-2xl text-white/80 italic leading-snug">
            {PROBLEM_DATA.solution}
          </p>
          <div className="h-[1px] flex-1 bg-gradient-to-r from-white/10 to-transparent hidden md:block" />
          <div className="flex items-center gap-2">
            <span className="w-2 h-2 rounded-full bg-lightblueprimary animate-pulse" />
            <span className="text-[10px] font-mono uppercase tracking-[0.4em] text-white/40">Solving Exposure</span>
          </div>
        </div>
      </div>
    </Section>
  );
};

const IdentityDefinition = () => {
  const negations = ["Username", "Wallet", "Platform Profile"];
  const definition = ".any is a persistent onchain identity that represents you — independently of devices, wallets, or applications.";
  const closing = "It stays with you as everything else changes.";

  return (
    <Section className="bg-black text-white py-24 md:py-40" id="definition">
      <div className="max-w-5xl mx-auto">
        <motion.div 
          initial={{ opacity: 0, x: 20 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true }}
          className="flex flex-col md:flex-row items-center gap-16"
        >
          {/* Content Side */}
          <div className="flex-1 space-y-8">
            <div className="space-y-2">
              <span className="text-lightblueprimary font-mono text-[10px] uppercase tracking-[0.4em] font-black">Identity Abstract</span>
              <h2 className="text-4xl md:text-6xl font-black tracking-tighter leading-none uppercase italic opacity-90">
                One You. <br /> Every App.
              </h2>
            </div>
            <p className="text-white/50 text-xl leading-relaxed max-w-md">
              {definition}
            </p>
            <div className="flex flex-wrap gap-3">
              {negations.map((n, i) => (
                <span key={i} className="px-4 py-2 rounded-xl bg-white/[0.03] border border-white/10 text-[10px] font-mono uppercase tracking-widest text-white/30">
                  ≠ {n}
                </span>
              ))}
            </div>
          </div>

          {/* Visual Side */}
          <div className="flex-1 relative aspect-square w-full max-w-md flex items-center justify-center">
            <div className="absolute inset-0 bg-lightblueprimary/10 blur-[100px] rounded-full animate-pulse" />
            <div className="relative z-10 w-64 h-64 border-2 border-white/10 rounded-[64px] flex items-center justify-center rotate-45 group hover:rotate-90 transition-transform duration-1000">
              <div className="w-48 h-48 border border-lightblueprimary/30 rounded-[48px] flex items-center justify-center -rotate-45 group-hover:-rotate-90 transition-transform duration-1000">
                <span className="text-lightblueprimary font-black text-4xl tracking-tighter">.any</span>
              </div>
            </div>
            <div className="absolute bottom-0 right-0 p-6 bg-black border border-white/10 rounded-2xl shadow-2xl">
              <p className="text-[10px] font-mono uppercase tracking-widest text-lightblueprimary mb-2">Stability Check</p>
              <p className="text-xs font-bold text-white/80">{closing}</p>
            </div>
          </div>
        </motion.div>
      </div>
    </Section>
  );
};

const EverydayUses = () => {
  const uses = [
    { 
      title: "Payment ID", 
      desc: "Identifier instead of addresses", 
      icon: <CreditCard className="w-4 h-4" />,
      detail: "Send and receive funds using your readable name across any chain."
    },
    { 
      title: "Public Identity", 
      desc: "Verified brand identity", 
      icon: <Verified className="w-4 h-4" />,
      detail: "Establish a single source of truth for your digital presence."
    },
    { 
      title: "Trust Badge", 
      desc: "Shareable trust metrics", 
      icon: <Award className="w-4 h-4" />,
      detail: "Embed your verified reputation score into your social bios."
    },
    { 
      title: "Portable Rep", 
      desc: "Cross-app reputation profile", 
      icon: <History className="w-4 h-4" />,
      detail: "Your history follows you into every new application you join."
    },
    { 
      title: "Secure Signing", 
      desc: "Sign statements privately", 
      icon: <PenTool className="w-4 h-4" />,
      detail: "Prove messages came from you without needing a third party."
    },
    { 
      title: "Authenticity", 
      desc: "Signal in a noisy internet", 
      icon: <CheckCircle2 className="w-4 h-4" />,
      detail: "Instantly distinguish yourself from bot-generated accounts."
    }
  ];

  return (
    <Section className="bg-[#08080C] text-white py-32 border-t border-white/5" id="uses">
      <div className="max-w-6xl mx-auto">
        <div className="flex flex-col md:flex-row items-end justify-between mb-20 gap-8">
          <div className="space-y-4">
            <span className="text-lightblueprimary font-black font-mono text-[10px] uppercase tracking-[0.5em]">Utility Set</span>
            <h2 className="text-4xl md:text-6xl font-black tracking-tighter uppercase leading-[0.9]">Everyday <br /> <span className="text-white/20">Uses.</span></h2>
          </div>
          <p className="text-white/30 text-sm max-w-[320px] font-medium leading-relaxed pb-1 border-l border-white/10 pl-6">
            A .any identity is more than a name. It's your verified toolkit for an authentic digital life.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {uses.map((use, i) => (
            <motion.div 
              key={i}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.05 }}
              className={`${
                i === 0 ? 'bg-lightblueprimary text-black' : 'bg-white/[0.02] text-white border border-white/5'
              } rounded-2xl p-8 flex flex-col justify-between hover:bg-opacity-90 transition-all duration-500 group cursor-default`}
            >
              <div className="flex justify-end items-start mb-12">
                <span className={`text-[10px] font-mono uppercase tracking-widest ${i === 0 ? 'text-black/40' : 'text-white/10 group-hover:text-lightblueprimary/40'} transition-colors`}>
                  Case 0{i+1}
                </span>
              </div>
              <div className="space-y-3">
                <h3 className={`text-xl font-black tracking-tighter uppercase leading-none ${i === 0 ? 'text-black' : 'text-white/90 group-hover:text-white'} transition-colors`}>
                  {use.title}
                </h3>
                <p className={`text-xs font-medium leading-relaxed italic ${i === 0 ? 'text-black/60' : 'text-white/30 group-hover:text-white/50'} transition-colors`}>
                  {use.detail}
                </p>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </Section>
  );
};

const DeveloperIntegration = () => {
  return (
    <Section className="bg-black text-white py-24 md:py-32 border-t border-white/5" id="integrate">
      <div className="max-w-6xl mx-auto space-y-12">
        {/* Header Block */}
        <div className="text-center max-w-3xl mx-auto space-y-4">
          <span className="text-lightblueprimary font-black font-mono text-[10px] uppercase tracking-[0.5em]">Developers</span>
          <h2 className="text-3xl md:text-5xl font-black tracking-tighter uppercase leading-tight">
            Integrate <span className="text-white/20">.any</span> <br /> Into Your Apps.
          </h2>
          <p className="text-white/40 text-base font-medium leading-relaxed">
            .any is built to plug directly into wallets, dApps, and applications. 
          </p>
        </div>

        {/* Bento Grid */}
        <div className="grid grid-cols-1 md:grid-cols-12 gap-4">
          {/* Left Column - Wallets & Auths */}
          <div className="md:col-span-3 flex flex-col gap-4">
            {/* 1. Wallets (The Send Interface) */}
            <div className="bg-white/[0.03] border border-white/5 rounded-2xl p-6 h-[155px] flex flex-col justify-center group hover:bg-white/[0.05] transition-all overflow-hidden relative">
              <div className="space-y-3">
                <div className="flex items-center justify-between text-[8px] font-mono uppercase tracking-widest text-white/20">
                  <span>Wallet UI</span>
                  <span className="text-lightblueprimary/40">Any Chain</span>
                </div>
                <div className="bg-white/5 rounded-lg p-3 border border-white/5 space-y-2">
                  <div className="flex justify-between items-center">
                    <span className="text-[9px] text-white/40 uppercase font-mono">To</span>
                    <div className="flex items-center gap-1.5">
                      <div className="w-1.5 h-1.5 rounded-full bg-green-500 animate-pulse" />
                      <span className="text-[10px] font-black text-white italic">whale.any</span>
                    </div>
                  </div>
                  <div className="h-px w-full bg-white/5" />
                  <div className="flex justify-between items-center text-[10px] font-bold text-white">
                    <span className="text-white/40 font-mono">Amount</span>
                    <span>4.20 ETH</span>
                  </div>
                </div>
              </div>
            </div>
            
            {/* 2. Auths (Sign In Interface) */}
            <div className="bg-white/[0.03] border border-white/5 rounded-2xl p-6 h-[155px] flex flex-col justify-center group hover:bg-white/[0.05] transition-all relative overflow-hidden">
              <div className="space-y-4">
                <div className="flex items-center justify-between text-[8px] font-mono uppercase tracking-widest text-white/20">
                  <span>Auth Portal</span>
                  <div className="flex gap-1">
                    <div className="w-1 h-1 rounded-full bg-lightblueprimary/40" />
                    <div className="w-1 h-1 rounded-full bg-white/10" />
                  </div>
                </div>
                <div className="space-y-3">
                  <div className="w-full h-10 bg-white rounded-xl flex items-center px-4 gap-3 border border-white/10 shadow-2xl group-hover:scale-[1.02] transition-transform">
                    <div className="w-6 h-6 bg-black rounded-lg flex items-center justify-center">
                      <span className="text-[9px] text-white font-black italic">.a</span>
                    </div>
                    <div className="h-3 w-[1px] bg-black/10" />
                    <span className="text-[10px] font-black text-black uppercase tracking-tighter">Connect Identity</span>
                  </div>
                  <div className="flex items-center justify-between px-1">
                    <span className="text-[8px] font-mono text-white/20 uppercase">Protocol: v2.4</span>
                    <span className="text-[8px] font-mono text-green-400/60 uppercase">Encrypted</span>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Middle Main Card - Centered with Button */}
          <div className="md:col-span-6 bg-lightblueprimary text-black rounded-3xl p-10 h-[326px] flex flex-col justify-between relative overflow-hidden text-center items-center">
            <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_50%,rgba(255,255,255,0.2),transparent_70%)]" />
            <div className="relative z-10 space-y-4 pt-2">
              <span className="text-[10px] font-mono font-black uppercase tracking-widest opacity-40">Identity SDK</span>
              <h3 className="text-4xl md:text-5xl font-black tracking-tighter uppercase leading-none italic">Build with <br /> .any Identity.</h3>
            </div>
            <div className="relative z-10 space-y-6">
              <p className="text-black/60 text-xs font-medium leading-relaxed italic max-w-xs mx-auto">
                "Integration is lightweight, modular, and designed for real‑world use."
              </p>
              <button className="px-12 py-4 bg-black text-white rounded-full font-black text-[10px] uppercase tracking-[0.2em] hover:scale-105 transition-all shadow-2xl">
                View Developer Docs
              </button>
            </div>
          </div>

          {/* Right Column - DApps, Socials, Payments */}
          <div className="md:col-span-3 flex flex-col gap-4">
            {/* 3. DApps (Identity Profile) */}
            <div className="bg-white/[0.03] border border-white/5 rounded-2xl p-5 h-[98px] flex flex-col justify-between group hover:bg-white/[0.05] transition-all relative overflow-hidden">
              <div className="flex justify-between items-start">
                <span className="text-[8px] font-mono uppercase text-white/20">DApp Component</span>
                <Award size={12} className="text-lightblueprimary/40" />
              </div>
              <div className="flex items-center gap-3 bg-white/5 rounded-xl p-2 border border-white/5">
                <div className="w-8 h-8 rounded-lg bg-lightblueprimary flex items-center justify-center">
                  <Users size={16} className="text-black" />
                </div>
                <div className="flex-1">
                  <div className="flex justify-between items-center">
                    <h4 className="text-[10px] font-black uppercase text-white italic">alex.any</h4>
                    <span className="text-[8px] font-mono text-lightblueprimary">Trust: 98</span>
                  </div>
                  <div className="h-1 w-full bg-white/10 rounded-full mt-1 overflow-hidden">
                    <div className="h-full w-[90%] bg-lightblueprimary" />
                  </div>
                </div>
              </div>
            </div>

            {/* 4. Socials (Secure Connection) */}
            <div className="bg-white/[0.03] border border-white/5 rounded-2xl p-5 h-[98px] flex flex-col justify-between group hover:bg-white/[0.05] transition-all relative overflow-hidden">
              <div className="flex justify-between items-start">
                <span className="text-[8px] font-mono uppercase text-white/20">Social Graph</span>
                <Fingerprint size={12} className="text-lightblueprimary/40" />
              </div>
              <div className="flex items-center justify-center gap-4">
                <div className="w-7 h-7 rounded-full border border-white/20 flex items-center justify-center text-[7px] font-bold">U1</div>
                <div className="flex-1 h-px bg-gradient-to-r from-transparent via-lightblueprimary/40 to-transparent relative">
                  <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 px-2 bg-[#08080C] text-[6px] font-mono text-lightblueprimary uppercase">Verified</div>
                </div>
                <div className="w-7 h-7 rounded-full border border-white/20 flex items-center justify-center text-[7px] font-bold">U2</div>
              </div>
            </div>

            {/* 5. Payments (Clear Attribution) */}
            <div className="bg-white/[0.03] border border-white/5 rounded-2xl p-5 h-[98px] flex flex-col justify-between group hover:bg-white/[0.05] transition-all relative overflow-hidden">
              <div className="flex justify-between items-start">
                <span className="text-[8px] font-mono uppercase text-white/20">Tx Attribution</span>
                <History size={12} className="text-lightblueprimary/40" />
              </div>
              <div className="space-y-1.5">
                <div className="flex justify-between items-center text-[9px]">
                  <span className="text-white/40">Initiator</span>
                  <span className="text-lightblueprimary font-black italic">alpha.any</span>
                </div>
                <div className="h-px bg-white/5" />
                <div className="flex justify-between items-center text-[9px]">
                  <span className="text-white/40">Status</span>
                  <div className="flex items-center gap-1">
                    <div className="w-1 h-1 rounded-full bg-green-500" />
                    <span className="text-white font-bold uppercase tracking-tighter">Settled</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </Section>
  );
};

const IdentityHomeSection = () => (
  <Section className="bg-[#EBEBEB] text-black border-t border-black/5 pt-4 pb-20 md:pt-6 md:pb-32" id="identity-holds">
    <div className="max-w-7xl mx-auto flex flex-col items-center text-center">
      
      {/* Hero Content */}
      <div className="space-y-4 max-w-4xl mx-auto">
        <span className="text-lightblueprimary font-bold text-sm tracking-tight uppercase">
          Core Structure
        </span>
        <h2 className="text-5xl md:text-7xl font-black tracking-tighter leading-[1.1] uppercase">
          What Your <br className="hidden md:block" /> Identity Holds
        </h2>
        <p className="text-black/40 text-lg font-medium max-w-xl mx-auto leading-relaxed">
          .any identity works like a secure digital home. Inside it lives your name, reputation, and proofs — organized and under your control.
        </p>

        <div className="pt-6">
          <button className="bg-black text-white px-10 py-4 rounded-full font-bold transition-all hover:scale-105 active:scale-95 shadow-xl">
            Get Started
          </button>
        </div>
      </div>

      {/* Feature Grid - The 4 Tabs close together */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mt-16 w-full max-w-5xl mx-auto text-left">
        {[
          {
            icon: <ShieldCheck className="w-5 h-5 text-lightblueprimary" />,
            title: "Reputation",
            subtitle: "Immutable",
            desc: "Your history builds value. A portable onchain credit score."
          },
          {
            icon: <Users className="w-5 h-5 text-lightblueprimary" />,
            title: "Connections",
            subtitle: "Private",
            desc: "Encrypted social graphs. Connect without exposing your network."
          },
          {
            icon: <Fingerprint className="w-5 h-5 text-lightblueprimary" />,
            title: "Accounts",
            subtitle: "Unified",
            desc: "One identity for every wallet. Stop managing fragmented accounts."
          },
          {
            icon: <FileCheck className="w-5 h-5 text-lightblueprimary" />,
            title: "Proofs",
            subtitle: "Verified",
            desc: "Zero-knowledge attestations. Prove status without revealing data."
          }
        ].map((item, i) => (
          <div key={i} className="p-6 bg-white/60 border border-black/5 rounded-2xl space-y-4 hover:bg-white transition-colors duration-300">
            <div className="flex flex-col gap-3">
              {item.icon}
              <div className="flex flex-col">
                <h3 className="text-lg font-black tracking-tight uppercase leading-tight">{item.title}</h3>
                <span className="text-black/30 font-mono text-[9px] uppercase tracking-widest">{item.subtitle}</span>
              </div>
            </div>
            <p className="text-black/50 text-xs leading-relaxed">
              {item.desc}
            </p>
          </div>
        ))}
      </div>
    </div>
  </Section>
);

const UseCaseReel = () => {
  const containerRef = useRef(null);
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start start", "end end"]
  });

  const smoothProgress = useSpring(scrollYProgress, {
    stiffness: 80,
    damping: 30,
    restDelta: 0.001
  });

  const useCases = [
    "Payments", "Identity", "Brands", "Business", "Creators", 
    "Socials", "Reputation", "Governance", "Privacy", "DeFi", 
    "Gaming", "Culture", "Loyalty", "Ticketing", "DAOs",
    "Metadata", "Vouching", "Attestation", "Discovery"
  ];

  return (
    <section ref={containerRef} className="relative h-[300vh] bg-[#EBEBEB] select-none">
      <div className="sticky top-0 h-screen w-full flex items-center justify-center overflow-hidden">
        
        {/* Sample UI Indicators */}
        <div className="absolute inset-x-0 w-full max-w-7xl mx-auto flex items-center justify-end px-8 md:px-24 z-30 pointer-events-none">
          <div className="flex items-center gap-6 md:gap-12">
            {/* .any Logo Box */}
            <div className="w-20 h-20 md:w-32 md:h-32 bg-black rounded-[32px] md:rounded-[48px] flex items-center justify-center relative shadow-2xl">
               <span className="text-white font-black italic text-2xl md:text-4xl tracking-tighter">.any</span>
            </div>
          </div>
        </div>

        {/* The Cylindrical Drum */}
        <div className="relative w-full h-full flex items-center justify-center perspective-[1200px] transform-style-3d">
          {useCases.map((word, i) => {
            const step = 1 / (useCases.length - 1);
            
            // This word's position on the scroll track
            const wordProgress = i * step;
            
            // Calculate relative distance from current scroll position
            // We map the distance to an angle from -90 to 90 degrees
            const angle = useTransform(smoothProgress, 
              [wordProgress - 0.2, wordProgress, wordProgress + 0.2],
              [90, 0, -90]
            );

            // Radius of the cylinder
            const radius = 350;

            // Calculate Y (Vertical) and Z (Depth) based on angle
            const y = useTransform(angle, (a) => Math.sin(a * (Math.PI / 180)) * radius);
            const z = useTransform(angle, (a) => Math.cos(a * (Math.PI / 180)) * radius - radius);
            
            // Rotation around X axis to match the cylinder curve
            const rotateX = useTransform(angle, (a) => a);

            // Opacity: fades as it curves away
            const opacity = useTransform(angle, 
              [-85, -45, 0, 45, 85], 
              [0, 0.4, 1, 0.4, 0]
            );

            // Scale: subtle shrink as it recedes
            const scale = useTransform(angle, 
              [-85, 0, 85], 
              [0.7, 1.25, 0.7]
            );

            // Color: Black when active, Gray when receding
            const color = useTransform(angle,
              [-15, 0, 15],
              ["#A0A0A0", "#000000", "#A0A0A0"]
            );

            return (
              <motion.h2
                key={i}
                style={{ 
                  y, 
                  z, 
                  rotateX, 
                  opacity, 
                  scale,
                  color,
                  position: "absolute",
                  transformStyle: "preserve-3d"
                } as any}
                className="text-6xl md:text-[140px] font-black tracking-tighter uppercase whitespace-nowrap leading-none text-center"
              >
                {word}
              </motion.h2>
            );
          })}
        </div>
      </div>
    </section>
  );
};

const EverythingIdentity = () => {
  const features = [
    { title: "Asset Hub", desc: "Aggregate every asset. Resolve multiple balances into a single unified profile." },
    { title: "Privacy", desc: "Granular metadata control. Choose exactly what history you share." },
    { title: "Omni-Chain", desc: "Universal pointer. One destination for every chain (Base, ETH, SOL)." },
    { title: "Reputation", desc: "History that builds value. Portable trust scores." }
  ];

  return (
    <Section className="bg-[#F9F7F2] py-32 md:py-48" id="everything">
      <div className="max-w-[1400px] mx-auto">
        <div className="flex flex-col md:flex-row items-stretch border-y border-black/5">
          {/* Sidebar Label */}
          <div className="md:w-24 bg-black flex items-center justify-center py-12 md:py-0">
            <span className="text-white font-black text-[10px] uppercase tracking-[0.6em] md:-rotate-90 whitespace-nowrap">
              Ecosystem
            </span>
          </div>

          {/* Feature Strip */}
          <div className="flex-1 grid grid-cols-1 md:grid-cols-4 divide-x divide-black/5 bg-[#EBEBEB]">
            {features.map((f, i) => (
              <div 
                key={i} 
                className="p-12 space-y-6 hover:bg-white transition-all duration-500 cursor-default group"
              >
                <div className="flex flex-col gap-2">
                  <span className="font-mono text-[8px] text-black/20 uppercase tracking-[0.3em] group-hover:text-lightblueprimary transition-colors">
                    Module 0{i + 1}
                  </span>
                  <h3 className="text-xl font-black uppercase tracking-tight text-black/80">
                    {f.title}
                  </h3>
                </div>
                <p className="text-black/40 text-xs leading-relaxed max-w-[200px] font-medium">
                  {f.desc}
                </p>
                <div className="pt-4 opacity-0 group-hover:opacity-100 transition-opacity">
                   <div className="w-8 h-[1px] bg-black/10" />
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </Section>
  );
};

const FinalClosing = () => (
  <Section className="bg-black text-white py-32 md:py-48 border-t border-white/5" id="closing">
    <div className="max-w-4xl mx-auto text-center space-y-8">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.8 }}
      >
        <h2 className="text-4xl md:text-7xl font-black tracking-tighter uppercase leading-[0.9] italic">
          A Better Internet <br /> <span className="text-white/20">Starts With Identity.</span>
        </h2>
      </motion.div>

      <motion.div
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        viewport={{ once: true }}
        transition={{ delay: 0.2, duration: 1 }}
        className="space-y-12"
      >
        <p className="text-white/40 text-lg md:text-2xl font-medium leading-relaxed max-w-2xl mx-auto">
          .any is building a future where identity is human‑readable, reputation is earned, and privacy is respected by default.
        </p>

        <div className="flex flex-col items-center gap-6">
          <div className="h-12 w-px bg-gradient-to-b from-lightblueprimary to-transparent" />
          <p className="text-lightblueprimary font-mono text-[10px] md:text-xs uppercase tracking-[0.5em] font-black">
            One identity. No exposure. No compromise.
          </p>
        </div>
      </motion.div>
    </div>
  </Section>
);

export default function IdentityPage() {
  return (
    <div className="min-h-screen bg-[#08080C] text-white selection:bg-lightblueprimary selection:text-black font-geist">
      <Head>
        <title>.any Identity — Your Private Digital Self</title>
        <meta name="description" content="One Identity. Any App. Any Chain. Privacy-first onchain identity by Anylayer." />
      </Head>

      <Header />
      
      <IdentityHero />

      <IdentityProblem />

      <IdentityDefinition />

      <UseCaseReel />

      <IdentityHomeSection />

      <EverythingIdentity />

      <EverydayUses />

      <DeveloperIntegration />

      <FinalClosing />

      <Footer />
    </div>
  );
}
