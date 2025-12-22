import Image from 'next/image';
import React from 'react'
import Marquee from "react-fast-marquee";

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

const ClientsLogo = () => {
  return (
    <section className="relative text-white py-11 overflow-hidden">

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