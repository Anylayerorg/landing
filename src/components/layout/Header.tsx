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
                        <div className="pt-[120px] pb-16 border-b border-white/5 shadow-[0_20px_40px_rgba(0,0,0,0.4)] bg-gradient-to-b from-[#0D0D12]/80 to-[#0D0D12]/40 backdrop-blur-3xl">
                          <div className="px-8 max-w-screen-xl mx-auto grid grid-cols-12 gap-12 items-start">
                            {/* Left Lead Info */}
                            <div className="col-span-5 pt-4">
                              <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-lightblueprimary/10 border border-lightblueprimary/20 mb-6">
                                <div className="w-1.5 h-1.5 rounded-full bg-lightblueprimary animate-pulse" />
                                <span className="text-[10px] font-mono uppercase tracking-widest text-lightblueprimary">Knowledge Hub</span>
                              </div>
                              <h2 className="font-geist font-medium text-5xl text-white leading-tight tracking-tight">
                                Industrial grade <br />
                                <span className="text-[#636475]">infrastructure.</span>
                              </h2>
                              <p className="mt-8 text-[#9494a3] text-lg font-normal leading-relaxed max-w-md">
                                Everything you need to stay informed, build efficiently, and scale with Anylayer.
                              </p>
                              <div className="mt-10 flex items-center gap-6">
                                <div className="flex flex-col">
                                  <span className="text-white text-2xl font-mono font-bold tracking-tighter">99.9%</span>
                                  <span className="text-[#636475] text-xs uppercase tracking-widest mt-1">Uptime</span>
                                </div>
                                <div className="w-[1px] h-10 bg-white/5" />
                                <div className="flex flex-col">
                                  <span className="text-white text-2xl font-mono font-bold tracking-tighter">1.2ms</span>
                                  <span className="text-[#636475] text-xs uppercase tracking-widest mt-1">Latency</span>
                                </div>
                              </div>
                            </div>

                            {/* Right Grid Menu */}
                            <div className="col-span-7 grid grid-cols-2 gap-4">
                              {[
                                {
                                  label: "Explorer",
                                  desc: "Track on-chain trust signals and network health in real-time.",
                                  icon: "/internet.svg",
                                  id: "trustscore",
                                  color: "from-blue-500/10 to-transparent"
                                },
                                {
                                  label: "Roadmap",
                                  desc: "Strategic milestones and the future of layered trust.",
                                  icon: "/maps.svg",
                                  id: "faq",
                                  color: "from-purple-500/10 to-transparent"
                                },
                                {
                                  label: "Builders",
                                  desc: "Integrate ZK-trust into your apps with our core SDKs.",
                                  icon: "/code-square.svg",
                                  href: "https://docs.onzks.com",
                                  color: "from-emerald-500/10 to-transparent"
                                },
                                {
                                  label: "Whitepaper",
                                  desc: "Deep dive into our mathematical proofs and architecture.",
                                  icon: "/document-code.svg",
                                  href: "https://docs.onzks.com",
                                  color: "from-orange-500/10 to-transparent"
                                }
                              ].map((item, idx) => {
                                const Content = (
                                  <div className="group relative p-5 rounded-2xl border border-white/5 bg-white/[0.02] hover:bg-white/[0.05] hover:border-white/10 transition-all duration-300">
                                    <div className={`absolute inset-0 bg-gradient-to-br ${item.color} opacity-0 group-hover:opacity-100 transition-opacity rounded-2xl`} />
                                    <div className="relative z-10">
                                      <div className="w-12 h-12 rounded-xl bg-white/5 flex items-center justify-center mb-4 transition-transform group-hover:scale-110 duration-300">
                                        <Image src={item.icon} alt={item.label} width="24" height="24" />
                                      </div>
                                      <h3 className="text-xl font-semibold text-white group-hover:text-lightblueprimary transition-colors mb-1">
                                        {item.label}
                                      </h3>
                                      <p className="text-sm text-[#636475] leading-relaxed">
                                        {item.desc}
                                      </p>
                                    </div>
                                  </div>
                                );

                                if (item.href) {
                                  return (
                                    <a key={idx} href={item.href} target="_blank" rel="noopener noreferrer">
                                      {Content}
                                    </a>
                                  );
                                }

                                return (
                                  <button key={idx} onClick={() => {
                                    scrollToSection(item.id);
                                    setIsResourcesDropdownOpen(false);
                                  }}>
                                    {Content}
                                  </button>
                                );
                              })}
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
                <motion.span
                  animate={{ x: [0, 4, 0] }}
                  transition={{ repeat: Infinity, duration: 1.5, ease: "easeInOut" }}
                >
                  <Image
                    src="/filled-arrow.svg"
                    alt="arrow"
                    width="14"
                    height="14"
                    className="brightness-0"
                  />
                </motion.span>
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
                                    scrollToSection(item.id);
                                    setIsMobileMenuOpen(false);
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
                      <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
                      </svg>
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
