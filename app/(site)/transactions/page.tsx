import React from 'react';

interface ITransaction {
  name: string;
  email: string;
  status: 'Paid' | 'Pending' | 'Cancelled';
  reqNo: string;
  issuedDate: string;
  paidDate: string;
  usdAmount: string;
  solAmount: string;
}

const headers = [
  'Name',
  'Status',
  'Request No.',
  'Issued Date',
  'Paid Date',
  'Amount',
];

const tempData: ITransaction[] = [
  {
    name: 'SOLBigBrain',
    email: 'solbigbrain@gmail.com',
    status: 'Paid',
    reqNo: '#9999999',
    issuedDate: 'Jan 12, 2022',
    paidDate: 'Jan 12, 2022',
    usdAmount: '$ 783.22',
    solAmount: '700.86 SOL',
  },
  {
    name: 'SOLBigBrain',
    email: 'solbigbrain@gmail.com',
    status: 'Paid',
    reqNo: '#9999999',
    issuedDate: 'Jan 12, 2022',
    paidDate: 'Jan 12, 2022',
    usdAmount: '$ 783.22',
    solAmount: '700.86 SOL',
  },
  {
    name: 'SOLBigBrain',
    email: 'solbigbrain@gmail.com',
    status: 'Paid',
    reqNo: '#9999999',
    issuedDate: 'Jan 12, 2022',
    paidDate: 'Jan 12, 2022',
    usdAmount: '$ 783.22',
    solAmount: '700.86 SOL',
  },
  {
    name: 'SOLBigBrain',
    email: 'solbigbrain@gmail.com',
    status: 'Pending',
    reqNo: '#9999999',
    issuedDate: 'Jan 12, 2022',
    paidDate: '-',
    usdAmount: '$ 783.22',
    solAmount: '700.86 SOL',
  },
  {
    name: 'SOLBigBrain',
    email: 'solbigbrain@gmail.com',
    status: 'Cancelled',
    reqNo: '#9999999',
    issuedDate: 'Jan 12, 2022',
    paidDate: '-',
    usdAmount: '$ 783.22',
    solAmount: '700.86 SOL',
  },
];

const Transactions = () => {
  const checkStatus = (status: 'Paid' | 'Pending' | 'Cancelled') => {
    switch (status) {
      case 'Paid':
        return 'text-[#17E383]';
      case 'Pending':
        return 'text-[#FF9548]';
      case 'Cancelled':
        return 'text-[#FF0A0A]';
      default:
        return 'text-white';
    }
  };

  return (
    <>
      {/* Web */}
      <div className="hidden py-14 px-[46px] md:flex md:flex-col">
        <div className="text-2xl font-bold">Transactions</div>
        <div className="relative mt-9 ">
          <table className="w-full rounded-3xl bg-black text-left">
            <thead>
              <tr className="border-b border-[#323232] text-lg font-bold text-primary">
                {headers.map((header, i) => {
                  return (
                    <th key={i} className={'px-11 py-6'}>
                      {header}
                    </th>
                  );
                })}
              </tr>
            </thead>
            <tbody>
              {tempData.map((data, i) => {
                return (
                  <tr
                    key={i}
                    className={
                      i !== tempData.length - 1
                        ? 'border-b border-[#323232]'
                        : ''
                    }
                  >
                    <td className={'px-11 py-4 text-sm'}>
                      <div className="font-semibold">{data.name}</div>
                      <div className="font-light">{data.email}</div>
                    </td>
                    <td
                      className={`px-11 py-4 text-base font-medium ${checkStatus(
                        data.status
                      )}`}
                    >
                      {data.status}
                    </td>
                    <td className={'px-11 py-4 text-base font-medium'}>
                      {data.reqNo}
                    </td>
                    <td className={'px-11 py-4 text-base font-medium'}>
                      {data.issuedDate}
                    </td>
                    <td className={'px-11 py-4 text-base font-medium'}>
                      {data.paidDate}
                    </td>
                    <td className={'px-11 py-4'}>
                      <div className="text-lg font-medium">
                        {data.solAmount}
                      </div>
                      <div className="text-sm font-light">{data.usdAmount}</div>
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
      </div>

      {/* Mobile */}
      <div className="mt-8 mb-11 flex flex-col md:hidden">
        <div className="mx-6 text-2xl font-bold">Transactions</div>
        <div className="relative mt-3 flex flex-col">
          {tempData.map((data, i) => {
            return (
              <div key={i} className="mb-2 flex flex-col  bg-black px-7 py-3">
                <div className="flex items-center justify-between">
                  <div className="text-base font-bold">{data.name}</div>
                  <div className="text-base font-bold">{data.usdAmount}</div>
                </div>
                <div className="flex items-center justify-between">
                  <div className="text-sm font-normal">{data.paidDate}</div>
                  <div
                    className={`text-right font-medium ${checkStatus(
                      data.status
                    )}`}
                  >
                    {data.status}
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </>
  );
};

export default Transactions;
