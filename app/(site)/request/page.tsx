'use client';

import InputFormField from '@/components/Inputs/InputFormField';
import { Text } from '@/components/Text';
import React from 'react';
import { FormProvider, useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import * as z from 'zod';
import { Button } from '@/components/Button';
import { useSession } from 'next-auth/react';

const requestForm = z.object({
  payerName: z.string(),
  payerEmail: z.string(),
  requestAs: z.string(),
  fiatCurrency: z.string(),
  cryptoChain: z.string(),
  walletAddress: z.string(),
  dueDate: z.string(),
  description: z.string(),
  amount: z.coerce.number(),
});

const Request = () => {
  const { data: session } = useSession();  
  const formData = useForm({
    mode: 'onBlur',
    resolver: zodResolver(requestForm),
  });

  const createRequest = (data: any) => {
    console.log(data);
  };

  return (
    <div className="mx-auto w-full max-w-2xl">
      <Text as="h3">Create Your Request</Text>
      <FormProvider {...formData}>
        <form
          onSubmit={formData.handleSubmit(createRequest)}
        >
          <div className="mt-5 flex justify-between gap-5">
            <InputFormField name="payerName" label="Payer Name" />
            <InputFormField name="payerEmail" label="Payer Email" />
            <InputFormField name="requestAs" label="Request As" />
          </div>
          <div className="mt-5 flex justify-between gap-5">
            <InputFormField name="fiatCurrency" label="Request In" />
            <InputFormField name="cryptoChain" label="Get Paid In" />
            <InputFormField name="walletAddress" label="Your Wallet" />
          </div>
          <div className="mt-5 flex justify-between gap-5">
            <InputFormField name="dueDate" label="Due Date" />
            <InputFormField name="description" label="Description" />
            <InputFormField name="amount" label="Amount" />
          </div>
          <div className="mt-10 flex justify-between">
            <Button color="primary" size="medium" font="bold">
              Attach Documents
            </Button>
            <Button color="primary" size="medium" font="bold" type="submit">
              Request
            </Button>
          </div>
        </form>
      </FormProvider>
    </div>
  );
};

export default Request;
