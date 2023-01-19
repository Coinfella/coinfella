

import React, { Component } from 'react';
import Link from 'next/link';
import Image from 'next/image'
import styles from '../styles/Home.module.css'
import Head from 'next/head';
import {useSession ,signIn, signOut} from 'next-auth/react';

type LayoutProps = {
    children: React.ReactNode,
  };

  import {
    createStyles,
    Menu,
    Center,
    Header,
    Container,
    Group,
    Button,
    Burger,
  } from '@mantine/core';
  import { useDisclosure } from '@mantine/hooks';
  import { IconChevronDown } from '@tabler/icons';
  import { MantineLogo } from '@mantine/ds';
  
  const HEADER_HEIGHT = 60;
  
  const useStyles = createStyles((theme) => ({
    inner: {
      height: HEADER_HEIGHT,
      display: 'flex',
      justifyContent: 'space-between',
      alignItems: 'center',
    },
  
    links: {
      [theme.fn.smallerThan('sm')]: {
        display: 'none',
      },
    },
  
    burger: {
      [theme.fn.largerThan('sm')]: {
        display: 'none',
      },
    },
  
    link: {
      display: 'block',
      lineHeight: 1,
      padding: '8px 12px',
      borderRadius: theme.radius.sm,
      textDecoration: 'none',
      color: theme.colorScheme === 'dark' ? theme.colors.dark[0] : theme.colors.gray[7],
      fontSize: theme.fontSizes.sm,
      fontWeight: 500,
  
      '&:hover': {
        backgroundColor: theme.colorScheme === 'dark' ? theme.colors.dark[6] : theme.colors.gray[0],
      },
    },
  
    linkLabel: {
      marginRight: 5,
    },
  }));
  
  interface HeaderActionProps {
    links: { link: string; label: string; links: { link: string; label: string }[] }[];
  }

  const links = [{ link: "/#About", label: "About", links: [{ link: "#Docs", label: "Docs" }] }, {link:"#Features", label:"Features"}, {link:"/#footer", label:"Contact Us"}];
  

export default function Layout({ children }: LayoutProps) {
  const {data:session, status} = useSession();

    const { classes } = useStyles();
  const [opened, { toggle }] = useDisclosure(false);
  const items = links.map((link) => {
    const menuItems = link.links?.map((item) => (
      <Menu.Item key={item.link}>{item.label}</Menu.Item>
    ));

    if(session){
      console.log(session);
      if(links.length == 3){
        links.push({link:"/invoicing", label:"Invoicing"})
      }
    }
    
    if (menuItems) {
      return (
        <Menu key={link.label} trigger="hover" exitTransitionDuration={0}>
          <Menu.Target>
            <Link href={link.link} onClick={(event) => event.preventDefault()}>
              <a className={classes.link}>
                <Center>
                  <span className={classes.linkLabel}>{link.label}</span>
                  <IconChevronDown size={12} stroke={1.5} />
                </Center>
              </a>
            </Link>
          </Menu.Target>
          <Menu.Dropdown>{menuItems}</Menu.Dropdown>
        </Menu>
      );
    }

    return (
      <Link
        key={link.label}
        href={link.link}
        onClick={(event) => event.preventDefault()}
      >
        <a className={classes.link}>{link.label}</a>
      </Link>
    );
  });

  const handleSignOut = () => signOut({redirect: false, callbackUrl: '/'});
    return (
      <div>
        <Head>
          <title>NxtPay</title>
          <meta name="description" content="Pay in fiat, receive crypto." />
          <link rel="icon" href="/favicon.ico" />
        </Head>

        <Header
          height={HEADER_HEIGHT}
          sx={{ borderBottom: 0 }}
          mb={120}
          style={{ marginBottom: "0" }}
        >
          <Container className={classes.inner} fluid>
            <Group>
              <Burger
                opened={opened}
                onClick={toggle}
                className={classes.burger}
                size="sm"
              />
              <span className={styles.logo}>
                <Link href="/">
                  <div>
                    <Image
                      src="/icon.png"
                      alt="NxtPay Logo"
                      width={50}
                      height={50}
                    />
                  </div>
                </Link>
              </span>
            </Group>
            <Group spacing={5} className={classes.links}>
              {items}
            </Group>
            <Group>
              {session && session.user && (
                <>
                  <p
                    style={{
                      color: "#495057",
                      fontFamily: "Helvetica Neue",
                      marginRight: "10px",
                    }}
                  >
                    Hi, {session.user.name}
                  </p>
                  <Button
                    radius="xl"
                    sx={{ height: 30 }}
                    onClick={handleSignOut}
                  >
                    Log Out
                  </Button>
                </>
              )}
              {!session && (
                <Button
                  style={{ marginLeft: "10px" }}
                  radius="xl"
                  sx={{ height: 30 }}
                >
                  <Link href="/auth">Sign In</Link>
                </Button>
              )}
            </Group>
          </Container>
        </Header>
        <div>{children}</div>
        <footer className={styles.footer}>
          <a
            href="https://Nxtpay.com"
            target="_blank"
            rel="noopener noreferrer"
          >
            Copyright ©
            <span className={styles.logo}>
              <Image src="/icon.png" alt="NxtPay Logo" width={50} height={50} />
            </span>
          </a>
        </footer>
      </div>
    );
  }