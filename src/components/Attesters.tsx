'use client';

import React from 'react';
import { motion } from 'framer-motion';
import { ArrowRight } from 'lucide-react';

const Attesters = () => {
    const copy = {
        title: "Become an Attester",
        p1: "Attesters are the backbone of Anylayer. They observe real behavior and turn it into verifiable reputation without exposing raw data.",
        p2: "Any protocol, application, or organization that can verifiably observe real outcomes can become an attester—trust is earned by accuracy, not permission."
    };

    return (
        <section id="attesters" className="relative py-24 md:py-32 px-6 overflow-hidden bg-[#08080C] border-t border-white/5">
            <div className="max-w-screen-xl mx-auto">
                <div className="max-w-4xl mx-auto py-20 border-y border-white/5">
                    <div className="flex flex-col items-center text-center gap-12">
                        <motion.div
                            initial={{ opacity: 0, y: 20 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true }}
                            transition={{ duration: 0.8 }}
                            className="space-y-6"
                        >
                            <h2 className="text-5xl md:text-6xl font-light tracking-tighter text-white uppercase">
                                Attestation
                            </h2>
                            <div className="w-20 h-px bg-white/20 mx-auto" />
                        </motion.div>

                        <motion.p
                            initial={{ opacity: 0, y: 20 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true }}
                            transition={{ duration: 0.8, delay: 0.2 }}
                            className="text-2xl md:text-3xl text-white/60 font-serif lowercase max-w-2xl leading-relaxed"
                        >
                            {copy.p1}
                        </motion.p>

                        <motion.div
                            initial={{ opacity: 0, y: 20 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true }}
                            transition={{ duration: 0.8, delay: 0.4 }}
                            className="flex flex-col md:flex-row items-center gap-8 md:gap-12"
                        >
                            <div className="inline-flex items-center gap-3 px-3 py-1 rounded-full bg-white/[0.02] border border-white/5 backdrop-blur-sm">
                                <div className="w-1 h-1 rounded-full bg-lightblueprimary" />
                                <span className="text-[9px] font-mono uppercase tracking-[0.3em] text-white/40">Earn trust by accuracy, not permission</span>
                            </div>
                            <button className="group flex items-center gap-4 bg-white text-black px-8 py-4 rounded-full hover:bg-white/90 transition-all duration-300 uppercase font-black text-[11px] tracking-[0.2em] shadow-[0_10px_30px_rgba(255,255,255,0.1)]">
                                Become an Attester
                                <ArrowRight size={14} className="group-hover:translate-x-1 transition-transform" />
                            </button>
                        </motion.div>
                    </div>
                </div>
            </div>
        </section>
    );
};

export default Attesters;
