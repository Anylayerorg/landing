import React, { useState, useEffect } from 'react';
import Head from 'next/head';
import { motion, AnimatePresence } from 'framer-motion';
import { SEO } from '@/components/layout/SEO';

const words = [
    "on-chain Reputation",
    "AI agents",
    "Payments",
    "Socials",
    "Gaming",
    "and many more."
];

const Screen1 = ({ onPrev, onNext }: { onPrev: () => void; onNext: () => void }) => {
    const [index, setIndex] = useState(0);
    const [showWords, setShowWords] = useState(false);

    useEffect(() => {
        const initTimer = setTimeout(() => {
            setShowWords(true);
        }, 1000);
        return () => clearTimeout(initTimer);
    }, []);

    useEffect(() => {
        if (!showWords) return;
        const timer = setInterval(() => {
            setIndex((prev) => (prev + 1) % words.length);
        }, 1500); // Faster cycle since it's an instant cut
        return () => clearInterval(timer);
    }, [showWords]);

    return (
        <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.5, ease: "easeInOut" }}
            className="w-full h-full flex flex-col items-center justify-center relative z-10 px-6"
        >
            <div className="flex flex-col md:flex-row items-center justify-center text-3xl md:text-5xl lg:text-6xl font-light tracking-tighter text-center leading-none w-full max-w-5xl h-[120px]">
                <div className="md:w-1/2 flex justify-center md:justify-end pr-4">
                    <motion.span
                        initial={{ y: -50, opacity: 0 }}
                        animate={{ y: 0, opacity: 1 }}
                        transition={{ type: "spring", stiffness: 300, damping: 20, delay: 0.2 }}
                        className="text-white whitespace-nowrap"
                    >
                        For your
                    </motion.span>
                </div>

                <div className="md:w-1/2 flex justify-center md:justify-start pl-4">
                    {showWords && (
                        <motion.div
                            initial={{ y: -50, opacity: 0 }}
                            animate={{ y: 0, opacity: 1 }}
                            transition={{ type: "spring", stiffness: 300, damping: 20, delay: 0.6 }}
                            className="font-black text-white text-left min-w-[300px] text-2xl md:text-4xl lg:text-5xl"
                            style={{
                                backgroundImage: 'linear-gradient(to bottom right, #ffffff, #22D3EE)',
                                WebkitBackgroundClip: 'text',
                                WebkitTextFillColor: 'transparent',
                            }}
                        >
                            {words[index]}
                        </motion.div>
                    )}
                </div>
            </div>

        </motion.div>
    );
};

const screen2Data = [
    { label: "wallet addresses?", value1: "0x1B7401B5b6d8976F...2F9A", value2: "0x71C7656EC7ab88b09" },
    { label: "AI agents?", value1: "0x8bA3297aC10...4C91", value2: "0x9cE1Bf...2A4F" },
    { label: "IBANs?", value1: "UK89 ABCD 1234", value2: "5678 9012 BOFAUS3N" },
    { label: "Payment IDs?", value1: "pay_req_1x9df2", value2: "kqw_992_amt_4200" }
];

const Screen2 = ({ onPrev, onNext }: { onPrev: () => void; onNext: () => void }) => {
    const [index, setIndex] = useState(0);

    useEffect(() => {
        const timer = setInterval(() => {
            setIndex((prev) => (prev + 1) % screen2Data.length);
        }, 1500); // Shorter interval since it's instant
        return () => clearInterval(timer);
    }, []);

    return (
        <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.5, ease: "easeInOut" }}
            className="w-full h-full flex flex-col items-center justify-center relative z-10 px-6 gap-10"
        >
            <div className="flex flex-col md:flex-row items-center w-full max-w-4xl text-xl md:text-3xl lg:text-4xl font-light tracking-tight gap-4 md:gap-0">
                <div className="md:w-1/2 flex justify-center md:justify-end md:pr-4">
                    <span className="text-white whitespace-nowrap">still copy-pasting</span>
                </div>
                <div className="md:w-1/2 flex justify-center md:justify-start md:pl-4">
                    <div className="px-5 py-2 rounded-xl bg-[#22D3EE] text-black font-bold shadow-[0_0_25px_rgba(34,211,238,0.5)] whitespace-nowrap min-w-[240px] text-center md:text-left flex items-center justify-center md:justify-start">
                        {screen2Data[index].label}
                    </div>
                </div>
            </div>

            <div className="w-full max-w-3xl p-5 md:p-6 rounded-2xl border border-white/10 bg-[#08080C]/80 backdrop-blur-xl font-mono text-xs md:text-lg text-white/70 overflow-hidden whitespace-nowrap text-ellipsis flex items-center justify-start md:justify-center shadow-2xl">
                <span className="text-white">{screen2Data[index].value1}</span>
                <motion.div
                    animate={{ opacity: [1, 0.4, 1] }}
                    transition={{ duration: 1, repeat: Infinity }}
                    className="w-[2px] h-5 md:h-6 bg-[#22D3EE] mx-3 shadow-[0_0_12px_#22D3EE]"
                />
                <span className="text-[#22D3EE]/60">{screen2Data[index].value2}</span>
            </div>

            {/* Removed navigation hint for automation */}
        </motion.div>
    );
};

const screen3Prefixes = [
    "ai", "x", "pay", "btc", "wallet",
    "bet", "exchange", "predict", "game"
];

const Screen3 = ({ onPrev, onNext }: { onPrev: () => void; onNext: () => void }) => {
    const [index, setIndex] = useState(0);
    const [showPrefixes, setShowPrefixes] = useState(false);

    useEffect(() => {
        const initTimer = setTimeout(() => {
            setShowPrefixes(true);
        }, 1200); // Wait for the intro text to drop
        return () => clearTimeout(initTimer);
    }, []);

    useEffect(() => {
        if (!showPrefixes) return;
        const timer = setInterval(() => {
            setIndex((prev) => (prev + 1) % screen3Prefixes.length);
        }, 1000); // 1 second instant replacement
        return () => clearInterval(timer);
    }, [showPrefixes]);

    return (
        <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0 }}
            className="w-full h-full flex flex-col items-center justify-center relative z-10 px-6 gap-6"
        >
            <div className="flex flex-col md:flex-row items-center justify-center gap-6 text-3xl md:text-5xl lg:text-6xl font-light tracking-tighter text-center">
                <div className="flex flex-col md:flex-row gap-2 md:gap-4 items-center">
                    <motion.span
                        initial={{ y: -50, opacity: 0 }}
                        animate={{ y: 0, opacity: 1 }}
                        transition={{ type: "spring", stiffness: 300, damping: 20, delay: 0.2 }}
                        className="font-black text-[#22D3EE] px-2"
                    >
                        .any
                    </motion.span>
                    <motion.span
                        initial={{ y: -50, opacity: 0 }}
                        animate={{ y: 0, opacity: 1 }}
                        transition={{ type: "spring", stiffness: 300, damping: 20, delay: 0.6 }}
                        className="text-white px-2"
                    >
                        is all you need.
                    </motion.span>
                </div>
            </div>

            <div className="h-[60px] md:h-[90px] flex items-center justify-center w-full relative mt-2">
                {showPrefixes && (
                    <div
                        className="absolute w-full flex text-4xl md:text-6xl lg:text-8xl font-black tracking-tighter leading-none"
                    >
                        <div className="w-1/2 flex justify-end text-right">
                            {/* The cycling name part - NOW PLAIN WHITE */}
                            <span className="text-white">
                                {screen3Prefixes[index]}
                            </span>
                        </div>
                        <div className="w-1/2 flex justify-start text-left">
                            {/* The sticky .any part */}
                            <span className="text-[#22D3EE]">
                                .any
                            </span>
                        </div>
                    </div>
                )}
            </div>

            {/* Removed navigation hint for automation */}
        </motion.div>
    );
};

const Screen4 = ({ onPrev }: { onPrev: () => void }) => {
    return (
        <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.5 }}
            className="w-full h-full flex flex-col items-center justify-center relative z-10 px-6 gap-8"
        >
            <div className="flex flex-col items-center justify-center text-center gap-6">
                <motion.div
                    initial={{ y: -50, opacity: 0 }}
                    animate={{ y: 0, opacity: 1 }}
                    transition={{ type: "spring", stiffness: 200, damping: 25, delay: 0.2 }}
                    className="text-4xl md:text-6xl lg:text-9xl font-black italic tracking-tighter flex items-center gap-4"
                >
                    <span className="text-[#22D3EE]">.any</span>
                    <span className="text-white">names</span>
                </motion.div>
                <motion.div
                    initial={{ scale: 0.9, opacity: 0 }}
                    animate={{ scale: 1, opacity: 1 }}
                    transition={{ duration: 0.8, delay: 0.8 }}
                    className="text-2xl md:text-4xl lg:text-5xl font-light text-white tracking-tight drop-shadow-[0_0_15px_rgba(255,255,255,0.3)]"
                >
                    Reservation is live.
                </motion.div>
            </div>

            <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 1.5, duration: 1 }}
                className="mt-12 flex flex-col items-center gap-4"
            >
                <div className="flex items-center gap-2 opacity-40 hover:opacity-100 transition-opacity cursor-default group">
                    <span className="text-[10px] uppercase tracking-widest font-mono text-white/50">Powered by</span>
                    <div className="flex items-center gap-1.5 ml-1">
                        <img src="/favicon-logo.svg" alt="Logo" className="w-5 h-5" />
                        <span className="font-black text-white text-sm tracking-tighter uppercase leading-none">ANYLAYER.</span>
                    </div>
                </div>
            </motion.div>

            {/* Removed navigation hint for automation */}
        </motion.div>
    );
};

const ManifestoPage = () => {
    const [currentScreen, setCurrentScreen] = useState(0);

    useEffect(() => {
        const timings = [7000, 10000, 10000, 10000]; // Timing for each screen in ms

        const timer = setTimeout(() => {
            setCurrentScreen((prev) => (prev + 1) % 4);
        }, timings[currentScreen]);

        return () => clearTimeout(timer);
    }, [currentScreen]);

    return (
        <div className="bg-[#040406] min-h-screen font-geist text-white selection:bg-[#22D3EE] selection:text-black overflow-hidden relative">
            <Head>
                <title>Manifesto | Anylayer</title>
                <meta name="description" content="One identity for everything." />
            </Head>
            <SEO title="Manifesto" description="One identity for everything." image="/dashboard.png" />

            {/* Cinematic Background Layer */}
            <div className="fixed inset-0 z-0 pointer-events-none">
                <motion.img
                    initial={{ scale: 1.05, opacity: 0 }}
                    animate={{ scale: 1, opacity: 0.4 }}
                    transition={{ duration: 4, ease: "easeOut" }}
                    src="/dashboard.png"
                    alt="Background"
                    className="w-full h-full object-cover"
                />
                <div className="absolute inset-0 bg-gradient-to-b from-[#040406]/80 via-[#040406]/40 to-[#040406]" />
            </div>

            {/* Screen Container */}
            <div className="relative w-full h-screen z-10 flex flex-col">
                <AnimatePresence mode="wait">
                    {currentScreen === 0 && (
                        <Screen2 key="screen2" onPrev={() => { }} onNext={() => setCurrentScreen(1)} />
                    )}
                    {currentScreen === 1 && (
                        <Screen3 key="screen3" onPrev={() => setCurrentScreen(0)} onNext={() => setCurrentScreen(2)} />
                    )}
                    {currentScreen === 2 && (
                        <Screen1 key="screen1" onPrev={() => setCurrentScreen(1)} onNext={() => setCurrentScreen(3)} />
                    )}
                    {currentScreen === 3 && (
                        <Screen4 key="screen4" onPrev={() => setCurrentScreen(2)} />
                    )}
                </AnimatePresence>
            </div>

            {/* Pagination removed for Video Mode */}
        </div>
    );
};

export default ManifestoPage;
