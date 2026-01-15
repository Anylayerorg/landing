import { Plus, Minus } from "lucide-react";
import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";

const FAQs = [
  {
    question: "What is Anylayer?",
    answer:
      'Anylayer is a decentralized reputation layer that uses zero-knowledge proofs to verify wallet credibility without exposing personal information. It\'s like a "trust passport" for Web3.',
  },
  {
    question: "How does Anylayer protect my privacy?",
    answer:
      "Anylayer uses zero-knowledge proofs to verify your credentials and activities without revealing the underlying data. Your personal information stays private while your reputation becomes portable and verifiable.",
  },
  {
    question: "Why is wallet reputation important?",
    answer:
      "Wallet reputation helps establish trust in decentralized systems, enables better access to DeFi protocols, reduces fraud, and creates accountability without compromising privacy.",
  },
  {
    question: "Can I use Anylayer across multiple platforms?",
    answer:
      "Yes, Anylayer is designed to be interoperable across different platforms and protocols. Your reputation score can be used wherever Anylayer is integrated.",
  },
  {
    question: "What kinds of activities affect my score?",
    answer:
      "Your score is influenced by on-chain activities, transaction history, protocol interactions, governance participation, and verified credentials from trusted sources.",
  },
  {
    question: "How does Anylayer protect user privacy?",
    answer:
      "We use advanced cryptographic techniques including zero-knowledge proofs to verify information without exposing it. Your data remains encrypted and under your control at all times.",
  },
  {
    question: "Can projects integrate Anylayer into existing contracts?",
    answer:
      "Yes, Anylayer provides easy-to-use SDKs and smart contract modules that can be integrated into existing protocols with minimal code changes.",
  },
  {
    question: "What types of data are used to build a reputation score?",
    answer:
      "We analyze on-chain transaction patterns, protocol interactions, governance participation, verified credentials, and behavioral consistency while maintaining privacy.",
  },
  {
    question: "Is Anylayer compatible with multiple chains?",
    answer:
      "Yes, Anylayer is designed to work across multiple blockchain networks, allowing you to build a unified reputation across different ecosystems.",
  },
];

const FAQItem = ({ faq, isOpen, toggle, index }: { faq: any, isOpen: boolean, toggle: () => void, index: number }) => {
  return (
    <div className={`group transition-all duration-300 border-b border-white/5 last:border-0`}>
      <button
        onClick={toggle}
        className="w-full py-5 md:py-6 flex items-center justify-between text-left relative z-10"
      >
        <div className="flex items-center gap-5 md:gap-8 flex-1">
          <span className={`text-xs md:text-sm font-mono transition-colors duration-300 ${isOpen ? "text-lightblueprimary" : "text-primaryText/20"}`}>
            {(index + 1).toString().padStart(2, '0')}
          </span>
          <span className={`text-lg md:text-xl font-medium tracking-tight transition-all duration-300 ${
            isOpen ? "text-primaryText" : "text-primaryText/60 group-hover:text-primaryText/80"
          }`}>
            {faq.question}
          </span>
        </div>
        
        <div className={`relative flex items-center justify-center w-8 h-8 transition-all duration-300 ${isOpen ? "rotate-90" : ""}`}>
          <Plus className={`absolute w-5 h-5 transition-all duration-300 ${isOpen ? "opacity-0 scale-0" : "opacity-100 scale-100 text-white/20 group-hover:text-white/40"}`} />
          <Minus className={`absolute w-5 h-5 transition-all duration-300 ${isOpen ? "opacity-100 scale-100 text-lightblueprimary" : "opacity-0 scale-0"}`} />
        </div>
      </button>

      <AnimatePresence initial={false}>
        {isOpen && (
          <motion.div
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: "auto", opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.3, ease: "easeOut" }}
          >
            <div className="pl-10 md:pl-16 pb-8 pr-12">
              <p className="text-primaryText/40 leading-relaxed text-sm md:text-base font-light max-w-2xl">
                {faq.answer}
              </p>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

const Faqs = () => {
  const [openIndex, setOpenIndex] = useState<number | null>(0);
  
  const toggleFAQ = (index: number) => {
    setOpenIndex(openIndex === index ? null : index);
  };

  return (
    <section className="relative py-16 md:py-24 px-5 bg-[#08080C]">
      <div className="max-w-6xl mx-auto">
        {/* Header Section */}
        <div className="mb-12 md:mb-16">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="flex flex-col md:flex-row items-start md:items-end justify-between gap-6"
          >
            <div className="max-w-xl">
              <div className="flex items-center gap-3 mb-6">
                <div className="w-1.5 h-1.5 rounded-full bg-lightblueprimary shadow-[0_0_12px_rgba(166,131,255,0.8)] animate-pulse" />
                <span className="text-lightblueprimary font-mono text-[10px] uppercase tracking-[0.4em] font-black">Support</span>
                <div className="h-px w-8 bg-white/10" />
                <span className="text-white/20 font-mono text-[10px] uppercase tracking-[0.4em]">Help Center</span>
              </div>
              <h2 className="text-[2.25rem] md:text-[3.25rem] font-medium text-primaryText leading-[1.1] tracking-tighter mb-4">
                Common Questions
              </h2>
              <p className="text-primaryText/40 text-base md:text-lg font-light">
                Everything you need to know about our trust infrastructure.
              </p>
            </div>
            <div className="hidden md:block pb-1">
              <a 
                href="mailto:hello@anylayer.org" 
                className="group flex items-center gap-3 text-primaryText/40 hover:text-primaryText transition-all text-sm"
              >
                <span className="uppercase tracking-widest font-semibold">Contact Us</span>
                <div className="w-10 h-10 rounded-full border border-white/10 flex items-center justify-center group-hover:border-lightblueprimary/30 group-hover:bg-lightblueprimary/5 transition-all">
                  <Plus className="w-3.5 h-3.5 rotate-45 text-lightblueprimary" />
                </div>
              </a>
            </div>
          </motion.div>
        </div>

        {/* FAQ List */}
        <motion.div 
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
          className="border-t border-white/5"
        >
          {FAQs.map((faq, index) => (
            <FAQItem
              key={index}
              faq={faq}
              isOpen={openIndex === index}
              toggle={() => toggleFAQ(index)}
              index={index}
            />
          ))}
        </motion.div>

        {/* Mobile Contact Link */}
        <div className="mt-10 md:hidden text-center">
          <a href="mailto:hello@anylayer.org" className="text-xs uppercase tracking-widest font-bold text-lightblueprimary underline decoration-lightblueprimary/30 underline-offset-4">
            Still have questions? Contact Support
          </a>
        </div>
      </div>
    </section>
  );
};

export default Faqs;
