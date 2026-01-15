'use client';

import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  Shield, Database, Globe, ArrowRight, Layers, Box
} from 'lucide-react';

const tabs = [
  { id: "defi", label: "DeFi Protocols" },
  { id: "loyalty", label: "Loyalty Brands" },
  { id: "rwa", label: "RWA & Insurance" },
  { id: "users", label: "Everyday Users" },
] as const;

type TabId = typeof tabs[number]['id'];

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
    stats: { primary: "84%", secondary: "Capital Eff." }
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
    stats: { primary: "12M+", secondary: "Active Proofs" }
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
    stats: { primary: "$4.2B", secondary: "Verified Capital" }
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
    stats: { primary: "Elite", secondary: "Trust Tier" }
  },
};

const IndustrialCapital = () => {
  const [activeTab, setActiveTab] = useState<TabId>("defi");

  return (
    <section id="capital" className="relative py-24 md:py-40 px-6 overflow-hidden bg-[#08080C]">
      {/* Background Atmosphere */}
      <div className="absolute top-0 left-0 w-full h-full pointer-events-none overflow-hidden">
        <div className="absolute top-1/4 -right-1/4 w-[600px] h-[600px] bg-blueprimary/5 blur-[120px] rounded-full" />
        <div className="absolute bottom-0 -left-1/4 w-[500px] h-[500px] bg-lightblueprimary/5 blur-[100px] rounded-full" />
      </div>

      <div className="max-w-screen-xl mx-auto relative z-10">
        {/* Section Header */}
        <div className="grid lg:grid-cols-2 gap-12 mb-20 md:mb-32">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
          >
            <div className="flex items-center gap-3 mb-6">
              <div className="w-1.5 h-1.5 rounded-full bg-lightblueprimary shadow-[0_0_12px_rgba(166,131,255,0.8)] animate-pulse" />
              <span className="text-lightblueprimary font-mono text-[10px] uppercase tracking-[0.4em] font-black">Efficiency</span>
              <div className="h-px w-8 bg-white/10" />
              <span className="text-white/20 font-mono text-[10px] uppercase tracking-[0.4em]">Market Optimization</span>
            </div>
            <h2 className="text-[3.5rem] md:text-[5rem] font-medium text-primaryText leading-[0.9] tracking-tighter">
              Unlock <span className="bg-gradient-to-r from-blueprimary to-lightblueprimary bg-clip-text text-transparent">Capital</span>, <br />
              not your data
            </h2>
          </motion.div>
          <div className="flex flex-col justify-end">
            <p className="text-white/40 text-xl font-light leading-relaxed max-w-xl border-l border-white/10 pl-10">
              Anylayer is more than a credit score. It's a trust layer designed for 
              different groups to benefit from portable zk-verified reputation.
            </p>
          </div>
        </div>

        {/* Assembly Vertical Stack Layout */}
        <div className="relative w-full flex flex-col gap-6">
          {tabs.map((tab, idx) => {
            const isActive = activeTab === tab.id;
            const content = tabContent[tab.id];
            return (
              <motion.div
                key={tab.id}
                layout
                onClick={() => setActiveTab(tab.id)}
                className={`relative cursor-pointer border rounded-[32px] overflow-hidden transition-all duration-700 group ${
                  isActive ? "bg-[#12121A] border-lightblueprimary/30 py-12 px-8 md:px-16" : "bg-[#08080C] border-white/5 py-8 px-8 md:px-12 hover:bg-white/[0.02] hover:border-white/10"
                }`}
              >
                {/* Background Label */}
                <div className={`absolute top-1/2 -translate-y-1/2 right-12 text-7xl font-mono font-black text-white/[0.02] pointer-events-none select-none tracking-tighter transition-all duration-700 ${isActive ? "opacity-100 scale-125" : "opacity-0"}`}>
                   MODULE 0{idx + 1}
                </div>

                <div className="relative flex flex-col md:flex-row items-center justify-between gap-12">
                  {/* Left: Indicator & Title */}
                  <div className="flex items-center gap-10 w-full md:w-auto">
                    <div className="flex flex-col items-center gap-2">
                       <div className={`w-3 h-3 rounded-full transition-all duration-500 ${isActive ? "bg-lightblueprimary shadow-[0_0_15px_#A683FF]" : "bg-white/10"}`} />
                       <div className="w-[1px] h-12 bg-white/5" />
                       <span className="text-[10px] font-mono text-white/20 font-bold">0{idx + 1}</span>
                    </div>
                    <div className="space-y-2">
                      <div className={`text-[10px] font-mono uppercase tracking-[0.4em] font-black transition-colors ${isActive ? "text-lightblueprimary" : "text-white/20"}`}>
                         {tab.id.toUpperCase()} UNIT
                      </div>
                      <h4 className={`text-2xl md:text-4xl font-semibold tracking-tight transition-colors ${isActive ? "text-white" : "text-white/40"}`}>{tab.label}</h4>
                    </div>
                  </div>

                  {/* Middle: Description (Collapsed/Expanded) */}
                  <AnimatePresence>
                    {isActive && (
                      <motion.div
                        initial={{ opacity: 0, height: 0 }}
                        animate={{ opacity: 1, height: 'auto' }}
                        exit={{ opacity: 0, height: 0 }}
                        className="flex-1 md:max-w-xl"
                      >
                        <p className="text-white/40 text-lg font-light leading-relaxed">{content.description}</p>
                      </motion.div>
                    )}
                  </AnimatePresence>

                  {/* Right: Icon / CTA */}
                  <div className={`w-14 h-14 rounded-2xl border flex items-center justify-center transition-all duration-500 ${isActive ? "bg-lightblueprimary border-lightblueprimary text-black rotate-90" : "bg-white/5 border-white/10 text-white/20"}`}>
                     {isActive ? <Box size={24} /> : <ArrowRight size={24} />}
                  </div>
                </div>

                {/* Features Grid (Only if active) */}
                <AnimatePresence>
                  {isActive && (
                    <motion.div
                      initial={{ opacity: 0, y: 20 }}
                      animate={{ opacity: 1, y: 0 }}
                      exit={{ opacity: 0, y: 10 }}
                      transition={{ delay: 0.2 }}
                      className="mt-16 grid sm:grid-cols-2 lg:grid-cols-4 gap-8"
                    >
                      {content.features.map((f, i) => (
                        <div key={i} className="space-y-3 p-6 rounded-2xl bg-white/[0.02] border border-white/5 hover:border-white/10 transition-colors">
                          <div className="text-[10px] font-mono text-lightblueprimary/60 font-black">CAPABILITY 0{i + 1}</div>
                          <div className="text-sm font-bold text-white tracking-tight">{f.title}</div>
                          <div className="text-[11px] text-white/20 leading-relaxed">{f.description}</div>
                        </div>
                      ))}
                    </motion.div>
                  )}
                </AnimatePresence>
              </motion.div>
            );
          })}
        </div>
      </div>
    </section>
  );
};

export default IndustrialCapital;
