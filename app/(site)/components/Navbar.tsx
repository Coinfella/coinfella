import { NOTIFICATION_ICON } from '@/lib/assets';
import Image from 'next/image';
import Link from 'next/link';
import React from 'react';

const Navbar = () => {
  return (
    <div className="flex h-[60px] items-center justify-between px-7 md:px-12">
      <Image
        src="/logo.png"
        alt="logo"
        className=" object-contain"
        width={80}
        height={40}
      />
      <div className="flex flex-row-reverse items-center gap-4 md:flex-row md:gap-10">
        <div className="cursor-pointer">
          <Image
            src={NOTIFICATION_ICON}
            alt="notification"
            className="object-contain"
            width={24}
            height={24}
          />
        </div>
        {/* TODO: Add the logout function and assign correct path */}
        <Link
          href={{ pathname: '' }}
          className="rounded-2xl border-2 border-primary px-3 py-2 text-sm"
        >
          Logout
        </Link>
      </div>
    </div>
  );
};

export default Navbar;
