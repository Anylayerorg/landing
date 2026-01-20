'use client';

import React, { useState } from 'react';
import Head from 'next/head';
import { motion } from 'framer-motion';
import { Header } from '@/components/layout/Header';
import { Footer } from '@/components/layout/Footer';
import { BlogWidget } from '@/components/BlogWidget';
import { ArrowRight, Globe, Shield, Zap, CheckCircle2, Loader2, Cpu, Activity } from 'lucide-react';

// --- SHARED COMPONENTS ---

const SectionLabel = ({ text }: { text: string }) => (
    <div className="flex items-center gap-3 mb-6">
        <div className="w-1 h-1 rounded-full bg-lightblueprimary" />
        <span className="text-[10px] font-black uppercase tracking-[0.4em] text-lightblueprimary/60">
            {text}
        </span>
    </div>
);

const SectionTag = ({ label }: { label: string }) => (
    <div className="inline-flex items-center gap-3 px-3 py-1 rounded-full backdrop-blur-sm border bg-white/[0.02] border-white/5 text-white/40 mb-12">
        <div className="w-1 h-1 rounded-full bg-lightblueprimary" />
        <span className="text-[9px] font-mono uppercase tracking-[0.3em] font-medium">
            {label}
        </span>
    </div>
);

const AttestersPage = () => {
    const [email, setEmail] = useState('');
    const [status, setStatus] = useState<'idle' | 'loading' | 'success' | 'error'>('idle');

    const handleWaitlist = async (e: React.FormEvent) => {
        e.preventDefault();
        if (!email) return;
        setStatus('loading');
        try {
            const response = await fetch('/api/subscribe', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ email, type: 'attester' }),
            });

            if (!response.ok) throw new Error('Waitlist submission failed');

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
        initial: { opacity: 0, y: 20 },
        whileInView: { opacity: 1, y: 0 },
        viewport: { once: true },
        transition: { duration: 1, ease: [0.16, 1, 0.3, 1] }
    } as const;

    return (
        <div className="bg-[#08080C] min-h-screen font-geist text-white selection:bg-lightblueprimary selection:text-black relative overflow-hidden">
            <Head>
                <title>Attesters | AnyLayer</title>
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
                                    <h1 className="text-[2.8rem] md:text-[3.5rem] lg:text-[5rem] font-black tracking-tighter uppercase leading-[0.95] max-w-3xl">
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
                                        href="#initiate"
                                        className="group relative inline-flex items-center gap-4 px-10 py-5 rounded-full bg-white text-black transition-all duration-300 hover:bg-white/90 active:scale-[0.98] shadow-[0_0_30px_rgba(255,255,255,0.05)]"
                                    >
                                        <span className="text-[11px] font-black uppercase tracking-[0.3em]">
                                            Join The Network
                                        </span>
                                        <ArrowRight size={14} className="group-hover:translate-x-1 transition-transform" />
                                    </a>
                                </motion.div>
                            </motion.div>
                        </div>
                    </div>
                </section>

                {/* --- THE DEFINITION --- */}
                <section className="max-w-6xl mx-auto px-6 mb-80 relative z-20">
                    <div className="grid md:grid-cols-2 gap-20 items-start p-12 md:p-20 rounded-[40px] border border-white/5 bg-black/40 backdrop-blur-xl">
                        <motion.div {...fadeIn} className="space-y-8">
                            <SectionLabel text="System Definition" />
                            <h2 className="text-3xl md:text-4xl font-black tracking-tight uppercase leading-[1.1]">
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

                {/* --- CTA SECTION --- */}
                <section id="initiate" className="max-w-3xl mx-auto py-40 px-6 text-center">
                    <motion.div {...fadeIn}>
                        <SectionLabel text="Gateway" />
                        <h2 className="text-4xl md:text-6xl font-black tracking-tight uppercase leading-[1.1] mb-8">
                            Join the <span className="text-lightblueprimary">Waitlist.</span>
                        </h2>
                        <form onSubmit={handleWaitlist} className="max-w-md mx-auto space-y-12">
                            <div className="relative group">
                                <input
                                    type="email"
                                    value={email}
                                    onChange={(e) => setEmail(e.target.value)}
                                    placeholder="Enter Organization Email"
                                    className="w-full bg-transparent border-b border-white/10 py-6 text-center text-xl focus:outline-none focus:border-lightblueprimary transition-colors placeholder:text-white/5"
                                    disabled={status === 'loading' || status === 'success'}
                                />
                                <div className="absolute bottom-0 left-0 w-0 h-px bg-lightblueprimary group-focus-within:w-full transition-all duration-700" />
                            </div>

                            <button
                                type="submit"
                                disabled={status === 'loading' || status === 'success'}
                                className="w-full py-5 rounded-full bg-white text-black font-black uppercase tracking-[0.3em] text-[11px] hover:scale-[1.02] active:scale-[0.98] transition-all flex items-center justify-center gap-4 disabled:opacity-50"
                            >
                                {status === 'loading' ? (
                                    <>Processing <Loader2 className="animate-spin" size={14} /></>
                                ) : status === 'success' ? (
                                    <>Confirmed <CheckCircle2 size={14} /></>
                                ) : (
                                    "Join The Waitlist"
                                )}
                            </button>
                        </form>
                    </motion.div>
                </section>

                <div className="border-t border-white/5 pt-20">
                    <BlogWidget
                        category="Attestation" limit={3}
                        title="Attestation Network Updates"
                        subtitle="Latest signals, protocol changes, and attester network news."
                        dark={true}
                    />
                </div>
            </main>

            <Footer />
        </div>
    );
};

export default AttestersPage;
