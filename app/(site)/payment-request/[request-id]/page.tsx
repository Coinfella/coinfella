import { Avatar, AvatarFallback, AvatarImage } from '@/components/Avatar';
import { Button } from '@/components/Button';
import Input from '@/components/Inputs/Input';
import { Text } from '@/components/Text';
import React from 'react';

const PaymentRequest = () => {
  return (
    <div className="mx-auto max-w-2xl px-10 md:px-0 pt-10">
      <div className="flex place-items-center justify-between">
        <Text as="h1" className="mr-10">
          You have a new Payment Request!
        </Text>
        <Avatar className="h-20 w-20">
          <AvatarImage src="https://github.com/shadcn.png" />
          <AvatarFallback>CN</AvatarFallback>
        </Avatar>
      </div>
      <div className="mt-10 flex flex-col gap-5">
        <PaymentField
          helperLabel="Make Sure you know who its from"
          label="From"
          value="John Doe"
        />
        <PaymentField
          helperLabel="Is this correct?"
          label="Email"
          value="john@doe.com"
        />
        <PaymentField
          helperLabel="Is this correct?"
          label="Payment For"
          value="BirthdayParty"
        />
        <PaymentField
          helperLabel="Request Id"
          label="Do the Id's match?"
          value="31313123"
        />
        <div className="mt-10 flex items-center justify-between">
          <Text className="text-2xl font-bold">Amount</Text>
          <Text className="text-5xl font-extrabold">$4000</Text>
        </div>
        <Button color="primary">Sign in and Pay</Button>
      </div>
    </div>
  );
};

const PaymentField = ({
  label,
  helperLabel,
  value,
}: {
  label: string;
  helperLabel: string;
  value: string;
}) => {
  return (
    <div className="relative">
      <div className="absolute right-0">
        <Text>{helperLabel}</Text>
      </div>
      <Input
        className="disabled:cursor-default"
        disabled={true}
        label={label}
        value={value}
      />
    </div>
  );
};

export default PaymentRequest;
