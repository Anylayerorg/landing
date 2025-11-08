import Image from 'next/image';
import React from 'react'
import Marquee from "react-fast-marquee";

const partners = [
    { name: "Ethereum", logo: "/ethereum.png" },
    { name: "Google Cloud", logo: "/google-cloud.png" },
    { name: "Infura", logo: "/infura.png" },
    { name: "Alchemy", logo: "/alchemy.png" },
    { name: "Base", logo: "/base.png" },
    { name: "BNB Chain", logo: "/bnb-chain.png" },
    { name: "Hyper EVM", logo: "/hyper-evm.svg" },
    // Add more partners as needed
];

const ClientsLogo = () => {
  return (
    <section className="relative text-white py-11 overflow-hidden">

      <div className="relative max-w-screen-xl mx-auto px-5">
        {/* Marquee Slider */}
        <Marquee
          gradient={true}
          gradientColor="#000000"
          gradientWidth={100}
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
                className="hover:opacity-60 transition-opacity duration-300 grayscale hover:grayscale-0"
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