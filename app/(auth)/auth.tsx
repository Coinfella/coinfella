'use client';

import { FACEBOOK_ICON, GOOGLE_ICON } from '@/lib/assets';
import Image from 'next/image';
import useRipple from 'use-ripple-hook';
import {
  UserIcon,
  LockClosedIcon,
  EyeIcon,
  EyeSlashIcon,
} from '@heroicons/react/24/solid';
import { useState } from 'react';
import { Button } from '@/components/Button';
import Input from '@/components/Inputs/Input';
import Link from 'next/link';
import axios from 'axios';
import { signIn, useSession } from 'next-auth/react';
import { useRouter } from 'next/navigation';

interface AuthProps {
  isLogin: boolean;
  searchParams: any;
}
const Auth: React.FC<AuthProps> = ({ isLogin, searchParams }) => {
  const [showPassword, setShowPassword] = useState<boolean>(false);
  const session = useSession();
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const router = useRouter();
  const requestExists = searchParams.request;

  const registerUser = async () => {
    // TODO: validate inputs
    axios
      .post(
        '/api/auth/register',
        { name, email, password },
        {
          headers: {
            Accept: 'application/json',
            'Content-Type': 'application/json',
          },
        }
      )
      .then(async () => {
        await loginUser();
        if (requestExists) {
          router.push(`/payment-request/${requestExists}`);
        } else {
          router.push('/request');
        }
      })
      .catch((error) => {
        console.log(error);
      });
  };

  const loginUser = async () => {
    // TODO: validate inputs
    const res: any = await signIn('credentials', {
      redirect: false,
      email: email,
      password: password,
    });
    //TODO: Add error handling (showtoast)
    if (res.status == '200') {
      if (requestExists) {
        router.push(`/payment-request/${requestExists}`);
      } else {
        router.push('/request');
      }
    }
  };

  return (
    <>
      <div className="mt-5 md:mt-10">
        <div className="flex justify-center md:mr-10 md:justify-end">
          <Image src="/logo.png" alt="" width={150} height={30} />
        </div>
        <div className="mx-3 mt-12 flex flex-col items-center md:mx-auto md:mt-[130px]">
          {isLogin && (
            <div className="text-[32px] font-bold">Login to Your Account</div>
          )}
          {!isLogin && (
            <div className="text-[32px] font-bold">Create Your Account</div>
          )}
          <div className="mt-[50px] flex flex-col gap-5">
            <Button
              className="flex items-center justify-center gap-3 text-base font-medium"
              size={'xLarge'}
              color={'google'}
            >
              <Image
                src={GOOGLE_ICON}
                alt={GOOGLE_ICON}
                width={24}
                height={24}
              />
              <div className="flex min-w-[160px] justify-start">
                Sign In with Google
              </div>
            </Button>
            <Button
              className="flex items-center justify-center gap-3  text-base font-medium"
              size={'xLarge'}
              color={'facebook'}
            >
              <Image
                src={FACEBOOK_ICON}
                alt={FACEBOOK_ICON}
                width={24}
                height={24}
              />
              <div className="justify-star flex min-w-[160px]">
                Sign In with Facebook
              </div>
            </Button>
          </div>
          <div className="mt-10 flex items-center gap-1">
            <div className="h-[1px] min-w-[165px] rounded bg-[#585858]"></div>
            <div className="text-sm font-medium text-[#585858]">or</div>
            <div className="h-[1px] min-w-[165px] rounded bg-[#585858]"></div>
          </div>
          <div>
            <div className="mt-8 flex flex-col gap-4">
              <div className="relative">
                <UserIcon
                  className="absolute top-[53%] left-5"
                  color="#585858"
                  width={24}
                  height={24}
                />
                <Input
                  label="Email address"
                  className="h-[45px] min-w-[350px] border border-[#585858] bg-black py-[18.5px] pl-14 pr-6 text-base font-medium text-[#585858] placeholder:text-[#585858]"
                  placeholder="Enter your email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                />
              </div>
              {!isLogin && (
                <div className="relative">
                  <UserIcon
                    className="absolute top-[53%] left-5"
                    color="#585858"
                    width={24}
                    height={24}
                  />
                  <Input
                    label="Name"
                    className="h-[45px] min-w-[350px] border border-[#585858] bg-black py-[18.5px] pl-14 pr-6 text-base font-medium text-[#585858] placeholder:text-[#585858]"
                    placeholder="Enter your Name"
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                  />
                </div>
              )}
              <div className="relative">
                <LockClosedIcon
                  className="absolute top-[53%] left-5"
                  color="#585858"
                  width={24}
                  height={24}
                />
                <Input
                  label="Password"
                  className="h-[45px] min-w-[350px] border border-[#585858] bg-black py-[18.5px] pl-14 pr-6 text-base font-medium text-[#585858] placeholder:text-[#585858]"
                  placeholder="Password"
                  type={showPassword ? 'text' : 'password'}
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                />
                <div onClick={() => setShowPassword(!showPassword)}>
                  {showPassword ? (
                    <EyeIcon
                      className="absolute top-[53%] right-5"
                      color="#585858"
                      width={24}
                      height={24}
                    />
                  ) : (
                    <EyeSlashIcon
                      className="absolute top-[53%] right-5"
                      color="#585858"
                      width={24}
                      height={24}
                    />
                  )}
                </div>
              </div>
            </div>
          </div>
          <div className="mt-3 flex min-w-[350px] justify-between">
            <div className="flex items-center gap-2">
              <input
                id="default-checkbox"
                type="checkbox"
                value=""
                className="h-4 w-4 rounded border-white bg-black text-primary focus:ring-0 focus:ring-offset-0"
              />
              <div className="text-xs font-medium">Remember me</div>
            </div>
            <div className="cursor-pointer text-xs font-medium text-primary">
              Forgot password?
            </div>
          </div>
          <div className="mt-11">
            <Button
              className="flex items-center justify-center gap-3 text-base font-medium"
              size={'xLarge'}
              color={'primary'}
              onClick={() => {
                isLogin ? loginUser() : registerUser();
              }}
            >
              {isLogin ? 'Sign In' : 'Sign Up'}
            </Button>
          </div>
          {isLogin && (
            <div className="mt-9 flex justify-end gap-1 text-sm font-medium">
              Don’t have an account!
              <Link
                href={`/sign-up?${
                  requestExists ? 'request=' + requestExists : ''
                }`}
              >
                <span className="cursor-pointer font-bold text-primary">
                  Sign Up
                </span>
              </Link>
            </div>
          )}
          {!isLogin && (
            <div className="mt-9 flex justify-end gap-1 text-sm font-medium">
              Already have an account
              <Link
                href={`/sign-in?${
                  requestExists ? 'request=' + requestExists : ''
                }`}
              >
                <span className="cursor-pointer font-bold text-primary">
                  Sign in
                </span>
              </Link>
            </div>
          )}
        </div>
      </div>
    </>
  );
};

export default Auth;
