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
import { ArrowUpRight } from "lucide-react";

export function Header() {
  const { scrollY } = useScroll();
  const [headerStyle, setHeaderStyle] = useState("transparent");
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [isResourcesDropdownOpen, setIsResourcesDropdownOpen] = useState(false);
  const [resourcesDropdownTimeout, setResourcesDropdownTimeout] =
    useState<NodeJS.Timeout | null>(null);
  const dropdownRef = useRef<HTMLDivElement>(null);
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileResourcesOpen, setIsMobileResourcesOpen] = useState(false);


  const toggleMenu = () => {
    setIsMobileMenuOpen(!isMobileMenuOpen);
  };

  // For add background on header scroll
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
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  useEffect(() => {
    const unsubscribe = scrollY.onChange((latest) => {
      if (latest > 900) {
        setHeaderStyle("solid");
      } else {
        setHeaderStyle("transparent");
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

  return (
    <motion.header
      initial={false}
      animate={{
        y: isScrolled ? 12 : 0,
      }}
      transition={{ duration: 0.25, ease: [0.16, 1, 0.3, 1] }}
      className="fixed top-0 left-0 right-0 z-[999] flex justify-center px-4"
    >
      <motion.div
        initial={{
          backgroundColor: "rgba(13, 13, 18, 0)",
          backdropFilter: "blur(0px)",
          borderColor: "rgba(255, 255, 255, 0)",
          borderBottomWidth: "0px",
          width: "100%",
          paddingLeft: "0",
          paddingRight: "0",
          borderRadius: "0px",
        }}
        animate={{
          backgroundColor: isScrolled
            ? "rgba(13, 13, 18, 0.7)"
            : "rgba(13, 13, 18, 0)",
          backdropFilter: isScrolled ? "blur(12px) saturate(180%)" : "blur(0px)",
          borderColor: isScrolled
            ? "rgba(255, 255, 255, 0.08)"
            : "rgba(255, 255, 255, 0)",
          borderBottomWidth: isScrolled ? "1px" : "0px",
          width: isScrolled ? "auto" : "100%",
          paddingLeft: isScrolled ? "1.5rem" : "0",
          paddingRight: isScrolled ? "1.5rem" : "0",
          borderRadius: isScrolled ? "16px" : "0px",
          boxShadow: isScrolled
            ? "0 10px 30px -10px rgba(0, 0, 0, 0.5), inset 0 0 0 1px rgba(255, 255, 255, 0.05)"
            : "none",
        }}
        transition={{ duration: 0.3, ease: [0.16, 1, 0.3, 1] }}
        className="relative max-w-screen-xl mx-auto w-full border-solid"
      >
        <div className="px-1 py-1">
          <div className="flex items-center justify-between h-14 md:h-16 gap-8">
            {/* Logo */}
            <div className="flex-shrink-0">
              <Image
                src="/logo-anylayer.svg"
                alt="Anylayer logo"
                width="140"
                height="56"
                className="w-auto h-8 md:h-10"
              />
            </div>

            {/* Desktop Navigation */}
            <motion.nav
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.3 }}
              className="hidden md:flex items-center gap-x-1 lg:gap-x-2"
            >
              {[
                { label: "Trust", id: "reputation" },
                { label: "Architecture", id: "architecture" },
                { label: "Opportunity", id: "opportunity" },
                { label: "Dimension", id: "dimension" },
                { label: "Capital", id: "capital" },
              ].map((item) => (
                <button
                  key={item.id}
                  onClick={() => scrollToSection(item.id)}
                  className="transition-all text-[#9494a3] hover:text-white cursor-pointer text-[13px] font-medium tracking-tight whitespace-nowrap px-4 py-2 rounded-lg hover:bg-white/[0.03] active:scale-95"
                >
                  {item.label}
                </button>
              ))}

              {/* Resources Dropdown */}
              <div className="relative" ref={dropdownRef}>
                <button
                  onClick={() =>
                    setIsResourcesDropdownOpen(!isResourcesDropdownOpen)
                  }
                  className="transition-all text-[#9494a3] hover:text-white cursor-pointer text-[13px] font-medium tracking-tight whitespace-nowrap px-4 py-2 rounded-lg hover:bg-white/[0.03] flex items-center gap-1.5 active:scale-95"
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
                                        <Image src="/internet.svg" alt="" width={20} height={20} className="opacity-40 group-hover:opacity-100 transition-opacity" />
                                      </div>
                                      <div>
                                        <h5 className="text-base font-medium text-white group-hover:text-lightblueprimary transition-colors">Network Explorer</h5>
                                        <p className="text-sm text-[#636475] mt-1 leading-snug">Real-time tracking of on-chain trust signals and validation.</p>
                                      </div>
                                    </div>
                                  </button>

                                  <button onClick={() => { scrollToSection('faq'); setIsResourcesDropdownOpen(false); }} className="group block text-left">
                                    <div className="flex items-start gap-4">
                                      <div className="w-10 h-10 rounded-xl bg-white/5 flex items-center justify-center group-hover:bg-lightblueprimary/10 transition-colors">
                                        <Image src="/maps.svg" alt="" width={20} height={20} className="opacity-40 group-hover:opacity-100 transition-opacity" />
                                      </div>
                                      <div>
                                        <h5 className="text-base font-medium text-white group-hover:text-lightblueprimary transition-colors">Strategic Roadmap</h5>
                                        <p className="text-sm text-[#636475] mt-1 leading-snug">Strategic milestones and future development of the trust layer.</p>
                                      </div>
                                    </div>
                                  </button>
                                </div>
                              </div>

                              {/* Column 2: Documentation */}
                              <div>
                                <h4 className="text-[10px] uppercase tracking-[0.2em] font-bold text-white/20 mb-6">Technical Resources</h4>
                                <div className="space-y-8">
                                  <a href="https://docs.onzks.com" target="_blank" rel="noopener noreferrer" className="group block text-left">
                                    <div className="flex items-start gap-4">
                                      <div className="w-10 h-10 rounded-xl bg-white/5 flex items-center justify-center group-hover:bg-lightblueprimary/10 transition-colors">
                                        <Image src="/code-square.svg" alt="" width={20} height={20} className="opacity-40 group-hover:opacity-100 transition-opacity" />
                                      </div>
                                      <div>
                                        <h5 className="text-base font-medium text-white group-hover:text-lightblueprimary transition-colors">Developer Portal</h5>
                                        <p className="text-sm text-[#636475] mt-1 leading-snug">Integrate ZK-trust into your apps with our core SDKs.</p>
                                      </div>
                                    </div>
                                  </a>

                                  <a href="https://docs.onzks.com" target="_blank" rel="noopener noreferrer" className="group block text-left">
                                    <div className="flex items-start gap-4">
                                      <div className="w-10 h-10 rounded-xl bg-white/5 flex items-center justify-center group-hover:bg-lightblueprimary/10 transition-colors">
                                        <Image src="/document-code.svg" alt="" width={20} height={20} className="opacity-40 group-hover:opacity-100 transition-opacity" />
                                      </div>
                                      <div>
                                        <h5 className="text-base font-medium text-white group-hover:text-lightblueprimary transition-colors">Technical Whitepaper</h5>
                                        <p className="text-sm text-[#636475] mt-1 leading-snug">Deep dive into mathematical proofs and architecture.</p>
                                      </div>
                                    </div>
                                  </a>
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
                className="hidden md:flex bg-white text-[#0D0D12] px-5 py-2.5 rounded-lg font-bold text-sm items-center justify-center gap-2 transition-all duration-300 hover:scale-[1.02] active:scale-95 shadow-[0_0_20px_rgba(255,255,255,0.15)] group"
              >
                Launch App
                <motion.div
                  animate={{ x: [0, 2, 0], y: [0, -2, 0] }}
                  transition={{ repeat: Infinity, duration: 1.5, ease: "easeInOut" }}
                >
                  <ArrowUpRight size={16} strokeWidth={3} />
                </motion.div>
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
                  className="md:hidden fixed inset-0 z-50 pt-20"
                >
                  <motion.div
                    onClick={toggleMenu}
                    className="absolute inset-0 z-[-1] bg-[#0D0D12]/90 backdrop-blur-xl"
                  />
                  <div className="px-6 space-y-2">
                    {[
                      { label: "Trust", id: "trust" },
                      { label: "Architecture", id: "architecture" },
                      { label: "Opportunity", id: "opportunity" },
                      { label: "Dimension", id: "dimension" },
                      { label: "Capital", id: "capital" },
                    ].map((item) => (
                      <button
                        key={item.id}
                        onClick={() => scrollToSection(item.id)}
                        className="w-full text-left text-[#9494a3] hover:text-white transition-all py-4 px-4 hover:bg-white/5 rounded-xl text-lg font-medium border border-transparent hover:border-white/5"
                      >
                        {item.label}
                      </button>
                    ))}

                    <div className="pt-4 mt-4 border-t border-white/5">
                      <button
                        onClick={() => setIsMobileResourcesOpen(prev => !prev)}
                        className="w-full text-left text-[#9494a3] hover:text-white transition-all py-4 px-4 hover:bg-white/5 rounded-xl text-lg font-medium flex items-center justify-between"
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
                                { label: "Explorer", desc: "Track trust signals", icon: "/internet.svg", id: "trustscore" },
                                { label: "Roadmap", desc: "Future milestones", icon: "/maps.svg", id: "faq" },
                                { label: "Builders", desc: "Core SDKs", icon: "/code-square.svg", href: "https://docs.onzks.com" },
                                { label: "Whitepaper", desc: "Technical deep dive", icon: "/document-code.svg", href: "https://docs.onzks.com" }
                              ].map((item, idx) => {
                                const MobileContent = (
                                  <div className="flex items-center gap-4 p-3 rounded-xl hover:bg-white/5 transition-colors">
                                    <div className="w-10 h-10 rounded-lg bg-white/5 flex items-center justify-center shrink-0">
                                      <Image src={item.icon} alt={item.label} width="20" height="20" />
                                    </div>
                                    <div className="flex flex-col">
                                      <span className="text-white font-medium">{item.label}</span>
                                      <span className="text-[#636475] text-xs">{item.desc}</span>
                                    </div>
                                  </div>
                                );

                                if (item.href) {
                                  return (
                                    <a key={idx} href={item.href} target="_blank" rel="noopener noreferrer" className="block w-full">
                                      {MobileContent}
                                    </a>
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
                    </div>

                    <a
                      href="https://app.anylayer.org"
                      target="_blank"
                      rel="noopener noreferrer"
                      className="mt-8 w-full bg-white text-[#0D0D12] rounded-xl font-bold flex items-center justify-center gap-3 py-4 transition-all active:scale-[0.98] shadow-lg"
                    >
                      Launch App
                      <ArrowUpRight size={20} strokeWidth={2.5} />
                    </a>
                  </div>
                </motion.div>
              </DropdownPortal>
            )}
          </AnimatePresence>
        </div>
      </motion.div>
    </motion.header>
  );
}
