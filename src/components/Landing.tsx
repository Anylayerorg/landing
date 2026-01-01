import React, { useState, useEffect, useRef } from 'react';
import { AnimatePresence, motion, useMotionValueEvent, useScroll, useTransform } from 'framer-motion';
import Image from 'next/image';
import ClientsLogo from './ClientsLogo';
import ParallelCards from './ParallelCards';
import TabsCard from './TabsCard';
import CodeIntegration from './CodeIntegration';
import Faqs from './Faqs';
import { Footer } from './layout/Footer';
import Architecture from './Architecture';
import { SplitGradientText } from './SplitGradientText';
import { SplitText } from './SplitText';


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
  const { scrollY } = useScroll();
  const [headerStyle, setHeaderStyle] = useState('transparent');
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [isResourcesDropdownOpen, setIsResourcesDropdownOpen] = useState(false);
  const [resourcesDropdownTimeout, setResourcesDropdownTimeout] = useState<NodeJS.Timeout | null>(null);
  const dropdownRef = useRef<HTMLDivElement>(null);
  const words = ['Humans', 'Wallets', 'AI Agents'];
  const [currentWordIndex, setCurrentWordIndex] = useState(0);
  const [currentText, setCurrentText] = useState('');
  const [isDeleting, setIsDeleting] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);

  const toggleMenu = () => {
    setIsMobileMenuOpen(!isMobileMenuOpen);
  };  

  // For add background on header scroll
  useMotionValueEvent(scrollY, 'change', (latest) => {
    setIsScrolled(latest > 20);
  });

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
        <section className="relative pt-20 lg:pt-24 pb-10 lg:pb-20 overflow-hidden bg-[url('/swatch.png')] bg-cover bg-top ">
          <motion.header
            animate={{
              backgroundColor: isScrolled ? 'rgba(26, 26, 36, 0.4)' : 'rgba(26, 26, 36, 0)',
              backdropFilter: isScrolled ? 'blur(24px)' : 'blur(0px)',
              borderBottomColor: isScrolled
                ? 'rgba(227, 227, 254, 0.1)'
                : 'rgba(227, 227, 254, 0)',
            }}
            transition={{ duration: 0.3, ease: 'easeOut' }}
            className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 bg-transparent `} 
          >
            <div className="headerMain relative border-b border-[#E3E3FE]/10">
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
                      onClick={() => scrollToSection('reputation')}
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
                            <div className="bg-[#1A1A24]/40 backdrop-blur-xl pt-[120px] pb-10 border border-gray-800/50 shadow-2xl overflow-hidden">
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
                                      className="flex items-center gap-6 w-full text-left text-white hover:text-primaryText px-3 py-2.5 rounded-lg transition-colors hover:bg-white/5"
                                    >
                                      <Image src="/internet.svg" alt="Trust Score Icon" width="32" height="32" className="w-8 h-8 text-primaryText" />
                                      <div>
                                        <div className="text-2xl font-medium font-geist">Explorer</div>
                                      </div>
                                    </button>
                                    <a
                                      href="https://docs.onzks.com"
                                      target="_blank"
                                      rel="noopener noreferrer"
                                      className="flex items-center gap-6 w-full text-left text-white hover:text-primaryText px-3 py-2.5 rounded-lg transition-colors hover:bg-white/5"
                                    >
                                      <Image src="/code-square.svg" alt="Builders Icon" width="32" height="32" className="w-8 h-8 text-primaryText" />
                                      <div>
                                        <div className="text-2xl font-medium font-geist">Builders</div>
                                      </div>
                                    </a>
                                    
                                  </div>
                                  <div className="space-y-2">
                                    <button
                                      onClick={() => {
                                        scrollToSection('faq');
                                        setIsResourcesDropdownOpen(false);
                                      }}
                                      className="flex items-center gap-6 w-full text-left text-white hover:text-primaryText px-3 py-2.5 rounded-lg transition-colors hover:bg-white/5"
                                    >
                                      <Image src="/maps.svg" alt="FAQ Icon" width="32" height="32" className="w-8 h-8 text-primaryText" />
                                      <div>
                                        <div className="text-2xl font-medium font-geist">Roadmap</div>
                                      </div>
                                    </button>
                                    <a
                                      href="https://docs.onzks.com"
                                      target="_blank"
                                      rel="noopener noreferrer"
                                      className="flex items-center gap-6 w-full text-left text-white hover:text-primaryText px-3 py-2.5 rounded-lg transition-colors hover:bg-white/5"
                                    >
                                      <Image src="/document-code.svg" alt="Builders Icon" width="32" height="32" className="w-8 h-8 text-primaryText" />
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
                    <h1 className="text-[1.5rem] md:text-[3.5rem] lg:text-[5rem] font-medium leading-none text-primaryText tracking-[-4px]">
                      Multi-layered Trust Engine for{' '}
                      <span className="bg-gradient-to-r from-blueprimary to-lightblueprimary bg-clip-text text-transparent inline-block leading-tight min-w-[357px] text-left">
                        {currentText}
                        <span className="animate-pulse">|</span>
                      </span>
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
            <motion.div
              initial={{ opacity: 0, rotate: 100 }}
              animate={{ opacity: 1, rotate: 0 }}
              transition={{ duration: 1, delay: 0.4, ease: "easeOut" }}
              className="absolute left-52 top-0"
            >
              <Image 
                src={'/left-banner-angle.svg'} 
                alt='Left Angle' 
                width={544} 
                height={544} 
                className="w-32 h-32 md:w-48 md:h-48 lg:w-[544px] lg:h-[544px]"
              />
            </motion.div>
            <motion.div
              initial={{ opacity: 0, rotate: 100 }}
              animate={{ opacity: 1, rotate: 0 }}
              transition={{ duration: 1, ease: "easeOut", delay: 0.4 }}
              className="absolute right-64 top-0"
            >
              <Image 
                src={'/right-banner-angle.svg'} 
                alt='Right Angle' 
                width={544} 
                height={544} 
                className="w-32 h-32 md:w-48 md:h-48 lg:w-[544px] lg:h-[544px]"
              />
            </motion.div>
            {/* <Image src={'/right-banner-angle.svg'} alt='Right Angle' width={544} height={544} className="absolute right-64 top-0 w-32 h-32 md:w-48 md:h-48 lg:w-[544px] lg:h-[544px]"/> */}
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

        <Image src="/header-purple-shade.svg" alt="Header Background Gradient" width="906" height="306" className="absolute top-0 left-0"/>
        <Image src="/left-purple-shade.svg" alt="Background Gradient" width="622" height="1966" className="absolute top-96 left-0"/>
        <Image src="/left-purple-shade.svg" alt="Background Gradient" width="622" height="1966" className="absolute bottom-96 left-0"/>
        <Image src="/right-shade.svg" alt="Background Gradient" width="722" height="1966" className="absolute bottom-32 right-0"/>

        {/* Section 2 charts */}
        <section id="reputation" className="px-5 py-10 md:py-20 max-w-screen-xl mx-auto">
          <div className="flex flex-wrap justify-between items-center gap-2">
            <motion.div
              initial={{ opacity: 0, y: 50 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ amount: 0.2 }}
              transition={{ duration: 0.6, delay: 0.2 }}
              className="max-w-[39rem] mx-auto flex flex-wrap justify-center items-center"
            >
              <div className="mb-3 inline-flex items-center justify-center gap-3 rounded-full bg-white/5 px-6 py-3">
                <span className="text-sm text-white/50">Trust Engine</span>
              </div>
              <h2 className="text-[1.5rem] md:text-[1.875rem] lg:text-[3.25rem] font-medium text-primaryText mb-6 leading-[110%] tracking-[-2px] text-center">
                {" "}
                Understand and verify <span className='bg-gradient-to-r from-blueprimary to-lightblueprimary bg-clip-text text-transparent'> trust </span> across every <span className='bg-gradient-to-r from-blueprimary to-lightblueprimary bg-clip-text text-transparent'> Signal</span>
              </h2>
              <p className="text-primaryText/60 text-base text-center px-10 ">
                Explore reputation growth, verify real users, and see what drives trust with clean visual insights and instant scoring.
              </p>
            </motion.div>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-5 gap-5 items-stretch mt-20">
            {/* Wallet ID */}
            <motion.div
              initial={{ opacity: 0, y: 50 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ amount: 0.2 }}
              transition={{ duration: 0.6, delay: 0.2 }}
              className='md:col-span-2'
            >
              <div className="px-6 pb-7 pt-10 rounded-[20px] bg-[#121119] h-full">
                <Image
                  src="/updated-trust-cards.svg"
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
              viewport={{ amount: 0.2 }}
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
              viewport={{ amount: 0.2 }}
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
              viewport={{ amount: 0.2 }}
              transition={{ duration: 0.6, delay: 0.4 }}
              className="md:col-span-2"
            >
              <div className="px-6 pb-7 pt-10 rounded-[20px] bg-[#121119] h-full">
                <Image
                  src="/chain-card-updated.svg"
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
              viewport={{ amount: 0.5 }}
              transition={{ duration: 0.6, delay: 0.2 }}
              className="max-w-[47rem] mx-auto flex flex-wrap justify-center items-center"
            >
              <div className="mb-3 inline-flex items-center justify-center gap-3 rounded-full bg-white/5 px-6 py-3">
                <span className="text-sm text-white/50">Architecture</span>
              </div>
              <h2 className="text-[1.5rem] md:text-[1.875rem] lg:text-[3.25rem] font-medium text-primaryText mb-6 leading-[110%] tracking-[-2px] text-center">
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
                  className="relative z-10 mt-24"
                  initial={{ opacity: 0, scale: 0.5 }}
                  whileInView={{ opacity: 1, scale: 1 }}
                  transition={{ duration: 0.6, ease: 'easeOut' }}
                >
                  {/* Layer Image here */}
                  <Image src={'/emblum-logo.svg'} alt="Layered Icon" width="174" height="146" className="" />
                </motion.div>

                {/* Vertical Line */}
                <div className="absolute top-60 left-1/2 transform -translate-x-1/2 w-0.5 h-[calc(100%-485px)] bg-gradient-to-b from-[#DCCFFF] to-[#A683FF] z-20"></div>

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
                        <div className="w-10 h-10 flex items-center justify-center flex-shrink-0">
                          <Image src={'/identity-bgicon.svg'} alt="Identity Icon" width="40" height="40" />
                        </div>
                        <div>
                          <h3 className="text-white font-medium text-lg">Identity Layer</h3>
                          <p className="text-white/70 text-sm">2k5 name service</p>
                        </div>
                      </div>
                    </div>
                    
                    <div className="relative z-20">
                      <Image src={'/identity-layer.svg'} alt="" width="122" height="96" className="" />
                    </div>

                    <div className="flex max-w-72 ">
                      <p className="text-white/70 text-sm leading-relaxed">
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
                        <div className="w-10 h-10 flex items-center justify-center flex-shrink-0">
                          <Image src={'/reputation-bgicon.svg'} alt="Identity Icon" width="40" height="40" />
                        </div>
                        <div>
                          <h3 className="text-white font-medium text-lg">Reputation Layer</h3>
                          <p className="text-white/70 text-sm">on-chain trustworthiness</p>
                        </div>
                      </div>
                    </div>
                    
                    <div className="relative z-20">
                      <Image src={'/reputation-layer.svg'} alt="" width="122" height="96" className="" />
                    </div>

                    <div className="flex max-w-72">
                      <p className="text-white/70 text-sm leading-relaxed">
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
                        <div className="w-10 h-10 flex items-center justify-center flex-shrink-0">
                          <Image src={'/proof-bgicon.svg'} alt="Identity Icon" width="40" height="40" />
                        </div>
                        <div>
                          <h3 className="text-white font-medium text-lg">Proof layer</h3>
                          <p className="text-white/70 text-sm">Proof of Trust with Privacy</p>
                        </div>
                      </div>
                    </div>
                    
                    <div className="relative z-20">
                      <Image src={'/proof-layer.svg'} alt="" width="122" height="96" className="" />
                    </div>

                    <div className="flex max-w-72">
                      <p className="text-white/70 text-sm leading-relaxed">
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
                        <div className="w-10 h-10 flex items-center justify-center flex-shrink-0">
                          <Image src={'/utility-bgicon.svg'} alt="Identity Icon" width="40" height="40" />
                        </div>
                        <div>
                          <h3 className="text-white font-medium text-lg">Utility Layer</h3>
                          <p className="text-white/70 text-sm">Reputation based applications</p>
                        </div>
                      </div>
                    </div>
                    
                    <div className="relative z-20">
                      <Image src={'/utility-layer.svg'} alt="" width="122" height="96" className="" />
                    </div>

                    <div className="flex max-w-72">
                      <p className="text-white/70 text-sm leading-relaxed">
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
        <section id="trustScore" className="py-10 md:pt-10 md:pb-20 px-5 max-w-screen-xl mx-auto z-10 relative">
          <div className="grid lg:grid-cols-2 gap-12 lg:gap-20 items-start">
            {/* Left Content */}
            <div              
              className="max-w-[47rem] mx-auto flex flex-wrap justify-start items-center"
            >
              <motion.div initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ amount: 0.5 }}
              transition={{ duration: 0.2 }} className="mb-3 inline-flex items-center justify-center gap-3 rounded-full bg-white/5 px-6 py-3">
                <span className="text-sm text-white/50">Trust Engine</span>
              </motion.div>
              <SplitGradientText
                className="text-[1.5rem] md:text-[1.875rem] lg:text-[3.25rem] font-medium text-primaryText mb-6 leading-[100%]"
                chunks={[
                  { type: "text", value: "Trustscore that" },
                  { type: "gradient", value: "unlocks" },
                  { type: "text", value: "Anything" },
                ]}
              />
              <p className="text-primaryText/60 text-base">
                <SplitText text="Anylayer computes a dynamic Trust Index (0–9000) using identity, on-chain behavior, proofs, achievements, and agent reliability — all privately verified." />
              </p>
              {/* <h2 className="text-[1.5rem] md:text-[1.875rem] lg:text-[3.25rem] font-medium text-primaryText mb-6 leading-[100%]">
                {" "}
                Trustscore that <span className='bg-gradient-to-r from-blueprimary to-lightblueprimary bg-clip-text text-transparent'> unlocks </span> Anything
              </h2> */}
              {/* <p className="text-primaryText/60 text-base">
                Anylayer computes a dynamic Trust Index (0–9000) using identity, on-chain behavior, proofs, achievements, and agent reliability — all privately verified.
              </p> */}
            </div>

            {/* Right Content - Trust Score Card */}
            <motion.div
              initial={{ opacity: 0, y: 50 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ amount: 0.6 }}
              transition={{ duration: 0.6, delay: 0.2 }}
              className="relative pb-10"
            >
              <div className="relative bg-[#1C1C26] opacity-60 rounded-2xl p-4 border border-gray-800/50 max-w-[365px]">
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
              <div className="bg-[#1C1C26] opacity-80 rounded-xl p-6 border border-gray-700/20 max-w-[343px] w-full absolute right-0 bottom-0">
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
                      whileInView={{ scale: 1, opacity: 1 }}
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
                initial={{ opacity: 0, y: 25 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ amount: 0.6 }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                className="flex items-center gap-4"
              >
                <div className="w-5 h-5 text-primaryText">
                  <Image src={feature.icon} alt='Shield' width={20} height={20} className='w-full h-full'/>
                </div>
                <div className='flex-1'>
                  <p className="text-[#9095A4] text-sm leading-relaxed">
                    {feature.description}
                  </p>
                </div>
              </motion.div>
            ))}
          </div>
        </section>

        <Architecture />

        <ParallelCards sectionId="dimension" />

        <TabsCard />

        <CodeIntegration />

        <Faqs />

        <Footer />
      </div>
    </>
  );
}