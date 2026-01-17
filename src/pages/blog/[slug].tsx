import React from 'react';
import Head from 'next/head';
import Link from 'next/link';
import { useRouter } from 'next/router';
import { Header } from '@/components/layout/Header';
import { Footer } from '@/components/layout/Footer';
import { Calendar, Clock, ArrowLeft, ArrowRight, Share2 } from 'lucide-react';
import { motion } from 'framer-motion';

// Placeholder blog data (in real app, this would come from CMS/API)
const BLOG_POSTS = {
  'introducing-anylayer-identity': {
    title: 'Introducing .any — A New Identity Primitive',
    excerpt: 'Today we\'re launching .any, a universal identity namespace that separates who you are from what you share.',
    category: 'Product',
    author: 'AnyLayer Team',
    date: 'Jan 17, 2026',
    readTime: '5 min read',
    image: '/blog/identity-launch.jpg',
    content: `
# The Problem with Identity Today

Today's internet treats identity as a collection of fragmented accounts, wallet addresses, and platform-specific profiles. Your Twitter handle doesn't carry over to Discord. Your wallet address is a meaningless string of characters. Your reputation resets every time you change platforms.

This isn't just inconvenient—it's fundamentally broken.

## What is .any?

**.any** is a universal identity namespace built on AnyLayer. It's not a username. It's not a wallet. It's not a profile owned by a platform.

.any is a **persistent onchain identity** that represents you—independently of devices, wallets, or applications. It stays with you as everything else changes.

### Key Features

1. **Human-Readable**: Instead of \`0x742d35Cc6634C0532925a3b844Bc9e7595f0bEb\`, you're \`alice.any\`.
2. **Privacy-First**: Built on zero-knowledge proofs. You prove what matters without revealing raw data.
3. **Portable**: Your identity works across chains, apps, and protocols.
4. **Reputation-Enabled**: Carry your trust score with you, selectively disclosed.

## How It Works

.any leverages three core layers:

- **Identity Layer**: Bind wallets, rotate keys, stay unlinkable
- **Reputation Layer**: Composable sub-scores from on/off-chain behavior
- **Proof Layer**: Zero-knowledge proofs for selective disclosure

Together, these enable a new class of trust-based applications—lending without exposing your portfolio, marketplace access based on reputation, human verification without surveillance.

## What's Next

We're opening early registration for .any names in Q1 2026. Premium names will be allocated via auction. Reserved names for verified brands and public figures will require attestation.

Read the full [.any Naming Policy](/policy#any-naming) for allocation rules, pricing, and dispute resolution.

## Get Involved

- **Developers**: Integrate .any into your dApp with our [SDK](https://docs.anylayer.org)
- **Early Adopters**: [Reserve your name](#) (coming soon)
- **Community**: Join the discussion on [Discord](#)

This is just the beginning. Identity is the foundation—everything else builds from here.

*— The AnyLayer Team*
    `,
    related: [
      { slug: 'zk-proofs-explained', title: 'Zero-Knowledge Proofs: Trust Without Exposure' },
      { slug: 'naming-policy-announcement', title: 'Announcing the .any Naming Policy' }
    ]
  },
  'zk-proofs-explained': {
    title: 'Zero-Knowledge Proofs: Trust Without Exposure',
    excerpt: 'How ZK proofs enable you to prove anything about your identity or reputation without revealing the underlying data.',
    category: 'Technical',
    author: 'Research Team',
    date: 'Jan 15, 2026',
    readTime: '8 min read',
    image: '/blog/zk-proofs.jpg',
    content: `
# Understanding Zero-Knowledge Proofs

Zero-knowledge proofs (ZKPs) are cryptographic protocols that allow one party (the prover) to prove to another party (the verifier) that a statement is true, without revealing any information beyond the validity of the statement itself.

## Why This Matters

In traditional systems, proving you meet a requirement means exposing raw data:
- Proving you're over 18 requires showing your birth date
- Proving creditworthiness requires sharing your financial history
- Proving asset ownership requires exposing your portfolio

With zero-knowledge proofs, you can prove:
- "I am over 18" without revealing your age
- "My credit score ≥ 720" without showing your history
- "I can lock $5,000" without exposing holdings

## How AnyLayer Uses ZK Proofs

AnyLayer leverages ZK proofs across three key areas:

### 1. Identity Verification
Prove you control a wallet or identity without linking it to your .any name in public.

### 2. Reputation Claims
Prove your trust score meets a threshold without revealing the exact score or underlying transactions.

### 3. Policy Compliance
Prove you meet an app's requirements (e.g., "human," "repayment streak ≥ 6 months") without exposing personal data.

## Technical Foundation

Our proof system is built on:
- **Groth16** for efficient on-chain verification
- **Merkle inclusion proofs** for state commitments
- **Nullifiers** for replay protection

All circuits are audited and parameters are generated via multi-party computation ceremonies.

## Privacy Without Compromise

Zero-knowledge proofs enable a new trust model:
- Apps get the signals they need to price, gate, and manage risk
- Users retain control over what they share
- No raw data is exposed or stored on-chain

This is the foundation of privacy-preserving trust infrastructure.

*Read more in our [technical documentation](https://docs.anylayer.org/privacy-and-zero-knowledge).*
    `,
    related: [
      { slug: 'introducing-anylayer-identity', title: 'Introducing .any — A New Identity Primitive' },
      { slug: 'privacy-by-design', title: 'Privacy by Design: Why Data Minimization Matters' }
    ]
  },
  'ai-agents-reputation': {
    title: 'Building Reputation Systems for AI Agents',
    excerpt: 'As autonomous agents become more prevalent, how do we ensure they can be trusted?',
    category: 'Research',
    author: 'Dr. Sarah Chen',
    date: 'Jan 12, 2026',
    readTime: '6 min read',
    image: '/blog/ai-agents.jpg',
    content: `
# The Trust Problem with AI Agents

AI agents are increasingly autonomous—executing trades, managing portfolios, coordinating logistics. But there's a fundamental problem: **they can act, but they can't credibly signal how trustworthy they are.**

## Current State

Today, agent trust is binary:
- You trust the agent completely (risky)
- You don't use the agent at all (limiting)

There's no middle ground. No nuance. No way for agents to build and carry reputation across contexts.

## What Agents Need

For AI agents to operate in open, multi-stakeholder environments, they need:

1. **Verifiable History**: Provable track record of outcomes
2. **Portable Reputation**: Scores that move between platforms
3. **Selective Disclosure**: Prove reliability without exposing strategies
4. **Context-Aware Metrics**: Different apps need different signals

## AnyLayer's Agent Reputation Model

We're building a reputation system for AI agents based on **task outcomes**:

- Execution success rate
- Slippage control for trades
- Incident rate
- User satisfaction
- Audit feedback

These signals are aggregated into **sub-scores** (reliability, compliance, integrity) and published as **commitments**—not raw logs.

### What Apps See

An integrator might request:
- "90-day success rate ≥ 98%"
- "No incidents in last 30 days"
- "User satisfaction ≥ 4.5/5"

The agent generates a **zero-knowledge proof** of these claims. The app gets confidence without seeing strategies, logs, or proprietary data.

## Portability

Agent reputation is anchored to a **.any identity**. When an agent moves between marketplaces, DEXs, or execution layers, its reputation follows.

This enables:
- **Better pricing** for high-reputation agents
- **Access gates** for sensitive tasks
- **Risk management** without banning entire classes of agents

## Challenges Ahead

Building agent reputation systems requires solving:
- **Gaming resistance**: Preventing coordinated manipulation
- **Recalibration**: Handling model upgrades and resets
- **Attribution**: Separating agent performance from external conditions

We're tackling these through **attestation quorums**, **decay windows**, and **anomaly detection**.

## What's Next

Agent reputation will be a core feature of AnyLayer's trust infrastructure. We're working with agent frameworks and execution layers to integrate reputation checks at the protocol level.

If you're building agents or agent marketplaces, [let's talk](mailto:agents@anylayer.org).
    `,
    related: [
      { slug: 'introducing-anylayer-identity', title: 'Introducing .any — A New Identity Primitive' },
      { slug: 'zk-proofs-explained', title: 'Zero-Knowledge Proofs: Trust Without Exposure' }
    ]
  },
  'privacy-by-design': {
    title: 'Privacy by Design: Why Data Minimization Matters',
    excerpt: 'Our approach to building trust infrastructure that collects nothing, proves everything.',
    category: 'Philosophy',
    author: 'Policy Team',
    date: 'Jan 10, 2026',
    readTime: '4 min read',
    image: '/blog/privacy.jpg',
    content: `
# The Privacy Paradox

Most trust systems operate on a simple principle: **collect everything, share selectively**.

This is the model of credit bureaus, KYC providers, and data brokers. They aggregate vast datasets about you—every transaction, every interaction, every data point—and then sell access to that information.

The problem? Once data is collected, you've lost control.

## Our Approach: Data Minimization

AnyLayer inverts this model. We start from a principle: **collect nothing, prove everything**.

Instead of aggregating raw data, we compute **commitments** and enable **zero-knowledge proofs**. Apps get the signals they need—credit worthiness, reputation, compliance—without seeing your history.

### What This Means in Practice

**Traditional Model:**
1. Collect wallet history, transaction data, balances
2. Store in database
3. Compute score
4. Share score and data with integrators

**AnyLayer Model:**
1. Reference public chain data via commitments (not stored)
2. Compute scores from signals, anchor commitments on-chain
3. Generate proofs on-demand for specific claims
4. Integrators verify proofs, see no raw data

## Privacy by Default

Every component of AnyLayer is designed to minimize exposure:

- **Identity**: Wallets linked via ZK, unlinkable by default
- **Reputation**: Stored as commitments, disclosed selectively
- **Proofs**: Range and set-membership, not exact values

This isn't an afterthought—it's the foundation.

## Why It Matters

Privacy isn't just a nice-to-have. It's a prerequisite for:

- **Dignity**: You shouldn't have to expose your life to access services
- **Security**: Data you don't share can't be breached
- **Agency**: You choose what to reveal, where, and when

Trust infrastructure should enhance your control, not erode it.

## The Path Forward

Privacy-preserving systems aren't theoretical—they're here. Zero-knowledge proofs work. Commitments scale. Selective disclosure is practical.

The challenge is adoption. That's why we're building:
- Easy-to-integrate SDKs
- Clear policies
- Open-source tooling

Trust doesn't require surveillance. Privacy and utility can coexist.

*Read our full [Privacy & Consent Policy](/policy#privacy-policy).*
    `,
    related: [
      { slug: 'zk-proofs-explained', title: 'Zero-Knowledge Proofs: Trust Without Exposure' },
      { slug: 'introducing-anylayer-identity', title: 'Introducing .any — A New Identity Primitive' }
    ]
  },
  'developer-integration-guide': {
    title: 'Integrating .any Into Your dApp',
    excerpt: 'A step-by-step guide for developers looking to add human-readable identities.',
    category: 'Developer',
    author: 'Dev Relations',
    date: 'Jan 8, 2026',
    readTime: '10 min read',
    image: '/blog/developer-guide.jpg',
    content: `
# Getting Started with .any Integration

This guide walks you through integrating .any identity resolution and reputation proofs into your dApp.

## Prerequisites

- Node.js 18+
- An Ethereum or EVM-compatible wallet
- Basic understanding of smart contracts

## Installation

\`\`\`bash
npm install @anylayer/sdk
# or
yarn add @anylayer/sdk
\`\`\`

## Basic Identity Resolution

Resolve a .any name to wallet addresses:

\`\`\`typescript
import { AnyLayer } from '@anylayer/sdk';

const client = new AnyLayer({
  network: 'mainnet',
  apiKey: process.env.ANYLAYER_API_KEY
});

// Resolve name to addresses
const addresses = await client.resolveIdentity('alice.any');
console.log(addresses);
// => { primary: '0x742d...', linked: ['0xabc...', '0xdef...'] }
\`\`\`

## Verify Reputation

Request and verify a reputation proof:

\`\`\`typescript
// Request proof from user
const proof = await client.requestProof({
  identity: 'alice.any',
  claims: [
    { type: 'credit_score', operator: '>=', value: 720 },
    { type: 'repayment_streak', operator: '>=', value: 6 }
  ],
  context: 'lending-dapp-v1'
});

// Verify proof
const isValid = await client.verifyProof(proof);
if (isValid) {
  // Grant access, adjust pricing, etc.
}
\`\`\`

## Display Names in UI

Show .any names instead of addresses:

\`\`\`typescript
// Reverse lookup
const identity = await client.reverseResolve('0x742d35Cc...');
console.log(identity.name); // => 'alice.any'
\`\`\`

## Real-World Use Cases

### Lending Protocol
\`\`\`typescript
const canBorrow = await verifyLendingEligibility('alice.any', {
  minCreditScore: 700,
  minRepaymentStreak: 3,
  maxOpenLoans: 2
});
\`\`\`

### Marketplace Access
\`\`\`typescript
const tier = await getUserTier('alice.any');
// Apply tier-based pricing or perks
\`\`\`

### Human Verification
\`\`\`typescript
const isHuman = await client.verifyHumanity('alice.any', {
  method: 'worldcoin',
  minConfidence: 0.95
});
\`\`\`

## Best Practices

1. **Always verify proofs on-chain or via API** before granting access
2. **Cache identity lookups** (but respect TTLs)
3. **Handle revocations** by subscribing to webhook events
4. **Request minimal claims** needed for your use case

## Next Steps

- Read the [full SDK documentation](https://docs.anylayer.org)
- Explore [example integrations](https://github.com/anylayer/examples)
- Join the [developer Discord](https://discord.gg/anylayer)

Questions? Reach out to devrel@anylayer.org
    `,
    related: [
      { slug: 'introducing-anylayer-identity', title: 'Introducing .any — A New Identity Primitive' },
      { slug: 'zk-proofs-explained', title: 'Zero-Knowledge Proofs: Trust Without Exposure' }
    ]
  },
  'naming-policy-announcement': {
    title: 'Announcing the .any Naming Policy',
    excerpt: 'A comprehensive framework for fair, transparent, and secure allocation of .any identities.',
    category: 'Policy',
    author: 'Governance Team',
    date: 'Jan 5, 2026',
    readTime: '7 min read',
    image: '/blog/naming-policy.jpg',
    content: `
# The .any Naming Policy

Today we're publishing the official [.any Naming Policy](/policy#any-naming)—a comprehensive framework governing the creation, allocation, and use of .any identities.

## Why This Matters

.any is not just a namespace. It's a universal identity primitive. How names are allocated, protected, and disputed determines whether .any becomes a fair, open system—or another captured namespace.

## Core Principles

The policy is built on four pillars:

### 1. Fair Allocation
- **Standard names** (5+ characters): First-come, first-served (FCFS)
- **Premium names** (3-4 characters, high-demand): Time-bound auctions
- **Reserved names** (brands, public figures): Verified claims process

### 2. Anti-Squatting
- Rate limits per wallet
- Deception and impersonation are prohibited
- Abuse results in suspension or revocation

### 3. Dispute Resolution
Clear process for trademark holders and legitimate claimants to contest misuse.

### 4. Privacy by Default
No personally identifiable information is required for registration. Verification, where needed, uses attestations—not raw documents.

## Key Rules

**Character Set**: a-z, 0-9, hyphen (not at start/end)

**Length**: 3-32 characters

**Pricing**: Flat or tiered by length; premium names via catalog

**Term**: Fixed periods (e.g., 1 year), renewable

**Grace Period**: 30 days to renew after expiration

**Transfers**: Permitted unless under dispute or hold

## What's Reserved

Names reserved for protocol operation, public interest, or verified brand holders are not available for general registration. Rights holders may claim matching names by submitting evidence.

## Dispute Process

If you believe a name was registered in bad faith or infringes your rights:
1. File a dispute with evidence
2. Registrant receives notice and opportunity to respond
3. Adjudication based on policy and evidence
4. Outcome: transfer, cancellation, or dismissal

Appeals are permitted within a limited window.

## Compliance & Legal

The policy addresses:
- Sanctions and geo-restrictions (via privacy-preserving checks)
- Lawful requests for holds or revocation
- GDPR-style data minimization

## Next Steps

The .any Naming Policy is now active. We'll open early registration in Q1 2026.

- **Read the full policy**: [/policy#any-naming](/policy#any-naming)
- **Reserve a name**: Coming soon
- **File a dispute**: disputes@anylayer.org

This is the foundation for a fair, open, and privacy-respecting identity namespace.

*— AnyLayer Governance*
    `,
    related: [
      { slug: 'introducing-anylayer-identity', title: 'Introducing .any — A New Identity Primitive' },
      { slug: 'privacy-by-design', title: 'Privacy by Design: Why Data Minimization Matters' }
    ]
  }
};

const BlogPost = () => {
  const router = useRouter();
  const { slug } = router.query;

  const post = slug && typeof slug === 'string' ? BLOG_POSTS[slug as keyof typeof BLOG_POSTS] : null;

  if (!post) {
    return (
      <div className="bg-[#08080C] min-h-screen font-geist text-white flex items-center justify-center">
        <div className="text-center space-y-4">
          <h1 className="text-4xl font-black">Article Not Found</h1>
          <Link href="/blog" className="text-lightblueprimary hover:underline">
            ← Back to Blog
          </Link>
        </div>
      </div>
    );
  }

  return (
    <>
      <Head>
        <title>{post.title} | Anylayer Blog</title>
        <meta name="description" content={post.excerpt} />
      </Head>

      <div className="bg-[#08080C] min-h-screen font-geist text-white">
        <Header />

        <main className="pt-32 pb-24">
          {/* Breadcrumb */}
          <div className="px-6 md:px-12 mb-12">
            <div className="max-w-4xl mx-auto">
              <Link href="/blog" className="group flex items-center gap-2 text-white/30 hover:text-white transition-colors text-xs font-mono uppercase tracking-wider">
                <ArrowLeft size={16} className="group-hover:-translate-x-1 transition-transform" />
                Back to All Articles
              </Link>
            </div>
          </div>

          {/* Article Header */}
          <article className="px-6 md:px-12">
            <div className="max-w-4xl mx-auto space-y-10">
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6 }}
                className="space-y-6"
              >
                {/* Category */}
                <div className="flex items-center gap-3 text-sm">
                  <span className="px-3 py-1 bg-white/[0.08] text-white border border-white/10 rounded-full font-black uppercase tracking-[0.15em] text-[10px]">
                    {post.category}
                  </span>
                </div>

                {/* Title */}
                <h1 className="text-4xl md:text-5xl font-black tracking-tighter leading-tight">
                  {post.title}
                </h1>

                {/* Excerpt */}
                <p className="text-xl text-white/50 leading-relaxed font-light">
                  {post.excerpt}
                </p>

                {/* Meta info */}
                <div className="flex flex-wrap items-center gap-4 text-xs text-white/30 pt-6 border-t border-white/10 font-mono">
                  <div className="flex items-center gap-2">
                    <span className="font-bold text-white/60">{post.author}</span>
                  </div>
                  <span className="w-1 h-1 rounded-full bg-white/20" />
                  <div className="flex items-center gap-2">
                    <Calendar size={14} />
                    <span>{post.date}</span>
                  </div>
                  <span className="w-1 h-1 rounded-full bg-white/20" />
                  <div className="flex items-center gap-2">
                    <Clock size={14} />
                    <span>{post.readTime}</span>
                  </div>
                  <button className="flex items-center gap-2 ml-auto hover:text-white transition-colors group">
                    <Share2 size={14} className="group-hover:scale-110 transition-transform" />
                    <span className="uppercase tracking-wider">Share</span>
                  </button>
                </div>
              </motion.div>

              {/* Featured Image Placeholder */}
              <div className="aspect-video bg-black border border-white/10 rounded-2xl overflow-hidden relative">
                <div className="absolute inset-0 bg-gradient-to-br from-lightblueprimary/10 via-transparent to-transparent" />
                <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_50%,rgba(166,131,255,0.08),transparent_70%)]" />
              </div>

              {/* Article Content */}
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ duration: 0.8, delay: 0.2 }}
                className="prose prose-invert max-w-none"
              >
                <div
                  className="space-y-6 text-white/60 leading-relaxed text-base"
                  dangerouslySetInnerHTML={{
                    __html: post.content
                      .split('\n\n')
                      .map(paragraph => {
                        if (paragraph.startsWith('# ')) {
                          return `<h2 class="text-3xl font-black text-white mt-12 mb-6 tracking-tight leading-tight">${paragraph.slice(2)}</h2>`;
                        } else if (paragraph.startsWith('## ')) {
                          return `<h3 class="text-2xl font-black text-white mt-10 mb-5 tracking-tight">${paragraph.slice(3)}</h3>`;
                        } else if (paragraph.startsWith('### ')) {
                          return `<h4 class="text-xl font-black text-white/90 mt-8 mb-4 tracking-tight">${paragraph.slice(4)}</h4>`;
                        } else if (paragraph.startsWith('- ')) {
                          const items = paragraph.split('\n').filter(line => line.startsWith('- '));
                          const listItems = items.map(item => `<li class="mb-2 text-white/50 font-light">${item.slice(2)}</li>`).join('');
                          return `<ul class="space-y-2 my-6 pl-6 list-disc marker:text-white/30">${listItems}</ul>`;
                        } else if (paragraph.includes('```')) {
                          const code = paragraph.replace(/```\w*\n?/g, '').trim();
                          return `<pre class="bg-black border border-white/10 rounded-xl p-6 overflow-x-auto my-8"><code class="text-sm text-white/70 font-mono leading-relaxed">${code}</code></pre>`;
                        } else if (paragraph.startsWith('*') && paragraph.endsWith('*')) {
                          return `<p class="italic text-white/30 my-6 text-sm font-light border-l-2 border-white/10 pl-5">${paragraph.slice(1, -1)}</p>`;
                        } else {
                          return `<p class="my-6 font-light leading-[1.7]">${paragraph}</p>`;
                        }
                      })
                      .join('')
                  }}
                />
              </motion.div>
            </div>
          </article>

          {/* Related Articles */}
          {post.related && post.related.length > 0 && (
            <section className="px-6 md:px-12 mt-20 mb-16">
              <div className="max-w-4xl mx-auto">
                <div className="space-y-8">
                  <h3 className="text-sm font-black uppercase tracking-wider text-white/30">
                    Continue Reading
                  </h3>
                  
                  <div className="grid md:grid-cols-2 gap-5">
                    {post.related.map((related, index) => (
                      <Link key={index} href={`/blog/${related.slug}`}>
                        <motion.div
                          initial={{ opacity: 0, y: 20 }}
                          animate={{ opacity: 1, y: 0 }}
                          transition={{ duration: 0.4, delay: index * 0.1 }}
                          className="group bg-black border border-white/10 rounded-xl p-6 hover:border-white/20 hover:bg-white/[0.02] transition-all cursor-pointer h-full flex flex-col justify-between"
                        >
                          <h4 className="text-lg font-black tracking-tight leading-tight group-hover:text-white/90 transition-colors mb-4">
                            {related.title}
                          </h4>
                          
                          <div className="flex items-center gap-2 text-xs text-white/40 font-mono uppercase tracking-wider group-hover:text-white group-hover:gap-3 transition-all">
                            Read Article
                            <ArrowRight size={14} className="group-hover:translate-x-1 transition-transform" />
                          </div>
                        </motion.div>
                      </Link>
                    ))}
                  </div>
                </div>
              </div>
            </section>
          )}
        </main>

        <Footer />
      </div>
    </>
  );
};

export default BlogPost;
