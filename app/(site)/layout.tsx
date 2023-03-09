import { publicAuthOptions } from '@/lib/publicAuthOptions';
import '@/styles/globals.scss';
import { getServerSession } from 'next-auth';
import Router, { redirect } from 'next/navigation';
import React from 'react';
import { ReactNode } from 'react';
import AuthContext from '@/components/AuthContext';
import { ClientToastContainer } from '@/components/ClientToastContainer';
import { Navbar } from '@/components/Navbar/Navbar';
import Image from 'next/image';

import Link from 'next/link';
import Sidebar from '@/components/Sidebar/Sidebar';
interface IProps {
  children: ReactNode;
}

export default async function RootLayout({ children }: IProps) {
  const session = await getServerSession(publicAuthOptions);
  if (!session) {
    redirect('/');
  }

  return (
    <html lang="en" className="dark">
      {/* <Head>
        <title>Coin Fella</title>
      </Head> */}
      <body className="flex h-screen flex-col overflow-hidden">
        <AuthContext>
          <div className="flex h-[60px] items-center px-12">
            <div className="relative h-10 w-20 cursor-pointer ">
              <Image
                fill
                className=" object-contain"
                src="/logo.png"
                alt="logo"
              />
            </div>
          </div>
          <div className="flex overflow-hidden">
            <Sidebar />
            <div className="max-h-full w-full overflow-y-auto bg-[#1A1A1A]">
              {children}
            </div>
          </div>
          <ClientToastContainer />
        </AuthContext>
      </body>
    </html>
  );
}
