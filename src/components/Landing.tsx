import React, { useState, useEffect, useRef } from 'react';
import { AnimatePresence, motion, useScroll, useTransform } from 'framer-motion';
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
  const dropdownRef = useRef<HTMLDivElement>(null);
  

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

  // Close dropdown when clicking outside
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
        setIsResourcesDropdownOpen(false);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

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
            <div className="headerMain relative">
              <div className="max-w-screen-xl mx-auto px-5 py-2">
                <div className="flex items-center justify-between h-16">
                  {/* Logo */}
                  <Image src="/logo-anylayer.svg" alt="Anylayer logo" width="160" height="64" />

                  {/* Desktop Navigation */}
                  <motion.nav
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ duration: 0.3 }}
                    className="hidden md:flex items-center gap-x-4 lg:gap-x-8 "
                  >
                    <button
                      onClick={() => scrollToSection('trust')}
                      className="transition-colors text-[#636475] hover:text-white cursor-pointer text-sm whitespace-nowrap px-3 py-2 rounded-full hover:bg-white/5"
                    >
                      Trust
                    </button>
                    <button
                      onClick={() => scrollToSection('architecture')}
                      className="transition-colors text-[#636475] hover:text-white cursor-pointer text-sm whitespace-nowrap px-3 py-2 rounded-full hover:bg-white/5"
                    >
                      Architecture
                    </button>
                    <button
                      onClick={() => scrollToSection('opportunity')}
                      className="transition-colors text-[#636475] hover:text-white cursor-pointer text-sm whitespace-nowrap px-3 py-2 rounded-full hover:bg-white/5"
                    >
                      Opportunity
                    </button>
                    <button
                      onClick={() => scrollToSection('dimension')}
                      className="transition-colors text-[#636475] hover:text-white cursor-pointer text-sm whitespace-nowrap px-3 py-2 rounded-full hover:bg-white/5"
                    >
                      Dimension
                    </button>
                    <button
                      onClick={() => scrollToSection('capital')}
                      className="transition-colors text-[#636475] hover:text-white cursor-pointer text-sm whitespace-nowrap px-3 py-2 rounded-full hover:bg-white/5"
                    >
                      Capital
                    </button>

                    {/* Resources Dropdown */}
                    <div className="" ref={dropdownRef}>
                      <button
                        onClick={() => setIsResourcesDropdownOpen(!isResourcesDropdownOpen)}
                        className="transition-colors text-[#636475] hover:text-white cursor-pointer text-sm whitespace-nowrap px-3 py-2 rounded-full hover:bg-white/5 flex items-center gap-1"
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

                      <AnimatePresence>
                        {isResourcesDropdownOpen && (
                          <motion.div
                            initial={{ opacity: 0, y: -10 }}
                            animate={{ opacity: 1, y: 0 }}
                            exit={{ opacity: 0, y: -10 }}
                            transition={{ duration: 0.2 }}
                            className="absolute top-0 left-0 mt-0 w-full z-[-1]"
                          >
                            <div className="bg-[#1A1A24]/95 backdrop-blur-2xl pt-[120px] pb-10 border border-gray-800/50 shadow-2xl overflow-hidden">
                              <div className="p-6 max-w-screen-xl mx-auto flex items-center justify-between">
                                {/* Left Column */}
                                <div className="max-w-[508px]">
                                  <p className='font-geist font-medium text-[32px] text-white leading-tight'>Everything you need to stay informed and build with Anylayer.</p>
                                </div>
                                {/* Right Column */}
                                <div className='flex gap-20'>
                                  <div className="space-y-2">
                                    <button
                                      onClick={() => {
                                        scrollToSection('trustscore');
                                        setIsResourcesDropdownOpen(false);
                                      }}
                                      className="flex items-center gap-3 w-full text-left text-white hover:text-primaryText px-3 py-2.5 rounded-lg transition-colors hover:bg-white/5"
                                    >
                                      <svg className="w-8 h-8 text-primaryText" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3.055 11H5a2 2 0 012 2v1a2 2 0 002 2 2 2 0 012 2v2.945M8 3.935V5.5A2.5 2.5 0 0010.5 8h.5a2 2 0 012 2 2 2 0 104 0 2 2 0 012-2h1.064M15 20.488V18a2 2 0 012-2h3.064M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                                      </svg>
                                      <div>
                                        <div className="text-2xl font-medium font-geist">Explorer</div>
                                      </div>
                                    </button>
                                    <button
                                      onClick={() => {
                                        scrollToSection('faq');
                                        setIsResourcesDropdownOpen(false);
                                      }}
                                      className="flex items-center gap-3 w-full text-left text-white hover:text-primaryText px-3 py-2.5 rounded-lg transition-colors hover:bg-white/5"
                                    >
                                      <svg className="w-8 h-8 text-primaryText" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
                                      </svg>
                                      <div>
                                        <div className="text-2xl font-medium font-geist">Roadmap</div>
                                      </div>
                                    </button>
                                  </div>
                                  <div className="space-y-2">
                                    <a
                                      href="https://docs.onzks.com"
                                      target="_blank"
                                      rel="noopener noreferrer"
                                      className="flex items-center gap-3 w-full text-left text-white hover:text-primaryText px-3 py-2.5 rounded-lg transition-colors hover:bg-white/5"
                                    >
                                      <svg className="w-8 h-8 text-primaryText" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 20l4-16m4 4l4 4-4 4M6 16l-4-4 4-4" />
                                      </svg>
                                      <div>
                                        <div className="text-2xl font-medium font-geist">Builders</div>
                                      </div>
                                    </a>
                                    <a
                                      href="https://docs.onzks.com"
                                      target="_blank"
                                      rel="noopener noreferrer"
                                      className="flex items-center gap-3 w-full text-left text-white hover:text-primaryText px-3 py-2.5 rounded-lg transition-colors hover:bg-white/5"
                                    >
                                      <svg className="w-8 h-8 text-primaryText" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
                                      </svg>
                                      <div>
                                        <div className="text-2xl font-medium font-geist">Whitepaper</div>
                                      </div>
                                    </a>
                                  </div>
                                </div>
                              </div>
                            </div>
                          </motion.div>
                        )}
                      </AnimatePresence>
                    </div>
                  </motion.nav>

                  <a
                    href="https://app.anylayer.org"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="hidden md:flex text-[#CCD1E9] rounded-full font-medium items-center justify-center gap-2 lg:gap-3 transition-all duration-300 whitespace-nowrap flex-shrink-0 hover:opacity-80"
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
                <AnimatePresence>
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
                          onClick={() => scrollToSection('architecture')}
                          className="text-gray-300 hover:text-white transition-colors py-2 px-4 hover:bg-white/5 rounded-lg text-left"
                        >
                          Architecture
                        </button>
                        <button
                          onClick={() => scrollToSection('opportunity')}
                          className="text-gray-300 hover:text-white transition-colors py-2 px-4 hover:bg-white/5 rounded-lg text-left"
                        >
                          Opportunity
                        </button>
                        <button
                          onClick={() => scrollToSection('dimension')}
                          className="text-gray-300 hover:text-white transition-colors py-2 px-4 hover:bg-white/5 rounded-lg text-left"
                        >
                          Dimension
                        </button>
                        <button
                          onClick={() => scrollToSection('capital')}
                          className="text-gray-300 hover:text-white transition-colors py-2 px-4 hover:bg-white/5 rounded-lg text-left"
                        >
                          Capital
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
                          <AnimatePresence>
                            {isResourcesDropdownOpen && (
                              <motion.div
                                initial={{ opacity: 0, height: 0 }}
                                animate={{ opacity: 1, height: 'auto' }}
                                exit={{ opacity: 0, height: 0 }}
                                className="mt-2 pl-4 space-y-2 overflow-hidden"
                              >
                                <button
                                  onClick={() => {
                                    scrollToSection('trustscore');
                                    setIsResourcesDropdownOpen(false);
                                  }}
                                  className="block w-full text-left text-gray-300 hover:text-white transition-colors py-1 px-4 hover:bg-white/5 rounded-lg"
                                >
                                  Explorer
                                </button>
                                <button
                                  onClick={() => {
                                    scrollToSection('faq');
                                    setIsResourcesDropdownOpen(false);
                                  }}
                                  className="block w-full text-left text-gray-300 hover:text-white transition-colors py-1 px-4 hover:bg-white/5 rounded-lg"
                                >
                                  Roadmap
                                </button>
                                <a
                                  href="https://docs.onzks.com"
                                  target="_blank"
                                  rel="noopener noreferrer"
                                  className="block w-full text-left text-gray-300 hover:text-white transition-colors py-1 px-4 hover:bg-white/5 rounded-lg"
                                >
                                  Builders
                                </a>
                                <a
                                  href="https://docs.onzks.com"
                                  target="_blank"
                                  rel="noopener noreferrer"
                                  className="block w-full text-left text-gray-300 hover:text-white transition-colors py-1 px-4 hover:bg-white/5 rounded-lg"
                                >
                                  Whitepaper
                                </a>
                              </motion.div>
                            )}
                          </AnimatePresence>
                        </div>
                        <a
                          href="https://app.anylayer.org"
                          target="_blank"
                          rel="noopener noreferrer"
                          className="text-white rounded-full font-medium flex items-center justify-center gap-2 lg:gap-3 transition-all duration-300 whitespace-nowrap flex-shrink-0 py-2 hover:opacity-80"
                        >
                          <span className="text-sm lg:text-base">Launch App</span>
                          <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
                          </svg>
                        </a>
                      </nav>
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>
            </div>
          </motion.header>

          {/* Banner Section */}
          <div className="relative overflow-hidden max-w-screen-xl mx-auto">
            <div className="relative max-w-[773px] mx-auto px-5 pt-16 md:pt-20 pb-10 md:pb-24 z-10">
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
                    <h1 className="text-[1.5rem] md:text-[3.5rem] lg:text-[5rem] font-medium leading-none text-primaryText tracking-[-4%]">
                      Multi-layered Trust Engine for <span className='bg-gradient-to-r from-blueprimary to-lightblueprimary bg-clip-text text-transparent'> Humans</span> 
                    </h1>
                    <p className="text-primaryText/60 text-lg tracking-[-2%]">
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
            <Image src={'/left-banner-angle.svg'} alt='Left Angle' width={544} height={544} className="absolute left-52 top-0 w-32 h-32 md:w-48 md:h-48 lg:w-[544px] lg:h-[544px]"/>
            <Image src={'/right-banner-angle.svg'} alt='Right Angle' width={544} height={544} className="absolute right-64 top-0 w-32 h-32 md:w-48 md:h-48 lg:w-[544px] lg:h-[544px]"/>
            {/* Right side shield box */}
            <div className="bg-[#1C1C26]/90 rounded-xl p-4 border border-gray-700/20 max-w-[278px] w-full absolute right-0 top-10 opacity-15">
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

              <div className='h-[1.5px] bg-[#E3E3FE]/5 mt-8 mb-3'/>

              <div className="flex items-center justify-between">
                <div className="text-[#CCD1E9] text-xs font-geist">Progress to Silver</div>
                <div className="text-[#CCD1E9] text-xs font-geist">6%</div>
              </div>
              <div className='w-full h-1 bg-[#A683FF] mt-2'/>
            </div>
            {/* Left side trust score box */}
            <div className="bg-[#1C1C26]/90 rounded-xl p-4 border border-gray-700/20 max-w-[237px] w-full absolute left-0 bottom-0 opacity-15">
              <div className="flex items-start justify-between mb-4">
                <div className="flex items-center gap-2">
                  <div className="w-8 h-8 bg-[#CCD1E9]/5 rounded-full flex items-center justify-center">
                    <Image src={'/knight-shield.svg'} alt='Shield' width={16} height={16} />
                  </div>
                  <span className="text-[#C9D1D9] text-xs font-medium font-geist">Total Trust Score</span>
                </div>
              </div>

              <div className='h-[1.5px] bg-[#E3E3FE]/5 mt-8 mb-3'/>

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

        {/* Section 2 charts */}
        <section id="reputation" className="px-5 py-10 md:py-20 max-w-screen-xl mx-auto">
          <Image src="/bg-purple-effect.svg" alt="Background Gradient" width="1440" height="400" className="absolute top-0 left-0 w-full h-full"/>
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