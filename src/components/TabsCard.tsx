import Image from 'next/image';
import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

const tabs = [
  { id: "defi", label: "DeFi Protocols" },
  { id: "loyalty", label: "Loyalty Brands" },
  { id: "rwa", label: "RWA & Insurance" },
  { id: "users", label: "Everyday Users" },
] as const;

const tabContent = {
  defi: {
    title: "DeFi Protocols",
    description: "Anylayer helps lending, trading, and yield platforms build safer, more efficient markets.",
    features: [
      { title: "Credible Liquidity Providers", description: "Participate in protocol governance and voting." },
      { title: "Reputation-Weighted Rewards", description: "Incentivize long-term trust over short-term capital." },
      { title: "Trust-Based LTVs", description: "Dynamic loan-to-value ratios based on wallet health." },
      { title: "Wallet-Gated Access", description: "Exclusive access for wallets with high trustscores." },
    ],
    diagram: "/dfi-protocols-updated.svg",
  },
  loyalty: {
    title: "Loyalty & Brands",
    description: "Reward real engagement and authenticity by replacing spend-based metrics with verified reputation.",
    features: [
      { title: "Sybil-Resistant Programs", description: "Reward authentic users, not bots or fakes." },
      { title: "Real Engagement Tracking", description: "Track true participation without personal data." },
      { title: "Tiered Rewards", description: "Reward tiers built on wallet reputation strength." },
      { title: "Perks for Loyal Wallets", description: "Special perks for long-standing verified wallets." },
    ],
    diagram: "/tab-loyalty.svg",
  },
  rwa: {
    title: "RWA & Insurance",
    description: "Bring transparency, fairness, and efficiency to real-world lending using zk-powered reputation.",
    features: [
      { title: "Reduced KYC", description: "Simplified onboarding without exposing personal info." },
      { title: "Trust-Based Underwriting", description: "Automated lending powered by wallet trust." },
      { title: "Credit Lines", description: "Instant credit access for credible users." },
      { title: "Institutional Trust", description: "Universal zk trust layer for institutions." },
    ],
    diagram: "/tab-rwa-platforms.svg",
  },
  users: {
    title: "Everyday Users",
    description: "Empower users to prove credibility, earn trust, and access better Web3 opportunities privately.",
    features: [
      { title: "Prove Privately", description: "Show reliability without sharing private data." },
      { title: "Earn Reputation", description: "Gain trust through consistent on-chain actions." },
      { title: "Portable Identity", description: "One reputation carried across all ecosystems." },
      { title: "Unlock Rewards", description: "Access perks based on earned trustscore." },
    ],
    diagram: "/tab-everyday-user.svg",
  },
};

const TabsCard = () => {
  const [activeTab, setActiveTab] = useState<keyof typeof tabContent>("defi");

  return (
    <section id="capital" className="relative py-24 md:py-40 px-6 overflow-hidden bg-[#08080C]">
      {/* Atmospheric Backgrounds */}
      <div className="absolute top-1/4 -right-1/4 w-[600px] h-[600px] bg-blueprimary/5 blur-[120px] rounded-full pointer-events-none" />
      <div className="absolute bottom-0 -left-1/4 w-[500px] h-[500px] bg-lightblueprimary/5 blur-[100px] rounded-full pointer-events-none" />

      <div className="max-w-screen-xl mx-auto relative z-10">
        {/* Section Header */}
        <div className="grid lg:grid-cols-[1fr,0.8fr] gap-12 lg:gap-24 mb-20 md:mb-32">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
          >
            <div className="mb-6 inline-flex items-center gap-2 rounded-full bg-white/5 border border-white/10 px-4 py-1.5">
              <span className="text-[10px] uppercase tracking-widest font-bold text-white/30">Capital Efficiency</span>
            </div>
            <h2 className="text-[3rem] md:text-[5.5rem] font-medium text-primaryText leading-[0.9] tracking-tighter mb-8">
              Unlock <span className="text-lightblueprimary">Capital</span>, <br />
              not your data
            </h2>
          </motion.div>
          
          <motion.div 
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="flex items-end pb-2"
          >
            <p className="text-primaryText/40 text-lg md:text-xl font-light leading-relaxed max-w-sm">
              Anylayer is more than a credit score. It's a trust layer designed for 
              different groups to benefit from portable zk-verified reputation.
            </p>
          </motion.div>
        </div>

        {/* Tab Navigation */}
        <div className="flex flex-wrap gap-x-8 gap-y-4 border-b border-white/5 mb-16 md:mb-24">
          {tabs.map((tab) => (
            <button
              key={tab.id}
              onClick={() => setActiveTab(tab.id)}
              className="relative pb-6 text-sm md:text-base font-medium tracking-wide uppercase transition-colors duration-300"
            >
              <span className={activeTab === tab.id ? "text-primaryText" : "text-primaryText/20 hover:text-primaryText/50"}>
                {tab.label}
              </span>
              {activeTab === tab.id && (
                <motion.div 
                  layoutId="activeTabLine"
                  className="absolute bottom-0 left-0 right-0 h-0.5 bg-lightblueprimary shadow-[0_0_15px_rgba(166,131,255,0.5)]"
                />
              )}
            </button>
          ))}
        </div>

        {/* Active Content */}
        <AnimatePresence mode="wait">
          <motion.div
            key={activeTab}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            transition={{ duration: 0.5, ease: [0.22, 1, 0.36, 1] }}
            className="grid lg:grid-cols-[1.2fr,1fr] gap-12 lg:gap-24"
          >
            {/* Left: Diagram */}
            <div className="relative group order-2 lg:order-1">
              <div className="absolute -inset-4 bg-gradient-to-br from-blueprimary/10 to-transparent blur-2xl rounded-[60px] opacity-0 group-hover:opacity-100 transition-opacity duration-700" />
              <div className="relative rounded-[40px] bg-white/[0.02] border border-white/10 p-8 md:p-12 backdrop-blur-xl overflow-hidden shadow-2xl">
                <Image
                  src={tabContent[activeTab].diagram}
                  alt={tabContent[activeTab].title}
                  width={600}
                  height={400}
                  className="w-full h-auto object-contain transition-transform duration-700 group-hover:scale-[1.02]"
                />
              </div>
            </div>

            {/* Right: Info */}
            <div className="flex flex-col justify-center order-1 lg:order-2">
              <h3 className="text-2xl md:text-4xl font-medium text-primaryText mb-6 tracking-tight">
                {tabContent[activeTab].title}
              </h3>
              <p className="text-primaryText/40 text-lg font-light leading-relaxed mb-12 border-l border-lightblueprimary/30 pl-6">
                {tabContent[activeTab].description}
              </p>
              
              <div className="grid gap-8">
                {tabContent[activeTab].features.map((feature, index) => (
                  <div key={index} className="group/item flex gap-6">
                    <span className="text-xs md:text-sm font-mono text-lightblueprimary/40 group-hover/item:text-lightblueprimary transition-colors pt-1">
                      {(index + 1).toString().padStart(2, '0')}
                    </span>
                    <div>
                      <h4 className="text-lg md:text-xl font-medium text-primaryText mb-2 tracking-tight group-hover/item:text-lightblueprimary transition-colors">
                        {feature.title}
                      </h4>
                      <p className="text-primaryText/30 text-sm md:text-base font-light leading-relaxed">
                        {feature.description}
                      </p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </motion.div>
        </AnimatePresence>
      </div>
    </section>
  );
};

export default TabsCard;
