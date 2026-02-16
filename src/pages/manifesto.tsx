'use client';

import React, { useState, useEffect } from 'react';
import Head from 'next/head';
import { motion, AnimatePresence } from 'framer-motion';
import { SEO } from '@/components/layout/SEO';

const ManifestoPage = () => {
    const names = ["x", "money", "payment", "exchange", "bet", "casino", "game", "whale", "btc", "yap", "pay", "move", "predict"];
    const [index, setIndex] = useState(0);

    useEffect(() => {
        const timer = setInterval(() => {
            setIndex((prev) => (prev + 1) % names.length);
        }, 2000);
        return () => clearInterval(timer);
    }, []);

    return (
        <div className="relative w-full h-screen overflow-hidden">
            <Head>
                <title>Manifesto | Anylayer</title>
                <meta name="description" content="Anylayer Name Service Reservation Event." />
            </Head>
            <SEO
                title="Anylayer Name Service"
                description="Secure your .any name."
                image="/BG.png"
            />


            <div className="relative h-screen w-full flex flex-col items-center justify-center selection:bg-purple-100 font-sans">
                {/* Background Image */}
                <div className="absolute inset-0 z-0">
                    <img
                        src="/BG1.jpg"
                        alt="Background"
                        className="w-full h-full object-cover"
                    />
                </div>

                {/* Header removed as requested */}

                {/* Central Animated Content */}
                <div className="relative flex flex-col items-center gap-8 md:gap-16 w-full px-6">
                    <div className="flex items-baseline justify-center text-6xl md:text-[12vw] font-black tracking-tighter leading-none">
                        <div className="relative inline-flex justify-end overflow-hidden h-[1.1em]">
                            <AnimatePresence mode="wait">
                                <motion.div
                                    key={names[index]}
                                    initial={{ opacity: 0, y: 40 }}
                                    animate={{ opacity: 1, y: 0 }}
                                    exit={{ opacity: 0, y: -40 }}
                                    transition={{ duration: 0.5, ease: [0.16, 1, 0.3, 1] }}
                                    className="flex items-baseline"
                                >
                                    <span className="text-black">{names[index]}</span>
                                    <span className="text-[#A683FF]">.any</span>
                                </motion.div>
                            </AnimatePresence>
                        </div>
                    </div>

                    <div className="max-w-2xl text-center">
                        <p className="text-[10px] md:text-xs font-mono font-bold uppercase tracking-[0.2em] leading-relaxed text-black/40">
                            Reserve a free, privacy-first .any name for you and your AI agent — <br className="hidden md:block" />
                            one identity to build onchain reputation and verify Web2 claims, secured by zero knowledge.
                        </p>
                    </div>
                </div>

                {/* Footer */}
                <div className="absolute bottom-20 md:bottom-32 left-1/2 -translate-x-1/2">
                    <motion.h2
                        animate={{ opacity: [0.5, 1, 0.5] }}
                        transition={{ duration: 2, repeat: Infinity }}
                        className="text-4xl md:text-7xl font-black italic uppercase tracking-tighter text-[#A683FF]"
                    >
                        RESERVATION EVENT
                    </motion.h2>
                </div>
            </div>
        </div>
    );
};

export default ManifestoPage;
