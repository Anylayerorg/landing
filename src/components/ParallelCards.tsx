import { Activity, BarChart3, Briefcase, DollarSign, Fingerprint, GraduationCap, Target, TrendingUp, User, Users, Wallet } from 'lucide-react';
import { motion } from 'framer-motion';
import Image from 'next/image';

const humainWalletAiSection = [
  {
    id: 1,
    title: "Human identity signals",
    description:
      "Evaluates how trustworthy a blockchain wallet is—based entirely on on-chain patterns, behavior, risk signals, and historical performance.",

    image: '/human-identity.svg',
    signals: [
      { icon: Users },
      { icon: Briefcase },
      { icon: GraduationCap },
      { icon: User },
    ],
    features: [
      { number: "01", title: "HUMAN IDENTITY SIGNALS" },
      { number: "02", title: "WALLET ACTIVITY ROTATION" },
      { number: "03", title: "AI VERIFIED BEHAVIOR" },
    ],
  },
  {
    id: 2,
    title: "Wallet activity rotation",
    description: [
      "Evaluates how trustworthy a blockchain wallet is—based entirely on on-chain patterns, behavior, risk signals, and historical performance.",
    ],
    image: '/wallet-activity.svg',
    signals: [
      { icon: Activity, label: "Activity" },
      { icon: TrendingUp, label: "Trading" },
      { icon: DollarSign, label: "Transactions" },
      { icon: Target, label: "DeFi" },
    ],
    features: [
      { number: "01", title: "HUMAN IDENTITY SIGNALS" },
      { number: "02", title: "WALLET ACTIVITY ROTATION" },
      { number: "03", title: "AI VERIFIED BEHAVIOR" },
    ],
  },
  {
    id: 3,
    title: "AI verified behavior",
    description: [
      "Evaluates how trustworthy a blockchain wallet is—based entirely on on-chain patterns, behavior, risk signals, and historical performance.",
    ],
    image: '/ai-verified.svg',
    signals: [
      { icon: Activity, label: "Patterns" },
      { icon: Target, label: "Detection" },
      { icon: TrendingUp, label: "Analysis" },
      { icon: BarChart3, label: "Insights" },
    ],
    features: [
      { number: "01", title: "HUMAN IDENTITY SIGNALS" },
      { number: "02", title: "WALLET ACTIVITY ROTATION" },
      { number: "03", title: "AI VERIFIED BEHAVIOR" },
    ],
  },
];

const ParallelCards = () => {
  return (
    <section className="px-5 py-10 md:py-20 relative">
        {/* <div className='bg-gradient-to-t from-transparent via-[#5B6CDE]/60 to-transparent h-screen w-full sticky top-0' /> */}
        <div className="flex flex-wrap justify-between items-center gap-2 mb-20">
            <motion.div
              initial={{ opacity: 0, y: 50 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, amount: 0.2 }}
              transition={{ duration: 0.6, delay: 0.2 }}
              className="max-w-[47rem] mx-auto flex flex-wrap justify-center items-center"
            >
              <div className="mb-3 inline-flex items-center justify-center gap-3 rounded-full bg-white/5 px-6 py-3">
                <span className="text-sm text-white/50">Human, Wallet & AI Agent</span>
              </div>
              <h2 className="text-[1.5rem] md:text-[1.875rem] lg:text-[3.25rem] font-medium text-primaryText mb-6 leading-tight text-center">
                {" "}
                Three dimension of trust for the digital internet
              </h2>
              <p className="text-primaryText/60 text-base text-center px-10 max-w-[413px]">
                Trust becomes a reusable asset that follows users across applications and chains.
              </p>
            </motion.div>
          </div>
        {/* Updated Layout */}
        {humainWalletAiSection.map((section, sectionIndex) => {
          const ImageComponent = section.image;
          return (
            <div
              key={section.id}
              className="relative bg-[#121119] mt-5 rounded-[20px] h-[662px] py-16 px-10 overflow-hidden max-w-screen-xl mx-auto"
            >
              {/* Subtle grid pattern overlay */}
              {/* <div className="absolute inset-0 bg-[linear-gradient(rgba(99,102,241,0.03)_1px,transparent_1px),linear-gradient(90deg,rgba(99,102,241,0.03)_1px,transparent_1px)] bg-[size:64px_64px]"></div> */}

              <div className="relative h-full">
                <div className="grid lg:grid-cols-2 gap-16 items-center h-full">
                  {/* Left Side - Icon Visual */}
                  <div className="relative flex justify-center">
                    <Image src={ImageComponent} alt={section.title} width={300} height={300} className="w-72 h-72 md:w-full md:h-auto object-contain" />
                  </div>

                  {/* Right Side - Content */}
                  <div className="space-y-8 h-full flex justify-between flex-col">
                    <div>
                      <h2 className="text-xl md:text-[32px] font-medium text-primaryText leading-tight mb-6">
                        {section.title}
                      </h2>
                      <p className="text-primaryText/60 text-base leading-relaxed">
                        {section.description}
                      </p>
                      {/* Signal badges */}
                      <div className="flex flex-wrap gap-4 mt-14">
                        {section.signals.map((signal, index) => (
                          <signal.icon className="w-4 h-4 text-slate-400 group-hover:text-indigo-400 transition-colors" />
                        ))}
                      </div>
                    </div>

                    {/* Feature list */}
                    <div className="space-y-3 pt-8">
                      {section.features.map((feature, index) => (
                        <div
                          key={index}
                          className={`flex items-center gap-4 py-2 transition-all duration-300 ${
                            index === sectionIndex
                              ? "text-primaryText"
                              : "text-slate-500"
                          }`}
                        >
                          <span className="text-sm">
                            {feature.number}
                          </span>
                          <span className="text-sm">
                            {feature.title}
                          </span>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>
              </div>
            </div>
          );
        })}
      </section>
  )
}

export default ParallelCards