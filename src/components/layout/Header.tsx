import Link from "next/link";
import {
  AnimatePresence,
  motion,
  useMotionValueEvent,
  useScroll,
} from "framer-motion";
import Image from "next/image";
import { useState, useRef, useEffect } from "react";
import { DropdownPortal } from "./DropdownPortal";
import { ArrowUpRight, Fingerprint, Award, ShieldCheck, Cpu, Globe, Map, Code2, FileText, Scale, Radio, X, Mail, Bot } from "lucide-react";
import { ComingSoonModal } from "../ComingSoonModal";

export function Header() {
  const { scrollY } = useScroll();
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [isResourcesDropdownOpen, setIsResourcesDropdownOpen] = useState(false);
  const [isFeaturesDropdownOpen, setIsFeaturesDropdownOpen] = useState(false);
  const [resourcesDropdownTimeout, setResourcesDropdownTimeout] =
    useState<NodeJS.Timeout | null>(null);
  const dropdownRef = useRef<HTMLDivElement>(null);
  const featuresRef = useRef<HTMLDivElement>(null);
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileResourcesOpen, setIsMobileResourcesOpen] = useState(false);
  const [isMobileFeaturesOpen, setIsMobileFeaturesOpen] = useState(false);
  const [isComingSoonOpen, setIsComingSoonOpen] = useState(false);


  const toggleMenu = () => {
    setIsMobileMenuOpen(!isMobileMenuOpen);
  };

  // Keep track of scroll for minor adjustments if needed, 
  // but the visual pill style will now be default.
  useMotionValueEvent(scrollY, "change", (latest) => {
    setIsScrolled(latest > 20);
  });

  const scrollToSection = (sectionId: string) => {
    const element = document.getElementById(sectionId);
    if (element) {
      const headerOffset = 100;
      const elementPosition = element.getBoundingClientRect().top;
      const offsetPosition =
        elementPosition + window.pageYOffset - headerOffset;

      window.scrollTo({
        top: offsetPosition,
        behavior: "smooth",
      });
      setIsMobileMenuOpen(false);
    }
  };

  // Close dropdown when clicking outside
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (
        dropdownRef.current &&
        !dropdownRef.current.contains(event.target as Node)
      ) {
        setIsResourcesDropdownOpen(false);
      }
      if (
        featuresRef.current &&
        !featuresRef.current.contains(event.target as Node)
      ) {
        setIsFeaturesDropdownOpen(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  // Cleanup timeout on unmount
  useEffect(() => {
    return () => {
      if (resourcesDropdownTimeout) {
        clearTimeout(resourcesDropdownTimeout);
      }
    };
  }, [resourcesDropdownTimeout]);

  // Handle body scroll lock on mobile
  useEffect(() => {
    if (isMobileMenuOpen) {
      const scrollY = window.scrollY;
      document.body.style.position = 'fixed';
      document.body.style.top = `-${scrollY}px`;
      document.body.style.width = '100%';
      document.body.style.overflowY = 'hidden';
    } else {
      const scrollY = document.body.style.top;
      document.body.style.position = '';
      document.body.style.top = '';
      document.body.style.width = '';
      document.body.style.overflowY = '';
      if (scrollY) {
        window.scrollTo(0, parseInt(scrollY || '0') * -1);
      }
    }
    return () => {
      document.body.style.position = '';
      document.body.style.top = '';
      document.body.style.width = '';
      document.body.style.overflowY = '';
    };
  }, [isMobileMenuOpen]);

  return (
    <motion.header
      initial={false}
      animate={{
        y: 12, // Always slightly offset from top
      }}
      transition={{ duration: 0.25, ease: [0.16, 1, 0.3, 1] }}
      className="fixed top-0 left-0 right-0 z-[999] flex justify-center px-4"
    >
      <motion.div
        initial={{
          backgroundColor: "#0D0D12",
          backdropFilter: "none",
          borderColor: "rgba(255, 255, 255, 0.08)",
          borderBottomWidth: "1px",
          width: "auto",
          paddingLeft: "1.5rem",
          paddingRight: "1.5rem",
          borderRadius: "16px",
          boxShadow: "0 10px 30px -10px rgba(0, 0, 0, 0.5), inset 0 0 0 1px rgba(255, 255, 255, 0.05)",
        }}
        animate={{
          backgroundColor: "#0D0D12",
          backdropFilter: "none",
          borderColor: "rgba(255, 255, 255, 0.08)",
          borderBottomWidth: "1px",
          width: "auto",
          paddingLeft: "1.5rem",
          paddingRight: "1.5rem",
          borderRadius: "16px",
          boxShadow: "0 10px 30px -10px rgba(0, 0, 0, 0.5), inset 0 0 0 1px rgba(255, 255, 255, 0.05)",
        }}
        transition={{ duration: 0.3, ease: [0.16, 1, 0.3, 1] }}
        className="relative max-w-screen-xl mx-auto w-full border-solid"
      >
        <div className="px-1 py-1">
          <div className="flex items-center justify-between h-14 md:h-16 gap-8">
            {/* Logo */}
            <Link href="/" className="flex-shrink-0 flex items-center gap-2.5 group transition-opacity hover:opacity-80">
              <Image
                src="/favicon-logo.svg"
                alt="Anylayer"
                width={24}
                height={24}
                className="w-auto h-6"
                priority
              />
              <span className="text-white font-black text-xl tracking-tighter uppercase">ANYLAYER.</span>
            </Link>

            {/* Desktop Navigation */}
            <motion.nav
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.3 }}
              className="hidden md:flex items-center gap-x-1 lg:gap-x-2"
            >
              <Link
                href="/"
                className="transition-all text-[#9494a3] hover:text-white cursor-pointer text-[13px] font-bold tracking-tight whitespace-nowrap px-4 py-2 rounded-lg hover:bg-white/[0.03] active:scale-95"
              >
                Home
              </Link>


              {/* Features Dropdown */}
              <div className="relative" ref={featuresRef}>
                <button
                  onClick={() => {
                    setIsFeaturesDropdownOpen(!isFeaturesDropdownOpen);
                    setIsResourcesDropdownOpen(false);
                  }}
                  className="transition-all text-[#9494a3] hover:text-white cursor-pointer text-[13px] font-bold tracking-tight whitespace-nowrap px-4 py-2 rounded-lg hover:bg-white/[0.03] flex items-center gap-1.5 active:scale-95"
                >
                  Products
                  <svg
                    className={`w-3.5 h-3.5 transition-transform duration-300 ${isFeaturesDropdownOpen ? "rotate-180" : ""
                      }`}
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M19 9l-7 7-7-7"
                    />
                  </svg>
                </button>

                <AnimatePresence>
                  {isFeaturesDropdownOpen && (
                    <DropdownPortal>
                      <motion.div
                        initial={{ opacity: 0, scale: 0.98, y: -10 }}
                        animate={{ opacity: 1, scale: 1, y: 0 }}
                        exit={{ opacity: 0, scale: 0.98, y: -10 }}
                        transition={{ duration: 0.2, ease: [0.16, 1, 0.3, 1] }}
                        className="fixed inset-x-0 top-0 z-50 hidden md:block"
                      >
                        <motion.div
                          onClick={() => setIsFeaturesDropdownOpen(false)}
                          className="absolute inset-0 z-[-1] bg-[#0D0D12]/40 backdrop-blur-[20px]"
                        />
                        <div className="pt-[120px] pb-16 border-b border-white/5 shadow-[0_40px_80px_rgba(0,0,0,0.8)] bg-[#0D0D12]">
                          <div className="px-8 max-w-screen-xl mx-auto grid grid-cols-12 gap-16 items-start">
                            {/* Left: Section Brand Info */}
                            <div className="col-span-4 border-r border-white/5 pr-16 h-full">
                              <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-lightblueprimary/10 border border-lightblueprimary/20 mb-8">
                                <div className="w-1.5 h-1.5 rounded-full bg-lightblueprimary animate-pulse" />
                                <span className="text-[10px] font-mono uppercase tracking-widest text-lightblueprimary">Technology</span>
                              </div>
                              <h2 className="font-geist font-medium text-4xl text-white leading-tight tracking-tight mb-6">
                                Core <br />
                                <span className="text-[#636475]">Products.</span>
                              </h2>
                              <p className="text-[#9494a3] text-base font-normal leading-relaxed">
                                Explore the four dimensions of trust and identity that power the Anylayer ecosystem.
                              </p>
                            </div>

                            {/* Right: Structured Navigation */}
                            <div className="col-span-8">
                              <div className="grid grid-cols-2 gap-x-12 gap-y-8">
                                <Link href="/identity" onClick={() => setIsFeaturesDropdownOpen(false)} className="group block text-left">
                                  <div className="flex items-start gap-4">
                                    <div className="w-10 h-10 rounded-xl bg-white/5 flex items-center justify-center group-hover:bg-lightblueprimary/10 transition-colors">
                                      <Fingerprint size={20} className="text-[#636475] group-hover:text-lightblueprimary transition-colors" />
                                    </div>
                                    <div>
                                      <h5 className="text-base font-medium text-white group-hover:text-lightblueprimary transition-colors">Identity</h5>
                                      <p className="text-sm text-[#636475] mt-1 leading-snug">Private, human-readable on-chain identity for the digital self.</p>
                                    </div>
                                  </div>
                                </Link>

                                <a href="https://ai.anylayer.org" target="_blank" rel="noopener noreferrer" className="group block text-left">
                                  <div className="flex items-start gap-4">
                                    <div className="w-10 h-10 rounded-xl bg-white/5 flex items-center justify-center group-hover:bg-lightblueprimary/10 transition-colors">
                                      <Bot size={20} className="text-[#636475] group-hover:text-lightblueprimary transition-colors" />
                                    </div>
                                    <div className="flex-1">
                                      <div className="flex items-center gap-2">
                                        <h5 className="text-base font-medium text-white group-hover:text-lightblueprimary transition-colors">Axis (AI agents)</h5>
                                        <ArrowUpRight size={14} className="text-white/20 group-hover:text-lightblueprimary transition-all group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
                                      </div>
                                      <p className="text-sm text-[#636475] mt-1 leading-snug">The trust layer for autonomous agents and decentralized intelligence.</p>
                                    </div>
                                  </div>
                                </a>

                                <div className="group block text-left opacity-50 cursor-not-allowed">
                                  <div className="flex items-start gap-4">
                                    <div className="w-10 h-10 rounded-xl bg-white/5 flex items-center justify-center">
                                      <Map size={20} className="text-[#636475]" />
                                    </div>
                                    <div className="flex-1">
                                      <div className="flex items-center gap-2">
                                        <h5 className="text-base font-medium text-white">Network Explorer</h5>
                                        <span className="text-[8px] font-mono px-1.5 py-0.5 rounded-full bg-white/5 text-white/40 border border-white/10 uppercase tracking-tighter">Soon</span>
                                      </div>
                                      <p className="text-sm text-[#636475] mt-1 leading-snug">Real-time tracking of on-chain trust signals and validation.</p>
                                    </div>
                                  </div>
                                </div>

                                <div className="group block text-left opacity-50 cursor-not-allowed">
                                  <div className="flex items-start gap-4">
                                    <div className="w-10 h-10 rounded-xl bg-white/5 flex items-center justify-center">
                                      <Globe size={20} className="text-[#636475]" />
                                    </div>
                                    <div className="flex-1">
                                      <div className="flex items-center gap-2">
                                        <h5 className="text-base font-medium text-white">Ecosystem</h5>
                                        <span className="text-[8px] font-mono px-1.5 py-0.5 rounded-full bg-white/5 text-white/40 border border-white/10 uppercase tracking-tighter">Soon</span>
                                      </div>
                                      <p className="text-sm text-[#636475] mt-1 leading-snug">A growing network of dApps and services powered by Anylayer.</p>
                                    </div>
                                  </div>
                                </div>
                              </div>
                            </div>
                          </div>
                        </div>
                      </motion.div>
                    </DropdownPortal>
                  )}
                </AnimatePresence>
              </div>

              <Link
                href="/use-case"
                className="transition-all text-[#9494a3] hover:text-white cursor-pointer text-[13px] font-bold tracking-tight whitespace-nowrap px-4 py-2 rounded-lg hover:bg-white/[0.03] active:scale-95"
              >
                Utility
              </Link>



              <Link
                href="/blog"
                className="transition-all text-[#9494a3] hover:text-white cursor-pointer text-[13px] font-bold tracking-tight whitespace-nowrap px-4 py-2 rounded-lg hover:bg-white/[0.03] active:scale-95"
              >
                Blog
              </Link>

              {/* Resources Dropdown */}
              <div className="relative" ref={dropdownRef}>
                <button
                  onClick={() => {
                    setIsResourcesDropdownOpen(!isResourcesDropdownOpen);
                    setIsFeaturesDropdownOpen(false);
                  }}
                  className="transition-all text-[#9494a3] hover:text-white cursor-pointer text-[13px] font-bold tracking-tight whitespace-nowrap px-4 py-2 rounded-lg hover:bg-white/[0.03] flex items-center gap-1.5 active:scale-95"
                >
                  Resources
                  <svg
                    className={`w-3.5 h-3.5 transition-transform duration-300 ${isResourcesDropdownOpen ? "rotate-180" : ""
                      }`}
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M19 9l-7 7-7-7"
                    />
                  </svg>
                </button>

                <AnimatePresence>
                  {isResourcesDropdownOpen && (
                    <DropdownPortal>
                      <motion.div
                        initial={{ opacity: 0, scale: 0.98, y: -10 }}
                        animate={{ opacity: 1, scale: 1, y: 0 }}
                        exit={{ opacity: 0, scale: 0.98, y: -10 }}
                        transition={{ duration: 0.2, ease: [0.16, 1, 0.3, 1] }}
                        className="fixed inset-x-0 top-0 z-50 hidden md:block"
                      >
                        <motion.div
                          onClick={() => setIsResourcesDropdownOpen(false)}
                          className="absolute inset-0 z-[-1] bg-[#0D0D12]/40 backdrop-blur-[20px]"
                        />
                        <div className="pt-[120px] pb-16 border-b border-white/5 shadow-[0_40px_80px_rgba(0,0,0,0.8)] bg-[#0D0D12]">
                          <div className="px-8 max-w-screen-xl mx-auto grid grid-cols-12 gap-16 items-start">
                            {/* Left: Section Brand Info */}
                            <div className="col-span-4 border-r border-white/5 pr-16 h-full">
                              <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-lightblueprimary/10 border border-lightblueprimary/20 mb-8">
                                <div className="w-1.5 h-1.5 rounded-full bg-lightblueprimary animate-pulse" />
                                <span className="text-[10px] font-mono uppercase tracking-widest text-lightblueprimary">Knowledge Hub</span>
                              </div>
                              <h2 className="font-geist font-medium text-4xl text-white leading-tight tracking-tight mb-6">
                                The Trust <br />
                                <span className="text-[#636475]">Infrastructure.</span>
                              </h2>
                              <p className="text-[#9494a3] text-base font-normal leading-relaxed">
                                Access technical specifications, network metrics, and developer resources to build on the next generation of trust.
                              </p>
                            </div>

                            {/* Right: Structured Navigation */}
                            <div className="col-span-8 grid grid-cols-2 gap-x-16 gap-y-12">
                              {/* Column 1: Ecosystem */}
                              <div>
                                <h4 className="text-[10px] uppercase tracking-[0.2em] font-bold text-white/20 mb-6">Ecosystem Status</h4>
                                <div className="space-y-8">

                                  <Link href="/events" onClick={() => setIsResourcesDropdownOpen(false)} className="group block text-left">
                                    <div className="flex items-start gap-4">
                                      <div className="w-10 h-10 rounded-xl bg-white/5 flex items-center justify-center group-hover:bg-lightblueprimary/10 transition-colors shrink-0">
                                        <Radio size={20} className="text-[#636475] group-hover:text-lightblueprimary transition-colors" />
                                      </div>
                                      <div>
                                        <h5 className="text-base font-medium text-white group-hover:text-lightblueprimary transition-colors">Protocol Events</h5>
                                        <p className="text-sm text-[#636475] mt-1 leading-snug">Global summits, hackathons, and protocol sessions.</p>
                                      </div>
                                    </div>
                                  </Link>

                                  <Link href="/contact" onClick={() => setIsResourcesDropdownOpen(false)} className="group block text-left">
                                    <div className="flex items-start gap-4">
                                      <div className="w-10 h-10 rounded-xl bg-white/5 flex items-center justify-center group-hover:bg-lightblueprimary/10 transition-colors shrink-0">
                                        <Mail size={20} className="text-[#636475] group-hover:text-lightblueprimary transition-colors" />
                                      </div>
                                      <div>
                                        <h5 className="text-base font-medium text-white group-hover:text-lightblueprimary transition-colors">Contact Us</h5>
                                        <p className="text-sm text-[#636475] mt-1 leading-snug">Get in touch for partnerships, support, or inquiries.</p>
                                      </div>
                                    </div>
                                  </Link>
                                </div>
                              </div>

                              {/* Column 2: Documentation */}
                              <div>
                                <h4 className="text-[10px] uppercase tracking-[0.2em] font-bold text-white/20 mb-6">Technical Resources</h4>
                                <div className="space-y-8">
                                  <Link href="/docs" onClick={() => setIsResourcesDropdownOpen(false)} className="group block text-left">
                                    <div className="flex items-start gap-4">
                                      <div className="w-10 h-10 rounded-xl bg-white/5 flex items-center justify-center group-hover:bg-lightblueprimary/10 transition-colors">
                                        <FileText size={20} className="text-[#636475] group-hover:text-lightblueprimary transition-colors" />
                                      </div>
                                      <div>
                                        <h5 className="text-base font-medium text-white group-hover:text-lightblueprimary transition-colors">Documentation</h5>
                                        <p className="text-sm text-[#636475] mt-1 leading-snug">Deep dive into mathematical proofs and architecture.</p>
                                      </div>
                                    </div>
                                  </Link>


                                  <div className="group block text-left opacity-50 cursor-not-allowed">
                                    <div className="flex items-start gap-4">
                                      <div className="w-10 h-10 rounded-xl bg-white/5 flex items-center justify-center">
                                        <FileText size={20} className="text-[#636475]" />
                                      </div>
                                      <div>
                                        <div className="flex items-center gap-2">
                                          <h5 className="text-base font-medium text-white">Technical Whitepaper</h5>
                                          <span className="text-[8px] font-mono px-1.5 py-0.5 rounded-full bg-white/5 text-white/40 border border-white/10 uppercase tracking-tighter">Soon</span>
                                        </div>
                                        <p className="text-sm text-[#636475] mt-1 leading-snug">Deep dive into mathematical proofs and architecture.</p>
                                      </div>
                                    </div>
                                  </div>

                                  <Link href="/policy" onClick={() => setIsResourcesDropdownOpen(false)} className="group block text-left">
                                    <div className="flex items-start gap-4">
                                      <div className="w-10 h-10 rounded-xl bg-white/5 flex items-center justify-center group-hover:bg-lightblueprimary/10 transition-colors">
                                        <Scale size={20} className="text-[#636475] group-hover:text-lightblueprimary transition-colors" />
                                      </div>
                                      <div>
                                        <h5 className="text-base font-medium text-white group-hover:text-lightblueprimary transition-colors">Governance & Rules</h5>
                                        <p className="text-sm text-[#636475] mt-1 leading-snug">Official rules for identity, privacy, and terms.</p>
                                      </div>
                                    </div>
                                  </Link>
                                </div>
                              </div>
                            </div>
                          </div>
                        </div>
                      </motion.div>
                    </DropdownPortal>
                  )}
                </AnimatePresence>
              </div>
            </motion.nav>

            <div className="flex items-center gap-4">
              <button
                onClick={() => setIsComingSoonOpen(true)}
                className="group relative hidden md:flex active:translate-y-0.5 transition-all"
              >
                <div className="absolute inset-0 bg-white blur-xl opacity-10 group-hover:opacity-20 transition-opacity" />
                <div className="relative bg-white text-[#0D0D12] px-6 py-2.5 rounded-full font-bold text-sm flex items-center justify-center gap-2 shadow-[0_8px_30px_rgba(255,255,255,0.1)] hover:scale-[1.02] transition-all">
                  Launch App
                  <motion.div
                    animate={{ x: [0, 2, 0], y: [0, -2, 0] }}
                    transition={{ repeat: Infinity, duration: 1.5, ease: "easeInOut" }}
                  >
                    <ArrowUpRight size={16} strokeWidth={3} />
                  </motion.div>
                </div>
              </button>

              {/* Mobile Menu Button */}
              <button
                onClick={toggleMenu}
                className="md:hidden text-white p-2 hover:bg-white/10 rounded-lg transition-colors border border-white/5 bg-white/[0.03]"
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
          </div>

          {/* Mobile Menu */}
          <AnimatePresence>
            {isMobileMenuOpen && (
              <DropdownPortal>
                <motion.div
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  exit={{ opacity: 0 }}
                  className="md:hidden fixed inset-0 z-50 pt-20 flex flex-col"
                >
                  <motion.div
                    onClick={toggleMenu}
                    className="absolute inset-0 z-[-1] bg-[#0D0D12]/90 backdrop-blur-xl"
                  />
                  <div className="px-6 space-y-2 flex-1 overflow-y-auto pb-12">
                    <Link
                      href="/"
                      onClick={() => setIsMobileMenuOpen(false)}
                      className="w-full text-left text-[#9494a3] hover:text-white transition-all py-4 px-4 hover:bg-white/5 rounded-xl text-lg font-bold border border-transparent hover:border-white/5 block"
                    >
                      Home
                    </Link>

                    <button
                      onClick={() => setIsMobileFeaturesOpen(prev => !prev)}
                      className="w-full text-left text-[#9494a3] hover:text-white transition-all py-4 px-4 hover:bg-white/5 rounded-xl text-lg font-bold flex items-center justify-between"
                    >
                      Products
                      <svg
                        className={`w-5 h-5 transition-transform duration-300 ${isMobileFeaturesOpen ? "rotate-180" : ""}`}
                        fill="none" stroke="currentColor" viewBox="0 0 24 24"
                      >
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                      </svg>
                    </button>

                    <AnimatePresence>
                      {isMobileFeaturesOpen && (
                        <motion.div
                          initial={{ opacity: 0, height: 0 }}
                          animate={{ opacity: 1, height: "auto" }}
                          exit={{ opacity: 0, height: 0 }}
                          className="overflow-hidden bg-white/[0.03] rounded-2xl mt-2 mx-2 border border-white/5"
                        >
                          <div className="p-4 space-y-4">
                            {[
                              { label: "Identity", desc: "Private on-chain ID", icon: <Fingerprint size={20} />, href: "/identity" },
                              { label: "Axis (AI agents)", desc: "Trust for agents", icon: <Bot size={20} />, href: "https://ai.anylayer.org", isExternal: true },
                              { label: "Explorer", desc: "Track trust signals", icon: <Map size={20} />, isComingSoon: true },
                              { label: "Ecosystem", desc: "Partner network", icon: <Globe size={20} />, isComingSoon: true },
                            ].map((item, idx) => {
                              const MobileContent = (
                                <div className={`flex items-center gap-4 p-3 rounded-xl transition-colors ${item.isComingSoon ? "opacity-50" : "hover:bg-white/5"}`}>
                                  <div className="w-10 h-10 rounded-lg bg-white/5 flex items-center justify-center shrink-0 text-lightblueprimary">
                                    {item.icon}
                                  </div>
                                  <div className="flex-1 flex flex-col">
                                    <div className="flex items-center justify-between">
                                      <span className="text-white font-medium">{item.label}</span>
                                      {item.isComingSoon ? (
                                        <span className="text-[8px] font-mono px-1.5 py-0.5 rounded-full bg-white/5 text-white/40 border border-white/10 uppercase tracking-tighter">Soon</span>
                                      ) : item.isExternal && (
                                        <ArrowUpRight size={14} className="text-white/20" />
                                      )}
                                    </div>
                                    <span className="text-[#636475] text-xs">{item.desc}</span>
                                  </div>
                                </div>
                              );

                              if (item.href) {
                                return (
                                  <Link key={idx} href={item.href} onClick={() => setIsMobileMenuOpen(false)} className="block w-full">
                                    {MobileContent}
                                  </Link>
                                );
                              }

                              return (
                                <button key={idx} className="block w-full text-left" onClick={() => {
                                  const anyItem = item as any;
                                  if (anyItem.id) {
                                    scrollToSection(anyItem.id);
                                    setIsMobileMenuOpen(false);
                                  }
                                }}>
                                  {MobileContent}
                                </button>
                              );
                            })}
                          </div>
                        </motion.div>
                      )}
                    </AnimatePresence>

                    <Link
                      href="/use-case"
                      onClick={() => setIsMobileMenuOpen(false)}
                      className="w-full text-left text-[#9494a3] hover:text-white transition-all py-4 px-4 hover:bg-white/5 rounded-xl text-lg font-bold border border-transparent hover:border-white/5 block"
                    >
                      Utility
                    </Link>



                    <Link
                      href="/blog"
                      onClick={() => setIsMobileMenuOpen(false)}
                      className="w-full text-left text-[#9494a3] hover:text-white transition-all py-4 px-4 hover:bg-white/5 rounded-xl text-lg font-bold border border-transparent hover:border-white/5 block"
                    >
                      Blog
                    </Link>

                    <Link
                      href="/builder"
                      onClick={() => setIsMobileMenuOpen(false)}
                      className="w-full text-left text-[#9494a3] hover:text-white transition-all py-4 px-4 hover:bg-white/5 rounded-xl text-lg font-bold border border-transparent hover:border-white/5 block"
                    >
                      Builders
                    </Link>

                    <div className="pt-4 mt-4 border-t border-white/5">
                      <button
                        onClick={() => setIsMobileResourcesOpen(prev => !prev)}
                        className="w-full text-left text-[#9494a3] hover:text-white transition-all py-4 px-4 hover:bg-white/5 rounded-xl text-lg font-bold flex items-center justify-between"
                      >
                        Resources
                        <svg
                          className={`w-5 h-5 transition-transform duration-300 ${isMobileResourcesOpen ? "rotate-180" : ""}`}
                          fill="none" stroke="currentColor" viewBox="0 0 24 24"
                        >
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                        </svg>
                      </button>

                      <AnimatePresence>
                        {isMobileResourcesOpen && (
                          <motion.div
                            initial={{ opacity: 0, height: 0 }}
                            animate={{ opacity: 1, height: "auto" }}
                            exit={{ opacity: 0, height: 0 }}
                            className="overflow-hidden bg-white/[0.03] rounded-2xl mt-4 mx-2 border border-white/5"
                          >
                            <div className="p-4 space-y-4">
                              {[
                                { label: "Documentation", desc: "Technical guides", icon: <FileText size={20} />, href: "/docs" },
                                { label: "Protocol Events", desc: "Summits & Sessions", icon: <Radio size={20} />, href: "/events" },
                                { label: "Contact Us", desc: "Get in touch", icon: <Mail size={20} />, href: "/contact" },
                                { label: "Whitepaper", desc: "Technical deep dive", icon: <FileText size={20} />, isComingSoon: true },
                                { label: "Official Policies", desc: ".any ownership rules", icon: <Scale size={20} />, href: "/policy" }
                              ].map((item, idx) => {
                                const MobileContent = (
                                  <div className="flex items-center gap-4 p-3 rounded-xl hover:bg-white/5 transition-colors">
                                    <div className="w-10 h-10 rounded-lg bg-white/5 flex items-center justify-center shrink-0 text-white/40 group-hover:text-lightblueprimary">
                                      {item.label === "Media Kit" ? (
                                        <div className="w-5 h-5 border-2 border-white/20 rounded-md flex items-center justify-center">
                                          <div className="w-1 h-1 bg-white/40 rounded-full" />
                                        </div>
                                      ) : (
                                        item.icon
                                      )}
                                    </div>
                                    <div className="flex-1 flex flex-col">
                                      <div className="flex items-center justify-between">
                                        <span className="text-white font-medium">{item.label}</span>
                                        {(item as any).isComingSoon && (
                                          <span className="text-[8px] font-mono px-1.5 py-0.5 rounded-full bg-white/5 text-white/40 border border-white/10 uppercase tracking-tighter">Soon</span>
                                        )}
                                      </div>
                                      <span className="text-[#636475] text-xs">{item.desc}</span>
                                    </div>
                                  </div>
                                );

                                if (item.href) {
                                  const isExternal = item.href.startsWith('http');
                                  if (isExternal) {
                                    return (
                                      <a key={idx} href={item.href} target="_blank" rel="noopener noreferrer" className="block w-full">
                                        {MobileContent}
                                      </a>
                                    );
                                  }
                                  return (
                                    <Link key={idx} href={item.href} onClick={() => setIsMobileMenuOpen(false)} className="block w-full">
                                      {MobileContent}
                                    </Link>
                                  );
                                }

                                return (
                                  <button key={idx} className="block w-full text-left" onClick={() => {
                                    const anyItem = item as any;
                                    if (anyItem.id) {
                                      scrollToSection(anyItem.id);
                                      setIsMobileMenuOpen(false);
                                    }
                                  }}>
                                    {MobileContent}
                                  </button>
                                );
                              })}
                            </div>
                          </motion.div>
                        )}
                      </AnimatePresence>
                    </div>

                    <button
                      onClick={() => {
                        setIsComingSoonOpen(true);
                        setIsMobileMenuOpen(false);
                      }}
                      className="group relative mt-8 w-full active:translate-y-0.5 transition-all"
                    >
                      <div className="absolute inset-0 bg-white blur-xl opacity-10 group-hover:opacity-20 transition-opacity" />
                      <div className="relative w-full bg-white text-[#0D0D12] rounded-full font-bold flex items-center justify-center gap-3 py-4 shadow-[0_8px_30px_rgba(255,255,255,0.1)] transition-all">
                        Launch App
                        <ArrowUpRight size={20} strokeWidth={2.5} />
                      </div>
                    </button>
                  </div>
                </motion.div>
              </DropdownPortal>
            )}
          </AnimatePresence>
        </div>
      </motion.div >

      <ComingSoonModal isOpen={isComingSoonOpen} onClose={() => setIsComingSoonOpen(false)} />
    </motion.header >
  );
}
