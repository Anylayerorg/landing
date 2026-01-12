import React, { useState, useEffect, useRef } from 'react';
import { AnimatePresence, motion, useMotionValueEvent, useScroll } from 'framer-motion';
import Image from 'next/image';
import ClientsLogo from './ClientsLogo';
import ParallelCards from './ParallelCards';
import TabsCard from './TabsCard';
import CodeIntegration from './CodeIntegration';
import Faqs from './Faqs';
import { Footer } from './layout/Footer';
import Architecture from './Architecture';
import { Header } from './layout/Header';
import AutoPopupModal from './Popup';


const trustScoreFeatures = [
  {
    icon: '/knight-shield.svg',
    title: "Sybil resistance",
    description: "Sybil resistance prevents fake accounts and multi-wallet abuse through reputation and trustscore"
  },
  {
    icon: '/robotic.svg',
    title: "AI + Human scoring",
    description: "AI Engine evaluates behavior, risk, and reliability for humans, wallets, and autonomous agents."
  },
  {
    icon: '/circle-lock.svg',
    title: "zero-knowledge prove",
    description: "zero-knowledge proof verify identity, reputation, and trust without exposing personal data"
  },
  {
    icon: '/flow.svg',
    title: "Cross-chain comparability",
    description: "Cross-chain support works across multiple blockchains, allowing identity and trust to move freely"
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

  return (
    <>
      <div className="relative w-full min-w-full ">
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
                  <div className="mb-2 inline-flex items-center justify-center gap-3 rounded-full bg-white/5 px-6 py-3">
                    <span className="text-sm text-white/50"><span className='font-bold'>Identity </span>, reputation & proof layer</span>
                  </div>
                  <h1 className="text-[3rem] md:text-[3.5rem] lg:text-[5rem] font-medium leading-none text-primaryText tracking-tighter lg:tracking-[-4px]">
                    Multi-layered Trust Engine for{' '}
                    <span className="bg-gradient-to-r from-blueprimary to-lightblueprimary bg-clip-text text-transparent inline-block leading-tight min-w-[214px] md:min-w-[357px] text-left">
                      {currentText}
                      <span className="animate-pulse">|</span>
                    </span>
                  </h1>
                  <p className="text-primaryText/60 text-sm md:text-lg tracking-[-2%]">
                    A zero-knowledge trust layer that powers capital-efficient applications — from authentication to payments, launches, lending and more.
                  </p>
                  <div className="flex flex-col md:flex-row gap-4 items-center justify-center pt-0 md:pt-4">
                    <a
                      href="https://app.anylayer.org"
                      target="_blank"
                      rel="noopener noreferrer"
                      className="bg-gradient-to-r from-blueprimary to-lightblueprimary text-primaryText font-medium max-w-72 md:max-w-42 w-full px-4 md:px-8 py-2.5 rounded-xl transition-all duration-300 transform text-sm lg:text-base text-center flex items-center justify-center gap-2 lg:gap-3"
                    >
                      <span>Create ID</span>
                      <Image src="/button-arrow.svg" alt="launch app" width="14" height="14" className="w-3 h-3 lg:w-[14px] lg:h-[14px]" />
                    </a>
                    <a
                      href="https://drive.google.com/file/d/1yACxELpR1Qt34hMYH0DDyi6sHTQuZjVG/view?usp=sharing"
                      target="_blank"
                      rel="noopener noreferrer"
                      className="bg-primaryText/10 hover:bg-neutral-700 border border-solid border-white/20 text-primaryText font-light px-4 md:px-8 py-2.5 max-w-72 w-full md:max-w-full md:w-auto rounded-xl transition-all duration-300 text-sm lg:text-base text-center"
                    >
                      Documentation
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
              className="max-w-[39rem] mx-auto flex flex-wrap justify-center items-center"
            >
              <div className="mb-3 inline-flex items-center justify-center gap-3 rounded-full bg-white/5 px-6 py-3">
                <span className="text-sm text-white/50">Trust Engine</span>
              </div>
              <h2 className="text-[2.25rem] lg:text-[3.25rem] font-medium text-primaryText mb-6 leading-[110%] tracking-[-2px] text-center">
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

        {/* Section Architecture */}
        <section id="architecture" className="px-5 py-10 md:py-20 max-w-screen-xl mx-auto">
          <div className="flex flex-wrap justify-between items-center gap-2 ">
            <div
              className="max-w-[47rem] mx-auto flex flex-wrap justify-center items-center"
            >
              <div className="mb-3 inline-flex items-center justify-center gap-3 rounded-full bg-white/5 px-6 py-3">
                <span className="text-sm text-white/50">Architecture</span>
              </div>
              <h2 className="text-[2.25rem] lg:text-[3.25rem] font-medium text-primaryText mb-6 leading-[110%] tracking-[-2px] text-center">
                {" "}
                A <span className='bg-gradient-to-r from-blueprimary to-lightblueprimary bg-clip-text text-transparent'> four-layer </span> trust architecture built for <span className='bg-gradient-to-r from-blueprimary to-lightblueprimary bg-clip-text text-transparent'> digital economy</span>
              </h2>
              <p className="text-primaryText/60 text-sm md:text-base text-center px-10">
                Explore reputation growth, verify real users, and see what drives trust with clean visual insights and instant scoring.
              </p>
            </div>
          </div>

          {/* Layer Architecture Images */}
          <div className="min-h-screen flex items-center justify-center">
            <div className="w-full max-w-6xl">
              <div className="relative flex flex-col items-center">
                {/* Stacked Layers Icon at Top */}
                <div
                  className="relative z-10 mt-24"
                >
                  {/* Layer Image here */}
                  <Image src={'/emblum-logo.svg'} alt="Layered Icon" width="174" height="146" className="w-32 h-auto md:w-auto" />
                </div>

                {/* Vertical Line */}
                <div className="absolute top-52 md:top-60 left-1/2 transform -translate-x-1/2 w-0.5 h-[calc(100%-345px)] md:h-[calc(100%-485px)] bg-gradient-to-b from-[#DCCFFF] to-[#A683FF] z-20"></div>

                {/* Layer Items */}
                <div
                  className="w-full mt-12"
                >
                  {/* Identity Layer */}
                  <div className="relative flex items-center justify-center gap-2 md:gap-8 bg-[url('/identity-layer-bg.svg')] bg-contain bg-center bg-no-repeat h-[140px] md:h-[218px]">
                    <div className="flex-1 flex items-start gap-4 max-w-32 md:max-w-72">
                      <div className="flex items-start gap-2 md:gap-3">
                        <div className="w-6 h-6 md:w-10 md:h-10 flex items-center justify-center flex-shrink-0">
                          <Image src={'/identity-bgicon.svg'} alt="Identity Icon" width="40" height="40" />
                        </div>
                        <div>
                          <h3 className="text-white font-medium text-xs md:text-lg">Identity Layer</h3>
                          <p className="text-white/70 text-[10px] md:text-sm">zks name service</p>
                        </div>
                      </div>
                    </div>

                    <div className="relative z-20">
                      <Image src={'/identity-layer.svg'} alt="" width="122" height="96" className="w-10 h-auto md:w-auto" />
                    </div>

                    <div className="flex max-w-32 md:max-w-72">
                      <p className="text-white/70 text-[10px] md:text-sm leading-relaxed">
                        Enables every participant to mint a digital identity as a human-readable ZKS name
                      </p>
                    </div>
                  </div>

                  {/* Reputation Layer */}
                  <div className="relative flex items-start justify-center gap-2 md:gap-8 pt-7 bg-[url('/reputation-layer-bg.svg')] bg-contain bg-center bg-no-repeat h-[130px] md:h-[141px] -mt-6 z-20">
                    <div className="flex-1 flex items-start gap-4 max-w-32 md:max-w-72">
                      <div className="flex items-start gap-2 md:gap-3">
                        <div className="w-6 h-6 md:w-10 md:h-10 flex items-center justify-center flex-shrink-0">
                          <Image src={'/reputation-bgicon.svg'} alt="Identity Icon" width="40" height="40" />
                        </div>
                        <div>
                          <h3 className="text-white font-medium text-xs md:text-lg">Reputation Layer</h3>
                          <p className="text-white/70 text-[10px] md:text-sm">on-chain trustworthiness</p>
                        </div>
                      </div>
                    </div>

                    <div className="relative z-20">
                      <Image src={'/reputation-layer.svg'} alt="" width="122" height="96" className="w-10 h-auto md:w-auto" />
                    </div>

                    <div className="flex max-w-32 md:max-w-72">
                      <p className="text-white/70 text-[10px] md:text-sm leading-relaxed">
                        Transforms behavioral, financial, and operational data into a dynamic Trust Score
                      </p>
                    </div>
                  </div>

                  {/* Proof Layer */}
                  <div className="relative flex items-start justify-center gap-2 md:gap-8 pt-11 bg-[url('/proof-layer-bg.svg')] bg-contain bg-center bg-no-repeat h-[120px] md:h-[152px] -mt-10 z-10">
                    <div className="flex-1 flex items-start gap-4 max-w-32 md:max-w-72">
                      <div className="flex items-start gap-2 md:gap-3">
                        <div className="w-6 h-6 md:w-10 md:h-10 flex items-center justify-center flex-shrink-0">
                          <Image src={'/proof-bgicon.svg'} alt="Identity Icon" width="40" height="40" />
                        </div>
                        <div>
                          <h3 className="text-white font-medium text-xs md:text-lg">Proof layer</h3>
                          <p className="text-white/70 text-[10px] md:text-sm">Proof of Trust with Privacy</p>
                        </div>
                      </div>
                    </div>

                    <div className="relative z-20">
                      <Image src={'/proof-layer.svg'} alt="" width="122" height="96" className="w-10 h-auto md:w-auto" />
                    </div>

                    <div className="flex max-w-32 md:max-w-72">
                      <p className="text-white/70 text-[10px] md:text-sm leading-relaxed">
                        Generate proofs that confirm thresholds without disclosing your data.
                      </p>
                    </div>
                  </div>

                  {/* Utility Layer */}
                  <div className="relative flex items-start justify-center gap-2 md:gap-8 pt-14 bg-[url('/utility-layer-bg.svg')] bg-contain bg-center bg-no-repeat h-[200px] md:h-[312px] -mt-10">
                    <div className="flex-1 flex items-start gap-4 max-w-32 md:max-w-72">
                      <div className="flex items-start gap-2 md:gap-3">
                        <div className="w-6 h-6 md:w-10 md:h-10 flex items-center justify-center flex-shrink-0">
                          <Image src={'/utility-bgicon.svg'} alt="Identity Icon" width="40" height="40" />
                        </div>
                        <div>
                          <h3 className="text-white font-medium text-xs md:text-lg">Utility Layer</h3>
                          <p className="text-white/70 text-[10px] md:text-sm">Reputation based applications</p>
                        </div>
                      </div>
                    </div>

                    <div className="relative z-20">
                      <Image src={'/utility-layer.svg'} alt="" width="122" height="96" className="w-10 h-auto md:w-auto" />
                    </div>

                    <div className="flex max-w-32 md:max-w-72">
                      <p className="text-white/70 text-[10px] md:text-sm leading-relaxed">
                        Build trust-based features with SDKs/APIs and Smart contracts.
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Section Trust Score */}
        <section id="trustScore" className="py-10 md:pt-10 md:pb-20 px-5 max-w-screen-xl mx-auto z-10 relative">
          <div className="grid lg:grid-cols-2 gap-12 lg:gap-20 items-start">
            {/* Left Content */}
            <div
              className="max-w-[47rem] mx-auto flex flex-wrap justify-start items-center"
            >
              <div className="mb-3 inline-flex items-center justify-center gap-3 rounded-full bg-white/5 px-6 py-3">
                <span className="text-sm text-white/50">Trust Engine</span>
              </div>
              <h2 className="text-[2.25rem] lg:text-[3.25rem] font-medium text-primaryText mb-6 leading-[100%]">
                {" "}
                Trustscore that <span className='bg-gradient-to-r from-blueprimary to-lightblueprimary bg-clip-text text-transparent'> unlocks </span> Anything
              </h2>
              <p className="text-primaryText/60 text-sm md:text-base">
                Anylayer computes a dynamic Trust Index (0–9000) using identity, on-chain behavior, proofs, achievements, and agent reliability — all privately verified.
              </p>
            </div>

            {/* Right Content - Trust Score Card */}
            <div
              className="relative pb-10"
            >
              <div className="relative bg-[#1C1C26] opacity-60 rounded-2xl p-4 border border-gray-800/50 max-w-[265px] md:max-w-[365px]">
                {/* Header */}
                <div className="flex justify-between items-center mb-6 md:mb-10 bg-[#413D57]/20 rounded-xl px-5 py-4">
                  <div className="text-[#636475] text-[10px] md:text-sm uppercase">WALLET</div>
                  <div className="text-[#CCD1E9] text-[10px] md:text-sm">0xA6...91F2</div>
                </div>

                {/* Left Side Labels */}
                <div className="space-y-2 mt-3">
                  <div className="flex justify-between items-center">
                    <div className="text-[#636475] text-[10px] md:text-sm uppercase">HUMAN</div>
                    <div className="text-[#CCD1E9] text-[10px] md:text-sm ">Verified</div>
                  </div>
                  <div className="flex justify-between items-center">
                    <div className="text-[#636475] text-[10px] md:text-sm uppercase">WALLET AGE</div>
                    <div className="text-[#CCD1E9] text-[10px] md:text-sm ">90+ Days</div>
                  </div>
                  <div className="flex justify-between items-center">
                    <div className="text-[#636475] text-[10px] md:text-sm uppercase">ACTIVITY</div>
                    <div className="text-[#CCD1E9] text-[10px] md:text-sm ">consistent</div>
                  </div>
                </div>
                <div className="flex justify-between items-center mt-6 md:mt-10 bg-[#413D57]/20 rounded-xl px-5 py-4">
                  <div className="text-[#636475] text-[10px] md:text-sm uppercase">SCORE</div>
                  <div className="text-[#CCD1E9] text-[10px] md:text-sm ">72</div>
                </div>
              </div>
              <div className="bg-[#1C1C26] opacity-80 rounded-xl p-6 border border-gray-700/20 max-w-[265px] md:max-w-[343px] w-full absolute right-0 bottom-0">
                <div className="flex items-start justify-between mb-4">
                  <div className="flex items-center gap-2">
                    <div className="w-9 h-9 md:w-12 md:h-12 bg-[#CCD1E9]/5 rounded-full flex items-center justify-center">
                      <Image src={'/knight-shield.svg'} alt='Shield' width={23} height={23} />
                    </div>
                    <span className="text-[#C9D1D9] text-sm md:text-lg font-medium font-geist">Total Trust Score</span>
                  </div>
                </div>

                <div className='h-[1.5px] bg-[#E3E3FE]/5 mt-10 md:mt-14 mb-5' />

                <div className="flex items-center justify-between">
                  <div
                    className="text-lg md:text-2xl font-bold text-[#CCD1E9] font-mono"
                  >
                    120
                  </div>
                  <div className="text-[#A683FF] text-xs md:text-sm font-geist">+39 this month</div>
                </div>
              </div>
            </div>
          </div>

          {/* Features Grid */}
          <div className="grid sm:grid-cols-4 gap-6 mt-20">
            {trustScoreFeatures.map((feature, index) => (
              <div
                key={index}
                className="flex items-center gap-4"
              >
                <div className="w-5 h-5 text-primaryText">
                  <Image src={feature.icon} alt='Shield' width={20} height={20} className='w-full h-full' />
                </div>
                <div className='flex-1'>
                  <p className="text-[#9095A4] text-sm leading-relaxed">
                    {feature.description}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </section>

        <Architecture />

        <ParallelCards sectionId="dimension" />

        <TabsCard />

        <CodeIntegration />

        <Faqs />

        <Footer />

        <AutoPopupModal />
      </div>
    </>
  );
}