import React from 'react';
import Head from 'next/head';
import { motion } from 'framer-motion';
import { SEO } from '@/components/layout/SEO';

const GoldAirdropIcon = ({ className }: { className?: string }) => (
    <svg viewBox="0 0 120 120" className={className} fill="none" xmlns="http://www.w3.org/2000/svg">
        <defs>
            <linearGradient id="goldGrad" x1="0%" y1="0%" x2="100%" y2="100%">
                <stop offset="0%" stopColor="#BF953F" />
                <stop offset="25%" stopColor="#FFD700" />
                <stop offset="50%" stopColor="#FFFACD" />
                <stop offset="75%" stopColor="#FFD700" />
                <stop offset="100%" stopColor="#BF953F" />
            </linearGradient>
        </defs>
        {/* Parachute Canopy */}
        <path
            d="M10 50C10 22.3858 32.3858 0 60 0C87.6142 0 110 22.3858 110 50C110 55 105 60 100 60C95 60 90 55 90 50C90 55 85 60 80 60C75 60 70 55 70 50C70 55 65 60 60 60C55 60 50 55 50 50C50 55 45 60 40 60C35 60 30 55 30 50C30 55 25 60 20 60C15 60 10 55 10 50Z"
            fill="url(#goldGrad)"
        />
        {/* Strings */}
        <path d="M10 52L60 90M110 52L60 90M30 55L60 90M90 55L60 90M50 58L60 90M70 58L60 90" stroke="#FFD700" strokeWidth="1" opacity="0.6" />
        {/* Crate */}
        <rect x="45" y="90" width="30" height="25" rx="4" fill="#000" stroke="url(#goldGrad)" strokeWidth="3" />
        <rect x="52" y="97" width="16" height="11" rx="1" stroke="#FFD700" strokeWidth="1" opacity="0.4" />
    </svg>
);

const Screen5 = () => {
    return (
        <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.5 }}
            className="w-full h-full flex flex-col items-center justify-center relative z-10 px-6 gap-0"
        >
            <style jsx>{`
                @keyframes twinkle {
                    0%, 100% { opacity: 0; transform: scale(0) rotate(0deg); filter: blur(4px); }
                    50% { opacity: 1; transform: scale(1.6) rotate(180deg); filter: blur(0px); }
                }

                @keyframes glide {
                    0% { background-position: 0% 50%; }
                    50% { background-position: 100% 50%; }
                    100% { background-position: 0% 50%; }
                }

                .gold-glitter-text {
                    display: inline-block;
                    position: relative;
                    color: #FFD700 !important; /* Force gold color */
                    background: linear-gradient(
                        90deg,
                        #BF953F 0%,
                        #FFD700 25%,
                        #FFFACD 50%,
                        #FFD700 75%,
                        #BF953F 100%
                    );
                    background-size: 200% auto;
                    -webkit-background-clip: text;
                    background-clip: text;
                    -webkit-text-fill-color: transparent !important;
                    animation: glide 4s linear infinite;
                    filter: drop-shadow(0 0 15px rgba(255, 215, 0, 0.4));
                }

                .star-brilliant {
                    position: absolute;
                    width: 40px;
                    height: 40px;
                    background: #FFD700;
                    clip-path: polygon(50% 0%, 61% 35%, 98% 35%, 68% 57%, 79% 91%, 50% 70%, 21% 91%, 32% 57%, 2% 35%, 39% 35%);
                    filter: drop-shadow(0 0 20px #FFD700) drop-shadow(0 0 40px #FFAD00);
                    animation: twinkle 4s infinite ease-in-out;
                    pointer-events: none;
                    z-index: 20;
                }
            `}</style>

            <div className="flex flex-col items-center justify-center text-center relative pointer-events-none">
                {/* sparkling stars around the text */}
                <div className="star-brilliant" style={{ top: '-20%', left: '10%', animationDelay: '0s' }} />
                <div className="star-brilliant" style={{ top: '0%', right: '-5%', animationDelay: '1.2s', width: '25px', height: '25px' }} />
                <div className="star-brilliant" style={{ bottom: '15%', left: '-10%', animationDelay: '2.4s', width: '35px', height: '35px' }} />
                <div className="star-brilliant" style={{ top: '55%', right: '15%', animationDelay: '0.6s', width: '20px', height: '20px' }} />
                <div className="star-brilliant" style={{ bottom: '-15%', left: '45%', animationDelay: '3s', width: '30px', height: '30px' }} />

                <motion.h1
                    initial={{ scale: 0.9, opacity: 0 }}
                    animate={{ scale: 1, opacity: 1 }}
                    transition={{ type: "spring", stiffness: 150, damping: 15, delay: 0.3 }}
                    className="text-[3.5rem] md:text-[6.5rem] lg:text-[11rem] font-black italic tracking-tighter"
                >
                    <span className="gold-glitter-text z-10 px-6 pr-8">
                        $100,000
                    </span>
                </motion.h1>
            </div>

            <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 1.5, duration: 1 }}
                className="mt-2 flex flex-col items-center gap-4 relative z-[60]"
            >
                <div className="flex flex-col md:flex-row items-center gap-1 md:gap-3 opacity-100 cursor-default">
                    <span className="text-[10px] md:text-sm uppercase tracking-[0.4em] font-mono text-white/40">Anylayer's</span>
                    <span className="font-black text-white text-base md:text-xl tracking-tighter uppercase leading-none">Credit.</span>
                </div>
            </motion.div>
        </motion.div>
    );
};

const ManifestoPage = () => {
    const [isMounted, setIsMounted] = React.useState(false);

    React.useEffect(() => {
        setIsMounted(true);
    }, []);

    return (
        <div className="bg-[#040406] min-h-screen font-geist text-white selection:bg-[#22D3EE] selection:text-black relative">
            <Head>
                <title>Manifesto | Anylayer</title>
                <meta name="description" content="One identity for everything." />
            </Head>
            <SEO title="Manifesto" description="One identity for everything." image="/dashboard.png" />

            {/* Brute-Force Airdrop Layer - ABSOLUTE TOP */}
            {isMounted && (
                <div className="fixed inset-0 pointer-events-none z-[9999] overflow-visible">
                    {/* Parachute 1 - Left */}
                    <motion.div
                        initial={{ top: '-20vh', left: '15vw', opacity: 1 }}
                        animate={{
                            top: '120vh',
                            left: ['15vw', '25vw', '15vw'],
                        }}
                        transition={{
                            duration: 15,
                            ease: "linear",
                            repeat: Infinity,
                        }}
                        className="absolute"
                    >
                        <GoldAirdropIcon className="w-48 md:w-72 drop-shadow-[0_0_50px_rgba(255,215,0,0.4)] brightness-125" />
                    </motion.div>

                    {/* Parachute 2 - Right */}
                    <motion.div
                        initial={{ top: '-25vh', left: '65vw', opacity: 1 }}
                        animate={{
                            top: '120vh',
                            left: ['65vw', '55vw', '65vw'],
                        }}
                        transition={{
                            duration: 18,
                            delay: 4,
                            ease: "linear",
                            repeat: Infinity,
                        }}
                        className="absolute"
                    >
                        <GoldAirdropIcon className="w-40 md:w-60 brightness-110" />
                    </motion.div>

                    {/* Parachute 3 - Far Center */}
                    <motion.div
                        initial={{ top: '-30vh', left: '45vw', opacity: 1 }}
                        animate={{
                            top: '120vh',
                            left: ['45vw', '48vw', '45vw'],
                        }}
                        transition={{
                            duration: 22,
                            delay: 8,
                            ease: "linear",
                            repeat: Infinity,
                        }}
                        className="absolute"
                    >
                        <GoldAirdropIcon className="w-32 md:w-48 opacity-60 blur-[0.5px]" />
                    </motion.div>
                </div>
            )}

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
                <Screen5 />
            </div>
        </div>
    );
};

export default ManifestoPage;
