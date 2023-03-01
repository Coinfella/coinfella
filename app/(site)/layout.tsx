import { publicAuthOptions } from '@/lib/publicAuthOptions';
import '@/styles/globals.scss';
import { getServerSession } from 'next-auth';
import Router, { redirect } from 'next/navigation';
import React from 'react';
import { ReactNode } from 'react';
import AuthContext from './AuthContext';
import { ClientToastContainer } from './ClientToastContainer';
interface IProps {
  children: ReactNode;
}
export default async function RootLayout({ children }: IProps) {
  const session = await getServerSession(publicAuthOptions);
  if (!session) {
    redirect('/');
  }

  return (
    <html lang="en">
      {/* <Head>
        <title>Coin Fella</title>
      </Head> */}
      <body>
        <AuthContext>
          {children}
          <ClientToastContainer />
        </AuthContext>
      </body>
    </html>
  );
}
