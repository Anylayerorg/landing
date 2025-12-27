import { motion } from 'framer-motion';
import Image from 'next/image';
import { useState } from 'react';

const codeBlocks = [
  {
    title: "Install Anylayer SDK",
    code: "Install anylayer-sdk",
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
  },
  // Add more code blocks here as needed
];

const CodeIntegration = () => {
    const [copiedIndex, setCopiedIndex] = useState<number | null>(null);

    const handleCopy = (code: string, index: number | null) => {
    navigator.clipboard.writeText(code);
    setCopiedIndex(index);
    setTimeout(() => setCopiedIndex(null), 2000);
  };
  return (
    <section
        id="integration"
        className="py-10 md:py-20 relative"
      >
        {/* <div className='bg-[radial-gradient(circle_at_50%_75%,#a683ff3d,transparent)] h-screen w-[500px] absolute top-0' /> */}
        <div className="px-5 max-w-screen-xl mx-auto">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 items-center">
            {/* Left Side */}
            <div>
              <motion.div
                initial={{ opacity: 0, y: 50 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ amount: 0.2 }}
                transition={{ duration: 0.6, delay: 0.2 }}
                className="max-w-[32.25rem]"
              >
                <div className="mb-3 inline-flex items-center justify-center gap-3 rounded-full bg-white/5 px-6 py-3">
                  <span className="text-sm text-white/50">Developers</span>
                </div>
                <h2 className="text-[1.5rem] md:text-[1.875rem] lg:text-[3.25rem] font-medium text-primaryText mb-6 leading-tight tracking-tighter">
                  Easy Integration With{" "}
                  <span className="bg-gradient-to-r from-blueprimary to-lightblueprimary bg-clip-text text-transparent">
                    Anylayer
                  </span>{" "}
                  SDK/API
                </h2>
                <p className="text-primaryText/60 text-base">
                  ZKScore’s SDK makes it seamless to integrate reputation data
                  into your dApp or protocol. In just a few lines of code, you
                  can access wallet trustscores, request zk-proofs, and tailor
                  experiences for users based on verified credibility.
                </p>

                <a
                  href="https://docs.onzks.com"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="bg-gradient-to-r from-blueprimary to-lightblueprimary text-primaryText font-medium px-8 py-2.5 rounded-lg transition-all duration-300 transform hover:scale-105 mt-4 md:mt-14 inline-flex items-center justify-center gap-2 lg:gap-3"
                >
                  <span>Build with Anylayer</span> 
                  <Image src="/button-arrow.svg" alt="launch app" width="14" height="14" className="w-3 h-3 lg:w-[14px] lg:h-[14px]" />
                </a>
              </motion.div>
            </div>
            {/* Right Side Code Editor */}
            <div className="codeBlock">
              {codeBlocks.map((block, index) => (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, y: 50 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ amount: 0.2 }}
                  transition={{ duration: 0.6, delay: 0.3 }}
                  className={`relative border rounded-lg border-[#ffffff1a] ${
                    index < codeBlocks.length - 1 ? "mb-6" : ""
                  }`}
                >
                  {/* Header with title and copy button */}
                  <div className="flex items-center justify-between bg-gradient-to-b from-[#413D57]/15 to-transparent px-6 py-3">
                    <h2 className="text-primaryText text-xl font-medium">
                      {block.title}
                    </h2>
                    <button
                      onClick={() => handleCopy(block.code, index)}
                      className="p-2 hover:bg-white/5  rounded-lg transition-colors flex-shrink-0"
                      aria-label="Copy to clipboard"
                    >
                      {copiedIndex === index ? (
                        <svg
                          className="w-5 h-5 text-[#E3E8FF]/60"
                          fill="none"
                          stroke="currentColor"
                          viewBox="0 0 24 24"
                        >
                          <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            strokeWidth={2}
                            d="M5 13l4 4L19 7"
                          />
                        </svg>
                      ) : (
                        <svg
                          className="w-5 h-5 text-gray-400 hover:text-white transition-colors"
                          fill="none"
                          stroke="currentColor"
                          viewBox="0 0 24 24"
                        >
                          <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            strokeWidth={2}
                            d="M8 16H6a2 2 0 01-2-2V6a2 2 0 012-2h8a2 2 0 012 2v2m-6 12h8a2 2 0 002-2v-8a2 2 0 00-2-2h-8a2 2 0 00-2 2v8a2 2 0 002 2z"
                          />
                        </svg>
                      )}
                    </button>
                  </div>

                  {/* Code content */}
                  <pre className="text-[#A683FF] bg-gradient-to-b from-[#413D57]/15 to-transparent text-sm font-mono overflow-x-auto leading-relaxed px-6 py-3">
                    {block.code}
                  </pre>
                </motion.div>
              ))}
            </div>
          </div>
        </div>
      </section>
  )
}

export default CodeIntegration