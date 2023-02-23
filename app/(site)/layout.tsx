'use client';
//TODO: fix layout to server component
import '@/styles/globals.scss';
import React from 'react';
import { SessionProvider } from 'next-auth/react';
import { ReactNode } from 'react';
import { ToastContainer } from 'react-toastify';
import Head from 'next/head';

interface IProps {
  children: ReactNode;
}
export default function RootLayout({ children }: IProps) {
  return (
    <html lang="en">
      <Head>
        <title>Coin Fella</title>
      </Head>
      <body>
        <SessionProvider>
          {children}
          <ToastContainer position="bottom-right" />
        </SessionProvider>
      </body>
    </html>
  );
}
