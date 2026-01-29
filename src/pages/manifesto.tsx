'use client';

import React, { useState } from 'react';
import Head from 'next/head';
import { motion, AnimatePresence } from 'framer-motion';
import { Layers, Maximize2, ChevronRight, ArrowRight, ArrowUpRight, Shield, Zap, Globe, Cpu, Activity, Database, Workflow, Box, Lock, TrendingUp } from 'lucide-react';
import { SEO } from '@/components/layout/SEO';

/* --- MINIMALIST & BEAUTIFUL SUITE --- */

/* 1. THE GRID OF TRUTH */
const Layout1 = () => (
    <div className="relative h-screen w-full flex items-center justify-center bg-white font-sans selection:bg-blue-100">
        <div className="max-w-screen-xl w-full px-12 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12">
            {[
                { label: "Liquidity", value: "98.4%", desc: "Optimal flow reached via trust-anchored routing." },
                { label: "Settlement", value: "Atomic", desc: "Zero-latency clearing across all connected chains." },
                { label: "Collateral", value: "Adaptive", desc: "Dynamic limits based on real-time reputation." },
                { label: "Efficiency", value: "2.4x", desc: "Multiplied capital utility through trust layer." }
            ].map((item, i) => (
                <motion.div
                    key={i}
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: i * 0.1 }}
                    className="space-y-6"
                >
                    <div className="h-0.5 w-8 bg-black" />
                    <div className="space-y-1">
                        <p className="text-[10px] font-black uppercase tracking-widest text-black/30">{item.label}</p>
                        <h3 className="text-4xl font-black text-black tracking-tighter">{item.value}</h3>
                    </div>
                    <p className="text-sm text-black/50 leading-relaxed font-medium">{item.desc}</p>
                </motion.div>
            ))}
        </div>
    </div>
);

/* 2. HORIZONTAL ARCHITECTURE */
const Layout2 = () => (
    <div className="relative h-screen w-full flex items-center justify-center bg-white px-12">
        <div className="flex flex-col md:flex-row items-center gap-12 text-center md:text-left">
            <div className="flex-1 space-y-4">
                <h1 className="text-6xl md:text-8xl font-black text-black tracking-tightest leading-[0.85] uppercase">TRUST <br /> FLOW.</h1>
                <p className="text-black/40 text-lg md:text-xl font-medium tracking-tight">From Identity to Yield.</p>
            </div>
            <div className="flex-1 space-y-8">
                {[
                    { title: "Identity Layer", desc: "The persistent anchor of all trust signals." },
                    { title: "Reputation Layer", desc: "Dynamic conversion of behavior into ROI." },
                    { title: "Capital Layer", desc: "Maximum efficiency via risk-aware settlement." }
                ].map((step, i) => (
                    <motion.div
                        key={i}
                        initial={{ x: 20, opacity: 0 }}
                        animate={{ x: 0, opacity: 1 }}
                        transition={{ delay: i * 0.2 }}
                        className="flex items-start gap-6 border-l border-black/5 pl-8"
                    >
                        <div className="text-blue-600 font-mono text-xs pt-1">0{i + 1}</div>
                        <div className="space-y-1">
                            <h3 className="text-lg font-black text-black uppercase">{step.title}</h3>
                            <p className="text-sm text-black/40 font-medium">{step.desc}</p>
                        </div>
                    </motion.div>
                ))}
            </div>
        </div>
    </div>
);

/* 3. TYPOGRAPHIC STATEMENT */
const Layout3 = () => (
    <div className="relative h-screen w-full flex items-center justify-center bg-white px-12 text-center md:text-left">
        <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="max-w-5xl space-y-12"
        >
            <h1 className="text-5xl md:text-[7vw] font-black text-black leading-none tracking-tightest uppercase italic">
                Infrastructure <br /> for the <br /> <span className="text-blue-600 not-italic">Efficiency Age.</span>
            </h1>
            <div className="flex flex-col md:flex-row gap-12 pt-12 border-t border-black/5">
                <p className="flex-1 text-black/60 text-lg md:text-xl leading-relaxed font-medium">
                    Anylayer is not just a protocol; it's a fundamental shift in how capital perceives risk. By quantifying trust, we unlock dormant liquidity.
                </p>
                <div className="flex-none flex items-center gap-3 group cursor-pointer">
                    <span className="text-[10px] font-black uppercase tracking-[0.4em]">Read Specs</span>
                    <div className="w-10 h-10 rounded-full border border-black flex items-center justify-center group-hover:bg-black group-hover:text-white transition-all">
                        <ArrowRight size={16} />
                    </div>
                </div>
            </div>
        </motion.div>
    </div>
);

/* 4. THE LAYERED NODE */
const Layout4 = () => (
    <div className="relative h-screen w-full flex items-center justify-center bg-white px-12 overflow-hidden">
        <div className="relative z-10 text-center space-y-12">
            <div className="relative mx-auto w-32 h-32 flex items-center justify-center">
                <motion.div
                    animate={{ scale: [1, 1.2, 1], rotate: [0, 90, 0] }}
                    transition={{ duration: 6, repeat: Infinity }}
                    className="absolute inset-0 border border-black rounded-[2rem]"
                />
                <Box size={32} className="text-blue-600" />
            </div>
            <div className="space-y-4">
                <h1 className="text-6xl md:text-8xl font-black text-black tracking-tightest leading-none uppercase">MODULE <br /> TRUST.</h1>
                <p className="max-w-md mx-auto text-black/40 text-[10px] font-black uppercase tracking-[0.8em]">Atomic Settlement Units</p>
            </div>
            <div className="pt-8 flex justify-center gap-24">
                <div className="text-center">
                    <p className="text-3xl font-black text-black italic">1.2ms</p>
                    <p className="text-[8px] font-black text-black/20 uppercase tracking-widest">Clearing Time</p>
                </div>
                <div className="text-center">
                    <p className="text-3xl font-black text-black italic">99.9%</p>
                    <p className="text-[8px] font-black text-black/20 uppercase tracking-widest">Data Integrity</p>
                </div>
            </div>
        </div>
    </div>
);

/* 5. CAPITAL FLOW */
const Layout5 = () => (
    <div className="relative h-screen w-full flex items-center justify-center bg-white font-mono">
        {/* Animated Line Flow */}
        <div className="absolute inset-0 flex flex-col justify-around py-20 pointer-events-none opacity-[0.05]">
            {[...Array(5)].map((_, i) => (
                <div key={i} className="h-px bg-black relative">
                    <motion.div
                        animate={{ x: [-200, 2000] }}
                        transition={{ duration: 4, repeat: Infinity, delay: i * 0.5 }}
                        className="absolute h-[2px] w-20 bg-blue-600 top-0"
                    />
                </div>
            ))}
        </div>

        <div className="relative z-10 text-center space-y-12">
            <h1 className="text-7xl md:text-[14vw] font-black text-black/5 leading-none absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 select-none">FLOW</h1>
            <div className="space-y-4">
                <div className="inline-block px-4 py-1 border border-black text-[10px] font-black uppercase tracking-widest">Trust Infrastructure</div>
                <h1 className="text-6xl md:text-9xl font-black text-black leading-none tracking-tightest uppercase italic">SOVEREIGN <br /> FLOW.</h1>
            </div>
            <p className="max-w-xs mx-auto text-black/40 text-xs font-black uppercase tracking-widest leading-loose pt-12">
                Unlocking capital efficiency through verified reputation signals and zero-friction settlement nodes.
            </p>
        </div>
    </div>
);

/* 6. EFFICIENCY INDEX */
const Layout6 = () => (
    <div className="relative h-screen w-full flex items-center justify-center bg-[#FAFAFA] font-sans">
        <div className="max-w-screen-md w-full px-12 space-y-24">
            <div className="space-y-4">
                <p className="text-blue-600 text-[10px] font-black uppercase tracking-[1em]">Index Selection // 01</p>
                <h1 className="text-6xl md:text-9xl font-black text-black tracking-tightest leading-[0.8] uppercase">CAPITAL <br /> OPTIMIZER.</h1>
            </div>
            <div className="space-y-12">
                <div className="flex justify-between items-end border-b-2 border-black pb-4">
                    <span className="text-2xl font-black italic">84%</span>
                    <span className="text-[10px] font-black uppercase tracking-widest text-black/30">Current Utilization</span>
                </div>
                <div className="w-full h-1 bg-black/5 rounded-full overflow-hidden">
                    <motion.div
                        initial={{ width: 0 }}
                        animate={{ width: "84%" }}
                        transition={{ duration: 2, ease: "easeOut" }}
                        className="h-full bg-blue-600"
                    />
                </div>
                <p className="text-black/60 text-lg leading-relaxed font-medium">
                    Anylayer enables protocols to increase their capital utilization by up to 2.4x through reputation-based risk mitigation.
                </p>
            </div>
        </div>
    </div>
);

/* 7. TECHNICAL BLUEPRINT */
const Layout7 = () => (
    <div className="relative h-screen w-full flex items-center justify-center bg-white font-mono overflow-hidden">
        <div className="absolute inset-0 opacity-[0.03]" style={{ backgroundImage: 'linear-gradient(rgba(0,0,0,1) 1px, transparent 1px), linear-gradient(90deg, rgba(0,0,0,1) 1px, transparent 1px)', backgroundSize: '40px 40px' }} />

        <div className="relative z-10 grid md:grid-cols-2 gap-24 items-center max-w-7xl w-full px-12">
            <div className="space-y-12">
                <div className="space-y-4">
                    <div className="w-12 h-1 bg-black" />
                    <h2 className="text-blue-600 text-[10px] font-black uppercase tracking-[0.8em]">Schema: Trust-Settlement</h2>
                </div>
                <h1 className="text-6xl md:text-8xl font-black text-black leading-tight tracking-tightest uppercase">THE BLUE <br /> PRINT.</h1>
                <p className="text-black text-sm font-medium leading-relaxed uppercase">Structural integrity for onchain reputation and liquidity settlement.</p>
            </div>

            <div className="p-12 border-2 border-black/5 space-y-8 bg-[#F9F9FB]">
                {[...Array(3)].map((_, i) => (
                    <div key={i} className="flex justify-between items-center group">
                        <div className="space-y-1">
                            <p className="text-[10px] font-black text-black/20 uppercase tracking-widest">Protocol Node 0{i + 1}</p>
                            <h3 className="text-xl font-black text-black group-hover:text-blue-600 transition-colors uppercase">Active.Layer</h3>
                        </div>
                        <ArrowUpRight size={24} className="text-black/20 group-hover:text-blue-600 transition-colors" />
                    </div>
                ))}
            </div>
        </div>
    </div>
);

/* 8. THE CONNECTOR */
const Layout8 = () => (
    <div className="relative h-screen w-full flex items-center justify-center bg-white font-sans">
        <div className="relative max-w-5xl w-full px-12 flex flex-col items-center gap-16">
            <div className="flex items-center gap-20">
                <div className="text-center space-y-2">
                    <div className="text-5xl font-black text-black">Reputation</div>
                    <div className="text-[8px] font-black text-black/20 uppercase tracking-widest">Source Metric</div>
                </div>
                <motion.div animate={{ width: [40, 120, 40] }} transition={{ duration: 2, repeat: Infinity }} className="h-[2px] bg-blue-600" />
                <div className="text-center space-y-2">
                    <div className="text-5xl font-black text-black">Capital</div>
                    <div className="text-[8px] font-black text-black/20 uppercase tracking-widest">Target Yield</div>
                </div>
            </div>
            <div className="text-center space-y-8">
                <h1 className="text-6xl md:text-9xl font-black text-black tracking-tightest leading-none uppercase italic">ZENITH <br /> <span className="not-italic text-blue-600 underline decoration-4 underline-offset-8 decoration-black/5">CONNECTION.</span></h1>
                <p className="max-w-md mx-auto text-black/40 text-xs font-black uppercase tracking-[0.5em] leading-loose">
                    Anylayer is the bridge between verifyed behavior and optimized ROI.
                </p>
            </div>
        </div>
    </div>
);

/* 9. MODULAR TRUST (Bento) */
const Layout9 = () => (
    <div className="relative h-screen w-full flex items-center justify-center bg-[#F4F4F4] px-12">
        <div className="max-w-6xl w-full grid grid-cols-2 md:grid-cols-3 gap-4">
            <div className="col-span-2 p-12 bg-white border border-black/5 rounded-[3rem] space-y-12">
                <h1 className="text-6xl font-black text-black tracking-tighter uppercase leading-none">MODULAR <br /> TRUST AGENTS.</h1>
                <p className="max-w-sm text-black/40 text-sm font-medium leading-relaxed lowercase">Deploy capital efficiency through autonomous modules anchored to physical and digital reputation signals.</p>
            </div>
            <div className="p-8 bg-black text-white rounded-[3rem] flex flex-col justify-between">
                <Shield size={24} className="text-blue-500" />
                <div className="space-y-2">
                    <p className="text-4xl font-black tracking-tighter italic">99.9%</p>
                    <p className="text-[10px] font-black text-white/40 uppercase tracking-widest">Safety Ratio</p>
                </div>
            </div>
            <div className="p-8 bg-[#3B82F6] text-white rounded-[3rem] space-y-4">
                <TrendingUp size={24} />
                <p className="text-xl font-black uppercase tracking-tighter leading-tight">Hyper Scale <br /> Yield.</p>
            </div>
            <div className="col-span-2 p-8 bg-white border border-black/5 rounded-[3rem] flex items-center justify-between">
                <div className="space-y-1">
                    <p className="text-[8px] font-black uppercase tracking-widest text-black/20">Protocol Status</p>
                    <p className="text-lg font-black uppercase text-black">Live on Mainnet</p>
                </div>
                <div className="flex items-center gap-2">
                    {[...Array(4)].map((_, i) => <div key={i} className="w-1.5 h-1.5 rounded-full bg-blue-600" />)}
                </div>
            </div>
        </div>
    </div>
);

/* 10. ZENITH MINIMALISM */
const Layout10 = () => (
    <div className="relative h-screen w-full flex items-center justify-center bg-white font-sans">
        <div className="text-center space-y-12">
            <motion.div
                initial={{ scale: 0, opacity: 0 }}
                animate={{ scale: 1, opacity: 1 }}
                className="mx-auto w-24 h-24 bg-blue-600 rounded-full flex items-center justify-center"
            >
                <div className="w-8 h-8 bg-white rounded-full" />
            </motion.div>
            <div className="space-y-4">
                <h1 className="text-6xl md:text-9xl font-black text-black tracking-tightest uppercase leading-none italic">ZENITH.</h1>
                <div className="flex items-center justify-center gap-4">
                    <div className="h-px w-12 bg-black/10" />
                    <span className="text-[10px] font-black text-black/40 uppercase tracking-[1em]">The End State of Trust</span>
                    <div className="h-px w-12 bg-black/10" />
                </div>
            </div>
        </div>
    </div>
);

const ManifestoPage = () => {
    const [activeLayout, setActiveLayout] = useState(0);
    const [isCollapsed, setIsCollapsed] = useState(false);

    const layouts = [
        { id: 1, name: "The Grid of Truth", component: <Layout1 /> },
        { id: 2, name: "Horizontal Architecture", component: <Layout2 /> },
        { id: 3, name: "Typographic Statement", component: <Layout3 /> },
        { id: 4, name: "The Layered Node", component: <Layout4 /> },
        { id: 5, name: "Capital Flow", component: <Layout5 /> },
        { id: 6, name: "Efficiency Index", component: <Layout6 /> },
        { id: 7, name: "Technical Blueprint", component: <Layout7 /> },
        { id: 8, name: "The Connector", component: <Layout8 /> },
        { id: 9, name: "Modular Trust", component: <Layout9 /> },
        { id: 10, name: "Zenith Minimalism", component: <Layout10 /> }
    ];

    return (
        <div className="relative w-full h-screen overflow-hidden">
            <Head>
                <title>Capital Efficiency | Anylayer Trust Infrastructure</title>
                <meta name="description" content="Minimalist overview of Anylayer's trust infrastructure for high-speed capital." />
            </Head>
            <SEO
                title="Capital Efficiency | Anylayer Trust Infrastructure"
                description="Powering the next generation of capital-efficient protocols through universal trust layers."
                image="/banner.png"
            />

            <AnimatePresence mode="wait">
                <motion.div
                    key={activeLayout}
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    exit={{ opacity: 0 }}
                    transition={{ duration: 0.6, ease: "easeInOut" }}
                    className="w-full h-full"
                >
                    {layouts[activeLayout].component}
                </motion.div>
            </AnimatePresence>

            {/* Layout Selector HUD - BOTTOM LEFT */}
            <div className="fixed bottom-10 left-10 z-[100] flex flex-col items-start gap-4">
                <AnimatePresence>
                    {!isCollapsed && (
                        <motion.div
                            initial={{ opacity: 0, x: -20, scale: 0.9 }}
                            animate={{ opacity: 1, x: 0, scale: 1 }}
                            exit={{ opacity: 0, x: -20, scale: 0.9 }}
                            className="flex flex-col items-start gap-4"
                        >
                            <div className="px-6 py-2 rounded-2xl bg-black/80 backdrop-blur-3xl border border-white/10 shadow-2xl flex items-center gap-1.5 md:gap-4 overflow-x-auto max-w-[90vw]">
                                <div className="flex items-center gap-3 pr-6 border-r border-white/10 shrink-0">
                                    <Layers size={14} className="text-blue-500" />
                                    <span className="text-[9px] font-black text-white uppercase tracking-widest hidden md:inline">Zenith Minimal</span>
                                </div>
                                <div className="flex gap-2">
                                    {layouts.map((l, i) => (
                                        <button
                                            key={i}
                                            onClick={() => setActiveLayout(i)}
                                            className={`w-8 h-8 rounded-lg flex items-center justify-center text-[10px] font-black transition-all shrink-0 ${activeLayout === i ? 'bg-blue-600 text-white' : 'text-white/30 hover:bg-white/5 hover:text-white'}`}
                                        >
                                            {i + 1}
                                        </button>
                                    ))}
                                </div>
                            </div>
                            <div className="text-[9px] font-black text-white/40 uppercase tracking-[0.4em] bg-black/40 px-5 py-1.5 rounded-full border border-white/5 backdrop-blur-md">
                                {layouts[activeLayout].name}
                            </div>
                        </motion.div>
                    )}
                </AnimatePresence>
                <button
                    onClick={() => setIsCollapsed(!isCollapsed)}
                    className="w-10 h-10 rounded-xl bg-black border border-white/10 flex items-center justify-center text-white/40 hover:text-white transition-all shadow-xl"
                >
                    {isCollapsed ? <Maximize2 size={16} /> : <motion.div animate={{ rotate: 180 }}><ChevronRight size={16} /></motion.div>}
                </button>
            </div>
        </div>
    );
};

export default ManifestoPage;
