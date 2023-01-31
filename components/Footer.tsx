import Image from "next/image";
import Link from "next/link";
import React from "react";
import { DISCORD_ICON, TWITTER_ICON } from "../utils/assets";

const Footer = () => {
  return (
    <footer className="mx-auto max-w-6xl px-10 pb-20">
      <div className="grid grid-cols-1 sm:grid-cols-2">
        <div className="max-w-md">
          <div className="relative left-0 h-28 w-full max-w-[200px]">
            <Image objectFit="contain" layout="fill" src="/logo.png" />
          </div>
          <div className="text-xl text-gray-400">
            The easiest way to get paid crypto. Onboarding the next wave of
            people in to web3.
          </div>
          <div className="mt-10 flex gap-5">
            <div className="relative">
              <Image
                height={30}
                width={30}
                objectFit="contain"
                src={TWITTER_ICON}
              />
            </div>
            <div className="relative">
              <Image
                height={30}
                width={30}
                objectFit="contain"
                src={DISCORD_ICON}
              />
            </div>
          </div>
        </div>
        <div className="grid  grid-cols-1 sm:grid-cols-3">
          <div className="flex max-w-md flex-col gap-10 pt-10">
            <div className="text-xl font-bold">Get Started</div>
            <div className="flex flex-col gap-3 text-gray-400">
              <Link href="/#features">Features</Link>
              <Link href="/faq">FAQ</Link>
            </div>
          </div>

          <div className="flex max-w-md flex-col gap-10 pt-10">
            <div className="text-xl font-bold">Resources</div>
            <div className="flex flex-col gap-3 text-gray-400">
              <Link href="/#">What is an on ramp?</Link>
              <Link href="/#">What are crypto wallets?</Link>
              <Link href="/#">How to stay safe</Link>
            </div>
          </div>
          <div className="flex max-w-md flex-col gap-10 pt-10 sm:pl-14">
            <div className="text-xl font-bold">Socials</div>
            <div className="flex flex-col gap-3 text-gray-400">
              <Link href="/#">Discord</Link>
              <Link href="/#">Twitter</Link>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
};
export default Footer;
