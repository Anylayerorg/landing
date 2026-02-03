import Image from 'next/image';
import React from 'react'
import Marquee from "react-fast-marquee";
import { cn } from '@/lib/utils';

const partners = [
  { name: "Ethereum", logo: "/ethereum.svg" },
  { name: "Google Cloud", logo: "/google-cloud.svg" },
  { name: "Infura", logo: "/infura.svg" },
  { name: "Alchemy", logo: "/alchemy.svg" },
  { name: "Base", logo: "/base.svg" },
  { name: "BNB Chain", logo: "/bnb-chain.svg" },
  { name: "Hyper EVM", logo: "/hyper-evm.svg" },
  // Add more partners as needed
];

const ClientsLogo = ({ className }: { className?: string }) => {
  return (
    <section className={cn("relative text-white py-11 overflow-hidden", className)}>

      <div className="relative max-w-screen-xl mx-auto px-5">
        {/* Marquee Slider */}
        <Marquee
          // gradient={true}
          // gradientColor="#0C0C11"
          // gradientWidth={100}
          speed={40}
          pauseOnHover={true}
        >
          {partners.map((partner, index) => (
            <div
              key={index}
              className="mx-8 md:mx-12 flex items-center justify-center"
            >
              <Image
                src={partner.logo}
                alt={partner.name}
                width={130}
                height={32}
                className="hover:opacity-60 transition-opacity duration-300"
                loading='lazy'
              />
            </div>
          ))}
        </Marquee>
      </div>
    </section>
  )
}

export default ClientsLogo