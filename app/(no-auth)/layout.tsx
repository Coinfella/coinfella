import '@/styles/globals.scss';
import React from 'react';
import { ReactNode } from 'react';
import AuthContext from '@/components/AuthContext';
import { ClientToastContainer } from '@/components/ClientToastContainer';
interface IProps {
  children: ReactNode;
}
export default async function RootLayout({ children }: IProps) {
  return (
    <html lang="en" className='dark'>
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
