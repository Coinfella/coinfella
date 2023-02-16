import React from "react";
import Head from "next/head";
import { FCC } from "../../utils/types";
import Footer from "./Footer";
import { Navbar } from "./Navbar";

const Layout: FCC = ({ children }) => {
  return (
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
  );
};
export default Layout;
