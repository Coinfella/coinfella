import type { NextPage } from 'next'
import Link from 'next/link';
import Head from 'next/head'
import Image from 'next/image'
import styles from '../styles/Home.module.css'
import {
    createStyles,
    Menu,
    Center,
    Header,
    Container,
    Group,
    Burger,
    Grid, Input, 
    Card,
    Button, Text, Box, Alert
  } from '@mantine/core';
import Router from "next/router";
import { Field, Form, Formik } from "formik";
import { TextInput, NumberInput, StylesApiProvider } from '@mantine/core';
import { useForm } from '@mantine/form';
import { CgProfile } from 'react-icons/cg';
import {FiEdit2} from 'react-icons/fi'
import {useSession ,signIn, signOut} from 'next-auth/react';
import { userAgent } from 'next/server';
import { useCallback, useEffect, useMemo, useState } from 'react';
import axios from "axios";
import React from 'react';
import { IconMathIntegral } from '@tabler/icons';

const Invoicing: NextPage = () => {
    const {data:session, status} = useSession();
    const [username, setUsername] = useState("");
    const [email, setEmail] = useState("");
    const [payerEmail, setPayerEmail] = useState("");
    const [amount, setAmount] = useState("");
    const [walletAddress, setWalletAddress] = useState("");
    const [preferredCrypto, setPreferredCrypto] = useState("");
    const [category, setCategory] = useState("");
    const [alert, setAlert] = useState("");
    const [success, setSuccess] = useState("");

    const handleSignOut = () => signOut({redirect: false, callbackUrl: '/'});

    const formSubmit = (actions: any) => {
        actions.setSubmitting(false);
        createInvoice();
      };

      const redirectToHome = () => {
        const { pathname } = Router;
        if (pathname === "/create") {
          // TODO: redirect to a success register page
          Router.push("/invoicing");
        }
      };

      useEffect(() => {
        if(session && session.user){
            console.log(session);
            if(session.user.name && session.user.email){
                setUsername(session.user.name);
                setEmail(session.user.email);

                console.log('set username and email')
            }
          }
      }, [session]);

  const createInvoice = async () => {
    console.log({username, email, payerEmail, walletAddress, preferredCrypto, category, amount});
    if(username && email){

        const res = await axios
        .post(
            "/api/createInvoice",
            { username, email, payerEmail, walletAddress, preferredCrypto, category, amount},
            {
            headers: {
                Accept: "application/json",
                "Content-Type": "application/json",
            },
            }
        )
        .then(async (res) => {
            setSuccess("successfully created invoice");
            redirectToHome();
        })
        .catch((error) => {
            console.log(error);
            setAlert(error);
        });
        console.log(res);
    }
  };

  return (
    <>
        {session && session.user && session.user.name && session.user.email && 
        <div className={styles.container} style={{minHeight:"85vh"}}>
        <Grid>
            <Grid.Col sm={3}><h1 style={{marginLeft:"2%"}}>Create an Invoice</h1></Grid.Col>
            <Grid.Col sm={9}></Grid.Col>
        </Grid>
        <hr></hr>
        <Grid>
             <Grid.Col sm={3}></Grid.Col>
            <Grid.Col sm={6}>
                <Formik
                    initialValues={{}} // { email: "", password: "" }
                    validateOnChange={false}
                    validateOnBlur={false}
                    onSubmit={(_, actions) => {
                    formSubmit(actions);
                    }}
                >
                    {(props) => (
                    <Form style={{ width: "100%" }}>
                        <Box mb={4}>
                        <Field name="payerEmail">
                            {() => (
                            <>
                                <Text>Payer Email:</Text>
                                <Input
                                value={payerEmail}
                                onChange={(e:any) => setPayerEmail(e.target.value)}
                                placeholder={"Payer Email"}
                                />
                            </>
                            )}
                        </Field>
                        <Field name="walletAddress">
                            {() => (
                            <>
                                <Text>Wallet Address:</Text>
                                <Input
                                value={walletAddress}
                                onChange={(e:any) => setWalletAddress(e.target.value)}
                                placeholder={"Wallet Address"}
                                />
                            </>
                            )}
                        </Field>
                        <Field name="category">
                            {() => (
                            <>
                                <Text>Category:</Text>
                                <Input
                                value={category}
                                onChange={(e:any) => setCategory(e.target.value)}
                                placeholder={"Category"}
                                />
                            </>
                            )}
                        </Field>
                        <Field name="preferredCrypto">
                            {() => (
                            <>
                                <Text>Preferred Crypto:</Text>
                                <Input
                                value={preferredCrypto}
                                onChange={(e:any) => setPreferredCrypto(e.target.value)}
                                placeholder={"Preferred Crypto"}
                                />
                            </>
                            )}
                        </Field>
                        <Field name="amount">
                            {() => (
                            <>
                                <Text>Amount:</Text>
                                <Input
                                value={amount}
                                onChange={(e:any) => setAmount(e.target.value)}
                                placeholder={"Amount"}
                                />
                            </>
                            )}
                        </Field>
                        <Button type="submit" style={{margin:"2% 40%"}}>Create<FiEdit2 style={{marginLeft:"5px"}}/></Button>
                        </Box>
                    </Form>
                    )}
                </Formik>
                 {alert && <Alert color={"red"} style={{marginTop:"5%"}}>{alert}</Alert>}
                {success && <Alert color={"green"} style={{marginTop:"5%"}}>{success}</Alert>}
                <br></br>
                <Button color="red" style={{margin:"15% 37%", marginTop:"300px"}} onClick={handleSignOut}>Log Out</Button>
            </Grid.Col>
            <Grid.Col sm={3}></Grid.Col>
        </Grid>
        </div>
    }
    </>
  )
}

export default Invoicing
