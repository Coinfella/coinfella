import type { NextPage } from 'next'
import Link from 'next/link';
import Head from 'next/head'
import Image from 'next/image'
import styles from '@/styles/Home.module.css'
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
import AxiosResponse from "axios";

const Invoicing: NextPage = () => {
    const {data:session, status} = useSession();
    const [editProfile, setEditProfile] = useState(false);
    const [username, setUsername] = useState("");
    const [email, setEmail] = useState("");
    const [walletAddress, setWalletAddress] = useState("");
    const [preferredCrypto, setPreferredCrypto] = useState("");
    const [category, setCategory] = useState("");
    const [alert, setAlert] = useState("");
    const [invoices, setInvoices] = useState<any[]>([]);

    const handleSignOut = () => signOut({redirect: false, callbackUrl: '/'});
    const handleEditPressed= () => {setEditProfile(true)};

    if(editProfile){
        console.log(editProfile)
    }

    const formSubmit = (actions: any) => {
        actions.setSubmitting(false);
        editUser();
      };

      const redirectToHome = () => {
        const { pathname } = Router;
        if (pathname === "/auth") {
          // TODO: redirect to a success register page
          Router.push("/");
        }
      };

      const getInvoices = async() => {
        if(session?.user?.email){
             const res = await axios
            .get(
                "/api/getInvoices?userEmail="+session.user.email,
                {
                headers: {
                    Accept: "application/json",
                    "Content-Type": "application/json",
                }
                }
            )
            .then(async (response) => {
                console.log(response.data.data);

                setInvoices(response.data.data);
            })
            .catch((error) => {
                console.log(error);
                setAlert(error);
            });
        }
      }
    

  const editUser = async () => {
    const res = await axios
      .put(
        "/api/editProfile",
        { username, email, walletAddress,preferredCrypto,category},
        {
          headers: {
            Accept: "application/json",
            "Content-Type": "application/json",
          },
        }
      )
      .then(async () => {
        redirectToHome();
      })
      .catch((error) => {
        console.log(error);
        setAlert(error);
      });
    console.log(res);
  };


     useEffect(() => {
        if(session?.user?.email){
            setEmail(session.user.email)
            getInvoices();
        }
     }, [session]);


  return (
    <>
        {session && session.user && 
        <div className={styles.container} style={{minHeight:"85vh"}}>
        <Grid>
            <Grid.Col sm={3}><h1 style={{marginLeft:"2%"}}>CoinFella Invoicing</h1></Grid.Col>
            <Grid.Col sm={8}></Grid.Col>
            <Grid.Col sm={1}><Link href="/create"><Button style={{marginTop:"20%"}}>Create +</Button></Link></Grid.Col>
        </Grid>
        <hr></hr>
        <Grid>
            {!editProfile &&
                <Grid.Col sm={3} style={{borderRight:"2px solid white"}}>
                    <div style={{margin:"10% 43%"}}>
                        <p style={{textAlign:"center"}}>Avatar</p>
                        {!session.user.image && <CgProfile size="4em"/>}
                        {session.user.image && <img src={session.user.image}></img>}
                    </div>
                    <table style={{width:"80%", marginBottom:"20px", margin:"0 auto", textAlign:"left"}}>
                        <thead>
                            <tr>
                                <th>Name: </th>
                                <td>{session.user.name}</td>
                            </tr>
                            <tr>
                                <th>Email: </th>
                                <td>{session.user.email}</td>
                            </tr>
                            <tr>
                                <th>Wallet Address: </th>
                                <td></td>
                            </tr>
                            <tr>
                                <th>Preferred Crypto: </th>
                                <td></td>
                            </tr>
                            <tr>
                                <th>Category: </th>
                                <td></td>
                            </tr>
                        </thead>
                    </table>
                    <Button onClick={handleEditPressed} style={{margin:"0 35%"}}>Edit Profile <FiEdit2 style={{marginLeft:"5px"}}/></Button>
                    <br></br>
                    <Button color="red" style={{margin:"15% 37%", marginTop:"300px"}} onClick={handleSignOut}>Log Out</Button>
                </Grid.Col>
            }
            {editProfile &&
                <Grid.Col sm={3} style={{borderRight:"2px solid white"}}>
                    <div style={{margin:"10% 43%"}}>
                        <p style={{textAlign:"center"}}>Avatar</p>
                        {!session.user.image && <CgProfile size="4em"/>}
                        {session.user.image && <img src={session.user.image}></img>}
                    </div>
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
                            <Field name="username">
                                {() => (
                                <>
                                    <Text>Username:</Text>
                                    <Input
                                    value={username}
                                    onChange={(e:any) => setUsername(e.target.value)}
                                    placeholder={session?.user?.name || "username"}
                                    />
                                </>
                                )}
                            </Field>
                            <Field name="email">
                                {() => (
                                <>
                                    <Text>Email:</Text>
                                    <Input
                                    value={email}
                                    onChange={(e:any) => setEmail(e.target.value)}
                                    placeholder={session?.user?.email || "email"}
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
                            <Field name="category">
                                {() => (
                                <>
                                    <Text>category:</Text>
                                    <Input
                                    value={category}
                                    onChange={(e:any) => setCategory(e.target.value)}
                                    placeholder={"Category"}
                                    />
                                </>
                                )}
                            </Field>
                            <Button type="submit" style={{margin:"0 35%"}}>Save<FiEdit2 style={{marginLeft:"5px"}}/></Button>
                            </Box>
                        </Form>
                        )}
                    </Formik>
          {alert && <Alert color={"red"} style={{marginTop:"5%"}}>{alert}</Alert>}
                    
                    <br></br>
                    <Button color="red" style={{margin:"15% 37%", marginTop:"300px"}} onClick={handleSignOut}>Log Out</Button>
                </Grid.Col>
            }
            
            <Grid.Col sm={9}>
                <h3>History</h3>
                <table style={{width:"100%", border:"1px solid white", marginBottom:"500px"}}>
                    <thead>
                        <tr>
                            <th>Payer Email</th>
                            <th>Category</th>
                            <th>Wallet Address</th>
                            <th>Crypto</th>
                            <th>Amount</th>
                        </tr>
                    </thead>
                    
                        <tbody>
                        {invoices  &&
                            invoices.map((item)=>{
                                return(
                                <tr key={item._id}>
                                    <td>{item.payerEmail}</td>
                                    <td>{item.category}</td>
                                    <td>{item.preferredCrypto}</td>
                                    <td>{item.walletAddress}</td>
                                    <td>{item.amount}</td>
                                </tr>
                                )
                             })
                        }
                        </tbody>
                </table>
            </Grid.Col>
        </Grid>

        </div>
    }
    </>
  )
}

export default Invoicing
