'use client';

import React from 'react';
import { motion } from 'framer-motion';
import Counter from './Counter';

const stats = [
  { value: 3, prefix: '$', suffix: 'T', label: 'Market Coverage' },
  { value: 800, suffix: 'M+', label: 'Verified Wallets' },
  { value: 9000, suffix: '', label: 'Trust Range' },
  { value: 12, suffix: '+', label: 'Live Chains' },
];

const Architecture = () => {

  return (
    <section id="infrastructure" className="relative py-16 md:py-24 px-6 overflow-hidden bg-[#08080C]">
      {/* Decorative Glows */}
      <div className="absolute top-0 left-1/4 w-[500px] h-[500px] bg-blueprimary/10 blur-[120px] rounded-full pointer-events-none" />
      <div className="absolute bottom-0 right-1/4 w-[600px] h-[600px] bg-lightblueprimary/5 blur-[150px] rounded-full pointer-events-none" />

      <div className="max-w-screen-xl mx-auto relative z-10">
        
        {/* Restructured Header & Stats */}
        <div className="flex flex-col gap-12 mb-16 md:mb-20">
          
          {/* Top: Badge, Heading and Description side-by-side */}
          <div className="grid lg:grid-cols-[1.2fr,1fr] gap-12 lg:gap-24 items-end">
            <motion.div
              initial={{ opacity: 0, x: -20 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8 }}
            >
              <div className="flex items-center gap-3 mb-6">
                <div className="w-1.5 h-1.5 rounded-full bg-lightblueprimary shadow-[0_0_12px_rgba(166,131,255,0.8)] animate-pulse" />
                <span className="text-lightblueprimary font-mono text-[10px] uppercase tracking-[0.4em] font-black">Architecture</span>
                <div className="h-px w-8 bg-white/10" />
                <span className="text-white/20 font-mono text-[10px] uppercase tracking-[0.4em]">Infrastructure Layer</span>
              </div>
              <h2 className="text-[2.5rem] md:text-[4.5rem] font-geist font-black uppercase text-primaryText leading-[1.1] tracking-tighter lg:tracking-[-0.05em] mb-0">
                The Credibility <br />
                <span className="text-white/20">Infrastructure</span>
              </h2>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, x: 20 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8, delay: 0.2 }}
              className="pb-2"
            >
              <p className="text-primaryText/40 text-lg md:text-xl font-light leading-relaxed max-w-lg lg:ml-auto lg:text-right">
                Anylayer unifies trust across identities and assets, creating the 
                foundation for capital efficiency in the decentralized world.
              </p>
            </motion.div>
        </div>

          {/* Bottom: Horizontal Small Stats */}
          <div className="flex flex-wrap gap-x-12 gap-y-8">
            {stats.map((stat, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, x: -20 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.1 }}
                className="flex flex-col items-start group"
              >
                <div className="text-xl md:text-2xl font-medium text-primaryText mb-1 group-hover:text-lightblueprimary transition-colors">
                  <Counter value={stat.value} suffix={stat.suffix} prefix={stat.prefix} />
                </div>
                <div className="text-[9px] uppercase tracking-[0.25em] font-bold text-primaryText/20 group-hover:text-primaryText/40 transition-colors">
                  {stat.label}
                </div>
                {/* Underline decorative element */}
                <div className="mt-3 w-8 h-px bg-white/5 group-hover:w-full group-hover:bg-lightblueprimary/30 transition-all duration-500" />
              </motion.div>
          ))}
          </div>
        </div>
      </div>
    </section>
  );
};

export default Architecture;
