import React, { useState } from 'react';
import Head from 'next/head';
import { BuilderHeroRedesign } from '@/components/BuilderHeroRedesign';
import { Header } from '@/components/layout/Header';
import { Footer } from '@/components/layout/Footer';

const HeroPreviewPage = () => {
    const [activeVariant, setActiveVariant] = useState(1);

    return (
        <div className="bg-[#08080C] min-h-screen font-geist text-white">
            <Head>
                <title>Hero Section Redesign Preview | Anylayer</title>
            </Head>

            <Header />

            <main className="pt-32">
                {/* Selector Panel */}
                <div className="fixed bottom-8 left-1/2 -translate-x-1/2 z-[100] bg-black/80 backdrop-blur-xl border border-white/10 p-2 rounded-2xl flex items-center gap-1 shadow-2xl overflow-x-auto max-w-[95vw]">
                    <div className="px-4 py-2 border-r border-white/5 mr-2">
                        <span className="text-[10px] font-mono text-white/40 uppercase tracking-widest block">Layout</span>
                        <span className="text-lg font-bold text-[#A683FF] tabular-nums">{activeVariant.toString().padStart(2, '0')}</span>
                    </div>
                    <div className="flex gap-1">
                        {[...Array(15)].map((_, i) => (
                            <button
                                key={i}
                                onClick={() => setActiveVariant(i + 1)}
                                className={`w-10 h-10 rounded-xl font-bold transition-all flex items-center justify-center text-sm ${activeVariant === i + 1
                                        ? 'bg-[#A683FF] text-black scale-110 shadow-[0_0_20px_rgba(166,131,255,0.4)]'
                                        : 'bg-white/5 text-white/40 hover:bg-white/10 hovre:text-white'
                                    }`}
                            >
                                {i + 1}
                            </button>
                        ))}
                    </div>
                </div>

                {/* Hero Display */}
                <BuilderHeroRedesign activeVariant={activeVariant} />

                {/* Info Section */}
                <section className="max-w-7xl mx-auto px-6 py-20 border-t border-white/5 bg-black/20">
                    <div className="grid md:grid-cols-3 gap-12 text-center md:text-left">
                        <div className="space-y-4">
                            <h3 className="text-[#A683FF] font-mono text-xs uppercase tracking-widest">Aesthetic</h3>
                            <p className="text-white/40 text-sm">Premium Swiss Industrial focus with monochrome foundations and precise accent spacing.</p>
                        </div>
                        <div className="space-y-4">
                            <h3 className="text-[#A683FF] font-mono text-xs uppercase tracking-widest">Layouts</h3>
                            <p className="text-white/40 text-sm">15 variations ranging from centered typography to technical HUDs and minimalist bauhaus.</p>
                        </div>
                        <div className="space-y-4">
                            <h3 className="text-[#A683FF] font-mono text-xs uppercase tracking-widest">Instruction</h3>
                            <p className="text-white/40 text-sm">Use the selector at the bottom to toggle between designs. Pick the one that fits the brand best.</p>
                        </div>
                    </div>
                </section>
            </main>

            <Footer />
        </div>
    );
};

export default HeroPreviewPage;
