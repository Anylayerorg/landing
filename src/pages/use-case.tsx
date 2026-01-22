import React from 'react';
import Head from 'next/head';
import { Header } from '../components/layout/Header';
import { Footer } from '../components/layout/Footer';
import IndustrialCapital from '../components/IndustrialCapital';
import { motion } from 'framer-motion';

export default function UseCasePage() {
    return (
        <div className="bg-[#08080C] min-h-screen font-geist selection:bg-lightblueprimary/30">
            <Head>
                <title>Use Cases | Anylayer</title>
                <meta name="description" content="Unlock capital, not your data. Explore the diverse use cases of Anylayer's trust protocol across DeFi, payments, and commerce." />
            </Head>

            {/* Atmospheric Background Controls */}
            <div className="fixed inset-0 pointer-events-none z-0">
                <div className="absolute top-0 left-0 w-full h-full bg-[url('/noise.png')] opacity-[0.03] mix-blend-overlay" />
                <div className="absolute top-[-10%] left-[-10%] w-[40%] h-[40%] bg-lightblueprimary/5 blur-[120px] rounded-full" />
                <div className="absolute bottom-[-10%] right-[-10%] w-[40%] h-[40%] bg-blueprimary/5 blur-[120px] rounded-full" />
            </div>

            <Header />

            <main className="relative z-10 pt-32">
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 1, ease: [0.16, 1, 0.3, 1] }}
                >
                    <IndustrialCapital />
                </motion.div>
            </main>

            <Footer />
        </div>
    );
}
