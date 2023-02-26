'use client';

import '@/styles/globals.scss';
import { SessionProvider } from 'next-auth/react';
import Image from 'next/image';
import { ReactNode } from 'react';
import { ToastContainer } from 'react-toastify';
import { DISCORD_ICON, SIGN_IN, TWITTER_ICON } from '@/lib/assets';

interface IProps {
  children: ReactNode;
}
export default function RootLayout({ children }: IProps) {
  return (
    <html lang="en">
      <body>
        <SessionProvider>
          <div className="flex h-screen">
            <div className="hidden flex-1 flex-col bg-gradient-to-tr from-primary to-[#E3D0FC] md:flex">
              <div className="ml-12 mt-[100px]">
                <div className=" text-3xl font-bold">Welcome back fella!</div>
                <div className="mt-4 text-4xl font-bold leading-tight">
                  Make sure to follow our twitter
                  <br />
                  and join our discord community!
                </div>
              </div>
              <div className="mx-auto mt-[71px] flex justify-center gap-8">
                <Image src={DISCORD_ICON} alt="" width={85} height={65} />
                <Image src={TWITTER_ICON} alt="" width={85} height={65} />
              </div>
              <div className="mt-auto flex justify-center">
                <Image src={SIGN_IN} alt="" width={600} />
              </div>
            </div>
            <div className="flex-1">{children}</div>
          </div>
          <ToastContainer position="bottom-right" />
        </SessionProvider>
      </body>
    </html>
  );
}
