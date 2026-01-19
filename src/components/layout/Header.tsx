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
import { ArrowUpRight, Fingerprint, Award, ShieldCheck, Cpu, Globe, Map, Code2, FileText, Scale, Radio } from "lucide-react";

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
            <div className="flex-shrink-0">
              <Image
                src="/anylayer-logo.svg"
                alt="Anylayer logo"
                width="140"
                height="56"
                className="w-auto h-8 md:h-10"
                priority
              />
            </div>

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
                  Features
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
                                <span className="text-[#636475]">Features.</span>
                              </h2>
                              <p className="text-[#9494a3] text-base font-normal leading-relaxed">
                                Explore the four dimensions of trust and identity that power the Anylayer ecosystem.
                              </p>
                            </div>

                            {/* Right: Structured Navigation */}
                            <div className="col-span-8 grid grid-cols-2 gap-x-16 gap-y-12">
                              {/* Column 1 */}
                              <div>
                                <div className="space-y-8">
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

                                  <button onClick={() => { scrollToSection('reputation'); setIsFeaturesDropdownOpen(false); }} className="group block text-left">
                                    <div className="flex items-start gap-4">
                                      <div className="w-10 h-10 rounded-xl bg-white/5 flex items-center justify-center group-hover:bg-lightblueprimary/10 transition-colors">
                                        <Award size={20} className="text-[#636475] group-hover:text-lightblueprimary transition-colors" />
                                      </div>
                                      <div>
                                        <h5 className="text-base font-medium text-white group-hover:text-lightblueprimary transition-colors">Reputation</h5>
                                        <p className="text-sm text-[#636475] mt-1 leading-snug">Portable on-chain credibility and trust metrics that grow with you.</p>
                                      </div>
                                    </div>
                                  </button>
                                </div>
                              </div>

                              {/* Column 2 */}
                              <div>
                                <div className="space-y-8">
                                  <button onClick={() => { scrollToSection('architecture'); setIsFeaturesDropdownOpen(false); }} className="group block text-left">
                                    <div className="flex items-start gap-4">
                                      <div className="w-10 h-10 rounded-xl bg-white/5 flex items-center justify-center group-hover:bg-lightblueprimary/10 transition-colors">
                                        <ShieldCheck size={20} className="text-[#636475] group-hover:text-lightblueprimary transition-colors" />
                                      </div>
                                      <div>
                                        <h5 className="text-base font-medium text-white group-hover:text-lightblueprimary transition-colors">Proof</h5>
                                        <p className="text-sm text-[#636475] mt-1 leading-snug">Zero-knowledge attestations to verify status without revealing data.</p>
                                      </div>
                                    </div>
                                  </button>

                                  <Link href="/attesters" onClick={() => setIsFeaturesDropdownOpen(false)} className="group block text-left">
                                    <div className="flex items-start gap-4">
                                      <div className="w-10 h-10 rounded-xl bg-white/5 flex items-center justify-center group-hover:bg-lightblueprimary/10 transition-colors">
                                        <Radio size={20} className="text-[#636475] group-hover:text-lightblueprimary transition-colors" />
                                      </div>
                                      <div>
                                        <h5 className="text-base font-medium text-white group-hover:text-lightblueprimary transition-colors">Attesters</h5>
                                        <p className="text-sm text-[#636475] mt-1 leading-snug">Verify outcomes and issue trust signals for the network.</p>
                                      </div>
                                    </div>
                                  </Link>

                                  <button onClick={() => { scrollToSection('dimension'); setIsFeaturesDropdownOpen(false); }} className="group block text-left">
                                    <div className="flex items-start gap-4">
                                      <div className="w-10 h-10 rounded-xl bg-white/5 flex items-center justify-center group-hover:bg-lightblueprimary/10 transition-colors">
                                        <Cpu size={20} className="text-[#636475] group-hover:text-lightblueprimary transition-colors" />
                                      </div>
                                      <div>
                                        <h5 className="text-base font-medium text-white group-hover:text-lightblueprimary transition-colors">Utility</h5>
                                        <p className="text-sm text-[#636475] mt-1 leading-snug">Practical applications and tools for cross-chain interoperability.</p>
                                      </div>
                                    </div>
                                  </button>
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
                Use Cases
              </Link>

              <Link
                href="/builder"
                className="transition-all text-[#9494a3] hover:text-white cursor-pointer text-[13px] font-bold tracking-tight whitespace-nowrap px-4 py-2 rounded-lg hover:bg-white/[0.03] active:scale-95"
              >
                Developers
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
                                  <button onClick={() => { scrollToSection('trustscore'); setIsResourcesDropdownOpen(false); }} className="group block text-left">
                                    <div className="flex items-start gap-4">
                                      <div className="w-10 h-10 rounded-xl bg-white/5 flex items-center justify-center group-hover:bg-lightblueprimary/10 transition-colors">
                                        <Globe size={20} className="text-[#636475] group-hover:text-lightblueprimary transition-colors" />
                                      </div>
                                      <div>
                                        <h5 className="text-base font-medium text-white group-hover:text-lightblueprimary transition-colors">Network Explorer</h5>
                                        <p className="text-sm text-[#636475] mt-1 leading-snug">Real-time tracking of on-chain trust signals and validation.</p>
                                      </div>
                                    </div>
                                  </button>

                                  <Link href="/roadmap" onClick={() => setIsResourcesDropdownOpen(false)} className="group block text-left">
                                    <div className="flex items-start gap-4">
                                      <div className="w-10 h-10 rounded-xl bg-white/5 flex items-center justify-center group-hover:bg-lightblueprimary/10 transition-colors">
                                        <Map size={20} className="text-[#636475] group-hover:text-lightblueprimary transition-colors" />
                                      </div>
                                      <div>
                                        <h5 className="text-base font-medium text-white group-hover:text-lightblueprimary transition-colors">Strategic Roadmap</h5>
                                        <p className="text-sm text-[#636475] mt-1 leading-snug">Strategic milestones and future development of the trust layer.</p>
                                      </div>
                                    </div>
                                  </Link>
                                </div>
                              </div>

                              {/* Column 2: Documentation */}
                              <div>
                                <h4 className="text-[10px] uppercase tracking-[0.2em] font-bold text-white/20 mb-6">Technical Resources</h4>
                                <div className="space-y-8">
                                  <Link href="/builder" onClick={() => setIsResourcesDropdownOpen(false)} className="group block text-left">
                                    <div className="flex items-start gap-4">
                                      <div className="w-10 h-10 rounded-xl bg-white/5 flex items-center justify-center group-hover:bg-lightblueprimary/10 transition-colors">
                                        <Code2 size={20} className="text-[#636475] group-hover:text-lightblueprimary transition-colors" />
                                      </div>
                                      <div>
                                        <h5 className="text-base font-medium text-white group-hover:text-lightblueprimary transition-colors">Developer Portal</h5>
                                        <p className="text-sm text-[#636475] mt-1 leading-snug">Integrate trust into your apps with our core APIs.</p>
                                      </div>
                                    </div>
                                  </Link>

                                  <a href="https://docs.onzks.com" target="_blank" rel="noopener noreferrer" className="group block text-left">
                                    <div className="flex items-start gap-4">
                                      <div className="w-10 h-10 rounded-xl bg-white/5 flex items-center justify-center group-hover:bg-lightblueprimary/10 transition-colors">
                                        <FileText size={20} className="text-[#636475] group-hover:text-lightblueprimary transition-colors" />
                                      </div>
                                      <div>
                                        <h5 className="text-base font-medium text-white group-hover:text-lightblueprimary transition-colors">Technical Whitepaper</h5>
                                        <p className="text-sm text-[#636475] mt-1 leading-snug">Deep dive into mathematical proofs and architecture.</p>
                                      </div>
                                    </div>
                                  </a>

                                  <button onClick={() => setIsResourcesDropdownOpen(false)} className="group block text-left">
                                    <div className="flex items-start gap-4">
                                      <div className="w-10 h-10 rounded-xl bg-white/5 flex items-center justify-center group-hover:bg-lightblueprimary/10 transition-colors shrink-0">
                                        <div className="w-5 h-5 border-2 border-white/20 rounded-md flex items-center justify-center group-hover:border-lightblueprimary/60 transition-colors">
                                          <div className="w-1 h-1 bg-white/40 group-hover:bg-lightblueprimary transition-colors rounded-full" />
                                        </div>
                                      </div>
                                      <div>
                                        <h5 className="text-base font-medium text-white group-hover:text-lightblueprimary transition-colors">Media Kit</h5>
                                        <p className="text-sm text-[#636475] mt-1 leading-snug">Brand assets, guidelines, and press materials.</p>
                                      </div>
                                    </div>
                                  </button>

                                  <Link href="/policy" onClick={() => setIsResourcesDropdownOpen(false)} className="group block text-left">
                                    <div className="flex items-start gap-4">
                                      <div className="w-10 h-10 rounded-xl bg-white/5 flex items-center justify-center group-hover:bg-lightblueprimary/10 transition-colors">
                                        <Scale size={20} className="text-[#636475] group-hover:text-lightblueprimary transition-colors" />
                                      </div>
                                      <div>
                                        <h5 className="text-base font-medium text-white group-hover:text-lightblueprimary transition-colors">Governance & Rules</h5>
                                        <p className="text-sm text-[#636475] mt-1 leading-snug">Official rules for .any identity, privacy, and terms.</p>
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
              <a
                href="https://anylayer.org"
                target="_blank"
                rel="noopener noreferrer"
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
              </a>

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
                      Features
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
                              { label: "Attesters", desc: "Issue trust signals", icon: <Radio size={20} />, href: "/attesters" },
                              { label: "Reputation", desc: "Trust metrics", icon: <Award size={20} />, id: "reputation" },
                              { label: "Proof", desc: "ZK-attestations", icon: <ShieldCheck size={20} />, id: "architecture" },
                              { label: "Utility", desc: "Interoperability tools", icon: <Cpu size={20} />, id: "dimension" }
                            ].map((item, idx) => {
                              const MobileContent = (
                                <div className="flex items-center gap-4 p-3 rounded-xl hover:bg-white/5 transition-colors">
                                  <div className="w-10 h-10 rounded-lg bg-white/5 flex items-center justify-center shrink-0 text-lightblueprimary">
                                    {item.icon}
                                  </div>
                                  <div className="flex flex-col">
                                    <span className="text-white font-medium">{item.label}</span>
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
                                  if (item.id) {
                                    scrollToSection(item.id);
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
                      Use Cases
                    </Link>

                    <Link
                      href="/builder"
                      onClick={() => setIsMobileMenuOpen(false)}
                      className="w-full text-left text-[#9494a3] hover:text-white transition-all py-4 px-4 hover:bg-white/5 rounded-xl text-lg font-bold border border-transparent hover:border-white/5 block"
                    >
                      Developers
                    </Link>

                    <Link
                      href="/blog"
                      onClick={() => setIsMobileMenuOpen(false)}
                      className="w-full text-left text-[#9494a3] hover:text-white transition-all py-4 px-4 hover:bg-white/5 rounded-xl text-lg font-bold border border-transparent hover:border-white/5 block"
                    >
                      Blog
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
                                { label: "Explorer", desc: "Track trust signals", icon: <Globe size={20} />, id: "trustscore" },
                                { label: "Roadmap", desc: "Future milestones", icon: <Map size={20} />, href: "/roadmap" },
                                { label: "Developers", desc: "Core SDKs", icon: <Code2 size={20} />, href: "/builder" },
                                { label: "Whitepaper", desc: "Technical deep dive", icon: <FileText size={20} />, href: "https://docs.anylayer.org" },
                                { label: "Media Kit", desc: "Brand assets", icon: <FileText size={20} />, id: "media-kit" },
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
                                    <div className="flex flex-col">
                                      <span className="text-white font-medium">{item.label}</span>
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
                                    if (item.id === "media-kit") {
                                      setIsMobileMenuOpen(false);
                                      return;
                                    }
                                    if (item.id) {
                                      scrollToSection(item.id);
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

                    <a
                      href="https://app.anylayer.org"
                      target="_blank"
                      rel="noopener noreferrer"
                      className="group relative mt-8 w-full active:translate-y-0.5 transition-all"
                    >
                      <div className="absolute inset-0 bg-white blur-xl opacity-10 group-hover:opacity-20 transition-opacity" />
                      <div className="relative w-full bg-white text-[#0D0D12] rounded-full font-bold flex items-center justify-center gap-3 py-4 shadow-[0_8px_30px_rgba(255,255,255,0.1)] transition-all">
                        Launch App
                        <ArrowUpRight size={20} strokeWidth={2.5} />
                      </div>
                    </a>
                  </div>
                </motion.div>
              </DropdownPortal>
            )}
          </AnimatePresence>
        </div>
      </motion.div >
    </motion.header >
  );
}
