'use client';

import '@/styles/globals.scss';
import React from 'react';
import { ReactNode } from 'react';
import { ToastContainer } from 'react-toastify';
import Head from 'next/head';
import { Navbar } from '@/components/Navbar/Navbar';
import Footer from '@/components/Footer';
import { SessionProvider } from 'next-auth/react';

interface IProps {
  children: ReactNode;
}
export default function RootLayout({ children }: IProps) {
  return (
    <html lang="en" className="dark">
      <body>
        <div className="h-screen">
          <Head>
            <title>CoinFella</title>
            <meta name="description" content="Pay in fiat, receive crypto." />
            <link rel="icon" href="/favicon.ico" />
          </Head>
          <SessionProvider>
            <Navbar />
            <div>{children}</div>
          </SessionProvider>
          <Footer />
        </div>
        <ToastContainer position="bottom-right" />
      </body>
    </html>
  );
}
