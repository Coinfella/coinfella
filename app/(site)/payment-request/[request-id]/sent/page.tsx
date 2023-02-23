import { Button } from '@/components/Button';
import { Text } from '@/components/Text';
import { SENT_ROCKET, THUMBSUP } from '@/lib/assets';
import Image from 'next/image';
import React from 'react';

const PaymentRequestSent = () => {
  return (
    <div className="mx-auto max-w-xl pt-10">
      <div className="flex justify-between items-center">
        <Image alt="thumbsup" src={THUMBSUP} />
        <div>
          <Text as="h1">Payment Request Sent!</Text>
          <Image className='float-right' alt="thumbsup" src={SENT_ROCKET} />
        </div>
      </div>
      <div className='rounded-md bg-white p-10 mb-10'>
        <Text className='text-black text-xl'>Share a direct link with your Payer!</Text>

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
export default PaymentRequestSent;
