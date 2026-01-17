'use client';

import React from 'react';
import Image from "next/image";
import Link from "next/link";
import { Send } from 'lucide-react';

const footerIcon = [
  { title: "Telegram", link: "https://t.me/zksnews#", icon: "/telegram.svg", width: 17, height: 14 },
  { title: "Discord", link: "https://discord.gg/ZmnsPMKgjw", icon: "/discord.svg", width: 16, height: 14 },
  { title: "Linkedin", link: "https://www.linkedin.com/company/anylayer", icon: "/linkedin.svg", width: 16, height: 16 },
  { title: "Twitter", link: "https://x.com/buildonzks", icon: "/twitter.svg", width: 13, height: 13 },
];

const Newsletter = () => (
  <div className="space-y-6 max-w-md">
    <h3 className="text-2xl md:text-3xl font-semibold text-white tracking-tighter leading-tight">
      Stay updated on <span className="text-lightblueprimary italic">Anylayer.</span>
    </h3>
    <div className="relative flex items-center p-1 rounded-full border border-white/10 bg-white/5 backdrop-blur-xl group hover:border-lightblueprimary/30 transition-all">
      <input 
        type="email" 
        placeholder="Enter email..." 
        className="bg-transparent flex-1 px-6 py-3 text-sm text-white outline-none placeholder:text-white/20"
      />
      <button className="bg-lightblueprimary text-black p-3 rounded-full hover:scale-105 active:scale-95 transition-all">
        <Send size={18} />
      </button>
    </div>
  </div>
);

const Links = () => (
  <div className="grid grid-cols-2 md:grid-cols-3 gap-12 md:gap-24">
    <div className="space-y-6">
      <h4 className="text-[10px] font-mono text-lightblueprimary font-black uppercase tracking-[0.4em]">Protocol</h4>
      <ul className="space-y-3 text-sm text-white/40 font-light">
        {[
          { label: "Architecture", href: "/#architecture" },
          { label: "Identity", href: "/identity" },
          { label: "Reputation", href: "/#reputation" },
          { label: "Strategic Roadmap", href: "/roadmap" }
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
        {["Documentation", "SDK Reference", "Tutorials", "API Keys"].map(l => (
          <li key={l} className="hover:text-white transition-colors cursor-pointer">{l}</li>
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
  return (
    <footer className="relative bg-[#08080C] overflow-hidden pt-20">
      <div className="absolute top-0 left-0 w-full h-px bg-gradient-to-r from-transparent via-white/5 to-transparent" />
      
      <div className="relative w-full max-w-screen-xl mx-auto px-6 py-20">
        <div className="bg-[#0D0D12] border-t border-x border-white/5 rounded-t-[80px] p-12 md:p-24 relative overflow-hidden">
          {/* Faceted Top Border Accent */}
          <div className="absolute top-0 left-1/2 -translate-x-1/2 w-full max-w-4xl h-px bg-gradient-to-r from-transparent via-lightblueprimary/40 to-transparent" />
          
          <div className="grid lg:grid-cols-2 gap-24 items-start relative z-10">
            <Newsletter />
            <Links />
          </div>

          <div className="mt-32 pt-12 border-t border-white/5 flex flex-col md:flex-row justify-between items-center gap-8">
            <div className="flex items-center gap-10">
               <Image src="/logo-anylayer.svg" alt="Anylayer" width={120} height={30} className="opacity-40" />
               <p className="text-[10px] font-mono text-white/10 uppercase tracking-widest font-black">© 2026 Anylayer Logic</p>
            </div>
            <div className="flex gap-4">
               {footerIcon.map(i => (
                 <a key={i.title} href={i.link} className="w-10 h-10 rounded-xl bg-white/5 border border-white/10 flex items-center justify-center hover:bg-lightblueprimary hover:border-lightblueprimary transition-all group">
                    <Image src={i.icon} alt="" width={16} height={16} className="invert group-hover:invert-0 transition-all" />
                 </a>
               ))}
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
}
