import Image from 'next/image';
import React from 'react';

const Navbar = () => {
  return (
    <div className="flex h-[60px] items-center px-12">
      <div className="relative h-10 w-20 cursor-pointer ">
        <Image fill className=" object-contain" src="/logo.png" alt="logo" />
      </div>
    </div>
  );
};

export default Navbar;
