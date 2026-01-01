'use client';

import { Package, Shield, User, Wallet } from 'lucide-react';
import Image from 'next/image';
import React from 'react';
import { motion } from 'framer-motion';
import Counter from './Counter';
import { SplitGradientText } from './SplitGradientText';

const stats = [
  { value: 3.8, suffix: 'T', label: 'Total Market Coverage' },
  { value: 800, suffix: 'M+', label: 'Addressable Wallets' },
  { value: 9000, suffix: '+', label: 'Trust Score Range' },
  { value: 12, suffix: '+', label: 'Supported Chains' },
];

const features = [
  { icon: User, label: 'Identity' },
  { icon: Shield, label: 'Trust' },
  { icon: Wallet, label: 'Assets' },
  { icon: Package, label: '' },
];

// Animation variants
const fadeUp = {
  hidden: { opacity: 0, y: 24 },
  visible: { opacity: 1, y: 0 },
};

const Architecture = () => {
  return (
    <section className="relative py-20 px-6 overflow-hidden bg-[url('/architecture-bg.png')] bg-no-repeat bg-center bg-cover">
      <div className="max-w-screen-xl mx-auto px-5 relative z-10">
        {/* Right side credibility layer */}
          <div className="absolute right-[2rem] top-14 h-[400px] bottom-0 flex flex-col items-center justify-center opacity-40">
            {/* Top circle */}
            <div className="relative mb-2">
              <div className="w-[112px] h-[112px] rounded-full bg-primaryText/5 border-4 border-primaryText/20 flex items-center justify-center">
                {/* Chevron */}
                <Image src="/architecture-angle.svg" alt="Chevron down" width={60} height={28} />
              </div>
            </div>

            {/* Vertical line */}
            <div className="relative flex-1 w-px bg-primaryText/20">
              {/* Center dot */}
              {/* <div className="absolute top-[250px] -translate-y-1/2 -left-[3px] w-2 h-2 rounded-full bg-primaryText/20" /> */}
            </div>

            {/* Rotated text */}
            <div className="absolute top-2/3 right-[-52px] -translate-y-1/2 rotate-90 origin-center">
              <span className="text-primaryText/60 text-[20px] whitespace-nowrap">
                Credibility Layer
              </span>
            </div>
          </div>

        {/* Header */}
        <div className="mb-20">
          {/* Chip */}
          <motion.div
            variants={fadeUp}
            initial="hidden"
            whileInView="visible"
            viewport={{ amount: 0.6 }}
            transition={{ duration: 0.6, ease: 'easeOut' }}
            className="mb-3 inline-flex items-center justify-center gap-3 rounded-full bg-white/5 px-6 py-3"
          >
            <span className="text-sm text-white/50">Architecture</span>
          </motion.div>

          {/* Heading */}
          <SplitGradientText
            className="text-[36px] font-normal tracking-tighter leading-[100%] max-w-3xl text-primaryText"
            chunks={[
              { type: "text", value: "Anylayer unifies trust across" },
              { type: "gradient", value: "identities and assets" },
              { type: "text", value: "creating the credibility layer needed for" },
              { type: "gradient", value: "capital efficiency" },
              { type: "text", value: "in the digital world." },
            ]}
          />
          {/* <motion.h2
            variants={fadeUp}
            initial="hidden"
            whileInView="visible"
            viewport={{ amount: 0.6 }}
            transition={{ duration: 0.7, delay: 0.1, ease: 'easeOut' }}
            className="text-[36px] font-normal text-primaryText tracking-tighter leading-[100%] max-w-3xl"
          >
            Anylayer unifies trust across{' '}
            <span className="bg-gradient-to-r from-blueprimary to-lightblueprimary bg-clip-text text-transparent">
              identities and assets
            </span>{' '}
            creating the credibility layer needed for{' '}
            <span className="bg-gradient-to-r from-blueprimary to-lightblueprimary bg-clip-text text-transparent">
              capital efficiency
            </span>{' '}
            in the digital world.
          </motion.h2> */}

        </div>

        {/* Stats Grid */}
        <div className="grid grid-cols-2 lg:grid-cols-4 w-[80%] mb-40">
          {stats.map((stat, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ amount: 0.5 }}
              transition={{ duration: 0.6, delay: index * 0.1 }}
            >
              <div className="text-3xl md:text-4xl font-medium text-primaryText">
                <Counter value={stat.value} suffix={stat.suffix} />
              </div>
              <div className="text-primaryText/60 text-lg">
                {stat.label}
              </div>
            </motion.div>
          ))}
        </div>

        {/* Features Flow */}
        <div className="flex items-center justify-center gap-24 flex-wrap lg:flex-nowrap opacity-40">
          {features.map((feature, index) => (
            <React.Fragment key={index}>
              <div className="relative group">
                <div className="relative w-[112px] h-[112px] bg-primaryText/5 border-4 border-primaryText/20 rounded-full flex items-center justify-center transition-all duration-300">
                  <feature.icon
                    className="w-10 h-10 text-primaryText/20"
                    strokeWidth={1.5}
                  />
                </div>
              </div>

              {index < features.length - 1 && (
                <div className="hidden lg:flex relative w-16 items-center justify-center">
                  <span className="absolute -top-8 text-[20px] text-primaryText/60 whitespace-nowrap">
                    {features[index].label}
                  </span>
                  <div className="w-full h-px bg-primaryText/20 absolute min-w-52 top-2" />
                </div>
              )}
            </React.Fragment>
          ))}
        </div>

      </div>
    </section>
  );
};

export default Architecture;
