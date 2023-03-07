'use client';

import InputFormField from '@/components/Inputs/InputFormField';
import { Text } from '@/components/Text';
import React, { useState } from 'react';
import { FormProvider, useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import * as z from 'zod';
import { Button } from '@/components/Button';
import { useSession } from 'next-auth/react';
import { SENT_ROCKET, THUMBSUP } from '@/lib/assets';
import Image from 'next/image';
import { SelectFormField } from '@/components/Inputs/SelectFormField';
import { DatePickerFormField } from '@/components/Inputs/DatePickerFormField';
import axios from 'axios';

const requestForm = z.object({
  payerName: z.string().min(1, 'Please enter value'),
  payerEmail: z.coerce.string().email().min(1, 'Please enter value'),
  requestAs: z.string().min(1, 'Please enter value'),
  fiatCurrency: z.string().min(1, 'Please enter value'),
  cryptoChain: z.string().min(1, 'Please enter value'),
  walletAddress: z.string().min(1, 'Please enter value'),
  dueDate: z.date(),
  description: z.string().min(1, 'Please enter value'),
  amount: z.coerce.number().min(1, 'Please enter value'),
});

type requestFormResponseExtras = {
  _id: string;
  requester: {
    user: string;
    email: string;
  }
};

type request = typeof requestForm._type;
export type RequestType = requestFormResponseExtras & request;
  

const currencies = [
  { value: 'USD', name: 'USD' },
];

const chains = [
  { value: 'SOLANA_USDC', name: 'Solana USDC' },
  { value: 'SOLANA_USDT', name: 'Solana USDT' },
   { value: 'USDT', name: 'USDT' },
];

const Request = () => {
  const { data: session } = useSession();
  const [requestSent, setRequestSent] = useState<boolean>(false);
  const [error, setError] = useState(false);
  const formData = useForm({
    mode: 'onBlur',
    resolver: zodResolver(requestForm),
  });

  const createRequest = (data: any) => {
    axios
      .post('/api/requests', data)
      .then((res) => {
        if (res.status != 201) {
          console.error(res);
          setError(true);
          return;
        }
        setRequestSent(true);
      })
      .catch((e) => {
        console.error(e);
        setError(true);
      });
  };

  return (
    <div className="mx-auto w-full max-w-2xl">
      {!requestSent && !error && (
        <>
          <Text as="h3">Create Your Request</Text>
          <FormProvider {...formData}>
            <form onSubmit={formData.handleSubmit(createRequest)}>
              <div className="mt-5 flex justify-between gap-5">
                <InputFormField name="payerName" label="Payer Name" />
                <InputFormField name="payerEmail" label="Payer Email" />
                <InputFormField name="requestAs" label="Request As" />
              </div>
              <div className="mt-5 flex justify-between gap-5">
                <SelectFormField
                  name="fiatCurrency"
                  label="Request In"
                  selectOptions={currencies}
                />
                <SelectFormField
                  name="cryptoChain"
                  label="Get Paid In"
                  selectOptions={chains}
                />
                <InputFormField name="walletAddress" label="Your Wallet" />
              </div>
              <div className="mt-5 flex justify-between gap-5">
                <DatePickerFormField name="dueDate" label="Due Date" />
                <InputFormField name="description" label="Description" />
                <InputFormField name="amount" label="Amount" />
              </div>
              <div className="mt-10 flex justify-between">
                {/* <Button color="primary" size="medium" font="bold">
                  Attach Documents
                </Button> */}
                <Button color="primary" size="medium" font="bold" type="submit">
                  Request
                </Button>
              </div>
            </form>
          </FormProvider>
        </>
      )}
      {requestSent && !error && <PaymentRequestSent />}
      {error && <Text>Whoops something went wrong</Text>}
    </div>
  );
};

const PaymentRequestSent = () => {
  return (
    <div className="mx-auto max-w-xl pt-10">
      <div className="flex items-center justify-between">
        <Image alt="thumbsup" src={THUMBSUP} />
        <div>
          <Text as="h1">Payment Request Sent!</Text>
          <Image className="float-right" alt="thumbsup" src={SENT_ROCKET} />
        </div>
      </div>
      <div className="mb-10 rounded-md bg-white p-10">
        <Text className="text-xl text-black">
          Share a direct link with your Payer!
        </Text>
      </div>
      <div className="flex justify-between">
        <Button color="primary" size="small">
          Manage Requests
        </Button>
        <Button color="primary" size="small">
          Request Another
        </Button>
      </div>
    </div>
  );
};

export default Request;
