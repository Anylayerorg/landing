import Image from 'next/image';
import { useState } from 'react';
import { motion } from 'framer-motion';
import { Terminal, Copy, Check, Code2 } from 'lucide-react';

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
    <section id="integration" className="py-24 md:py-40 relative overflow-hidden">
      {/* Mesh Gradient Backgrounds */}
      <div className="absolute top-1/2 left-0 -translate-y-1/2 w-[500px] h-[500px] bg-blueprimary/5 blur-[120px] rounded-full pointer-events-none" />
      <div className="absolute top-0 right-0 w-[400px] h-[400px] bg-lightblueprimary/5 blur-[100px] rounded-full pointer-events-none" />

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
            <div className="mb-6 inline-flex items-center gap-2 rounded-full bg-white/5 border border-white/10 px-5 py-2">
              <Code2 className="w-4 h-4 text-lightblueprimary" />
              <span className="text-xs uppercase tracking-[0.2em] font-bold text-white/50">Developer First</span>
            </div>

            <h2 className="text-[2.5rem] md:text-[4rem] font-medium text-primaryText mb-8 leading-[1.1] tracking-tighter">
              Build with <br />
              <span className="bg-gradient-to-r from-blueprimary to-lightblueprimary bg-clip-text text-transparent italic">
                Reputation
              </span>
            </h2>

            <p className="text-primaryText/40 text-lg md:text-xl font-light leading-relaxed mb-10 max-w-lg">
              Anylayer’s SDK makes it seamless to integrate reputation data into your dApp or protocol. 
              In just a few lines of code, you can access wallet trust scores and request zk-proofs.
            </p>

            <a
              href="https://docs.onzks.com"
              target="_blank"
              rel="noopener noreferrer"
              className="group relative inline-flex items-center gap-3 bg-white text-black font-bold px-8 py-4 rounded-2xl overflow-hidden transition-all duration-300 hover:bg-lightblueprimary hover:text-white"
            >
              <span>Build with Anylayer</span>
              <Image src="/button-arrow.svg" alt="arrow" width={14} height={14} className="group-hover:translate-x-1 transition-transform" />
            </a>
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
                        // Very simple mock syntax highlighting
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
