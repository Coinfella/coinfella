import type { NextPage } from "next";
import Link from "next/link";
import Head from "next/head";
import Image from "next/image";
import styles from "../styles/Home.module.css";
import { useEffect } from "react";
import {
  createStyles,
  Menu,
  Center,
  Header,
  Container,
  Group,
  Button,
  Burger,
  Grid,
} from "@mantine/core";
import { TwitterIcon, DiscordIcon } from "@mantine/ds";
import { motion, useAnimation } from "framer-motion";
import { useInView } from "react-intersection-observer";
import React from "react";

const Home: NextPage = () => {
  const { ref, inView } = useInView();
  const animation = useAnimation();

  useEffect(() => {
    console.log("use effect , inView = ", inView);
    if (inView) {
      animation.start({
        x: 0,
        transition: {
          type: "spring",
          duration: 1,
          bounce: 0.3,
        },
      });
    } else {
      animation.start({
        x: "-100vw",
      });
    }
  }, [inView]);

  return (
    <div className={styles.container}>
      <main className={styles.main}>
        <div className={styles.landing}>
          <motion.div
            initial='hidden'
            animate='visible'
            variants={{
              hidden: {
                scale: 0.3,
                opacity: 0,
              },
              visible: {
                scale: 1,
                opacity: 1,
                transition: {
                  delay: 1,
                },
              },
            }}>
            <h1 className={styles.title}>Welcome to</h1>

            <p className={styles.description}>Pay in fiat, receive crypto.</p>
          </motion.div>
        </div>
        <div
          className={styles.about}
          id='About'
          ref={ref}>
          <motion.div animate={animation}>
            <div style={{ height: "100vh" }}>
              <h1 className={styles.title}>Why Coinfella?</h1>
              <p className={styles.descriptionAbout}>
                To buy and send crypto, you currently either need a Crypto
                Wallet like Metamask, and Phantom, or you need an account on an
                exchange like Crypto.com or Coinbase. On CoinFella you can
                create an account with your email, and pay your Crypto invoices
                or make a one time payment.
              </p>
              <p
                className={styles.descriptionAbout}
                style={{ marginBottom: "5%" }}>
                Freelancers have little access to tools that allow customers to
                pay them in crypto. CoinFella will allow Web3 freelancers to get
                paid in their desired coin easily.
              </p>
            </div>
          </motion.div>

          <div
            className={styles.grid}
            id='features'>
            <div className={styles.card}>
              <h2>Create Invoices</h2>
              <img
                src='invoice.png'
                className={styles.imgs}></img>
              <p>
                With CoinFella you can create invoices and specify the Crypto
                you desire for payment, and a you will receive a link with a
                payment wall for the payee.
              </p>
            </div>

            <div className={styles.card}>
              <h2>Pay Web3 Invoices in Fiat</h2>
              <img
                src='CARD.png'
                className={styles.imgs}></img>
              <p>
                As the Payee, you will receive an e-mail with a link where you
                can seemlessly pay your bill with your credit card, and all the
                token swapping is handled behind the scenes.
              </p>
            </div>

            <div className={styles.card}>
              <h2>Fiat to Crypto</h2>
              <img
                src='payment.png'
                className={styles.imgs}></img>
              <p>
                Send a One Time Crypto Payment with your Credit Card. CoinFella
                swaps your Fiat for the Crypto that the Biller desires to be
                paid in.
              </p>
            </div>
          </div>
        </div>
        <div className={styles.callToAction}>
          <h2>Keep up with us.</h2>
          <Link
            href='https://twitter.com/'
            target='_blank'>
            <TwitterIcon
              size={25}
              style={{ marginRight: "20px" }}></TwitterIcon>
          </Link>
        </div>
      </main>
    </div>
  );
};

export default Home;
