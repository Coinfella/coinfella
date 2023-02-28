// 'use client';

import { getCurrentUser } from '@/lib/session';
import { getServerSession } from 'next-auth';
import { useSession } from 'next-auth/react';

export default async function AuthGuard() {
  // const session = await getServerSession();
  // console.log('SESSION: ', session);

  // useEffect(() => {
  //   (async () => {
  //     const user = await getCurrentUser();
  //     const router = useRouter();
  //     console.log(user);
  //     if (!user) {
  //       //   router.push('/');
  //       console.log('You are not authenticated');
  //       //TODO : use a toast
  //     }
  //   })();
  // }, []);

  return <></>;
}
