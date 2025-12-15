import React, { useState, useEffect } from 'react';
import { motion, useScroll, useTransform } from 'framer-motion';
import Image from 'next/image';
import ClientsLogo from './ClientsLogo';
import ParallelCards from './ParallelCards';
import TabsCard from './TabsCard';
import CodeIntegration from './CodeIntegration';
import Faqs from './Faqs';
import { Footer } from './layout/Footer';


const trustScoreFeatures = [
    {
      icon: (
        <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" />
        </svg>
      ),
      title: "Sybil resistance",
      description: "prevents gaming of rewards and airdrops."
    },
    {
      icon: (
        <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4.354a4 4 0 110 5.292M15 21H3v-1a6 6 0 0112 0v1zm0 0h6v-1a6 6 0 00-9-5.197M13 7a4 4 0 11-8 0 4 4 0 018 0z" />
        </svg>
      ),
      title: "AI + Human scoring",
      description: "manually, or let AI agents auto-assign"
    },
    {
      icon: (
        <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z" />
        </svg>
      ),
      title: "zero-knowledge prove",
      description: "actions before they are performed by the AI agents"
    },
    {
      icon: (
        <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" />
        </svg>
      ),
      title: "Cross-chain comparability",
      description: "and trigger actions based on the customer history"
    }
  ];

export default function HomePage() {
  return <LandingPage />;
}

interface LandingPageProps {
  enableRevolvingAnimation?: boolean;
}

export function LandingPage({ enableRevolvingAnimation = false }: LandingPageProps = {}) {
  const { scrollY } = useScroll();
  const [headerStyle, setHeaderStyle] = useState('transparent');
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [isResourcesDropdownOpen, setIsResourcesDropdownOpen] = useState(false);
  const [resourcesDropdownTimeout, setResourcesDropdownTimeout] = useState<NodeJS.Timeout | null>(null);

  

  const toggleMenu = () => {
    setIsMobileMenuOpen(!isMobileMenuOpen);
  };

  const scrollToSection = (sectionId: string) => {
    const element = document.getElementById(sectionId);
    if (element) {
      const headerOffset = 100;
      const elementPosition = element.getBoundingClientRect().top;
      const offsetPosition = elementPosition + window.pageYOffset - headerOffset;
      
      window.scrollTo({
        top: offsetPosition,
        behavior: 'smooth'
      });
      setIsMobileMenuOpen(false);
    }
  };

  useEffect(() => {
    const unsubscribe = scrollY.onChange(latest => {
      if (latest > 900) {
        setHeaderStyle('solid');
      } else {
        setHeaderStyle('transparent');
      }
    });
    return unsubscribe;
  }, [scrollY]);

  // Cleanup timeout on unmount
  useEffect(() => {
    return () => {
      if (resourcesDropdownTimeout) {
        clearTimeout(resourcesDropdownTimeout);
      }
    };
  }, [resourcesDropdownTimeout]);

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.3
      }
    }
  };

  return (
    <>
    <div className="relative w-full min-w-full overflow-x-hidden">
        {/* Header & Banner */}
        <section className="relative pt-20 lg:pt-24 overflow-hidden bg-[url('/swatch.png')] bg-cover bg-top ">
          <motion.header
            className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 bg-transparent `} // backdrop-blur-md
            // initial={{ y: -100 }}
            // animate={{ y: 0 }}
            // transition={{ duration: 0.5 }}
          >
            <div className='headerMain relative'>
              <div className="max-w-screen-xl mx-auto px-5 py-5">
                <div className="flex items-center justify-between h-16">
                  {/* Logo */}
                  <Image src="/logo-anylayer.svg" alt="Anylayer logo" width="160" height="64" />

                  {/* Desktop Navigation */}
                  <motion.nav
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ duration: 0.3 }}
                    className="hidden md:flex items-center gap-x-4 lg:gap-x-6 relative"
                  >
                    <button
                      onClick={() => scrollToSection('trust')}
                      className={`transition-colors text-[#636475] hover:text-white cursor-pointer text-sm whitespace-nowrap`}
                    >
                      Trust
                    </button>
                    <button
                      onClick={() => scrollToSection('reputation')}
                      className={`transition-colors text-[#636475] hover:text-white cursor-pointer text-sm whitespace-nowrap`}
                    >
                      Features
                    </button>
                    <button
                      onClick={() => scrollToSection('integration')}
                      className={`transition-colors text-[#636475] hover:text-white cursor-pointer text-sm whitespace-nowrap`}
                    >
                      Integration
                    </button>
                    <button
                      onClick={() => scrollToSection('capital')}
                      className={`transition-colors text-[#636475] hover:text-white cursor-pointer text-sm whitespace-nowrap`}
                    >
                      Capital
                    </button>
                    <button
                      onClick={() => scrollToSection('public-good')}
                      className={`transition-colors text-[#636475] hover:text-white cursor-pointer text-sm whitespace-nowrap`}
                    >
                      Reputation
                    </button>
                    {/* Resources Dropdown */}
                    <div 
                      className="relative"
                      onMouseEnter={() => {
                        if (resourcesDropdownTimeout) {
                          clearTimeout(resourcesDropdownTimeout);
                          setResourcesDropdownTimeout(null);
                        }
                        setIsResourcesDropdownOpen(true);
                      }}
                      onMouseLeave={() => {
                        const timeout = setTimeout(() => {
                          setIsResourcesDropdownOpen(false);
                        }, 100);
                        setResourcesDropdownTimeout(timeout);
                      }}
                    >
                      <button
                        className={`transition-colors text-[#636475] hover:text-white cursor-pointer text-sm whitespace-nowrap flex items-center gap-1`}
                      >
                        Resources
                        <svg 
                          className={`w-4 h-4 transition-transform ${isResourcesDropdownOpen ? 'rotate-180' : ''}`}
                          fill="none" 
                          stroke="currentColor" 
                          viewBox="0 0 24 24"
                        >
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                        </svg>
                      </button>
                      {isResourcesDropdownOpen && (
                        <div className="absolute top-full left-0 w-80 z-50 -mt-1 pt-1">
                          <div className="bg-white rounded-lg shadow-xl border border-gray-200 py-6">
                            <div className="grid grid-cols-1 gap-6 px-6">
                              <div>
                                <button
                                  onClick={() => {
                                    scrollToSection('trustscore');
                                    setIsResourcesDropdownOpen(false);
                                  }}
                                  className="block w-full text-left text-gray-700 hover:text-gray-900 hover:bg-gray-50 px-3 py-2 rounded transition-colors text-sm"
                                >
                                  Trustscore
                                </button>
                                <button
                                  onClick={() => {
                                    scrollToSection('faq');
                                    setIsResourcesDropdownOpen(false);
                                  }}
                                  className="block w-full text-left text-gray-700 hover:text-gray-900 hover:bg-gray-50 px-3 py-2 rounded transition-colors text-sm"
                                >
                                  FAQs
                                </button>
                              </div>
                              <div>
                                <a
                                  href="https://docs.onzks.com"
                                  target="_blank"
                                  rel="noopener noreferrer"
                                  className="block w-full text-left text-gray-700 hover:text-gray-900 hover:bg-gray-50 px-3 py-2 rounded transition-colors text-sm"
                                >
                                  Builder
                                </a>
                                <a
                                  href="https://docs.onzks.com"
                                  target="_blank"
                                  rel="noopener noreferrer"
                                  className="block w-full text-left text-gray-700 hover:text-gray-900 hover:bg-gray-50 px-3 py-2 rounded transition-colors text-sm"
                                >
                                  Documentation
                                </a>
                                <a
                                  href="https://branding.anylayer.org"
                                  target="_blank"
                                  rel="noopener noreferrer"
                                  className="block w-full text-left text-gray-700 hover:text-gray-900 hover:bg-gray-50 px-3 py-2 rounded transition-colors text-sm"
                                >
                                  Brand Assets
                                </a>
                              </div>
                            </div>
                          </div>
                        </div>
                      )}
                    </div>
                  </motion.nav>
                  <a
                      href="https://app.anylayer.org"
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-[#CCD1E9] rounded-full font-medium flex items-center justify-center gap-2 lg:gap-3 transition-all duration-300 whitespace-nowrap flex-shrink-0"
                    >
                      <span className="text-sm lg:text-base">Launch App</span>
                      <Image src="/filled-arrow.svg" alt="launch app" width="20" height="18" className="w-3 h-3 lg:w-[18px] lg:h-[18px]" />
                    </a>

                  {/* Mobile Menu Button */}
                  <button
                    onClick={toggleMenu}
                    className="md:hidden text-white p-2 hover:bg-white/10 rounded-lg transition-colors"
                    aria-label="Toggle menu"
                  >
                    {isMobileMenuOpen ? (
                      <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                      </svg>
                    ) : (
                      <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
                      </svg>
                    )}
                  </button>
                </div>

                {/* Mobile Menu */}
                  {isMobileMenuOpen && (
                    <motion.div
                      initial={{ opacity: 0, height: 0 }}
                      animate={{ opacity: 1, height: 'auto' }}
                      exit={{ opacity: 0, height: 0 }}
                      transition={{ duration: 0.3 }}
                      className="md:hidden overflow-hidden"
                    >
                      <nav className="flex flex-col gap-4 py-6 border-t border-gray-800 mt-4">
                        <button
                          onClick={() => scrollToSection('trust')}
                          className="text-gray-300 hover:text-white transition-colors py-2 px-4 hover:bg-white/5 rounded-lg text-left"
                        >
                          Trust
                        </button>
                        <button
                          onClick={() => scrollToSection('reputation')}
                          className="text-gray-300 hover:text-white transition-colors py-2 px-4 hover:bg-white/5 rounded-lg text-left"
                        >
                          Features
                        </button>
                        <button
                          onClick={() => scrollToSection('integration')}
                          className="text-gray-300 hover:text-white transition-colors py-2 px-4 hover:bg-white/5 rounded-lg text-left"
                        >
                          Integration
                        </button>
                        <button
                          onClick={() => scrollToSection('capital')}
                          className="text-gray-300 hover:text-white transition-colors py-2 px-4 hover:bg-white/5 rounded-lg text-left"
                        >
                          Capital
                        </button>
                        <button
                          onClick={() => scrollToSection('public-good')}
                          className="text-gray-300 hover:text-white transition-colors py-2 px-4 hover:bg-white/5 rounded-lg text-left"
                        >
                          Reputation
                        </button>
                        <div className="border-t border-gray-800 pt-4">
                          <button
                            onClick={() => setIsResourcesDropdownOpen(!isResourcesDropdownOpen)}
                            className="text-gray-300 hover:text-white transition-colors py-2 px-4 hover:bg-white/5 rounded-lg text-left w-full flex items-center justify-between"
                          >
                            Resources
                            <svg 
                              className={`w-4 h-4 transition-transform ${isResourcesDropdownOpen ? 'rotate-180' : ''}`}
                              fill="none" 
                              stroke="currentColor" 
                              viewBox="0 0 24 24"
                            >
                              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                            </svg>
                          </button>
                          {isResourcesDropdownOpen && (
                            <div className="mt-2 pl-4 space-y-2">
                              <button
                                onClick={() => {
                                  scrollToSection('trustscore');
                                  setIsResourcesDropdownOpen(false);
                                }}
                                className="block w-full text-left text-gray-300 hover:text-white transition-colors py-1 px-4 hover:bg-white/5 rounded-lg"
                              >
                                Trustscore
                              </button>
                              <button
                                onClick={() => {
                                  scrollToSection('faq');
                                  setIsResourcesDropdownOpen(false);
                                }}
                                className="block w-full text-left text-gray-300 hover:text-white transition-colors py-1 px-4 hover:bg-white/5 rounded-lg"
                              >
                                FAQs
                              </button>
                              <a
                                href="https://docs.onzks.com"
                                target="_blank"
                                rel="noopener noreferrer"
                                className="block w-full text-left text-gray-300 hover:text-white transition-colors py-1 px-4 hover:bg-white/5 rounded-lg"
                              >
                                Builder
                              </a>
                              <a
                                href="https://docs.onzks.com"
                                target="_blank"
                                rel="noopener noreferrer"
                                className="block w-full text-left text-gray-300 hover:text-white transition-colors py-1 px-4 hover:bg-white/5 rounded-lg"
                              >
                                Documentation
                              </a>
                              <a
                                href="https://branding.anylayer.org"
                                target="_blank"
                                rel="noopener noreferrer"
                                className="block w-full text-left text-gray-300 hover:text-white transition-colors py-1 px-4 hover:bg-white/5 rounded-lg"
                              >
                                Brand Assets
                              </a>
                            </div>
                          )}
                        </div>
                        <a
                          href="https://app.anylayer.org"
                          target="_blank"
                          rel="noopener noreferrer"
                          className="w-full outline outline-[#0CFF85]/20 bg-gradient-to-b from-[#079950] to-[#0CFF85] text-white py-2.5 px-6 rounded-full font-medium flex items-center justify-start gap-3 transition-all duration-300 shadow-[inset_0_2px_0_0_rgba(255,255,255,0.4)]"
                        >
                          <Image src="/sparkles.svg" alt="launch app" width="27" height="24" />
                          <span>Launch App</span>
                        </a>
                      </nav>
                    </motion.div>
                  )}
              </div>
            </div>
          </motion.header>

          {/* Banner Section */}
          <div className="relative overflow-hidden ">
            <div className="relative max-w-4xl mx-auto px-5 pt-16 pb-10 md:pb-20">
                <motion.div
                  initial={{ opacity: 0 }}
                  whileInView={{ opacity: 1 }}
                  viewport={{ once: true, amount: 0.2 }}
                  transition={{ duration: 0.8 }}
                  className="text-center"
                >
                  <div className="space-y-6 z-10 text-center">
                    <h1 className="text-[1.5rem] md:text-[3.5rem] lg:text-[5rem] font-medium leading-tight text-primaryText">
                      Multi-layered Trust Engine for <span className='bg-gradient-to-r from-blueprimary to-lightblueprimary bg-clip-text text-transparent'> Humans</span> 
                    </h1>
                    <p className="text-primaryText/60 text-lg opacity-70">
                      A zero-knowledge trust layer that powers capital-efficient applications — from authentication to payments, launches, lending and more.
                    </p>
                    <div className="flex flex-col md:flex-row gap-4 items-center justify-center pt-0 md:pt-4">
                      <a
                        href="https://app.anylayer.org"
                        target="_blank"
                        rel="noopener noreferrer"
                        className="bg-gradient-to-r from-blueprimary to-lightblueprimary text-primaryText font-medium max-w-44 md:max-w-42 w-full px-4 md:px-8 py-2.5 rounded-xl transition-all duration-300 transform text-sm lg:text-base text-center flex items-center justify-center gap-2 lg:gap-3"
                      >
                        <span>Create ID</span>
                        <Image src="/button-arrow.svg" alt="launch app" width="14" height="14" className="w-3 h-3 lg:w-[14px] lg:h-[14px]" />
                      </a>
                      <a
                        href="https://drive.google.com/file/d/1yACxELpR1Qt34hMYH0DDyi6sHTQuZjVG/view?usp=sharing"
                        target="_blank"
                        rel="noopener noreferrer"
                        className="bg-primaryText/10 hover:bg-neutral-700 border border-solid border-white/20 text-primaryText font-light px-4 md:px-8 py-2.5 max-w-44 w-full md:max-w-full md:w-auto rounded-xl transition-all duration-300 text-sm lg:text-base text-center"
                      >
                        Documentation
                      </a>
                    </div>
                  </div>
                </motion.div>
            </div>
          </div>
        </section>

        {/* Partner Logos */}
        <ClientsLogo />

        {/* Section 2 charts */}
        <section id="reputation" className="px-5 py-10 md:py-20 max-w-screen-xl mx-auto">
          <div className="flex flex-wrap justify-between items-center gap-2">
            <motion.div
              initial={{ opacity: 0, y: 50 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, amount: 0.2 }}
              transition={{ duration: 0.6, delay: 0.2 }}
              className="max-w-[39rem] mx-auto flex flex-wrap justify-center items-center"
            >
              <div className="mb-3 inline-flex items-center justify-center gap-3 rounded-full bg-white/5 px-6 py-3">
                <span className="text-sm text-white/50">Trust Engine</span>
              </div>
              <h2 className="text-[1.5rem] md:text-[1.875rem] lg:text-[3.25rem] font-medium text-primaryText mb-6 leading-tight text-center">
                {" "}
                Understand and verify <span className='bg-gradient-to-r from-blueprimary to-lightblueprimary bg-clip-text text-transparent'> trust </span> across every <span className='bg-gradient-to-r from-blueprimary to-lightblueprimary bg-clip-text text-transparent'> Signal</span>
              </h2>
              <p className="text-primaryText/60 text-base text-center px-10">
                Explore reputation growth, verify real users, and see what drives trust with clean visual insights and instant scoring.
              </p>
            </motion.div>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-5 gap-5 items-stretch mt-20">
            {/* Wallet ID */}
            <motion.div
              initial={{ opacity: 0, y: 50 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, amount: 0.2 }}
              transition={{ duration: 0.6, delay: 0.2 }}
              className='md:col-span-2'
            >
              <div className="px-6 pb-7 pt-10 rounded-[20px] bg-[#121119] h-full">
                <Image
                  src="/double-cards.svg"
                  alt="See what drives reputation clearly"
                  width="400"
                  height="319"
                  className="w-full h-[319px] object-contain mb-10"
                />
                <h3 className="text-primaryText text-2xl font-medium mb-1 tracking-tighter">
                  {"See what drives reputation clearly"}
                </h3>
                <p className="text-primaryText/60 text-base tracking-tighter">
                  {
                    "Break down trust into identity, behavior, and wallet activity at a glance for everyone."
                  }
                </p>
              </div>
            </motion.div>
            <motion.div
              initial={{ opacity: 0, y: 50 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, amount: 0.2 }}
              transition={{ duration: 0.6, delay: 0.4 }}
              className="md:col-span-3"
            >
              <div className="px-6 pb-7 pt-10 rounded-[20px] bg-[#121119] h-full">
                <Image
                  src="/line-chart.svg"
                  alt="Real-time trust, always up-to-date"
                  width="658"
                  height="319"
                  className="w-full h-[319px] object-contain mb-10"
                />
                <h3 className="text-primaryText text-2xl font-medium mb-1 tracking-tighter">
                  {"Real-time trust, always up-to-date"}
                </h3>
                <p className="text-primaryText/60 text-base tracking-tighter">
                  {
                    "Track every score change instantly across identity, wallets, and actions, allowing you to monitor growth, risks, and performance without revealing sensitive data."
                  }
                </p>
              </div>
            </motion.div>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-5 gap-5 items-stretch mt-5">
            <motion.div
              initial={{ opacity: 0, y: 50 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, amount: 0.2 }}
              transition={{ duration: 0.6, delay: 0.2 }}
              className="md:col-span-3"
            >
              <div className="px-6 pb-7 pt-10 rounded-[20px] bg-[#121119] h-full">
                <Image
                  src="/trust-history.svg"
                  alt="Follow every action that shapes trust"
                  width="690"
                  height="350"
                  className="w-full h-[350px] object-contain"
                />
                <h3 className="text-primaryText text-2xl font-medium mt-3 mb-1 tracking-tighter">
                  {"Follow every action that shapes trust"}
                </h3>
                <p className="text-primaryText/60 text-base tracking-tighter">
                  {
                    "View history, scores, and signals from swaps, claims, bridges, and governance, helping you understand how each action contributes to reputation growth and long-term credibility."
                  }
                </p>
              </div>
            </motion.div>
            <motion.div
              initial={{ opacity: 0, y: 50 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, amount: 0.2 }}
              transition={{ duration: 0.6, delay: 0.4 }}
              className="md:col-span-2"
            >
              <div className="px-6 pb-7 pt-10 rounded-[20px] bg-[#121119] h-full">
                <Image
                  src="/chain-card.svg"
                  alt="Verify credibility anywhere on-chain"
                  width="400"
                  height="350"
                  className="w-full h-[350px] object-contain"
                />
                <h3 className="text-primaryText text-2xl font-medium mt-3 mb-1 tracking-tighter">
                  {"Verify credibility anywhere on-chain"}
                </h3>
                <p className="text-primaryText/60 text-base tracking-tighter">
                  {
                    "Gamified reputation building with rewards and special recognition."
                  }
                </p>
              </div>
            </motion.div>
          </div>
        </section>

        {/* Section Architecture */}
        <section id="architecture" className="px-5 py-10 md:py-20 max-w-screen-xl mx-auto">
          <div className="flex flex-wrap justify-between items-center gap-2 ">
            <motion.div
              initial={{ opacity: 0, y: 50 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, amount: 0.2 }}
              transition={{ duration: 0.6, delay: 0.2 }}
              className="max-w-[47rem] mx-auto flex flex-wrap justify-center items-center"
            >
              <div className="mb-3 inline-flex items-center justify-center gap-3 rounded-full bg-white/5 px-6 py-3">
                <span className="text-sm text-white/50">Trust Engine</span>
              </div>
              <h2 className="text-[1.5rem] md:text-[1.875rem] lg:text-[3.25rem] font-medium text-primaryText mb-6 leading-tight text-center">
                {" "}
                A <span className='bg-gradient-to-r from-blueprimary to-lightblueprimary bg-clip-text text-transparent'> four-layer </span> trust architecture built for <span className='bg-gradient-to-r from-blueprimary to-lightblueprimary bg-clip-text text-transparent'> digital economy</span>
              </h2>
              <p className="text-primaryText/60 text-base text-center px-10">
                Explore reputation growth, verify real users, and see what drives trust with clean visual insights and instant scoring.
              </p>
            </motion.div>
          </div>

          {/* Layer Architecture Images */}
          <div className="min-h-screen flex items-center justify-center">
            <div className="w-full max-w-6xl">
              <div className="relative flex flex-col items-center">
                {/* Stacked Layers Icon at Top */}
                <motion.div 
                  className="relative z-10 mb-8"
                  initial={{ opacity: 0, scale: 0.8 }}
                  animate={{ opacity: 1, scale: 1 }}
                  transition={{ duration: 0.6, ease: 'easeOut' }}
                >
                  {/* Layer Image here */}
                </motion.div>

                {/* Vertical Line */}
                <div className="absolute top-28 left-1/2 transform -translate-x-1/2 w-0.5 h-[calc(100%-345px)] bg-gradient-to-b from-[#DCCFFF] to-[#A683FF] z-20"></div>

                {/* Layer Items */}
                <motion.div 
                  className="w-full mt-12"
                  variants={containerVariants}
                  initial="hidden"
                  animate="visible"
                >
                  {/* Identity Layer */}
                  <motion.div className="relative flex items-center justify-center gap-8 bg-[url('/identity-layer-bg.svg')] bg-contain bg-center bg-no-repeat h-[218px]" variants={{
                      hidden: { opacity: 0, y: 20 },
                      visible: {
                        opacity: 1,
                        y: 0,
                        transition: {
                          duration: 0.6,
                          ease: 'easeOut'
                        }
                      }
                    }}>
                    <div className="flex-1 flex items-start gap-4 max-w-72">
                      <div className="flex items-start gap-3">
                        <div className="w-10 h-10 bg-gray-800 rounded-lg flex items-center justify-center flex-shrink-0">
                          <svg className="w-5 h-5 text-purple-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
                          </svg>
                        </div>
                        <div>
                          <h3 className="text-white font-semibold text-lg">Identity Layer</h3>
                          <p className="text-gray-500 text-sm">2k5 name service</p>
                        </div>
                      </div>
                    </div>
                    
                    <div className="relative z-20">
                      <Image src={'/identity-layer.svg'} alt="" width="122" height="96" className="" />
                    </div>

                    <div className="flex max-w-72 ">
                      <p className="text-gray-400 text-sm leading-relaxed">
                        Enables every participant to mint a digital identity as a human-readable ZKS name
                      </p>
                    </div>
                  </motion.div>

                  {/* Reputation Layer */}
                  <motion.div className="relative flex items-start justify-center gap-8 pt-7 bg-[url('/reputation-layer-bg.svg')] bg-contain bg-center bg-no-repeat h-[141px] -mt-6 z-20" variants={{
                        hidden: { opacity: 0, y: 20 },
                        visible: {
                          opacity: 1,
                          y: 0,
                          transition: {
                            duration: 0.6,
                            ease: 'easeOut'
                          }
                        }
                      }}>
                    <div className="flex-1 flex items-start gap-4 max-w-72">
                      <div className="flex items-start gap-3">
                        <div className="w-10 h-10 bg-gray-800 rounded-lg flex items-center justify-center flex-shrink-0">
                          <svg className="w-5 h-5 text-purple-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" />
                          </svg>
                        </div>
                        <div>
                          <h3 className="text-white font-semibold text-lg">Reputation Layer</h3>
                          <p className="text-gray-500 text-sm">on-chain trustworthiness</p>
                        </div>
                      </div>
                    </div>
                    
                    <div className="relative z-20">
                      <Image src={'/reputation-layer.svg'} alt="" width="122" height="96" className="" />
                    </div>

                    <div className="flex max-w-72">
                      <p className="text-gray-400 text-sm leading-relaxed">
                        Transforms behavioral, financial, and operational data into a dynamic Trust Score
                      </p>
                    </div>
                  </motion.div>

                  {/* Proof Layer */}
                  <motion.div className="relative flex items-start justify-center gap-8 pt-11 bg-[url('/proof-layer-bg.svg')] bg-contain bg-center bg-no-repeat h-[152px] -mt-10 z-10" variants={{
                      hidden: { opacity: 0, y: 20 },
                      visible: {
                        opacity: 1,
                        y: 0,
                        transition: {
                          duration: 0.6,
                          ease: 'easeOut'
                        }
                      }
                    }}>
                    <div className="flex-1 flex items-start gap-4 max-w-72">
                      <div className="flex items-start gap-3">
                        <div className="w-10 h-10 bg-gray-800 rounded-lg flex items-center justify-center flex-shrink-0">
                          <svg className="w-5 h-5 text-purple-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
                          </svg>
                        </div>
                        <div>
                          <h3 className="text-white font-semibold text-lg">Proof layer</h3>
                          <p className="text-gray-500 text-sm">Proof of Trust with Privacy</p>
                        </div>
                      </div>
                    </div>
                    
                    <div className="relative z-20">
                      <Image src={'/proof-layer.svg'} alt="" width="122" height="96" className="" />
                    </div>

                    <div className="flex max-w-72">
                      <p className="text-gray-400 text-sm leading-relaxed">
                        Generate proofs that confirm thresholds without disclosing your data.
                      </p>
                    </div>
                  </motion.div>

                  {/* Utility Layer */}
                  <motion.div className="relative flex items-start justify-center gap-8 pt-14 bg-[url('/utility-layer-bg.svg')] bg-contain bg-center bg-no-repeat h-[312px] -mt-10" variants={{
                      hidden: { opacity: 0, y: 20 },
                      visible: {
                        opacity: 1,
                        y: 0,
                        transition: {
                          duration: 0.6,
                          ease: 'easeOut'
                        }
                      }
                    }}>
                    <div className="flex-1 flex items-start gap-4 max-w-72">
                      <div className="flex items-start gap-3">
                        <div className="w-10 h-10 bg-gray-800 rounded-lg flex items-center justify-center flex-shrink-0">
                          <svg className="w-5 h-5 text-purple-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19.428 15.428a2 2 0 00-1.022-.547l-2.387-.477a6 6 0 00-3.86.517l-.318.158a6 6 0 01-3.86.517L6.05 15.21a2 2 0 00-1.806.547M8 4h8l-1 1v5.172a2 2 0 00.586 1.414l5 5c1.26 1.26.367 3.414-1.415 3.414H4.828c-1.782 0-2.674-2.154-1.414-3.414l5-5A2 2 0 009 10.172V5L8 4z" />
                          </svg>
                        </div>
                        <div>
                          <h3 className="text-white font-semibold text-lg">Utility Layer</h3>
                          <p className="text-gray-500 text-sm">Reputation based applications</p>
                        </div>
                      </div>
                    </div>
                    
                    <div className="relative z-20">
                      <Image src={'/utility-layer.svg'} alt="" width="122" height="96" className="" />
                    </div>

                    <div className="flex max-w-72">
                      <p className="text-gray-400 text-sm leading-relaxed">
                        Build trust-based features with SDKs/APIs and Smart contracts.
                      </p>
                    </div>
                  </motion.div>
                </motion.div>
              </div>
            </div>
          </div>
        </section>

        {/* Section Trust Score */}
        <section id="trustScore" className="py-10 md:pt-10 md:pb-20 px-5 max-w-screen-xl mx-auto">
          <div className="grid lg:grid-cols-2 gap-12 lg:gap-20 items-start">
            {/* Left Content */}
            <motion.div
              initial={{ opacity: 0, y: 50 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, amount: 0.2 }}
              transition={{ duration: 0.6, delay: 0.2 }}
              className="max-w-[47rem] mx-auto flex flex-wrap justify-start items-center"
            >
              <div className="mb-3 inline-flex items-center justify-center gap-3 rounded-full bg-white/5 px-6 py-3">
                <span className="text-sm text-white/50">Trust Engine</span>
              </div>
              <h2 className="text-[1.5rem] md:text-[1.875rem] lg:text-[3.25rem] font-medium text-primaryText mb-6 leading-tight">
                {" "}
                Trustscore that <span className='bg-gradient-to-r from-blueprimary to-lightblueprimary bg-clip-text text-transparent'> unlocks </span> Anything
              </h2>
              <p className="text-primaryText/60 text-base">
                Anylayer computes a dynamic Trust Index (0–9000) using identity, on-chain behavior, proofs, achievements, and agent reliability — all privately verified.
              </p>
            </motion.div>

            {/* Right Content - Trust Score Card */}
            <motion.div
              initial={{ opacity: 0, x: 30 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.6, delay: 0.2 }}
              className="relative pb-10"
            >
              <div className="relative bg-[#1C1C26]/90 rounded-2xl p-4 border border-gray-800/50 max-w-[365px]">
                {/* Header */}
                <div className="flex justify-between items-center mb-10 bg-[#413D57]/20 rounded-xl px-5 py-4">
                    <div className="text-[#636475] text-sm uppercase">WALLET</div>
                    <div className="text-[#CCD1E9] text-sm">0xA6...91F2</div>
                </div>

                {/* Left Side Labels */}
                <div className="space-y-4 mt-3">
                  <div className="flex justify-between items-center">
                      <div className="text-[#636475] text-sm uppercase">HUMAN</div>
                      <div className="text-[#CCD1E9] text-sm ">Verified</div>
                  </div>
                  <div className="flex justify-between items-center">
                      <div className="text-[#636475] text-sm uppercase">WALLET AGE</div>
                      <div className="text-[#CCD1E9] text-sm ">90+ Days</div>
                  </div>
                  <div className="flex justify-between items-center">
                      <div className="text-[#636475] text-sm uppercase">ACTIVITY</div>
                      <div className="text-[#CCD1E9] text-sm ">consistent</div>
                  </div>
                </div>
                <div className="flex justify-between items-center mt-10 bg-[#413D57]/20 rounded-xl px-5 py-4">
                    <div className="text-[#636475] text-sm uppercase">SCORE</div>
                    <div className="text-[#CCD1E9] text-sm ">72</div>
                </div>
              </div>
              <div className="bg-[#1C1C26]/90 rounded-xl p-6 border border-gray-700/20 max-w-[343px] w-full absolute right-0 bottom-0">
                  <div className="flex items-start justify-between mb-4">
                    <div className="flex items-center gap-2">
                      <div className="w-12 h-12 bg-[#CCD1E9]/5 rounded-full flex items-center justify-center">
                        <Image src={'/knight-shield.svg'} alt='Shield' width={23} height={23} />
                      </div>
                      <span className="text-[#C9D1D9] text-lg font-medium font-geist">Total Trust Score</span>
                    </div>
                  </div>

                  <div className='h-[1.5px] bg-[#E3E3FE]/5 mt-14 mb-5'/>

                  <div className="flex items-center justify-between">
                    <motion.div
                      initial={{ scale: 0.5, opacity: 0 }}
                      animate={{ scale: 1, opacity: 1 }}
                      transition={{ duration: 0.5, delay: 0.4 }}
                      className="text-2xl font-bold text-[#CCD1E9] font-mono"
                    >
                      120
                    </motion.div>
                    <div className="text-[#A683FF] text-sm font-geist">+39 this month</div>
                  </div>
                </div>
            </motion.div>
          </div>

          {/* Features Grid */}
          <div className="grid sm:grid-cols-4 gap-6 mt-20">
            {trustScoreFeatures.map((feature, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: 0.2 + index * 0.1 }}
                className="flex items-center gap-2"
              >
                <div className="w-10 h-10 text-primaryText">
                  {feature.icon}
                </div>
                <div>
                  <p className="text-[#9095A4] text-sm leading-relaxed">
                    {feature.description}
                  </p>
                </div>
              </motion.div>
            ))}
          </div>
        </section>

        <ParallelCards />

        <TabsCard />

        <CodeIntegration />

        <Faqs />

        <Footer />
      </div>
    </>
  );
}