import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import {
    ArrowRight,
    Fingerprint,
    ShieldCheck,
    Activity,
    Database,
    Network,
    Cpu,
    Lock,
    Zap,
    ChevronRight,
    Terminal,
    Grid3x3,
    Layers,
    Sparkles,
    Waves,
    Orbit,
    Maximize
} from 'lucide-react';

interface LayoutProps {
    heading: React.ReactNode;
    subheading: string;
    ctaPrimary: string;
    ctaSecondary: string;
}

const HUDLabel = ({ text }: { text: string }) => (
    <div className="inline-flex items-center gap-3 px-3 py-1 rounded-full bg-white/[0.02] text-[#A683FF]/60">
        <div className="w-1 h-1 rounded-full bg-[#A683FF] animate-pulse" />
        <span className="text-[9px] font-mono uppercase tracking-[0.4em]">{text}</span>
    </div>
);

const Buttons = ({ primary, secondary }: { primary: string; secondary: string }) => (
    <div className="flex flex-wrap gap-6 pt-10">
        <button className="group relative px-12 py-5 overflow-hidden rounded-full transition-all bg-white text-black font-black uppercase tracking-[0.3em] text-[10px] flex items-center gap-4 hover:scale-105 active:scale-95 shadow-2xl">
            {primary}
            <ArrowRight size={14} className="group-hover:translate-x-1 transition-transform" />
        </button>
        <button className="group px-12 py-5 rounded-full border-b border-white/20 hover:border-white/60 transition-all text-white/40 hover:text-white font-black uppercase tracking-[0.3em] text-[10px]">
            {secondary}
        </button>
    </div>
);

// --- N1: THE FLOATING RIBBON ---
const Variant1 = ({ heading, subheading, ctaPrimary, ctaSecondary }: LayoutProps) => (
    <section className="min-h-screen py-40 px-6 relative flex items-center overflow-hidden">
        <div className="absolute top-1/2 left-0 w-full h-[300px] bg-[#A683FF]/5 -skew-y-6 blur-[120px]" />
        <div className="max-w-7xl mx-auto w-full relative z-10">
            <div className="space-y-12">
                <motion.div initial={{ x: -50 }} animate={{ x: 0 }} className="space-y-4">
                    <HUDLabel text="ORGANIC_FLOW_v1.0" />
                    <h1 className="text-7xl md:text-[140px] font-black uppercase leading-[0.7] tracking-[-0.08em] text-white italic">
                        {heading}
                    </h1>
                </motion.div>
                <div className="max-w-xl ml-auto md:mr-24 text-right space-y-8">
                    <p className="text-2xl text-white/40 font-light leading-snug">{subheading}</p>
                    <div className="flex justify-end">
                        <Buttons primary={ctaPrimary} secondary={ctaSecondary} />
                    </div>
                </div>
            </div>
        </div>
    </section>
);

// --- N2: RADIAL SYNERGY ---
const Variant2 = ({ heading, subheading, ctaPrimary, ctaSecondary }: LayoutProps) => (
    <section className="min-h-screen flex items-center justify-center p-6 relative overflow-hidden">
        <div className="absolute inset-0 bg-radial-gradient from-[#A683FF]/10 via-transparent to-transparent opacity-30" />
        <motion.div
            initial={{ scale: 0.8, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            className="max-w-5xl text-center relative z-10"
        >
            <div className="mb-12 flex justify-center gap-20 grayscale opacity-20">
                <Orbit className="animate-spin-slow" size={60} />
                <Waves className="animate-pulse" size={60} />
            </div>
            <h1 className="text-6xl md:text-[110px] font-black uppercase tracking-tighter text-white leading-none">
                {heading}
            </h1>
            <p className="mt-12 text-xl text-white/60 font-medium max-w-2xl mx-auto">{subheading}</p>
            <div className="flex justify-center mt-12">
                <Buttons primary={ctaPrimary} secondary={ctaSecondary} />
            </div>
        </motion.div>
    </section>
);

// --- N3: STAGGERED DEPTH ---
const Variant3 = ({ heading, subheading, ctaPrimary, ctaSecondary }: LayoutProps) => (
    <section className="min-h-screen grid lg:grid-cols-2 gap-20 p-12 items-end">
        <div className="relative">
            <motion.div
                animate={{ y: [0, -20, 0] }}
                transition={{ duration: 6, repeat: Infinity }}
                className="text-[120px] md:text-[180px] font-black text-white/10 leading-none select-none"
            >
                VERIFIED
            </motion.div>
            <div className="absolute bottom-12 left-0 space-y-8">
                <HUDLabel text="DEPTH_VECTOR" />
                <h1 className="text-5xl md:text-8xl font-black uppercase text-white leading-none">{heading}</h1>
            </div>
        </div>
        <div className="space-y-12 pb-12">
            <p className="text-2xl text-white/40 font-light leading-relaxed max-w-md">{subheading}</p>
            <Buttons primary={ctaPrimary} secondary={ctaSecondary} />
        </div>
    </section>
);

// --- N4: THE BEAM REVEAL ---
const Variant4 = ({ heading, subheading, ctaPrimary, ctaSecondary }: LayoutProps) => (
    <section className="min-h-screen flex flex-col justify-center px-6 relative bg-black overflow-hidden">
        <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[2px] h-full bg-gradient-to-b from-transparent via-[#A683FF] to-transparent opacity-20" />
        <div className="max-w-7xl mx-auto w-full z-10">
            <div className="space-y-24">
                <h1 className="text-7xl md:text-[160px] font-black uppercase tracking-[-0.1em] text-white leading-[0.6]">
                    {heading}
                </h1>
                <div className="flex flex-col md:flex-row items-end gap-16">
                    <p className="text-3xl text-[#A683FF] font-light max-w-xl italic">{subheading}</p>
                    <div className="shrink-0 pb-4">
                        <Buttons primary={ctaPrimary} secondary={ctaSecondary} />
                    </div>
                </div>
            </div>
        </div>
    </section>
);

// --- N5: FLOATING ESSENCE ---
const Variant5 = ({ heading, subheading, ctaPrimary, ctaSecondary }: LayoutProps) => (
    <section className="min-h-screen flex items-center justify-between p-12 relative overflow-hidden">
        <div className="absolute top-1/4 right-1/4 w-96 h-96 bg-white/5 rounded-full blur-3xl" />
        <div className="space-y-24 max-w-3xl">
            <h1 className="text-7xl font-black uppercase tracking-widest text-white leading-tight">
                {heading}
            </h1>
            <Buttons primary={ctaPrimary} secondary={ctaSecondary} />
        </div>
        <div className="hidden lg:block w-[400px] text-right space-y-8">
            <p className="text-xl text-white/20 font-mono tracking-tighter leading-relaxed">
                {subheading}
            </p>
            <div className="space-y-2">
                <HUDLabel text="PROTO_V2" />
                <HUDLabel text="SECURE_ID" />
            </div>
        </div>
    </section>
);

// --- N6: LIQUID HORIZON ---
const Variant6 = ({ heading, subheading, ctaPrimary, ctaSecondary }: LayoutProps) => (
    <section className="min-h-screen p-6 flex items-center justify-center relative overflow-hidden">
        <div className="absolute bottom-0 left-0 w-full h-[50vh] bg-gradient-to-t from-white/5 to-transparent blur-[100px]" />
        <div className="text-center relative z-10">
            <div className="mb-20">
                <motion.div animate={{ scale: [1, 1.1, 1] }} transition={{ duration: 4, repeat: Infinity }} className="inline-block">
                    <Waves className="text-[#A683FF] w-12 h-12" />
                </motion.div>
            </div>
            <h1 className="text-6xl md:text-9xl font-black uppercase text-white tracking-widest leading-[0.8] mb-12">
                {heading}
            </h1>
            <p className="text-white/40 max-w-xl mx-auto text-lg mb-12 font-medium">{subheading}</p>
            <Buttons primary={ctaPrimary} secondary={ctaSecondary} />
        </div>
    </section>
);

// --- N7: ASYMMETRIC OVERLAY ---
const Variant7 = ({ heading, subheading, ctaPrimary, ctaSecondary }: LayoutProps) => (
    <section className="min-h-screen flex items-center p-12 relative">
        <div className="max-w-7xl mx-auto w-full grid md:grid-cols-12">
            <div className="md:col-span-10 space-y-10">
                <h1 className="text-6xl md:text-[130px] font-black uppercase text-white leading-none tracking-tighter z-20 relative">
                    {heading}
                </h1>
                <div className="relative">
                    <div className="absolute -top-32 -left-20 w-[600px] h-[400px] bg-[#A683FF]/10 blur-[150px] -z-10" />
                    <p className="text-3xl text-white/60 font-medium max-w-2xl leading-tight pl-24 border-l border-white/10 uppercase italic">
                        {subheading}
                    </p>
                </div>
                <div className="pl-24">
                    <Buttons primary={ctaPrimary} secondary={ctaSecondary} />
                </div>
            </div>
        </div>
    </section>
);

// --- N8: TYPOGRAPHIC MESH ---
const Variant8 = ({ heading, subheading, ctaPrimary, ctaSecondary }: LayoutProps) => (
    <section className="min-h-screen p-12 flex flex-col justify-between">
        <div className="flex justify-between items-start">
            <div className="space-y-4">
                <HUDLabel text="SIGNAL_CORE" />
                <HUDLabel text="TRUST_VECTORS" />
            </div>
            <div className="text-right">
                <Maximize className="text-white/10 w-12 h-12 ml-auto" />
            </div>
        </div>
        <div className="max-w-5xl">
            <h1 className="text-8xl md:text-[150px] font-black uppercase text-white leading-[0.7] mb-12">
                {heading}
            </h1>
            <div className="flex flex-col md:flex-row gap-16 items-start">
                <p className="text-white/30 text-xl font-light italic max-w-md">{subheading}</p>
                <Buttons primary={ctaPrimary} secondary={ctaSecondary} />
            </div>
        </div>
    </section>
);

// --- N9: ORBITAL FOCUS ---
const Variant9 = ({ heading, subheading, ctaPrimary, ctaSecondary }: LayoutProps) => (
    <section className="min-h-screen py-32 px-6 flex items-center relative overflow-hidden text-center">
        <div className="absolute inset-0 flex items-center justify-center pointer-events-none opacity-10">
            <Orbit className="animate-spin-slow w-[800px] h-[800px]" />
        </div>
        <div className="max-w-4xl mx-auto space-y-16">
            <h1 className="text-6xl md:text-9xl font-black uppercase text-white leading-none tracking-tight">
                {heading}
            </h1>
            <div className="h-px w-32 bg-white/20 mx-auto" />
            <p className="text-xl text-white/40 font-light leading-relaxed px-12 italic">
                {subheading}
            </p>
            <div className="flex justify-center">
                <Buttons primary={ctaPrimary} secondary={ctaSecondary} />
            </div>
        </div>
    </section>
);

// --- N10: VERTICAL STACKED LEAD ---
const Variant10 = ({ heading, subheading, ctaPrimary, ctaSecondary }: LayoutProps) => (
    <section className="min-h-screen py-40 px-12 flex flex-col justify-end">
        <div className="max-w-4xl space-y-24">
            <div className="space-y-8">
                <p className="text-4xl md:text-6xl font-light text-[#A683FF] leading-none mb-12">
                    {subheading}
                </p>
                <div className="w-[1px] h-32 bg-white/20" />
            </div>
            <div className="space-y-12">
                <h1 className="text-6xl md:text-[110px] font-black uppercase tracking-tight text-white leading-none">
                    {heading}
                </h1>
                <Buttons primary={ctaPrimary} secondary={ctaSecondary} />
            </div>
        </div>
    </section>
);

// --- N11: THE WAVEFRONT ---
const Variant11 = ({ heading, subheading, ctaPrimary, ctaSecondary }: LayoutProps) => (
    <section className="min-h-screen flex flex-col justify-center p-12 relative overflow-hidden bg-[#0A0A0F]">
        <div className="absolute top-0 right-0 w-[50vw] h-full bg-gradient-to-l from-white/5 to-transparent blur-[120px]" />
        <div className="max-w-7xl mx-auto w-full z-10 grid md:grid-cols-12 gap-12 items-center">
            <div className="md:col-span-8">
                <h1 className="text-7xl md:text-[150px] font-black uppercase text-white leading-[0.75] tracking-tight">
                    {heading}
                </h1>
            </div>
            <div className="md:col-span-4 space-y-12">
                <p className="text-2xl text-white/40 font-light italic leading-snug">
                    {subheading}
                </p>
                <Buttons primary={ctaPrimary} secondary={ctaSecondary} />
            </div>
        </div>
    </section>
);

// --- N12: ABSTRACT SILHOUETTE ---
const Variant12 = ({ heading, subheading, ctaPrimary, ctaSecondary }: LayoutProps) => (
    <section className="min-h-screen flex items-center justify-center p-6 relative">
        <div className="relative z-10 text-center space-y-12">
            <HUDLabel text="SILHOUETTE_PROTO" />
            <h1 className="text-5xl md:text-8xl font-black uppercase text-white tracking-[0.2em] leading-tight">
                {heading}
            </h1>
            <div className="max-w-2xl mx-auto relative px-12">
                <div className="absolute inset-0 bg-white/5 blur-2xl rounded-[100%] scale-110 -z-10" />
                <p className="text-xl text-white/60 font-medium italic">{subheading}</p>
            </div>
            <div className="flex justify-center">
                <Buttons primary={ctaPrimary} secondary={ctaSecondary} />
            </div>
        </div>
    </section>
);

// --- N13: DECONSTRUCTED GLITCH ---
const Variant13 = ({ heading, subheading, ctaPrimary, ctaSecondary }: LayoutProps) => (
    <section className="min-h-screen py-40 px-12 flex flex-col justify-center relative bg-black">
        <div className="space-y-32">
            <div className="relative">
                <motion.div animate={{ opacity: [0.3, 0.6, 0.3] }} transition={{ duration: 2, repeat: Infinity }} className="absolute -top-20 -left-10 text-[180px] font-black text-[#A683FF]/5 rotate-1 select-none">TRUST</motion.div>
                <h1 className="text-6xl md:text-[120px] font-black uppercase tracking-tighter text-white leading-[0.8] relative z-10 shadow-black shadow-2xl">
                    {heading}
                </h1>
            </div>
            <div className="flex flex-col md:flex-row gap-20 items-end max-w-6xl">
                <Buttons primary={ctaPrimary} secondary={ctaSecondary} />
                <p className="text-white/20 text-xl font-mono text-right flex-1 border-r-2 border-white/5 pr-12 pb-4">
                    {subheading}
                </p>
            </div>
        </div>
    </section>
);

// --- N14: ORGANIC DRIFT ---
const Variant14 = ({ heading, subheading, ctaPrimary, ctaSecondary }: LayoutProps) => (
    <section className="min-h-screen py-32 px-6 flex items-center relative overflow-hidden">
        <motion.div
            animate={{ x: [0, 100, 0], y: [0, 50, 0] }}
            transition={{ duration: 20, repeat: Infinity, ease: "linear" }}
            className="absolute top-0 left-0 w-[500px] h-[500px] bg-[#A683FF]/5 blur-[120px]"
        />
        <div className="max-w-5xl mx-auto w-full relative z-10">
            <div className="space-y-16">
                <h1 className="text-6xl md:text-9xl font-black uppercase text-white leading-[0.85] tracking-tight text-center md:text-left">
                    {heading}
                </h1>
                <div className="flex flex-col md:flex-row items-center gap-16 pt-12">
                    <div className="shrink-0">
                        <Buttons primary={ctaPrimary} secondary={ctaSecondary} />
                    </div>
                    <p className="text-2xl text-white/40 font-light italic border-l-2 border-[#A683FF] pl-12">
                        {subheading}
                    </p>
                </div>
            </div>
        </div>
    </section>
);

// --- N15: THE MINIMALIST PATH ---
const Variant15 = ({ heading, subheading, ctaPrimary, ctaSecondary }: LayoutProps) => (
    <section className="min-h-screen flex flex-col justify-center p-12 max-w-4xl mx-auto text-center border-x border-white/5">
        <div className="space-y-24">
            <div className="space-y-6">
                <HUDLabel text="FINAL_PATH_SPECS" />
                <h1 className="text-4xl md:text-6xl font-bold uppercase tracking-[0.5em] text-white">
                    {heading}
                </h1>
            </div>
            <div className="h-0.5 w-full bg-gradient-to-r from-transparent via-white/20 to-transparent" />
            <p className="text-3xl text-white/40 font-thin leading-tight">
                {subheading}
            </p>
            <div className="flex justify-center">
                <Buttons primary={ctaPrimary} secondary={ctaSecondary} />
            </div>
        </div>
    </section>
);

// --- MAIN PREVIEW COMPONENT ---
export const BuilderHeroRedesign = ({ activeVariant = 1 }: { activeVariant?: number }) => {
    const content = {
        heading: (
            <>
                Integrate <br />
                <span className="text-[#A683FF]">Verified</span> <br />
                <span className="text-white/10 outline-text">Behavior.</span>
            </>
        ),
        subheading: "Anylayer is the trust primitive for developers. Build applications where decisions are based on verified behavior rather than assumptions.",
        ctaPrimary: "Contact Us",
        ctaSecondary: "Read Specs"
    };

    const variants = [
        Variant1, Variant2, Variant3, Variant4, Variant5,
        Variant6, Variant7, Variant8, Variant9, Variant10,
        Variant11, Variant12, Variant13, Variant14, Variant15
    ];

    const CurrentVariant = variants[(activeVariant - 1) % variants.length];

    return (
        <div className="bg-[#08080C] min-h-screen font-geist text-white selection:bg-[#A683FF] selection:text-black overflow-x-hidden">
            <style dangerouslySetInnerHTML={{
                __html: `
            .outline-text {
                -webkit-text-stroke: 1px rgba(255,255,255,0.2);
                color: transparent;
            }
            @keyframes spin-slow {
              from { transform: rotate(0deg); }
              to { transform: rotate(360deg); }
            }
            .animate-spin-slow {
              animation: spin-slow 20s linear infinite;
            }
        `}} />
            <AnimatePresence mode="wait">
                <motion.div
                    key={activeVariant}
                    initial={{ opacity: 0, x: 20 }}
                    animate={{ opacity: 1, x: 0 }}
                    exit={{ opacity: 0, x: -20 }}
                    transition={{ duration: 0.5, ease: "easeInOut" }}
                >
                    <CurrentVariant {...content} />
                </motion.div>
            </AnimatePresence>
        </div>
    );
};
