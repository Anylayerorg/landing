'use client';

import React, { useState } from 'react';
import Image from "next/image";
import Link from "next/link";
import { Send, CheckCircle2, Loader2 } from 'lucide-react';
import { Layout1 } from '@/components/FooterLayouts';

const footerIcon = [
  { title: "Telegram", link: "https://t.me/dotanylayer", icon: "/telegram.svg", width: 17, height: 14 },
  { title: "Discord", link: "https://discord.gg/ZmnsPMKgjw", icon: "/discord.svg", width: 16, height: 14 },
  { title: "Linkedin", link: "https://www.linkedin.com/company/anylayer/", icon: "/linkedin.svg", width: 16, height: 16 },
  { title: "X", link: "https://x.com/anylayerorg", icon: "/twitter.svg", width: 13, height: 13 },
];

const Newsletter = () => {
  const [email, setEmail] = useState('');
  const [status, setStatus] = useState<'idle' | 'loading' | 'success' | 'error'>('idle');

  const handleSubscribe = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!email) return;

    setStatus('loading');
    try {
      const response = await fetch('/api/subscribe', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email, type: 'newsletter' }),
      });

      if (!response.ok) throw new Error('Subscription failed');

      setStatus('success');
      setEmail('');
      setTimeout(() => setStatus('idle'), 5000);
    } catch (error) {
      console.error('Subscription error:', error);
      setStatus('error');
      setTimeout(() => setStatus('idle'), 5000);
    }
  };

  return (
    <div className="space-y-6 max-w-md">
      <h3 className="text-2xl md:text-3xl font-semibold text-white tracking-tighter leading-tight">
        Stay updated on <span className="text-lightblueprimary">Anylayer.</span>
      </h3>
      <form onSubmit={handleSubscribe} className="relative flex items-center p-1 rounded-full border border-white/10 bg-white/5 backdrop-blur-xl group hover:border-lightblueprimary/30 transition-all">
        <input
          type="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          placeholder="Enter email..."
          className="bg-transparent flex-1 px-6 py-3 text-sm text-white outline-none placeholder:text-white/20"
          disabled={status === 'loading' || status === 'success'}
        />
        <button
          type="submit"
          disabled={status === 'loading' || status === 'success'}
          className="bg-lightblueprimary text-black p-3 rounded-full hover:scale-105 active:scale-95 transition-all disabled:opacity-50"
        >
          {status === 'loading' ? (
            <Loader2 size={18} className="animate-spin" />
          ) : status === 'success' ? (
            <CheckCircle2 size={18} />
          ) : (
            <Send size={18} />
          )}
        </button>
      </form>
      {status === 'success' && (
        <p className="text-[10px] text-green-400 font-mono uppercase tracking-widest animate-pulse">Successfully joined the list!</p>
      )}
      {status === 'error' && (
        <p className="text-[10px] text-red-400 font-mono uppercase tracking-widest">Something went wrong. Try again.</p>
      )}
    </div>
  );
};

const Links = () => (
  <div className="grid grid-cols-2 md:grid-cols-3 gap-8 md:gap-24">
    <div className="space-y-6">
      <h4 className="text-[10px] font-mono text-lightblueprimary font-black uppercase tracking-[0.4em]">Protocol</h4>
      <ul className="space-y-3 text-sm text-white/40 font-light">
        {[
          { label: "Architecture", href: "/#architecture" },
          { label: "Identity", href: "/identity" }
        ].map(l => (
          <li key={l.label}>
            <Link href={l.href} className="hover:text-white transition-colors cursor-pointer">
              {l.label}
            </Link>
          </li>
        ))}
      </ul>
    </div>
    <div className="space-y-6">
      <h4 className="text-[10px] font-mono text-lightblueprimary font-black uppercase tracking-[0.4em]">Builders</h4>
      <ul className="space-y-3 text-sm text-white/40 font-light">
        {[
          { label: "Documentation", href: "/docs" },
          { label: "SDK Reference", href: "#" },
          { label: "Tutorials", href: "#" },
          { label: "API Keys", href: "#" }
        ].map(l => (
          <li key={l.label}>
            <Link href={l.href} className="hover:text-white transition-colors cursor-pointer">
              {l.label}
            </Link>
          </li>
        ))}
      </ul>
    </div>
    <div className="space-y-6">
      <h4 className="text-[10px] font-mono text-lightblueprimary font-black uppercase tracking-[0.4em]">Community</h4>
      <ul className="space-y-3 text-sm text-white/40 font-light">
        {["Governance", "ZK DAO", "News", "Support"].map(l => (
          <li key={l} className="hover:text-white transition-colors cursor-pointer">{l}</li>
        ))}
      </ul>
    </div>
  </div>
);

export function Footer() {
  const [email, setEmail] = useState('');
  const [status, setStatus] = useState<'idle' | 'loading' | 'success' | 'error'>('idle');

  const handleSubscribe = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!email) return;

    setStatus('loading');
    try {
      const response = await fetch('/api/subscribe', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email, type: 'newsletter' }),
      });

      if (!response.ok) throw new Error('Subscription failed');

      setStatus('success');
      setEmail('');
      setTimeout(() => setStatus('idle'), 5000);
    } catch (error) {
      console.error('Subscription error:', error);
      setStatus('error');
      setTimeout(() => setStatus('idle'), 5000);
    }
  };

  return (
    <footer className="relative bg-[#08080C] overflow-hidden w-full pb-20">
      <div className="absolute top-0 left-0 w-full h-px bg-gradient-to-r from-transparent via-white/5 to-transparent" />

      <div className="relative w-full max-w-screen-xl mx-auto px-4 md:px-6">
        <Layout1
          email={email}
          setEmail={setEmail}
          status={status}
          handleSubscribe={handleSubscribe}
          footerIcon={footerIcon}
        />
      </div>
    </footer>
  );
}
