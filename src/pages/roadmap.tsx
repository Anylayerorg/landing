import React from 'react';
import Head from 'next/head';
import { motion, useScroll, useSpring, useTransform } from 'framer-motion';
import { Check, ArrowRight, Zap, Shield, Globe, Cpu, Rocket, Terminal, Layers, Search, Code2, Share2, Database } from 'lucide-react';
import { Header } from '../components/layout/Header';
import { Footer } from '../components/layout/Footer';

const PHASES = [
  {
    number: "01",
    title: "FOUNDATION",
    status: "Completed",
    icon: Shield,
    color: "#22c55e", // Green
    description: "Establishing the core mathematical infrastructure and security parameters.",
    milestones: [
      { text: "Whitepaper Release", completed: true },
      { text: "Identity Protocol Alpha", completed: true },
      { text: "Security Audit Phase I", completed: true },
      { text: "Core Team Assembly", completed: true },
    ]
  },
  {
    number: "02",
    title: "INTEROP",
    status: "In Progress",
    icon: Globe,
    color: "#A683FF", // Purple
    description: "Connecting disparate ecosystems into a unified trust layer.",
    milestones: [
      { text: "Public Beta (Identity)", completed: true },
      { text: "SDK v1.0 Launch", completed: false },
      { text: "Multi-chain Proofs", completed: false },
      { text: "Reputation Engine Beta", completed: false },
    ]
  },
  {
    number: "03",
    title: "INTELLIGENCE",
    status: "Future",
    icon: Cpu,
    color: "#3b82f6", // Blue
    description: "Implementing autonomous reputation systems for agents and humans.",
    milestones: [
      { text: "AI Agent Reputation", completed: false },
      { text: "Trust Resolution API", completed: false },
      { text: "Decentralized Nodes", completed: false },
      { text: "Privacy Layer v2", completed: false },
    ]
  },
  {
    number: "04",
    title: "SCALING",
    status: "Future",
    icon: Rocket,
    color: "#6366f1", // Indigo
    description: "Global distribution and institutional integration.",
    milestones: [
      { text: "Universal Trust v2.0", completed: false },
      { text: "High-Throughput ZK", completed: false },
      { text: "Governance DAO", completed: false },
      { text: "Global Onboarding", completed: false },
    ]
  }
];

export default function RoadmapPage() {
  const containerRef = React.useRef(null);
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start center", "end end"]
  });

  const pathLength = useSpring(scrollYProgress, {
    stiffness: 100,
    damping: 30,
    restDelta: 0.001
  });

  return (
    <div className="min-h-screen bg-[#08080C] text-white font-geist selection:bg-lightblueprimary selection:text-black">
      <Head>
        <title>Strategic Roadmap | Anylayer</title>
        <meta name="description" content="Strategic milestones and future development of Anylayer." />
      </Head>

      <Header />

      <main className="pt-40 pb-64 px-6 overflow-hidden">
        <div className="max-w-screen-xl mx-auto">

          {/* Header */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="mb-48 text-center"
          >
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-white/5 border border-white/10 mb-8">
              <div className="w-1 h-1 rounded-full bg-lightblueprimary animate-pulse" />
              <span className="text-[10px] font-mono uppercase tracking-[0.2em] text-white/40">Network Evolution</span>
            </div>
            <h1 className="text-[4rem] md:text-[7rem] font-geist font-black uppercase text-white leading-[0.85] tracking-tighter lg:tracking-[-0.06em]">
              THE FUTURE <br />
              <span className="text-white/10">OF TRUST.</span>
            </h1>
          </motion.div>

          {/* Curved Flow Roadmap */}
          <div ref={containerRef} className="relative max-w-5xl mx-auto py-20">

            {/* SVG Curved Path for Desktop */}
            <div className="absolute inset-0 hidden md:block pointer-events-none z-0">
              <svg
                viewBox="0 0 1000 1600"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
                className="w-full h-full preserve-3d"
              >
                {/* Background Shadow Path */}
                <path
                  d="M500 0 C500 200 800 200 800 400 C800 600 200 600 200 800 C200 1000 800 1000 800 1200 C800 1400 500 1400 500 1600"
                  stroke="rgba(255,255,255,0.03)"
                  strokeWidth="4"
                  strokeLinecap="round"
                />
                {/* Animated Gradient Path */}
                <motion.path
                  d="M500 0 C500 200 800 200 800 400 C800 600 200 600 200 800 C200 1000 800 1000 800 1200 C800 1400 500 1400 500 1600"
                  stroke="url(#roadmap-gradient)"
                  strokeWidth="4"
                  strokeLinecap="round"
                  style={{ pathLength }}
                />
                <defs>
                  <linearGradient id="roadmap-gradient" x1="0%" y1="0%" x2="0%" y2="100%">
                    <stop offset="0%" stopColor="#22c55e" />
                    <stop offset="30%" stopColor="#A683FF" />
                    <stop offset="60%" stopColor="#3b82f6" />
                    <stop offset="100%" stopColor="#6366f1" />
                  </linearGradient>
                </defs>
              </svg>
            </div>

            {/* Path for Mobile (Vertical) */}
            <div className="absolute left-[31px] md:hidden top-0 bottom-0 w-px bg-white/5 pointer-events-none" />

            <div className="space-y-64 md:space-y-0 relative">
              {PHASES.map((phase, idx) => {
                const Icon = phase.icon;
                const isCompleted = phase.status === 'Completed';
                const isInProgress = phase.status === 'In Progress';

                // desktop coordinate mapping (rough)
                const positions = [
                  { x: '50%', y: '0px' },    // Phase 1: Center Top
                  { x: '80%', y: '400px' },  // Phase 2: Right
                  { x: '20%', y: '800px' },  // Phase 3: Left
                  { x: '80%', y: '1200px' }, // Phase 4: Right
                ];

                return (
                  <motion.div
                    key={idx}
                    initial={{ opacity: 0, scale: 0.9 }}
                    whileInView={{ opacity: 1, scale: 1 }}
                    viewport={{ once: true, margin: "-100px" }}
                    transition={{ duration: 0.8 }}
                    className="relative md:absolute w-full md:w-[400px] z-10"
                    style={{
                      left: typeof window !== 'undefined' && window.innerWidth >= 768 ? positions[idx].x : 'auto',
                      top: typeof window !== 'undefined' && window.innerWidth >= 768 ? positions[idx].y : 'auto',
                      transform: typeof window !== 'undefined' && window.innerWidth >= 768 ? 'translateX(-50%)' : 'none'
                    }}
                  >
                    {/* Node Visual */}
                    <div className="flex flex-col md:items-center">
                      <div className="flex items-center gap-6 md:flex-col md:gap-8">
                        {/* The Icon Container */}
                        <div className="relative group shrink-0">
                          <div className={`absolute -inset-4 rounded-3xl blur-2xl opacity-0 group-hover:opacity-20 transition-all duration-700`} style={{ backgroundColor: phase.color }} />
                          <div className={`w-16 h-16 rounded-2xl flex items-center justify-center border-2 transition-all duration-700 bg-[#08080C] relative z-10 ${isCompleted ? 'border-green-500/40 text-green-400' :
                            isInProgress ? 'border-lightblueprimary text-lightblueprimary shadow-[0_0_30px_rgba(166,131,255,0.2)]' :
                              'border-white/5 text-white/20'
                            }`}>
                            <Icon size={32} strokeWidth={1.2} />
                          </div>

                          {/* Phase Badge */}
                          <div className="absolute -top-3 -right-3 z-20">
                            <div className={`text-[9px] font-mono font-black uppercase px-2 py-0.5 rounded-md border backdrop-blur-xl ${isCompleted ? 'bg-green-500 text-black border-green-500' :
                              isInProgress ? 'bg-lightblueprimary text-black border-lightblueprimary' :
                                'bg-white/5 text-white/20 border-white/10'
                              }`}>
                              {phase.number}
                            </div>
                          </div>
                        </div>

                        {/* Text Content Card */}
                        <div className={`flex-1 md:text-center p-4 rounded-3xl bg-[#08080C]/80 backdrop-blur-sm border border-white/[0.03] shadow-2xl`}>
                          <h2 className="text-4xl md:text-6xl font-black uppercase tracking-tighter leading-[0.9] text-white mb-2">
                            {phase.title}
                          </h2>
                          <p className="text-white/40 text-xs md:text-sm font-light mb-6 leading-relaxed max-w-[280px] md:mx-auto">
                            {phase.description}
                          </p>

                          {/* Milestone Micro-List */}
                          <div className="grid gap-3 md:justify-items-center">
                            {phase.milestones.map((m, mIdx) => (
                              <div key={mIdx} className="flex items-center gap-3">
                                <div className={`shrink-0 w-1.5 h-1.5 rounded-full ${m.completed ? 'bg-green-500' :
                                  isInProgress && mIdx === phase.milestones.findIndex(item => !item.completed) ? 'bg-lightblueprimary shadow-[0_0_8px_#A683FF] animate-pulse' :
                                    'bg-white/10'
                                  }`} />
                                <span className={`text-[11px] font-medium tracking-tight ${m.completed ? 'text-white/80' : 'text-white/30'
                                  }`}>
                                  {m.text}
                                </span>
                              </div>
                            ))}
                          </div>
                        </div>
                      </div>
                    </div>
                  </motion.div>
                );
              })}
            </div>

            {/* Added buffer height for absolute items */}
            <div className="hidden md:block h-[1600px]" />
          </div>

          {/* Dynamic Evolution Banner */}
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            whileInView={{ opacity: 1, scale: 1 }}
            className="mt-32 p-12 rounded-[40px] bg-white/[0.02] border border-white/5 relative overflow-hidden text-center"
          >
            <div className="absolute inset-0 bg-gradient-to-b from-lightblueprimary/[0.02] to-transparent pointer-events-none" />
            <h3 className="text-2xl md:text-4xl font-geist font-black uppercase text-white tracking-tighter mb-8 relative z-10">
              Ready to plug into <br className="md:hidden" /> the future of trust?
            </h3>
            <div className="flex flex-col md:flex-row items-center justify-center gap-6 relative z-10">
              <a href="https://docs.anylayer.org" className="px-8 py-3 bg-white text-black font-black rounded-full text-[10px] tracking-[0.2em] uppercase hover:scale-[1.05] transition-all">
                Developer Documentation
              </a>
              <a href="https://x.com/anylayer" className="px-8 py-3 bg-white/5 border border-white/10 text-white font-black rounded-full text-[10px] tracking-[0.2em] uppercase hover:bg-white/10 transition-all flex items-center gap-3">
                Follow Updates
                <ArrowRight size={14} />
              </a>
            </div>
          </motion.div>

        </div>
      </main>

      <Footer />
    </div>
  );
}
