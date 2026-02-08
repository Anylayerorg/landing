'use client';

import { useState } from 'react';
import { motion } from 'framer-motion';
import {
   Terminal, Search, TrendingUp, ShieldCheck,
   Wallet, ArrowUpRight, Cpu, Network, Database,
   Lock, Zap, LayoutGrid, Fingerprint, Copy, Check,
   Activity, Globe, Server, Shield, UserCheck, ShieldAlert
} from 'lucide-react';

// --- Premium Bento Tile Component ---
const BentoTile = ({ children, className = "", span = "", noHover = false }: { children: React.ReactNode, className?: string, span?: string, noHover?: boolean }) => (
   <div
      className={`relative group rounded-[28px] md:rounded-[32px] overflow-hidden bg-[#0D0D12] border border-white/[0.04] ${!noHover ? 'hover:border-white/[0.1] hover:bg-[#12121A]' : ''} transition-all duration-500 shadow-[0_20px_40px_rgba(0,0,0,0.4)] ${span} ${className}`}
   >
      {/* Inner Tactile Glows */}
      <div className="absolute inset-0 bg-gradient-to-br from-white/[0.02] to-transparent pointer-events-none" />
      <div className="absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-white/[0.05] to-transparent" />
      <div className="absolute inset-y-0 left-0 w-px bg-gradient-to-b from-white/[0.05] to-transparent" />
      {children}
   </div>
);

const CodeIntegration = ({ onDocumentationClick }: { onDocumentationClick?: () => void }) => {
   const [copied, setCopied] = useState(false);
   const codeSnippet = `import { Anylayer } from "@anylayer/sdk";

const sdk = await Anylayer.init({ apiKey: "YOUR_KEY" });
const { score, verified } = await sdk.verify("0x...");

console.log(score); // 8,402`;

   const handleCopy = () => {
      navigator.clipboard.writeText(codeSnippet);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
   };

   return (
      <section id="opportunity" className="hidden md:block py-12 bg-[#08080C] overflow-hidden">
         <div className="px-6 max-w-screen-xl mx-auto">

            <div className="grid grid-cols-1 md:grid-cols-12 gap-4 auto-rows-[140px]">

               {/* ROW 1: IDENTITY & TRUST TOOLS */}

               {/* 1. BUILDER STACK (Wide) */}
               <BentoTile span="md:col-span-5 md:row-span-1" className="p-5 flex flex-col justify-center gap-3">
                  <div className="flex items-center justify-between">
                     <div className="inline-flex items-center gap-3 px-3 py-1 rounded-full bg-white/[0.02] border border-white/5 backdrop-blur-sm">
                        <div className="w-1 h-1 rounded-full bg-lightblueprimary" />
                        <span className="text-[9px] font-mono uppercase tracking-[0.3em] text-white/40">Builder Stack</span>
                     </div>
                     <div className="flex gap-1.5">
                        <div className="px-1.5 py-0.5 rounded-md bg-white/5 border border-white/10 text-[8px] font-mono text-white/40">TypeScript</div>
                        <div className="px-1.5 py-0.5 rounded-md bg-white/5 border border-white/10 text-[8px] font-mono text-white/40">Rust</div>
                        <div className="px-1.5 py-0.5 rounded-md bg-white/5 border border-white/10 text-[8px] font-mono text-white/40">Go</div>
                     </div>
                  </div>
                  <div className="flex gap-4 px-1">
                     <div className="flex items-center gap-2">
                        <div className="w-7 h-7 rounded-lg bg-white/5 flex items-center justify-center border border-white/10">
                           <Database size={12} className="text-white/40" />
                        </div>
                        <span className="text-[9px] font-bold text-white/20 tracking-[0.1em] uppercase">Postgres/GraphQL</span>
                     </div>
                     <div className="flex items-center gap-2">
                        <div className="w-7 h-7 rounded-lg bg-white/5 flex items-center justify-center border border-white/10">
                           <Server size={12} className="text-white/40" />
                        </div>
                        <span className="text-[9px] font-bold text-white/20 tracking-[0.1em] uppercase">REST/gRPC</span>
                     </div>
                  </div>
               </BentoTile>

               {/* 2. TRUST THRESHOLD (Narrow) */}
               <BentoTile span="md:col-span-3 md:row-span-1" className="p-5 flex flex-col justify-between">
                  <div className="flex justify-between items-center text-[9px] font-bold text-white/20 uppercase tracking-[0.2em]">
                     <span>Trust Level</span>
                     <span className="text-lightblueprimary font-mono font-black text-xs">700+</span>
                  </div>
                  <div className="relative h-1 w-full bg-white/5 rounded-full">
                     <div className="absolute h-full w-[70%] bg-lightblueprimary/40 rounded-full shadow-[0_0_10px_rgba(166,131,255,0.3)]" />
                     <div className="absolute top-1/2 left-[70%] -translate-x-1/2 -translate-y-1/2 w-3.5 h-3.5 bg-white rounded-full border-4 border-[#0D0D12]" />
                  </div>
                  <div className="flex justify-between text-[7px] font-mono text-white/10 font-bold tracking-widest">
                     <span>LOW</span>
                     <span>ELITE</span>
                  </div>
               </BentoTile>

               {/* 3. VERIFICATION SIGNAL (Narrow) */}
               <BentoTile span="md:col-span-4 md:row-span-1" className="p-5 flex items-center justify-between">
                  <div className="flex items-center gap-3">
                     <div className="w-9 h-9 rounded-full bg-blueprimary/10 flex items-center justify-center border border-blueprimary/20">
                        <ShieldCheck className="text-lightblueprimary w-4 h-4" />
                     </div>
                     <div className="flex flex-col">
                        <span className="text-[11px] font-bold text-white tracking-tight uppercase">Sybil Resistance</span>
                        <span className="text-[9px] text-white/20 font-mono tracking-widest">HUMAN PROOF</span>
                     </div>
                  </div>
                  <div className="h-7 w-16 flex items-end gap-0.5">
                     {[6, 4, 9, 7, 10, 8, 9, 10].map((h, i) => (
                        <div key={i} className="flex-1 bg-lightblueprimary/20 rounded-t-[1px]" style={{ height: `${h * 10}%` }} />
                     ))}
                  </div>
               </BentoTile>

               {/* ROW 2 & 3: CORE IDENTITY AREA */}

               {/* 4. REPUTATION API (Left Column) */}
               <BentoTile span="md:col-span-3 md:row-span-2" className="p-6 flex flex-col justify-between group/score">
                  <div className="space-y-1">
                     <div className="inline-flex items-center gap-3 px-3 py-1 rounded-full bg-white/[0.02] border border-white/5 backdrop-blur-sm mb-4">
                        <div className="w-1 h-1 rounded-full bg-lightblueprimary" />
                        <span className="text-[9px] font-mono uppercase tracking-[0.3em] text-lightblueprimary/60">Reputation API</span>
                     </div>
                     <div className="text-[11px] font-medium text-white/40 mt-4 leading-relaxed">
                        Query high-fidelity identity data with sub-second latency.
                     </div>
                     <div className="text-[2.5rem] font-medium tracking-tighter mt-2 text-white leading-none font-mono">8,402</div>
                  </div>

                  <div className="h-20 w-full flex items-end gap-[2px] px-1 overflow-hidden">
                     {Array.from({ length: 12 }).map((_, i) => (
                        <div
                           key={i}
                           style={{ height: `${20 + Math.random() * 80}%` }}
                           className="flex-1 bg-white/[0.03] rounded-t-lg border-t border-white/10 group-hover/score:bg-lightblueprimary/10 group-hover/score:border-lightblueprimary/20 transition-all duration-700"
                        />
                     ))}
                  </div>
               </BentoTile>

               {/* 5. THE HERO CENTER (Build with SDK) */}
               <BentoTile span="md:col-span-6 md:row-span-2" className="p-8 md:p-10 flex flex-col items-center justify-center text-center bg-lightblueprimary relative overflow-hidden" noHover>
                  <h2 className="text-2xl md:text-[2.25rem] font-medium tracking-tighter leading-tight mb-6 text-black">
                     Build with <br /> <span className="text-black/60 font-light">Anylayer SDK.</span>
                  </h2>

                  {/* Tactile 3D Button - High Contrast */}
                  <button
                     onClick={onDocumentationClick}
                     className="group relative mt-1"
                  >
                     <div className="absolute inset-0 bg-black blur-2xl opacity-10" />
                     <div className="relative px-8 py-3 bg-black text-white font-semibold rounded-full shadow-[0_8px_30px_rgba(0,0,0,0.2)] text-[12px] tracking-tight uppercase">
                        Documentation
                     </div>
                  </button>

                  <p className="text-black/70 text-[12px] mt-10 font-light leading-relaxed max-w-md">
                     Deploy Sybil-resistant dApps using the <span className="text-black font-medium">TypeScript SDK</span>.
                     Verify identity, reputation, and ZK-proofs via a single REST API.
                  </p>

                  {/* Dark Background Subtle Logo */}
                  <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-full h-full opacity-[0.05] pointer-events-none select-none flex items-center justify-center">
                     <Fingerprint size={320} strokeWidth={0.5} className="text-black" />
                  </div>
               </BentoTile>

               {/* 6. API METHODS (Right Column) */}
               <BentoTile span="md:col-span-3 md:row-span-2" className="p-6 relative overflow-hidden group/segments">
                  <div className="text-[100px] font-bold text-white/[0.02] absolute -top-6 -right-4 font-mono pointer-events-none group-hover/segments:text-white/[0.04] transition-colors duration-700">API</div>
                  <div className="relative z-10 flex flex-col h-full justify-between">
                     <div>
                        <div className="inline-flex items-center gap-3 px-3 py-1 rounded-full bg-white/[0.02] border border-white/5 backdrop-blur-sm mb-8">
                           <div className="w-1 h-1 rounded-full bg-lightblueprimary" />
                           <span className="text-[9px] font-mono uppercase tracking-[0.3em] text-white/40">Core SDK Methods</span>
                        </div>
                        <div className="flex flex-col gap-4">
                           {[
                              { label: 'sdk.verify()', color: 'bg-blue-500', val: 'ID' },
                              { label: 'sdk.getScore()', color: 'bg-purple-500', val: 'Rep' },
                              { label: 'sdk.getProof()', color: 'bg-green-500', val: 'ZK' }
                           ].map((item, i) => (
                              <div key={i} className="flex items-center justify-between">
                                 <div className="flex items-center gap-2.5">
                                    <div className={`w-1.5 h-1.5 rounded-full ${item.color}`} />
                                    <span className="text-[13px] font-mono text-white/40">{item.label}</span>
                                 </div>
                                 <span className="text-[9px] font-mono text-white/10 font-bold tracking-tighter">{item.val}</span>
                              </div>
                           ))}
                        </div>
                     </div>

                     <div className="pt-4 border-t border-white/5">
                        <div className="text-lg font-medium tracking-tight text-white">Universal <span className="text-[10px] text-white/20 font-light uppercase tracking-[0.2em] ml-1">Endpoints</span></div>
                     </div>
                  </div>
               </BentoTile>

               {/* ROW 4: BOTTOM TECHNICAL UTILITIES */}

               {/* 7. CODE CONSOLE (Wide) */}
               <BentoTile span="md:col-span-7 md:row-span-1" className="p-0 bg-[#050508] flex flex-col group/code" noHover>
                  <div className="px-5 py-3 border-b border-white/5 flex items-center justify-between bg-white/[0.01]">
                     <div className="flex items-center gap-2">
                        <div className="flex gap-1 grayscale opacity-30">
                           <div className="w-2 h-2 rounded-full bg-red-500" />
                           <div className="w-2 h-2 rounded-full bg-yellow-500" />
                           <div className="w-2 h-2 rounded-full bg-green-500" />
                        </div>
                        <div className="inline-flex items-center gap-2 px-2 py-0.5 rounded-full bg-white/[0.05] border border-white/10 ml-3">
                           <div className="w-1 h-1 rounded-full bg-lightblueprimary" />
                           <span className="text-[7px] font-mono text-white/20 tracking-[0.3em] uppercase">INIT TRUST RESOLVER</span>
                        </div>
                     </div>
                     <button
                        onClick={handleCopy}
                        className="p-1.5 hover:bg-white/5 rounded-lg transition-colors text-white/10 hover:text-white"
                     >
                        {copied ? <Check size={12} className="text-green-500" /> : <Copy size={12} />}
                     </button>
                  </div>
                  <div className="px-5 pt-3 pb-5 font-mono text-[11px] leading-relaxed text-lightblueprimary/50 flex gap-4">
                     <div className="text-white/5 select-none text-[9px]">01<br />02<br />03<br />04</div>
                     <div className="flex-1 truncate">
                        <span className="text-white/40">import</span> {'{ Anylayer }'} <span className="text-white/40">from</span> <span className="text-orange-300">"@anylayer/sdk"</span>;<br />
                        <span className="text-white/40">const</span> sdk = <span className="text-white/40">await</span> Anylayer.<span className="text-white">init</span>({'{ apiKey: "..." }'});<br />
                        <span className="text-white/40">const</span> rep = <span className="text-white/40">await</span> sdk.<span className="text-blue-400">verify</span>(userAddress);<br />
                        <span className="text-white/20">// {'{ score: 8402, verified: true }'}</span>
                     </div>
                  </div>
               </BentoTile>

               {/* 8. PROOF GENERATION (Narrow) */}
               <BentoTile span="md:col-span-3 md:row-span-1" className="p-5 flex flex-col justify-between">
                  <div className="text-[9px] font-black text-white/20 uppercase tracking-[0.3em]">ZK-Proof Time</div>
                  <div className="flex items-end gap-1.5">
                     <span className="text-2xl font-medium text-white tracking-tighter">1.2s</span>
                     <span className="text-[9px] text-green-500 font-bold mb-1 uppercase">Instant</span>
                  </div>
                  <div className="w-full h-1 bg-white/5 rounded-full overflow-hidden">
                     <div className="h-full w-[100%] bg-blue-500/50" />
                  </div>
               </BentoTile>

               {/* 9. ZK NODE STATUS (Narrow) */}
               <BentoTile span="md:col-span-2 md:row-span-1" className="p-5 flex flex-col justify-between items-center text-center">
                  <div className="w-9 h-9 rounded-2xl bg-white/[0.03] border border-white/5 flex items-center justify-center">
                     <Cpu size={18} className="text-white/20" />
                  </div>
                  <div className="flex flex-col">
                     <span className="text-[8px] font-black text-white/20 uppercase tracking-[0.3em]">ZK Node</span>
                     <span className="text-xs font-bold text-white mt-0.5">Verified</span>
                  </div>
               </BentoTile>

            </div>
         </div>
      </section>
   );
};

export default CodeIntegration;
