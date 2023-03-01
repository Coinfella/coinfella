import '@/styles/globals.scss';
import React from 'react';
import { ReactNode } from 'react';
import AuthContext from '../(site)/AuthContext';
import { ClientToastContainer } from '../(site)/ClientToastContainer';
interface IProps {
  children: ReactNode;
}
export default async function RootLayout({ children }: IProps) {
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
