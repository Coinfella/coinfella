import { authOptions } from '@/lib/auth';
import '@/styles/globals.scss';
import { getServerSession } from 'next-auth';
import React from 'react';
import { ReactNode } from 'react';
import AuthContext from './AuthContext';
import AuthGuard from './AuthGuard';
import { ClientToastContainer } from './ClientToastContainer';
interface IProps {
  children: ReactNode;
}
export default async function RootLayout({ children }: IProps) {
  const session = await getServerSession(authOptions);
  console.log(session);

  return (
    <html lang="en">
      {/* <Head>
        <title>Coin Fella</title>
      </Head> */}
      <body>
        <AuthContext>
          {/* {children} */}
          {/* <AuthGuard/> */}
          <ClientToastContainer />
        </AuthContext>
      </body>
    </html>
  );
}
