'use client';

import '@/styles/globals.scss';
import React from 'react';
import { ReactNode } from 'react';
import { ToastContainer } from 'react-toastify';
import Head from 'next/head';
import { Navbar } from '@/components/Navbar';
import Footer from '@/components/Footer';

interface IProps {
  children: ReactNode;
}
export default function RootLayout({ children }: IProps) {
  return (
    <html lang="en">
      <body>
        <div className="h-screen">
          <Head>
            <title>CoinFella</title>
            <meta name="description" content="Pay in fiat, receive crypto." />
            <link rel="icon" href="/favicon.ico" />
          </Head>

          <Navbar />
          <div>{children}</div>
          <Footer />
        </div>
        <ToastContainer position="bottom-right" />
      </body>
    </html>
  );
}
