import React from 'react';
import {
  CARDS_ICON,
  DASHBOARD_ICON,
  INVOICES_ICON,
  REQUESTS_ICON,
  SETTINGS_ICON,
  TRANSACTIONS_ICON,
} from '@/lib/assets';
import Link from 'next/link';
import Image from 'next/image';
import '@/styles/globals.scss';

interface IProps {
  path: string;
}

interface INavigation {
  label: string;
  icon: string;
  href: string;
}

const sidebarItems: INavigation[] = [
  {
    label: 'Dashboard',
    icon: DASHBOARD_ICON,
    href: '/dashboard',
  },
  {
    label: 'Transactions',
    icon: TRANSACTIONS_ICON,
    href: '/transactions',
  },
  {
    label: 'Invoices',
    icon: INVOICES_ICON,
    href: '/invoices',
  },
  {
    label: 'Requests',
    icon: REQUESTS_ICON,
    href: '/request',
  },
  {
    label: 'Cards',
    icon: CARDS_ICON,
    href: '/cards',
  },
  {
    label: 'Settings',
    icon: SETTINGS_ICON,
    href: '/settings',
  },
];

const Sidebar = ({ path }: IProps) => {
  return (
    <>
      <div className="mt-14 hidden h-screen w-full max-w-[264px] gap-2 md:flex md:flex-col">
        {sidebarItems.map((item, i) => {
          return (
            <Link href={{ pathname: item.href }} key={i}>
              <div
                className={`flex items-center gap-5 px-6 py-3 hover:bg-primary/50 ${
                  path === item.href ? 'bg-primary/50' : ''
                }`}
              >
                <Image
                  className="object-contain"
                  src={item.icon}
                  alt={item.icon}
                  width={24}
                  height={24}
                />
                <div className="text-base font-semibold">{item.label}</div>
              </div>
            </Link>
          );
        })}
      </div>

      <div className="fixed bottom-0 z-10 flex h-16 w-full items-center justify-between bg-black md:hidden">
        {sidebarItems.map((item, i) => {
          return (
            <Link href={{ pathname: item.href }} key={i}>
              <div
                className={`flex h-16 items-center px-5 hover:bg-primary/50 ${
                  path === item.href ? 'bg-primary/50' : ''
                }`}
              >
                <Image
                  className="object-contain"
                  src={item.icon}
                  alt={item.icon}
                  width={24}
                  height={24}
                />
              </div>
            </Link>
          );
        })}
      </div>
    </>
  );
};

export default Sidebar;
