'use client';

import React, { useRef } from 'react';
import { motion, useScroll } from 'framer-motion';
import {
  ShieldCheck,
} from 'lucide-react';

const AGENT_CONTENT = {
  hook: "Today’s agents can act, but they can’t credibly signal how trustworthy they are.",
  solution: "Anylayer changes that. Agents build reputation from task outcomes—execution success, slippage control, incident rate, user satisfaction, audit feedback—anchored privately and provable on demand.",
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
            <h2 className="text-4xl md:text-7xl font-black uppercase tracking-tighter text-[#08080C] leading-none">
              AI Agents — <br />
              <span className="text-lightblueprimary text-3xl md:text-5xl">Trust Built on Proven Outcomes</span>
            </h2>
            <p className="text-black/40 text-xl md:text-2xl font-medium leading-relaxed border-l-2 border-black/10 pl-8">
              {AGENT_CONTENT.hook} <span className="text-black/80">{AGENT_CONTENT.solution}</span>
            </p>
          </div>

          <div className="flex flex-col md:flex-row items-center gap-12 border-y border-black/5 py-20">
            {AGENT_CONTENT.metrics.map((m, i) => (
              <div key={i} className="flex-1 space-y-2 text-center md:text-left">
                <span className="text-[10px] font-mono text-[#08080C] font-black uppercase tracking-widest opacity-40">Metric 0{i + 1}</span>
                <h3 className="text-5xl font-black text-[#08080C] uppercase tracking-tighter">{m.value}</h3>
                <p className="text-black/30 text-sm font-bold uppercase tracking-widest">{m.label}</p>
              </div>
            ))}
          </div>

          <div className="max-w-3xl ml-auto text-right space-y-6">
            <p className="text-black/40 text-lg md:text-xl font-medium leading-relaxed">
              {AGENT_CONTENT.visibility}
            </p>
            <div className="flex items-center justify-end gap-4 text-[#08080C]">
              <span className="text-[10px] font-mono font-black uppercase tracking-[0.4em]">{AGENT_CONTENT.ecosystem}</span>
              <div className="w-12 h-px bg-[#08080C]" />
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default AIAgents;
