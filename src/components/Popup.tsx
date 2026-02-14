'use client';

import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import Image from 'next/image';
import { X } from 'lucide-react';

const AutoPopupModal = () => {
  const [isOpen, setIsOpen] = useState(false);

  useEffect(() => {
    // Show modal after 5 seconds
    const timer = setTimeout(() => {
      setIsOpen(true);
    }, 4000);

    return () => clearTimeout(timer);
  }, []);

  useEffect(() => {
    // Disable scroll when modal is open
    if (isOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = 'unset';
    }

    return () => {
      document.body.style.overflow = 'unset';
    };
  }, [isOpen]);

  const closeModal = () => {
    setIsOpen(false);
  };

  return (
    <AnimatePresence>
      {isOpen && (
        <>
          {/* Backdrop */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={closeModal}
            className="fixed inset-0 bg-black/60 backdrop-blur-sm z-50"
          />

          {/* Modal */}
          <motion.div
            initial={{ opacity: 0, scale: 0.9, y: 20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.9, y: 20 }}
            transition={{ duration: 0.3, ease: 'easeOut' }}
            className="fixed inset-0 z-50 flex items-center justify-center p-4"
          >
            <div className="w-full max-w-[720px]">
              <div className="relative p-6 rounded-3xl border-2 border-white/20 shadow-2xl overflow-hidden bg-[url('/popup-background.svg')] bg-cover bg-left md:bg-right-top">

                <div className='flex items-center justify-between mb-10'>
                  {/* Logo */}
                  <div className="flex items-center gap-4 md:gap-9">
                    <Image src="/hyper-evm-white.svg" alt="HyperEVM Logo" width={72} height={18} />
                    <div className="flex items-center gap-2">
                      <Image src="/favicon-logo.svg" alt="" width={18} height={18} className="w-[18px] h-[18px] object-contain" />
                      <span className="font-inter font-black text-white text-base tracking-tighter uppercase leading-none pt-0.5">Anylayer</span>
                    </div>
                  </div>

                  {/* Close Button */}
                  <button
                    onClick={closeModal}
                    className="p-1 w-8 h-8 border-2 border-primaryText rounded-full bg-none flex items-center justify-center transition-all duration-200 group hover:border-white"
                  >
                    <X className="w-5 h-5 text-primaryText group-hover:text-white transition-colors" />
                  </button>
                </div>

                {/* Content */}
                <div className="relative">

                  {/* Heading */}
                  <h2 className="text-[2rem] lg:text-[2.5rem] font-medium text-primaryText mb-6 leading-[110%] tracking-[-2px] max-w-96">
                    {" "}
                    10,000 FREE ANS Names —  <span className='text-white/20'> ZK Powered.</span>
                  </h2>

                  {/* Description */}
                  <p className="text-primaryText font-normal text-sm md:text-base leading-relaxed mb-10 max-w-64">
                    Secure yours and start your onchain identity & reputation journey.
                  </p>

                  {/* CTA Button */}
                  <a
                    href="https://www.anylayer.org/blog/10-000-free-ans-names-are-coming-a-thank-you-to-the-early-ones"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="bg-gradient-to-r from-blueprimary to-lightblueprimary text-primaryText font-medium max-w-44 md:max-w-48 w-full px-4 py-2.5 rounded-xl transition-all duration-300 transform text-sm lg:text-base text-center flex items-center justify-center gap-2 lg:gap-3"
                  >
                    <span>Learn More</span>
                    <Image src="/button-arrow.svg" alt="launch app" width="14" height="14" className="w-3 h-3 lg:w-[14px] lg:h-[14px]" />
                  </a>
                </div>

              </div>
            </div>
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
};

export default AutoPopupModal;