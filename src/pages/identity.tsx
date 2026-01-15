import React from 'react';
import Head from 'next/head';
import { motion } from 'framer-motion';
import { Header } from '@/components/layout/Header';
import { Footer } from '@/components/layout/Footer';
import { 
  Shield, 
  Fingerprint, 
  Users, 
  Globe, 
  Lock, 
  ArrowRight,
  CheckCircle2,
  Cpu,
  Globe2,
  Coins
} from 'lucide-react';
import Image from 'next/image';

// --- Shared Components ---

const Section = ({ children, className = "", id = "" }: { children: React.ReactNode, className?: string, id?: string }) => (
  <section id={id} className={`py-24 md:py-32 px-6 md:px-12 relative overflow-hidden ${className}`}>
    <div className="max-w-7xl mx-auto relative z-10">
      {children}
    </div>
  </section>
);

// --- The Final Identity Hero (The Code Aesthetic) ---

const IdentityHero = () => (
  <section className="relative min-h-screen flex items-center bg-black font-mono overflow-hidden pt-24">
    <div className="absolute top-0 right-0 w-1/3 h-full bg-lightblueprimary/[0.02] border-l border-white/5" />
    
    <div className="max-w-7xl mx-auto px-6 md:px-12 relative z-10 w-full">
      <div className="space-y-16">
        <div className="space-y-4">
          <div className="flex items-center gap-4 text-white/20 text-xs uppercase tracking-widest">
            <span className="text-lightblueprimary">01</span>
            <span>Namespace_Declaration</span>
          </div>
          <motion.h1 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="text-6xl md:text-[120px] font-black text-white leading-none tracking-tighter"
          >
            identity.<span className="text-lightblueprimary">any</span>
          </motion.h1>
        </div>

        <div className="grid lg:grid-cols-2 gap-20">
          <div className="space-y-8">
            <div className="p-8 rounded-3xl bg-[#0D0D12] border border-white/5 space-y-4">
              <div className="flex gap-2 mb-4">
                <div className="w-2 h-2 rounded-full bg-red-500/20" />
                <div className="w-2 h-2 rounded-full bg-yellow-500/20" />
                <div className="w-2 h-2 rounded-full bg-green-500/20" />
              </div>
              <p className="text-white/40 leading-relaxed">
                The industrial standard for onchain naming. Powered by zero-knowledge proofs. No biometric storage. No data exposure. Just logic.
              </p>
            </div>
            <div className="flex gap-6">
              <a 
                href="https://app.anylayer.org"
                target="_blank"
                rel="noopener noreferrer"
                className="px-8 py-4 bg-lightblueprimary text-black font-black uppercase text-[10px] tracking-widest rounded-lg hover:scale-105 transition-all"
              >
                Deploy_Identity
              </a>
              <button className="px-8 py-4 bg-white/5 text-white/40 font-black uppercase text-[10px] tracking-widest rounded-lg border border-white/10 hover:bg-white/10 transition-all">
                Read_Source
              </button>
            </div>
          </div>
          
          <div className="flex items-center justify-end opacity-10 hidden lg:flex">
            <Fingerprint size={300} strokeWidth={0.5} />
          </div>
        </div>
      </div>
    </div>
  </section>
);

export default function IdentityPage() {
  return (
    <div className="min-h-screen bg-[#08080C] text-white selection:bg-lightblueprimary selection:text-black font-geist">
      <Head>
        <title>.any Identity — The Universal Reputation Layer</title>
        <meta name="description" content="One Identity. Any App. Any Chain. Privacy-first onchain identity by Anylayer." />
      </Head>

      <Header />
      
      <IdentityHero />

      {/* Section 2: Core Philosophy */}
      <Section className="bg-[#0D0D12]" id="philosophy">
        <div className="grid lg:grid-cols-2 gap-24 items-center">
          <div className="space-y-8">
            <h2 className="text-4xl md:text-6xl font-medium tracking-tight">Privacy is the default — <span className="text-lightblueprimary">not a feature.</span></h2>
            <p className="text-xl text-white/40 font-light leading-relaxed">
              In a world of fragmented data and invasive surveillance, .any brings power back to the individual. Build onchain reputation without compromising your real-world identity.
            </p>
            <div className="grid grid-cols-2 gap-8 pt-10">
              <div className="space-y-4">
                <div className="w-10 h-10 rounded-xl bg-lightblueprimary/10 flex items-center justify-center text-lightblueprimary">
                  <Lock size={20} />
                </div>
                <h4 className="font-bold text-lg">Zero Exposure</h4>
                <p className="text-sm text-white/30 leading-relaxed">Prove facts about yourself without revealing underlying data using zk-SNARKs.</p>
              </div>
              <div className="space-y-4">
                <div className="w-10 h-10 rounded-xl bg-blueprimary/10 flex items-center justify-center text-blueprimary">
                  <Globe2 size={20} />
                </div>
                <h4 className="font-bold text-lg">Universal Anchor</h4>
                <p className="text-sm text-white/30 leading-relaxed">One human-readable name that works across Ethereum, Base, Polygon, and more.</p>
              </div>
            </div>
          </div>
          <div className="relative">
            <div className="absolute -inset-10 bg-lightblueprimary/5 blur-[100px] rounded-full" />
            <div className="relative grid grid-cols-2 gap-6">
              <div className="space-y-6 pt-12">
                <div className="p-8 rounded-[32px] bg-white/[0.02] border border-white/5 backdrop-blur-sm space-y-4">
                  <Users className="text-lightblueprimary" size={24} />
                  <h5 className="font-bold uppercase tracking-widest text-xs">Social Presence</h5>
                  <p className="text-xs text-white/30 leading-relaxed">Carry your community status and achievements to every social protocol.</p>
                </div>
                <div className="p-8 rounded-[32px] bg-white/[0.02] border border-white/5 backdrop-blur-sm space-y-4">
                  <Coins className="text-blueprimary" size={24} />
                  <h5 className="font-bold uppercase tracking-widest text-xs">Human Payments</h5>
                  <p className="text-xs text-white/30 leading-relaxed">Replace long addresses with alex.any for secure, human payments.</p>
                </div>
              </div>
              <div className="space-y-6">
                <div className="p-8 rounded-[32px] bg-white/[0.02] border border-white/5 backdrop-blur-sm space-y-4">
                  <Shield className="text-white" size={24} />
                  <h5 className="font-bold uppercase tracking-widest text-xs">Reputation Portability</h5>
                  <p className="text-xs text-white/30 leading-relaxed">Your earned trust moves with you. One reputation, infinite apps.</p>
                </div>
                <div className="p-8 rounded-[32px] bg-white/[0.02] border border-white/5 backdrop-blur-sm space-y-4">
                  <Cpu className="text-lightblueprimary/40" size={24} />
                  <h5 className="font-bold uppercase tracking-widest text-xs">AI-Verified</h5>
                  <p className="text-xs text-white/30 leading-relaxed">Verified human signals distinguish you from bots and AI agents.</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </Section>

      {/* Section 3: The Stack */}
      <Section id="how-it-works">
        <div className="text-center mb-24 space-y-6">
          <h2 className="text-4xl md:text-7xl font-black uppercase tracking-tighter">The Identity Stack</h2>
          <p className="text-xl text-white/40 font-light max-w-2xl mx-auto">From registration to utility, .any is engineered for the next generation of web experience.</p>
        </div>
        
        <div className="relative flex flex-col md:flex-row justify-between items-start gap-12">
          {/* Connecting Line */}
          <div className="absolute top-1/2 left-0 w-full h-px bg-white/5 hidden md:block" />
          
          {[
            { step: '01', title: '.any name', desc: 'Secure your human-readable anchor in the universal namespace.' },
            { step: '02', title: 'Identity Layer', desc: 'Link your wallets and accounts to your private identity pass.' },
            { step: '03', title: 'Reputation', desc: 'Build trust signals through onchain activity and verified proofs.' },
            { step: '04', title: 'Proofs', desc: 'Generate ZK-proofs of your status without exposing raw data.' },
            { step: '05', title: 'Apps', desc: 'Unlock access, credit, and rewards across the ecosystem.' },
          ].map((item, i) => (
            <motion.div 
              key={i} 
              whileHover={{ y: -10 }}
              className="relative z-10 flex-1 space-y-6 group"
            >
              <div className="w-16 h-16 rounded-2xl bg-[#12121A] border border-white/10 flex items-center justify-center text-xl font-mono font-black text-lightblueprimary group-hover:bg-lightblueprimary group-hover:text-black transition-all duration-500 shadow-xl">
                {item.step}
              </div>
              <div className="space-y-3">
                <h4 className="text-xl font-bold tracking-tight uppercase">{item.title}</h4>
                <p className="text-sm text-white/20 leading-relaxed">{item.desc}</p>
              </div>
            </motion.div>
          ))}
        </div>
      </Section>

      {/* Section 4: Developers (Industrial Black) */}
      <Section className="bg-black py-40 rounded-[60px] mx-6 md:mx-12 my-20 border border-white/5 shadow-3xl">
        <div className="grid lg:grid-cols-2 gap-24 items-center">
          <div className="space-y-10">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-lightblueprimary/10 border border-lightblueprimary/20">
              <span className="text-[10px] font-mono uppercase tracking-widest text-lightblueprimary">SDK_V1.0.4</span>
            </div>
            <h2 className="text-5xl md:text-7xl font-black leading-[0.9] tracking-tighter">Integrate Trust <br /><span className="text-white/20">Without the Risk.</span></h2>
            <p className="text-xl text-white/40 font-light leading-relaxed">
              Apps integrate .any to authenticate users, gate access, and enforce trust — without ever touching sensitive personal data.
            </p>
            <div className="flex flex-wrap gap-6 pt-6">
              <button className="px-10 py-5 bg-lightblueprimary text-black font-black rounded-full text-sm uppercase tracking-widest hover:scale-105 transition-all">Get the SDK</button>
              <button className="px-10 py-5 bg-transparent border-2 border-white/10 text-white font-black rounded-full text-sm uppercase tracking-widest hover:bg-white/5 transition-all">Documentation</button>
            </div>
          </div>
          
          <div className="bg-[#0D0D12] p-10 rounded-[40px] border border-white/10 relative overflow-hidden group shadow-inner">
            <div className="absolute top-0 right-0 p-4 opacity-20 group-hover:opacity-100 transition-opacity">
              <div className="w-3 h-3 rounded-full bg-lightblueprimary animate-pulse" />
            </div>
            <pre className="text-lightblueprimary/80 font-mono text-sm leading-loose overflow-x-auto">
              {`// Secure Identity Initialization
const identity = await Anylayer.connect('.any');

// Request Verification without data leak
const proof = await identity.prove({
  trait: 'REPUTATION_SCORE',
  threshold: 700,
  private: true
});

return {
  user: identity.name, // "alex.any"
  status: proof.verified ? "TRUSTED" : "DENIED"
};`}
            </pre>
          </div>
        </div>
      </Section>

      {/* Section 5: Brand Protection */}
      <Section className="pb-40">
        <div className="bg-gradient-to-br from-blueprimary/20 to-transparent p-12 md:p-24 rounded-[60px] border border-white/5 relative overflow-hidden">
          <div className="absolute top-0 right-0 w-1/2 h-full opacity-10 pointer-events-none">
            <Image src="/identity-layer-bg.svg" alt="" fill className="object-cover" />
          </div>
          <div className="max-w-2xl space-y-8 relative z-10">
            <h2 className="text-4xl md:text-6xl font-black uppercase tracking-tighter leading-none">Verified Premium & Brand Protection</h2>
            <p className="text-xl text-white/50 font-light leading-relaxed">
              When identity matters, verification protects it. Prominent individuals and brands can upgrade to Verified Premium by proving legitimacy, preventing impersonation across all apps.
            </p>
            <button className="text-lightblueprimary font-black uppercase tracking-widest text-sm flex items-center gap-3 group">
              Apply for Verification
              <ArrowRight size={20} className="group-hover:translate-x-2 transition-transform" />
            </button>
          </div>
        </div>
      </Section>

      {/* Closing / 60-Second Scroll Section */}
      <section className="py-40 px-6 text-center relative overflow-hidden border-t border-white/5 bg-[#08080C]">
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-full h-full bg-blueprimary/5 blur-[120px] rounded-full pointer-events-none opacity-50" />
        <div className="max-w-4xl mx-auto relative z-10 space-y-16">
          <div className="space-y-4">
            <p className="text-lightblueprimary font-mono text-sm uppercase tracking-[0.6em] font-black">ONE ID. ANY APP. ANY CHAIN.</p>
            <h2 className="text-6xl md:text-9xl font-black tracking-tighter">MEET .ANY</h2>
          </div>
          
          <div className="grid md:grid-cols-2 gap-16 text-left">
            <p className="text-2xl text-white/40 leading-relaxed font-light">
              Identity is broken. Your reputation is everywhere — and nowhere. Privacy shouldn’t be optional.
            </p>
            <p className="text-2xl font-medium leading-relaxed">
              Reputation follows you — privately. Social. Payments. Access. One name. One identity.
            </p>
          </div>

          <div className="pt-10">
            <button className="px-16 py-8 bg-white text-black text-2xl font-black rounded-full hover:bg-lightblueprimary transition-all shadow-2xl hover:scale-105 active:scale-95 uppercase tracking-widest">
              Claim Your .any Now
            </button>
          </div>
        </div>
      </section>

      <Footer />
    </div>
  );
}
