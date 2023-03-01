'use client';

import { Avatar, AvatarFallback, AvatarImage } from '@/components/Avatar';
import { Button } from '@/components/Button';
import Input from '@/components/Inputs/Input';
import { Spinner } from '@/components/Spinner';
import { Text } from '@/components/Text';
import { fetcher } from '@/lib/utils';
import { useSession } from 'next-auth/react';
import Link from 'next/link';
import useSWR from 'swr';

const PaymentRequest = ({ params }: { params: { requestId: string } }) => {
  const { data, error, isLoading } = useSWR(
    `/api/requests/${params.requestId}`,
    fetcher,
    { revalidateOnFocus: false }
  );
  const session = useSession();
  const entity = data?.entity;
    console.log(session);
    
  return (
    <div className="mx-auto max-w-2xl px-10 pt-10 md:px-0">
      {error && <>Failed to load request</>}
      {isLoading && <Spinner />}
      {entity && data.success && (
        <>
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
              value={entity.requester?.user ?? ''}
            />
            <PaymentField
              helperLabel="Is this correct?"
              label="Email"
              value={entity.requester?.email ?? ''}
            />
            <PaymentField
              helperLabel="Is this correct?"
              label="Payment For"
              value={entity.description}
            />
            <PaymentField
              helperLabel="Request Id"
              label="Do the Id's match?"
              value={entity._id}
            />
            <div className="mt-10 flex items-center justify-between">
              <Text className="text-2xl font-bold">Amount</Text>
              <Text className="text-5xl font-extrabold">
                {data.entity.amount}
              </Text>
            </div>
            <Link href={`/sign-in?request=${params.requestId}`}>
              <Button className="w-full" color="primary">
                {session.status == 'authenticated'
                  ? `Pay as ${session.data.user?.name}`
                  : 'Sign in and Pay'}
              </Button>
            </Link>
          </div>
        </>
      )}
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
