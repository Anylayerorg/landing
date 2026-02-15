import React, { useState, useEffect, useRef } from 'react';
import { AnimatePresence, motion, useMotionValueEvent, useScroll } from 'framer-motion';
import Image from 'next/image';
import Link from 'next/link';
import { ComingSoonModal } from './ComingSoonModal';
import ClientsLogo from './ClientsLogo';
import ParallelCards from './ParallelCards';
import CodeIntegration from './CodeIntegration';
import Faqs from './Faqs';
import { Footer } from './layout/Footer';
import IndustrialArchitecture from './IndustrialArchitecture';
import { Header } from './layout/Header';
import AutoPopupModal from './Popup';
import AIAgents from './AIAgents';
import Attesters from './Attesters';
import { BlogWidget } from './BlogWidget';
import { SEO } from './layout/SEO';
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

const SectionTag = ({ label, subtitle, theme = 'dark' }: { label: string, subtitle?: string, theme?: 'dark' | 'light' }) => (
  <div className={`inline-flex items-center gap-3 px-3 py-1 rounded-full backdrop-blur-sm border ${theme === 'dark'
    ? 'bg-white/[0.02] border-white/5 text-white/40'
    : 'bg-black/[0.03] border-black/5 text-black/40'
    }`}>
    <div className="w-1 h-1 rounded-full bg-lightblueprimary" />
    <span className="text-[9px] font-mono uppercase tracking-[0.3em] font-medium">
      {label} {subtitle && `// ${subtitle}`}
    </span>
  </div>
);

const PROCESS_DATA = [
  {
    id: "01",
    title: "Create",
    desc: "Generate your secure ZK-identity. Connect multiple wallets and manage your reputation privately.",
    icon: <Fingerprint className="w-6 h-6" />,
    color: "#A683FF"
  },
  {
    id: "02",
    title: "Link",
    desc: "Connect your on-chain and off-chain data. Our protocol transforms fragmented signals into a unified reputation score.",
    icon: <Activity className="w-6 h-6" />,
    color: "#8B5CF6"
  },
  {
    id: "03",
    title: "Prove",
    desc: "Generate zero-knowledge proofs to share specific parts of your reputation without ever revealing sensitive user data.",
    icon: <ShieldCheck className="w-6 h-6" />,
    color: "#7C3AED"
  },
  {
    id: "04",
    title: "Unlock",
    desc: "Access better rates, gated communities, and capital-efficient protocols using your verified trust signals.",
    icon: <Zap className="w-6 h-6" />,
    color: "#6D28D9"
  }
];

const ProcessFlow = () => {
  return (
    <div className="bg-black py-24 md:py-32 relative border-t border-white/5">
      <div className="max-w-7xl mx-auto px-6">
        <div className="mb-20 text-center space-y-4">
          <SectionTag label="Architecture Flow" />
          <h2 className="text-4xl md:text-6xl font-black tracking-tighter uppercase text-white leading-[0.9]">
            How it <span className="text-lightblueprimary">Works.</span>
          </h2>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-4 gap-12 py-4">
          {PROCESS_DATA.map((p, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.1 }}
              className="space-y-4 group"
            >
              <div className="flex items-center gap-3">
                <span className="text-lightblueprimary font-mono text-[10px] font-black">{p.id}</span>
                <div className="h-px flex-1 bg-white/10 group-hover:bg-lightblueprimary/40 transition-colors" />
              </div>
              <h3 className="text-2xl font-black uppercase tracking-tighter text-white">{p.title}</h3>
              <p className="text-white/60 text-sm leading-relaxed font-medium">{p.desc}</p>
            </motion.div>
          ))}
        </div>
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
    title: "zero-knowledge proof",
    description: "zero-knowledge proofs verify identity, reputation, and trust without exposing personal data",
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
  const [isComingSoonOpen, setIsComingSoonOpen] = useState(false);
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
    <div className="mb-12">
      <SectionTag label={label} subtitle={subtitle} />
    </div>
  );

  // --- TRUST SCORE SECTION (Infinex-Inspired Design) ---
  const TrustScoreSection = () => (
    <div className="flex flex-col items-center text-center">
      {/* Header Area */}
      <div className="mb-20 space-y-4">
        <SectionTag label="Trust Protocol" theme="light" />
        <h2 className="text-4xl md:text-6xl font-black uppercase text-[#08080C] leading-[0.9] tracking-tighter max-w-4xl mx-auto">
          Trustscore that <br className="hidden md:block" />
          unlocks <span className="text-lightblueprimary">Anything</span>
        </h2>
      </div>

      {/* 4-Column Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8 md:gap-x-12 md:gap-y-16 w-full text-left max-w-5xl">
        {trustScoreFeatures.map((f: any, i) => (
          <div key={i} className="space-y-5 group">
            <div className={`w-8 h-8 flex items-center justify-center transition-all duration-300 ${f.isPurple ? 'text-lightblueprimary' : 'text-[#08080C]'}`}>
              <Image
                src={f.icon}
                alt={f.title}
                width={28}
                height={28}
                className={`w-full h-full object-contain ${f.isPurple ? 'opacity-100' : 'opacity-80'}`}
              />
            </div>
            <div className="space-y-2">
              <h4 className="text-lg font-medium text-[#08080C] tracking-tight">
                {f.title}
              </h4>
              <p className="text-xs md:text-sm text-black/50 leading-relaxed font-medium max-w-[240px]">
                {f.description}
              </p>
            </div>
          </div>
        ))}
      </div>

      {/* Button - Moved below grid */}
      <div className="mt-24">
        <Link href="/docs" className="inline-flex items-center gap-2 group p-0.5 rounded-full bg-white/5 hover:bg-white/10 transition-all duration-300">
          <div className="bg-lightblueprimary text-black px-12 py-3.5 rounded-full font-black text-[13px] uppercase tracking-widest transition-transform duration-300 group-hover:scale-[0.98]">
            Get Started
          </div>
        </Link>
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
                  <div className="mb-6">
                    <SectionTag label="Core" subtitle="Identity & Utility Layer" />
                  </div>
                  <h1 className="text-[3rem] md:text-[3.5rem] lg:text-[5rem] font-geist font-black uppercase leading-none text-primaryText tracking-tighter lg:tracking-[-0.05em]">
                    Multi-layered Trust Engine for{' '}
                    <span className="text-lightblueprimary inline-block leading-tight min-w-[214px] md:min-w-[357px] text-left">
                      {currentText}
                      <span className="animate-pulse">|</span>
                    </span>
                  </h1>
                  <p className="text-primaryText/80 text-sm md:text-lg tracking-[-2%]">
                    A zero-knowledge trust protocol that powers capital-efficient applications — from authentication to payments, launches, lending and more.
                  </p>
                  <div className="flex flex-col md:flex-row gap-6 items-center justify-center pt-4 md:pt-8">
                    <a
                      href="https://ans.anylayer.org"
                      target="_blank"
                      rel="noopener noreferrer"
                      className="group relative max-w-72 md:max-w-60 w-full active:translate-y-0.5 transition-all text-left"
                    >
                      <div className="absolute inset-0 bg-lightblueprimary blur-2xl opacity-20 group-hover:opacity-40 transition-opacity" />
                      <div className="relative bg-gradient-to-r from-blueprimary to-lightblueprimary text-primaryText font-semibold px-8 py-3.5 rounded-full transition-all text-sm lg:text-base text-center flex items-center justify-center gap-3 shadow-[0_8px_30px_rgba(166,131,255,0.2)]">
                        <span className="whitespace-nowrap">Reserve a Name</span>
                        <Image src="/button-arrow.svg" alt="launch app" width="14" height="14" className="w-3.5 h-3.5 lg:w-[14px] lg:h-[14px]" />
                      </div>
                    </a>
                    <button
                      onClick={() => setIsComingSoonOpen(true)}
                      className="group relative max-w-72 md:max-w-60 w-full active:translate-y-0.5 transition-all focus:outline-none"
                    >
                      <div className="absolute inset-0 bg-white blur-2xl opacity-5 group-hover:opacity-10 transition-opacity" />
                      <div className="relative bg-white/5 hover:bg-white/10 border border-white/10 text-primaryText font-semibold px-8 py-3.5 rounded-full transition-all text-sm lg:text-base text-center flex items-center justify-center">
                        Documentation
                      </div>
                    </button>
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
              <div className="mb-6">
                <SectionTag label="Signal" subtitle="Trust Analytics" />
              </div>
              <h2 className="text-4xl md:text-6xl font-black uppercase text-primaryText mb-6 leading-[0.9] tracking-tighter text-center">
                {" "}
                Understand and verify <span className='text-lightblueprimary'> trust </span> across every <span className='text-lightblueprimary'> Signal</span>
              </h2>
              <p className="text-primaryText/80 text-base text-center px-10 ">
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
                  src="/chain-card-anylayer.svg"
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
        <section id="trustScore" className="py-24 md:py-32 px-5 w-full z-10 relative bg-white border-y border-black/5">
          <div className="max-w-screen-xl mx-auto">
            <TrustScoreSection />
          </div>
        </section>




        <AIAgents />

        <ParallelCards sectionId="dimension" />

        <Attesters onTriggerModal={() => setIsComingSoonOpen(true)} />

        <CodeIntegration onTriggerModal={() => setIsComingSoonOpen(true)} />

        <BlogWidget
          limit={3}
          title="Latest from Anylayer"
          subtitle="Stay informed with the latest news, research, and product updates."
          dark={true}
        />

        <Faqs />

        <Footer />

        <AutoPopupModal />
      </div>
      <ComingSoonModal isOpen={isComingSoonOpen} onClose={() => setIsComingSoonOpen(false)} />
    </>
  );
}