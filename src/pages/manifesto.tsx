'use client';

import React, { useState, useEffect } from 'react';
import Head from 'next/head';
import { motion, AnimatePresence } from 'framer-motion';
import { ChevronRight, Layers, Maximize2, Shield, Globe, Fingerprint, Search, Hammer, Box } from 'lucide-react';

/* --- CORE CONSTANTS --- */
const GLOBAL_NAMES = [
    "human.any", "ai.any", "payment.any", "defi.any", "wallet.any",
    "privacy.any", "proof.any", "trust.any", "anonymous.any", "bitcoin.any"
];

/* --- LAYOUT 1: THE COUNTDOWN MONUMENT --- */
const Layout1 = () => {
    const [count, setCount] = useState(10000);
    useEffect(() => {
        const interval = setInterval(() => {
            setCount(prev => Math.max(9241, prev - Math.floor(Math.random() * 3)));
        }, 3000);
        return () => clearInterval(interval);
    }, []);

    return (
        <div className="relative h-screen w-full flex items-center justify-center bg-[#050505] overflow-hidden font-sans">
            <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_50%,rgba(166,131,255,0.08),transparent_70%)]" />
            <motion.div initial={{ y: 300, opacity: 0, rotateX: 45 }} animate={{ y: 0, opacity: 1, rotateX: 15 }} transition={{ duration: 2, ease: "easeOut" }} style={{ perspective: '2000px' }} className="relative z-10 text-center">
                <div className="mb-8 flex flex-col items-center gap-4">
                    <div className="px-4 py-1 rounded-full border border-lightblueprimary/20 bg-lightblueprimary/5 text-lightblueprimary text-[10px] font-black uppercase tracking-[0.6em]">Airdrop Monument</div>
                    <div className="w-px h-24 bg-gradient-to-b from-lightblueprimary to-transparent" />
                </div>
                <h1 className="text-[12vw] font-black text-white leading-none tracking-tightest uppercase mb-4">{count.toLocaleString()}</h1>
                <h2 className="text-4xl md:text-6xl font-black text-lightblueprimary leading-none uppercase tracking-tighter italic">.ANY IDENTITIES</h2>
                <div className="mt-12 flex justify-center gap-12 text-white/20 font-mono text-[10px] tracking-widest uppercase">
                    <span>Block: 0x918...F2</span>
                    <span>Status: Minting Active</span>
                    <span>Phase: Genesis</span>
                </div>
            </motion.div>
            <div className="absolute bottom-0 w-full h-1/2 bg-gradient-to-t from-lightblueprimary/5 to-transparent pointer-events-none" />
        </div>
    );
};

/* --- LAYOUT 2: MORPHING HANDLE --- */
const Layout2 = () => {
    const [nameIndex, setNameIndex] = useState(0);
    useEffect(() => {
        const interval = setInterval(() => { setNameIndex(prev => (prev + 1) % GLOBAL_NAMES.length); }, 2000);
        return () => clearInterval(interval);
    }, []);

    return (
        <div className="relative h-screen w-full flex items-center justify-center bg-white overflow-hidden font-sans">
            <div className="absolute inset-0 bg-[#F4F4F4]" />
            <motion.div animate={{ rotate: 360 }} transition={{ duration: 20, repeat: Infinity, ease: "linear" }} className="absolute w-[80vw] h-[80vw] border border-black/[0.03] rounded-full" />
            <div className="relative z-10 text-center space-y-24">
                <div className="space-y-4">
                    <div className="text-[10px] font-black text-black uppercase tracking-[0.8em]">Airdrop Sequence // Drop 01</div>
                    <AnimatePresence mode="wait">
                        <motion.h1 key={nameIndex} initial={{ y: 20, opacity: 0, filter: 'blur(10px)' }} animate={{ y: 0, opacity: 1, filter: 'blur(0px)' }} exit={{ y: -20, opacity: 0, filter: 'blur(10px)' }} className="text-6xl md:text-[11vw] font-black text-black leading-none tracking-tighter lowercase">
                            {GLOBAL_NAMES[nameIndex].split('.')[0]}<span className="text-lightblueprimary">.any</span>
                        </motion.h1>
                    </AnimatePresence>
                </div>
                <div className="flex flex-col items-center gap-8">
                    <p className="max-w-md text-black/40 text-sm font-medium uppercase tracking-widest leading-relaxed">10,000 Unique privacy handles coming soon. Secure your name and start building your onchain reputation.</p>
                    <div className="text-4xl font-black text-lightblueprimary tracking-tighter italic">FREE MINT</div>
                </div>
            </div>
        </div>
    );
};

/* --- LAYOUT 3: REFRACTIVE GRID --- */
const Layout3 = () => {
    return (
        <div className="relative h-screen w-full flex items-center justify-center bg-[#08080C] overflow-hidden">
            <div className="absolute inset-0 grid grid-cols-5 md:grid-cols-10 grid-rows-5 gap-4 p-4 opacity-20">
                {[...Array(100)].map((_, i) => (
                    <motion.div key={i} animate={{ opacity: [0.1, 0.4, 0.1], scale: [1, 1.05, 1] }} transition={{ duration: 4, repeat: Infinity, delay: i * 0.05 }} className="border border-white/10 rounded-lg flex items-center justify-center font-mono text-[8px] text-white/40">
                        {GLOBAL_NAMES[i % GLOBAL_NAMES.length]}
                    </motion.div>
                ))}
            </div>
            <div className="relative z-10 text-center space-y-8 bg-black/60 backdrop-blur-3xl p-16 rounded-[4rem] border border-white/5 shadow-huge">
                <h1 className="text-7xl md:text-[10rem] font-black text-white leading-none tracking-tightest uppercase">10,000 <br /> <span className="text-lightblueprimary">SLOTS.</span></h1>
                <p className="text-white/40 text-xs font-black uppercase tracking-[1em]">The Grid of Reputation</p>
            </div>
        </div>
    );
};

/* --- LAYOUT 4: THE MINTING ARM --- */
const Layout4 = () => {
    return (
        <div className="relative h-screen w-full flex items-center justify-center bg-[#F8FAFC] overflow-hidden font-mono">
            <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_50%,rgba(166,131,255,0.05),transparent_70%)]" />
            <div className="relative z-10 text-center space-y-12">
                <motion.div animate={{ y: [0, 50, 0] }} transition={{ duration: 1, repeat: Infinity, ease: "easeInOut" }} className="mx-auto"><Hammer size={80} className="text-black rotate-45" /></motion.div>
                <div className="space-y-4">
                    <h1 className="text-7xl md:text-9xl font-black text-black leading-none uppercase tracking-tighter">FORGING <br /> IDENTITY.</h1>
                    <div className="inline-block px-12 py-3 bg-lightblueprimary text-black font-black uppercase text-xs tracking-[1em] italic">FREE GASLESS MINT</div>
                </div>
                <div className="max-w-xs mx-auto text-black/40 text-[10px] font-black uppercase tracking-widest pt-12">Reserved identities are being forged. 10,000 genesis slots remain.</div>
            </div>
        </div>
    );
};

/* --- LAYOUT 5: REPUTATION PULSE --- */
const Layout5 = () => {
    return (
        <div className="relative h-screen w-full flex items-center justify-center bg-black overflow-hidden">
            <svg className="absolute w-full h-full opacity-20">
                <motion.path d="M 0 500 L 200 500 L 250 400 L 300 600 L 350 500 L 1000 500" fill="none" stroke="#A683FF" strokeWidth="2" initial={{ pathLength: 0, opacity: 0 }} animate={{ pathLength: 1, opacity: 1, x: [0, 1000] }} transition={{ duration: 2, repeat: Infinity, ease: "linear" }} />
            </svg>
            <div className="relative z-10 text-center space-y-12">
                <motion.h1 animate={{ filter: ["blur(0px)", "blur(2px)", "blur(0px)"] }} transition={{ duration: 2, repeat: Infinity }} className="text-8xl md:text-[15rem] font-black text-white leading-none tracking-tightest uppercase">10,000 <br /> <span className="text-lightblueprimary">PULSES.</span></motion.h1>
                <p className="text-white/20 text-xs font-mono uppercase tracking-[1.5em] italic">Living Reputation Protocol</p>
            </div>
        </div>
    );
};

/* --- LAYOUT 6: QUANTUM CARD STACK --- */
const Layout6 = () => {
    return (
        <div className="relative h-screen w-full flex items-center justify-center bg-[#FDFDFD] overflow-hidden">
            <div className="relative w-full max-w-7xl px-12 flex flex-col items-center">
                <div className="relative w-80 h-[480px] perspective-[2000px] mb-24">
                    {[...Array(5)].map((_, i) => (
                        <motion.div key={i} animate={{ rotateY: [0, 360], y: i * -20, z: i * -50 }} transition={{ duration: 10, repeat: Infinity, ease: "linear", delay: i * 0.2 }} className="absolute inset-0 bg-white/20 backdrop-blur-3xl border border-black/5 shadow-huge rounded-[40px] flex items-center justify-center p-12" style={{ transformStyle: 'preserve-3d' }}>
                            <div className="text-center">
                                <h3 className="text-6xl font-black text-black tracking-tightest">.ANY</h3>
                                <div className="text-[10px] font-black text-lightblueprimary uppercase tracking-widest mt-4">TIER: GENESIS</div>
                            </div>
                        </motion.div>
                    ))}
                </div>
                <div className="text-center space-y-4">
                    <h1 className="text-7xl md:text-9xl font-black text-black leading-none uppercase tracking-tighter">THE QUANTUM <br /> DROP.</h1>
                    <p className="text-black/40 text-sm font-black uppercase tracking-[0.8em]">Claim Your Identity Particle</p>
                </div>
            </div>
        </div>
    );
};

/* --- LAYOUT 7: THE IDENTITY HORIZON --- */
const Layout7 = () => {
    return (
        <div className="relative h-screen w-full flex items-center justify-center bg-[#0A0A0E] overflow-hidden">
            <div className="absolute inset-0 bg-gradient-to-b from-transparent via-lightblueprimary/5 to-transparent" />
            <div className="relative z-10 w-full flex flex-col items-center gap-16">
                <div className="flex gap-8 overflow-hidden w-full opacity-10">
                    {[...Array(3)].map((_, i) => (
                        <motion.div key={i} animate={{ x: ["0%", "-100%"] }} transition={{ duration: 20, repeat: Infinity, ease: "linear" }} className="flex gap-8 text-[20vh] font-black text-white uppercase whitespace-nowrap italic">
                            {GLOBAL_NAMES.join(" . ")}
                        </motion.div>
                    ))}
                </div>
                <div className="text-center space-y-6 px-12">
                    <h1 className="text-8xl md:text-[12rem] font-black text-white leading-none tracking-tightest uppercase italic">HORIZON <span className="text-lightblueprimary">10K</span></h1>
                    <p className="text-white/40 text-xl font-light uppercase tracking-[0.5em] max-w-2xl mx-auto">Rising from the fragmented web. Secure your place.</p>
                </div>
                <motion.div animate={{ width: ["0%", "80%", "0%"] }} transition={{ duration: 5, repeat: Infinity, ease: "easeInOut" }} className="h-[2px] bg-lightblueprimary" />
            </div>
        </div>
    );
};

/* --- LAYOUT 8: BINARY VORTEX --- */
const Layout8 = () => {
    return (
        <div className="relative h-screen w-full flex items-center justify-center bg-black overflow-hidden font-mono text-lightblueprimary">
            <motion.div animate={{ rotate: 360 }} transition={{ duration: 60, repeat: Infinity, ease: "linear" }} className="absolute w-[150vw] h-[150vw] flex flex-wrap opacity-20">
                {[...Array(400)].map((_, i) => <div key={i} className="w-12 h-12 flex items-center justify-center text-[10px] font-black">{Math.random() > 0.5 ? '1' : '0'}</div>)}
            </motion.div>
            <div className="relative z-10 text-center space-y-12">
                <h1 className="text-8xl md:text-[18rem] font-black text-white leading-none uppercase tracking-tightest mix-blend-difference">VORTEX</h1>
                <div className="space-y-4">
                    <div className="text-4xl md:text-6xl font-black text-lightblueprimary tracking-tighter uppercase italic">10,000_IDENTITIES</div>
                    <div className="text-[10px] font-black text-white/40 tracking-[1em] uppercase">Forged in the abyss</div>
                </div>
            </div>
        </div>
    );
};

/* --- LAYOUT 9: ARCHITECTURAL BLUEPRINT --- */
const Layout9 = () => {
    return (
        <div className="relative h-screen w-full flex items-center justify-center bg-white overflow-hidden font-sans">
            <div className="absolute inset-0" style={{ backgroundImage: 'linear-gradient(rgba(0,0,0,0.03) 1px, transparent 1px), linear-gradient(90deg, rgba(0,0,0,0.03) 1px, transparent 1px)', backgroundSize: '40px 40px' }} />
            <div className="relative z-10 w-full max-w-6xl px-12 grid md:grid-cols-2 gap-24 items-center">
                <div className="space-y-12">
                    <div className="space-y-4">
                        <div className="w-12 h-1 bg-black" />
                        <h2 className="text-lightblueprimary text-xs font-black uppercase tracking-[0.8em]">Schema: Identity 1.0</h2>
                    </div>
                    <h1 className="text-7xl md:text-9xl font-black text-black leading-tight tracking-tightest uppercase">THE <br /> BLUE <br /> PRINT.</h1>
                    <p className="text-black/40 text-xl font-medium tracking-tight uppercase leading-relaxed max-w-sm">Structural integrity for onchain reputation. 10,000 slots allocated for genesis.</p>
                </div>
                <div className="relative border border-black/5 p-12 bg-white/50 backdrop-blur-xl">
                    <div className="absolute top-0 right-0 p-4 text-[8px] font-mono text-black/20">DOCUMENT_SEQ: 001/10K</div>
                    <div className="space-y-8">
                        <div className="w-full h-48 bg-black/5 relative overflow-hidden">
                            <motion.div animate={{ x: ["-100%", "100%"] }} transition={{ duration: 3, repeat: Infinity, ease: "linear" }} className="absolute inset-0 bg-lightblueprimary/10 border-r-2 border-lightblueprimary" />
                        </div>
                        <div className="grid grid-cols-2 gap-8 text-[10px] font-black uppercase tracking-widest text-black/40">
                            <div className="space-y-2"><div>01 // SYBIL RESISTANCE</div><div>02 // MULTI-LAYER AUTH</div></div>
                            <div className="space-y-2"><div>03 // REPUTATION SCORE</div><div>04 // ZERO KNOWLEDGE</div></div>
                        </div>
                        <div className="pt-8 text-black text-4xl font-black tracking-tighter italic">CLAIM FREE</div>
                    </div>
                </div>
            </div>
        </div>
    );
};

/* --- LAYOUT 10: KINETIC NEBULA --- */
const Layout10 = () => {
    return (
        <div className="relative h-screen w-full flex items-center justify-center bg-[#050505] overflow-hidden">
            <motion.div animate={{ scale: [1, 1.2, 1], rotate: [0, 360] }} transition={{ duration: 20, repeat: Infinity, ease: "linear" }} className="absolute w-[100vw] h-[100vw] bg-[radial-gradient(circle_at_50%_50%,rgba(166,131,255,0.1),transparent_70%)]" />
            <div className="relative z-10 text-center space-y-12">
                <motion.div initial={{ filter: "blur(20px)", opacity: 0 }} animate={{ filter: "blur(0px)", opacity: 1 }} transition={{ duration: 2 }} className="space-y-4">
                    <h1 className="text-8xl md:text-[18rem] font-black text-white leading-none uppercase tracking-tightest">NEBULA</h1>
                    <div className="text-lightblueprimary text-4xl md:text-6xl font-black tracking-tighter uppercase italic">10K_AIRDROP_LIVE</div>
                </motion.div>
                <div className="text-white/20 text-[10px] font-black uppercase tracking-[1em] max-w-xl mx-auto border-t border-white/5 pt-12">Fragments of identity converging into clarity. Secure your star handle.</div>
            </div>
        </div>
    );
};

const ManifestoPage = () => {
    const [activeLayout, setActiveLayout] = useState(0);
    const [isCollapsed, setIsCollapsed] = useState(false);

    const layouts = [
        { id: 1, name: "Countdown Monument", component: <Layout1 /> },
        { id: 2, name: "Morphing Handles", component: <Layout2 /> },
        { id: 3, name: "Refractive Grid", component: <Layout3 /> },
        { id: 4, name: "The Minting Arm", component: <Layout4 /> },
        { id: 5, name: "Reputation Pulse", component: <Layout5 /> },
        { id: 6, name: "Quantum Card Stack", component: <Layout6 /> },
        { id: 7, name: "Identity Horizon", component: <Layout7 /> },
        { id: 8, name: "Binary Vortex", component: <Layout8 /> },
        { id: 9, name: "Architectural Blueprint", component: <Layout9 /> },
        { id: 10, name: "Kinetic Nebula", component: <Layout10 /> }
    ];

    return (
        <div className="relative w-full h-screen overflow-hidden">
            <Head>
                <title>10,000 .ANY Privacy Identities | Airdrop Sequence</title>
                <meta name="description" content="Secure your universal trust handle in the Anylayer genesis airdrop." />
            </Head>
            <AnimatePresence mode="wait">
                <motion.div key={activeLayout} initial={{ opacity: 0, filter: "blur(20px)" }} animate={{ opacity: 1, filter: "blur(0px)" }} exit={{ opacity: 0, filter: "blur(20px)" }} transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }} className="w-full h-full">
                    {layouts[activeLayout].component}
                </motion.div>
            </AnimatePresence>
            <div className="fixed bottom-10 left-10 z-[100] flex flex-col items-start gap-4">
                <AnimatePresence>
                    {!isCollapsed && (
                        <motion.div initial={{ opacity: 0, x: -20, scale: 0.9 }} animate={{ opacity: 1, x: 0, scale: 1 }} exit={{ opacity: 0, x: -20, scale: 0.9 }} className="flex flex-col items-start gap-4">
                            <div className="px-6 py-2 rounded-2xl bg-black/80 backdrop-blur-3xl border border-white/10 shadow-2xl flex items-center gap-1.5 md:gap-4 overflow-x-auto max-w-[90vw]">
                                <div className="flex items-center gap-3 pr-6 border-r border-white/10 shrink-0"><Layers size={14} className="text-lightblueprimary" /><span className="text-[9px] font-black text-white uppercase tracking-widest hidden md:inline">10K Suite</span></div>
                                <div className="flex gap-2">
                                    {layouts.map((l, i) => (
                                        <button key={i} onClick={() => setActiveLayout(i)} className={`w-8 h-8 rounded-lg flex items-center justify-center text-[10px] font-black transition-all shrink-0 ${activeLayout === i ? 'bg-lightblueprimary text-black' : 'text-white/30 hover:bg-white/5 hover:text-white'}`}>
                                            {i + 1}
                                        </button>
                                    ))}
                                </div>
                            </div>
                            <div className="text-[9px] font-black text-white/40 uppercase tracking-[0.4em] bg-black/40 px-5 py-1.5 rounded-full border border-white/5 backdrop-blur-md">{layouts[activeLayout].name}</div>
                        </motion.div>
                    )}
                </AnimatePresence>
                <button onClick={() => setIsCollapsed(!isCollapsed)} className="w-10 h-10 rounded-xl bg-black border border-white/10 flex items-center justify-center text-white/40 hover:text-white transition-all shadow-xl">
                    {isCollapsed ? <Maximize2 size={16} /> : <motion.div animate={{ rotate: 180 }}><ChevronRight size={16} /></motion.div>}
                </button>
            </div>
            <div className="fixed inset-0 pointer-events-none z-[200] opacity-[0.06] mix-blend-multiply bg-[url('https://grainy-gradients.vercel.app/noise.svg')]" />
        </div>
    );
};

export default ManifestoPage;
