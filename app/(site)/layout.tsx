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
      <body className="flex flex-1 flex-col overflow-hidden">
        <AuthContext>
          <Navbar />
          <div className="overflow-hidden md:flex">
            <ClientSidebar />
            <div className="min-h-screen flex-1 overflow-y-auto bg-[#1A1A1A] pb-20 md:pb-14">
              {children}
            </div>
          </div>
          <ClientToastContainer />
        </AuthContext>
      </body>
    </html>
  );
}
