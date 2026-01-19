'use client';

import React, { useState } from 'react';
import Head from 'next/head';
import { motion } from 'framer-motion';
import { Header } from '@/components/layout/Header';
import { Footer } from '@/components/layout/Footer';
import { BlogWidget } from '@/components/BlogWidget';
import { ArrowRight, Globe, Shield, Terminal, Zap, CheckCircle2, Loader2 } from 'lucide-react';
import { client } from '@/sanity/lib/client';

const ZenithMinimalistV2 = () => {
    const [email, setEmail] = useState('');
    const [status, setStatus] = useState<'idle' | 'loading' | 'success' | 'error'>('idle');

    const handleWaitlist = async (e: React.FormEvent) => {
        e.preventDefault();
        if (!email) return;

        setStatus('loading');
        try {
            await client.create({
                _type: 'subscriber',
                email,
                type: 'attester',
                subscribedAt: new Date().toISOString(),
            });
            setStatus('success');
            setEmail('');
            setTimeout(() => setStatus('idle'), 5000);
        } catch (error) {
            console.error('Waitlist error:', error);
            setStatus('error');
            setTimeout(() => setStatus('idle'), 5000);
        }
    };

    const fadeIn = {
        initial: { opacity: 0, y: 30, filter: "blur(10px)" },
        whileInView: { opacity: 1, y: 0, filter: "blur(0px)" },
        viewport: { once: true },
        transition: { duration: 1.2, ease: "easeOut" }
    };

    const HUDLabel = ({ text, side = "left" }: { text: string, side?: "left" | "right" }) => (
        <div className={`flex flex-col gap-1 text-[8px] font-mono text-white/20 uppercase tracking-[0.4em] ${side === "right" ? "items-end" : "items-start"}`}>
            <div className="flex items-center gap-2">
                {side === "left" && <div className="w-1 h-1 rounded-full bg-lightblueprimary/40" />}
                {text}
                {side === "right" && <div className="w-1 h-1 rounded-full bg-lightblueprimary/40" />}
            </div>
            <div className={`w-12 h-px bg-white/5 ${side === "right" ? "origin-right" : "origin-left"}`} />
        </div>
    );

    return (
        <>
            <Head>
                <title>Attesters | AnyLayer</title>
                <meta name="description" content="The Infrastructure of Verifiable Truth." />
            </Head>

            <div className="bg-[#08080C] min-h-screen font-geist text-white selection:bg-lightblueprimary selection:text-black relative overflow-hidden">
                {/* --- ATMOSPHERICS --- */}
                <div className="fixed inset-0 pointer-events-none z-[100] mix-blend-soft-light opacity-[0.15] bg-[url('https://grainy-gradients.vercel.app/noise.svg')]" />
                <div className="fixed inset-0 pointer-events-none bg-[radial-gradient(circle_at_50%_40%,rgba(166,131,255,0.08),transparent_70%)]" />

                <Header />

                <main className="relative z-10 pt-44 pb-32 px-6">
                    {/* --- HERO: MASSIVE SCALE --- */}
                    <section className="max-w-[1400px] mx-auto mb-60">
                        <div className="flex flex-col items-center text-center">
                            <motion.div
                                initial={{ opacity: 0, y: 20 }}
                                animate={{ opacity: 1, y: 0 }}
                                transition={{ duration: 1 }}
                                className="mb-12"
                            >
                                <span className="text-[10px] font-black uppercase tracking-[0.8em] text-lightblueprimary/40 border-b border-lightblueprimary/20 pb-2">
                                    Protocol // Infrastructure
                                </span>
                            </motion.div>

                            <motion.h1
                                initial={{ opacity: 0, scale: 0.95, filter: "blur(20px)" }}
                                animate={{ opacity: 1, scale: 1, filter: "blur(0px)" }}
                                transition={{ duration: 1.5, ease: [0.16, 1, 0.3, 1] }}
                                className="text-[12vw] md:text-[min(14vw,14rem)] font-light tracking-[-0.04em] leading-[0.85] uppercase"
                            >
                                Become <br />
                                <span className="font-serif text-white relative">
                                    An
                                    <span className="text-lightblueprimary"> Attester</span>
                                    <motion.div
                                        initial={{ width: 0 }}
                                        animate={{ width: "100%" }}
                                        transition={{ delay: 1, duration: 2 }}
                                        className="absolute -bottom-4 left-0 h-px bg-gradient-to-r from-transparent via-lightblueprimary/30 to-transparent"
                                    />
                                </span>
                            </motion.h1>

                            <motion.p
                                {...fadeIn}
                                transition={{ delay: 0.5, duration: 1 }}
                                className="mt-20 text-xl md:text-3xl text-white/30 font-serif max-w-3xl leading-relaxed"
                            >
                                Turn real-world outcomes into verifiable trust signals.
                                Secure the layer, define the future.
                            </motion.p>

                            <motion.div {...fadeIn} transition={{ delay: 0.8 }} className="mt-16">
                                <a
                                    href="#initiate"
                                    className="group relative flex items-center gap-6 px-12 py-6 rounded-full border border-white/5 bg-white/[0.02] hover:bg-white/5 transition-all duration-500"
                                >
                                    <span className="text-[11px] font-black uppercase tracking-[0.4em] text-white/60 group-hover:text-white transition-colors">
                                        Initiate Sequence
                                    </span>
                                    <div className="w-10 h-10 rounded-full bg-white/5 flex items-center justify-center group-hover:bg-lightblueprimary transition-all duration-500 group-hover:scale-110">
                                        <ArrowRight size={16} className="group-hover:translate-x-1 transition-transform" />
                                    </div>
                                    <div className="absolute inset-0 rounded-full bg-lightblueprimary/5 blur-xl opacity-0 group-hover:opacity-100 transition-opacity" />
                                </a>
                            </motion.div>
                        </div>
                    </section>

                    {/* --- THE DEFINITION: HUD FRAMING --- */}
                    <section className="max-w-6xl mx-auto mb-80 border-y border-white/5 py-32 relative">
                        <div className="absolute top-8 left-0"><HUDLabel text="SYS_DEFINITION" /></div>
                        <div className="absolute top-8 right-0"><HUDLabel text="ATT_ROLE_01" side="right" /></div>

                        <div className="grid md:grid-cols-[1.2fr,1px,1fr] gap-24 items-center">
                            <motion.div {...fadeIn} className="space-y-10">
                                <h2 className="text-5xl md:text-7xl font-light tracking-tighter leading-tight">
                                    The <span className="font-serif text-lightblueprimary/60">Verification</span> <br /> Node.
                                </h2>
                                <p className="text-xl md:text-2xl text-white/50 leading-relaxed font-light font-serif">
                                    An attester is any protocol, application, or verified organization that stand behind the signals it issues.
                                    You are the <span className="text-white font-medium underline decoration-lightblueprimary/30 underline-offset-8">source of truth</span> in a fragmented world.
                                </p>
                            </motion.div>

                            <div className="h-40 w-px bg-white/5 hidden md:block" />

                            <motion.div {...fadeIn} transition={{ delay: 0.2 }} className="space-y-12">
                                <HUDLabel text="ELIGIBLE_VECTORS" />
                                <div className="grid grid-cols-2 gap-x-8 gap-y-6">
                                    {[
                                        { icon: <Zap size={14} />, label: "Protocols" },
                                        { icon: <Globe size={14} />, label: "Platforms" },
                                        { icon: <Shield size={14} />, label: "Infras" },
                                        { icon: <Terminal size={14} />, label: "Agents" }
                                    ].map((item, i) => (
                                        <div key={i} className="flex items-center gap-4 group">
                                            <div className="w-8 h-8 rounded-lg border border-white/5 flex items-center justify-center text-lightblueprimary/40 group-hover:text-lightblueprimary group-hover:border-lightblueprimary/20 transition-all">
                                                {item.icon}
                                            </div>
                                            <span className="text-[10px] font-black uppercase tracking-widest text-white/30 group-hover:text-white transition-colors">{item.label}</span>
                                        </div>
                                    ))}
                                </div>
                            </motion.div>
                        </div>
                    </section>

                    {/* --- SIGNAL MATRIX: TECHNICAL READOUT --- */}
                    <section className="max-w-7xl mx-auto mb-80 px-12">
                        <div className="flex flex-col md:flex-row justify-between items-end mb-24 gap-8">
                            <div className="space-y-6">
                                <HUDLabel text="SIGNAL_CLASSIFICATION" />
                                <h2 className="text-6xl md:text-9xl font-black tracking-tighter uppercase opacity-10">Matrix.</h2>
                            </div>
                            <p className="text-white/20 text-sm max-w-xs font-serif text-right">
                                Categorizing the fundamental building blocks of universal trust.
                            </p>
                        </div>

                        <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
                            {[
                                { label: "Behavior", items: ["Repayment History", "Liquidity Provision", "Trading Velocity"], code: "B-01" },
                                { label: "Outcomes", items: ["Task Completion", "Dispute Resolution", "Success Metrics"], code: "O-02" },
                                { label: "Credentials", items: ["Legal Certificates", "Verified Licenses", "KYB-Verify"], code: "C-03" },
                                { label: "Compliance", items: ["ZKP Checksum", "Sanction List", "Allow-set Auth"], code: "X-04" }
                            ].map((group, i) => (
                                <motion.div
                                    key={i}
                                    {...fadeIn}
                                    transition={{ delay: i * 0.1 }}
                                    className="p-10 border border-white/5 bg-white/[0.01] hover:bg-white/[0.03] transition-all duration-700 relative group overflow-hidden"
                                >
                                    <div className="absolute top-4 right-4 text-[8px] font-mono text-lightblueprimary/20">{group.code}</div>
                                    <h3 className="text-xs font-black uppercase tracking-[0.3em] text-lightblueprimary mb-12 border-b border-lightblueprimary/10 pb-4">
                                        {group.label}
                                    </h3>
                                    <ul className="space-y-6 text-sm">
                                        {group.items.map((item, j) => (
                                            <li key={j} className="text-white/40 hover:text-white transition-colors cursor-default flex items-center gap-3">
                                                <div className="w-1 h-1 rounded-full bg-white/10 group-hover:bg-lightblueprimary transition-colors" />
                                                <span className="font-serif">{item}</span>
                                            </li>
                                        ))}
                                    </ul>
                                    <div className="absolute bottom-0 left-0 w-full h-px bg-gradient-to-r from-transparent via-lightblueprimary/20 to-transparent translate-y-full group-hover:translate-y-0 transition-transform duration-700" />
                                </motion.div>
                            ))}
                        </div>
                    </section>

                    {/* --- IMPACT & WEIGHTING: HIGH-FIDELITY TAB --- */}
                    <section className="max-w-5xl mx-auto mb-80">
                        <div className="relative p-12 md:p-24 rounded-[60px] border border-white/10 bg-white/[0.02] backdrop-blur-3xl overflow-hidden group">
                            <div className="absolute inset-0 bg-gradient-to-br from-lightblueprimary/[0.03] to-transparent" />
                            <div className="absolute top-0 right-0 p-12 opacity-10 group-hover:opacity-20 transition-opacity">
                                <Zap size={120} />
                            </div>

                            <div className="relative z-10 grid md:grid-cols-2 gap-24">
                                <div className="space-y-12">
                                    <HUDLabel text="SYSTEM_IMPACT" />
                                    <div className="space-y-8">
                                        {[
                                            "Shape the trust layer of the internet",
                                            "Increase your signal reach exponentially",
                                            "Compound accuracy across AnyLayer",
                                            "Protect user privacy with ZK proofs"
                                        ].map((text, i) => (
                                            <div key={i} className="flex gap-6 items-start group/item">
                                                <span className="text-lightblueprimary/30 font-mono text-[10px] pt-1 group-hover/item:text-lightblueprimary transition-colors">0{i + 1}</span>
                                                <p className="text-2xl text-white/50 font-serif group-hover/item:text-white transition-colors">{text}</p>
                                            </div>
                                        ))}
                                    </div>
                                </div>

                                <div className="space-y-12">
                                    <HUDLabel text="NODAL_WEIGHTING" />
                                    <div className="space-y-4">
                                        {[
                                            { name: "Open", weight: "1.0x", desc: "Public Attestation" },
                                            { name: "Verified", weight: "2.5x", desc: "Validated Source" },
                                            { name: "Institutional", weight: "10.0x", desc: "Anchor Entity" }
                                        ].map((level, i) => (
                                            <div key={i} className="p-6 border border-white/5 bg-black/40 rounded-2xl flex justify-between items-center hover:border-lightblueprimary/20 transition-all">
                                                <div>
                                                    <div className="text-[10px] font-mono text-white/20 uppercase mb-1">Level 0{i + 1}</div>
                                                    <div className="text-xl font-black uppercase tracking-tighter">{level.name}</div>
                                                </div>
                                                <div className="text-right">
                                                    <div className="text-2xl font-serif text-lightblueprimary">{level.weight}</div>
                                                    <div className="text-[8px] font-mono text-white/10 uppercase tracking-widest">{level.desc}</div>
                                                </div>
                                            </div>
                                        ))}
                                    </div>
                                </div>
                            </div>

                            <div className="mt-20 pt-12 border-t border-white/5 text-center relative z-10">
                                <p className="text-[10px] font-mono text-white/10 tracking-[1em] uppercase">Attesters provide signals, not power.</p>
                            </div>
                        </div>
                    </section>

                    {/* --- CTA: DARK MINIMALISM --- */}
                    <section id="initiate" className="max-w-4xl mx-auto py-40">
                        <div className="text-center space-y-24">
                            <motion.div {...fadeIn} className="space-y-8">
                                <HUDLabel text="APPLICATION_GATEWAY" />
                                <h2 className="text-7xl md:text-9xl font-light tracking-tighter uppercase leading-none">
                                    Join the <br /> <span className="text-lightblueprimary">Waitlist.</span>
                                </h2>
                                <p className="text-xl text-white/30 font-serif max-w-xl mx-auto">
                                    Be among the first to define the global trust layer.
                                    Strategic deployments beginning Q2 2026.
                                </p>
                            </motion.div>

                            <motion.div {...fadeIn} transition={{ delay: 0.2 }} className="max-w-md mx-auto space-y-12">
                                <form onSubmit={handleWaitlist} className="space-y-4 relative group">
                                    <input
                                        type="email"
                                        value={email}
                                        onChange={(e) => setEmail(e.target.value)}
                                        placeholder="Enter Organization Email"
                                        className="w-full bg-transparent border-b border-white/10 py-8 text-center text-2xl font-light focus:outline-none focus:border-lightblueprimary transition-colors placeholder:text-white/5"
                                        disabled={status === 'loading' || status === 'success'}
                                    />
                                    <div className="absolute bottom-0 left-0 w-0 h-px bg-lightblueprimary group-focus-within:w-full transition-all duration-1000" />

                                    {status === 'success' && (
                                        <p className="text-[10px] text-green-400 font-mono uppercase tracking-[0.4em] animate-pulse">Waitlist Entry Confirmed</p>
                                    )}
                                    {status === 'error' && (
                                        <p className="text-[10px] text-red-400 font-mono uppercase tracking-[0.4em]">Error joining waitlist</p>
                                    )}

                                    <button
                                        type="submit"
                                        disabled={status === 'loading' || status === 'success'}
                                        className="w-full mt-12 py-6 rounded-full bg-white text-black font-black uppercase tracking-[0.5em] text-[12px] hover:scale-[1.02] active:scale-[0.98] transition-all shadow-[0_0_50px_rgba(255,255,255,0.1)] flex items-center justify-center gap-4 disabled:opacity-50"
                                    >
                                        {status === 'loading' ? (
                                            <>Processing <Loader2 className="animate-spin" size={16} /></>
                                        ) : status === 'success' ? (
                                            <>Confirmed <CheckCircle2 size={16} /></>
                                        ) : (
                                            "Submit Protocol"
                                        )}
                                    </button>
                                </form>
                            </motion.div>

                            <motion.div {...fadeIn} transition={{ delay: 0.4 }} className="flex flex-col items-center gap-4">
                                <div className="w-px h-12 bg-gradient-to-b from-white/10 to-transparent" />
                                <a href="mailto:attesters@anylayer.xyz" className="text-[10px] font-mono text-white/20 hover:text-lightblueprimary transition-colors tracking-[0.5em] uppercase">
                                    attesters@anylayer.xyz
                                </a>
                            </motion.div>
                        </div>
                    </section>
                </main>

                <BlogWidget
                    category="Attestation"
                    limit={3}
                    title="Attestation Network Updates"
                    subtitle="Latest signals, protocol changes, and attester network news."
                    dark={true}
                />

                <Footer />
            </div>
        </>
    );
};

export default ZenithMinimalistV2;
