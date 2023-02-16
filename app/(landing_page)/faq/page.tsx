import React from "react";
import Image from "next/image";
import {
  CREDIT_CARD_ICON,
  DISABLE_ICON,
  DOLLAR_ICON,
  EMAIL_ICON,
  TAG_ICON,
  TRUCK_ICON,
} from "../../../utils/assets";

const Questions = ({
  icon,
  question,
  answer,
}: {
  icon: string;
  question: string;
  answer: string;
}) => {
  return (
    <div className='rounded-xl bg-[#181818] px-8 py-6'>
      <div className='flex h-12 max-w-[3rem] flex-1 place-content-center rounded-full bg-primary'>
        <Image
          className='object-contain'
          height={25}
          width={25}
          src={icon}
          alt='icon'
        />
      </div>
      <div className='mt-4 text-xl font-medium'>{question}</div>
      <div className='mt-2 text-sm font-normal'>{answer}</div>
    </div>
  );
};

const FAQ = () => {
  return (
    <>
      <div className='bg-primary py-24 text-center text-9xl font-bold'>FAQ</div>
      <div className='mx-auto mt-12 mb-12 max-w-6xl px-10'>
        <div className='grid grid-cols-1 gap-5 sm:grid-cols-3'>
          <Questions
            icon={EMAIL_ICON}
            question='What is Coinfella?'
            answer='Coinfella is a complete fiat to crypto payments platform. We make it easy for creators & projects to get paid in crypto. Your clients can easily use their card to pay and you get paid in your favorite crypto!'
          />
          <Questions
            icon={CREDIT_CARD_ICON}
            question='Why Coinfella?'
            answer='From our research we’ve found out that a lot of clients are not familiar with crypto payments but a growing number of creators/freelancers are preferring crypto as a payment method above fiat. We made Coinfella as a solution for that.'
          />
          <Questions
            icon={DISABLE_ICON}
            question='How does it work?'
            answer='By using third party on ramp, we take the fiat payment, do the conversion and send the equivalent amount in crypto. We won’t hold any of your funds in our accounts at any given point in the process!'
          />
          <Questions
            icon={TRUCK_ICON}
            question='Is there a fee?'
            answer='We’re still in the process of finalizing our business models. However, Coinfella will be the cheapest option out there, when it’s ready. '
          />
          <Questions
            icon={DOLLAR_ICON}
            question='Which cryptos do you support?'
            answer='We support all major and minor crypto across all chains that is available on the ‘on ramp’ we use, make sure to choose the correct chain of the desired crypto you need!'
          />
          <Questions
            icon={TAG_ICON}
            question='Why KYC?'
            answer='Verification of your identity is required by law in order to execute the conversion of fiat currencies to cryptocurrencies. Identity verification is done by the gateway you choose to buy cryptocurrency from.'
          />
        </div>
        <div className='mt-12 flex flex-col items-center justify-between rounded-xl bg-[#2B2B2B] p-6 md:flex-row'>
          <div className='flex flex-col items-center md:items-start'>
            <div className='text-xl font-semibold'>Still have questions?</div>
            <div className='mt-[6px] text-center'>
              Can’t find the answer you’re looking for? Please chat with us in
              our discord.
            </div>
          </div>
          <button className='mt-4 rounded-md bg-white px-[14px] py-2 text-sm font-semibold text-black md:mt-0'>
            Get in touch
          </button>
        </div>
      </div>
    </>
  );
};

export default FAQ;
