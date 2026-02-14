'use client';

import React from 'react';
import Image from "next/image";
import Link from "next/link";
import { ArrowRight } from 'lucide-react';

interface FooterLayoutProps {
    email: string;
    setEmail: (email: string) => void;
    status: 'idle' | 'loading' | 'success' | 'error';
    handleSubscribe: (e: React.FormEvent) => void;
    footerIcon: any[];
}

const ProtocolLinks = () => (
    <ul className="flex items-center gap-8 text-[10px] font-mono uppercase tracking-[0.2em] text-white/70">
        <li><Link href="/#architecture" className="hover:text-lightblueprimary transition-colors">Architecture</Link></li>
        <li><Link href="/identity" className="hover:text-lightblueprimary transition-colors">Identity</Link></li>
        <li><Link href="/policy#privacy" className="hover:text-lightblueprimary transition-colors">Privacy Policy</Link></li>
        <li><Link href="/policy#terms" className="hover:text-lightblueprimary transition-colors">Terms of Service</Link></li>
    </ul>
);

const SocialLinks = ({ icons }: { icons: any[] }) => (
    <div className="flex items-center gap-6">
        {icons.map(i => (
            <a key={i.title} href={i.link} className="opacity-60 hover:opacity-100 transition-opacity" target="_blank" rel="noopener noreferrer">
                <Image src={i.icon} alt={i.title} width={18} height={18} className="invert" />
            </a>
        ))}
    </div>
);

// 1. The Ultra-Minimal Horizontal Line - SELECTED LAYOUT
export const Layout1 = ({ email, setEmail, status, handleSubscribe, footerIcon }: FooterLayoutProps) => (
    <div className="w-full space-y-20 py-20">
        <div className="flex flex-col md:flex-row justify-between items-end gap-12">
            <div className="space-y-6 max-w-sm">
                <div className="flex items-center gap-2 group">
                    <Image src="/favicon-logo.svg" alt="Anylayer" width={24} height={24} className="w-6 h-6 object-contain" />
                    <span className="font-inter font-black text-white text-lg tracking-tighter uppercase leading-none">ANYLAYER.</span>
                </div>
                <p className="text-sm text-white/60 font-light leading-relaxed">Securing the digital internet through autonomous trust layers.</p>
            </div>
            <form onSubmit={handleSubscribe} className="relative flex-1 max-w-md border-b border-white/10 pb-2 group focus-within:border-lightblueprimary/50 transition-colors">
                <input
                    type="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    placeholder="Stay updated — Email"
                    className="bg-transparent w-full text-sm py-2 outline-none text-white placeholder:text-white/20 font-mono uppercase tracking-widest"
                />
                <button type="submit" className="absolute right-0 bottom-2 text-white/20 group-hover:text-lightblueprimary transition-colors">
                    <ArrowRight size={18} />
                </button>
            </form>
        </div>
        <div className="flex flex-col md:flex-row justify-between items-center gap-8 border-t border-white/5 pt-8">
            <ProtocolLinks />
            <SocialLinks icons={footerIcon} />
            <p className="text-[9px] font-mono text-white/30 uppercase tracking-[0.4em]">All Right Reserved, Anylayer 2026</p>
        </div>
    </div>
);
