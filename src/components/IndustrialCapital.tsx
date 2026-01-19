'use client';

import React, { useState } from 'react';
import { motion, AnimatePresence, LayoutGroup } from 'framer-motion';
import {
  Shield, Database, Globe, ArrowRight, Layers, Box
} from 'lucide-react';

const tabs = [
  { id: "defi", label: "DeFi Protocols" },
  { id: "payments", label: "Payments & .any" },
  { id: "marketplaces", label: "Marketplaces & Commerce" },
  { id: "loyalty", label: "Loyalty Brands" },
  { id: "users", label: "Everyday Users" },
] as const;

type TabId = typeof tabs[number]['id'];

const tabContent = {
  defi: {
    title: "DeFi Protocols",
    description: "Price risk accurately and unlock real‑world assets using privacy‑preserving reputation and proofs.",
    features: [
      { title: "Under‑Collateralized & RWA Credit", description: "Blend on/off‑chain signals and asset attestations to reduce collateral safely." },
      { title: "Reputation-Weighted Rewards", description: "Incentivize long-term trust over short-term capital." },
      { title: "Trust-Based LTVs", description: "Dynamic loan-to-value ratios based on wallet health." },
      { title: "Settlement & Asset Proofs", description: "Prove lockable funds or RWA ownership/eligibility without exposing portfolios." },
    ],
    stats: { primary: "84%", secondary: "Capital Eff." }
  },
  payments: {
    title: "Payments & .any Addressing",
    description: "Turn long account strings into simple .any paynames—and move money across crypto and fiat without exposing sensitive details.",
    features: [
      { title: "P2P & Merchant Checkout (.any Paynames)", description: "Replace IBANs/hex with .any handles; accept crypto or fiat at one address, settle where you want." },
      { title: "Cross‑Border Remittance & FX Routing", description: "Send/receive across rails with smart currency routing and privacy‑preserving compliance proofs." },
      { title: "Payroll & Mass Payouts", description: "Batch payouts to contractors/creators via .any handles; settle on‑chain or to bank with proof‑linked receipts." },
      { title: "Subscriptions & Recurring Billing", description: "Trust‑banded retries and limits; request‑to‑pay links and consented cancellations—no card vaults." },
    ],
    stats: { primary: "$12B+", secondary: "Volume Routed" }
  },
  marketplaces: {
    title: "Marketplaces & Commerce",
    description: "Increase trust and conversion on both sides—credible sellers, committed buyers, smoother post‑purchase flows.",
    features: [
      { title: "Seller Credibility", description: "Reputation from delivery history, dispute outcomes, and service quality—without exposing customer data." },
      { title: "Buyer Deposit Proofs", description: "\"Can lock amount ≥ X\" proofs to reduce flakes and enable instant reservations." },
      { title: "Returns & Warranty Automation", description: "Streamlined approvals for high‑trust buyers; fewer holds and faster refunds." },
      { title: "Escrow & Dispute Integrity", description: "Outcome‑based proofs and multi‑attester checks to resolve disputes fairly without data dumps." },
    ],
    stats: { primary: "98%", secondary: "Trust Rate" }
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
              <div className="hidden md:block h-px w-8 bg-white/10" />
              <span className="hidden md:inline-block text-lightblueprimary/60 font-mono text-[10px] uppercase tracking-[0.4em]">Market Optimization</span>
            </div>
            <h2 className="text-[3.5rem] md:text-[5rem] font-geist font-black uppercase text-primaryText leading-[0.9] tracking-tighter lg:tracking-[-0.05em]">
              Unlock <span className="text-lightblueprimary">Capital</span>, <br />
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
          <LayoutGroup>
            {tabs.map((tab, idx) => {
              const isActive = activeTab === tab.id;
              const content = tabContent[tab.id];
              return (
                <motion.div
                  key={tab.id}
                  layout
                  onClick={() => setActiveTab(tab.id)}
                  initial={false}
                  animate={{
                    backgroundColor: isActive ? "#12121A" : "#08080C",
                    borderColor: isActive ? "rgba(166, 131, 255, 0.3)" : "rgba(255, 255, 255, 0.05)",
                  }}
                  transition={{
                    layout: { duration: 0.5, ease: [0.22, 1, 0.36, 1] },
                    backgroundColor: { duration: 0.4 },
                    borderColor: { duration: 0.4 }
                  }}
                  className={`relative cursor-pointer border rounded-[32px] overflow-hidden group hover:border-white/10 transition-colors duration-500 ${isActive ? "py-12 px-8 md:px-16 shadow-[0_20px_50px_rgba(0,0,0,0.5)]" : "py-8 px-8 md:px-12"
                    }`}
                >
                  {/* Background Label */}
                  <motion.div
                    initial={false}
                    animate={{
                      opacity: isActive ? 1 : 0,
                      scale: isActive ? 1.25 : 1,
                      y: "-50%"
                    }}
                    transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
                    className="absolute top-1/2 right-12 text-7xl font-mono font-black text-white/[0.02] pointer-events-none select-none tracking-tighter"
                  >
                    MODULE 0{idx + 1}
                  </motion.div>

                  <div className="relative flex flex-col md:flex-row items-center justify-between gap-12">
                    {/* Left: Indicator & Title */}
                    <div className="flex items-center gap-10 w-full md:w-auto">
                      <div className="flex flex-col items-center gap-2">
                        <div className={`w-3 h-3 rounded-full transition-all duration-500 ${isActive ? "bg-lightblueprimary shadow-[0_0_15px_#A683FF]" : "bg-white/10"}`} />
                        <div className="w-[1px] h-12 bg-white/5" />
                        <span className="text-[10px] font-mono text-white/20 font-bold">0{idx + 1}</span>
                      </div>
                      <div className="space-y-2">
                        <motion.div layout className={`text-[10px] font-mono uppercase tracking-[0.4em] font-black transition-colors ${isActive ? "text-lightblueprimary" : "text-white/20"}`}>
                          {tab.id.toUpperCase()} UNIT
                        </motion.div>
                        <motion.h4 layout className={`text-2xl md:text-4xl font-semibold tracking-tight transition-colors ${isActive ? "text-white" : "text-white/40"}`}>{tab.label}</motion.h4>
                      </div>
                    </div>

                    {/* Middle: Description (Hidden when collapsed) */}
                    <div className="flex-1 md:max-w-xl">
                      {!isActive && <div className="h-0 overflow-hidden" />}
                      {isActive && (
                        <p className="text-white/40 text-lg font-light leading-relaxed">{content.description}</p>
                      )}
                    </div>

                    {/* Right: Icon / CTA */}
                    <div className={`w-14 h-14 rounded-2xl border flex items-center justify-center transition-all duration-500 ${isActive ? "bg-lightblueprimary border-lightblueprimary text-black rotate-90" : "bg-white/5 border-white/10 text-white/20"}`}>
                      {isActive ? <Box size={24} /> : <ArrowRight size={24} />}
                    </div>
                  </div>

                  {/* Expanded Content Section */}
                  <AnimatePresence initial={false}>
                    {isActive && (
                      <motion.div
                        initial={{ height: 0, opacity: 0 }}
                        animate={{ height: "auto", opacity: 1 }}
                        exit={{ height: 0, opacity: 0 }}
                        transition={{ duration: 0.5, ease: [0.22, 1, 0.36, 1] }}
                        className="overflow-hidden"
                      >
                        {/* Features Grid */}
                        <div className="mt-16 grid sm:grid-cols-2 lg:grid-cols-4 gap-8">
                          {content.features.map((f, i) => (
                            <motion.div
                              key={i}
                              initial={{ opacity: 0, y: 10 }}
                              animate={{ opacity: 1, y: 0 }}
                              transition={{ delay: 0.1 + i * 0.05 }}
                              className="space-y-3 p-6 rounded-2xl bg-white/[0.02] border border-white/5 hover:border-white/10 transition-colors"
                            >
                              <div className="text-[10px] font-mono text-lightblueprimary/60 font-black">CAPABILITY 0{i + 1}</div>
                              <div className="text-sm font-bold text-white tracking-tight">{f.title}</div>
                              <div className="text-[11px] text-white/20 leading-relaxed">{f.description}</div>
                            </motion.div>
                          ))}
                        </div>
                      </motion.div>
                    )}
                  </AnimatePresence>
                </motion.div>
              );
            })}
          </LayoutGroup>
        </div>
      </div>
    </section>
  );
};

export default IndustrialCapital;
