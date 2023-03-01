import { MongoDBAdapter } from '@next-auth/mongodb-adapter';
import { type NextAuthOptions } from 'next-auth';
import clientPromise from './mongodb';

export const publicAuthOptions: NextAuthOptions = {
  adapter: MongoDBAdapter(clientPromise),
  providers: [],
  pages: {
    signIn: '/sign-in',
    newUser: '/sign-up',
  },
  session: {
    strategy: 'jwt',
  },
  secret: process.env.NEXT_PUBLIC_SECRET,
};
