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
      animate={{
        backgroundColor: isScrolled
          ? "rgba(26, 26, 36, 0.4)"
          : "rgba(26, 26, 36, 0)",
        backdropFilter: isScrolled ? "blur(24px)" : "blur(0px)",
        borderBottomColor: isScrolled
          ? "rgba(227, 227, 254, 0.1)"
          : "rgba(227, 227, 254, 0)",
      }}
      transition={{ duration: 0.3, ease: "easeOut" }}
      className={`fixed top-0 left-0 right-0 z-[999] transition-all duration-300 bg-transparent `}
    >
      <div className="headerMain relative border-b border-[#E3E3FE]/10">
        <div className="max-w-screen-xl mx-auto px-5 py-2">
          <div className="flex items-center justify-between h-16">
            {/* Logo */}
            <Image
              src="/logo-anylayer.svg"
              alt="Anylayer logo"
              width="160"
              height="64"
              className="w-auto h-auto"
            />

            {/* Desktop Navigation */}
            <motion.nav
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.3 }}
              className="hidden md:flex items-center gap-x-4 lg:gap-x-8 "
            >
              <button
                onClick={() => scrollToSection("reputation")}
                className="transition-colors text-[#636475] hover:text-white cursor-pointer text-sm whitespace-nowrap px-3 py-2 rounded-full hover:bg-white/5"
              >
                Trust
              </button>
              <button
                onClick={() => scrollToSection("architecture")}
                className="transition-colors text-[#636475] hover:text-white cursor-pointer text-sm whitespace-nowrap px-3 py-2 rounded-full hover:bg-white/5"
              >
                Architecture
              </button>
              <button
                onClick={() => scrollToSection("opportunity")}
                className="transition-colors text-[#636475] hover:text-white cursor-pointer text-sm whitespace-nowrap px-3 py-2 rounded-full hover:bg-white/5"
              >
                Opportunity
              </button>
              <button
                onClick={() => scrollToSection("dimension")}
                className="transition-colors text-[#636475] hover:text-white cursor-pointer text-sm whitespace-nowrap px-3 py-2 rounded-full hover:bg-white/5"
              >
                Dimension
              </button>
              <button
                onClick={() => scrollToSection("capital")}
                className="transition-colors text-[#636475] hover:text-white cursor-pointer text-sm whitespace-nowrap px-3 py-2 rounded-full hover:bg-white/5"
              >
                Capital
              </button>

              {/* Resources Dropdown */}
              <div className="" ref={dropdownRef}>
                <button
                  onClick={() =>
                    setIsResourcesDropdownOpen(!isResourcesDropdownOpen)
                  }
                  className="transition-colors text-[#636475] hover:text-white cursor-pointer text-sm whitespace-nowrap px-3 py-2 rounded-full hover:bg-white/5 flex items-center gap-1"
                >
                  Resources
                  <svg
                    className={`w-4 h-4 transition-transform ${
                      isResourcesDropdownOpen ? "rotate-180" : ""
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
                        initial={{ opacity: 0, y: -10 }}
                        animate={{ opacity: 1, y: 0 }}
                        exit={{ opacity: 0, y: -10 }}
                        transition={{ duration: 0.2 }}
                        className="fixed inset-x-0 top-0 z-50 hidden md:block"
                      >
                        <motion.div
                          initial={{ opacity: 0 }}
                          animate={{ opacity: 1 }}
                          exit={{ opacity: 0 }}
                          transition={{ duration: 0.25 }}
                          onClick={() => setIsResourcesDropdownOpen(false)}
                          className="absolute inset-0 z-[-1] bg-[#1A1A24]/40 backdrop-blur-[24px]"
                        />
                        <div className="pt-[120px] pb-10 border-b border-white/10">
                          <div className="p-6 max-w-screen-xl mx-auto flex items-center justify-between">
                            {/* Left Column */}
                            <div className="max-w-[508px]">
                              <p className="font-geist font-medium text-[32px] text-white leading-tight">
                                Everything you need to stay informed and build
                                with Anylayer.
                              </p>
                            </div>
                            {/* Right Column */}
                            <div className="flex gap-20">
                              <div className="space-y-2">
                                <button
                                  onClick={() => {
                                    scrollToSection("trustscore");
                                    setIsResourcesDropdownOpen(false);
                                  }}
                                  className="flex items-center gap-6 w-full text-left text-white hover:text-primaryText px-3 py-2.5 rounded-lg transition-colors hover:bg-white/5"
                                >
                                  <Image
                                    src="/internet.svg"
                                    alt="Trust Score Icon"
                                    width="32"
                                    height="32"
                                    className="w-8 h-8 text-primaryText"
                                  />
                                  <div>
                                    <div className="text-2xl font-medium font-geist">
                                      Explorer
                                    </div>
                                  </div>
                                </button>
                                <a
                                  href="https://docs.onzks.com"
                                  target="_blank"
                                  rel="noopener noreferrer"
                                  className="flex items-center gap-6 w-full text-left text-white hover:text-primaryText px-3 py-2.5 rounded-lg transition-colors hover:bg-white/5"
                                >
                                  <Image
                                    src="/code-square.svg"
                                    alt="Builders Icon"
                                    width="32"
                                    height="32"
                                    className="w-8 h-8 text-primaryText"
                                  />
                                  <div>
                                    <div className="text-2xl font-medium font-geist">
                                      Builders
                                    </div>
                                  </div>
                                </a>
                              </div>
                              <div className="space-y-2">
                                <button
                                  onClick={() => {
                                    scrollToSection("faq");
                                    setIsResourcesDropdownOpen(false);
                                  }}
                                  className="flex items-center gap-6 w-full text-left text-white hover:text-primaryText px-3 py-2.5 rounded-lg transition-colors hover:bg-white/5"
                                >
                                  <Image
                                    src="/maps.svg"
                                    alt="FAQ Icon"
                                    width="32"
                                    height="32"
                                    className="w-8 h-8 text-primaryText"
                                  />
                                  <div>
                                    <div className="text-2xl font-medium font-geist">
                                      Roadmap
                                    </div>
                                  </div>
                                </button>
                                <a
                                  href="https://docs.onzks.com"
                                  target="_blank"
                                  rel="noopener noreferrer"
                                  className="flex items-center gap-6 w-full text-left text-white hover:text-primaryText px-3 py-2.5 rounded-lg transition-colors hover:bg-white/5"
                                >
                                  <Image
                                    src="/document-code.svg"
                                    alt="Builders Icon"
                                    width="32"
                                    height="32"
                                    className="w-8 h-8 text-primaryText"
                                  />
                                  <div>
                                    <div className="text-2xl font-medium font-geist">
                                      Whitepaper
                                    </div>
                                  </div>
                                </a>
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

            <a
              href="https://app.anylayer.org"
              target="_blank"
              rel="noopener noreferrer"
              className="hidden md:flex text-[#CCD1E9] rounded-full font-medium items-center justify-center gap-2 lg:gap-3 transition-all duration-300 whitespace-nowrap flex-shrink-0 hover:opacity-80"
            >
              <span className="text-sm lg:text-base">Launch App</span>
              <Image
                src="/filled-arrow.svg"
                alt="launch app"
                width="20"
                height="18"
                className="w-3 h-3 lg:w-[18px] lg:h-[18px]"
              />
            </a>

            {/* Mobile Menu Button */}
            <button
              onClick={toggleMenu}
              className="md:hidden text-white p-2 hover:bg-white/10 rounded-lg transition-colors"
              aria-label="Toggle menu"
            >
              {isMobileMenuOpen ? (
                <svg
                  className="w-6 h-6"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M6 18L18 6M6 6l12 12"
                  />
                </svg>
              ) : (
                <svg
                  className="w-6 h-6"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M4 6h16M4 12h16M4 18h16"
                  />
                </svg>
              )}
            </button>
          </div>

          {/* Mobile Menu */}
          <AnimatePresence>
            {isMobileMenuOpen && (
              <DropdownPortal>
              <motion.div
                initial={{ opacity: 0, height: 0 }}
                animate={{ opacity: 1, height: "auto" }}
                exit={{ opacity: 0, height: 0 }}
                transition={{ duration: 0.3 }}
                className="md:hidden overflow-hidden fixed inset-x-0 top-0 z-50"
              >
                <motion.div
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  exit={{ opacity: 0 }}
                  transition={{ duration: 0.25 }}
                  onClick={() => setIsResourcesDropdownOpen(false)}
                  className="absolute inset-0 z-[-1] bg-[#1A1A24]/40 backdrop-blur-[24px]"
                />
                <nav className="flex flex-col gap-2 pt-20 pb-6 border-t border-gray-800 mt-4">
                  <button
                    onClick={() => scrollToSection("trust")}
                    className="text-gray-300 hover:text-white transition-colors py-1 px-4 hover:bg-white/5 rounded-lg text-left"
                  >
                    Trust
                  </button>
                  <button
                    onClick={() => scrollToSection("architecture")}
                    className="text-gray-300 hover:text-white transition-colors py-1 px-4 hover:bg-white/5 rounded-lg text-left"
                  >
                    Architecture
                  </button>
                  <button
                    onClick={() => scrollToSection("opportunity")}
                    className="text-gray-300 hover:text-white transition-colors py-1 px-4 hover:bg-white/5 rounded-lg text-left"
                  >
                    Opportunity
                  </button>
                  <button
                    onClick={() => scrollToSection("dimension")}
                    className="text-gray-300 hover:text-white transition-colors py-1 px-4 hover:bg-white/5 rounded-lg text-left"
                  >
                    Dimension
                  </button>
                  <button
                    onClick={() => scrollToSection("capital")}
                    className="text-gray-300 hover:text-white transition-colors py-1 px-4 hover:bg-white/5 rounded-lg text-left"
                  >
                    Capital
                  </button>
                  <div className="border-t border-gray-800 pt-4">
                    <button
                      onClick={() => setIsMobileResourcesOpen(prev => !prev)}
                      className="text-gray-300 hover:text-white transition-colors py-2 px-4 hover:bg-white/5 rounded-lg text-left w-full flex items-center justify-between"
                    >
                      Resources
                      <svg
                        className={`w-4 h-4 transition-transform ${
                          isMobileResourcesOpen ? "rotate-180" : ""
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
                      {isMobileResourcesOpen  && (
                        <motion.div
                          initial={{ opacity: 0, height: 0 }}
                          animate={{ opacity: 1, height: "auto" }}
                          exit={{ opacity: 0, height: 0 }}
                          className="mt-2 pl-4 space-y-2 overflow-hidden"
                        >
                          <button
                            onClick={() => {
                              scrollToSection("trustscore");
                              setIsResourcesDropdownOpen(false);
                            }}
                            className="block w-full text-left text-gray-300 hover:text-white transition-colors py-1 px-4 hover:bg-white/5 rounded-lg"
                          >
                            Explorer
                          </button>
                          <button
                            onClick={() => {
                              scrollToSection("faq");
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
                    <svg
                      className="w-4 h-4"
                      fill="none"
                      stroke="currentColor"
                      viewBox="0 0 24 24"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M17 8l4 4m0 0l-4 4m4-4H3"
                      />
                    </svg>
                  </a>
                </nav>
              </motion.div>
              </DropdownPortal>
            )}
          </AnimatePresence>
        </div>
      </div>
    </motion.header>
  );
}
