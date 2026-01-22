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

const BuilderPage = () => {
  const [email, setEmail] = useState('');
  const [status, setStatus] = useState<'idle' | 'loading' | 'success' | 'error'>('idle');

  const handleWaitlist = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!email) return;

    setStatus('loading');
    try {
      const response = await fetch('/api/subscribe', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email, type: 'developer' }),
      });

      if (!response.ok) throw new Error('Waitlist submission failed');

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
    transition: { duration: 0.8, ease: "easeOut" } as const
  };

  const WalletSimulationLoop = () => {
    const [step, setStep] = useState<'input' | 'review' | 'sending' | 'sent'>('input');

    useEffect(() => {
      const timer = setInterval(() => {
        setStep((prev) => {
          if (prev === 'input') return 'review';
          if (prev === 'review') return 'sending';
          if (prev === 'sending') return 'sent';
          return 'input';
        });
      }, 4000);
      return () => clearInterval(timer);
    }, []);

    return (
      <div className="relative h-full flex flex-col p-6 pt-16">
        <AnimatePresence mode="wait">
          {(step === 'input' || step === 'review' || step === 'sending') && (
            <motion.div
              key="transfer-view"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="flex-1 flex flex-col"
            >
              <div className="flex justify-between items-center mb-8">
                <div className="w-8 h-8 rounded-full bg-white/5 border border-white/10 flex items-center justify-center">
                  <ChevronRight className="rotate-180 w-4 h-4 text-white/40" />
                </div>
                <div className="px-3 py-1 rounded-full bg-white/5 border border-white/10">
                  <span className="text-[8px] font-mono text-white/40 uppercase tracking-widest">Transfer_Protocol</span>
                </div>
              </div>

              <div className="space-y-0 mb-8">
                <h3 className="text-3xl font-black uppercase tracking-tighter leading-none">Send</h3>
                <h3 className="text-3xl font-black uppercase tracking-tighter leading-none text-white/20">Assets</h3>
              </div>

              <div className="space-y-4 flex-1">
                <div className="space-y-2">
                  <label className="text-[10px] font-mono text-white/20 uppercase tracking-widest block">Destination_Address</label>
                  <div className="p-4 rounded-xl bg-white/[0.03] border border-white/10 flex items-center justify-between">
                    <div className="flex items-center gap-2">
                      <motion.span
                        initial={{ width: 0 }}
                        animate={{ width: "auto" }}
                        transition={{ duration: 1.5, ease: "easeInOut" }}
                        className="text-white font-bold tracking-tight overflow-hidden whitespace-nowrap border-r-2 border-lightblueprimary h-6"
                      >
                        whale.any
                      </motion.span>
                    </div>
                    <Fingerprint className="text-white/10 w-4 h-4" />
                  </div>
                </div>

                {step !== 'input' && (
                  <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    className="p-4 rounded-2xl bg-lightblueprimary/5 border border-lightblueprimary/20 backdrop-blur-md relative overflow-hidden"
                  >
                    <div className="relative z-10 flex items-center justify-between mb-4">
                      <div className="flex items-center gap-3">
                        <div className="w-8 h-8 rounded-full bg-lightblueprimary/10 border border-lightblueprimary/30 flex items-center justify-center">
                          <ShieldCheck className="text-lightblueprimary w-4 h-4" />
                        </div>
                        <div className="space-y-0.5">
                          <p className="text-[7px] font-mono text-white/20 uppercase tracking-widest">Reputation_Engine</p>
                          <p className="text-[9px] font-bold text-lightblueprimary uppercase tracking-widest">Trusted Endpoint</p>
                        </div>
                      </div>
                      <div className="text-right">
                        <p className="text-xl font-black text-white tabular-nums">8631</p>
                        <p className="text-[5px] font-mono text-white/20 uppercase tracking-[0.2em]">Trust_Score</p>
                      </div>
                    </div>

                    <div className="h-1 w-full bg-white/5 rounded-full overflow-hidden">
                      <motion.div
                        initial={{ width: 0 }}
                        animate={{ width: "86%" }}
                        transition={{ duration: 1.5, ease: "easeOut" }}
                        className="h-full bg-lightblueprimary shadow-[0_0_15px_rgba(166,131,255,0.4)]"
                      />
                    </div>
                  </motion.div>
                )}

                <div className="text-center pt-8">
                  <div className="text-5xl font-black tracking-tighter mb-1">523<span className="text-xl text-white/20 ml-2 uppercase">ANY</span></div>
                </div>
              </div>

              <div className="pt-8" />

              <motion.div
                className="w-full py-4 rounded-2xl bg-lightblueprimary flex items-center justify-center gap-3 text-black font-black uppercase tracking-[0.2em] text-[11px]"
              >
                {step === 'sending' ? (
                  <>Sending <Loader2 className="animate-spin" size={14} /></>
                ) : (
                  <>Review_Transfer <ChevronRight size={14} /></>
                )}
              </motion.div>
            </motion.div>
          )}

          {step === 'sent' && (
            <motion.div
              key="sent-view"
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0 }}
              className="flex-1 flex flex-col items-center justify-center text-center space-y-8"
            >
              <motion.div
                initial={{ scale: 0 }}
                animate={{ scale: 1 }}
                transition={{ type: "spring", damping: 12 }}
                className="w-20 h-20 rounded-full bg-lightblueprimary/10 border border-lightblueprimary/20 flex items-center justify-center relative"
              >
                <div className="absolute inset-0 bg-lightblueprimary/20 blur-xl rounded-full" />
                <CheckCircle2 className="text-lightblueprimary w-10 h-10 relative z-10" />
              </motion.div>

              <div className="space-y-2">
                <h3 className="text-2xl font-black uppercase tracking-tighter">Transfer Sent</h3>
                <p className="text-white/40 text-[10px] font-mono uppercase tracking-[0.2em]">Transaction_Broadcasted</p>
              </div>

              <div className="w-full p-6 rounded-2xl bg-white/[0.03] border border-white/5 space-y-4">
                <div className="flex justify-between items-center">
                  <span className="text-[8px] font-mono text-white/20 uppercase">Amount</span>
                  <span className="text-sm font-bold tracking-tight">523 ANY</span>
                </div>
                <div className="w-full h-px bg-white/5" />
                <div className="flex justify-between items-center">
                  <span className="text-[8px] font-mono text-white/20 uppercase">Recipient</span>
                  <span className="text-sm font-bold tracking-tight text-lightblueprimary">whale.any</span>
                </div>
              </div>

              <div className="w-full pt-8">
                <div className="w-full py-4 rounded-xl border border-white/10 text-[10px] font-mono uppercase tracking-widest text-white/40">
                  Transaction_Complete
                </div>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    );
  };

  const HUDLabel = ({ text }: { text: string }) => (
    <div className="inline-flex items-center gap-3 px-3 py-1 rounded-full bg-white/[0.02] border border-white/5 backdrop-blur-sm">
      <div className="w-1 h-1 rounded-full bg-lightblueprimary" />
      <span className="text-[9px] font-mono uppercase tracking-[0.3em] text-white/40">{text}</span>
    </div>
  );

  return (
    <div className="bg-[#08080C] min-h-screen font-geist text-white selection:bg-lightblueprimary selection:text-black overflow-x-hidden">
      <Head>
        <title>Developers | Anylayer — Build with Verified Trust</title>
        <meta name="description" content="Integrate trust, reputation, and proofs into your product with Anylayer's SDKs and APIs." />
      </Head>

      <Header />

      <main className="relative pt-44">
        {/* --- DYNAMIC BACKGROUND ELEMENTS --- */}
        <div className="absolute inset-0 pointer-events-none">
          <div className="absolute top-0 left-1/4 w-[1px] h-screen bg-gradient-to-b from-white/[0.05] via-transparent to-transparent" />
          <div className="absolute top-0 right-1/4 w-[1px] h-screen bg-gradient-to-b from-white/[0.05] via-transparent to-transparent" />
        </div>

        {/* --- HERO: ARCHITECTURAL DECONSTRUCTION --- */}
        <section className="max-w-7xl mx-auto px-6 mb-32 relative">
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
                transition={{ duration: 1, ease: "easeOut" }}
                className="text-6xl md:text-[80px] font-black tracking-tighter uppercase leading-[0.8]"
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
                <p className="text-lg md:text-xl text-white/40 font-light leading-relaxed border-l border-white/10 pl-8">
                  Anylayer is the trust primitive for developers.
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

            <div className="lg:col-span-5 relative hidden lg:block scale-[0.8] origin-right">
              {/* Abstract Technical Visual */}
              <div className="relative aspect-square">
                {/* Outer Ring - More visible, active rotation */}
                <motion.div
                  animate={{ rotate: 360, scale: [1, 1.02, 1] }}
                  transition={{
                    rotate: { duration: 60, repeat: Infinity, ease: "linear" },
                    scale: { duration: 4, repeat: Infinity, ease: "easeInOut" }
                  }}
                  className="absolute inset-0 border-[1.5px] border-white/20 rounded-full"
                />

                {/* Middle Ring - Dashed, counter-rotation */}
                <motion.div
                  animate={{ rotate: -360 }}
                  transition={{ duration: 40, repeat: Infinity, ease: "linear" }}
                  className="absolute inset-8 border-[1.5px] border-white/10 rounded-full border-dashed"
                />

                {/* Inner Ring - Scanning effect */}
                <motion.div
                  animate={{ rotate: 360 }}
                  transition={{ duration: 20, repeat: Infinity, ease: "linear" }}
                  className="absolute inset-16 border border-lightblueprimary/30 rounded-full border-t-transparent border-l-transparent"
                />

                <div className="absolute inset-0 flex items-center justify-center">
                  <div className="relative">
                    {/* Removed blur/glow, kept clean icon with subtle float */}
                    <motion.div
                      animate={{ y: [0, -8, 0] }}
                      transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }}
                    >
                      <Activity className="text-lightblueprimary/60 w-16 h-16" />
                    </motion.div>
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
              <h2 className="text-4xl md:text-6xl font-black uppercase tracking-tighter mt-4 leading-[0.9]">
                Bring Trust into <br /> <span className="text-lightblueprimary">Your Execution Stack.</span>
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
                    title: "Smart Contracts",
                    desc: "On-chain verification for smart contract gated access.",
                    code: "function _checkTrust() internal"
                  },
                  {
                    step: "04",
                    icon: <Webhook size={24} />,
                    title: "Webhooks",
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
                      <h4 className="text-xl font-black uppercase tracking-tight">{item.title}</h4>
                      <p className="text-white/40 text-sm leading-relaxed font-light">{item.desc}</p>
                    </div>

                    <div className="p-4 rounded-xl bg-[#121119] border border-white/5 font-mono text-[10px] text-lightblueprimary/90 transition-colors">
                      {item.code}
                    </div>
                  </motion.div>
                ))}
              </div>
            </div>
          </div>
        </section>

        {/* --- CAPABILITIES: COMPACT LIST --- */}
        <section className="max-w-7xl mx-auto px-6 mb-80">
          <div className="mb-20">
            <HUDLabel text="CAPABILITY_REGISTRY" />
            <h2 className="text-4xl md:text-6xl font-black uppercase tracking-tighter mt-4 leading-[0.9]">
              Building With <br /> <span className="text-lightblueprimary">Verified Trust.</span>
            </h2>
          </div>

          <div className="border-t border-white/5">
            {[
              {
                id: "01",
                title: "Trust-based access",
                desc: "Gate features using reputation thresholds instead of KYC uploads.",
                icon: <Lock className="w-4 h-4" />
              },
              {
                id: "02",
                title: "Risk-aware pricing",
                desc: "Adjust fees, limits, or rates based on verified credibility.",
                icon: <Activity className="w-4 h-4" />
              },
              {
                id: "03",
                title: "Sybil-safe rewards",
                desc: "Run campaigns and airdrops without bot abuse.",
                icon: <ShieldCheck className="w-4 h-4" />
              },
              {
                id: "04",
                title: "Reputation-driven marketplaces",
                desc: "Rank users, sellers, or agents by real outcomes.",
                icon: <Layers className="w-4 h-4" />
              },
              {
                id: "05",
                title: "Private compliance flows",
                desc: "Prove eligibility without exposing documents.",
                icon: <Users className="w-4 h-4" />
              }
            ].map((item, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, y: 10 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.1 }}
                className="border-b border-white/5 transition-all duration-300"
              >
                <div className="flex flex-col md:flex-row md:items-center py-8 gap-4 md:gap-12 px-4">
                  <div className="flex items-center gap-6 min-w-[140px]">
                    <span className="text-[10px] font-mono text-white/20 uppercase tracking-[0.4em]">{item.id}</span>
                    <div className="text-lightblueprimary/40">
                      {item.icon}
                    </div>
                  </div>

                  <div className="md:w-1/3">
                    <h3 className="text-lg font-bold uppercase tracking-tight">
                      {item.title}
                    </h3>
                  </div>

                  <div className="md:flex-1">
                    <p className="text-white/40 text-sm font-light leading-relaxed">
                      {item.desc}
                    </p>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </section>

        {/* --- WALLETS: ZENITH OBSIDIAN --- */}
        <section className="max-w-7xl mx-auto px-6 mb-80">
          <div className="grid lg:grid-cols-2 gap-24 items-center">
            <div className="space-y-12">
              <HUDLabel text="Protocol Support" />
              <h2 className="text-4xl md:text-6xl font-black uppercase tracking-tighter leading-[0.9]">
                The Layer for <br /> <span className="text-lightblueprimary">Wallets.</span>
              </h2>
              <p className="text-white/40 text-lg md:text-xl font-light leading-relaxed max-w-lg">
                Wallets natively integrate Anylayer to resolve human-readable names and surface reputation signals directly in the transaction flow.
              </p>

              <div className="space-y-8 pt-8 border-t border-white/5">
                {[
                  { label: "REAL_TIME_LOOKUP", val: "Instant Identity Resolution", status: "Active" },
                  { label: "SECURE_RES_VECTOR", val: "Cross-Chain Reputation", status: "Enabled" },
                  { label: "TRUST_BAND_METRIC", val: "8631 Precision Score", status: "Verified" }
                ].map((item, i) => (
                  <div key={i} className="flex items-center justify-between group">
                    <div className="space-y-1">
                      <span className="text-[8px] font-mono text-white/20 uppercase tracking-[0.3em]">{item.label}</span>
                      <p className="text-base font-bold uppercase tracking-tight text-white/60 group-hover:text-white transition-colors">{item.val}</p>
                    </div>
                    <div className="flex items-center gap-2 px-2 py-1 rounded-sm bg-white/[0.02] border border-white/5">
                      <div className="w-1 h-1 rounded-full bg-lightblueprimary animate-pulse" />
                      <span className="text-[8px] font-mono text-lightblueprimary uppercase tracking-widest">{item.status}</span>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            <div className="relative">
              {/* Phone Frame */}
              <div className="relative mx-auto w-full max-w-[320px] aspect-[9/19] rounded-[3rem] bg-[#050508] border-[8px] border-[#1A1A1F] shadow-[0_40px_100px_rgba(0,0,0,0.8)] overflow-hidden">
                {/* Ethereal Background */}
                <div className="absolute inset-0 opacity-40">
                  <img
                    src="/wallet_bg_obdiff.png"
                    alt=""
                    className="w-full h-full object-cover grayscale brightness-50"
                  />
                  <div className="absolute inset-0 bg-gradient-to-b from-black/60 via-transparent to-black" />
                </div>

                {/* Looping Content Logic */}
                <WalletSimulationLoop />

                {/* iPhone Notch */}
                <div className="absolute top-0 left-1/2 -translate-x-1/2 w-32 h-7 bg-[#1A1A1F] rounded-b-2xl flex items-center justify-center">
                  <div className="w-12 h-1 bg-white/5 rounded-full" />
                </div>
              </div>

              {/* Decorative elements */}
              <div className="absolute -z-10 top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[500px] h-[500px] bg-lightblueprimary/10 rounded-full blur-[120px]" />
            </div>
          </div>
        </section>

        {/* --- DEVELOPER PROGRAM: THE COLLABORATION --- */}
        <section className="max-w-7xl mx-auto px-6 mb-80">
          <div className="mb-24">
            <HUDLabel text="DEVELOPER_PROGRAM" />
            <h2 className="text-4xl md:text-6xl font-black uppercase tracking-tighter mt-4 leading-[0.9]">
              Empowering the <br /> <span className="text-lightblueprimary">Next Gen of Builders.</span>
            </h2>
            <p className="text-white/40 text-lg md:text-xl font-light leading-relaxed max-w-2xl mt-8">
              The Anylayer Developer Program supports teams building trust‑native products with early access, guidance, and direct collaboration.
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
            {[
              {
                title: "Early access",
                desc: "Get first access to SDKs, APIs, and new trust primitives before public release.",
                icon: <Zap className="w-5 h-5" />
              },
              {
                title: "Builder support",
                desc: "Hands‑on guidance, best practices, and reference integrations for real products.",
                icon: <Code2 className="w-5 h-5" />
              },
              {
                title: "Design & use-case feedback",
                desc: "Work with the Anylayer team to shape trust flows, UX, and integration patterns.",
                icon: <Activity className="w-5 h-5" />
              },
              {
                title: "Ecosystem visibility",
                desc: "Featured integrations, partner showcases, and early ecosystem distribution.",
                icon: <Share2 className="w-5 h-5" />
              }
            ].map((item, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ delay: i * 0.1 }}
                viewport={{ once: true }}
                className="p-8 rounded-[32px] bg-white/[0.02] hover:bg-white/[0.04] transition-all duration-500 group"
              >
                <div className="w-12 h-12 rounded-2xl bg-white/[0.02] flex items-center justify-center text-white/20 group-hover:text-lightblueprimary transition-all duration-500 mb-6">
                  {item.icon}
                </div>
                <h3 className="text-lg font-bold uppercase tracking-tight mb-4">{item.title}</h3>
                <p className="text-white/40 text-sm font-light leading-relaxed">{item.desc}</p>
              </motion.div>
            ))}
          </div>

          <div className="mt-12 p-8 rounded-[40px] bg-white/[0.02] border border-white/5 flex flex-col md:flex-row items-center justify-between gap-8">
            <div className="space-y-2">
              <span className="text-[10px] font-mono text-lightblueprimary/60 uppercase tracking-[0.4em]">Who it's for</span>
              <p className="text-white/60 text-sm font-light leading-relaxed max-w-xl">
                Wallet teams, protocols, marketplaces, consumer apps, and infrastructure builders exploring trust‑based features.
              </p>
            </div>
            <a href="#waitlist" className="group flex items-center gap-4 bg-white text-black px-10 py-5 rounded-full font-black text-[11px] uppercase tracking-[0.2em] transition-all hover:scale-[1.02] active:scale-[0.98]">
              Join Waitlist
              <ArrowRight size={14} className="group-hover:translate-x-1 transition-transform" />
            </a>
          </div>
        </section>

        {/* --- WAITLIST: REFINED BUILDER PROGRAM --- */}
        <section id="waitlist" className="max-w-7xl mx-auto px-6 mb-60">
          <div className="flex flex-col items-center text-center space-y-16">
            <div className="max-w-3xl space-y-6">
              <div className="flex flex-col items-center gap-4">
                <div className="inline-flex items-center gap-3 px-3 py-1 rounded-full bg-white/[0.02] border border-white/5 backdrop-blur-sm">
                  <div className="w-1 h-1 rounded-full bg-lightblueprimary" />
                  <span className="text-[9px] font-mono uppercase tracking-[0.3em] text-white/40">Builder Ecosystem</span>
                </div>
                <h2 className="text-4xl md:text-6xl font-black uppercase tracking-tighter leading-[0.9]">
                  Join the <span className="text-lightblueprimary">Builder Waitlist.</span>
                </h2>
              </div>
              <p className="text-white/30 text-lg md:text-xl font-light leading-relaxed max-w-2xl mx-auto">
                Be the first to integrate Anylayer. Get early access to our trust primitives, SDKs, and developer grants.
              </p>
            </div>

            <div className="w-full max-w-xl">
              <form onSubmit={handleWaitlist} className="space-y-8">
                <div className="relative group">
                  <input
                    type="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    placeholder="Email Address"
                    className="w-full bg-white/[0.03] border border-white/10 rounded-2xl px-8 py-6 text-xl font-light focus:outline-none focus:border-lightblueprimary focus:bg-white/[0.05] transition-all placeholder:text-white/10 text-center"
                    disabled={status === 'loading' || status === 'success'}
                  />
                  <div className="absolute inset-0 rounded-2xl bg-gradient-to-r from-lightblueprimary/5 to-transparent opacity-0 group-focus-within:opacity-100 pointer-events-none transition-opacity" />
                </div>

                <button
                  type="submit"
                  disabled={status === 'loading' || status === 'success'}
                  className="group relative w-full py-6 rounded-2xl overflow-hidden transition-all hover:bg-white/90 active:scale-[0.99] bg-white text-black font-black uppercase tracking-[0.4em] text-[11px]"
                >
                  <div className="relative flex items-center justify-center gap-3">
                    {status === 'loading' ? (
                      <>Processing <Loader2 className="animate-spin" size={16} /></>
                    ) : status === 'success' ? (
                      <>Success <CheckCircle2 size={16} /></>
                    ) : (
                      <>Submit <ArrowRight size={14} className="group-hover:translate-x-1 transition-transform" /></>
                    )}
                  </div>
                </button>

                <AnimatePresence>
                  {status === 'success' && (
                    <motion.div
                      initial={{ opacity: 0, y: 10 }}
                      animate={{ opacity: 1, y: 0 }}
                      className="p-4 rounded-xl bg-green-500/5 border border-green-500/20"
                    >
                      <p className="text-sm text-green-400 font-medium">Thank you. We will contact you soon.</p>
                    </motion.div>
                  )}
                </AnimatePresence>
              </form>
            </div>
          </div>
        </section>

        {/* --- CLOSING: THE TRUST STATEMENT --- */}
        <section className="max-w-4xl mx-auto py-60 text-center relative">
          <div className="absolute top-0 left-1/2 -translate-x-1/2 w-px h-32 bg-gradient-to-b from-lightblueprimary to-transparent" />

          <motion.div {...fadeIn} className="space-y-12">
            <h2 className="text-4xl md:text-6xl font-black uppercase tracking-tighter leading-[0.9]">
              Start Building. <br /> <span className="text-lightblueprimary">Start Verifying.</span>
            </h2>
            <p className="text-white/40 text-xl md:text-2xl font-light leading-relaxed max-w-2xl mx-auto">
              Anylayer provides the trust layer for the next generation of safer, smarter products.
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
    </div >
  );
};

export default BuilderPage;
