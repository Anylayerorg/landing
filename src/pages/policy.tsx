import React, { useState } from 'react';
import Head from 'next/head';
import { motion, AnimatePresence } from 'framer-motion';
import { Header } from '@/components/layout/Header';
import { Footer } from '@/components/layout/Footer';
import {
  FileText,
  Search,
  ExternalLink,
  Clock
} from 'lucide-react';

const POLICIES = [
  {
    id: 'any-naming',
    title: '.any Naming Policy',
    category: 'Identity',
    lastUpdated: 'Jan 17, 2026',
    content: (
      <div className="space-y-16">
        {/* Status Header */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 py-6 border-y border-white/5 text-[10px] font-mono uppercase tracking-widest text-white/40">
          <div><span className="text-white/20 block mb-1">Status</span> <span className="text-lightblueprimary">Active</span></div>
          <div><span className="text-white/20 block mb-1">Effective</span> Jan 17, 2026</div>
          <div><span className="text-white/20 block mb-1">Owner</span> Anylayer Governance</div>
          <div><span className="text-white/20 block mb-1">Version</span> v1.0</div>
        </div>

        <section className="space-y-6">
          <h3 className="text-xl font-black text-white uppercase tracking-tight">1. Purpose and Scope</h3>
          <div className="space-y-4 text-white/60 leading-relaxed font-light">
            <p>1.1 This Naming Policy governs the creation, allocation, renewal, transfer, and use of names within the <strong>.any</strong> namespace (the “Namespace”), operated by Anylayer.</p>
            <p>1.2 The Policy applies to all applicants and registrants (collectively, “Registrants”), to accredited registrars acting on behalf of Anylayer (the “Registrar”), and to any person or entity asserting a claim or dispute concerning a .any name (a “Claimant”).</p>
            <p>1.3 By applying for, registering, renewing, transferring, or using a .any name, a Registrant accepts and agrees to be bound by this Policy and all related policies referenced herein.</p>
          </div>
        </section>

        <section className="space-y-6">
          <h3 className="text-xl font-black text-white uppercase tracking-tight">2. Definitions</h3>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-x-12 gap-y-6 text-sm">
            {[
              { term: "Name / Handle", def: "A unique identifier under the .any Namespace (e.g., alex.any)." },
              { term: "Registrant / Owner", def: "The wallet or entity in whose name a .any registration is recorded." },
              { term: "Registrar", def: "Anylayer’s registration service and affiliated smart contracts authorized to process .any registrations." },
              { term: "Reserved Name", def: "A term withheld from general availability for reasons including protocol operation or trademark protection." },
              { term: "Premium Name", def: "A name categorized as higher-value due to length or market demand, priced above standard tiers." },
              { term: "Grace Period", def: "The period following expiration during which a Registrant may renew without loss of the Name." },
              { term: "Redemption Period", def: "The period following Grace during which a lapsed Name may still be restored upon payment of a fee." },
              { term: "Normalization", def: "Canonical formatting rules applied to Names to prevent visually confusable duplicates." }
            ].map((d, i) => (
              <div key={i} className="space-y-1">
                <span className="text-white font-bold block uppercase text-[10px] tracking-wider">{d.term}</span>
                <p className="text-white/40 leading-relaxed font-light">{d.def}</p>
              </div>
            ))}
          </div>
        </section>

        <section className="space-y-6">
          <h3 className="text-xl font-black text-white uppercase tracking-tight">3. Ownership & Title</h3>
          <div className="space-y-4 text-white/60 leading-relaxed font-light">
            <p>3.1 <strong>Namespace Ownership.</strong> Anylayer (and its licensors, where applicable) owns and controls the .any Namespace, the associated registries, smart contracts, code, and marks. No title or intellectual property right in the Namespace is transferred to any Registrant by virtue of registration or use.</p>
            <p>3.2 <strong>License to Use.</strong> A registration confers a limited, revocable, time‑bounded license to use and resolve the registered Name in accordance with this Policy and applicable law. It does not confer a property right or any proprietary interest in the string of characters comprising the Name.</p>
            <p>3.3 <strong>No IP in the String.</strong> Registrants acquire no copyright, trademark, or other IP rights in a Name solely by registering it. Rights, if any, must arise from separate lawful use or recognized legal protection.</p>
            <p>3.4 <strong>Authoritative Record.</strong> The on‑chain registry and associated smart contracts are the authoritative record of allocation, renewal, and transfer. Off‑chain displays and indexes are provided for convenience only.</p>
            <p>3.5 <strong>Custody & Keys.</strong> Control of a Name follows control of the private keys for the wallet recorded as Registrant. Anylayer is not responsible for lost, stolen, or compromised keys or wallets.</p>
            <p>3.6 <strong>Upgrades & Migrations.</strong> The Registrar may modify, upgrade, or migrate registry contracts to maintain security and performance. Where feasible, advance notice will be provided under Section 17.</p>
            <p>3.7 <strong>Normalization Effects.</strong> Where normalization or technical rules affect the display or resolution of a Name, the normalized form and registry state control.</p>
          </div>
        </section>

        <section className="space-y-6">
          <h3 className="text-xl font-black text-white uppercase tracking-tight">4. Terms of Use</h3>
          <div className="space-y-4 text-white/60 leading-relaxed font-light text-sm">
            <p>4.1 <strong>Acceptable Use.</strong> Registrants must use Names lawfully and in good faith. Prohibited uses include deception, phishing, malware distribution, and violations outlined in Sections 5 and 13.</p>
            <p>4.2 <strong>Representations.</strong> By registering or using a Name, a Registrant represents and warrants that (a) they have legal capacity and authority; (b) information provided to the Registrar is accurate and complete; and (c) use of the Name will not infringe third‑party rights or applicable law.</p>
            <p>4.3 <strong>Suspension/Termination.</strong> The Registrar may suspend, revoke, or place a Name on hold for violations of this Policy, credible abuse, legal orders, or security risks.</p>
            <p>4.4 <strong>No Warranties.</strong> The Namespace and registration services are provided “as is” and “as available.” To the maximum extent permitted by law, Anylayer disclaims warranties of merchantability, fitness for a particular purpose, and non‑infringement.</p>
            <p>4.5 <strong>Limitation of Liability.</strong> To the maximum extent permitted by law, Anylayer shall not be liable for indirect, incidental, special, punitive, or consequential damages. Direct damages, if any, are limited to the fees paid by the Registrant for the Name during the twelve (12) months preceding the event.</p>
            <p>4.6 <strong>Indemnification.</strong> Registrants agree to indemnify and hold harmless Anylayer and its affiliates from claims arising from the Registrant’s use of a Name in violation of this Policy.</p>
            <p>4.7 <strong>Governing Law & Forum.</strong> Governing law and forum for disputes under this Policy shall be as specified by Anylayer governance from time to time.</p>
          </div>
        </section>

        <section className="space-y-6">
          <h3 className="text-xl font-black text-white uppercase tracking-tight">5. Eligibility</h3>
          <div className="space-y-4 text-white/60 leading-relaxed font-light">
            <p>5.1 .any Names are open to natural persons and legal entities that (a) accept this Policy and (b) are not prohibited by applicable law from owning or using such Names.</p>
            <p>5.2 Names that correspond to trademarks, public institutions, or otherwise sensitive terms may require additional verification prior to allocation or transfer.</p>
            <p>5.3 The Registrar may refuse, suspend, or revoke a registration if the Registrant provides false information, fails verification where required, or violates this Policy.</p>
          </div>
        </section>

        <section className="space-y-6">
          <h3 className="text-xl font-black text-white uppercase tracking-tight">6. Formatting and Technical Rules</h3>
          <div className="space-y-4 text-white/60 leading-relaxed font-light text-sm">
            <p>6.1 <strong>Character Set and Length.</strong> Names must use the characters a–z (case-insensitive), digits 0–9, and hyphen -. Names must be 3–32 characters in length, exclusive of the .any suffix.</p>
            <p>6.2 <strong>Case and Storage.</strong> Names are case-insensitive and shall be stored and displayed in lowercase by default.</p>
            <p>6.3 <strong>Hyphen Use.</strong> Hyphens may not appear at the start or end of a Name and may not appear consecutively.</p>
            <p>6.4 <strong>Emoji/Unicode.</strong> Emoji and extended Unicode are not supported in Version 1.0.</p>
            <p>6.5 <strong>Normalization.</strong> Names are normalized and case-folded. Where normalization results in a collision, the earliest valid registration prevail and conflicting transactions are rejected with a refund of the base fee.</p>
            <p>6.6 <strong>Resolution and Syntax.</strong> Names must conform to technical syntax published by the Registrar.</p>
          </div>
        </section>

        <section className="space-y-6">
          <h3 className="text-xl font-black text-white uppercase tracking-tight">7. Prohibited and Sensitive Strings</h3>
          <div className="space-y-4 text-white/60 leading-relaxed font-light">
            <p>7.1 The following are prohibited: (a) Names intended for impersonation or deception; (b) Names reserved for protocol operation (e.g., root, admin, null); (c) Names used for phishing, malware, or illegal content; (d) Names restricted by law or sanctions.</p>
            <p>7.2 Edge cases, including visually confusable strings and transliterations, may be reviewed under the Dispute Resolution procedure.</p>
            <p>7.3 The Registrar may impose temporary holds on Names under investigation for abuse or legal claims.</p>
          </div>
        </section>

        <section className="space-y-6">
          <h3 className="text-xl font-black text-white uppercase tracking-tight">8. Allocation (Registration) Model</h3>
          <div className="space-y-4 text-white/60 leading-relaxed font-light">
            <p>8.1 <strong>Standard Availability.</strong> Standard Names are allocated on a first-come, first-served (FCFS) basis upon payment of the applicable fee and compliance with this Policy.</p>
            <p>8.2 <strong>Premium and High-Demand Names.</strong> The Registrar may use time-bound auctions or other competitive allocation methods for Premium Names or high-demand releases.</p>
            <p>8.3 <strong>Reserved and Allowlists.</strong> Reserved Names may be allocated via allowlists or verification-based processes (e.g., brand claims).</p>
            <p>8.4 <strong>Rate Limits.</strong> The Registrar may apply per-wallet or per-entity throttles to deter hoarding and automated abuse.</p>
            <p>8.5 <strong>Allocation Finality.</strong> Allocation is final once the transaction is confirmed and any required verification has been satisfied.</p>
          </div>
        </section>

        <section className="space-y-6">
          <h3 className="text-xl font-black text-white uppercase tracking-tight">9. Fees and Pricing</h3>
          <div className="space-y-4 text-white/60 leading-relaxed font-light">
            <p>9.1 <strong>Standard Fees.</strong> Standard Names are priced on a flat or tiered basis (e.g., by length).</p>
            <p>9.2 <strong>Premium Fees.</strong> Premium Names are priced using market-based tiers or catalogs published by the Registrar.</p>
            <p>9.3 <strong>Reserved Fees.</strong> Reserved Names may be free or subject to special pricing for verified rights holders.</p>
            <p>9.4 <strong>Transparency.</strong> All fees are disclosed at point of sale. Material changes follow the Change Management procedure.</p>
            <p>9.5 <strong>Taxes and Gas.</strong> Registrants are responsible for applicable taxes and network fees (gas) incurred.</p>
          </div>
        </section>

        <section className="space-y-6">
          <h3 className="text-xl font-black text-white uppercase tracking-tight">10. Term, Expiration, and Renewal</h3>
          <div className="space-y-4 text-white/60 leading-relaxed font-light">
            <p>10.1 <strong>Term.</strong> Names are leased for fixed terms (e.g., one-year periods) recorded on-chain.</p>
            <p>10.2 <strong>Expiration and Grace.</strong> Names entering the Grace Period (default 30 days) may be renewed by the previous Registrant without losing the Name.</p>
            <p>10.3 <strong>Redemption.</strong> Following Grace, a Redemption Period (default 30–60 days) applies. Renewal during Redemption may require an additional fee.</p>
            <p>10.4 <strong>Release.</strong> If not renewed during Redemption, the Name is released to general availability.</p>
            <p>10.5 <strong>Notices.</strong> Renewal notices are provided as a courtesy; Registrants bear ultimate responsibility to renew.</p>
          </div>
        </section>

        <section className="space-y-6">
          <h3 className="text-xl font-black text-white uppercase tracking-tight">11. Transfers and Secondary Markets</h3>
          <div className="space-y-4 text-white/60 leading-relaxed font-light">
            <p>11.1 <strong>Direct Transfer.</strong> Registrants may transfer Names on-chain between wallets, provided all fees are current and no holds apply.</p>
            <p>11.2 <strong>Escrow.</strong> The Registrar may offer native escrow or integrate with third-party escrow.</p>
            <p>11.3 <strong>Restrictions.</strong> Names subject to dispute, sanctions, or administrative hold may not be transferred.</p>
            <p>11.4 <strong>Record Update.</strong> Upon transfer, the new Registrant assumes all obligations under this Policy.</p>
          </div>
        </section>

        <section className="space-y-6">
          <h3 className="text-xl font-black text-white uppercase tracking-tight">12. Reserved and Premium Names</h3>
          <div className="space-y-4 text-white/60 leading-relaxed font-light">
            <p>12.1 <strong>Reserved Catalog.</strong> Anylayer maintains a catalog of Reserved Names (protocol terms, public-interest, protected brands) not available for FCFS registration.</p>
            <p>12.2 <strong>Claims and Verification.</strong> Verified rights holders may request matching Reserved Names by submitting evidence under the Dispute Resolution process.</p>
            <p>12.3 <strong>Premium Catalog.</strong> Premium Names (short, dictionary, high-demand) may be released through auctions or drops.</p>
            <p>12.4 <strong>Misuse.</strong> Violation of this Policy may result in suspension or cancellation after due process.</p>
          </div>
        </section>

        <section className="space-y-6">
          <h3 className="text-xl font-black text-white uppercase tracking-tight">13. Anti‑Squatting and Acceptable Use</h3>
          <div className="space-y-4 text-white/60 leading-relaxed font-light">
            <p>13.1 <strong>Anti‑Hoarding.</strong> The Registrar may impose bulk limits and dynamic throttles to deter automated mass registrations.</p>
            <p>13.2 <strong>No Deception.</strong> Names must not be used to mislead, impersonate, or facilitate fraud (including look‑alikes like g00gle.any).</p>
            <p>13.3 <strong>Abuse Response.</strong> Confirmed abuse may result in suspension, removal from releases, or registration blocks.</p>
            <p>13.4 <strong>Notice and Cure.</strong> Except in urgent cases, the Registrar will provide notice and opportunity to cure before imposing sanctions.</p>
          </div>
        </section>

        <section className="space-y-6">
          <h3 className="text-xl font-black text-white uppercase tracking-tight">14. Dispute Resolution</h3>
          <div className="space-y-4 text-white/60 leading-relaxed font-light text-sm">
            <p>14.1 <strong>Filing a Dispute.</strong> Claimants may file a dispute by submitting the Name, basis for claim, and supporting evidence.</p>
            <p>14.2 <strong>Process.</strong> Follows: Intake → Notice → Response → Adjudication → Outcome.</p>
            <p>14.3 <strong>Standards.</strong> Decisions are based on evidence of rights, misuse, and compliance with this Policy.</p>
            <p>14.4 <strong>Outcomes.</strong> Includes transfer to Claimant, cancellation of Name, or dismissal.</p>
            <p>14.5 <strong>Appeal.</strong> Parties may appeal within a defined window with additional evidence.</p>
            <p>14.6 <strong>Costs.</strong> Filing and response fees may be required to deter abuse.</p>
            <p>14.7 <strong>Publication.</strong> Final decisions may be summarized for transparency.</p>
          </div>
        </section>

        <section className="space-y-6">
          <h3 className="text-xl font-black text-white uppercase tracking-tight">15. Compliance, Holds, and Legal Requests</h3>
          <div className="space-y-4 text-white/60 leading-relaxed font-light">
            <p>15.1 <strong>Administrative Holds.</strong> The Registrar may place a Name on hold in response to legal requests, abuse reports, or technical risks.</p>
            <p>15.2 <strong>Sanctions and Geo‑Restrictions.</strong> Privacy‑preserving screening may be used to block restricted registrations where required by law.</p>
            <p>15.3 <strong>Release of Holds.</strong> Holds are reviewed periodically and lifted when issues are resolved.</p>
          </div>
        </section>

        <section className="space-y-6">
          <h3 className="text-xl font-black text-white uppercase tracking-tight">16. Privacy and Data Minimization</h3>
          <div className="space-y-4 text-white/60 leading-relaxed font-light text-sm">
            <p>16.1 <strong>Wallet‑Based Identity.</strong> No personally identifiable information is collected by default.</p>
            <p>16.2 <strong>Verification Records.</strong> Verification evidence is provided via attestations; raw documents are not published on-chain.</p>
            <p>16.3 <strong>Logging.</strong> Audit logs capture lifecycle events without exposing personal datasets.</p>
            <p>16.4 <strong>Data Requests.</strong> Anylayer responds to lawful data requests consistent with law and this Policy.</p>
          </div>
        </section>

        <section className="space-y-6">
          <h3 className="text-xl font-black text-white uppercase tracking-tight">17. Change Management and Versioning</h3>
          <div className="space-y-4 text-white/60 leading-relaxed font-light">
            <p>17.1 <strong>Amendments.</strong> Material changes are proposed through a public RFC, followed by comment and governance vote.</p>
            <p>17.2 <strong>Notice.</strong> At least 14 days’ notice is provided before amendments take effect, except for urgent security needs.</p>
            <p>17.3 <strong>Version History.</strong> A changelog and prior versions are maintained and linked from the policy page.</p>
          </div>
        </section>

        <section className="pt-12 border-t border-white/5 space-y-8">
          <h3 className="text-sm font-black text-white uppercase tracking-widest">Appendices (Non‑Binding Aids)</h3>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-8 text-[11px] text-white/40 leading-relaxed uppercase tracking-wider font-mono">
            <p>A. Premium/Reserved Catalog — Maintained by Registrar; updated via Change Management.</p>
            <p>B. Normalization & Collision Examples — Illustrative examples for implementers and users.</p>
            <p>C. Fee Schedule — Current standard and premium pricing tiers.</p>
            <p>D. Dispute Form Template — Recommended format and evidence checklist for filings.</p>
          </div>
        </section>

        {/* Why .any Section Highlights */}
        <section className="bg-lightblueprimary/5 border border-lightblueprimary/10 p-12 rounded-[32px] space-y-8">
          <div className="space-y-2">
            <span className="text-lightblueprimary font-mono text-[10px] uppercase tracking-[0.5em] block font-black">
              Why .any?
            </span>
            <h2 className="text-4xl md:text-6xl font-black uppercase tracking-tighter text-white leading-[0.9]">
              One Identity. <br />
              <span className="text-white/20">Any App. Any Chain.</span>
            </h2>
          </div>
          <div className="space-y-6 text-white/60 text-base md:text-lg font-light leading-relaxed">
            <p>
              .any is the universal identity namespace of Anylayer. It is designed for a world where
              identity, trust, and access move freely across ecosystems—without sacrificing privacy.
            </p>
            <p>
              A .any name is more than a username. It is a programmable onchain identity that carries
              reputation, credentials, and proofs across apps, wallets, games, and protocols. Whether
              you are an individual, a creator, or a global brand, .any gives you a single, verifiable
              identity that works everywhere.
            </p>
            <p>
              Unlike traditional naming systems, .any is privacy-first by default and powered by
              zero-knowledge proofs. You can prove what matters—trust, status, eligibility—without
              revealing who you are or exposing sensitive data.
            </p>
            <p className="text-white font-medium">
              Short names are scarce. Prominent names are protected. Identity stays yours.
            </p>
          </div>
          <div className="pt-4">
            <p className="text-4xl md:text-6xl font-black tracking-tighter uppercase leading-[0.9] text-white">
              .any — <span className="text-lightblueprimary">identity, without limits.</span>
            </p>
          </div>
        </section>
      </div>
    )
  },
  {
    id: 'reputation-policy',
    title: 'Reputation Policy',
    category: 'Trust',
    lastUpdated: 'Jan 17, 2026',
    content: (
      <div className="space-y-16">
        {/* Status Header */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 py-6 border-y border-white/5 text-[10px] font-mono uppercase tracking-widest text-white/40">
          <div><span className="text-white/20 block mb-1">Status</span> <span className="text-lightblueprimary">Active</span></div>
          <div><span className="text-white/20 block mb-1">Effective</span> Jan 17, 2026</div>
          <div><span className="text-white/20 block mb-1">Owner</span> Anylayer Governance</div>
          <div><span className="text-white/20 block mb-1">Version</span> v1.0</div>
        </div>

        <section className="space-y-6">
          <h3 className="text-xl font-black text-white uppercase tracking-tight">1. Purpose and Scope</h3>
          <div className="space-y-4 text-white/60 leading-relaxed font-light">
            <p>1.1 This Reputation Policy governs the collection, computation, issuance, update, and use of reputation and sub‑scores (collectively, “Reputation”) within the Anylayer ecosystem.</p>
            <p>1.2 The Policy applies to all subjects for whom Reputation may be computed, including humans, wallets, and AI agents (each, a “Subject”), to accredited attesters and data providers (each, an “Attester”), and to integrators that request or act upon Reputation (each, an “Integrator”).</p>
            <p>1.3 By submitting data, issuing attestations, requesting Reputation, or acting upon Reputation, Attesters and Integrators agree to comply with this Policy and the policies incorporated by reference.</p>
          </div>
        </section>

        <section className="space-y-6">
          <h3 className="text-xl font-black text-white uppercase tracking-tight">2. Definitions</h3>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-x-12 gap-y-6 text-sm">
            {[
              { term: "Reputation", def: "A vector of sub‑scores derived from permitted signals about a Subject (credit, trading, liquidity, etc.)." },
              { term: "Signal", def: "A permitted input used to compute Reputation (swaps, repayments, governance, etc.)." },
              { term: "Attestation", def: "A signed statement by an Attester concerning a Signal about a Subject." },
              { term: "Epoch", def: "A defined time window during which computation, weighting, and freshness rules are applied." },
              { term: "Nullifier", def: "A mechanism that prevents double‑use of a claim or reputation‑based right." },
              { term: "Subject Identifier", def: "A privacy‑preserving identity reference (e.g., ZK ID or AI agent handle)." }
            ].map((d, i) => (
              <div key={i} className="space-y-1">
                <span className="text-white font-bold block uppercase text-[10px] tracking-wider">{d.term}</span>
                <p className="text-white/40 leading-relaxed font-light">{d.def}</p>
              </div>
            ))}
          </div>
        </section>

        <section className="space-y-6">
          <h3 className="text-xl font-black text-white uppercase tracking-tight">3. Ownership & Title</h3>
          <div className="space-y-4 text-white/60 leading-relaxed font-light">
            <p>3.1 <strong>System Ownership.</strong> Anylayer owns and controls the algorithms, models, registries, code, and interfaces used to compute and publish Reputation.</p>
            <p>3.2 <strong>License to Use.</strong> Integrators receive a limited, revocable license to access and use Reputation for lawful purposes and in accordance with this Policy and user consent.</p>
            <p>3.3 <strong>No Property Right in Scores.</strong> Reputation scores are dynamic evaluative outputs; they do not confer property rights.</p>
            <p>3.4 <strong>Authoritative Record.</strong> The authoritative state of Reputation is maintained by Anylayer’s commitment registry and associated proofs.</p>
          </div>
        </section>

        <section className="space-y-6">
          <h3 className="text-xl font-black text-white uppercase tracking-tight">4. Terms of Use</h3>
          <div className="space-y-4 text-white/60 leading-relaxed font-light text-sm">
            <p>4.1 <strong>Acceptable Use.</strong> Reputation may be used to price, tier, gate, or inform risk management but shall not be used to unlawfully discriminate.</p>
            <p>4.2 <strong>Representations.</strong> Attesters and Integrators represent that they have authority to use Reputation and will implement reasonable safeguards.</p>
            <p>4.3 <strong>No Warranties.</strong> Reputation is provided “as is” and “as available.” Anylayer disclaims warranties of merchantability and non‑infringement.</p>
            <p>4.4 <strong>Limitation of Liability.</strong> Anylayer shall not be liable for indirect, incidental, special, or consequential damages arising from the use of Reputation.</p>
            <p>4.5 <strong>Indemnification.</strong> Attesters and Integrators shall indemnify Anylayer for claims arising from misuse or violations of this Policy.</p>
          </div>
        </section>

        <section className="space-y-6">
          <h3 className="text-xl font-black text-white uppercase tracking-tight">5. Principles</h3>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 text-sm">
            {[
              { term: "Privacy by Design", def: "Inputs processed via commitments and ZK proofs. No raw data on-chain." },
              { term: "Data Minimization", def: "Only Signals necessary for intended computation are permitted." },
              { term: "Selective Disclosure", def: "Subjects prove conditions without revealing underlying Signals." },
              { term: "Transparency", def: "High-level descriptions of models and inputs will be published." },
              { term: "Contestability", def: "Subjects may request review for significant errors or disputed attestations." }
            ].map((p, i) => (
              <div key={i} className="space-y-1">
                <span className="text-white font-bold block uppercase text-[10px] tracking-wider">{p.term}</span>
                <p className="text-white/40 leading-relaxed font-light">{p.def}</p>
              </div>
            ))}
          </div>
        </section>

        <section className="space-y-6">
          <h3 className="text-xl font-black text-white uppercase tracking-tight">6. Permitted Signals (Inputs)</h3>
          <div className="space-y-4 text-white/60 leading-relaxed font-light text-sm">
            <p>6.1 <strong>On‑Chain Activity.</strong> DEX swaps; lending repayment streaks; collateralization history; LP positions; governance participation.</p>
            <p>6.2 <strong>Off‑Chain Activity.</strong> Verified contribution records, audit outcomes, and third‑party attestations approved under the Attester Policy.</p>
            <p>6.3 <strong>AI Agent Outcomes.</strong> Task success rates, incident reports, slippage control, and user satisfaction where provided by accredited Attesters.</p>
            <p>6.4 <strong>Prohibited Inputs.</strong> Biometrics, geolocation, medical data, and other sensitive categories unless explicitly consented and legally permissible.</p>
          </div>
        </section>

        <section className="space-y-6">
          <h3 className="text-xl font-black text-white uppercase tracking-tight">7. Computation & Weighting</h3>
          <div className="space-y-4 text-white/60 leading-relaxed font-light text-sm">
            <p>7.1 <strong>Sub‑Scores.</strong> Reputation is computed as a vector of sub‑scores (credit, trading, liquidity, compliance, agent reliability).</p>
            <p>7.2 <strong>Weighting.</strong> High‑quality Attesters and time‑proximity of Signals may receive higher weight per epoch.</p>
            <p>7.3 <strong>Decay & Windows.</strong> Event influence decays over time using rolling windows to balance recency and stability.</p>
            <p>7.4 <strong>Aggregation.</strong> Median‑ or quorum‑based aggregation applied for conflicting Signals.</p>
            <p>7.5 <strong>Normalization.</strong> Scores normalized to comparable ranges for cross‑context use.</p>
          </div>
        </section>

        <section className="space-y-6">
          <h3 className="text-xl font-black text-white uppercase tracking-tight">8. Freshness, Validity & Revocation</h3>
          <div className="space-y-4 text-white/60 leading-relaxed font-light">
            <p>8.1 <strong>Epoch Freshness.</strong> Integrators may require proofs generated within a defined epoch/window.</p>
            <p>8.2 <strong>Revocation.</strong> Attesters may revoke prior attestations; revocations propagate to updated Reputation.</p>
            <p>8.3 <strong>Replay Protection.</strong> Nullifiers and context‑bound proofs prevent replay and double‑claims.</p>
          </div>
        </section>

        <section className="space-y-6">
          <h3 className="text-xl font-black text-white uppercase tracking-tight">9. Anti‑Gaming & Abuse Controls</h3>
          <div className="space-y-4 text-white/60 leading-relaxed font-light">
            <p>9.1 <strong>Sybil Resistance.</strong> Rate‑limit nullifiers and uniqueness checks required for certain uses.</p>
            <p>9.2 <strong>Manipulation.</strong> Patterns indicative of wash‑trading or spoofing may reduce sub‑scores.</p>
            <p>9.3 <strong>Attester Misconduct.</strong> False or negligent attestations trigger slashing or removal.</p>
          </div>
        </section>

        <section className="space-y-6">
          <h3 className="text-xl font-black text-white uppercase tracking-tight">10. Publication & Access</h3>
          <div className="space-y-4 text-white/60 leading-relaxed font-light">
            <p>10.1 <strong>Commitments.</strong> Registry stores commitments to Reputation, not raw Signals.</p>
            <p>10.2 <strong>Access Methods.</strong> Integrators retrieve Reputation via SDK/API or verify ZK proofs.</p>
            <p>10.3 <strong>Rate Limits.</strong> Access may be limited to protect system integrity and privacy.</p>
          </div>
        </section>

        <section className="space-y-6">
          <h3 className="text-xl font-black text-white uppercase tracking-tight">11. AI Agent Reputation</h3>
          <div className="space-y-4 text-white/60 leading-relaxed font-light text-sm">
            <p>11.1 <strong>Scope.</strong> Anylayer aggregates sub‑scores reflecting task outcomes and reliability; it does not define agent behavior.</p>
            <p>11.2 <strong>Outcome Metrics.</strong> Completion rates, incident rates, instruction adherence, and slippage control.</p>
            <p>11.3 <strong>Portability.</strong> Agent Reputation is portable across marketplaces via Subject Identifiers.</p>
            <p>11.4 <strong>Reset & Recovery.</strong> Agents may request recalibration following verified upgrades.</p>
          </div>
        </section>

        <section className="space-y-6">
          <h3 className="text-xl font-black text-white uppercase tracking-tight">12. Subject Rights & Consent</h3>
          <div className="space-y-4 text-white/60 leading-relaxed font-light">
            <p>12.1 <strong>Consent.</strong> Subjects control disclosure via selective proofs.</p>
            <p>12.2 <strong>Access.</strong> Subjects may request a summary of inputs and computation logic.</p>
            <p>12.3 <strong>Correction.</strong> Subjects may submit evidence to correct errors or misattributions.</p>
            <p>12.4 <strong>Portability.</strong> Subjects may export commitment references where feasible.</p>
          </div>
        </section>

        <section className="space-y-6">
          <h3 className="text-xl font-black text-white uppercase tracking-tight">13. Attesters</h3>
          <div className="space-y-4 text-white/60 leading-relaxed font-light text-sm">
            <p>13.1 <strong>Accreditation.</strong> Attesters must be accredited and maintain required bonds.</p>
            <p>13.2 <strong>Duties.</strong> Attesters must issue accurate attestations and cooperate in audits.</p>
            <p>13.3 <strong>Liability.</strong> Attesters responsible for damages from fraudulent or negligent attestations.</p>
          </div>
        </section>

        <section className="space-y-6">
          <h3 className="text-xl font-black text-white uppercase tracking-tight">14. Review, Disputes & Appeals</h3>
          <div className="space-y-4 text-white/60 leading-relaxed font-light">
            <p>14.1 <strong>Subject Review.</strong> Subjects may request review for material inaccuracies.</p>
            <p>14.2 <strong>Process.</strong> Intake → Notice → Evidence → Determination.</p>
            <p>14.3 <strong>Standards.</strong> Determinations balance accuracy, privacy, and anti‑gaming.</p>
            <p>14.4 <strong>Appeal.</strong> Final decisions reached after limited appeal window.</p>
          </div>
        </section>

        <section className="space-y-6">
          <h3 className="text-xl font-black text-white uppercase tracking-tight">15. Security & Audit</h3>
          <div className="space-y-4 text-white/60 leading-relaxed font-light">
            <p>15.1 <strong>Security.</strong> Anylayer implements measures to protect computation pipelines.</p>
            <p>15.2 <strong>Audits.</strong> Models and circuits subject to periodic independent audits.</p>
            <p>15.3 <strong>Incident Response.</strong> Material incidents disclosed consistent with protocol procedure.</p>
          </div>
        </section>

        <section className="space-y-6">
          <h3 className="text-xl font-black text-white uppercase tracking-tight">16. Compliance</h3>
          <div className="space-y-4 text-white/60 leading-relaxed font-light">
            <p>16.1 <strong>Legal Holds.</strong> Components may be held in response to legal orders.</p>
            <p>16.2 <strong>Jurisdictional Filters.</strong> Allow/deny checks applied where legally required.</p>
            <p>16.3 <strong>Export Controls.</strong> Integrators responsible for cross-border compliance.</p>
          </div>
        </section>

        <section className="space-y-6">
          <h3 className="text-xl font-black text-white uppercase tracking-tight">17. Change Management & Versioning</h3>
          <div className="space-y-4 text-white/60 leading-relaxed font-light">
            <p>17.1 <strong>Amendments.</strong> Material changes follow RFC and governance vote.</p>
            <p>17.2 <strong>Notice.</strong> 14 days’ notice provided before amendments take effect.</p>
            <p>17.3 <strong>Changelog.</strong> Public version history linked from policy page.</p>
          </div>
        </section>

        <section className="space-y-6">
          <h3 className="text-xl font-black text-white uppercase tracking-tight">18. Governing Law & Forum</h3>
          <p className="text-white/60 font-light">18.1 Published by Anylayer governance [placeholder].</p>
        </section>
      </div>
    )
  },
  {
    id: 'proof-validity',
    title: 'Proof Validity Policy',
    category: 'Trust',
    lastUpdated: 'Jan 17, 2026',
    content: (
      <div className="space-y-16">
        {/* Status Header */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 py-6 border-y border-white/5 text-[10px] font-mono uppercase tracking-widest text-white/40">
          <div><span className="text-white/20 block mb-1">Status</span> <span className="text-lightblueprimary">Active</span></div>
          <div><span className="text-white/20 block mb-1">Effective</span> Jan 17, 2026</div>
          <div><span className="text-white/20 block mb-1">Owner</span> Anylayer Governance</div>
          <div><span className="text-white/20 block mb-1">Version</span> v1.0</div>
        </div>

        <section className="space-y-6">
          <h3 className="text-xl font-black text-white uppercase tracking-tight">1. Purpose and Scope</h3>
          <div className="space-y-4 text-white/60 leading-relaxed font-light">
            <p>1.1 This Proof Validity Policy (the "Policy") defines the rules under which cryptographic proofs ("Proofs") are generated, submitted, verified, accepted, rejected, and revoked within the Anylayer ecosystem.</p>
            <p>1.2 The Policy applies to Subjects (humans, wallets, AI agents), Integrators (dApps, protocols, wallets), and Attesters (approved data providers) that request, produce, or rely on Proofs.</p>
            <p>1.3 This Policy governs Proofs used to establish facts about identity, reputation sub‑scores, asset readiness, uniqueness, and other permitted claims without disclosing raw data.</p>
          </div>
        </section>

        <section className="space-y-6">
          <h3 className="text-xl font-black text-white uppercase tracking-tight">2. Definitions</h3>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-x-12 gap-y-6 text-sm">
            {[
              { term: "Proof", def: "A zero‑knowledge or privacy‑preserving cryptographic statement attesting to a Claim without revealing underlying data." },
              { term: "Claim", def: "The verifiable predicate requested by an Integrator (e.g., \"credit ≥ 720,\" \"can lock ≥ 5,000 USDT\")." },
              { term: "Context Binding", def: "Associating a Proof with a specific verifier, domain, contract, or session to prevent replay elsewhere." },
              { term: "Epoch", def: "A defined time window during which state commitments, parameters, and freshness rules apply." },
              { term: "Revocation", def: "The process by which a previously valid Proof is rendered invalid due to withdrawal, stale state, error correction, or abuse." },
              { term: "Nullifier", def: "A cryptographic artifact that prevents double‑use of a Proof or entitlement across contexts." },
              { term: "Commitment Registry", def: "The on‑chain or published record that anchors state commitments for identities, reputation vectors, and attestation sets." },
              { term: "Subject Identifier", def: "A privacy‑preserving reference to a Subject as defined in the Identity Policy." }
            ].map((d, i) => (
              <div key={i} className="space-y-1">
                <span className="text-white font-bold block uppercase text-[10px] tracking-wider">{d.term}</span>
                <p className="text-white/40 leading-relaxed font-light">{d.def}</p>
              </div>
            ))}
          </div>
        </section>

        <section className="space-y-6">
          <h3 className="text-xl font-black text-white uppercase tracking-tight">3. Ownership & Title</h3>
          <div className="space-y-4 text-white/60 leading-relaxed font-light">
            <p>3.1 Anylayer owns and controls the circuits, parameters, registries, and verification interfaces used for Proof handling, except for open‑source components which remain under their respective licenses.</p>
            <p>3.2 Integrators and Subjects receive a limited, revocable license to use Proof tooling in accordance with this Policy and applicable law. No proprietary right in circuits, parameters, or registries is transferred by use.</p>
          </div>
        </section>

        <section className="space-y-6">
          <h3 className="text-xl font-black text-white uppercase tracking-tight">4. Terms of Use</h3>
          <div className="space-y-4 text-white/60 leading-relaxed font-light text-sm">
            <p>4.1 Proofs may be used to price, gate, or automate actions but shall not be used to unlawfully discriminate or contravene applicable law.</p>
            <p>4.2 Integrators must implement reasonable safeguards to validate freshness, bind context, and handle revocations.</p>
            <p>4.3 Anylayer provides Proof tooling "as is" and disclaims warranties to the maximum extent permitted by law; liability is limited to fees paid in the twelve (12) months preceding a claim.</p>
            <p>4.4 Subjects and Integrators shall indemnify Anylayer for misuse of Proofs or violations of this Policy.</p>
          </div>
        </section>

        <section className="space-y-6">
          <h3 className="text-xl font-black text-white uppercase tracking-tight">5. Proof Types</h3>
          <div className="space-y-4 text-white/60 leading-relaxed font-light text-sm">
            <p>5.1 <strong>Range Proofs.</strong> Demonstrate that a secret value lies within a range (e.g., score ≥ threshold, balance ≥ amount).</p>
            <p>5.2 <strong>Set‑Membership Proofs.</strong> Demonstrate that a value belongs to or is excluded from a set (e.g., allow/deny lists, attester quorum).</p>
            <p>5.3 <strong>Boolean/Composite Proofs.</strong> Combine multiple conditions with AND/OR logic (e.g., credit ≥ X AND repayment streak ≥ N).</p>
            <p>5.4 <strong>Uniqueness/Rate‑Limit Proofs.</strong> Demonstrate one‑per‑Subject access or bounded frequency without revealing identity.</p>
            <p>5.5 <strong>Time‑Bound Proofs.</strong> Assert claims limited to an Epoch or timestamp window (freshness).</p>
          </div>
        </section>

        <section className="space-y-6">
          <h3 className="text-xl font-black text-white uppercase tracking-tight">6. Freshness & Validity</h3>
          <div className="space-y-4 text-white/60 leading-relaxed font-light">
            <p>6.1 <strong>Epoch Freshness.</strong> Proofs must reference a current or Integrator‑accepted Epoch; out‑of‑window Proofs are invalid.</p>
            <p>6.2 <strong>TTL.</strong> Integrators may specify a maximum time‑to‑live (TTL) for acceptance.</p>
            <p>6.3 <strong>State Commitments.</strong> Proofs must be generated against the latest applicable commitment roots published in the Commitment Registry.</p>
            <p>6.4 <strong>Clock Skew.</strong> A small skew tolerance may be applied; parameters are published by Anylayer.</p>
          </div>
        </section>

        <section className="space-y-6">
          <h3 className="text-xl font-black text-white uppercase tracking-tight">7. Revocation & Updates</h3>
          <div className="space-y-4 text-white/60 leading-relaxed font-light">
            <p>7.1 <strong>Attestation Revocation.</strong> If an Attester revokes or amends an attestation, Proofs dependent on the revoked state are invalid from the revocation effective time.</p>
            <p>7.2 <strong>Error Correction.</strong> Material computation errors will result in updated commitments; Proofs against superseded commitments may be rejected.</p>
            <p>7.3 <strong>Subject Withdrawal.</strong> Subjects may withdraw consent for certain Claims prospectively; Integrators must respect updated consent scopes.</p>
            <p>7.4 <strong>Notice.</strong> Revocation events are published via the Commitment Registry and webhook feeds where available.</p>
          </div>
        </section>

        <section className="space-y-6">
          <h3 className="text-xl font-black text-white uppercase tracking-tight">8. Replay Protection & Context Binding</h3>
          <div className="space-y-4 text-white/60 leading-relaxed font-light">
            <p>8.1 <strong>Context Binding Required.</strong> Proofs must bind to an Integrator‑specified domain, contract address, session nonce, or similar scope.</p>
            <p>8.2 <strong>Single‑Use Nullifiers.</strong> Where entitlements are one‑time or limited, Proofs shall emit nullifiers to prevent reuse.</p>
            <p>8.3 <strong>Cross‑Context Rejection.</strong> Integrators must reject Proofs whose context does not match the request (e.g., different contract or domain).</p>
          </div>
        </section>

        <section className="space-y-6">
          <h3 className="text-xl font-black text-white uppercase tracking-tight">9. Selective Disclosure & Minimization</h3>
          <div className="space-y-4 text-white/60 leading-relaxed font-light">
            <p>9.1 Proofs must disclose only the minimal information needed to satisfy the Claim; raw inputs and personal datasets are not exposed.</p>
            <p>9.2 Integrators shall not condition access on disclosure of unnecessary fields or raw data when a Proof can satisfy the Claim.</p>
          </div>
        </section>

        <section className="space-y-6">
          <h3 className="text-xl font-black text-white uppercase tracking-tight">10. Generation & Verification Requirements</h3>
          <div className="space-y-4 text-white/60 leading-relaxed font-light text-sm">
            <p>10.1 <strong>Trusted Parameters.</strong> Circuits and parameters must be published with version identifiers; where a setup is required, ceremony artifacts and transcripts will be referenced.</p>
            <p>10.2 <strong>Library Integrity.</strong> SDKs and APIs used for Proof generation/verification must be integrity‑checked (e.g., hashes, signatures).</p>
            <p>10.3 <strong>Determinism & Errors.</strong> Integrators should handle verification timeouts, malformed Proofs, and mismatched roots with clear error codes and safe defaults (reject on failure).</p>
            <p>10.4 <strong>Rate Limits.</strong> Proof submission may be rate‑limited to protect system integrity.</p>
          </div>
        </section>

        <section className="space-y-6">
          <h3 className="text-xl font-black text-white uppercase tracking-tight">11. Cryptographic Assumptions & Upgrades</h3>
          <div className="space-y-4 text-white/60 leading-relaxed font-light">
            <p>11.1 <strong>Assumptions.</strong> Proof systems rely on stated cryptographic assumptions (e.g., soundness, knowledge‑of‑exponent). Anylayer will publish a summary of assumptions and circuit constraints.</p>
            <p>11.2 <strong>Upgrades.</strong> Critical parameter or circuit upgrades will follow the Change Management process with clear deprecation windows.</p>
            <p>11.3 <strong>Backward Compatibility.</strong> Where feasible, prior Proofs remain valid within their TTL and Epoch; otherwise Integrators must require regeneration.</p>
          </div>
        </section>

        <section className="space-y-6">
          <h3 className="text-xl font-black text-white uppercase tracking-tight">12. Misuse & Abuse</h3>
          <div className="space-y-4 text-white/60 leading-relaxed font-light">
            <p>12.1 <strong>Forgery & Tampering.</strong> Attempted forging or tampering with Proof tooling is prohibited and may lead to account blocks, slashing (where applicable), and legal action.</p>
            <p>12.2 <strong>Coercion & Sale of Proofs.</strong> The sale or coercive transfer of context‑bound Proofs is prohibited; Integrators should bind Proofs to Sessions or recipients to reduce value for resale.</p>
            <p>12.3 <strong>Gaming.</strong> Coordinated behaviors intended to misrepresent eligibility or reputation may trigger rejection and flags per the Reputation Policy.</p>
          </div>
        </section>

        <section className="space-y-6">
          <h3 className="text-xl font-black text-white uppercase tracking-tight">13. Subject Rights & Consent</h3>
          <div className="space-y-4 text-white/60 leading-relaxed font-light">
            <p>13.1 <strong>Consent Scope.</strong> Subjects define which Claims may be proven in which contexts; Integrators must request only the necessary Claims.</p>
            <p>13.2 <strong>Withdrawal.</strong> Subjects may withdraw consent prospectively; previously accepted Proofs are unaffected retroactively unless revoked for cause.</p>
            <p>13.3 <strong>Access & Explanation.</strong> Subjects may request high‑level explanations of Proof scopes and applicable Epochs, subject to anti‑gaming safeguards.</p>
          </div>
        </section>

        <section className="space-y-6">
          <h3 className="text-xl font-black text-white uppercase tracking-tight">14. Integrator Obligations</h3>
          <div className="space-y-4 text-white/60 leading-relaxed font-light">
            <p>14.1 <strong>Policy Conformance.</strong> Integrators must implement freshness checks, revocation handling, context binding, and selective disclosure.</p>
            <p>14.2 <strong>Error Handling.</strong> Integrators must surface user‑readable reasons for rejection (e.g., stale Proof, mismatched context).</p>
            <p>14.3 <strong>Security.</strong> Integrators must secure API keys, SDKs, and contract interfaces to prevent unauthorized Proof relay.</p>
          </div>
        </section>

        <section className="space-y-6">
          <h3 className="text-xl font-black text-white uppercase tracking-tight">15. Security & Audit</h3>
          <div className="space-y-4 text-white/60 leading-relaxed font-light">
            <p>15.1 <strong>Audits.</strong> Circuits, registries, and critical interfaces are subject to periodic independent audit; public summaries may be provided.</p>
            <p>15.2 <strong>Incident Response.</strong> Material incidents are disclosed per Incident Response procedures; emergency parameter changes may be enacted with accelerated notice.</p>
          </div>
        </section>

        <section className="space-y-6">
          <h3 className="text-xl font-black text-white uppercase tracking-tight">16. Compliance</h3>
          <div className="space-y-4 text-white/60 leading-relaxed font-light">
            <p>16.1 <strong>Legal Holds.</strong> Proof acceptance may be withheld to comply with lawful orders.</p>
            <p>16.2 <strong>Sanctions & Geo.</strong> Where required, privacy‑preserving allow/deny checks may be applied by Integrators.</p>
          </div>
        </section>

        <section className="space-y-6">
          <h3 className="text-xl font-black text-white uppercase tracking-tight">17. Change Management & Versioning</h3>
          <div className="space-y-4 text-white/60 leading-relaxed font-light">
            <p>17.1 <strong>Amendments.</strong> Material changes follow an RFC process with reasonable comment period and, where required, governance vote.</p>
            <p>17.2 <strong>Notice.</strong> Except for urgent security/legal updates, Anylayer will provide at least fourteen (14) days' notice before changes take effect.</p>
            <p>17.3 <strong>Version Tags.</strong> All circuits, parameters, and SDKs will carry version tags; deprecation windows will be announced.</p>
          </div>
        </section>

        <section className="space-y-6">
          <h3 className="text-xl font-black text-white uppercase tracking-tight">18. Governing Law & Forum</h3>
          <p className="text-white/60 font-light">18.1 Governing law and forum for disputes shall be published by Anylayer governance <strong>[placeholder to be finalized]</strong>.</p>
        </section>
      </div>
    )
  },
  {
    id: 'privacy-policy',
    title: 'Privacy & Consent Policy',
    category: 'Legal',
    lastUpdated: 'Jan 17, 2026',
    content: (
      <div className="space-y-16">
        {/* Status Header */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 py-6 border-y border-white/5 text-[10px] font-mono uppercase tracking-widest text-white/40">
          <div><span className="text-white/20 block mb-1">Status</span> <span className="text-lightblueprimary">Active</span></div>
          <div><span className="text-white/20 block mb-1">Effective</span> Jan 17, 2026</div>
          <div><span className="text-white/20 block mb-1">Owner</span> Anylayer Governance</div>
          <div><span className="text-white/20 block mb-1">Version</span> v1.0</div>
        </div>

        <section className="space-y-6">
          <h3 className="text-xl font-black text-white uppercase tracking-tight">1. Purpose and Scope</h3>
          <div className="space-y-4 text-white/60 leading-relaxed font-light">
            <p>1.1 This Privacy & Consent Policy (the "Policy") describes how Anylayer handles information about <strong>Humans</strong>, <strong>Wallets</strong>, and <strong>AI Agents</strong> (collectively, "Participants") in connection with identity, reputation, and proof functions.</p>
            <p>1.2 The Policy focuses on <strong>data minimization</strong>, <strong>selective disclosure</strong>, <strong>user/agent consent</strong>, and <strong>portability/erasure</strong> in a zero‑knowledge trust environment.</p>
            <p>1.3 This Policy operates alongside the <strong>Reputation Policy</strong>, <strong>Proof Validity Policy</strong>, <strong>Participant Use Policy</strong>, and <strong>.any Naming Policy</strong>. Where conflicts arise, the more privacy‑protective control prevails unless required by law.</p>
          </div>
        </section>

        <section className="space-y-6">
          <h3 className="text-xl font-black text-white uppercase tracking-tight">2. Principles</h3>
          <div className="space-y-4 text-white/60 leading-relaxed font-light">
            <p>2.1 <strong>Data Minimization.</strong> Collect, process, and share the least amount of information necessary to achieve a stated purpose.</p>
            <p>2.2 <strong>Selective Disclosure.</strong> Prefer cryptographic <strong>Proofs</strong> over raw data wherever feasible.</p>
            <p>2.3 <strong>User/Agent Control.</strong> Participants choose what to disclose, where, and when.</p>
            <p>2.4 <strong>Portability.</strong> Participants can move their commitments and permitted summaries between integrators.</p>
            <p>2.5 <strong>Erasure & Revocation.</strong> Where feasible, Participants can request withdrawal of consent and revocation of attestations; immutable records are handled via <strong>commitment updates</strong> and <strong>prospective controls</strong>.</p>
            <p>2.6 <strong>Security by Design.</strong> Administrative, technical, and organizational safeguards protect processing pipelines and registries.</p>
            <p>2.7 <strong>Lawful Processing.</strong> Processing relies on Participant consent or another lawful basis applicable to the context.</p>
          </div>
        </section>

        <section className="space-y-6">
          <h3 className="text-xl font-black text-white uppercase tracking-tight">3. Categories of Information</h3>
          <div className="space-y-4 text-white/60 leading-relaxed font-light text-sm">
            <p>3.1 <strong>On‑Chain Signals.</strong> Public transaction metadata (e.g., swaps, lending, collateralization, holdings/transfers) referenced via commitments in Reputation computation.</p>
            <p>3.2 <strong>Off‑Chain Signals.</strong> Verifiable contribution records, audits, dispute outcomes, and other Attester‑issued statements.</p>
            <p>3.3 <strong>Derived Reputation.</strong> Sub‑scores and flags computed from permitted signals; published as commitments, not raw datasets.</p>
            <p>3.4 <strong>Operational Metadata.</strong> Non‑content event logs (e.g., registration, renewal, proof timestamps, revocation events).</p>
            <p>3.5 <strong>Sensitive Data.</strong> Biometric identifiers, precise geolocation, medical data—<strong>prohibited</strong> unless explicitly consented, necessary, and legally permissible.</p>
          </div>
        </section>

        <section className="space-y-6">
          <h3 className="text-xl font-black text-white uppercase tracking-tight">4. Data Minimization Controls</h3>
          <div className="space-y-4 text-white/60 leading-relaxed font-light">
            <p>4.1 <strong>Default to Proofs.</strong> Integrators must accept Proofs in lieu of raw inputs when a policy can be satisfied by a Claim.</p>
            <p>4.2 <strong>Purpose Binding.</strong> Each request must specify a legitimate purpose and scope (e.g., <em>credit ≥ threshold</em>).</p>
            <p>4.3 <strong>No Excess Fields.</strong> Integrators shall not collect additional identifiers or raw histories when unnecessary to satisfy the Claim.</p>
            <p>4.4 <strong>Retention Limits.</strong> Operational metadata is retained only as long as necessary for integrity, audit, and legal requirements, then aggregated or deleted.</p>
          </div>
        </section>

        <section className="space-y-6">
          <h3 className="text-xl font-black text-white uppercase tracking-tight">5. Selective Disclosure</h3>
          <div className="space-y-4 text-white/60 leading-relaxed font-light">
            <p>5.1 <strong>Granular Claims.</strong> Participants disclose <strong>only</strong> the minimum needed (e.g., range proofs, set‑membership).</p>
            <p>5.2 <strong>Freshness Windows.</strong> Claims carry epochs/TTLs; Integrators must check freshness per the <strong>Proof Validity Policy</strong>.</p>
            <p>5.3 <strong>Context Binding.</strong> Proofs are bound to a specific verifier, domain, contract, or session to prevent replay.</p>
          </div>
        </section>

        <section className="space-y-6">
          <h3 className="text-xl font-black text-white uppercase tracking-tight">6. Consent Management</h3>
          <div className="space-y-4 text-white/60 leading-relaxed font-light">
            <p>6.1 <strong>Explicit Consent.</strong> Where required by law or policy, Participants provide explicit consent for the use of particular signals or Claims.</p>
            <p>6.2 <strong>Consent Records.</strong> Consent scopes (purpose, fields, duration) are recorded as signed statements or commitments; raw personal data is not placed on‑chain.</p>
            <p>6.3 <strong>Withdrawal.</strong> Participants may withdraw consent prospectively. Post‑withdrawal, new Proofs for the withdrawn scopes shall not be accepted; previously valid interactions remain unaffected unless separately revoked for cause.</p>
            <p>6.4 <strong>Delegation.</strong> Controllers may consent on behalf of AI Agents they manage, within published scopes and with auditability.</p>
          </div>
        </section>

        <section className="space-y-6">
          <h3 className="text-xl font-black text-white uppercase tracking-tight">7. Portability</h3>
          <div className="space-y-4 text-white/60 leading-relaxed font-light">
            <p>7.1 <strong>Export.</strong> Participants may export references to commitments, high‑level score summaries, and relevant proofs in a standard, documented format.</p>
            <p>7.2 <strong>Interoperability.</strong> Anylayer will document APIs/SDKs to allow Participants to port their permitted summaries between integrators and chains where supported.</p>
            <p>7.3 <strong>Limitations.</strong> Portability covers <strong>derived</strong> elements (commitments/proofs) rather than immutable public chain history.</p>
          </div>
        </section>

        <section className="space-y-6">
          <h3 className="text-xl font-black text-white uppercase tracking-tight">8. Erasure & Revocation</h3>
          <div className="space-y-4 text-white/60 leading-relaxed font-light">
            <p>8.1 <strong>Best‑Effort Erasure.</strong> For mutable off‑chain data and attestations, Anylayer will, upon valid request, instruct Attesters to revoke or update records and will update commitments accordingly.</p>
            <p>8.2 <strong>Immutable Records.</strong> Public on‑chain history cannot be erased; instead, new commitments supersede prior states and future disclosures are curtailed.</p>
            <p>8.3 <strong>Downstream Notice.</strong> Where feasible, Integrators who consumed revoked attestations will be notified via webhook/registry events.</p>
          </div>
        </section>

        <section className="space-y-6">
          <h3 className="text-xl font-black text-white uppercase tracking-tight">9. Participant Rights</h3>
          <div className="space-y-4 text-white/60 leading-relaxed font-light">
            <p>9.1 <strong>Access.</strong> Participants may request a high‑level summary of inputs and computation applicable to them, subject to anti‑gaming and privacy safeguards.</p>
            <p>9.2 <strong>Correction.</strong> Participants may submit evidence to correct factual errors or misattributions.</p>
            <p>9.3 <strong>Restriction.</strong> Participants may restrict processing for specified purposes where legally permitted.</p>
            <p>9.4 <strong>Appeal.</strong> Denials of requests may be appealed under the processes in the <strong>Reputation Policy</strong>.</p>
          </div>
        </section>

        <section className="space-y-6">
          <h3 className="text-xl font-black text-white uppercase tracking-tight">10. Integrator & Attester Obligations</h3>
          <div className="space-y-4 text-white/60 leading-relaxed font-light">
            <p>10.1 <strong>Least Disclosure.</strong> Request only the Claims necessary for a given action; accept Proofs over raw data.</p>
            <p>10.2 <strong>Security.</strong> Protect keys, SDKs, and interfaces; prevent unauthorized relay or storage of raw datasets.</p>
            <p>10.3 <strong>Revocation Handling.</strong> Subscribe to registry/webhook events and cease reliance on revoked or stale Proofs.</p>
            <p>10.4 <strong>Audit Cooperation.</strong> Cooperate with independent audits and incident response.</p>
          </div>
        </section>

        <section className="space-y-6">
          <h3 className="text-xl font-black text-white uppercase tracking-tight">11. Security Measures</h3>
          <div className="space-y-4 text-white/60 leading-relaxed font-light">
            <p>11.1 <strong>Technical Controls.</strong> Encryption at rest/in transit for off‑chain elements; integrity checks for SDKs/APIs; rate‑limit and anomaly detection for Proof submission.</p>
            <p>11.2 <strong>Administrative Controls.</strong> Access controls, least‑privilege assignments, and change management for configuration and models.</p>
            <p>11.3 <strong>Independent Audits.</strong> Periodic audits of privacy‑impacting systems; public summaries may be provided.</p>
          </div>
        </section>

        <section className="space-y-6">
          <h3 className="text-xl font-black text-white uppercase tracking-tight">12. Compliance</h3>
          <div className="space-y-4 text-white/60 leading-relaxed font-light">
            <p>12.1 <strong>Legal Requests.</strong> Anylayer responds to lawful requests in a manner consistent with data minimization, notifying Participants where permitted.</p>
            <p>12.2 <strong>Sanctions/Geo.</strong> Privacy‑preserving allow/deny checks may be applied where legally required.</p>
            <p>12.3 <strong>Children's Data.</strong> The platform is not directed at children; minors may participate only where lawful and with appropriate consents.</p>
          </div>
        </section>

        <section className="space-y-6">
          <h3 className="text-xl font-black text-white uppercase tracking-tight">13. Change Management & Versioning</h3>
          <div className="space-y-4 text-white/60 leading-relaxed font-light">
            <p>13.1 <strong>Amendments.</strong> Material changes follow an RFC process with community comment and, where required, governance vote.</p>
            <p>13.2 <strong>Notice.</strong> Except for urgent legal/security changes, Anylayer provides at least fourteen (14) days' notice before changes take effect.</p>
            <p>13.3 <strong>Changelog.</strong> A public changelog will be maintained and linked.</p>
          </div>
        </section>
      </div>
    )
  },
  {
    id: 'terms-of-service',
    title: 'Terms of Service',
    category: 'Legal',
    lastUpdated: 'Oct 2025',
    content: (
      <div className="space-y-8">
        <h2 className="text-4xl md:text-6xl font-black uppercase tracking-tighter leading-[0.9] text-white">Terms of Service</h2>
        <p className="text-white/60">General terms for using the Anylayer protocol and .any namespace.</p>
        <div className="p-12 bg-white/[0.02] border border-dashed border-white/10 rounded-2xl text-center">
          <p className="text-white/20 font-mono text-sm">Full Terms of Service document coming soon.</p>
        </div>
      </div>
    )
  }
];

const PolicyPage = () => {
  const [activePolicy, setActivePolicy] = useState(POLICIES[0]);
  const [searchQuery, setSearchQuery] = useState('');

  // Handle hash-based routing on mount and hash change
  React.useEffect(() => {
    const handleHashChange = () => {
      const hash = window.location.hash.slice(1); // Remove the '#'
      if (hash) {
        const policy = POLICIES.find(p => p.id === hash);
        if (policy) {
          setActivePolicy(policy);
        }
      } else {
        // Set default hash to first policy
        window.location.hash = POLICIES[0].id;
      }
    };

    // Check hash on mount
    handleHashChange();

    // Listen for hash changes
    window.addEventListener('hashchange', handleHashChange);
    return () => window.removeEventListener('hashchange', handleHashChange);
  }, []);

  // Update hash when policy changes
  const handlePolicyChange = (policy: typeof POLICIES[0]) => {
    setActivePolicy(policy);
    window.location.hash = policy.id;
  };

  const filteredPolicies = POLICIES.filter(p =>
    p.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
    p.category.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <>
      <Head>
        <title>Anylayer | Policies</title>
      </Head>

      <div className="bg-[#08080C] min-h-screen font-geist text-white">
        <Header />

        <main className="pt-32 pb-24 px-6 md:px-12">
          <div className="max-w-7xl mx-auto flex flex-col lg:flex-row gap-16">

            {/* Sidebar Navigation */}
            <aside className="lg:w-64 space-y-12 shrink-0 lg:sticky lg:top-32 self-start">
              <div className="space-y-8">
                <div>
                  <h1 className="text-3xl font-black uppercase tracking-tighter mb-2">Policies</h1>
                  <p className="text-white/20 text-xs">Official documentation and governance rules for Anylayer.</p>
                </div>

                <div className="relative border-b border-white/5 pb-2">
                  <Search className="absolute left-0 top-1/2 -translate-y-1/2 text-white/20 w-3.5 h-3.5" />
                  <input
                    type="text"
                    placeholder="Search..."
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    className="w-full bg-transparent py-1 pl-6 pr-2 text-xs focus:outline-none placeholder:text-white/10"
                  />
                </div>
              </div>

              <div className="flex flex-col gap-8">
                {Object.entries(
                  filteredPolicies.reduce((acc, policy) => {
                    if (!acc[policy.category]) acc[policy.category] = [];
                    acc[policy.category].push(policy);
                    return acc;
                  }, {} as Record<string, typeof filteredPolicies>)
                ).map(([category, policies]) => (
                  <div key={category} className="space-y-4">
                    <h4 className="text-[9px] uppercase tracking-[0.2em] font-black text-white/20">{category}</h4>
                    <div className="flex flex-col gap-3">
                      {policies.map((policy) => (
                        <button
                          key={policy.id}
                          onClick={() => handlePolicyChange(policy)}
                          className={`text-left transition-all ${activePolicy.id === policy.id
                            ? 'text-white font-black'
                            : 'text-white/40 hover:text-white/60 font-medium'
                            } text-sm tracking-tight`}
                        >
                          {policy.title}
                        </button>
                      ))}
                    </div>
                  </div>
                ))}
              </div>

              <div className="pt-12 border-t border-white/5 space-y-6">
                <h4 className="text-[9px] uppercase tracking-widest font-black text-white/10">External</h4>
                <div className="space-y-4">
                  <a href="https://docs.anylayer.org" target="_blank" rel="noopener noreferrer" className="flex items-center gap-2 text-xs text-white/20 hover:text-white transition-colors">
                    Developer Docs
                    <ExternalLink size={10} className="opacity-20" />
                  </a>
                  <a href="https://github.com/anylayer" target="_blank" rel="noopener noreferrer" className="flex items-center gap-2 text-xs text-white/20 hover:text-white transition-colors">
                    Security Audits
                    <ExternalLink size={10} className="opacity-20" />
                  </a>
                </div>
              </div>
            </aside>

            {/* Content Area */}
            <article className="flex-1 min-w-0">
              <AnimatePresence mode="wait">
                <motion.div
                  key={activePolicy.id}
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -10 }}
                  transition={{ duration: 0.2 }}
                  className="relative"
                >
                  <div className="space-y-16">
                    <div className="flex flex-col md:flex-row md:items-end justify-between gap-8 border-b border-white/5 pb-12">
                      <div className="space-y-6">
                        <div className="flex items-center gap-4">
                          <span className="text-lightblueprimary text-[10px] font-black uppercase tracking-widest">
                            {activePolicy.category}
                          </span>
                          <div className="w-1 h-1 rounded-full bg-white/10" />
                          <span className="text-white/10 font-mono text-[10px] uppercase tracking-widest">
                            {activePolicy.id}.anylayer.org
                          </span>
                        </div>
                        <h2 className="text-4xl md:text-6xl font-black uppercase tracking-tighter leading-[0.9]">
                          {activePolicy.title}
                        </h2>
                      </div>
                      <div className="text-[10px] font-mono text-white/10 uppercase tracking-widest shrink-0">
                        Updated: {activePolicy.lastUpdated}
                      </div>
                    </div>

                    <div className="prose prose-invert max-w-none">
                      {activePolicy.content}
                    </div>

                    <div className="pt-20 border-t border-white/5 flex flex-col sm:flex-row items-center justify-between gap-8">
                      <p className="text-white/10 text-[9px] uppercase tracking-widest font-mono">
                        &copy; 2026 Anylayer Identity Foundation
                      </p>
                      <button className="text-[10px] font-black uppercase tracking-[0.2em] flex items-center gap-2 text-white/20 hover:text-white transition-colors">
                        Download PDF
                        <FileText size={12} />
                      </button>
                    </div>
                  </div>
                </motion.div>
              </AnimatePresence>
            </article>

          </div>
        </main>

        <Footer />
      </div>
    </>
  );
};

export default PolicyPage;
