"use client";

import "../../styles/globals.scss";
import React from "react";
import { SessionProvider } from "next-auth/react";
import { ReactNode } from "react";
import { ToastContainer } from "react-toastify";

interface IProps {
  children: ReactNode;
}
export default function RootLayout({ children }: IProps) {
  return (
    <html lang='en'>
      <body>
        <SessionProvider>
          {children}
          <ToastContainer position='bottom-right' />
        </SessionProvider>
      </body>
    </html>
  );
}
