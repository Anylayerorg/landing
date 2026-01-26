import React from 'react';
import Head from 'next/head';
import { motion } from 'framer-motion';
import {
    CircleDollarSign,
    Bitcoin,
    Coins,
    CreditCard,
    Wallet,
    ArrowRightLeft,
    Banknote,
    Globe,
    Zap,
    ShieldCheck,
    Star
} from 'lucide-react';

const Card = ({ children, className = "" }: { children: React.ReactNode, className?: string }) => (
    <div className={`bg-white rounded-[32px] border border-[#F0F0F5] shadow-[0_20px_60px_-15px_rgba(0,0,0,0.03)] overflow-hidden ${className}`}>
        {children}
    </div>
);

const FloatingIcon = ({ children, delay = 0, duration = 8, className = "" }: { children: React.ReactNode, delay?: number, duration?: number, className?: string }) => (
    <motion.div
        initial={{ y: 0, x: 0, opacity: 0 }}
        animate={{
            y: [0, -15, 0],
            x: [0, 5, 0],
            opacity: 1
        }}
        transition={{
            y: { duration, repeat: Infinity, ease: "easeInOut", delay },
            x: { duration: duration * 1.2, repeat: Infinity, ease: "easeInOut", delay },
            opacity: { duration: 1 }
        }}
        className={`absolute ${className}`}
    >
        {children}
    </motion.div>
);

const PaymentCryptoGraphic = () => {
    return (
        <div className="relative w-full h-screen overflow-hidden flex items-center justify-center bg-[#F9F9FB]">
            {/* Background Soft Gradients */}
            <div className="absolute inset-0 pointer-events-none">
                <div className="absolute top-[-10%] right-[-10%] w-[60%] h-[60%] bg-[#A683FF]/10 rounded-full blur-[120px]" />
                <div className="absolute bottom-[-10%] left-[-10%] w-[60%] h-[60%] bg-[#8B5CF6]/5 rounded-full blur-[120px]" />
            </div>

            {/* Clean Grid Pattern */}
            <div className="absolute inset-0 opacity-[0.4] pointer-events-none"
                style={{ backgroundImage: 'linear-gradient(#E2E2E9 1px, transparent 1px), linear-gradient(90deg, #E2E2E9 1px, transparent 1px)', backgroundSize: '60px 60px' }} />

            {/* Floating Elements - Purple Tinted */}
            <FloatingIcon className="top-[15%] left-[20%]" delay={0}>
                <div className="p-4 rounded-3xl bg-white shadow-[0_15px_35px_rgba(166,131,255,0.1)] border border-[#A683FF]/5">
                    <Bitcoin size={42} className="text-[#A683FF]" />
                </div>
            </FloatingIcon>

            <FloatingIcon className="top-[10%] right-[25%]" delay={1.5}>
                <div className="p-4 rounded-full bg-white shadow-[0_15px_35px_rgba(0,0,0,0.03)] border border-[#F0F0F5]">
                    <span className="text-3xl font-black text-[#8B5CF6]">€</span>
                </div>
            </FloatingIcon>

            <FloatingIcon className="bottom-[20%] left-[15%]" delay={2}>
                <div className="p-5 rounded-[2rem] bg-[#8B5CF6]/5 border border-[#8B5CF6]/10 backdrop-blur-sm">
                    <CreditCard size={32} className="text-[#8B5CF6]/60" />
                </div>
            </FloatingIcon>

            <FloatingIcon className="bottom-[15%] right-[18%]" delay={0.5}>
                <div className="p-4 rounded-3xl bg-white shadow-[0_15px_35px_rgba(166,131,255,0.12)] border border-[#A683FF]/5">
                    <div className="text-[#A683FF] font-black text-4xl">Ξ</div>
                </div>
            </FloatingIcon>

            <FloatingIcon className="top-[40%] right-[10%]" delay={3}>
                <div className="p-3 rounded-2xl bg-[#A683FF]/5 border border-[#A683FF]/10">
                    <Zap size={24} className="text-[#A683FF]/50" />
                </div>
            </FloatingIcon>

            {/* Center Design - Professional Card */}
            <div className="relative z-10 w-full max-w-4xl px-8">
                <motion.div
                    initial={{ opacity: 0, y: 30 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.8, ease: "easeOut" }}
                >
                    <Card className="p-16 flex flex-col items-center text-center space-y-12">
                        {/* Branding Header */}
                        <div className="flex flex-col items-center gap-4">
                            <div className="px-4 py-1.5 rounded-full bg-[#8B5CF6]/5 border border-[#8B5CF6]/10">
                                <span className="text-[10px] font-black uppercase tracking-[0.4em] text-[#8B5CF6]/60">PAYMENT LAYER</span>
                            </div>

                            <div className="relative">
                                <h1 className="text-7xl md:text-8xl font-black tracking-[-0.04em] text-[#08080C] leading-none mb-2">
                                    .ANY<span className="text-[#8B5CF6]">PAY</span>
                                </h1>
                                <div className="absolute -right-8 -top-4">
                                    <Star size={24} className="text-[#A683FF] fill-[#A683FF]" />
                                </div>
                            </div>
                        </div>

                        {/* Visual Hierarchy */}
                        <div className="w-full h-px bg-gradient-to-r from-transparent via-[#F0F0F5] to-transparent" />

                        <div className="grid grid-cols-2 md:grid-cols-4 gap-12 w-full pt-4">
                            {[
                                { label: "Borders", val: "Zero", icon: <Globe size={18} /> },
                                { label: "Fees", val: "Low", icon: <Coins size={18} /> },
                                { label: "Speed", val: "Instant", icon: <Zap size={18} /> },
                                { label: "Security", val: "ZK", icon: <ShieldCheck size={18} /> }
                            ].map((stat, i) => (
                                <div key={i} className="flex flex-col items-center gap-2">
                                    <div className="text-[#8B5CF6]/40 mb-1">{stat.icon}</div>
                                    <span className="text-[9px] font-bold uppercase tracking-widest text-black/30">{stat.label}</span>
                                    <span className="text-xl font-black text-[#08080C]">{stat.val}</span>
                                </div>
                            ))}
                        </div>

                        {/* Bottom Copy */}
                        <p className="text-[#08080C]/50 text-xl font-medium tracking-tight max-w-xl leading-relaxed">
                            Accept anything. Settle anywhere.<br />
                            <span className="text-[#08080C]/80">The bridge between Web2 & Web3 payments.</span>
                        </p>

                        {/* Call to Action Style */}
                        <div className="pt-4">
                            <div className="inline-flex items-center gap-4 bg-[#08080C] text-white px-10 py-5 rounded-full font-black text-[11px] uppercase tracking-[0.3em] shadow-[0_15px_45px_rgba(0,0,0,0.15)]">
                                Launch Protocol
                                <ArrowRightLeft size={16} className="text-white/40" />
                            </div>
                        </div>
                    </Card>
                </motion.div>
            </div>

            {/* Decorative Branding Corner */}
            <div className="absolute bottom-10 left-10 flex items-center gap-4">
                <div className="w-12 h-px bg-[#8B5CF6]/20" />
                <span className="text-[10px] font-black tracking-[0.5em] text-[#08080C]/20 uppercase">ANYLAYER PROTOCOL</span>
            </div>

            {/* Design System Reference Specs */}
            <div className="absolute top-10 right-10 flex flex-col items-end gap-1 font-mono text-[9px] text-black/10 tracking-widest uppercase">
                <span>Units: System.04</span>
                <span>Palette: White/Purple</span>
                <span>Version: Final_R1</span>
            </div>
        </div>
    );
};

const GraphicsPage = () => {
    return (
        <>
            <Head>
                <title>Graphics Generation | AnyLayer</title>
                <meta name="description" content="Visual assets generation page for AnyLayer" />
            </Head>
            <main className="bg-white min-h-screen">
                <PaymentCryptoGraphic />
            </main>
        </>
    );
};

export default GraphicsPage;
