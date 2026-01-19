'use client';

import React, { useState, useEffect, useRef } from 'react';
import Head from 'next/head';
import { motion, AnimatePresence } from 'framer-motion';
import { Play, RotateCcw, ChevronRight } from 'lucide-react';

const ACTS = [
    {
        id: 1,
        background: "C:/Users/nwach/.gemini/antigravity/brain/30018565-b1af-411c-b8b5-8237c53ccb01/manifesto_bg_abstract_1_1768726663765.png",
        lines: [
            { text: "THE INTERNET WAS BUILT FOR", type: "mono", delay: 0 },
            { text: "CONNECTIONS.", type: "impact", delay: 0.5 }
        ],
        duration: 3500
    },
    {
        id: 2,
        background: "C:/Users/nwach/.gemini/antigravity/brain/30018565-b1af-411c-b8b5-8237c53ccb01/manifesto_bg_abstract_2_1768726678970.png",
        lines: [
            { text: "BUT IT FORGOT", type: "mono", delay: 0 },
            { text: "IDENTITY.", type: "serif-italic", delay: 0.6 },
            { text: "FRAGMENTED.", type: "glitch", delay: 1.2 },
            { text: "EXPOSED.", type: "glitch", delay: 1.6 }
        ],
        duration: 4500
    },
    {
        id: 3,
        background: "C:/Users/nwach/.gemini/antigravity/brain/30018565-b1af-411c-b8b5-8237c53ccb01/manifesto_bg_abstract_1_1768726663765.png",
        lines: [
            { text: "A WORLD WITHOUT TRUST", type: "impact", delay: 0 },
            { text: "IS NO LONGER SUSTAINABLE.", type: "mono", delay: 1.2 }
        ],
        duration: 4000
    },
    {
        id: 4,
        background: "C:/Users/nwach/.gemini/antigravity/brain/30018565-b1af-411c-b8b5-8237c53ccb01/manifesto_bg_abstract_2_1768726678970.png",
        lines: [
            { text: "INTRODUCING", type: "mono-small", delay: 0 },
            { text: "ANYLAYER", type: "hero", delay: 0.6 }
        ],
        duration: 5000
    },
    {
        id: 5,
        background: "C:/Users/nwach/.gemini/antigravity/brain/30018565-b1af-411c-b8b5-8237c53ccb01/manifesto_bg_abstract_1_1768726663765.png",
        lines: [
            { text: "UNIVERSAL TRUST INFRASTRUCTURE.", type: "impact-small", delay: 0 },
            { text: "PRIVACY-FIRST.", type: "serif-italic-small", delay: 0.8 },
            { text: "VERIFIABLE.", type: "serif-italic-small", delay: 1.4 },
            { text: "HUMAN.", type: "serif-italic-small", delay: 2.0 }
        ],
        duration: 5500
    },
    {
        id: 6,
        background: "C:/Users/nwach/.gemini/antigravity/brain/30018565-b1af-411c-b8b5-8237c53ccb01/manifesto_bg_abstract_2_1768726678970.png",
        lines: [
            { text: ".any", type: "final", delay: 0 }
        ],
        duration: 8000
    }
];

const WordAnimated = ({ text, className, delay, type }: { text: string, className: string, delay: number, type: string }) => {
    const words = text.split(' ');

    return (
        <div className={className}>
            {words.map((word, i) => (
                <motion.span
                    key={i}
                    initial={{ opacity: 0, y: 10, filter: "blur(8px)" }}
                    animate={{ opacity: 1, y: 0, filter: "blur(0px)" }}
                    transition={{
                        duration: 0.4,
                        delay: delay + (i * 0.15),
                        ease: [0.33, 1, 0.68, 1]
                    }}
                    className="inline-block mr-[0.2em] whitespace-nowrap"
                >
                    {word}
                </motion.span>
            ))}
        </div>
    );
};

const VisualBackground = ({ activeAct }: { activeAct: any }) => (
    <div className="absolute inset-0 pointer-events-none overflow-hidden">
        <AnimatePresence mode="wait">
            <motion.div
                key={activeAct?.background}
                initial={{ opacity: 0, scale: 1.1 }}
                animate={{ opacity: 0.4, scale: 1 }}
                exit={{ opacity: 0, scale: 0.95 }}
                transition={{ duration: 2, ease: "easeInOut" }}
                className="absolute inset-0 grayscale contrast-125"
            >
                <img
                    src={activeAct?.background}
                    alt=""
                    className="w-full h-full object-cover"
                />
            </motion.div>
        </AnimatePresence>

        {/* Layers of atmospherics */}
        <div className="absolute inset-0 bg-[#08080C]/80" />
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_50%,transparent_0%,#08080C_100%)]" />

        {/* Moving Scanner */}
        <motion.div
            animate={{ top: ["-20%", "120%"] }}
            transition={{ duration: 6, repeat: Infinity, ease: "linear" }}
            className="absolute left-0 w-full h-px bg-lightblueprimary/30 z-10 shadow-[0_0_15px_1px_rgba(166,131,255,0.4)]"
        />

        {/* Viewfinder Corners */}
        <div className="absolute top-12 left-12 w-12 h-12 border-t border-l border-white/20" />
        <div className="absolute top-12 right-12 w-12 h-12 border-t border-r border-white/20" />
        <div className="absolute bottom-12 left-12 w-12 h-12 border-b border-l border-white/20" />
        <div className="absolute bottom-12 right-12 w-12 h-12 border-b border-r border-white/20" />
    </div>
);

const ManifestoPage = () => {
    const [currentActIndex, setCurrentActIndex] = useState(-1);
    const [isPlaying, setIsPlaying] = useState(false);

    useEffect(() => {
        if (isPlaying && currentActIndex < ACTS.length - 1) {
            const timer = setTimeout(() => {
                setCurrentActIndex(prev => prev + 1);
            }, currentActIndex === -1 ? 0 : ACTS[currentActIndex].duration);
            return () => clearTimeout(timer);
        }
    }, [isPlaying, currentActIndex]);

    const startSequence = () => {
        setIsPlaying(true);
        setCurrentActIndex(0);
    };

    const resetSequence = () => {
        setIsPlaying(false);
        setCurrentActIndex(-1);
    };

    const getLineStyle = (type: string) => {
        switch (type) {
            case "mono": return "font-mono text-xs md:text-lg text-lightblueprimary/50 tracking-[0.5em] uppercase";
            case "mono-small": return "font-mono text-[10px] md:text-xs text-white/30 tracking-[1em] uppercase mb-4";
            case "impact": return "text-4xl md:text-7xl font-black tracking-tighter uppercase leading-none text-white";
            case "impact-small": return "text-2xl md:text-5xl font-black tracking-tighter uppercase leading-none text-white/90";
            case "serif-italic": return "font-serif text-6xl md:text-[10rem] text-lightblueprimary leading-[0.8]";
            case "serif-italic-small": return "font-serif text-xl md:text-3xl text-lightblueprimary/60 block mt-1";
            case "glitch": return "font-mono text-xl md:text-4xl font-bold text-white/40 tracking-[0.3em] uppercase block";
            case "hero": return "text-[12vw] md:text-[12rem] font-black tracking-tighter leading-[0.75] text-white";
            case "final": return "text-[18vw] md:text-[20rem] font-black tracking-tighter leading-none text-lightblueprimary";
            default: return "text-white";
        }
    };

    return (
        <>
            <Head>
                <title>Manifesto | AnyLayer</title>
                <meta name="description" content="Cinematic manifesto animation of the AnyLayer vision." />
            </Head>

            <div className="bg-[#08080C] min-h-screen flex items-center justify-center overflow-hidden font-geist selection:bg-lightblueprimary selection:text-black">

                <VisualBackground activeAct={currentActIndex >= 0 ? ACTS[currentActIndex] : null} />

                {/* Start Overlay */}
                {!isPlaying && (
                    <div className="relative z-50 text-center space-y-16">
                        <motion.div
                            initial={{ opacity: 0, y: 30 }}
                            animate={{ opacity: 1, y: 0 }}
                            className="space-y-6"
                        >
                            <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-white/5 border border-white/10 mb-8 backdrop-blur-md">
                                <div className="w-1.5 h-1.5 rounded-full bg-lightblueprimary animate-pulse" />
                                <span className="text-[10px] font-black uppercase tracking-widest text-white/60">Cinematic Mode // v3.0</span>
                            </div>
                            <h1 className="text-4xl md:text-6xl font-light tracking-tighter text-white">The <span className="font-serif text-lightblueprimary">Manifesto.</span></h1>
                            <p className="text-white/30 text-[10px] uppercase tracking-[0.5em] font-bold">Optimized for high-fidelity screen recording</p>
                        </motion.div>

                        <button
                            onClick={startSequence}
                            className="group relative px-20 py-8 bg-white text-black font-black rounded-full overflow-hidden shadow-2xl hover:scale-105 active:scale-95 transition-all flex items-center gap-6 mx-auto"
                        >
                            <span className="uppercase text-[12px] tracking-[0.6em] relative z-10">Initiate Sequence</span>
                            <ChevronRight size={18} className="group-hover:translate-x-2 transition-transform" />
                        </button>
                    </div>
                )}

                {/* The Acts */}
                <div className="relative z-20 w-full max-w-7xl px-6 flex items-center justify-center min-h-[70vh]">
                    <AnimatePresence mode="wait">
                        {currentActIndex >= 0 && (
                            <motion.div
                                key={currentActIndex}
                                initial={{ opacity: 0 }}
                                animate={{ opacity: 1 }}
                                exit={{ opacity: 0, scale: 1.05, filter: "blur(20px)" }}
                                transition={{ duration: 1.5, ease: [0.16, 1, 0.3, 1] }}
                                className="flex flex-col items-center justify-center gap-8 text-center"
                            >
                                {ACTS[currentActIndex].lines.map((line, i) => (
                                    <WordAnimated
                                        key={`${currentActIndex}-${i}`}
                                        text={line.text}
                                        className={getLineStyle(line.type)}
                                        delay={line.delay}
                                        type={line.type}
                                    />
                                ))}
                            </motion.div>
                        )}
                    </AnimatePresence>
                </div>

                {/* HUD UI */}
                <AnimatePresence>
                    {isPlaying && (
                        <motion.div
                            initial={{ opacity: 0 }}
                            animate={{ opacity: 1 }}
                            className="fixed inset-0 pointer-events-none p-16 z-30"
                        >
                            <div className="h-full border border-white/5 relative">
                                {/* HUD Elements */}
                                <div className="absolute top-8 left-8 flex flex-col gap-1 text-[8px] font-mono text-white/30 uppercase tracking-[0.4em]">
                                    <div>System: ANY_PROTOCOL</div>
                                    <div>Status: RECORDING_ACTIVE</div>
                                </div>
                                <div className="absolute top-8 right-8 text-[8px] font-mono text-white/30 uppercase tracking-[0.4em] text-right">
                                    <div>ACT: 0{currentActIndex + 1}</div>
                                    <div>Sequence: MANIFESTO_FINAL</div>
                                </div>

                                {/* Rotating HUD bits */}
                                <div className="absolute bottom-8 left-8 w-12 h-12 border border-white/10 flex items-center justify-center">
                                    <motion.div
                                        animate={{ rotate: 360 }}
                                        transition={{ duration: 10, repeat: Infinity, ease: "linear" }}
                                        className="w-8 h-8 border border-lightblueprimary/20"
                                    />
                                </div>
                            </div>
                        </motion.div>
                    )}
                </AnimatePresence>

                {/* Reset Control */}
                {isPlaying && (
                    <motion.button
                        initial={{ opacity: 0 }}
                        whileHover={{ opacity: 1 }}
                        onClick={resetSequence}
                        className="fixed bottom-12 left-1/2 -translate-x-1/2 z-50 p-6 rounded-full border border-white/10 text-white/20 hover:text-white hover:border-white/40 transition-all opacity-0 flex items-center gap-4 group"
                    >
                        <RotateCcw size={16} className="group-hover:rotate-[-180deg] transition-transform duration-500" />
                        <span className="text-[10px] font-bold uppercase tracking-widest">Restart Matrix</span>
                    </motion.button>
                )}

                {/* Cinematic Grain */}
                <div className="fixed inset-0 pointer-events-none z-[100] mix-blend-soft-light opacity-10 bg-[url('https://grainy-gradients.vercel.app/noise.svg')]" />
            </div>
        </>
    );
};

export default ManifestoPage;
