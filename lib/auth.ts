import { NextAuthOptions } from 'next-auth';

import clientPromise from './mongodb';
import dbConnect from './connectdb';
import { MongoDBAdapter } from '@next-auth/mongodb-adapter';
import { compare } from 'bcrypt';
import CredentialsProvider from 'next-auth/providers/credentials';
import UserModel from '@/models/user.model';

export const authOptions: NextAuthOptions = {
  adapter: MongoDBAdapter(clientPromise),
  providers: [
    CredentialsProvider({
      async authorize(credentials, req) {
        await dbConnect();

        // Find user with the email
        const user = await UserModel.findOne({
          email: credentials?.email,
        });

        // Email Not found
        if (!user) {
          throw new Error('Email is not registered');
        }

        // Check hased password with DB hashed password
        const isPasswordCorrect = await compare(
          credentials!.password,
          user.password
        );

        // Incorrect password
        if (!isPasswordCorrect) {
          throw new Error('Password is incorrect');
        }

        return {
          name: user.name,
          email: user.email,
          id: user._id,
        };
      },
    }),
  ],
  pages: {
    signIn: '/sign-in',
    newUser: '/sign-up',
  },
  session: {
    strategy: 'jwt',
  },
  secret: process.env.NEXT_PUBLIC_SECRET,
};