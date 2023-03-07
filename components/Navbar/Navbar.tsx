import Image from "next/image";
import Link from "next/link";
import React from "react";
import { Disclosure } from "@headlessui/react";
import { MENU_ICON } from "@/lib/assets";
import { LoginButton } from "./LoginButton";
import { cn } from "@/lib/utils";

export const Navbar = () => {
  const navigation = [
    { name: "Features", href: "/#features", current: false },
    // { name: "Pricing", href: "#pricing", current: false },
    { name: "FAQ", href: "/faq", current: false },
  ];
   
  return (
    <header>
      <Disclosure
        as='nav'
        className='border-b-2 border-gray-900 bg-black'>
        {({ open }) => (
          <>
            <div className='mx-auto max-w-6xl px-2 sm:px-6 lg:px-8'>
              <div className='relative flex h-16 items-center justify-between'>
                <div className='absolute inset-y-0 left-0 flex items-center sm:hidden'>
                  {/* Mobile menu button*/}
                  <Disclosure.Button className='inline-flex items-center justify-center rounded-md p-2 text-gray-400 hover:bg-gray-700 hover:text-white focus:outline-none focus:ring-2 focus:ring-inset focus:ring-white'>
                    <span className='sr-only'>Open main menu</span>
                    <Image
                      src={MENU_ICON}
                      alt=''
                    />
                  </Disclosure.Button>
                </div>
                <div className='flex flex-1 items-center justify-center sm:items-stretch sm:justify-start'>
                  <div className='flex flex-shrink-0 items-center'>
                    <Link href='/'>
                      <div className='relative h-20 w-20 cursor-pointer'>
                        <Image
                          layout='fill'
                          className='h-8 w-auto object-contain'
                          src='/logo.png'
                          alt=''
                        />
                      </div>
                    </Link>
                  </div>
                  <div className='hidden items-center sm:ml-6 sm:flex w-full justify-between'>
                    <div className='flex space-x-4'>
                      {navigation.map((item) => (
                        <Link
                          key={item.name}
                          href={item.href}
                          className={cn(
                            item.current
                              ? "bg-gray-900 text-white"
                              : "text-gray-300 hover:bg-gray-700 hover:text-white",
                            "rounded-md px-3 py-2 text-base font-medium"
                          )}
                          aria-current={item.current ? "page" : undefined}>
                          {item.name}
                        </Link>
                      ))}
                    </div>
                    <LoginButton/>
                  </div>
                </div>
              </div>
            </div>

            <Disclosure.Panel className='sm:hidden'>
              <div className='space-y-1 px-2 pt-2 pb-3'>
                {navigation.map((item) => (
                  <Disclosure.Button
                    key={item.name}
                    as='a'
                    href={item.href}
                    className={cn(
                      item.current
                        ? "bg-gray-900 text-white"
                        : "text-gray-300 hover:bg-gray-700 hover:text-white",
                      "block rounded-md px-3 py-2 text-base font-medium"
                    )}
                    aria-current={item.current ? "page" : undefined}>
                    {item.name}
                  </Disclosure.Button>
                ))}
              </div>
            </Disclosure.Panel>
          </>
        )}
      </Disclosure>
       
    </header>
  );
};
