import { motion } from 'framer-motion';
import Image from 'next/image';
import { useState } from 'react';

const tabs = [
  { id: "defi", label: "DeFi Protocols" },
  { id: "loyalty", label: "Loyalty & Consumer Brands" },
  { id: "rwa", label: "RWA & Insurance Platforms" },
  { id: "users", label: "Everyday Users" },
] as const;

const tabContent = {
  defi: {
    title: "DeFi Protocols",
    description:
      "ZKScore helps lending, trading, and yield platforms build safer, more efficient markets.",
    features: [
      {
        title: "Credible Liquidity Providers",
        description: "Participate in protocol governance and voting.",
      },
      {
        title: "Reputation-Weighted Rewards",
        description: "Participate in protocol governance and voting.",
      },
      {
        title: "Trust-Based LTVs",
        description: "Participate in protocol governance and voting.",
      },
      {
        title: "Wallet-Gated Access",
        description: "Exclusive access for wallets with 2K trust.",
      },
    ],
    diagram: "/dfi-protocols-updated.svg",
  },
  loyalty: {
    title: "Loyalty & Consumer Brands",
    description:
      "Reward real engagement and authenticity by replacing spend-based metrics with wallet-verified reputation.",
    features: [
      {
        title: "Sybil-Resistant Programs",
        description: "Reward authentic users, not bots or fakes.",
      },
      {
        title: "Real Engagement Tracking",
        description: "Track true participation without personal data.",
      },
      {
        title: "Tiered Rewards by Trustscore",
        description: "Reward tiers built on wallet reputation strength.",
      },
      {
        title: "Perks for Loyal Wallets",
        description: "Special perks for long-standing verified wallets.",
      },
    ],
    diagram: "/dfi-protocols-updated.svg",
  },
  rwa: {
    title: "RWA Platforms & Lenders",
    description:
      "Bring transparency, fairness, and efficiency to real-world lending using zk-powered reputation signals.",
    features: [
      {
        title: "Reduced KYC With ZK-Proofs",
        description: "Simplified onboarding without exposing personal info.",
      },
      {
        title: "Trust-Based Underwriting",
        description: "Automated lending powered by wallet trust.",
      },
      {
        title: "Credit Lines for Strong Wallets",
        description: "Instant credit access for credible users.",
      },
      {
        title: "Institutional Trust Benchmark",
        description: "Universal zk trust layer for institutions.",
      },
    ],
    diagram: "/dfi-protocols-updated.svg",
  },
  users: {
    title: "Everyday Users",
    description:
      "Empower users to prove credibility, earn trust, and access better Web3 opportunities privately.",
    features: [
      {
        title: "Prove Credibility Privately",
        description: "Show reliability without sharing private data.",
      },
      {
        title: "Earn Reputation via Activity",
        description: "Gain trust through consistent on-chain actions.",
      },
      {
        title: "Portable Trust Identity",
        description: "One reputation carried across all ecosystems.",
      },
      {
        title: "Unlock Better Rewards",
        description: "Access perks based on earned trustscore.",
      },
    ],
    diagram: "/dfi-protocols-updated.svg",
  },
};

const TabsCard = () => {
    const [activeTab, setActiveTab] = useState<keyof typeof tabContent>("defi");
  return (
    <section
        id="capital"
        className="px-5 py-10 md:py-20 max-w-screen-xl mx-auto overflow-x-hidden"
      >
        <motion.div
          initial={{ opacity: 0, y: 50 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.2 }}
          transition={{ duration: 0.6, delay: 0.1 }} 
          className="mb-3 inline-flex items-center justify-center gap-3 rounded-full bg-white/5 px-6 py-3"
        >
            <span className="text-sm text-white/50">Human, Wallet & AI Agent</span>
        </motion.div>
        <motion.div
          initial={{ opacity: 0, y: 50 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.2 }}
          transition={{ duration: 0.6, delay: 0.2 }}
          className="flex justify-between flex-wrap items-start mb-10"
        >
            <h2 className="text-[1.5rem] md:text-[1.875rem] lg:text-[3.25rem] font-medium text-primaryText leading-tight max-w-[31.438rem] w-full">
            {" "}
            Unlock{" "}
            <span className="bg-gradient-to-r from-blueprimary to-lightblueprimary bg-clip-text text-transparent">
            Capital
            </span>
            , not your data
            </h2>
          {/* <h2 className="text-[52px] md:text-[1.875rem] lg:text-[2.5rem] font-medium text-primaryText mb-3 md:mb-6 leading-tight max-w-[31.438rem] w-full">
            Unlock{" "}
            <span className="bg-gradient-to-r from-indigo-400 to-purple-400 bg-clip-text text-transparent">
              Capital
            </span>
            , not your data
          </h2> */}
          <p className="text-primaryText/60 text-base leading-relaxed md:basis-2/4 max-w-[38rem] w-full">
            Anylayer is more than a credit score for Web3. It's a trust layer
            designed for different groups in the ecosystem, each with unique
            ways to benefit from portable zk-verified reputation.
          </p>
        </motion.div>

        <div className="">
          <motion.div
            initial={{ opacity: 0, y: 50 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.2 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="inline-flex items-center mb-6 bg-[#413D57]/20 p-1.5 rounded-lg overflow-x-auto "
          >
            {tabs.map((tab) => (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id)}
                className={`text-base px-5 py-4 rounded-lg text-center border-none whitespace-nowrap uppercase
                  ${
                    activeTab === tab.id
                      ? "bg-[#ffffff]/10 text-primaryText font-normal"
                      : "text-white/40 opacity-70 font-normal"
                  }`}
              >
                {tab.label}
              </button>
            ))}
          </motion.div>
          {/* Protocols Sec Left */}
          <motion.div
            initial={{ opacity: 0, y: 50 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.2 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className=""
          >
            <div className="grid lg:grid-cols-2 gap-6 md:gap-12 items-start px-6 md:px-10 py-6 md:py-14 rounded-3xl bg-gradient-to-b from-[#413D57]/15 to-transparent">
              <div className="">
                <h2 className="text-[1.5rem] md:text-[1.5rem] lg:text-[2rem] text-primaryText font-medium">
                  {tabContent[activeTab].title}
                </h2>
                <p className="text-primaryText opacity-70 mt-2 md:mt-4">
                  {tabContent[activeTab].description}
                </p>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-y-7 gap-x-4 mt-10">
                  {tabContent[activeTab].features.map((feature, index) => (
                    <div key={index}>
                      <h3 className="text-primaryText font-medium text-base mb-2">
                        {feature.title}
                      </h3>
                      <p className="text-primaryText opacity-70 text-sm leading-relaxed">
                        {feature.description}
                      </p>
                    </div>
                  ))}
                </div>
              </div>
              {/* Protocols Sec Right */}
              {/* border border-[#ffffff1a] rounded-2xl bg-gradient-to-br from-[#0CFF850a] to-[#0000000a] p-6 flex justify-center items-center h-full */}
              {/* <div className="flex justify-center lg:justify-end"> */}
              <motion.div
                initial={{ opacity: 0, y: 50 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, amount: 0.2 }}
                transition={{ duration: 0.6, delay: 0.3 }}
                className="flex justify-center lg:justify-end"
              >
                <Image
                  src={tabContent[activeTab].diagram}
                  alt="Tabs"
                  width="568"
                  height="360"
                  className="w-full h-auto md:h-[340px] object-contain object-right"
                />
              </motion.div>
              {/* </div> */}
            </div>
          </motion.div>
        </div>
      </section>
  )
}

export default TabsCard