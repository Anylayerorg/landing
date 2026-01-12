'use client';

import { Shield, User, Wallet } from 'lucide-react';
import React, { useState } from 'react';
import { motion } from 'framer-motion';
import Counter from './Counter';

const stats = [
  { value: 3, prefix: '$', suffix: 'T', label: 'Market Coverage' },
  { value: 800, suffix: 'M+', label: 'Verified Wallets' },
  { value: 9000, suffix: '', label: 'Trust Range' },
  { value: 12, suffix: '+', label: 'Live Chains' },
];

const Architecture = () => {
  const [activeLayer, setActiveLayer] = useState(1);

  const layers = [
    { 
      id: 0, 
      title: 'Identity Layer', 
      icon: User, 
      color: '#A683FF',
      desc: 'Aggregating cross-chain activity into a singular human-centric identity.'
    },
    { 
      id: 1, 
      title: 'Trust Engine', 
      icon: Shield, 
      color: '#472990',
      desc: 'Zero-knowledge proofs verify credibility without exposing sensitive private data.'
    },
    { 
      id: 2, 
      title: 'Asset Layer', 
      icon: Wallet, 
      color: '#E3E8FF',
      desc: 'Unlocking capital efficiency by linking reputation to multi-chain assets.'
    },
  ];

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
              <div className="mb-6 inline-flex items-center gap-2 rounded-full bg-white/5 border border-white/10 px-4 py-1.5">
                <span className="text-[10px] uppercase tracking-widest font-bold text-white/30">Infrastructure</span>
              </div>
              <h2 className="text-[2.5rem] md:text-[4.5rem] font-medium text-primaryText leading-[1.1] tracking-tighter mb-0">
                The Credibility <br />
                <span className="text-lightblueprimary">Infrastructure</span>
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

        {/* 3D Visual Stack Section - Interactive Glassmorphism */}
        <div className="grid lg:grid-cols-[1fr,1.2fr] gap-12 items-center">
          
          {/* Left: Info Controls (Tabs) */}
          <div className="space-y-4">
            {layers.map((layer) => (
              <button
                key={layer.id}
                onClick={() => setActiveLayer(layer.id)}
                className={`w-full text-left p-8 rounded-[32px] transition-all duration-500 border ${
                  activeLayer === layer.id 
                    ? "bg-white/[0.05] border-white/10 shadow-2xl translate-x-4" 
                    : "bg-transparent border-transparent opacity-40 hover:opacity-60"
                }`}
              >
                <div className="flex items-center gap-6">
                  <div className={`w-12 h-12 rounded-2xl flex items-center justify-center transition-colors ${
                    activeLayer === layer.id ? "bg-lightblueprimary text-black" : "bg-white/5 text-white"
                  }`}>
                    <layer.icon size={24} strokeWidth={1.5} />
                  </div>
                  <div>
                    <h3 className="text-xl font-medium text-primaryText mb-1">{layer.title}</h3>
                    <p className="text-sm text-primaryText/40 font-light leading-relaxed max-w-xs">
                      {layer.desc}
                    </p>
                  </div>
                </div>
              </button>
            ))}
          </div>

          {/* Right: Visual Stack Representation */}
          <div className="relative h-[400px] hidden md:flex items-center justify-center md:-translate-y-20" style={{ perspective: '1000px' }}>
            <div className="relative w-full max-w-[450px]">
              {layers.map((layer, index) => {
                const isSelected = activeLayer === layer.id;
                const offset = index * 60;
                
                return (
                  <motion.div
                    key={layer.id}
                    initial={false}
                    animate={{
                      y: isSelected ? offset - 40 : offset,
                      rotateX: 45,
                      rotateZ: -25,
                      scale: isSelected ? 1.05 : 1,
                      opacity: isSelected ? 1 : 0.3,
                      zIndex: 10 - index,
                    }}
                    transition={{ type: "spring", stiffness: 100, damping: 20 }}
                    className="absolute inset-0 h-64 rounded-[40px] bg-gradient-to-br from-white/[0.08] to-transparent backdrop-blur-xl border border-white/20 shadow-[0_20px_50px_rgba(0,0,0,0.5)] flex items-center justify-center group cursor-pointer"
                    onClick={() => setActiveLayer(layer.id)}
                  >
                    <div className="relative flex flex-col items-center justify-center">
                      <motion.div
                        animate={{ 
                          opacity: isSelected ? 1 : 0,
                          scale: isSelected ? 1 : 0.8
                        }}
                        className="text-center"
                      >
                        <div className={`w-20 h-20 md:w-24 md:h-24 rounded-full border-[6px] flex items-center justify-center mb-6 transition-all duration-500 ${
                          isSelected 
                            ? "border-lightblueprimary/40 bg-lightblueprimary/10 shadow-[0_0_50px_rgba(166,131,255,0.4),inset_0_0_20px_rgba(166,131,255,0.2)]" 
                            : "border-lightblueprimary/10 bg-lightblueprimary/5 shadow-[0_0_20px_rgba(166,131,255,0.1)]"
                        }`}>
                          <layer.icon size={40} className={`transition-all duration-500 ${isSelected ? "text-lightblueprimary scale-110" : "text-lightblueprimary/60"}`} strokeWidth={1.2} />
                        </div>
                        <div className="h-1.5 w-16 bg-lightblueprimary/40 mx-auto rounded-full shadow-[0_0_15px_rgba(166,131,255,0.3)]" />
                      </motion.div>
                    </div>
                    <div className={`absolute inset-0 rounded-[40px] transition-opacity duration-1000 ${
                      isSelected ? "opacity-100" : "opacity-0"
                    } bg-gradient-to-tr from-lightblueprimary/10 via-transparent to-white/5 pointer-events-none`} />
                  </motion.div>
                );
              })}
              <div className="absolute left-1/2 top-0 bottom-0 w-px bg-gradient-to-b from-transparent via-lightblueprimary/20 to-transparent -translate-x-1/2 pointer-events-none" />
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Architecture;
