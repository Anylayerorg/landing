'use client';

import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

const tabs = [
  { id: "defi", label: "DeFi Protocols" },
  { id: "payments", label: "Payments & .any" },
  { id: "marketplaces", label: "Marketplaces" },
  { id: "loyalty", label: "Loyalty Brands" },
  { id: "users", label: "Everyday Users" },
] as const;

type TabId = typeof tabs[number]['id'];

const tabContent: Record<TabId, {
  title: string;
  description: string;
  features: { title: string; description: string }[];
}> = {
  defi: {
    title: "DeFi Protocols",
    description: "Price risk accurately and unlock real-world assets using privacy-preserving reputation.",
    features: [
      { title: "Under-Collateralized Credit", description: "Blend on/off-chain signals to reduce collateral safely." },
      { title: "Weighted Rewards", description: "Incentivize long-term trust over short-term capital." },
      { title: "Trust-Based LTVs", description: "Dynamic loan-to-value ratios based on wallet health." },
      { title: "Asset Proofs", description: "Prove RWA ownership without exposing portfolios." },
    ],
  },
  payments: {
    title: "Payments & .any",
    description: "Turn long account strings into simple .any paynames and move money across crypto.",
    features: [
      { title: ".any Paynames", description: "Replace hex with .any handles for global settlement." },
      { title: "Remittance Routing", description: "Smart currency routing with privacy-preserving proofs." },
      { title: "Mass Payouts", description: "Batch payouts to contractors via .any handles." },
      { title: "Recurring Billing", description: "Trust-banded retries and limits; request-to-pay links." },
    ],
  },
  marketplaces: {
    title: "Marketplaces",
    description: "Increase trust and conversion on both sides; credible sellers and committed buyers.",
    features: [
      { title: "Seller Credibility", description: "Reputation from dispute outcomes and service quality." },
      { title: "Deposit Proofs", description: "Prove lockable funds to reduce flakes and enable bookings." },
      { title: "Warranty Automation", description: "Streamlined approvals for high-trust buyers." },
      { title: "Dispute Integrity", description: "Multi-attester checks to resolve disputes fairly." },
    ],
  },
  loyalty: {
    title: "Loyalty & Brands",
    description: "Reward real engagement and authenticity by replacing spend-based metrics.",
    features: [
      { title: "Sybil-Resistant", description: "Reward authentic users, not bots or fakes." },
      { title: "Engagement Tracking", description: "Track true participation without personal data." },
      { title: "Tiered Rewards", description: "Reward tiers built on wallet reputation strength." },
      { title: "Wallet Perks", description: "Special perks for long-standing verified wallets." },
    ],
  },
  users: {
    title: "Everyday Users",
    description: "Empower users to prove credibility, earn trust, and access Web3 opportunities.",
    features: [
      { title: "Prove Privately", description: "Show reliability without sharing private data." },
      { title: "Earn Reputation", description: "Gain trust through consistent on-chain actions." },
      { title: "Portable Identity", description: "One reputation carried across all ecosystems." },
      { title: "Unlock Rewards", description: "Access perks based on earned trustscore." },
    ],
  },
};

const SectionTag = ({ label }: { label: string }) => (
  <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-white/[0.02] border border-white/5 text-white/40">
    <div className="w-1 h-1 rounded-full bg-lightblueprimary" />
    <span className="text-[8px] font-mono uppercase tracking-widest">{label}</span>
  </div>
);

const IndustrialCapital = () => {
  const [activeTab, setActiveTab] = useState<TabId>("defi");

  return (
    <section id="capital" className="bg-[#08080C] py-32 md:py-48 px-6 border-t border-white/5">
      <div className="max-w-screen-xl mx-auto">
        <div className="max-w-4xl mx-auto space-y-24">
          {/* Header */}
          <div className="flex flex-col md:flex-row md:items-end justify-between gap-12 border-b border-white/5 pb-12">
            <div className="space-y-6">
              <SectionTag label="System Utility" />
              <h2 className="text-5xl md:text-8xl font-black uppercase text-white tracking-tighter leading-none">
                Industrial <br /> <span className="text-lightblueprimary">Capital.</span>
              </h2>
            </div>
            <div className="max-w-xs text-right">
              <p className="text-white/40 text-[11px] font-mono uppercase tracking-[0.2em] leading-relaxed">
                Bridging identity and reputation with programmable application utility.
              </p>
            </div>
          </div>

          {/* Tabs / Menu */}
          <div className="flex border-b border-white/5 pb-10 overflow-x-auto no-scrollbar gap-8 md:gap-12">
            {tabs.map((tab) => (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id)}
                className={`text-[10px] md:text-xs font-mono tracking-[0.4em] uppercase whitespace-nowrap transition-colors relative pb-4 ${activeTab === tab.id ? 'text-lightblueprimary' : 'text-white/20 hover:text-white/40'}`}
              >
                {tab.label}
                {activeTab === tab.id && (
                  <motion.div
                    layoutId="activeTabUnderline"
                    className="absolute bottom-0 left-0 w-full h-px bg-lightblueprimary"
                  />
                )}
              </button>
            ))}
          </div>

          {/* Content Area */}
          <AnimatePresence mode="wait">
            <motion.div
              key={activeTab}
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -10 }}
              transition={{ duration: 0.4, ease: [0.16, 1, 0.3, 1] }}
              className="grid lg:grid-cols-2 gap-16 md:gap-32 items-start"
            >
              <div className="space-y-8">
                <h3 className="text-5xl md:text-7xl font-black text-white uppercase tracking-tighter leading-none">
                  {activeTab === 'marketplaces' ? (
                    <>Market <br /> Place</>
                  ) : tabContent[activeTab].title}
                </h3>
                <p className="text-white/40 text-lg md:text-xl font-light leading-relaxed max-w-lg">
                  {tabContent[activeTab].description}
                </p>
              </div>
              <div className="space-y-10 md:space-y-12">
                {tabContent[activeTab].features.map((f, i) => (
                  <div key={i} className="flex items-start gap-8 group">
                    <span className="font-mono text-[9px] md:text-[10px] text-lightblueprimary/40 group-hover:text-lightblueprimary transition-colors font-black">
                      0{i + 1}
                    </span>
                    <div className="space-y-2">
                      <div className="text-lg md:text-xl font-black text-white uppercase tracking-tight">
                        {f.title}
                      </div>
                      <p className="text-sm md:text-base text-white/40 leading-relaxed font-light">
                        {f.description}
                      </p>
                    </div>
                  </div>
                ))}
              </div>
            </motion.div>
          </AnimatePresence>
        </div>
      </div>
    </section>
  );
};

export default IndustrialCapital;
