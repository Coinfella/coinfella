import axios from "axios";
import Image from "next/image";
import React, { useState } from "react";
import Confetti from "react-confetti";
import { Button } from "../components/Button";
import { Dialog } from "../components/Dialog";
import { Input } from "../components/Inputs";
import { Spinner } from "../components/Spinner";

import {
  ANALYTICS_ICON,
  BUTTON_BG,
  COIN_FACE,
  COIN_JUMP,
  DASHBOARD_SC,
  DOCS_ICON,
  FIAT_TO_CRYPTO_ICON,
  INTERNATIONAL_ICON,
  LANDING_BANK,
  LANDING_JUMP,
  PAYLINK_ICON,
  PEOPLE,
  PEOPLE_MAIN,
  REQUEST_PAYMENT_ICON,
} from "../utils/assets";
import { showToast } from "../utils/toast";
import { useAxios } from "../utils/useAxios";
const Feature = ({
  image,
  description,
  title,
}: {
  image: string;
  description: string;
  title: string;
}) => {
  return (
    <div className="flex gap-8 rounded-xl bg-[#181818] px-8 py-6">
      <div className="flex h-16 max-w-[4rem] flex-1 place-content-center rounded-full bg-primary">
        <Image height={30} width={30} src={image} objectFit="contain" />
      </div>
      <div className="flex flex-1 flex-col">
        <div className="text-xl font-medium">{title}</div>
        <div className="text-gray-400">{description}</div>
      </div>
    </div>
  );
};

const Home = () => {
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [waitListUrl, setWaitListUrl] = useState("");
  const [signUpSuccess, setSignUpSuccess] = useState(false);
  const { cancel, error, loading, refetch } = useAxios<{
    success: boolean;
  }>(`api/waitlist/${waitListUrl}`, "get", { disabled: true });

  const signUpToWaitList = async () => {
    if (!waitListUrl.length) return;
    const refetchData = await refetch();

    if (refetchData?.success) {
      setSignUpSuccess(true);
      setIsDialogOpen(false);
      showToast("You are in the Waitlist!, Hooray!!!", { type: "success" });

      setTimeout(() => {
        setSignUpSuccess(false);
      }, 3000);
    }
    if (error || !refetchData?.success) {
      showToast("Couldn't sign you up!, Try again later", { type: "error" });
    }
  };

  return (
    <>
      {signUpSuccess && (
        <Confetti
          width={global?.window !== undefined ? global?.window?.innerWidth : 0}
          height={global?.window !== undefined ? global?.window?.innerWidth : 0}
          recycle={false}
          numberOfPieces={300}
        />
      )}
      <div className="mx-auto mt-20 flex max-w-2xl flex-col items-center px-10">
        <div>
          <Image src={COIN_FACE} />
        </div>
        <h1 className="mt-4 text-4xl font-bold text-center">
          The easiest way to get paid in crypto
        </h1>
        <h2 className="mt-2 text-center text-xl text-gray-400">
          We make it easy for creators & projects to get paid in crypto. Your
          clients can easily use their card to pay and you get paid in your
          favorite crypto!
        </h2>
      </div>
      <div className="mx-auto mt-40 flex w-screen justify-center">
        <div className="relative">
          <div className="absolute right-[18.5rem] -top-[6.5rem]  hidden h-[400px] w-[400px] md:block ">
            <Image src={LANDING_BANK} />
          </div>
          <Button
            onClick={() => setIsDialogOpen(true)}
            size="large"
            color="primary"
          >
            Join Waitlist
          </Button>
          <div className="absolute left-[18.5rem] -bottom-7 hidden  w-[500px] md:block">
            <Image src={LANDING_JUMP} />
          </div>
        </div>
      </div>
      <div className="mx-auto mt-60  grid max-w-6xl grid-cols-1 px-10 sm:grid-cols-2">
        <div className="max-w-lg">
          <Image src={DASHBOARD_SC} />
        </div>
        <div className="ml-auto mt-10 max-w-sm sm:mt-0">
          <h3 className="mt-4 text-3xl font-bold">
            A simple <span className="text-primary">dashboard</span> for
            creating, analyzing invoices and requests.
          </h3>
          <div className="mt-2 text-xl text-gray-400">
            We make it easy for creators & projects to get paid in crypto. Your
            clients can easily use their card to pay and you get paid in your
            favorite crypto!
          </div>
        </div>
      </div>
      <div className="mx-auto mt-60 grid max-w-6xl grid-cols-1 px-10 sm:grid-cols-2">
        <div className="mr-auto max-w-sm">
          <h3 className="mt-4 text-3xl font-bold">
            We <span className="text-primary">don’t hold</span> any of your
            funds at any point of the process!
          </h3>
          <div className="mt-2 text-xl text-gray-400">
            By using an on ramp service, we take the fiat payment, do the
            conversion and send the equivalent amount in crypto. We don’t hold
            any of your funds in our accounts at any given point in the process!
          </div>
        </div>
        <div className="mt-10 max-w-lg sm:mt-0">
          <Image src={PEOPLE_MAIN} />
        </div>
      </div>
      <div className="mx-auto mt-60  grid max-w-6xl grid-cols-1 px-10 sm:grid-cols-2">
        <div className="max-w-lg">
          <Image src={PEOPLE} />
        </div>
        <div className="ml-auto mt-10 max-w-sm sm:mt-0">
          <h3 className="mt-4 text-3xl font-bold">
            Share a unique link or and email with an{" "}
            <span className="text-primary">automated invoice</span> to your
            clients!
          </h3>
          <div className="mt-2 text-xl text-gray-400">
            Send an email or share an unique link for the invoice and payment
            request so your clients can easily get you paid using their card
          </div>
        </div>
      </div>
      <div className="mx-auto mt-20 max-w-6xl  px-10 pt-20" id="features">
        <div className="text-2xl font-bold">Bunch of features + more</div>
        <div className="grid grid-cols-1 gap-10 pt-10 sm:grid-cols-3">
          <Feature
            title="Analytics"
            description="Track your payments, and more with our advanced analytics dashboard."
            image={ANALYTICS_ICON}
          />
          <Feature
            title="Request Payment"
            description="Request payments from anyone in the world in fiat, and get paid in crypto "
            image={REQUEST_PAYMENT_ICON}
          />
          <Feature
            title="Invoicing"
            description="Send invoices to your customers, and get paid in crypto when they pay with card."
            image={DOCS_ICON}
          />
          <Feature
            title="Fiat to Crypto"
            description="Get paid in fiat that gets converted to crypto. "
            image={FIAT_TO_CRYPTO_ICON}
          />
          <Feature
            title="Paylinks (soon)"
            description="Share a link with your clients/fans to receive crypto when they use a card, like a tip jar. "
            image={PAYLINK_ICON}
          />
          <Feature
            title="International"
            description="coinfella is the fastest way to receive crypto payments from anyone internationally. "
            image={INTERNATIONAL_ICON}
          />
        </div>
      </div>
      <div className="mx-10 flex  justify-center ">
        <div
          className="my-24 flex w-full max-w-2xl flex-col items-center rounded-lg bg-primary bg-cover bg-no-repeat py-10 bg-blend-screen"
          style={{ backgroundImage: `url('${BUTTON_BG.src}')` }}
        >
          <div className="mb-6 text-2xl font-bold">
            Let’s get paid in Crypto!
          </div>
          <Button
            color="white"
            size="large"
            font="bold"
            onClick={() => setIsDialogOpen(true)}
          >
            Join Waitlist
          </Button>
        </div>
      </div>
      <Dialog
        backdropDismiss
        isOpen={isDialogOpen}
        setIsOpen={setIsDialogOpen}
        onClose={() => {
          setWaitListUrl("");
          cancel();
        }}
      >
        <Dialog.Title>
          <span>Enter your email below to join the waitlist</span>
        </Dialog.Title>
        <Dialog.Body>
          <div>
            <Input type="text" onChange={setWaitListUrl} value={waitListUrl} />
            <div className="mt-4">
              <Button
                isLoading={loading}
                size="full"
                color="primary"
                onClick={signUpToWaitList}
              >
                Sign up
              </Button>
            </div>
          </div>
        </Dialog.Body>
      </Dialog>
    </>
  );
};

export default Home;
