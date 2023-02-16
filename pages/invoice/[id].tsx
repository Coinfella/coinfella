import type { NextPage } from "next";
import Head from "next/head";
import Image from "next/image";
import styles from "../../styles/Pay.module.css";
import { TextInput, NumberInput, Button, Input } from "@mantine/core";
import { useForm } from "@mantine/form";
import { IconAlertTriangle } from "@tabler/icons";
import axios from "axios";
import {
  createStyles,
  Menu,
  Center,
  Header,
  Container,
  Group,
  Burger,
  Grid,
  Card,
} from "@mantine/core";
import OnramperWidget from "@onramper/widget";
import invoice from "../api/auth/lib/model/invoice";
import { lazy, useCallback, useEffect, useMemo, useState } from "react";
import { useSession, signIn, signOut } from "next-auth/react";
import { useRouter } from "next/router";
import dynamic from "next/dynamic";
import { setNestedObjectValues } from "formik";
import React from "react";
const DynamicOnramper = dynamic(
  () => import("../../app/components/DynamicOnramper"),
  { ssr: false }
);

const Pay: NextPage = () => {
  const { data: session, status } = useSession();
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [payerEmail, setPayerEmail] = useState("");
  const [amount, setAmount] = useState("");
  const [walletAddress, setWalletAddress] = useState("");
  const [preferredCrypto, setPreferredCrypto] = useState("");
  const [category, setCategory] = useState("");
  const [invoice, setInvoice] = useState();

  const router = useRouter();
  const { id } = router.query;

  const form = useForm({
    initialValues: {
      email: "",
      walletAddress: "",
      crypto: "",
      amount: 0,
    },

    validate: {
      email: (value) => (/^\S+@\S+$/.test(value) ? null : "Invalid email"),
    },
  });

  useEffect(() => {
    if (!router.isReady) return;
    let OnramperWidget;
    if (typeof window !== "undefined") {
      OnramperWidget = lazy(() => import("@onramper/widget"));
    }
    if (id) {
      console.log(id);
      if (!invoice) {
        getInvoice();
      }
    }
    if (invoice) {
      console.log(invoice);
    }
  }, [
    invoice,
    amount,
    preferredCrypto,
    walletAddress,
    router.isReady,
    router.query.id,
  ]);

  const getInvoice = async () => {
    if (id) {
      console.log(id);
      const res = await axios
        .get("/api/getInvoice?invoiceId=" + id, {
          headers: {
            Accept: "application/json",
            "Content-Type": "application/json",
          },
        })
        .then(async (response) => {
          setInvoice(response.data.data);
          setAmount(response.data.data.amount);
          setPreferredCrypto(response.data.data.preferredCrypto);
          setWalletAddress(response.data.data.walletAddress);
        })
        .catch((error) => {
          console.log(error);
        });
      console.log(res);
    }
  };

  return (
    <>
      {session && invoice && amount && preferredCrypto && walletAddress && (
        <div className={styles.container}>
          <Grid className={styles.payContainer}>
            <Grid.Col md={3}></Grid.Col>
            <Grid.Col
              sm={12}
              md={6}>
              <DynamicOnramper
                amount={amount}
                preferredCrypto={preferredCrypto}
                walletAddress={walletAddress}
              />
            </Grid.Col>
            <Grid.Col md={3}></Grid.Col>
          </Grid>
        </div>
      )}
    </>
  );
};

export default Pay;
