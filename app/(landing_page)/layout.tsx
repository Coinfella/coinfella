"use client";

import "../../styles/globals.scss";
import React from "react";
import { ReactNode } from "react";
import { ToastContainer } from "react-toastify";
import Layout from "../components/Layout";

interface IProps {
  children: ReactNode;
}
export default function RootLayout({ children }: IProps) {
  return (
    <html lang="en">
      <body>
        <Layout>{children}</Layout>
        <ToastContainer position="bottom-right" />
      </body>
    </html>
  );
}
