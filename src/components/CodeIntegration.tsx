import Image from 'next/image';
import { useState } from 'react';
import { motion } from 'framer-motion';
import { Terminal, Copy, Check } from 'lucide-react';

const codeBlocks = [
  {
    title: "Install Anylayer SDK",
    code: "npm install @anylayer/sdk",
    language: "bash"
  },
  {
    title: "Initialize And Get User Score",
    code: `import { Anylayer } from '@anylayer/sdk';

const anylayer = new Anylayer({
  apiKey: 'your-api-key',
  network: 'mainnet'
});

const userScore = await anylayer.getScore(userAddress);

// Use score for loan decisions
if (userScore.creditRating > 700) {
  enableUndercollateralizedLoan();
}`,
    language: "typescript"
  },
];

const CodeIntegration = () => {
  const [copiedIndex, setCopiedIndex] = useState<number | null>(null);

  const handleCopy = (code: string, index: number) => {
    navigator.clipboard.writeText(code);
    setCopiedIndex(index);
    setTimeout(() => setCopiedIndex(null), 2000);
  };

  return (
    <section id="integration" className="py-24 md:py-40 relative overflow-hidden bg-[#08080C]">
      {/* Animated Line Pattern Background */}
      <div className="absolute inset-0 pointer-events-none">
        <svg className="absolute inset-0 w-full h-full opacity-20" xmlns="http://www.w3.org/2000/svg">
          <defs>
            <linearGradient id="line-flow-gradient" x1="0%" y1="0%" x2="100%" y2="0%">
              <stop offset="0%" stopColor="transparent" />
              <stop offset="50%" stopColor="#A683FF" />
              <stop offset="100%" stopColor="transparent" />
            </linearGradient>
          </defs>
          
          {/* Vertical Lines Pattern */}
          {[...Array(15)].map((_, i) => (
            <motion.line
              key={`v-${i}`}
              x1={`${(i + 1) * 7.5}%`}
              y1="0"
              x2={`${(i + 1) * 7.5}%`}
              y2="100%"
              stroke="rgba(166,131,255,0.05)"
              strokeWidth="1"
            />
          ))}

          {/* Horizontal Lines Pattern */}
          {[...Array(10)].map((_, i) => (
            <motion.line
              key={`h-${i}`}
              x1="0"
              y1={`${(i + 1) * 10}%`}
              x2="100%"
              y2={`${(i + 1) * 10}%`}
              stroke="rgba(166,131,255,0.05)"
              strokeWidth="1"
            />
          ))}

          {/* Animated Flowing Lines */}
          <motion.path
            d="M 0 100 Q 250 150, 500 100 T 1000 100"
            fill="transparent"
            stroke="url(#line-flow-gradient)"
            strokeWidth="2"
            initial={{ pathLength: 0, pathOffset: 0 }}
            animate={{ 
              pathLength: [0.2, 0.5, 0.2],
              pathOffset: [0, 1]
            }}
            transition={{
              duration: 10,
              repeat: Infinity,
              ease: "linear"
            }}
            style={{ x: "-10%", y: "20%" }}
          />
          <motion.path
            d="M 0 300 Q 300 250, 600 300 T 1200 300"
            fill="transparent"
            stroke="url(#line-flow-gradient)"
            strokeWidth="2"
            initial={{ pathLength: 0, pathOffset: 0 }}
            animate={{ 
              pathLength: [0.1, 0.4, 0.1],
              pathOffset: [0, 1]
            }}
            transition={{
              duration: 15,
              repeat: Infinity,
              ease: "linear",
              delay: 2
            }}
            style={{ x: "5%", y: "50%" }}
          />
          <motion.path
            d="M 1000 800 Q 750 750, 500 800 T 0 800"
            fill="transparent"
            stroke="url(#line-flow-gradient)"
            strokeWidth="2"
            initial={{ pathLength: 0, pathOffset: 0 }}
            animate={{ 
              pathLength: [0.3, 0.6, 0.3],
              pathOffset: [0, -1]
            }}
            transition={{
              duration: 12,
              repeat: Infinity,
              ease: "linear"
            }}
            style={{ x: "-5%", y: "10%" }}
          />
        </svg>
      </div>

      <div className="px-6 max-w-screen-xl mx-auto relative z-10">
        <div className="grid grid-cols-1 lg:grid-cols-[1fr,1.2fr] gap-16 lg:gap-24 items-start">
          
          {/* Left Content */}
          <motion.div 
            initial={{ opacity: 0, x: -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
            className="lg:sticky lg:top-32"
          >
            <div className="mb-4 inline-flex items-center gap-2 rounded-full bg-white/5 border border-white/5 px-4 py-1.5">
              <span className="text-[10px] uppercase tracking-widest font-bold text-white/30">Developer Experience</span>
            </div>

            <h2 className="text-[2.5rem] md:text-[3.5rem] lg:text-[4.5rem] font-medium text-primaryText leading-[1.1] tracking-tighter mb-6">
              Build with <br />
              <span className="bg-gradient-to-r from-blueprimary to-lightblueprimary bg-clip-text text-transparent">
                Reputation
              </span>
            </h2>

            <p className="text-primaryText/40 text-base md:text-lg font-light leading-relaxed mb-10 max-w-sm">
              Anylayer's SDK makes it seamless to integrate reputation data into your dApp or protocol. In just a few lines of code, you can access wallet trust scores and request zk-proofs.
            </p>

            <div className="flex flex-wrap gap-5">
              <a
                href="https://docs.onzks.com"
                target="_blank"
                rel="noopener noreferrer"
                className="group flex items-center gap-4 text-primaryText/40 hover:text-primaryText transition-all"
              >
                <span className="text-sm uppercase tracking-widest font-semibold">Documentation</span>
                <div className="w-12 h-12 rounded-full border border-white/10 flex items-center justify-center group-hover:border-lightblueprimary/30 group-hover:bg-lightblueprimary/5 transition-all">
                  <Image src="/button-arrow.svg" alt="arrow" width={14} height={14} className="opacity-40 group-hover:opacity-100 group-hover:translate-x-1 transition-all" />
                </div>
              </a>
            </div>
          </motion.div>

          {/* Right Code Editor View */}
          <motion.div 
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="space-y-6"
          >
            {codeBlocks.map((block, index) => (
              <div
                key={index}
                className="relative group rounded-3xl bg-white/[0.03] border border-white/10 backdrop-blur-xl overflow-hidden shadow-2xl transition-all duration-500 hover:border-white/20"
              >
                {/* Editor Header */}
                <div className="flex items-center justify-between px-6 py-4 bg-white/[0.05] border-b border-white/5">
                  <div className="flex items-center gap-3">
                    <div className="flex gap-1.5">
                      <div className="w-2.5 h-2.5 rounded-full bg-red-500/50" />
                      <div className="w-2.5 h-2.5 rounded-full bg-yellow-500/50" />
                      <div className="w-2.5 h-2.5 rounded-full bg-green-500/50" />
                    </div>
                    <div className="w-px h-4 bg-white/10 mx-2" />
                    <div className="flex items-center gap-2 text-primaryText/40 text-sm font-mono">
                      <Terminal className="w-3.5 h-3.5" />
                      {block.title}
                    </div>
                  </div>

                  <button
                    onClick={() => handleCopy(block.code, index)}
                    className="p-2 rounded-xl bg-white/5 hover:bg-white/10 transition-all text-primaryText/40 hover:text-primaryText"
                  >
                    {copiedIndex === index ? (
                      <Check className="w-4 h-4 text-green-400" />
                    ) : (
                      <Copy className="w-4 h-4" />
                    )}
                  </button>
                </div>

                {/* Code Body */}
                <div className="p-6 overflow-x-auto custom-scrollbar">
                  <pre className="font-mono text-sm md:text-base leading-relaxed">
                    <code className="text-primaryText/80">
                      {block.code.split('\n').map((line, i) => {
                        if (line.startsWith('import')) return <div key={i}><span className="text-lightblueprimary">import</span>{line.slice(6)}</div>;
                        if (line.startsWith('const')) return <div key={i}><span className="text-blueprimary">const</span>{line.slice(5)}</div>;
                        if (line.includes('//')) return <div key={i} className="text-primaryText/30 italic">{line}</div>;
                        return <div key={i}>{line}</div>;
                      })}
                    </code>
                  </pre>
                </div>

                {/* Bottom Glow */}
                <div className="absolute bottom-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-lightblueprimary/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity" />
              </div>
            ))}
          </motion.div>

        </div>
      </div>
    </section>
  );
};

export default CodeIntegration;
