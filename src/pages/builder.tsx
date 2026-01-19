import React, { useState, useEffect } from 'react';
import Head from 'next/head';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  Terminal, 
  Cpu, 
  ShieldCheck, 
  Zap, 
  ArrowRight, 
  Wallet, 
  Layers, 
  Lock, 
  Users, 
  Webhook,
  Loader2,
  CheckCircle2,
  ChevronRight,
  Blocks,
  Code2,
  Fingerprint,
  Activity,
  Database,
  Network,
  Share2
} from 'lucide-react';
import { Header } from '@/components/layout/Header';
import { Footer } from '@/components/layout/Footer';
import { BlogWidget } from '@/components/BlogWidget';
import { client } from '@/sanity/lib/client';

const BuilderPage = () => {
  const [email, setEmail] = useState('');
  const [status, setStatus] = useState<'idle' | 'loading' | 'success' | 'error'>('idle');

  const handleWaitlist = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!email) return;

    setStatus('loading');
    try {
      await client.create({
        _type: 'subscriber',
        email,
        type: 'developer',
        subscribedAt: new Date().toISOString(),
      });
      setStatus('success');
      setEmail('');
      setTimeout(() => setStatus('idle'), 5000);
    } catch (error) {
      console.error('Waitlist error:', error);
      setStatus('error');
      setTimeout(() => setStatus('idle'), 5000);
    }
  };

  const fadeIn = {
    initial: { opacity: 0, y: 20 },
    whileInView: { opacity: 1, y: 0 },
    viewport: { once: true },
    transition: { duration: 0.8, ease: [0.16, 1, 0.3, 1] }
  };

  const HUDLabel = ({ text, side = "left" }: { text: string, side?: "left" | "right" }) => (
    <div className={`flex flex-col gap-1 text-[8px] font-mono text-white/20 uppercase tracking-[0.4em] ${side === "right" ? "items-end" : "items-start"}`}>
      <div className="flex items-center gap-2">
        {side === "left" && <div className="w-1 h-1 rounded-full bg-lightblueprimary/40" />}
        {text}
        {side === "right" && <div className="w-1 h-1 rounded-full bg-lightblueprimary/40" />}
      </div>
      <div className={`w-12 h-px bg-white/5 ${side === "right" ? "origin-right" : "origin-left"}`} />
    </div>
  );

  return (
    <div className="bg-[#08080C] min-h-screen font-geist text-white selection:bg-lightblueprimary selection:text-black overflow-x-hidden">
      <Head>
        <title>Developers | AnyLayer — Build with Verified Trust</title>
        <meta name="description" content="Integrate trust, reputation, and proofs into your product with AnyLayer's SDKs and APIs." />
      </Head>

      <Header />

      <main className="relative pt-44">
        {/* --- DYNAMIC BACKGROUND ELEMENTS --- */}
        <div className="absolute inset-0 pointer-events-none">
          <div className="absolute top-0 left-1/4 w-[1px] h-screen bg-gradient-to-b from-white/[0.05] via-transparent to-transparent" />
          <div className="absolute top-0 right-1/4 w-[1px] h-screen bg-gradient-to-b from-white/[0.05] via-transparent to-transparent" />
          <div className="absolute top-[20%] left-0 w-full h-[1px] bg-white/[0.02]" />
          <div className="absolute top-[60%] left-0 w-full h-[1px] bg-white/[0.02]" />
        </div>

        {/* --- HERO: ARCHITECTURAL DECONSTRUCTION --- */}
        <section className="max-w-7xl mx-auto px-6 mb-60 relative">
          <div className="grid lg:grid-cols-12 gap-12 items-center">
            <div className="lg:col-span-7 space-y-12">
              <motion.div 
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                className="inline-flex items-center gap-3 px-3 py-1 rounded-full bg-white/[0.02] border border-white/5 backdrop-blur-sm"
              >
                <div className="w-1 h-1 rounded-full bg-lightblueprimary" />
                <span className="text-[9px] font-mono uppercase tracking-[0.3em] text-white/40">Build v1.0 // Trust Layer Protocol</span>
              </motion.div>

              <motion.h1 
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 1, ease: [0.16, 1, 0.3, 1] }}
                className="text-7xl md:text-[120px] font-black tracking-tighter uppercase leading-[0.8] italic"
              >
                Integrate <br />
                <span className="text-lightblueprimary">Verified</span> <br />
                <span className="text-white/10 outline-text">Behavior.</span>
              </motion.h1>

              <motion.div 
                {...fadeIn} 
                transition={{ delay: 0.2 }}
                className="max-w-xl space-y-8"
              >
                <p className="text-xl md:text-2xl text-white/40 font-light leading-relaxed italic border-l border-white/10 pl-8">
                  AnyLayer is the trust primitive for developers. 
                  Build applications where decisions are based on verified behavior rather than assumptions.
                </p>

                <div className="flex flex-wrap gap-4 pt-4">
                  <a href="#waitlist" className="group relative px-10 py-4 overflow-hidden rounded-full transition-all">
                    <div className="absolute inset-0 bg-white" />
                    <div className="relative flex items-center gap-3 text-black font-black uppercase tracking-[0.2em] text-[11px]">
                      Join Early Access
                      <ArrowRight size={14} className="group-hover:translate-x-1 transition-transform" />
                    </div>
                  </a>
                  <a href="https://docs.anylayer.org" target="_blank" rel="noopener noreferrer" className="group px-10 py-4 rounded-full border border-white/10 hover:border-lightblueprimary/40 transition-all">
                    <span className="text-white/60 group-hover:text-white font-black uppercase tracking-[0.2em] text-[11px]">Read Specs</span>
                  </a>
                </div>
              </motion.div>
            </div>

            <div className="lg:col-span-5 relative hidden lg:block">
              {/* Abstract Technical Visual */}
              <div className="relative aspect-square">
                <motion.div 
                  animate={{ rotate: 360 }}
                  transition={{ duration: 60, repeat: Infinity, ease: "linear" }}
                  className="absolute inset-0 border border-white/[0.03] rounded-full"
                />
                <motion.div 
                  animate={{ rotate: -360 }}
                  transition={{ duration: 40, repeat: Infinity, ease: "linear" }}
                  className="absolute inset-8 border border-white/[0.05] rounded-full border-dashed"
                />
                
                <div className="absolute inset-0 flex items-center justify-center">
                  <div className="relative">
                    <div className="w-32 h-32 bg-lightblueprimary/5 rounded-full blur-3xl animate-pulse" />
                    <Activity className="absolute inset-0 m-auto text-lightblueprimary/20 w-12 h-12" />
                  </div>
                </div>

                {/* Floating Technical Tags */}
                {[
                  { icon: <ShieldCheck size={12} />, label: "ZK_PROOF", top: "15%", left: "10%" },
                  { icon: <Database size={12} />, label: "DATA_VECTOR", top: "20%", right: "5%" },
                  { icon: <Fingerprint size={12} />, label: "ID_RESOLVER", bottom: "25%", left: "5%" },
                  { icon: <Network size={12} />, label: "NODE_MESH", bottom: "15%", right: "10%" }
                ].map((tag, i) => (
                  <motion.div 
                    key={i}
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ delay: 0.5 + (i * 0.1) }}
                    className="absolute flex items-center gap-2 bg-black/40 backdrop-blur-md border border-white/5 px-3 py-1.5 rounded-lg"
                    style={{ top: tag.top, left: tag.left, right: tag.right, bottom: tag.bottom }}
                  >
                    <div className="text-lightblueprimary/60">{tag.icon}</div>
                    <span className="text-[8px] font-mono uppercase tracking-widest text-white/40">{tag.label}</span>
                  </motion.div>
                ))}
              </div>
            </div>
          </div>
        </section>

        {/* --- PIPELINE: THE INTEGRATION FLOW --- */}
        <section className="mb-80 relative overflow-hidden">
          <div className="max-w-7xl mx-auto px-6">
            <div className="mb-24">
              <HUDLabel text="INTEGRATION_PIPELINE" />
              <h2 className="text-4xl md:text-6xl font-black uppercase tracking-tighter italic mt-4">
                Bring Trust into <br /> Your <span className="text-lightblueprimary">Execution Stack.</span>
              </h2>
            </div>

            <div className="relative">
              {/* Continuous Flow Line */}
              <div className="absolute top-1/2 left-0 w-full h-px bg-gradient-to-r from-transparent via-white/10 to-transparent hidden lg:block" />

              <div className="grid lg:grid-cols-4 gap-12 relative z-10">
                {[
                  { 
                    step: "01", 
                    icon: <Blocks size={24} />, 
                    title: "SDK Core", 
                    desc: "Inject trust scores and verify claims with 3 lines of code.",
                    code: "anylayer.verify({ user })"
                  },
                  { 
                    step: "02", 
                    icon: <Terminal size={24} />, 
                    title: "REST APIs", 
                    desc: "Query reputation vectors and attestation history instantly.",
                    code: "GET /v1/reputation/0x..."
                  },
                  { 
                    step: "03", 
                    icon: <Cpu size={24} />, 
                    title: "ZK Hooks", 
                    desc: "On-chain verification for smart contract gated access.",
                    code: "function _checkTrust() internal"
                  },
                  { 
                    step: "04", 
                    icon: <Webhook size={24} />, 
                    title: "Event Hub", 
                    desc: "Subscribe to reputation changes and trust revocations.",
                    code: "WEBHOOK: 'score_update'"
                  }
                ].map((item, i) => (
                  <motion.div 
                    key={i}
                    {...fadeIn}
                    transition={{ delay: i * 0.1 }}
                    className="group space-y-8"
                  >
                    <div className="relative">
                      <div className="w-16 h-16 rounded-2xl bg-white/[0.02] border border-white/5 flex items-center justify-center text-white/20 group-hover:text-lightblueprimary group-hover:border-lightblueprimary/20 transition-all duration-500">
                        {item.icon}
                      </div>
                      <span className="absolute -top-3 -right-3 font-mono text-[10px] text-white/10 group-hover:text-lightblueprimary/40 transition-colors">{item.step}</span>
                    </div>
                    
                    <div className="space-y-4">
                      <h4 className="text-xl font-black uppercase italic tracking-tight">{item.title}</h4>
                      <p className="text-white/40 text-sm leading-relaxed font-light">{item.desc}</p>
                    </div>

                    <div className="p-4 rounded-xl bg-black/40 border border-white/5 font-mono text-[10px] text-lightblueprimary/40 group-hover:text-lightblueprimary/80 transition-colors">
                      {item.code}
                    </div>
                  </motion.div>
                ))}
              </div>
            </div>
          </div>
        </section>

        {/* --- CAPABILITIES: BLUEPRINT VIEW --- */}
        <section className="max-w-7xl mx-auto px-6 mb-80">
          <div className="relative min-h-[800px] border border-white/5 rounded-[40px] bg-white/[0.01] overflow-hidden">
            {/* Grid Pattern Background */}
            <div className="absolute inset-0 opacity-[0.03]" style={{ backgroundImage: 'radial-gradient(circle, #fff 1px, transparent 1px)', backgroundSize: '40px 40px' }} />
            
            <div className="absolute top-12 left-12">
              <HUDLabel text="CAPABILITY_MAP" />
              <h2 className="text-4xl md:text-7xl font-black uppercase tracking-tighter italic mt-4 leading-none">
                Build Beyond <br /> <span className="text-white/20">Assumptions.</span>
              </h2>
            </div>

            {/* Scatter Layout (Non-Grid) */}
            <div className="absolute inset-0 p-12 lg:p-24 flex items-center justify-center">
              <div className="relative w-full h-full max-w-4xl mx-auto">
                
                {/* Central Focus */}
                <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-48 h-48 border border-lightblueprimary/10 rounded-full flex items-center justify-center">
                  <div className="w-32 h-32 border border-lightblueprimary/20 rounded-full flex items-center justify-center animate-pulse">
                    <Code2 className="text-lightblueprimary w-8 h-8" />
                  </div>
                </div>

                {/* Distributed Nodes */}
                {[
                  { title: "Trust-based Access", x: "-20%", y: "-30%", icon: <Lock size={16} /> },
                  { title: "Risk Pricing", x: "25%", y: "-25%", icon: <Activity size={16} /> },
                  { title: "Sybil Protection", x: "-30%", y: "20%", icon: <ShieldCheck size={16} /> },
                  { title: "Verified Markets", x: "35%", y: "15%", icon: <Layers size={16} /> },
                  { title: "Private Flows", x: "5%", y: "35%", icon: <Users size={16} /> }
                ].map((node, i) => (
                  <motion.div 
                    key={i}
                    initial={{ opacity: 0, scale: 0.8 }}
                    whileInView={{ opacity: 1, scale: 1 }}
                    className="absolute flex items-center gap-4 group"
                    style={{ left: `calc(50% + ${node.x})`, top: `calc(50% + ${node.y})` }}
                  >
                    <div className="w-12 h-12 rounded-full bg-white/[0.03] border border-white/10 flex items-center justify-center group-hover:border-lightblueprimary/40 transition-all">
                      <div className="text-white/20 group-hover:text-lightblueprimary transition-colors">
                        {node.icon}
                      </div>
                    </div>
                    <div className="space-y-1">
                      <h4 className="text-xs font-black uppercase tracking-[0.2em] group-hover:text-lightblueprimary transition-colors">{node.title}</h4>
                      <div className="w-0 h-px bg-lightblueprimary/40 group-hover:w-full transition-all duration-700" />
                    </div>
                  </motion.div>
                ))}

                {/* Connection Lines (SVG) */}
                <svg className="absolute inset-0 w-full h-full pointer-events-none opacity-10">
                  <path d="M 50% 50% L 30% 20% M 50% 50% L 75% 25% M 50% 50% L 20% 70% M 50% 50% L 85% 65% M 50% 50% L 55% 85%" fill="none" stroke="white" strokeWidth="1" strokeDasharray="4 4" />
                </svg>
              </div>
            </div>
          </div>
        </section>

        {/* --- WALLETS: NATIVE HUD --- */}
        <section className="max-w-7xl mx-auto px-6 mb-80">
          <div className="grid lg:grid-cols-2 gap-24 items-center">
            <div className="space-y-8 order-2 lg:order-1">
              <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-lightblueprimary/10 border border-lightblueprimary/20">
                <span className="text-[10px] font-mono font-bold text-lightblueprimary uppercase tracking-widest">Protocol Support</span>
              </div>
              <h2 className="text-5xl md:text-7xl font-black uppercase tracking-tighter italic leading-[0.9]">
                The Layer for <br /> <span className="text-lightblueprimary">Wallets.</span>
              </h2>
              <p className="text-white/40 text-lg md:text-xl font-light leading-relaxed italic max-w-lg">
                Wallets can natively integrate AnyLayer to resolve .any names and surface reputation signals directly in the transaction flow.
              </p>
              
              <div className="grid grid-cols-2 gap-x-12 gap-y-8 pt-8 border-t border-white/5">
                {[
                  { label: "NAME_RES", val: "Human-Readable IDs" },
                  { label: "REP_SIG", val: "Trust Score Visibility" },
                  { label: "PROOF_OPS", val: "On-Chain Attestations" },
                  { label: "ROUTE_SAFE", val: "Smart Path Routing" }
                ].map((item, i) => (
                  <div key={i} className="space-y-2">
                    <span className="text-[8px] font-mono text-white/20 uppercase tracking-[0.3em]">{item.label}</span>
                    <p className="text-sm font-bold uppercase tracking-tight">{item.val}</p>
                  </div>
                ))}
              </div>
            </div>

            <div className="order-1 lg:order-2 relative">
              <div className="relative p-1 bg-gradient-to-br from-white/10 to-transparent rounded-[40px]">
                <div className="bg-[#0D0D12] rounded-[39px] p-8 md:p-12 space-y-12">
                  <div className="flex justify-between items-center">
                    <HUDLabel text="WALLET_UI_MOCK" />
                    <div className="flex gap-1">
                      <div className="w-1.5 h-1.5 rounded-full bg-green-500/40" />
                      <div className="w-1.5 h-1.5 rounded-full bg-green-500" />
                    </div>
                  </div>

                  <div className="space-y-6">
                    <div className="p-6 rounded-2xl bg-white/[0.02] border border-white/5 flex items-center justify-between">
                      <div className="flex items-center gap-4">
                        <div className="w-10 h-10 rounded-full bg-lightblueprimary/20 flex items-center justify-center">
                          <Fingerprint size={20} className="text-lightblueprimary" />
                        </div>
                        <div>
                          <p className="text-[10px] font-mono text-white/20 uppercase">Resolved Name</p>
                          <h4 className="text-lg font-black tracking-tight">whale.any</h4>
                        </div>
                      </div>
                      <ChevronRight className="text-white/10" />
                    </div>

                    <div className="p-6 rounded-2xl bg-lightblueprimary/[0.03] border border-lightblueprimary/10 space-y-4">
                      <div className="flex justify-between items-center">
                        <span className="text-[10px] font-mono text-lightblueprimary/60 uppercase">Trust Band</span>
                        <span className="text-[10px] font-mono text-white/40">Verified via 4 Attesters</span>
                      </div>
                      <div className="h-2 w-full bg-white/5 rounded-full overflow-hidden">
                        <motion.div 
                          initial={{ width: 0 }}
                          whileInView={{ width: "85%" }}
                          transition={{ duration: 1.5, ease: "easeOut" }}
                          className="h-full bg-lightblueprimary shadow-[0_0_15px_rgba(166,131,255,0.5)]"
                        />
                      </div>
                      <p className="text-[11px] font-bold uppercase tracking-widest text-center text-lightblueprimary">Highly Reputable</p>
                    </div>
                  </div>

                  <div className="pt-8 flex justify-center">
                    <div className="px-8 py-3 rounded-full bg-white/5 border border-white/10 text-[10px] font-mono uppercase tracking-[0.4em] text-white/40">
                      SECURE_RESOLVER_ACTIVE
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* --- WAITLIST: TERMINAL INTERFACE --- */}
        <section id="waitlist" className="max-w-7xl mx-auto px-6 mb-60">
          <div className="bg-[#0D0D12] border border-white/10 rounded-[60px] overflow-hidden relative">
            <div className="grid lg:grid-cols-2">
              <div className="p-12 md:p-24 space-y-12">
                <div className="space-y-4">
                  <HUDLabel text="JOIN_THE_OPEN_BUILD" />
                  <h2 className="text-5xl md:text-7xl font-black uppercase tracking-tighter italic leading-none">
                    Start <br /> <span className="text-lightblueprimary">Building.</span>
                  </h2>
                </div>
                <p className="text-white/30 text-lg font-light italic leading-relaxed">
                  Join the developer group to get early access to SDKs, APIs, and trust primitives. We build in the open with verified partners.
                </p>

                <ul className="space-y-6">
                  {[
                    "Direct feedback with core engineers",
                    "Early access to protocol updates",
                    "Integration grants & builder support",
                    "Custom trust vector modeling"
                  ].map((item, i) => (
                    <li key={i} className="flex items-center gap-4 text-sm font-bold uppercase tracking-tight text-white/60">
                      <div className="w-1.5 h-1.5 rounded-full bg-lightblueprimary" />
                      {item}
                    </li>
                  ))}
                </ul>
              </div>

              <div className="bg-black/40 border-l border-white/5 p-12 md:p-24 flex flex-col justify-center relative">
                <div className="absolute top-0 right-0 p-8">
                  <Terminal size={40} className="text-white/[0.02]" />
                </div>

                <form onSubmit={handleWaitlist} className="space-y-12 relative z-10">
                  <div className="space-y-2">
                    <label className="text-[10px] font-mono text-lightblueprimary uppercase tracking-[0.5em]">Auth_Email</label>
                    <input 
                      type="email" 
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      placeholder="developer@node.local" 
                      className="w-full bg-transparent border-b border-white/10 py-6 text-2xl font-light focus:outline-none focus:border-lightblueprimary transition-all placeholder:text-white/5"
                      disabled={status === 'loading' || status === 'success'}
                    />
                  </div>

                  <button 
                    type="submit"
                    disabled={status === 'loading' || status === 'success'}
                    className="group relative w-full py-6 rounded-full overflow-hidden transition-all"
                  >
                    <div className="absolute inset-0 bg-white" />
                    <div className="relative flex items-center justify-center gap-3 text-black font-black uppercase tracking-[0.4em] text-xs">
                      {status === 'loading' ? (
                        <>In_Progress <Loader2 className="animate-spin" size={16} /></>
                      ) : status === 'success' ? (
                        <>Access_Granted <CheckCircle2 size={16} /></>
                      ) : (
                        <>Initialize_Access <ChevronRight size={16} className="group-hover:translate-x-1 transition-transform" /></>
                      )}
                    </div>
                  </button>

                  <AnimatePresence>
                    {status === 'success' && (
                      <motion.div 
                        initial={{ opacity: 0, y: 10 }}
                        animate={{ opacity: 1, y: 0 }}
                        className="p-4 rounded-xl bg-green-500/5 border border-green-500/20 text-center"
                      >
                        <p className="text-[10px] text-green-400 font-mono uppercase tracking-widest">Initialization successful. Check your terminal.</p>
                      </motion.div>
                    )}
                  </AnimatePresence>

                  <div className="flex justify-between items-center text-[8px] font-mono text-white/10 uppercase tracking-widest">
                    <span>Build_Status: STABLE</span>
                    <span>Region: GLOBAL</span>
                    <span>Lat: 20ms</span>
                  </div>
                </form>
              </div>
            </div>
          </div>
        </section>

        {/* --- CLOSING: THE TRUST STATEMENT --- */}
        <section className="max-w-4xl mx-auto py-60 text-center relative">
          <div className="absolute top-0 left-1/2 -translate-x-1/2 w-px h-32 bg-gradient-to-b from-lightblueprimary to-transparent" />
          
          <motion.div {...fadeIn} className="space-y-12">
            <h2 className="text-6xl md:text-[100px] font-black tracking-tighter uppercase italic leading-none">
              Start Building. <br /> <span className="text-lightblueprimary">Start Verifying.</span>
            </h2>
            <p className="text-white/40 text-xl md:text-2xl font-light leading-relaxed italic max-w-2xl mx-auto">
              AnyLayer provides the trust layer for the next generation of safer, smarter products.
            </p>
            <div className="flex justify-center gap-12">
              <Share2 className="text-white/5 w-6 h-6" />
              <Network className="text-white/5 w-6 h-6" />
              <Activity className="text-white/5 w-6 h-6" />
            </div>
          </motion.div>
        </section>

        {/* --- NEWS WIDGET --- */}
        <div className="border-t border-white/5 pt-20">
          <BlogWidget 
            category="Developers" 
            limit={3} 
            title="Developer Updates"
            subtitle="Technical guides, SDK releases, and builder showcases."
            dark={true}
          />
        </div>
      </main>

      <Footer />
    </div>
  );
};

export default BuilderPage;
