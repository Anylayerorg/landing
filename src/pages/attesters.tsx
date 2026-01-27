'use client';

import React, { useState } from 'react';
import Head from 'next/head';
import { motion, AnimatePresence } from 'framer-motion';
import { Header } from '@/components/layout/Header';
import { Footer } from '@/components/layout/Footer';
import { BlogWidget } from '@/components/BlogWidget';
import {
    ArrowRight, Globe, Shield, Zap, CheckCircle2, Loader2, Cpu, Activity,
    Terminal, Layers, Network, Box, Fingerprint, Lock, Share2, Blocks,
    Microscope, Smartphone, Database, Server, HardDrive, Cloud, Building,
    Landmark, Users, Award, Brain, Bot, Sparkles, Layout, Code, ChevronRight
} from 'lucide-react';

// --- SHARED COMPONENTS ---

const SectionLabel = ({ text }: { text: string }) => (
    <div className="inline-flex items-center gap-3 px-4 py-1.5 rounded-full backdrop-blur-sm border bg-[#0A0A0E] border-white/5 text-white/40 mb-3">
        <div className="w-1.5 h-1.5 rounded-full bg-[#A855F7]" />
        <span className="text-[9px] font-mono uppercase tracking-[0.4em] font-medium">
            {text}
        </span>
    </div>
);

const SectionTag = ({ label }: { label: string }) => (
    <div className="inline-flex items-center gap-3 px-4 py-1.5 rounded-full backdrop-blur-sm border bg-[#0A0A0E] border-white/5 text-white/40 mb-4">
        <div className="w-1.5 h-1.5 rounded-full bg-[#A855F7]" />
        <span className="text-[9px] font-mono uppercase tracking-[0.4em] font-medium">
            {label}
        </span>
    </div>
);

const entities = [
    "Decentralized protocols",
    "Applications and platforms",
    "Data and infrastructure providers",
    "Organizations and institutions",
    "AI agent platforms"
];

const registryData = [
    {
        id: "onchain",
        title: "Onchain Signals",
        icon: <Layers size={18} />,
        items: ["Repayments", "Trading Behavior", "Liquidity Participation", "Staking History", "Governance Activity"],
        desc: "Transactional signals parsed from ledger state."
    },
    {
        id: "offchain",
        title: "Offchain Signals",
        icon: <Globe size={18} />,
        items: ["Completed Tasks", "Dispute Outcomes", "Professional Credentials", "Certifications", "Employment Verification", "Platform Achievements"],
        desc: "Attestations from external platforms."
    },
    {
        id: "compliance",
        title: "Compliance & Institutional",
        icon: <Shield size={18} />,
        items: ["KYC/KYB Status", "Eligibility Confirmations", "Allowlist Membership", "Denylist Verification"],
        desc: "Regulatory and organizational verification."
    },
    {
        id: "autonomous",
        title: "Autonomous Systems",
        icon: <Cpu size={18} />,
        items: ["AI Task Success Rates", "Incident Records", "Execution Quality", "Performance Feedback"],
        desc: "Execution metrics from non-human agents."
    }
];

// --- 8 WHO CAN BECOME AN ATTESTER VARIANTS ---

// 1. SWISS LIST: Pure typography, massive text, no containers
const WhoCanBecome_Layout1_SwissList = ({ fadeIn }: any) => (
    <div className="space-y-24">
        <div className="max-w-3xl space-y-8">
            <SectionLabel text="Eligibility & Admission" />
            <h2 className="text-5xl md:text-7xl font-black tracking-tighter uppercase leading-[0.9]">
                Who Can Become <br />
                <span className="text-lightblueprimary">an Attester</span>
            </h2>
            <p className="text-xl md:text-2xl text-white/90 font-bold leading-tight max-w-2xl">
                Any entity that can objectively verify outcomes may apply.
            </p>
        </div>

        <div className="space-y-2">
            {entities.map((entity, i) => (
                <div key={i} className="group flex items-baseline gap-12 py-4 border-b border-white/5">
                    <span className="text-[10px] font-mono text-white/20">MODULE_0{i + 1}</span>
                    <span className="text-3xl md:text-5xl font-black uppercase tracking-tighter text-white/40 group-hover:text-white group-hover:pl-4 transition-all duration-500 cursor-default">
                        {entity}
                    </span>
                </div>
            ))}
        </div>

        <p className="text-sm font-mono text-white/20 uppercase tracking-[0.4em] max-w-xl">
            Trust is earned through accuracy, consistency, and accountability. [Protocol_Level_v0.2]
        </p>
    </div>
);

// 2. ORBITAL HUB: Satellite connectors with thin paths
const WhoCanBecome_Layout2_OrbitalHub = ({ fadeIn }: any) => (
    <div className="relative py-20 overflow-hidden">
        <div className="flex flex-col lg:flex-row items-center gap-20">
            <div className="lg:w-1/2 space-y-8 text-center lg:text-left">
                <SectionLabel text="Eligibility System" />
                <h2 className="text-5xl font-black uppercase tracking-tighter leading-none">
                    Open <br /> Signal <br /> <span className="text-lightblueprimary">Access</span>
                </h2>
                <div className="h-px w-32 bg-lightblueprimary hidden lg:block" />
                <p className="text-white/40 max-w-sm">Any entity that can objectively verify outcomes may apply to the network.</p>
            </div>

            <div className="lg:w-1/2 relative min-h-[500px] w-full flex items-center justify-center">
                {/* Central Core */}
                <div className="w-16 h-16 rounded-full border border-white/20 flex items-center justify-center relative z-10 bg-black shadow-[0_0_50px_rgba(255,255,255,0.05)]">
                    <div className="w-2 h-2 rounded-full bg-lightblueprimary animate-pulse" />
                </div>

                {/* Satellite Items */}
                {entities.map((entity, i) => {
                    const angle = (i * 360) / entities.length;
                    return (
                        <div
                            key={i}
                            className="absolute flex items-center gap-4 group"
                            style={{
                                transform: `rotate(${angle}deg) translate(180px) rotate(-${angle}deg)`
                            }}
                        >
                            <div className="w-2 h-px bg-white/20 group-hover:w-8 transition-all group-hover:bg-lightblueprimary" />
                            <span className="text-[10px] md:text-xs font-black uppercase tracking-widest text-white/30 group-hover:text-white transition-colors whitespace-nowrap">
                                {entity}
                            </span>
                        </div>
                    );
                })}

                {/* Background Ring */}
                <div className="absolute inset-0 m-auto w-[360px] h-[360px] rounded-full border border-white/5 -z-0" />
            </div>
        </div>
        <p className="mt-20 text-center text-[10px] font-mono text-white/10 uppercase tracking-[0.5em]">
            Permissionless Identity // Earned Accountability
        </p>
    </div>
);

// 3. LOGIC PATH: Schematic node flow
const WhoCanBecome_Layout3_LogicPath = ({ fadeIn }: any) => (
    <div className="space-y-32">
        <div className="max-w-2xl space-y-6">
            <h2 className="text-3xl font-black uppercase tracking-tight">ADMISSION_LOGIC_GATE_v1</h2>
            <p className="text-white/30 leading-relaxed">
                Trust within Anylayer is earned through accuracy, consistency, and accountability, not permission. Any entity that can objectively verify outcomes may apply.
            </p>
        </div>

        <div className="flex flex-col gap-px bg-white/5 border-l border-white/5">
            {entities.map((entity, i) => (
                <div key={i} className="group relative bg-black py-10 pl-16 hover:bg-white/[0.02] transition-colors overflow-hidden">
                    <div className="absolute left-0 top-1/2 -translate-y-1/2 w-8 h-px bg-white/20 group-hover:bg-lightblueprimary" />
                    <div className="space-y-2">
                        <span className="text-[9px] font-mono text-lightblueprimary/40">NODE_GATE_0{i + 1}</span>
                        <h3 className="text-2xl font-black uppercase tracking-tighter text-white/80 group-hover:text-white group-hover:translate-x-4 transition-all duration-500">
                            {entity}
                        </h3>
                    </div>
                    <div className="absolute right-0 top-0 bottom-0 w-24 bg-gradient-to-l from-[#A855F7]/10 to-transparent opacity-0 group-hover:opacity-100 transition-opacity" />
                </div>
            ))}
        </div>
    </div>
);

// 4. LAYERED STACK: Depth-based interaction without boxes
const WhoCanBecome_Layout4_LayeredStack = ({ fadeIn }: any) => (
    <div className="flex flex-col md:flex-row gap-20 items-end">
        <div className="md:w-1/3 space-y-12">
            <h2 className="text-6xl font-black leading-none uppercase tracking-tighter">
                Who <br /> Qualifies?
            </h2>
            <div className="space-y-4">
                <div className="w-12 h-1.5 bg-lightblueprimary" />
                <p className="text-white/40 font-light">
                    Any entity that can objectively verify outcomes may apply to become a validator of truth signals.
                </p>
            </div>
        </div>

        <div className="md:w-2/3 space-y-1">
            {entities.map((entity, i) => (
                <motion.div
                    key={i}
                    whileHover={{ x: 20 }}
                    className="relative py-8 flex items-center justify-between border-b border-white/10 group cursor-default"
                >
                    <span className="text-4xl md:text-5xl font-black uppercase tracking-tighter text-white/20 group-hover:text-white transition-colors italic">
                        {entity}
                    </span>
                    <ArrowRight className="opacity-0 group-hover:opacity-100 -translate-x-10 group-hover:translate-x-0 transition-all text-lightblueprimary" size={32} />
                </motion.div>
            ))}
        </div>
    </div>
);

// 5. INDUSTRIAL BLUEPRINT: Technical schematic
const WhoCanBecome_Layout5_IndustrialBlueprint = ({ fadeIn }: any) => (
    <div className="min-h-[600px] border border-white/5 p-12 relative overflow-hidden bg-white/[0.01]">
        {/* Background Grid Lines */}
        <div className="absolute inset-0 opacity-[0.03] pointer-events-none" style={{ backgroundImage: 'radial-gradient(circle, #fff 1px, transparent 1px)', backgroundSize: '40px 40px' }} />

        <div className="relative z-10 flex flex-col justify-between h-full space-y-20">
            <div className="flex justify-between items-start">
                <div className="space-y-4">
                    <span className="text-[10px] font-mono text-lightblueprimary uppercase tracking-[0.5em]">SYSTEM_ENTITIES</span>
                    <h2 className="text-4xl font-black uppercase tracking-tighter">Attestation Protocols</h2>
                </div>
                <div className="text-[9px] font-mono text-white/20 text-right">
                    REF_CODE: AL_ID_2024<br />
                    STATUS: PERMISSIONLESS
                </div>
            </div>

            <div className="flex flex-wrap gap-x-20 gap-y-12">
                {entities.map((entity, i) => (
                    <div key={i} className="group relative">
                        <div className="absolute -left-6 top-1/2 -translate-y-1/2 w-4 h-4 rounded-full border border-white/10 group-hover:border-lightblueprimary transition-colors flex items-center justify-center">
                            <div className="w-1 h-1 rounded-full bg-white/20 group-hover:bg-lightblueprimary" />
                        </div>
                        <span className="text-xl md:text-2xl font-black uppercase tracking-tight text-white/40 group-hover:text-white transition-all">
                            {entity}
                        </span>
                        <div className="mt-2 h-px w-0 group-hover:w-full bg-lightblueprimary transition-all duration-700" />
                    </div>
                ))}
            </div>

            <div className="pt-12 border-t border-white/10 flex flex-col md:flex-row justify-between gap-8 mt-auto">
                <p className="text-sm text-white/30 max-w-sm font-mono uppercase tracking-widest">Trust earned through accuracy and accountability, not permission.</p>
                <div className="flex gap-4">
                    <div className="w-2 h-2 bg-lightblueprimary/20" />
                    <div className="w-2 h-2 bg-lightblueprimary/40" />
                    <div className="w-2 h-2 bg-lightblueprimary/60" />
                </div>
            </div>
        </div>
    </div>
);

// 6. TYPOGRAPHIC SPLIT: 50/50 bold contrast
const WhoCanBecome_Layout6_TypographicSplit = ({ fadeIn }: any) => (
    <div className="flex flex-col lg:flex-row border-y border-white/5">
        <div className="lg:w-1/2 p-12 lg:p-32 lg:border-r border-white/5 bg-white/[0.01]">
            <SectionLabel text="Who Can Apply" />
            <h2 className="text-6xl md:text-8xl font-black uppercase tracking-tighter leading-[0.85] text-white">
                VERIFY <br /> EVERYTHING
            </h2>
            <p className="mt-12 text-lg text-white/40 font-light leading-relaxed max-w-sm">
                Any entity that can objectively verify outcomes may apply. Trust is earned through consistency.
            </p>
        </div>
        <div className="lg:w-1/2 flex flex-col divide-y divide-white/5">
            {entities.map((entity, i) => (
                <div key={i} className="group relative p-12 hover:bg-black transition-all cursor-default overflow-hidden">
                    <span className="text-3xl md:text-5xl font-black uppercase tracking-tighter text-white/10 group-hover:text-lightblueprimary transition-colors italic">
                        {entity}
                    </span>
                    <div className="absolute inset-0 bg-gradient-to-r from-lightblueprimary/[0.02] to-transparent opacity-0 group-hover:opacity-100 transition-opacity" />
                </div>
            ))}
        </div>
    </div>
);

// 7. MINIMAL TIMELINE: Clean vertical alignment
const WhoCanBecome_Layout7_MinimalTimeline = ({ fadeIn }: any) => (
    <div className="max-w-4xl mx-auto py-20">
        <div className="relative border-l border-white/5 pl-20 space-y-32">
            <div className="absolute left-[-5px] top-0 w-[9px] h-[9px] rounded-full bg-lightblueprimary shadow-[0_0_15px_rgba(168,85,247,0.5)]" />
            <div className="space-y-6">
                <SectionLabel text="Network Eligibility" />
                <h2 className="text-5xl font-black uppercase tracking-tighter">WHO QUALIFIES?</h2>
                <p className="text-white/40 max-w-xl">Trust within Anylayer is earned through accuracy and accountability, not permission.</p>
            </div>

            <div className="space-y-20">
                {entities.map((entity, i) => (
                    <div key={i} className="group relative">
                        <div className="absolute left-[-85px] top-1/2 -translate-y-1/2 flex items-center gap-4">
                            <span className="text-[10px] font-mono text-white/10">v0{i + 1}</span>
                            <div className="w-8 h-px bg-white/5 group-hover:bg-lightblueprimary transition-colors" />
                        </div>
                        <span className="text-2xl md:text-4xl font-black uppercase tracking-tighter text-white/30 group-hover:text-white transition-all duration-500">
                            {entity}
                        </span>
                    </div>
                ))}
            </div>
        </div>
    </div>
);

// 8. FLOATING SIGNALS: Static labels with floating category icons
const WhoCanBecome_Layout8_FloatingSignals = ({ fadeIn }: any) => {
    const categoryIcons: Record<string, any[]> = {
        "Decentralized protocols": [Zap, Activity, Cpu, Network, Blocks],
        "Applications and platforms": [Smartphone, Globe, Terminal, Layout, Code],
        "Data and infrastructure providers": [Database, Server, HardDrive, Cloud, Layers],
        "Organizations and institutions": [Building, Landmark, Users, Award, Shield],
        "AI agent platforms": [Brain, Bot, Sparkles, Cpu, Fingerprint]
    };

    return (
        <div className="min-h-[800px] relative flex items-center justify-center p-12">
            <div className="text-center space-y-8 relative z-10 max-w-2xl">
                <SectionLabel text="PERMISSIONLESS ACCESS" />
                <h2 className="text-5xl md:text-7xl font-black uppercase tracking-tighter text-white leading-none">
                    BUILT BY <br /> <span className="text-lightblueprimary">NETWORK SIGNALS</span>
                </h2>
                <p className="text-white/40 mx-auto max-w-md italic">Trust within Anylayer is earned through accuracy, consistency, and accountability, not permission.</p>
            </div>

            {/* Static labels with floating surrounding icons */}
            {entities.map((entity, i) => {
                const positions = [
                    "top-0 left-[-10%]",
                    "top-20 right-[-5%]",
                    "bottom-20 left-0",
                    "bottom-10 right-0",
                    "top-1/2 right-[-10%]"
                ];

                const icons = categoryIcons[entity] || [Sparkles];

                return (
                    <div key={i} className={`absolute hidden lg:block ${positions[i]} z-20`}>
                        {/* The Static Label */}
                        <div className="relative group">
                            <div className="px-8 py-4 border border-white/10 bg-black/40 backdrop-blur-3xl rounded-full hover:border-[#A855F7]/50 transition-all duration-500 shadow-2xl">
                                <span className="text-xs font-black uppercase tracking-[0.2em] text-white/60 group-hover:text-white transition-colors">
                                    {entity}
                                </span>
                            </div>

                            {/* Surrounding Floating Icons */}
                            {icons.map((Icon, idx) => {
                                // Calculate orbital position
                                const angle = (idx * 360) / icons.length;
                                const radius = 80 + (idx * 10);
                                const x = Math.cos((angle * Math.PI) / 180) * radius;
                                const y = Math.sin((angle * Math.PI) / 180) * radius;

                                return (
                                    <motion.div
                                        key={idx}
                                        initial={{ opacity: 0, scale: 0 }}
                                        animate={{
                                            opacity: [0.2, 0.4, 0.2],
                                            scale: [1, 1.1, 1],
                                            x: [x, x + (idx % 2 === 0 ? 10 : -10), x],
                                            y: [y, y + (idx % 2 === 0 ? -10 : 10), y],
                                            rotate: [0, 5, -5, 0]
                                        }}
                                        transition={{
                                            duration: 5 + idx,
                                            repeat: Infinity,
                                            ease: "easeInOut",
                                            delay: idx * 0.2
                                        }}
                                        className="absolute top-1/2 left-1/2 -mt-3 -ml-3 pointer-events-none"
                                    >
                                        <Icon size={14} className="text-[#A855F7]/40 group-hover:text-[#A855F7]/80 transition-colors" />
                                    </motion.div>
                                );
                            })}
                        </div>
                    </div>
                );
            })}
        </div>
    );
};

// --- WHO CAN BECOME SELECTOR ---
const WhoCanBecomeSelector = ({ active, set }: { active: number, set: (i: number) => void }) => (
    <div className="fixed bottom-10 right-10 z-[100] bg-black/80 backdrop-blur-2xl border border-white/10 rounded-2xl p-2 flex gap-1 shadow-2xl">
        {[1, 2, 3, 4, 5, 6, 7, 8].map(i => (
            <button
                key={i} onClick={() => set(i)}
                className={`w-8 h-8 rounded-lg font-black text-xs transition-all ${active === i ? 'bg-white text-black' : 'text-white/40 hover:bg-white/10'}`}
            >
                {i}
            </button>
        ))}
    </div>
);

// --- FINAL REGISTRY LAYOUT: MINIMAL STREAM ---
const RegistryGrid = ({ fadeIn }: any) => (
    <div className="max-w-5xl mx-auto py-8 md:py-12 relative">
        {/* Central Vertical Line */}
        <div className="absolute left-[30px] md:left-1/2 top-0 bottom-0 w-px bg-white/5 shadow-[0_0_15px_rgba(255,255,255,0.02)]" />

        <div className="space-y-20 md:space-y-24">
            {registryData.map((cat, i) => (
                <motion.div
                    key={i} {...fadeIn}
                    className={`flex flex-col md:flex-row gap-8 relative ${i % 2 === 0 ? 'md:flex-row-reverse text-left md:text-right' : 'text-left'}`}
                >
                    {/* Pivot Point */}
                    <div className="absolute left-[30px] md:left-1/2 -translate-x-1/2 top-[-4px] w-3 h-3 rounded-full bg-black border-2 border-[#A855F7] z-10" />

                    <div className="md:w-1/2 flex flex-col gap-3 md:px-8">
                        <div className={`flex ${i % 2 === 0 ? 'md:justify-end' : 'md:justify-start'}`}>
                            <SectionTag label={`Node Sequence 0x0${i + 1}`} />
                        </div>
                        <h3 className="text-xl md:text-2xl font-black uppercase tracking-tight text-white/90 leading-tight">
                            {cat.title}
                        </h3>
                        <p className="text-xs md:text-sm text-white/40 font-light leading-relaxed max-w-sm ml-0 mr-auto md:ml-auto md:mr-0">
                            {cat.desc}
                        </p>
                    </div>

                    <div className={`md:w-1/2 flex items-center md:px-8 ${i % 2 === 0 ? 'md:justify-end' : 'md:justify-start'}`}>
                        <div className={`flex flex-wrap gap-x-6 gap-y-3 ${i % 2 === 0 ? 'md:justify-start' : 'md:justify-end'}`}>
                            {cat.items.map((item, j) => (
                                <motion.span
                                    key={j}
                                    whileHover={{ color: '#fff' }}
                                    className="text-[10px] md:text-xs font-bold uppercase tracking-widest text-white/60 transition-colors cursor-default"
                                >
                                    {item}
                                </motion.span>
                            ))}
                        </div>
                    </div>
                </motion.div>
            ))}
        </div>
    </div>
);





const AttestersPage = () => {
    const [activeWhoCanBecome, setActiveWhoCanBecome] = useState(1);

    const fadeIn = {
        initial: { opacity: 0, y: 20 },
        whileInView: { opacity: 1, y: 0 },
        viewport: { once: true },
        transition: { duration: 1, ease: [0.16, 1, 0.3, 1] }
    } as const;

    return (
        <div className="bg-[#08080C] min-h-screen font-geist text-white selection:bg-lightblueprimary selection:text-black relative overflow-hidden">
            <Head>
                <title>Attesters | Anylayer</title>
                <meta name="description" content="The Infrastructure of Verifiable Truth." />
            </Head>

            <Header />

            <main className="relative z-10 pt-24">
                {/* --- VERTICAL EDGE HERO --- */}
                <section className="min-h-[85vh] flex items-center px-6 md:px-10 lg:px-20 max-w-7xl mx-auto">
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
                                <div className="space-y-10">
                                    <SectionTag label="CORE INFRASTRUCTURE" />
                                    <h1 className="text-4xl md:text-5xl lg:text-6xl font-black tracking-tighter uppercase leading-[0.95] max-w-3xl">
                                        Scale Universal <br />
                                        <span className="text-lightblueprimary">Trust.</span>
                                    </h1>
                                    <p className="text-base md:text-lg text-white/40 max-w-xl leading-relaxed font-light tracking-tight">
                                        Turn real-world outcomes into verifiable truth signals.
                                        <span className="text-white/60"> Secure the layer, define the future.</span>
                                    </p>
                                </div>

                                <motion.div
                                    initial={{ opacity: 0, y: 10 }}
                                    animate={{ opacity: 1, y: 0 }}
                                    transition={{ delay: 0.6 }}
                                    className="flex items-center gap-8"
                                >
                                    <a
                                        href="/contact"
                                        className="group relative inline-flex items-center gap-4 px-10 py-5 rounded-full bg-white text-black transition-all duration-300 hover:bg-white/90 active:scale-[0.98] shadow-[0_0_30px_rgba(255,255,255,0.05)]"
                                    >
                                        <span className="text-[11px] font-black uppercase tracking-[0.3em]">
                                            Get in Touch
                                        </span>
                                        <ArrowRight size={14} className="group-hover:translate-x-1 transition-transform" />
                                    </a>
                                </motion.div>
                            </motion.div>
                        </div>
                    </div>
                </section>

                {/* --- THE DEFINITION --- */}
                <section className="max-w-6xl mx-auto px-6 mb-32 md:mb-48 relative z-20">
                    <div className="grid md:grid-cols-2 gap-20 items-start p-12 md:p-20 rounded-[40px] border border-white/5 bg-black/40 backdrop-blur-xl">
                        <motion.div {...fadeIn} className="space-y-8">
                            <SectionLabel text="System Definition" />
                            <h2 className="text-3xl md:text-4xl lg:text-5xl font-black tracking-tight uppercase leading-[1.1]">
                                The <span className="text-lightblueprimary/60">Verification</span> <br /> Node.
                            </h2>
                            <p className="text-sm md:text-base text-white/40 leading-relaxed">
                                An attester is any protocol, application, or verified organization that stand behind the signals it issues.
                                You are the source of truth in a fragmented world.
                            </p>
                        </motion.div>

                        <motion.div {...fadeIn} transition={{ delay: 0.2 }} className="grid grid-cols-2 gap-6 items-center">
                            {[
                                { icon: <Cpu size={16} />, label: "Protocols" },
                                { icon: <Globe size={16} />, label: "Infras" },
                                { icon: <Activity size={16} />, label: "Signals" },
                                { icon: <Shield size={16} />, label: "Agents" }
                            ].map((item, i) => (
                                <div key={i} className="flex flex-col gap-4 p-6 border border-white/5 rounded-2xl bg-white/[0.02] hover:border-white/10 transition-colors">
                                    <div className="text-lightblueprimary/40">{item.icon}</div>
                                    <span className="text-[10px] font-black uppercase tracking-[0.2em] text-white/30">{item.label}</span>
                                </div>
                            ))}
                        </motion.div>
                    </div>
                </section>

                {/* --- WHO CAN BECOME AN ATTESTER --- */}
                <section className="max-w-6xl mx-auto px-6 mb-32 md:mb-48 relative z-20">
                    <AnimatePresence mode="wait">
                        <motion.div
                            key={activeWhoCanBecome}
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            exit={{ opacity: 0, y: -20 }}
                            transition={{ duration: 0.5, ease: [0.16, 1, 0.3, 1] }}
                        >
                            {activeWhoCanBecome === 1 && <WhoCanBecome_Layout1_SwissList fadeIn={fadeIn} />}
                            {activeWhoCanBecome === 2 && <WhoCanBecome_Layout2_OrbitalHub fadeIn={fadeIn} />}
                            {activeWhoCanBecome === 3 && <WhoCanBecome_Layout3_LogicPath fadeIn={fadeIn} />}
                            {activeWhoCanBecome === 4 && <WhoCanBecome_Layout4_LayeredStack fadeIn={fadeIn} />}
                            {activeWhoCanBecome === 5 && <WhoCanBecome_Layout5_IndustrialBlueprint fadeIn={fadeIn} />}
                            {activeWhoCanBecome === 6 && <WhoCanBecome_Layout6_TypographicSplit fadeIn={fadeIn} />}
                            {activeWhoCanBecome === 7 && <WhoCanBecome_Layout7_MinimalTimeline fadeIn={fadeIn} />}
                            {activeWhoCanBecome === 8 && <WhoCanBecome_Layout8_FloatingSignals fadeIn={fadeIn} />}
                        </motion.div>
                    </AnimatePresence>
                </section>

                {/* --- CONTRIBUTION REGISTRY --- */}
                <section className="max-w-7xl mx-auto px-6 mb-32 md:mb-48 relative">
                    <div className="space-y-32">
                        <motion.div {...fadeIn} className="space-y-10">
                            <SectionLabel text="THE REGISTRY STATUS" />
                            <h2 className="text-4xl md:text-6xl font-black tracking-tighter uppercase leading-[0.8] max-w-6xl">
                                Scale <br />
                                Trust <span className="text-[#A855F7]">Onchain.</span>
                            </h2>
                            <p className="text-lg md:text-xl text-white/40 font-light max-w-2xl leading-relaxed">
                                Universal truth markers across the digital spectrum.
                            </p>
                        </motion.div>

                        <RegistryGrid fadeIn={fadeIn} />

                        <motion.div
                            {...fadeIn}
                            className="p-12 rounded-[32px] border border-white/5 bg-white/[0.01] flex flex-col md:flex-row items-center justify-between gap-10"
                        >
                            <div className="flex items-center gap-6">
                                <div className="w-12 h-12 rounded-2xl bg-lightblueprimary/10 border border-lightblueprimary/20 flex items-center justify-center text-lightblueprimary">
                                    <Lock size={20} />
                                </div>
                                <p className="text-white/40 text-sm font-light max-w-md">
                                    All contributions are transformed into <span className="text-white font-bold">privacy-preserving proofs</span> rather than exposed as raw records.
                                </p>
                            </div>
                            <div className="flex gap-4">
                                <Share2 className="text-white/5" size={20} />
                                <Network className="text-white/5" size={20} />
                                <Fingerprint className="text-white/5" size={20} />
                            </div>
                        </motion.div>
                    </div>
                </section>


                {/* --- CTA SECTION --- */}
                <section id="initiate" className="max-w-3xl mx-auto py-40 px-6 text-center">
                    <motion.div {...fadeIn}>
                        <SectionLabel text="Gateway" />
                        <h2 className="text-4xl md:text-6xl font-black tracking-tight uppercase leading-[1.1] mb-12">
                            Ready to <span className="text-lightblueprimary">Attest?</span>
                        </h2>

                        <a
                            href="/contact"
                            className="group relative inline-flex items-center gap-6 px-12 py-6 rounded-full bg-white text-black transition-all duration-300 hover:bg-white/90 active:scale-[0.98] shadow-[0_0_40px_rgba(255,255,255,0.1)]"
                        >
                            <span className="text-[12px] font-black uppercase tracking-[0.4em]">
                                Get in Touch
                            </span>
                            <ArrowRight size={18} className="group-hover:translate-x-1 transition-transform" />
                        </a>
                    </motion.div>
                </section>

                <div className="border-t border-white/5 pt-20">
                    <BlogWidget
                        category="Reputation Layer" limit={3}
                        title="Attestation Network Updates"
                        subtitle="Latest signals, protocol changes, and attester network news."
                        dark={true}
                    />
                </div>
            </main>

            <WhoCanBecomeSelector active={activeWhoCanBecome} set={setActiveWhoCanBecome} />
            <Footer />
        </div>
    );
};

export default AttestersPage;
