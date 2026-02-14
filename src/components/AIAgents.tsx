'use client';

import React, { useRef } from 'react';
import { motion, useScroll } from 'framer-motion';
import Link from 'next/link';
import {
  ShieldCheck,
} from 'lucide-react';

const AGENT_CONTENT = {
  hook: "Today’s agents can act, but they can’t credibly signal how trustworthy they are.",
  solution: "Anylayer changes that. Agents build reputation from task outcomes, execution success, slippage control, incident rate, user satisfaction, audit feedback anchored privately and provable on demand.",
  visibility: "What users see: a reliability score and relevant sub‑metrics (e.g., “90‑day success rate ≥ 98%” or “no incidents in last 30 days”).",
  ecosystem: "Anylayer provides the ground to grow reputation and carry it across ecosystems.",
  metrics: [
    { label: "Success Rate", value: "≥ 98%" },
    { label: "Incident Rate", value: "0.0%" },
    { label: "Audit Log", value: "PASS" },
    { label: "Trust Score", value: "3244" }
  ]
};

const AIAgents = () => {
  const containerRef = useRef(null);
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start end", "end start"]
  });

  return (
    <section ref={containerRef} className="bg-white py-24 md:py-40 relative border-t border-black/5 overflow-hidden font-geist">
      <div className="max-w-7xl mx-auto px-6">
        <div className="space-y-32 py-12">
          <div className="max-w-4xl space-y-8">
            <div className="mb-8">
              <div className="inline-flex items-center gap-3 px-3 py-1 rounded-full bg-black/[0.03] border border-black/5 backdrop-blur-sm">
                <div className="w-1 h-1 rounded-full bg-lightblueprimary" />
                <span className="text-[9px] font-mono uppercase tracking-[0.3em] font-medium text-black/40">AI Agents // Protocol Verification</span>
              </div>
            </div>
            <h2 className="text-4xl md:text-6xl font-black uppercase tracking-tighter text-[#08080C] leading-[0.9]">
              AI Agents <br />
              <span className="text-lightblueprimary text-3xl md:text-5xl">Trust Built on Proven Outcomes</span>
            </h2>
            <p className="text-black/40 text-xl md:text-2xl font-medium leading-relaxed border-l-2 border-black/10 pl-8">
              {AGENT_CONTENT.hook} <span className="text-black/80">{AGENT_CONTENT.solution}</span>
            </p>
          </div>

          <div className="flex flex-col md:flex-row items-center gap-12 border-y border-black/5 py-20">
            {AGENT_CONTENT.metrics.map((m, i) => (
              <div key={i} className="flex-1 space-y-2 text-center md:text-left">
                <div className="inline-flex items-center gap-2 px-2 py-0.5 rounded-full bg-black/[0.03] border border-black/5 mb-2">
                  <div className="w-1 h-1 rounded-full bg-lightblueprimary" />
                  <span className="text-[8px] font-mono text-black/40 uppercase tracking-widest">Metric 0{i + 1}</span>
                </div>
                <h3 className="text-5xl font-black text-[#08080C] uppercase tracking-tighter">{m.value}</h3>
                <p className="text-black/30 text-sm font-bold uppercase tracking-widest">{m.label}</p>
              </div>
            ))}
          </div>

          <div className="max-w-3xl ml-auto text-right space-y-8">
            <p className="text-black/40 text-lg md:text-xl font-medium leading-relaxed">
              {AGENT_CONTENT.visibility}
            </p>
            <div className="flex flex-col items-end gap-6">
              <div className="inline-flex items-center gap-3 px-3 py-1 rounded-full bg-black/[0.03] border border-black/5">
                <div className="w-1 h-1 rounded-full bg-lightblueprimary" />
                <span className="text-[9px] font-mono font-black uppercase tracking-[0.4em] text-black/40">{AGENT_CONTENT.ecosystem}</span>
              </div>

              <a
                href="https://www.anylayer.org/docs#anylayer-ai-the-sovereign-machine-infrastructure"
                target="_blank"
                rel="noopener noreferrer"
                className="group relative flex items-center gap-3 bg-lightblueprimary text-black px-8 py-4 rounded-full font-bold text-[11px] uppercase tracking-[0.2em] transition-all duration-300 hover:brightness-110 active:scale-[0.98] shadow-[0_10px_30px_rgba(166,131,255,0.2)]"
              >
                <span>See More Info About AI Agents</span>
                <div className="w-5 h-5 rounded-full bg-black/10 flex items-center justify-center transition-transform group-hover:translate-x-1">
                  <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round">
                    <path d="M5 12h14m-7-7 7 7-7 7" />
                  </svg>
                </div>
              </a>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default AIAgents;
