import React from 'react';
import Head from 'next/head';
import Link from 'next/link';
import Image from 'next/image';
import { motion } from 'framer-motion';
import { SEO } from '@/components/layout/SEO';

const TechnicalGrid = () => {
    return (
        <div className="fixed inset-0 pointer-events-none z-0 overflow-hidden">
            {/* Main Grid */}
            <div className="absolute inset-0 opacity-[0.1] bg-[url('https://grainy-gradients.vercel.app/noise.svg')] brightness-50" />
            <div
                className="absolute inset-0"
                style={{
                    backgroundImage: `linear-gradient(to right, #ffffff10 1px, transparent 1px), linear-gradient(to bottom, #ffffff10 1px, transparent 1px)`,
                    backgroundSize: '40px 40px',
                    maskImage: 'radial-gradient(circle at 50% 50%, black, transparent 80%)'
                }}
            />
            {/* Scanning Line */}
            <motion.div
                animate={{ top: ['-20%', '120%'] }}
                transition={{ duration: 8, repeat: Infinity, ease: "linear" }}
                className="absolute left-0 right-0 h-[30vh] bg-gradient-to-b from-transparent via-[#A683FF]/10 to-transparent z-[1]"
            />
        </div>
    );
};

const CountUp = ({ to, duration = 2 }: { to: number; duration?: number }) => {
    const [count, setCount] = React.useState(0);

    React.useEffect(() => {
        let startTime: number;
        let animationFrame: number;

        const frame = (time: number) => {
            if (!startTime) startTime = time;
            const progress = Math.min((time - startTime) / (duration * 1000), 1);
            setCount(Math.floor(progress * to));
            if (progress < 1) animationFrame = requestAnimationFrame(frame);
        };

        animationFrame = requestAnimationFrame(frame);
        return () => cancelAnimationFrame(animationFrame);
    }, [to, duration]);

    return <span>{count.toLocaleString()}</span>;
};

const Screen5 = () => {
    return (
        <div className="w-full h-full flex flex-col items-center justify-center relative z-10 px-6 font-geist">
            {/* Corner Indicators */}
            <div className="absolute top-12 left-12 flex flex-col gap-1 opacity-40 font-mono text-[10px] uppercase tracking-widest hidden md:flex">
                <span>Network Status: Operational</span>
                <span>ID Registry: Scaling</span>
            </div>
            <div className="absolute top-12 right-12 flex flex-col items-end gap-1 opacity-40 font-mono text-[10px] uppercase tracking-widest hidden md:flex">
                <span>Phase 01: Complete</span>
                <span>Uptime: 99.99%</span>
            </div>

            <motion.div
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8, ease: "easeOut" }}
                className="flex flex-col items-center text-center max-w-4xl"
            >
                {/* Brand Logo */}
                <div className="flex items-center gap-2 mb-8 opacity-80 scale-110">
                    <Image
                        src="/favicon-logo.svg"
                        alt="Anylayer"
                        width={28}
                        height={28}
                        className="w-auto h-7"
                    />
                    <span className="font-inter font-black text-white text-2xl tracking-tighter uppercase leading-none pb-0.5">
                        ANYLAYER.
                    </span>
                </div>

                {/* Technical Label */}
                <div className="flex items-center gap-4 mb-6">
                    <div className="w-12 h-[1px] bg-[#A683FF]/30" />
                    <span className="text-[#A683FF] text-xs font-mono tracking-[0.4em] uppercase">Milestone Achieved</span>
                    <div className="w-12 h-[1px] bg-[#A683FF]/30" />
                </div>

                {/* Main Number */}
                <h1 className="text-[7rem] md:text-[12rem] lg:text-[16rem] font-bold tracking-tighter leading-none text-white selection:bg-[#A683FF] selection:text-black">
                    <CountUp to={25000} duration={2.5} />
                </h1>

                {/* Divider Line */}
                <motion.div
                    initial={{ width: 0 }}
                    animate={{ width: '100%' }}
                    transition={{ delay: 0.5, duration: 1.5, ease: "circOut" }}
                    className="h-[1px] bg-gradient-to-r from-transparent via-[#A683FF]/50 to-transparent my-8"
                />

                <style jsx>{`
                .milestone-glow {
                    animation: pulse-glow 3s infinite ease-in-out;
                }

                @keyframes pulse-glow {
                    0%, 100% { filter: drop-shadow(0 0 20px rgba(166, 131, 255, 0.2)); }
                    50% { filter: drop-shadow(0 0 40px rgba(166, 131, 255, 0.4)); }
                }
            `}</style>
                <motion.div
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ delay: 1.5, duration: 1 }}
                    className="flex flex-col items-center"
                >
                    <h2 className="text-xl md:text-3xl font-light tracking-[0.3em] uppercase text-white/80 mb-4">
                        Reserved Names
                    </h2>

                    <div className="flex items-center gap-6 mt-4">
                        <div className="flex flex-col items-center">
                            <span className="text-[10px] font-mono opacity-40 uppercase tracking-widest mb-1">Growth Rate</span>
                            <span className="text-[#A683FF] text-sm">+142%</span>
                        </div>
                        <div className="w-[1px] h-8 bg-white/10" />
                        <div className="flex flex-col items-center">
                            <span className="text-[10px] font-mono opacity-40 uppercase tracking-widest mb-1">Total Identities</span>
                            <span className="text-sm font-mono tracking-tighter italic">SCALING...</span>
                        </div>
                    </div>
                </motion.div>
            </motion.div>

            {/* Bottom Credit */}
            <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 2.2, duration: 1 }}
                className="absolute bottom-12 flex items-center gap-3"
            >
                <div className="w-8 h-[1px] bg-white/20" />
                <span className="text-[10px] uppercase tracking-[0.5em] font-mono text-white/40">Anylayer ecosystem</span>
                <div className="w-8 h-[1px] bg-white/20" />
            </motion.div>
        </div>
    );
};

const ManifestoPage = () => {
    const [isMounted, setIsMounted] = React.useState(false);

    React.useEffect(() => {
        setIsMounted(true);
    }, []);

    return (
        <div className="bg-[#040406] min-h-screen font-geist text-white selection:bg-[#A683FF] selection:text-black relative overflow-hidden">
            <Head>
                <title>25,000 Names | Anylayer Milestone</title>
                <meta name="description" content="Celebrating the 25,000 Milestone on Anylayer." />
            </Head>
            <SEO title="25K Milestone" description="Celebrating 25,000 reserved names." image="/dashboard.png" />

            {/* Technical Background Layer */}
            {isMounted && <TechnicalGrid />}

            {/* Cinematic Overlay Layer */}
            <div className="fixed inset-0 z-0 pointer-events-none">
                <div className="absolute inset-0 bg-gradient-to-b from-[#040406] via-transparent to-[#040406] opacity-60 z-[2]" />
                <motion.img
                    initial={{ scale: 1.1, opacity: 0 }}
                    animate={{ scale: 1, opacity: 0.2 }}
                    transition={{ duration: 6, ease: "easeOut" }}
                    src="/dashboard.png"
                    alt="Background"
                    className="w-full h-full object-cover grayscale opacity-20"
                />
            </div>

            {/* Screen Container */}
            <div className="relative w-full h-screen z-10 flex flex-col">
                <Screen5 />
            </div>
        </div>
    );
};

export default ManifestoPage;
