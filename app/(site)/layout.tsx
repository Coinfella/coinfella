"use client";

import "../../styles/globals.scss";
import React from "react";
import { SessionProvider } from "next-auth/react";
import { ReactNode } from "react";
import { ToastContainer } from "react-toastify";
 import { getServerSession } from "next-auth";
import Layout from "../components/Layout";

interface IProps {
  children: ReactNode;
}
export default function RootLayout({ children }: IProps) {  
  
  return (
    <html lang="en">
      <body>
        <SessionProvider>
          <Layout>{children}</Layout>
          <ToastContainer position="bottom-right" />
        </SessionProvider>
      </body>
    </html>
  );
}
