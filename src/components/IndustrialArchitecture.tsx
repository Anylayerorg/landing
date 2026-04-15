'use client';

import React from 'react';
import Link from 'next/link';
import { ArrowRight } from 'lucide-react';

const layers = [
  {
    id: '01',
    title: 'Identity: Private & Portable',
    subtitle: 'THE ANCHOR',
    description:
      'A persistent, human-readable identity that anchors trust, reputation, and proofs across applications without exposing personal data.',
    cta: 'See Identity Specs',
    visualSrc: '/identity-layer.svg',
    link: '/identity',
  },
  {
    id: '02',
    title: 'Reputation: Dynamic & Composable',
    subtitle: 'THE MULTIPLIER',
    description:
      'Anylayer turns on/off‑chain behavior, swaps, lending repayments, asset holdings/transfers, LP activity, and social signals into concise sub‑scores.',
    cta: 'View Trust Model',
    visualSrc: '/reputation-layer.svg',
    link: '/docs',
  },
  {
    id: '03',
    title: 'Proof: Share Claims, Not Data',
    subtitle: 'THE SHIELD',
    description:
      'Selective, zero‑knowledge proofs let users confirm exactly what a policy needs—ranges, set‑membership, or boolean checks—fresh and revocable.',
    cta: 'Explore Proof Tech',
    visualSrc: '/proof-layer.svg',
    link: '/docs',
  },
  {
    id: '04',
    title: 'Utility: Build With Trust',
    subtitle: 'THE UNLOCK',
    description:
      'Build trust‑based applications using Identity, Reputation, and Proof via SDK, API, or contracts—payments, lending, loyalty, marketplaces, agents.',
    cta: 'Discover App Utility',
    visualSrc: '/utility-layer.svg',
    link: '/docs',
  },
] as const;

type Layer = (typeof layers)[number];

function splitTitle(layer: Layer) {
  const [a, b] = layer.title.split(': ');
  return { head: a, tail: b ?? '' };
}

/** Matches `SectionTag` dark theme in Landing.tsx */
function SectionTagDark({ label, subtitle }: { label: string; subtitle?: string }) {
  return (
    <div className="inline-flex items-center gap-3 px-3 py-1 rounded-full backdrop-blur-sm border bg-white/[0.02] border-white/5 text-white/40">
      <div className="w-1 h-1 rounded-full bg-lightblueprimary" />
      <span className="text-[9px] font-mono uppercase tracking-[0.3em] font-normal">
        {label}
        {subtitle && ` // ${subtitle}`}
      </span>
    </div>
  );
}

function LayerCta({ layer, subtle }: { layer: Layer; subtle?: boolean }) {
  const ext = layer.link.startsWith('http');
  return (
    <Link
      href={layer.link}
      target={ext ? '_blank' : undefined}
      rel={ext ? 'noopener noreferrer' : undefined}
      className={`inline-flex items-center gap-1.5 text-[10px] uppercase tracking-[0.2em] mt-4 transition-opacity hover:opacity-80 ${
        subtle ? 'text-white/50' : 'text-lightblueprimary'
      }`}
    >
      {layer.cta}
      <ArrowRight size={11} strokeWidth={1.5} />
    </Link>
  );
}

function FourLayersColumns() {
  return (
    <div className="flex flex-col lg:flex-row lg:items-stretch gap-8 lg:gap-6">
      {layers.map((layer, i) => {
        const { head, tail } = splitTitle(layer);
        return (
          <div
            key={layer.id}
            className={`min-w-0 flex-1 ${i > 0 ? 'lg:border-l lg:border-white/10 lg:pl-6' : ''} py-4 space-y-4 group`}
          >
            <div className="flex items-center gap-3">
              <span className="text-lightblueprimary font-mono text-[10px] font-bold">{layer.id}</span>
              <div className="h-px flex-1 bg-white/10 group-hover:bg-lightblueprimary/40 transition-colors" />
            </div>
            <h3 className="text-2xl font-bold uppercase tracking-tighter text-white leading-tight">
              {head}
              {tail && <span className="block text-lightblueprimary mt-1">{tail}</span>}
            </h3>
            <p className="text-white/60 text-sm leading-relaxed font-normal">{layer.description}</p>
            <LayerCta layer={layer} />
          </div>
        );
      })}
    </div>
  );
}

export default function IndustrialArchitecture() {
  return (
    <section id="architecture" className="relative bg-black overflow-hidden py-24 md:py-32 border-t border-white/5">
      <div className="absolute inset-0 pointer-events-none bg-[radial-gradient(circle_at_50%_0%,rgba(166,131,255,0.04),transparent_55%)]" />

      <div className="max-w-7xl mx-auto px-6 w-full relative z-10">
        <header className="mb-12 md:mb-20 pb-6 border-b border-white/10 text-left space-y-4">
          <SectionTagDark label="Protocol" />
          <h2 className="text-4xl md:text-6xl font-bold tracking-tighter uppercase text-white leading-[0.9]">
            Four <span className="text-lightblueprimary">layers</span>
          </h2>
          <p className="text-white/60 text-sm leading-relaxed font-normal max-w-2xl">
            The four pillars of the Anylayer ecosystem—identity you own, reputation you carry, proofs you
            share, and utility you unlock for apps and agents.
          </p>
        </header>

        <FourLayersColumns />
      </div>
    </section>
  );
}
