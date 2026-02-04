import React from 'react';
import Head from 'next/head';
import { Header } from '../components/layout/Header';
import { Footer } from '../components/layout/Footer';
import IndustrialCapital from '../components/IndustrialCapital';
import { BlogWidget } from '../components/BlogWidget';
import { motion } from 'framer-motion';
import { UtilityHero } from '../components/UtilityHero';

export default function UseCasePage() {
    return (
        <div className="bg-[#08080C] min-h-screen font-geist selection:bg-lightblueprimary/30">
            <Head>
                <title>Use Cases | Anylayer</title>
                <meta name="description" content="Utility Layer: Programmable reputation for the new internet. Explore the diverse use cases of Anylayer's trust protocol across DeFi, payments, and commerce." />
            </Head>

            {/* Atmospheric Background Controls */}
            <div className="fixed inset-0 pointer-events-none z-0">
                <div className="absolute top-0 left-0 w-full h-full bg-[url('/noise.png')] opacity-[0.03] mix-blend-overlay" />
                <div className="absolute top-[-10%] left-[-10%] w-[40%] h-[40%] bg-lightblueprimary/5 blur-[120px] rounded-full" />
                <div className="absolute bottom-[-10%] right-[-10%] w-[40%] h-[40%] bg-blueprimary/5 blur-[120px] rounded-full" />
            </div>

            <Header />

            <main className="relative z-10">
                <UtilityHero />

                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 1, ease: [0.16, 1, 0.3, 1] }}
                >
                    <IndustrialCapital />
                </motion.div>

                <div className="border-t border-white/5 bg-[#08080C]">
                    <BlogWidget
                        limit={3}
                        title="Ecosystem Updates"
                        subtitle="Explore how the reputation layer is transforming diverse industries."
                        dark={true}
                    />
                </div>
            </main>

            <Footer />
        </div>
    );
}
