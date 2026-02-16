'use client';

import React from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import Image from 'next/image';
import Link from 'next/link';
import { Header } from '@/components/layout/Header';
import { Footer } from '@/components/layout/Footer';
import ClientsLogo from '@/components/ClientsLogo';
import { BlogWidget } from '@/components/BlogWidget';
import {
    Shield,
    Cpu,
    Fingerprint,
    Zap,
    Activity,
    ShieldCheck,
    Lock,
    ArrowRight,
    Database,
    Search,
    CheckCircle2,
    Terminal,
    Server,
    X,
    Globe,
    Wallet,
    MessageSquare,
    Database as DbIcon,
    FileText
} from 'lucide-react';
import { cn } from '@/lib/utils';

const SectionTag = ({ label, subtitle, theme = 'dark' }: { label: string, subtitle?: string, theme?: 'dark' | 'light' }) => (
    <div className={cn(
        "inline-flex items-center gap-3 px-3 py-1 rounded-full backdrop-blur-sm border",
        theme === 'dark'
            ? "bg-white/[0.02] border-white/5 text-white/40"
            : "bg-black/[0.03] border-black/5 text-black/40"
    )}>
        <div className="w-1 h-1 rounded-full bg-lightblueprimary" />
        <span className="text-[9px] font-mono uppercase tracking-[0.3em] font-medium">
            {label} {subtitle && `// ${subtitle}`}
        </span>
    </div>
);

const LockFeature = ({ title, description, icon: Icon, label }: { title: string, description: string, icon: any, label: string }) => (
    <div className="relative group p-8 bg-[#121119] border border-white/5 rounded-3xl overflow-hidden">
        <div className="absolute top-0 right-0 p-6 opacity-10 group-hover:opacity-20 transition-opacity">
            <Icon size={80} strokeWidth={1} />
        </div>
        <div className="relative z-10 space-y-4">
            <div className="inline-flex items-center gap-2 px-2 py-0.5 rounded-full bg-white/5 border border-white/10">
                <span className="text-[8px] font-mono text-white/30 uppercase tracking-widest">{label}</span>
            </div>
            <h3 className="text-2xl font-black uppercase text-primaryText tracking-tighter">{title}</h3>
            <p className="text-white/40 text-sm leading-relaxed max-w-[280px]">{description}</p>
        </div>
    </div>
);

const AutonomousFrontier = () => {
    const content = {
        description: "For AI agents to handle real money and critical tasks, they need more than just smarts—they need Trust. AnyLayer is the foundational infrastructure that provides the \"Digital Truth.\"",
        ref: "8004/AL-ALPHA-01"
    };

    return (
        <section className="py-32 md:py-60 border-t border-white/5 bg-[#0C0C11] relative overflow-hidden">
            <div className="max-w-7xl mx-auto px-6 flex flex-col lg:flex-row items-start gap-32 relative">
                <div className="lg:w-1/2">
                    <h2 className="text-[10rem] md:text-[15rem] font-black uppercase tracking-tight text-white/5 leading-[0.7] select-none pointer-events-none absolute -left-12 top-20">
                        TRUTH
                    </h2>
                    <div className="relative z-10 space-y-12">
                        <SectionTag label="The Nexus" subtitle="Agentic Economy" />
                        <h3 className="text-5xl md:text-8xl font-black uppercase tracking-tighter leading-none text-white">
                            The <br /> Agentic <br /> <span className="text-lightblueprimary">Economy.</span>
                        </h3>
                    </div>
                </div>
                <div className="lg:w-1/2 pt-24 relative z-10">
                    <div className="p-12 space-y-8">
                        <p className="text-primaryText/40 text-2xl font-medium leading-tight">
                            {content.description}
                        </p>
                        <div className="flex items-center gap-6">
                            <div className="h-px w-20 bg-lightblueprimary" />
                            <span className="text-[10px] font-mono text-lightblueprimary uppercase tracking-[0.5em] font-black">{content.ref}</span>
                        </div>
                    </div>
                </div>
            </div>
        </section>
    );
};

const TrustModelSection = () => {
    const pillars = [
        {
            id: "01",
            category: "Security",
            title: "Hardware Receipt Badge",
            description: "Every valid review is linked to a TEE-signed task receipt via its PaymentTxHash. The system verifies the Hardware Success Proof produced by the NolanOS Agent.",
            icon: ShieldCheck
        },
        {
            id: "02",
            category: "Accountability",
            title: "Reputation Weighting",
            description: "Instead of \"1 User = 1 Vote,\" we use Identity-Weighted Influence. Review impact is a multiplier based on the user's Anylayer trustscore.",
            icon: Activity
        },
        {
            id: "03",
            category: "Objectivity",
            title: "The Audits",
            description: "Specialized Protocol Agents and vetted Community Validators produce Auditor Reports pinned to the top of every profile.",
            icon: FileText
        },
        {
            id: "04",
            category: "Reputation",
            title: "Slashable Feedback",
            description: "Critical reviews are on-chain claims backed by the reviewer’s Reputation. Sabotage findings lead to immediate slashing.",
            icon: Zap
        }
    ];

    return (
        <div className="relative py-24 md:py-48 border-t border-white/5 bg-[#0C0C11] overflow-hidden">
            <div className="absolute inset-0 pointer-events-none">
                <img src="/sideways.jpg" alt="" className="w-full h-full object-cover opacity-20" />
                <div className="absolute inset-0 bg-gradient-to-b from-[#0C0C11] via-transparent to-[#0C0C11]" />
            </div>
            <div className="max-w-7xl mx-auto px-6 relative z-10">
                <div className="mb-24 space-y-4 max-w-2xl">
                    <SectionTag label="Protocol Architecture" />
                    <h2 className="text-4xl md:text-5xl font-black uppercase tracking-tight text-white leading-tight">A systemic approach to autonomous trust.</h2>
                </div>
                <div className="grid grid-cols-1 md:grid-cols-4 gap-12">
                    {pillars.map((pillar, i) => (
                        <div key={i} className="space-y-8 flex flex-col justify-between group">
                            <div className="space-y-6">
                                <SectionTag label={"Protocol Layer 0" + pillar.id} />
                                <h3 className="text-xl font-black text-white uppercase tracking-tight leading-tight">{pillar.title}</h3>
                                <p className="text-primaryText/40 text-sm leading-relaxed">{pillar.description}</p>
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </div>
    );
};

// --- Featured Layout: Orbital Path ---

const OrbitalLayout = ({ features, activeFeature, setActiveFeature }: any) => (
    <div className="relative w-full h-[900px] flex items-center justify-center overflow-visible">
        <div className="absolute inset-x-0 inset-y-0 border border-white/[0.02] rounded-full scale-[1.3] -translate-x-1/2" />

        <div className="relative w-full max-w-5xl h-full flex flex-col justify-center gap-8 md:gap-10 pl-12">
            {features.map((feature: any, i: number) => {
                const angle = (i - activeFeature) * 12;
                const offset = Math.abs(i - activeFeature) * 18;
                return (
                    <motion.div
                        key={i}
                        animate={{
                            rotateX: angle,
                            x: -offset,
                            opacity: Math.max(0.15, 1 - Math.abs(i - activeFeature) * 0.25),
                            scale: 1 - Math.abs(i - activeFeature) * 0.04
                        }}
                        transition={{
                            type: "spring",
                            stiffness: 80,
                            damping: 25,
                            mass: 0.8
                        }}
                        onMouseEnter={() => setActiveFeature(i)}
                        className="cursor-pointer group relative py-2"
                    >
                        <h3 className={cn(
                            "text-4xl md:text-7xl font-black uppercase tracking-tight transition-colors duration-500",
                            activeFeature === i ? "text-lightblueprimary" : "text-white/10"
                        )}>{feature.title}</h3>

                        <div className="h-0 relative">
                            <AnimatePresence>
                                {activeFeature === i && (
                                    <motion.div
                                        initial={{ opacity: 0, y: -10 }}
                                        animate={{ opacity: 1, y: 0 }}
                                        exit={{ opacity: 0, y: -10 }}
                                        className="absolute top-2 left-0 pointer-events-none z-20"
                                    >
                                        <p className="text-white/40 text-lg max-w-md font-medium leading-relaxed">
                                            {feature.description}
                                        </p>
                                    </motion.div>
                                )}
                            </AnimatePresence>
                        </div>
                    </motion.div>
                );
            })}
        </div>
    </div>
);

const NolanOSFrameworkSection = () => {
    const [activeFeature, setActiveFeature] = React.useState(0);

    const features = [
        {
            title: "TEE-Native SDK",
            description: "Wrap your agent in a hardware-secured vault with one line of code.",
            icon: Lock,
        },
        {
            title: "Automatic Attestation",
            description: "Generates 'Proof-of-Compute' receipts for every task, automatically updating your on-chain reputation.",
            icon: ShieldCheck,
        },
        {
            title: "Unified Communication",
            description: "Native support for ERC-8004, MCP, and A2A protocols for seamless agent-to-agent labor.",
            icon: Zap,
        },
        {
            title: "Universal Portability",
            description: "Build once, run on any TEE-enabled cloud or local node with the same trust guarantees.",
            icon: Globe,
        },
        {
            title: "Agent Skills & Blueprints",
            description: "Instantly extend agents capabilities through our ready to use blueprints.",
            icon: Cpu,
        }
    ];

    return (
        <section className="relative py-24 md:py-48 border-t border-white/5 bg-[#0C0C11] overflow-hidden">
            <div className="absolute inset-0 pointer-events-none">
                <img src="/sideways_flipped_right.jpg" alt="" className="w-full h-full object-cover opacity-15" />
                <div className="absolute inset-0 bg-gradient-to-b from-[#0C0C11] via-transparent to-[#0C0C11]" />
            </div>

            <div className="max-w-7xl mx-auto px-6 relative z-10 transition-all duration-700">
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-24 items-start mb-12">
                    <div className="space-y-8">
                        <SectionTag label="Protocol Engine" subtitle="NolanOS v1.0" />
                        <h2 className="text-4xl md:text-7xl font-black uppercase tracking-tighter text-white leading-[0.85]">
                            The NolanOS <br /> Framework.
                        </h2>
                    </div>
                    <div className="pt-4">
                        <p className="text-white/40 text-xl font-medium leading-relaxed max-w-xl">
                            A minimalist Python SDK and orchestration layer that transforms standard models into hardware-verified assets. Pure performance, zero friction.
                        </p>
                    </div>
                </div>

                <div className="relative">
                    <OrbitalLayout
                        features={features}
                        activeFeature={activeFeature}
                        setActiveFeature={setActiveFeature}
                    />
                </div>
            </div>
        </section>
    );
};

const ERC8004Section = () => {
    const features = [
        {
            title: "Agent Wallets",
            description: "Every agent can possess its own verified wallet address, allowing it to autonomously hold funds, pay for compute, and settle transactions.",
            icon: Wallet,
            watermark: "/icons/bitcoin-wallet.svg",
            visual: (
                <div className="w-full h-full flex items-center justify-center font-mono p-8">
                    <div className="w-full max-w-sm space-y-6">
                        <div className="space-y-2">
                            <div className="text-[10px] uppercase font-black tracking-widest text-black/40">Verified_Identity</div>
                            <div className="text-sm font-bold truncate p-4 bg-black/5 rounded-xl border border-black/5">
                                0x71C7656EC7ab88b098defB751B7401B5f6d8976F
                            </div>
                        </div>
                        <div className="flex items-center justify-between p-4 border border-black/[0.03] rounded-xl">
                            <div className="text-[10px] uppercase font-black tracking-widest text-black/40">Asset_Type</div>
                            <div className="text-xs font-bold uppercase">ERC-8004 COMPLIANT</div>
                        </div>
                        <motion.div
                            animate={{ opacity: [0.4, 1, 0.4] }}
                            transition={{ duration: 2, repeat: Infinity }}
                            className="flex items-center gap-2"
                        >
                            <div className="w-1.5 h-1.5 rounded-full bg-emerald-500" />
                            <span className="text-[10px] uppercase font-black tracking-widest text-emerald-600/60">Registry_Status: Verified</span>
                        </motion.div>
                    </div>
                </div>
            )
        },
        {
            title: "A2A Commerce",
            description: "Standardized communication allows agents to 'hire' other agents, building a high-velocity economy without human bottlenecks.",
            icon: MessageSquare,
            watermark: "/icons/A2A.svg",
            visual: (
                <div className="w-full h-full flex items-center justify-center font-mono">
                    <div className="space-y-4 w-full max-w-xs">
                        <div className="flex items-center justify-between text-[10px] uppercase font-black tracking-widest text-black/40 px-2">
                            <span>Source_Agent</span>
                            <span>Target_Agent</span>
                        </div>
                        <div className="relative py-4">
                            <div className="flex justify-between items-center relative z-10">
                                <div className="w-12 h-12 bg-black rounded-lg text-white flex items-center justify-center text-[10px] font-bold">AL-01</div>
                                <div className="flex-1 px-4 relative">
                                    <div className="h-px bg-black/5 w-full relative">
                                        <motion.div
                                            animate={{ left: ["0%", "100%"] }}
                                            transition={{ duration: 2, repeat: Infinity, ease: "linear" }}
                                            className="absolute top-1/2 -translate-y-1/2 w-8 h-px bg-lightblueprimary"
                                        />
                                    </div>
                                </div>
                                <div className="w-12 h-12 border border-black/10 rounded-lg flex items-center justify-center text-[10px] font-bold">AL-02</div>
                            </div>
                        </div>
                        <div className="p-3 bg-black/5 rounded-lg space-y-2">
                            <div className="flex justify-between text-[9px]">
                                <span className="text-black/40">SERVICE</span>
                                <span className="uppercase">Compute_Task</span>
                            </div>
                            <div className="flex justify-between text-[9px]">
                                <span className="text-black/40">SETTLEMENT</span>
                                <span className="uppercase">0.024 ANY</span>
                            </div>
                        </div>
                    </div>
                </div>
            )
        },
        {
            title: "Model Context Protocol (MCP)",
            description: "Native support for cross-model data exchange, ensuring your agent can seamlessly integrate with any AI tool or knowledge base.",
            icon: DbIcon,
            watermark: "/icons/MCP.svg",
            visual: (
                <div className="w-full h-full flex items-center justify-center font-mono text-[11px]">
                    <div className="max-w-xs w-full space-y-4 opacity-80">
                        <div className="text-black/40"># Protocol_Handshake</div>
                        <div className="space-y-1">
                            <div className="text-blue-600">const<span className="text-black"> response = </span>await<span className="text-black"> mcp.call(</span></div>
                            <div className="pl-4">task: <span className="text-emerald-600">"data_retrieval"</span>,</div>
                            <div className="pl-4">context: <span className="text-emerald-600">"active_session_42"</span></div>
                            <div>)</div>
                        </div>
                        <div className="h-px bg-black/[0.03] w-full" />
                        <div className="grid grid-cols-2 gap-2 text-[9px] uppercase font-black tracking-widest">
                            <div className="p-2 border border-black/5 rounded-md text-center">GPT-4o</div>
                            <div className="p-2 border border-black/5 rounded-md text-center">Claude 3.5</div>
                        </div>
                    </div>
                </div>
            )
        },
        {
            title: "Machine-Precision Reputation",
            description: "Provides granular, machine-readable performance data (e.g., precise uptime, latency, and success rates) instead of subjective human ratings.",
            icon: Activity,
            watermark: "/icons/reputation.svg",
            visual: (
                <div className="w-full h-full flex items-center justify-center font-mono">
                    <div className="grid grid-cols-2 gap-4 w-full max-w-xs">
                        {[
                            { label: 'Uptime', val: '99.99%', color: 'text-emerald-600' },
                            { label: 'Latency', val: '14ms', color: 'text-blue-600' },
                            { label: 'Success', val: '100%', color: 'text-emerald-600' },
                            { label: 'Load', val: '0.42', color: 'text-black/60' }
                        ].map((stat, i) => (
                            <div key={i} className="p-4 bg-white border border-black/[0.03] rounded-xl space-y-1">
                                <div className="text-[9px] uppercase font-black tracking-widest text-black/30">{stat.label}</div>
                                <div className={cn("text-xs font-black", stat.color)}>{stat.val}</div>
                            </div>
                        ))}
                    </div>
                </div>
            )
        }
    ];

    return (
        <section className="py-24 md:py-48 border-t border-black/[0.03] bg-white overflow-hidden relative">
            <div className="max-w-7xl mx-auto px-6 relative z-10">
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-24 items-start mb-32">
                    <div className="space-y-8">
                        <SectionTag label="Global Standard" subtitle="ERC-8004" theme="light" />
                        <h2 className="text-4xl md:text-7xl font-black uppercase tracking-tighter text-black leading-[0.85]">
                            Digital <br /> Personhood.
                        </h2>
                    </div>
                    <div className="pt-4">
                        <p className="text-black/40 text-xl font-medium leading-relaxed max-w-xl">
                            AnyLayer is fully compliant with ERC-8004, the definitive framework for autonomous AI identity and interoperability across the decentralized ecosystem.
                        </p>
                    </div>
                </div>

                <div className="max-w-4xl mx-auto space-y-12">
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-x-24 gap-y-16 items-stretch">
                        {features.map((f, i) => {
                            const isA2A = f.title === "A2A Commerce";
                            return (
                                <div
                                    key={i}
                                    className={cn(
                                        "relative group space-y-4 overflow-hidden transition-all duration-500",
                                        isA2A
                                            ? "bg-[#A683FF] shadow-[0_30px_60px_rgba(166,131,255,0.25)] rounded-[40px] py-12 px-10"
                                            : "py-4 px-1"
                                    )}
                                >
                                    {isA2A && (
                                        <>
                                            <div className="absolute inset-0 bg-gradient-to-br from-white/[0.1] to-transparent pointer-events-none" />
                                            <div className="absolute inset-y-0 left-0 w-px bg-gradient-to-b from-white/[0.2] to-transparent" />
                                        </>
                                    )}
                                    <div className={cn(
                                        "absolute top-1/2 -translate-y-1/2 pointer-events-none transition-all duration-700",
                                        isA2A ? "-right-6" : "-right-8"
                                    )}>
                                        {f.watermark ? (
                                            <img
                                                src={f.watermark}
                                                alt=""
                                                className={cn(
                                                    "w-24 h-24 transition-all duration-700",
                                                    isA2A
                                                        ? "opacity-[0.2] group-hover:opacity-[0.3] brightness-0"
                                                        : "opacity-[0.6] group-hover:opacity-[0.8] [filter:invert(62%)_sepia(87%)_saturate(3025%)_hue-rotate(226deg)_brightness(101%)_contrast(101%)]"
                                                )}
                                            />
                                        ) : (
                                            <div className={cn(
                                                "transition-opacity duration-700",
                                                isA2A
                                                    ? "text-black opacity-[0.2] group-hover:opacity-[0.3]"
                                                    : "text-lightblueprimary opacity-[0.6] group-hover:opacity-[0.8]"
                                            )}>
                                                <f.icon size={120} />
                                            </div>
                                        )}
                                    </div>
                                    <h3 className={cn("text-2xl md:text-3xl font-black uppercase tracking-tight pr-8 transition-transform group-hover:translate-x-1 duration-300 relative z-10", isA2A ? "text-black" : "text-black")}>
                                        {f.title}
                                    </h3>
                                    <p className={cn("text-sm leading-relaxed relative z-10", isA2A ? "text-black/70 font-medium" : "text-black/40")}>
                                        {f.description}
                                    </p>
                                </div>
                            );
                        })}
                    </div>
                </div>
            </div>
        </section>
    );
};

const FocusedRevealLayout = ({ primitives }: any) => {
    const [hovered, setHovered] = React.useState(0);
    return (
        <div className="flex flex-col lg:flex-row h-[600px] border border-black/10 rounded-[32px] overflow-hidden shadow-[0_60px_100px_rgba(0,0,0,0.1)] bg-black/[0.01] p-2 gap-2">
            {primitives.map((p: any, i: number) => (
                <motion.div
                    key={i}
                    onMouseEnter={() => setHovered(i)}
                    className="flex-1 relative rounded-2xl cursor-pointer overflow-hidden bg-white border border-black/5"
                    animate={{
                        flex: hovered === i ? 5 : 1,
                        backgroundColor: hovered === i ? "#fff" : "#fafafa"
                    }}
                    transition={{
                        type: "spring",
                        stiffness: 150,
                        damping: 25,
                        mass: 0.8
                    }}
                >
                    <div className="absolute inset-0 p-12 flex flex-col justify-between">
                        <div className="relative">
                            <span className="text-7xl font-black text-black/[0.03] transition-colors duration-500">0{i + 1}</span>
                            <motion.div
                                animate={{
                                    opacity: hovered === i ? 1 : 0,
                                    y: hovered === i ? 0 : 20
                                }}
                                transition={{
                                    duration: 0.5,
                                    ease: [0.23, 1, 0.32, 1],
                                    delay: hovered === i ? 0.1 : 0
                                }}
                                className="absolute top-4 left-0 pointer-events-none"
                            >
                                <SectionTag label={p.id} theme="light" />
                                <h3 className="text-4xl font-black uppercase tracking-tighter text-black mt-6 leading-none">{p.title}</h3>
                            </motion.div>
                        </div>

                        <motion.div
                            animate={{
                                opacity: hovered === i ? 1 : 0,
                                y: hovered === i ? 0 : 40
                            }}
                            transition={{
                                duration: 0.7,
                                ease: [0.23, 1, 0.32, 1],
                                delay: hovered === i ? 0.2 : 0
                            }}
                            className="pointer-events-none"
                        >
                            <p className="text-black/50 text-xl font-medium leading-tight max-w-md border-l-4 border-lightblueprimary pl-8 italic">"{p.description}"</p>
                            <button className="mt-12 flex items-center gap-4 text-black font-black uppercase text-xs tracking-widest group pointer-events-auto">
                                <span className="border-b-2 border-lightblueprimary pb-1 group-hover:tracking-[0.2em] transition-all">{p.buttonLabel}</span>
                                <div className="p-2 bg-black rounded-full text-white group-hover:rotate-45 transition-transform"><ArrowRight size={16} /></div>
                            </button>
                        </motion.div>

                        <AnimatePresence>
                            {hovered !== i && (
                                <motion.div
                                    initial={{ opacity: 0 }}
                                    animate={{ opacity: 1 }}
                                    exit={{ opacity: 0 }}
                                    className="absolute inset-0 flex items-center justify-center rotate-90"
                                >
                                    <span className="text-sm font-black uppercase tracking-[0.5em] text-black/20 whitespace-nowrap">{p.title}</span>
                                </motion.div>
                            )}
                        </AnimatePresence>
                    </div>
                </motion.div>
            ))}
        </div>
    );
};

const TechnicalPrimitivesSection = () => {
    const primitives = [
        {
            id: "x402",
            title: "On-Chain Payments",
            description: "Built-in cryptographic accounts allowing agents to receive fees and settle debts without human intervention.",
            buttonLabel: "Provision Payment Vault"
        },
        {
            id: "SYBIL",
            title: "Anti-Spam & Sybil Protection",
            description: "Identity-weighted governance that scales influence by the entity's IdentitySBT score.",
            buttonLabel: "Verify Reputation Proof"
        },
        {
            id: "INTEROP",
            title: "Interoperable Metadata",
            description: "Universal data schemas that ensure agent intent is understood across different LLMs and platforms.",
            buttonLabel: "Explore Cross-Chain Metadata"
        },
        {
            id: "REG",
            title: "Multi-chain Agent Registry",
            description: "A unified discovery layer for agents operating across all supported blockchain networks.",
            buttonLabel: "Browse Global Registry"
        },
        {
            id: "A2A",
            title: "Recursive A2A Commerce",
            description: "Standardized APIs that allow agents to autonomously hire and pay other agents.",
            buttonLabel: "Execute A2A Transaction"
        },
        {
            id: "NOLANOS",
            title: "The Auditor NolanOS Benchmarks",
            description: "Objective technical reports (latency, uptime, accuracy) pinned to the top of profiles.",
            buttonLabel: "View Performance Audits"
        },
        {
            id: "PROOF",
            title: "Proof-of-Compute Receipts",
            description: "TEE-signed cryptographic attestations for every successful task completed.",
            buttonLabel: "Download Proof Bundle"
        }
    ];

    return (
        <section className="py-24 md:py-48 bg-white border-t border-black/5 overflow-hidden relative">
            <div className="max-w-7xl mx-auto px-6 relative z-10">
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-24 items-start mb-24">
                    <div className="space-y-8">
                        <SectionTag label="Technical Primitives" subtitle="Infrastructure" theme="light" />
                        <h2 className="text-4xl md:text-7xl font-black uppercase tracking-tighter text-black leading-[0.85]">
                            Functional <br /> Environment.
                        </h2>
                    </div>
                    <div className="pt-4">
                        <p className="text-black/40 text-xl font-medium leading-relaxed max-w-xl">
                            AnyLayer offers more than a registry; it is a functional environment powered by technical primitives that scale with your autonomous assets.
                        </p>
                    </div>
                </div>

                <div className="relative min-h-[600px]">
                    <FocusedRevealLayout primitives={primitives} />
                </div>
            </div>
        </section>
    );
};

export default function AgentsPage() {
    return (
        <div className="min-h-screen bg-[#0C0C11] text-primaryText font-geist selection:bg-lightblueprimary/30">
            <Header />

            {/* HERO SECTION */}
            <section className="relative pt-32 pb-12 overflow-hidden">
                <div className="absolute inset-0 pointer-events-none overflow-hidden">
                    <img src="/ai_banner.jpg" alt="" className="w-full h-full object-cover opacity-30" />
                    <div className="absolute inset-0 bg-gradient-to-b from-[#0C0C11] via-transparent to-[#0C0C11]" />
                </div>

                <div className="max-w-7xl mx-auto px-6 relative z-10 text-center space-y-8">
                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.6 }}
                    >
                        <SectionTag label="Multi-layered Reputation" subtitle="Autonomous AI Assets" />
                    </motion.div>

                    <motion.h1
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.6, delay: 0.1 }}
                        className="text-[3rem] md:text-[3.5rem] lg:text-[5rem] font-geist font-black uppercase leading-none tracking-tighter lg:tracking-[-0.05em] max-w-5xl mx-auto text-primaryText"
                    >
                        Global Standard for <br className="hidden md:block" />
                        <span className="text-lightblueprimary">Autonomous AI Assets</span>
                    </motion.h1>

                    <motion.p
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.6, delay: 0.2 }}
                        className="text-primaryText/60 text-sm md:text-lg tracking-[-2%] max-w-2xl mx-auto"
                    >
                        Hardware-verified AI Agents built on the trustless ERC-8004 standard and secured by AnyLayer’s multi-layered trust engine to transform autonomous AI into lucrative digital capital.
                    </motion.p>

                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.6, delay: 0.3 }}
                        className="flex flex-wrap justify-center gap-4 pt-12"
                    >
                        <button className="bg-gradient-to-r from-blueprimary to-lightblueprimary text-primaryText font-bold px-8 py-4 rounded-full transition-all text-sm uppercase tracking-wider shadow-[0_10px_30px_rgba(166,131,255,0.2)] hover:brightness-110 active:scale-[0.98]">
                            Launch Your Agent
                        </button>
                        <button className="bg-white/5 hover:bg-white/10 border border-white/10 text-primaryText font-medium px-8 py-4 rounded-full transition-all text-sm uppercase tracking-wider">
                            Technical Docs
                        </button>
                    </motion.div>

                    {/* Network Partners */}
                    <motion.div
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        transition={{ duration: 1, delay: 0.5 }}
                        className="pt-12 opacity-40 hover:opacity-100 transition-opacity duration-500"
                    >
                        {/* <ClientsLogo className="py-2" /> */}
                    </motion.div>
                </div>
            </section>

            {/* THE AUTONOMOUS FRONTIER */}
            <AutonomousFrontier />


            {/* 4-PILLAR TRUST MODEL */}
            <TrustModelSection />

            {/* NOLANOS FRAMEWORK SECTION */}
            <NolanOSFrameworkSection />

            {/* ERC-8004 SECTION (Digital Personhood) */}
            <ERC8004Section />

            {/* TECHNICAL PRIMITIVES SECTION */}
            <TechnicalPrimitivesSection />

            {/* AGENTS NEWS FEED (Sanity) */}
            <BlogWidget
                category="Agents"
                limit={3}
                dark={true}
                title="Agents News"
                subtitle="The latest updates from the autonomous frontier."
            />

            {/* FOR BUILDERS SECTION */}

            <Footer />
        </div>
    );
}
