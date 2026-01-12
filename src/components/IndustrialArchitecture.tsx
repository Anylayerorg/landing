'use client';

import React from 'react';
import { motion } from 'framer-motion';
import Image from 'next/image';

const layers = [
  {
    id: '01',
    title: 'Identity Layer',
    subtitle: 'zks name service',
    description: 'Enables every participant to mint a digital identity as a human-readable ZKS name',
    icon: '/identity-bgicon.svg',
    visual: '/identity-layer.svg',
  },
  {
    id: '02',
    title: 'Reputation Layer',
    subtitle: 'on-chain trustworthiness',
    description: 'Transforms behavioral, financial, and operational data into a dynamic Trust Score',
    icon: '/reputation-bgicon.svg',
    visual: '/reputation-layer.svg',
  },
  {
    id: '03',
    title: 'Proof layer',
    subtitle: 'Proof of Trust with Privacy',
    description: 'Generate proofs that confirm thresholds without disclosing your data.',
    icon: '/proof-bgicon.svg',
    visual: '/proof-layer.svg',
  },
  {
    id: '04',
    title: 'Utility Layer',
    subtitle: 'Reputation based applications',
    description: 'Build trust-based features with SDKs/APIs and Smart contracts.',
    icon: '/utility-bgicon.svg',
    visual: '/utility-layer.svg',
  }
];

const IndustrialArchitecture = () => {
  return (
    <section id="architecture" className="relative py-24 md:py-48 bg-[#08080C] overflow-hidden">
      {/* Background technical accents */}
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute top-0 left-0 w-full h-full bg-[url('/dotted-pattern.png')] bg-repeat opacity-[0.03]" />
      </div>

      <div className="max-w-screen-xl mx-auto px-6 relative z-10">
        <div className="relative">
          {/* Vertical Connection Line - Progression Indicator */}
          <div className="absolute left-1/2 top-20 bottom-20 w-[1px] bg-gradient-to-b from-white/10 via-lightblueprimary/20 to-white/10 hidden md:block" />

          <div className="grid gap-40 md:gap-64">
            {layers.map((layer, index) => (
              <motion.div 
                key={layer.id}
                initial={{ opacity: 0, y: 60 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-100px" }}
                transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
                className={`relative flex flex-col md:flex-row items-center gap-16 md:gap-32 ${index % 2 === 1 ? 'md:flex-row-reverse' : ''}`}
              >
                {/* Visual Connector Node */}
                <div className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 w-3 h-3 rounded-full bg-lightblueprimary hidden md:block shadow-[0_0_15px_rgba(166,131,255,0.8)] border-4 border-[#08080C] z-20" />

                {/* Technical 3D Visual */}
                <div className="relative flex-1 group">
                  <div className="relative z-10 transition-transform duration-1000 group-hover:scale-110 group-hover:-rotate-3">
                    <Image 
                      src={layer.visual} 
                      alt={layer.title} 
                      width={500} 
                      height={400} 
                      className="w-full h-auto drop-shadow-[0_20px_60px_rgba(166,131,255,0.15)]"
                    />
                  </div>
                  {/* Decorative Elements */}
                  <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[140%] h-[140%] border border-white/[0.03] rounded-full [transform:rotateX(75deg)] pointer-events-none" />
                  <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[80%] h-[80%] bg-lightblueprimary/[0.02] blur-[100px] rounded-full pointer-events-none" />
                </div>

                {/* Content Side */}
                <div className="flex-1 max-w-xl">
                  <div className="flex items-center gap-6 mb-8">
                    <span className="text-5xl md:text-8xl font-medium text-white/[0.03] font-mono leading-none">{layer.id}</span>
                    <div className="h-px flex-1 bg-white/5" />
                  </div>

                  <div className="flex items-start gap-5 mb-8">
                    <div className="w-14 h-14 rounded-2xl bg-white/5 border border-white/10 flex items-center justify-center flex-shrink-0 group-hover:border-lightblueprimary/30 transition-colors">
                      <Image src={layer.icon} alt="" width={28} height={28} className="opacity-60" />
                    </div>
                    <div>
                      <h3 className="text-3xl md:text-5xl font-medium text-primaryText mb-3 tracking-tighter">{layer.title}</h3>
                      <p className="text-lightblueprimary/40 font-mono text-xs uppercase tracking-[0.3em] font-bold">{layer.subtitle}</p>
                    </div>
                  </div>

                  <p className="text-primaryText/40 text-lg md:text-xl font-light leading-relaxed mb-12 pl-0 md:pl-20 border-l border-white/5 ml-0 md:ml-7">
                    {layer.description}
                  </p>

                  <div className="ml-0 md:ml-27 pl-0 md:pl-20">
                    <a
                      href="https://docs.onzks.com"
                      target="_blank"
                      rel="noopener noreferrer"
                      className="group flex items-center gap-6 transition-all"
                    >
                      <span className="text-sm uppercase tracking-[0.25em] font-bold text-white/30 group-hover:text-white transition-colors">Documentation</span>
                      <div className="w-14 h-14 rounded-full border border-white/10 flex items-center justify-center group-hover:border-lightblueprimary group-hover:bg-lightblueprimary/10 transition-all duration-500 shadow-2xl bg-white/[0.02]">
                        <Image src="/button-arrow.svg" alt="arrow" width={16} height={16} className="opacity-30 group-hover:opacity-100 group-hover:translate-x-1.5 transition-all duration-500" />
                      </div>
                    </a>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

export default IndustrialArchitecture;
