'use client';

import { useSession } from 'next-auth/react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';

export const LoginButton = () => {
  const session = useSession();
  const router = useRouter();
  const authed = session.status == "authenticated";
  return (
    <Link href={!authed ? "/sign-up" : '/dashboard'} className="border-2 rounded-2xl border-primary px-3 py-2 text-sm">
      {authed ? 'Dashboard' : 'Login/Sign Up'}
    </Link>
  );
};
