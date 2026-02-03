import React, { useState } from 'react';
import Head from 'next/head';
import { motion, AnimatePresence } from 'framer-motion';
import {
    ArrowRightLeft,
    ChevronRight,
    ChevronLeft,
    Star,
    Globe,
    Coins,
    Zap,
    ShieldCheck,
    Layout,
    Layers,
    Sparkles
} from 'lucide-react';

const TITLE = ".ANY PAY";
const TAGLINE = "Accept anything. Settle anywhere.";
const DESCRIPTION = "The bridge between Web2 & Web3 payments.";

const VARIANTS = [
    { id: 1, name: "Minimalist Executive" },
    { id: 2, name: "Glassmorphic Stack" },
    { id: 3, name: "Industrial Swiss" },
    { id: 4, name: "Abstract Fluid" },
    { id: 5, name: "Data Grid Blueprint" },
    { id: 6, name: "Neumorphic Soft" },
    { id: 7, name: "Geometric Bauhaus" },
    { id: 8, name: "Cinematic Gradient" },
    { id: 9, name: "Typographic Bold" },
    { id: 10, name: "Cyber Organic" }
];

const LayoutWrapper = ({ children, variantName }: { children: React.ReactNode, variantName: string }) => (
    <div className="relative w-[1200px] h-[630px] bg-white overflow-hidden shadow-[0_40px_100px_rgba(0,0,0,0.1)] border border-[#F0F0F5]">
        {children}
        <div className="absolute top-6 left-6 px-3 py-1 rounded-full bg-black/5 border border-black/5 backdrop-blur-md">
            <span className="text-[8px] font-mono font-black uppercase tracking-[0.2em] text-black/40">Variant: {variantName}</span>
        </div>
    </div>
);

const CommonText = ({ centered = true, dark = true }: { centered?: boolean, dark?: boolean }) => (
    <div className={`space-y-6 ${centered ? 'text-center' : 'text-left'} z-20`}>
        <div className={`flex flex-col ${centered ? 'items-center' : 'items-start'} gap-4`}>
            <motion.div
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                className="px-4 py-1.5 rounded-full bg-[#8B5CF6]/5 border border-[#8B5CF6]/10"
            >
                <span className="text-[10px] font-black uppercase tracking-[0.4em] text-[#8B5CF6]">PAYMENT LAYER</span>
            </motion.div>
            <h1 className={`text-8xl font-black tracking-[-0.05em] ${dark ? 'text-[#08080C]' : 'text-white'} leading-none`}>
                {TITLE.split(' ')[0]}<span className="text-[#8B5CF6]">{TITLE.split(' ')[1]}</span>
            </h1>
        </div>
        <div className="space-y-2">
            <p className={`text-2xl font-black tracking-tighter ${dark ? 'text-[#08080C]' : 'text-white'}`}>{TAGLINE}</p>
            <p className={`text-base font-medium tracking-tight ${dark ? 'text-black/40' : 'text-white/40'}`}>{DESCRIPTION}</p>
        </div>
    </div>
);

// --- 10 VARIANT COMPONENTS ---

const Variant1 = () => (
    <LayoutWrapper variantName="Minimalist Executive">
        <div className="absolute inset-0 bg-[#F9F9FB]" />
        <div className="absolute top-0 right-0 w-1/2 h-full bg-gradient-to-l from-[#A683FF]/5 to-transparent" />
        <div className="absolute inset-0 flex items-center justify-center">
            <CommonText />
        </div>
        <div className="absolute bottom-12 left-1/2 -translate-x-1/2 flex gap-12 text-[#8B5CF6]/30">
            <Globe size={20} /> <Coins size={20} /> <Zap size={20} /> <ShieldCheck size={20} />
        </div>
    </LayoutWrapper>
);

const Variant2 = () => (
    <LayoutWrapper variantName="Glassmorphic Stack">
        <div className="absolute inset-0 bg-[#F2F2F7]" />
        <div className="absolute top-[-20%] left-[-10%] w-[60%] h-[60%] bg-[#A683FF]/15 rounded-full blur-[100px]" />
        <div className="absolute bottom-[-20%] right-[-10%] w-[60%] h-[60%] bg-[#8B5CF6]/10 rounded-full blur-[100px]" />
        <div className="absolute inset-x-20 inset-y-24 bg-white/40 backdrop-blur-2xl rounded-[40px] border border-white/60 shadow-xl flex items-center justify-center overflow-hidden">
            <div className="absolute inset-0 opacity-10 bg-[radial-gradient(circle_at_2px_2px,_lightgrey_1px,_transparent_0)] [background-size:24px_24px]" />
            <CommonText />
        </div>
    </LayoutWrapper>
);

const Variant3 = () => (
    <LayoutWrapper variantName="Industrial Swiss">
        <div className="absolute inset-0 bg-white" />
        <div className="absolute top-0 left-0 w-full h-[1px] bg-black/5" />
        <div className="absolute top-20 left-12 h-[400px] w-px bg-black/5" />
        <div className="absolute inset-0 flex items-center justify-center">
            <div className="p-12 border border-black/5 rounded-none">
                <CommonText />
            </div>
        </div>
        <div className="absolute bottom-12 right-12 text-[10px] font-mono font-black text-black/10 tracking-[0.5em] uppercase">
            ARCH_UNIT_04
        </div>
    </LayoutWrapper>
);

const Variant4 = () => (
    <LayoutWrapper variantName="Abstract Fluid">
        <div className="absolute inset-0 bg-white" />
        <svg className="absolute top-0 right-0 w-[600px] h-full" viewBox="0 0 600 630">
            <defs>
                <linearGradient id="fluid-grad" x1="0%" y1="0%" x2="100%" y2="100%">
                    <stop offset="0%" stopColor="#A683FF" stopOpacity="0.2" />
                    <stop offset="100%" stopColor="#8B5CF6" stopOpacity="0.05" />
                </linearGradient>
            </defs>
            <path d="M600,0 C400,100 500,300 300,400 C150,475 200,630 200,630 L600,630 Z" fill="url(#fluid-grad)" />
        </svg>
        <div className="absolute inset-0 flex items-center justify-center">
            <CommonText />
        </div>
    </LayoutWrapper>
);

const Variant5 = () => (
    <LayoutWrapper variantName="Data Grid Blueprint">
        <div className="absolute inset-0 bg-[#08080C]" />
        <div className="absolute inset-0 opacity-[0.15]"
            style={{ backgroundImage: 'linear-gradient(#8B5CF6 1px, transparent 1px), linear-gradient(90deg, #8B5CF6 1px, transparent 1px)', backgroundSize: '40px 40px' }} />
        <div className="absolute inset-0 flex items-center justify-center">
            <CommonText dark={false} />
        </div>
    </LayoutWrapper>
);

const Variant6 = () => (
    <LayoutWrapper variantName="Neumorphic Soft">
        <div className="absolute inset-0 bg-[#EFEEF5]" />
        <div className="absolute inset-0 flex items-center justify-center">
            <div className="p-20 bg-[#EFEEF5] rounded-[60px] shadow-[20px_20px_40px_#d1d1d9,-20px_-20px_40px_#ffffff]">
                <CommonText />
            </div>
        </div>
    </LayoutWrapper>
);

const Variant7 = () => (
    <LayoutWrapper variantName="Geometric Bauhaus">
        <div className="absolute inset-0 bg-white" />
        <div className="absolute top-12 left-12 w-24 h-24 bg-[#8B5CF6]/10 rounded-full" />
        <div className="absolute bottom-12 right-12 w-32 h-32 border-4 border-[#A683FF]/10 rotate-45" />
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 flex items-center justify-center">
            <CommonText />
        </div>
    </LayoutWrapper>
);

const Variant8 = () => (
    <LayoutWrapper variantName="Cinematic Gradient">
        <div className="absolute inset-0 bg-gradient-to-br from-white via-[#F9F9FB] to-[#A683FF]/10" />
        <div className="absolute top-[10%] right-[10%] opacity-5 text-[200px] font-black pointer-events-none">ANY</div>
        <div className="absolute inset-0 flex items-center justify-center">
            <CommonText />
        </div>
    </LayoutWrapper>
);

const Variant9 = () => (
    <LayoutWrapper variantName="Typographic Bold">
        <div className="absolute inset-0 bg-white" />
        <div className="absolute inset-0 flex flex-col items-center justify-center gap-12">
            <div className="relative">
                <h1 className="text-[12rem] font-black text-black/5 absolute inset-0 -translate-y-1/4 select-none">PAY</h1>
                <CommonText />
            </div>
        </div>
    </LayoutWrapper>
);

const Variant10 = () => (
    <LayoutWrapper variantName="Cyber Organic">
        <div className="absolute inset-0 bg-[#FDFCFF]" />
        <div className="absolute inset-0 flex items-center justify-center">
            <div className="relative">
                <motion.div
                    animate={{ rotate: 360 }}
                    transition={{ duration: 20, repeat: Infinity, ease: "linear" }}
                    className="absolute -inset-20 border border-dashed border-[#8B5CF6]/20 rounded-full"
                />
                <CommonText />
            </div>
        </div>
    </LayoutWrapper>
);

const GraphicsPage = () => {
    const [currentIdx, setCurrentIdx] = useState(0);

    const next = () => setCurrentIdx((prev) => (prev + 1) % VARIANTS.length);
    const prev = () => setCurrentIdx((prev) => (prev - 1 + VARIANTS.length) % VARIANTS.length);

    const CurrentVariant = [
        Variant1, Variant2, Variant3, Variant4, Variant5,
        Variant6, Variant7, Variant8, Variant9, Variant10
    ][currentIdx];

    return (
        <>
            <Head>
                <title>Graphics Generation | AnyLayer</title>
            </Head>
            <main className="min-h-screen bg-[#F0F0F5] p-20 flex flex-col items-center gap-12">

                {/* Controls */}
                <div className="flex items-center gap-8 bg-white px-8 py-4 rounded-full shadow-lg border border-black/5">
                    <button onClick={prev} className="p-2 hover:bg-black/5 rounded-full transition-colors">
                        <ChevronLeft size={24} />
                    </button>
                    <div className="flex flex-col items-center min-w-[200px]">
                        <span className="text-[10px] font-mono font-black text-black/20 uppercase tracking-widest leading-none mb-1">Select Design</span>
                        <span className="text-sm font-black text-black uppercase tracking-tight">{VARIANTS[currentIdx].name}</span>
                    </div>
                    <button onClick={next} className="p-2 hover:bg-black/5 rounded-full transition-colors">
                        <ChevronRight size={24} />
                    </button>
                </div>

                {/* Display Wrapper */}
                <div className="relative group">
                    <AnimatePresence mode="wait">
                        <motion.div
                            key={currentIdx}
                            initial={{ opacity: 0, scale: 0.98 }}
                            animate={{ opacity: 1, scale: 1 }}
                            exit={{ opacity: 0, scale: 1.02 }}
                            transition={{ duration: 0.4, ease: [0.16, 1, 0.3, 1] }}
                        >
                            <CurrentVariant />
                        </motion.div>
                    </AnimatePresence>

                    {/* Quick Access Grid */}
                    <div className="mt-12 grid grid-cols-5 gap-4 w-full">
                        {VARIANTS.map((v, i) => (
                            <button
                                key={v.id}
                                onClick={() => setCurrentIdx(i)}
                                className={`px-4 py-3 rounded-xl border transition-all text-[10px] font-black uppercase tracking-tight text-center
                            ${currentIdx === i
                                        ? 'bg-black text-white border-black'
                                        : 'bg-white text-black/40 border-black/5 hover:border-black/20'}`}
                            >
                                {i + 1}. {v.name}
                            </button>
                        ))}
                    </div>
                </div>

                <div className="max-w-xl text-center">
                    <p className="text-xs text-black/20 font-medium uppercase tracking-[0.2em]">
                        Note: These are banner blueprints (1200x630). Switch between variants to find the perfect professional Photoshop-style layout.
                    </p>
                </div>
            </main>
        </>
    );
};

export default GraphicsPage;
