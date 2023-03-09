import { publicAuthOptions } from '@/lib/publicAuthOptions';
import '@/styles/globals.scss';
import { getServerSession } from 'next-auth';
import { redirect } from 'next/navigation';
import React from 'react';
import { ReactNode } from 'react';
import AuthContext from '@/components/AuthContext';
import { ClientToastContainer } from '@/components/ClientToastContainer';

import ClientSidebar from '@/components/ClientSidebar';
import Navbar from './components/Navbar';
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
      <body className="flex min-h-screen flex-col flex-wrap overflow-hidden">
        <AuthContext>
          <Navbar />
          <div className="overflow-hidden md:flex">
            <ClientSidebar />
            <div className="w-full flex-grow overflow-y-auto bg-[#1A1A1A] pb-16 md:pb-0">
              {children}
            </div>
          </div>
          <ClientToastContainer />
        </AuthContext>
      </body>
    </html>
  );
}
