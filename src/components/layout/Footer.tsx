import React from 'react';
import Link from 'next/link';
import Image from "next/image";

const footerIcon = [
  {
    title: "Telegram",
    link: "https://t.me/zksnews#",
    icon: "/telegram.svg",
    iconWidth: 17,
    iconHeight: 14,
  },
  {
    title: "Discord",
    link: "https://discord.gg/ZmnsPMKgjw",
    icon: "/discord.svg",
    iconWidth: 16,
    iconHeight: 14,
  },
  {
    title: "Linkdin",
    link: "https://www.linkedin.com/company/anylayer",
    icon: "/linkedin.svg",
    iconWidth: 16,
    iconHeight: 16,
  },
  {
    title: "Twitter",
    link: "https://x.com/buildonzks",
    icon: "/twitter.svg",
    iconWidth: 13,
    iconHeight: 13,
  },
];

export function Footer() {
  return (
    <footer className="py-10 md:py-20">
        <div className="px-20 py-10 md:py-20 bg-[#121219] max-w-screen-xl mx-auto rounded-[24px]">
          <div className="flex justify-between flex-wrap gap-10">
            <div className="max-w-[538px] w-full">
              <div className="">
                <h3 className="text-[32px] text-primaryText font-medium mb-6 leading-snug">
                  Subscribe to the{" "}
                  <span className="bg-gradient-to-r from-blueprimary to-lightblueprimary bg-clip-text text-transparent">
                    Anylayer
                  </span>{" "}
                  Newsletter for trust, identity, and reputation updates.
                </h3>
                <p className="text-base text-primaryText opacity-70">
                  Get updates on trust scoring, identity, and on-chain
                  reputation. For educational content only.
                </p>
                <div
                  className="mt-28 mb-6 flex flex-wrap md:flex-nowrap justify-center items-center bg-[#101017] p-[6px] rounded-lg"
                  style={{
                    boxShadow: "inset 0 0 8px 0 rgba(255, 255, 255, 0.1)",
                  }}
                >
                  <input
                    type="email"
                    placeholder="Enter Your Email"
                    className="
                    bg-transparent 
                    w-[536px]
                    px-[20px]
                    py-4
                    md:py-0
                    text-primaryText 
                    placeholder:text-[#7a7a7a] 
                    outline-none 
                    border-none
                  "
                  />

                  <button className="bg-[#A683FF] w-full md:max-w-[181px] px-10 text-black flex items-center justify-center py-3 text-base rounded-md font-medium">
                    <span className="mr-2"> Subscribe</span>
                    {/* <svg
                      width="32"
                      height="32"
                      viewBox="0 0 24 24"
                      fill="none"
                      className="transition-transform duration-300 group-hover:translate-x-1 w-4 h-4 md:w-8 md:h-8"
                    >
                      <path
                        d="M5 12H19M19 12L12 5M19 12L12 19"
                        stroke="currentColor"
                        strokeWidth="2.5"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                      />
                    </svg> */}
                  </button>
                </div>
                <span className="text-[#E3E8FF66] ">
                  We’ll only use this for spam.
                </span>
                {/* social icons */}
              </div>
            </div>
            <div className="w-[490px] flex flex-wrap gap-4 md:gap-20">
              <div className="w-[261px] md:w-[261px]">
                <h3 className="font-medium text-2xl text-primaryText mb-6">
                  Solutions
                </h3>
                <ul className="space-y-2 list-none text-primaryText/60">
                  <li>Explore Solutions</li>
                  <li>Trust Analytics</li>
                  <li>Identity Signals</li>
                  <li>Wallet Reputation</li>
                </ul>
              </div>

              {/* ECOSYSTEM */}
              <div className="w-[170px] md:w-[149px]">
                <h3 className="font-medium text-2xl text-primaryText mb-6">
                  Ecosystem
                </h3>
                <ul className="space-y-2 text-primaryText/60 list-none">
                  <li>Explore Ecosystem</li>
                  <li>ZKScore Token</li>
                  <li>ZK DAO</li>
                  <li>Community</li>
                </ul>
              </div>

              {/* Resources */}
              <div className="w-[80px] md:w-[107px]">
                <h3 className="font-medium text-2xl text-primaryText mb-6">
                  Resources
                </h3>
                <ul className="space-y-2 list-none text-primaryText/60">
                  <li>Docs</li>
                  <li>Developers</li>
                  <li>Tutorials</li>
                  <li>Blogs</li>
                </ul>
              </div>
            </div>
          </div>
          {/* BOTTOM FOOTER */}
          <div className="flex justify-center md:justify-between flex-wrap mt-10 md:mt-20 gap-4 items-center text-[#E3E8FF66] opacity-70">
            <p className="text-base">Copyright 2025. All Rights Reserved.</p>
            <div className="flex items-center gap-3 ">
              {footerIcon.map((item) => (
                <a
                  href={item.link}
                  target="_blank"
                  className="flex items-center justify-center w-8 h-8 bg-[#E3E8FF0F] rounded-lg"
                >
                  <Image
                    src={item.icon}
                    alt="telegram"
                    width={item.iconWidth}
                    height={item.iconHeight}
                    className="invert"
                  />
                </a>
              ))}
            </div>

            <div className="flex gap-4 md:gap-8">
              <p>Privacy Policy</p>
              <p>Terms Of Services</p>
            </div>
          </div>
        </div>
      </footer>
  );
}
