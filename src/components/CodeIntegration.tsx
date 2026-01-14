'use client';

import { useState } from 'react';
import { motion } from 'framer-motion';
import { 
  Terminal, Search, TrendingUp, ShieldCheck, 
  Wallet, ArrowUpRight, Cpu, Network, Database,
  Lock, Zap, LayoutGrid, Fingerprint, Copy, Check,
  Activity, Globe, Server, Shield
} from 'lucide-react';
import { fadeUp, staggerContainer } from '../lib/animations';

// --- Premium Bento Tile Component ---
const BentoTile = ({ children, className = "", span = "", noHover = false }: { children: React.ReactNode, className?: string, span?: string, noHover?: boolean }) => (
  <motion.div
    variants={fadeUp}
    className={`relative group rounded-[28px] md:rounded-[32px] overflow-hidden bg-[#0D0D12] border border-white/[0.04] ${!noHover ? 'hover:border-white/[0.1] hover:bg-[#12121A]' : ''} transition-all duration-500 shadow-[0_20px_40px_rgba(0,0,0,0.4)] ${span} ${className}`}
  >
    {/* Inner Tactile Glows */}
    <div className="absolute inset-0 bg-gradient-to-br from-white/[0.02] to-transparent pointer-events-none" />
    <div className="absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-white/[0.05] to-transparent" />
    <div className="absolute inset-y-0 left-0 w-px bg-gradient-to-b from-white/[0.05] to-transparent" />
    {children}
  </motion.div>
);

const CodeIntegration = () => {
  const [copied, setCopied] = useState(false);
  const codeSnippet = `const user = await anylayer.getIdentity("0x74...f6b");
console.log(user.trust_score); // 892`;

  const handleCopy = () => {
    navigator.clipboard.writeText(codeSnippet);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <section id="opportunity" className="py-24 bg-[#08080C] overflow-hidden">
      <div className="px-6 max-w-screen-xl mx-auto">
        
        <motion.div 
          variants={staggerContainer}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.1 }}
          className="grid grid-cols-1 md:grid-cols-12 gap-4 auto-rows-[160px]"
        >
          
          {/* ROW 1: TOP UTILITIES */}
          
          {/* 1. SEARCH (Wide) */}
          <BentoTile span="md:col-span-5 md:row-span-1" className="p-7 flex flex-col justify-center gap-4">
            <div className="relative">
              <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-white/10" />
              <div className="bg-[#050508] border border-white/[0.03] rounded-2xl py-3.5 pl-11 pr-4 text-[11px] text-white/20 font-mono tracking-widest shadow-inner">
                QUERY_REPUTATION_SIGNALS...
              </div>
            </div>
            <div className="flex gap-5 px-1">
              <span className="text-[10px] font-bold text-white/10 flex items-center gap-2 tracking-[0.1em] uppercase"><TrendingUp size={12} className="text-blue-500/30"/> Top Tags</span>
              <span className="text-[10px] font-bold text-white/10 flex items-center gap-2 tracking-[0.1em] uppercase"><ShieldCheck size={12} className="text-green-500/30"/> Verified</span>
              <span className="text-[10px] font-bold text-white/10 flex items-center gap-2 tracking-[0.1em] uppercase"><Zap size={12} className="text-purple-500/30"/> Hot</span>
            </div>
          </BentoTile>

          {/* 2. SLIDER (Narrow) */}
          <BentoTile span="md:col-span-3 md:row-span-1" className="p-7 flex flex-col justify-between">
             <div className="flex justify-between items-center text-[10px] font-bold text-white/20 uppercase tracking-[0.2em]">
                <span>Leverage</span>
                <span className="text-lightblueprimary font-mono font-black text-xs">5x</span>
             </div>
             <div className="relative h-1 w-full bg-white/5 rounded-full">
                <div className="absolute h-full w-[45%] bg-white/20 rounded-full" />
                <div className="absolute top-1/2 left-[45%] -translate-x-1/2 -translate-y-1/2 w-4 h-4 bg-white rounded-full border-4 border-[#0D0D12]" />
             </div>
             <div className="flex justify-between text-[8px] font-mono text-white/10 font-bold tracking-widest">
                <span>MIN</span>
                <span>MAX</span>
             </div>
          </BentoTile>

          {/* 3. ASSET PAIRS (Narrow) */}
          <BentoTile span="md:col-span-4 md:row-span-1" className="p-7 flex items-center justify-between">
             <div className="flex items-center gap-4">
                <div className="w-10 h-10 rounded-full bg-orange-500/10 flex items-center justify-center border border-orange-500/20">
                    <span className="text-orange-500 font-bold text-xs">₿</span>
                </div>
                <div className="flex flex-col">
                    <span className="text-xs font-bold text-white tracking-tight">BTC</span>
                    <span className="text-[10px] text-white/20 font-mono tracking-widest">BITCOIN</span>
                </div>
             </div>
             <div className="h-8 w-20 flex items-end gap-0.5">
                {[4, 8, 5, 10, 6, 9, 4, 7].map((h, i) => (
                    <div key={i} className="flex-1 bg-green-500/20 rounded-t-[1px]" style={{ height: `${h * 10}%` }} />
                ))}
             </div>
          </BentoTile>

          {/* ROW 2 & 3: MAIN CONTENT AREA */}

          {/* 4. REPUTATION SCORE (Left Column) */}
          <BentoTile span="md:col-span-3 md:row-span-2" className="p-8 flex flex-col justify-between group/score">
             <div className="space-y-1">
                <div className="text-orange-500 font-black text-[10px] flex items-center gap-2 uppercase tracking-[0.3em]">
                   <div className="w-2.5 h-2.5 rounded-full bg-orange-500 shadow-[0_0_15px_rgba(249,115,22,0.4)]" /> Portfolio
                </div>
                <div className="text-[3.5rem] font-medium tracking-tighter mt-8 text-white leading-none">$171,591</div>
                <div className="text-green-400 text-sm font-medium mt-4 flex items-center gap-1.5">
                   + $1,249 <span className="text-white/20 ml-1 font-light tracking-tight">in the past 24h</span>
                </div>
             </div>
             
             <div className="h-32 w-full flex items-end gap-[3px] px-1 overflow-hidden">
                {Array.from({ length: 12 }).map((_, i) => (
                  <motion.div 
                    key={i}
                    initial={{ height: 0 }}
                    whileInView={{ height: `${20 + Math.random() * 80}%` }}
                    transition={{ duration: 1, delay: i * 0.05 }}
                    className="flex-1 bg-white/[0.03] rounded-t-lg border-t border-white/10 group-hover/score:bg-orange-500/10 group-hover/score:border-orange-500/20 transition-all duration-700"
                  />
                ))}
             </div>
          </BentoTile>

          {/* 5. THE HERO CENTER (Built Different) */}
          <BentoTile span="md:col-span-6 md:row-span-2" className="p-10 md:p-14 flex flex-col items-center justify-center text-center bg-gradient-to-b from-white/[0.04] to-transparent relative" noHover>
             <h2 className="text-5xl md:text-[5.5rem] font-medium tracking-tighter leading-[0.9] mb-8 text-white">
                Built <br /> <span className="text-white/20 font-light">different.</span>
             </h2>
             
             {/* Tactile 3D Button - Infinex Style */}
             <button className="group relative mt-2 active:translate-y-1 transition-transform">
                <div className="absolute inset-0 bg-orange-500 blur-3xl opacity-10 group-hover:opacity-20 transition-opacity" />
                <div className="relative px-12 py-5 bg-orange-500 text-black font-bold rounded-full shadow-[0_12px_40px_rgba(249,115,22,0.3)] hover:scale-105 transition-all text-sm tracking-tight">
                   Get Anylayer
                </div>
             </button>
             
             <p className="text-white/30 text-[14px] mt-16 font-light leading-relaxed max-w-sm">
                No emails, passwords, or seed phrases. <br />
                <span className="text-white/50">One-click ZK identity signup.</span>
             </p>

             {/* Background Subtle Logo */}
             <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[120%] h-full opacity-[0.02] pointer-events-none select-none">
                <Fingerprint size={400} strokeWidth={0.5} className="text-white" />
             </div>
          </BentoTile>

          {/* 6. VERIFIED SEGMENTS (Right Column) */}
          <BentoTile span="md:col-span-3 md:row-span-2" className="p-8 relative overflow-hidden group/segments">
             <div className="text-[140px] font-bold text-white/[0.02] absolute -top-10 -right-6 font-mono pointer-events-none group-hover/segments:text-white/[0.04] transition-colors duration-700">6</div>
             <div className="relative z-10 flex flex-col h-full justify-between">
                <div>
                  <div className="text-[10px] font-black text-white/20 uppercase tracking-[0.3em] mb-10">Verification Tier</div>
                  <div className="flex flex-col gap-5">
                     {[
                       { label: 'Uncommon', color: 'bg-blue-500', val: '72%' },
                       { label: 'Rare', color: 'bg-purple-500', val: '88%' },
                       { label: 'Mythic', color: 'bg-orange-500', val: '100%' }
                     ].map((item, i) => (
                       <div key={i} className="flex items-center justify-between">
                          <div className="flex items-center gap-3">
                             <div className={`w-2 h-2 rounded-full ${item.color}`} />
                             <span className="text-sm font-medium text-white/40">{item.label}</span>
                          </div>
                          <span className="text-[10px] font-mono text-white/10 font-bold">{item.val}</span>
                       </div>
                     ))}
                  </div>
                </div>
                
                <div className="pt-6 border-t border-white/5">
                   <div className="text-3xl font-medium tracking-tight text-white">6 <span className="text-xs text-white/20 font-light uppercase tracking-[0.2em] ml-2">to open</span></div>
                </div>
             </div>
          </BentoTile>

          {/* ROW 4: BOTTOM UTILITIES (Perfect Packing) */}

          {/* 7. CODE CONSOLE (Wide) */}
          <BentoTile span="md:col-span-7 md:row-span-1" className="p-0 bg-[#050508] flex flex-col group/code" noHover>
             <div className="px-6 py-4 border-b border-white/5 flex items-center justify-between bg-white/[0.01]">
                <div className="flex items-center gap-3">
                   <div className="flex gap-1.5 grayscale opacity-30">
                      <div className="w-2 h-2 rounded-full bg-red-500" />
                      <div className="w-2 h-2 rounded-full bg-yellow-500" />
                      <div className="w-2 h-2 rounded-full bg-green-500" />
                   </div>
                   <span className="text-[9px] font-mono font-bold text-white/10 ml-4 tracking-[0.4em] uppercase">INIT_SDK_INSTANCE</span>
                </div>
                <button 
                  onClick={handleCopy}
                  className="p-2 hover:bg-white/5 rounded-lg transition-colors text-white/10 hover:text-white"
                >
                   {copied ? <Check size={14} className="text-green-500" /> : <Copy size={14} />}
                </button>
             </div>
             <div className="p-6 font-mono text-[12px] leading-relaxed text-lightblueprimary/50 flex gap-6">
                <div className="text-white/5 select-none text-[10px]">01<br/>02</div>
                <div className="flex-1 truncate">
                   <span className="text-white/40">const</span> identity = <span className="text-white/40">await</span> anylayer.<span className="text-blue-400">getScore</span>();<br/>
                   <span className="text-white/20"># status: verified</span>
                </div>
             </div>
          </BentoTile>

          {/* 8. SYSTEM STATS (Narrow) */}
          <BentoTile span="md:col-span-3 md:row-span-1" className="p-7 flex flex-col justify-between">
             <div className="text-[10px] font-black text-white/20 uppercase tracking-[0.3em]">Latency</div>
             <div className="flex items-end gap-2">
                <span className="text-3xl font-medium text-white tracking-tighter">12ms</span>
                <span className="text-[10px] text-green-500 font-bold mb-1.5">OPTIMAL</span>
             </div>
             <div className="w-full h-1 bg-white/5 rounded-full overflow-hidden">
                <div className="h-full w-[92%] bg-green-500/50" />
             </div>
          </BentoTile>

          {/* 9. NETWORK ID (Narrow) */}
          <BentoTile span="md:col-span-2 md:row-span-1" className="p-7 flex flex-col justify-between items-center text-center">
             <div className="w-10 h-10 rounded-2xl bg-white/[0.03] border border-white/5 flex items-center justify-center">
                <Server size={20} className="text-white/20" />
             </div>
             <div className="flex flex-col">
                <span className="text-[9px] font-black text-white/20 uppercase tracking-[0.3em]">Shard</span>
                <span className="text-sm font-bold text-white mt-1">AX-704</span>
             </div>
          </BentoTile>

        </motion.div>
      </div>
    </section>
  );
};

export default CodeIntegration;
