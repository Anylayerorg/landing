import { ChevronDown } from "lucide-react";
import React, { useState } from "react";
import { motion } from "framer-motion";

const FAQs = [
  {
    question: "What is ZKScore?",
    answer:
      'ZKScore is a decentralized reputation layer that uses zero-knowledge proofs to verify wallet credibility without exposing personal information. It\'s like a "trust passport" for Web3.',
  },
  {
    question: "How does ZKScore protect my privacy?",
    answer:
      "ZKScore uses zero-knowledge proofs to verify your credentials and activities without revealing the underlying data. Your personal information stays private while your reputation becomes portable and verifiable.",
  },
  {
    question: "Why is wallet reputation important?",
    answer:
      "Wallet reputation helps establish trust in decentralized systems, enables better access to DeFi protocols, reduces fraud, and creates accountability without compromising privacy.",
  },
  {
    question: "Can I use ZKScore across multiple platforms?",
    answer:
      "Yes, ZKScore is designed to be interoperable across different platforms and protocols. Your reputation score can be used wherever ZKScore is integrated.",
  },
  {
    question: "What kinds of activities affect my score?",
    answer:
      "Your score is influenced by on-chain activities, transaction history, protocol interactions, governance participation, and verified credentials from trusted sources.",
  },
  {
    question: "How does ZKScore protect user privacy?",
    answer:
      "We use advanced cryptographic techniques including zero-knowledge proofs to verify information without exposing it. Your data remains encrypted and under your control at all times.",
  },
  {
    question: "Can projects integrate ZKScore into existing contracts?",
    answer:
      "Yes, ZKScore provides easy-to-use SDKs and smart contract modules that can be integrated into existing protocols with minimal code changes.",
  },
  {
    question: "What types of data are used to build a reputation score?",
    answer:
      "We analyze on-chain transaction patterns, protocol interactions, governance participation, verified credentials, and behavioral consistency while maintaining privacy.",
  },
  {
    question: "Is ZKScore compatible with multiple chains?",
    answer:
      "Yes, ZKScore is designed to work across multiple blockchain networks, allowing you to build a unified reputation across different ecosystems.",
  },
];

const Faqs = () => {
  const [openIndex, setOpenIndex] = useState<number | null>(0);
  const toggleFAQ = (index: number) => {
    setOpenIndex(openIndex === index ? null : index);
  };
  return (
    // FAQs
    <section className="relative py-20 px-5">

      <div className="max-w-7xl mx-auto relative z-10">
        {/* Header */}

        {/* FAQ Grid */}
        <div className="grid lg:grid-cols-2 gap-6">
          <div>
            <motion.div
                initial={{ opacity: 0, y: 50 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, amount: 0.2 }}
                transition={{ duration: 0.6, delay: 0.2 }}
                className="max-w-[32.25rem]"
              >
                <div className="mb-3 inline-flex items-center justify-center gap-3 rounded-full bg-white/5 px-6 py-3">
                  <span className="text-sm text-white/50">Faqs</span>
                </div>
                <h2 className="text-[1.5rem] md:text-[1.875rem] lg:text-[3.25rem] font-medium text-primaryText mb-6 leading-[100%] tracking-tighter">
                  Frequently Asked{" "}
                  <span className="bg-gradient-to-r from-blueprimary to-lightblueprimary bg-clip-text text-transparent">
                    Questions
                  </span>
                </h2>        
            </motion.div>

            {/* Left Column */}
            <div className="space-y-5">
              {FAQs.slice(0, 3).map((faq, index) => (
                <div
                  key={index}
                  className="bg-gradient-to-b from-[#413D57]/15 to-transparent border border-white/10 rounded-2xl overflow-hidden transition-all duration-300"
                >
                  <button
                    onClick={() => toggleFAQ(index)}
                    className="w-full px-6 py-4 flex items-center justify-between text-left transition-colors"
                  >
                    <span className="text-primaryText font-medium text-lg pr-4">
                      {faq.question}
                    </span>
                    <ChevronDown
                      className={`w-5 h-5 text-primaryText flex-shrink-0 transition-transform duration-300 ${
                        openIndex === index ? "rotate-180" : ""
                      }`}
                    />
                  </button>
                  <div
                    className={`overflow-hidden transition-all duration-300 ${
                      openIndex === index
                        ? "max-h-96 opacity-100"
                        : "max-h-0 opacity-0"
                    }`}
                  >
                    <div className="px-6 pb-5">
                      <p className="text-primaryText/60 leading-relaxed">
                        {faq.answer}
                      </p>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
          {/* Right Column */}
          <div className="space-y-5">
            {FAQs.slice(3, 9).map((faq, index) => {
              const globalIndex = index + 6;
              return (
                <div
                  key={globalIndex}
                  className="bg-gradient-to-b from-[#413D57]/15 to-transparent border border-white/10 rounded-2xl overflow-hidden transition-all duration-300"
                >
                  <button
                    onClick={() => toggleFAQ(globalIndex)}
                    className="w-full px-6 py-4 flex items-center justify-between text-left transition-colors"
                  >
                    <span className="text-primaryText font-medium text-lg pr-4">
                      {faq.question}
                    </span>
                    <ChevronDown
                      className={`w-5 h-5 text-slate-400 flex-shrink-0 transition-transform duration-300 ${
                        openIndex === globalIndex ? "rotate-180" : ""
                      }`}
                    />
                  </button>
                  <div
                    className={`overflow-hidden transition-all duration-300 ${
                      openIndex === globalIndex
                        ? "max-h-96 opacity-100"
                        : "max-h-0 opacity-0"
                    }`}
                  >
                    <div className="px-6 pb-5 pt-2">
                      <p className="text-slate-400 leading-relaxed">
                        {faq.answer}
                      </p>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </div>
    </section>
  );
};

export default Faqs;
