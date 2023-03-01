import { NextAuthOptions } from 'next-auth';

import clientPromise from './mongodb';
import dbConnect from './connectdb';
import { MongoDBAdapter } from '@next-auth/mongodb-adapter';
import { compare } from 'bcrypt';
import CredentialsProvider from 'next-auth/providers/credentials';
import UserModel from '@/models/user.model';

export const authOptions: NextAuthOptions = {
  adapter: MongoDBAdapter(clientPromise),
  debug:true,
  providers: [
    CredentialsProvider({
      credentials: {
        email: { label: 'email', type: 'text' },
        password: { label: 'Password', type: 'password' },
      },
      async authorize(credentials) {
        console.log('dasdadasdasd');
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
          id: user._id.toString(),
        };
      },
    }),
  ],
  pages: {
    signIn: '/sign-in',
    newUser: '/sign-up',
   },
  callbacks: {
    async session({ token, session }) {
      if (token) {
        session.user.id = token.id;
        session.user.name = token.name;
        session.user.email = token.email;
      }

      return session;
    },
    async jwt({ token, user }) {
      await dbConnect();
      const dbUser = await UserModel.findOne({
        email: token.email,
      });

      if (!dbUser) {
        token.id = user.id;
        return token;
      }

      return {
        id: dbUser.id,
        name: dbUser.name,
        email: dbUser.email,
      };
    },
    
  },
  session: {
    strategy: 'jwt',
  },
  secret: process.env.NEXT_PUBLIC_SECRET,
};
