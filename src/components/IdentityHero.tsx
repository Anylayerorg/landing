'use client';

import React from 'react';
import { motion } from 'framer-motion';
import { ArrowRight, Fingerprint, Shield, Award, Globe, Key, Users, Lock, Zap } from 'lucide-react';

const SectionTag = ({ label }: { label: string }) => (
    <div className="inline-flex items-center gap-3 px-3 py-1 rounded-full backdrop-blur-sm border bg-white/[0.02] border-white/5 text-white/40 mb-4">
        <div className="w-1 h-1 rounded-full bg-lightblueprimary" />
        <span className="text-[9px] font-mono uppercase tracking-[0.3em] font-medium">
            {label}
        </span>
    </div>
);

interface IdentityHeroProps {
    onTriggerModal: () => void;
}

export const IdentityHero = ({ onTriggerModal }: IdentityHeroProps) => {
    return (
        <section className="relative min-h-[85vh] flex items-center bg-[#08080C] overflow-hidden pt-32 pb-20">
            {/* Background Atmosphere */}
            <div className="absolute top-0 left-0 w-full h-full pointer-events-none overflow-hidden">
                <div className="absolute top-1/4 -right-1/4 w-[600px] h-[600px] bg-blueprimary/5 blur-[120px] rounded-full" />
                <div className="absolute bottom-0 -left-1/4 w-[500px] h-[500px] bg-lightblueprimary/5 blur-[100px] rounded-full" />
                <div className="absolute top-0 left-0 w-full h-full bg-[url('/circle.jpg')] bg-cover bg-center opacity-[0.05] pointer-events-none" />
                <div className="absolute top-0 left-0 w-full h-full bg-[url('/noise.png')] opacity-[0.03] mix-blend-overlay" />
            </div>

            <div className="max-w-7xl mx-auto px-6 md:px-10 lg:px-20 relative z-10 w-full">
                <div className="flex gap-12 lg:gap-24">
                    {/* Vertical Accent Label */}
                    <div className="hidden lg:flex flex-col items-center gap-6">
                        <div className="h-24 w-px bg-gradient-to-b from-transparent via-white/10 to-white/5" />
                        <span className="text-[10px] font-black uppercase tracking-[0.6em] text-white/10 rotate-180 [writing-mode:vertical-lr] shrink-0">
                            ANYLAYER NETWORK
                        </span>
                        <div className="h-24 w-px bg-gradient-to-t from-transparent via-white/10 to-white/5" />
                    </div>

                    {/* Main Hero Content */}
                    <div className="flex flex-col justify-center">
                        <motion.div
                            initial={{ opacity: 0, x: -20 }}
                            animate={{ opacity: 1, x: 0 }}
                            transition={{ duration: 1.2, ease: [0.16, 1, 0.3, 1] }}
                            className="space-y-12"
                        >
                            <div className="space-y-8">
                                <SectionTag label="CORE PROTOCOL" />
                                <h1 className="text-4xl md:text-6xl lg:text-7xl font-black tracking-tight md:tracking-tighter uppercase leading-[0.9] max-w-4xl text-white">
                                    Be <span className="text-lightblueprimary">Anything.</span>
                                </h1>
                                <p className="text-base md:text-xl text-white/40 max-w-xl leading-relaxed font-light tracking-tight">
                                    Your Identity, Your Control. <span className="text-white/60">Separate reputation from exposure, and trust from fixed addresses with Anylayer Name Service (ANS).</span>
                                </p>
                            </div>

                            <motion.div
                                initial={{ opacity: 0, y: 10 }}
                                animate={{ opacity: 1, y: 0 }}
                                transition={{ delay: 0.6 }}
                                className="flex flex-col sm:flex-row items-center gap-6 sm:gap-8"
                            >
                                <a
                                    href="https://ans.anylayer.org"
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    className="group relative w-full sm:w-auto inline-flex items-center justify-center gap-4 px-10 py-5 rounded-full bg-white text-black transition-all duration-300 hover:bg-white/90 active:scale-[0.98] shadow-[0_0_30px_rgba(255,255,255,0.05)]"
                                >
                                    <span className="text-[11px] font-black uppercase tracking-[0.3em] whitespace-nowrap">
                                        Reserve a Name
                                    </span>
                                    <ArrowRight size={14} className="group-hover:translate-x-1 transition-transform" />
                                </a>

                                <div className="flex items-center gap-6">
                                    {[
                                        { icon: <Zap size={14} />, label: "Instant" },
                                        { icon: <Lock size={14} />, label: "Private" },
                                        { icon: <Globe size={14} />, label: "Native" }
                                    ].map((item, i) => (
                                        <div key={i} className="flex items-center gap-2 text-white/20">
                                            {item.icon}
                                            <span className="text-[9px] font-mono uppercase tracking-widest">{item.label}</span>
                                        </div>
                                    ))}
                                </div>
                            </motion.div>
                        </motion.div>
                    </div>
                </div>

                {/* Feature Strip Overlay */}
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.8, duration: 1 }}
                    className="mt-20 grid grid-cols-2 md:grid-cols-4 gap-px bg-white/5 border border-white/5 rounded-2xl overflow-hidden"
                >
                    {[
                        { label: "IDENTITY SYSTEM", val: ".ANY PAYNAMES", icon: <Fingerprint size={14} /> },
                        { label: "DATA PRIVACY", val: "ZK-REACTION", icon: <Shield size={14} /> },
                        { label: "SOCIAL GRAPH", val: "PORTABLE TRUST", icon: <Award size={14} /> },
                        { label: "GLOBAL RESOLVER", val: "ANY ADDRESS", icon: <Globe size={14} /> }
                    ].map((item, i) => (
                        <div key={i} className="bg-black/40 p-6 space-y-2 cursor-default">
                            <div className="flex items-center justify-between text-[8px] font-mono text-white/20 uppercase tracking-[0.2em]">
                                <span>{item.label}</span>
                                <span className="text-lightblueprimary/40">{item.icon}</span>
                            </div>
                            <p className="text-lg font-black uppercase tracking-tight text-white/90">
                                {item.val}
                            </p>
                        </div>
                    ))}
                </motion.div>
            </div>
        </section>
    );
};
