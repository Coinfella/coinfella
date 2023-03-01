import { NextApiRequest, NextApiResponse } from 'next';
import {
  createMiddlewareDecorator,
  NextFunction,
  UnauthorizedException,
} from 'next-api-decorators';
import { DefaultSession, getServerSession } from 'next-auth';
import { getToken } from 'next-auth/jwt';
import { authOptions } from '../auth';

declare module 'next' {
  interface NextApiRequest {
    user?: {
      name: string;
      email: string;
      image: string;
      id: string;
    };
  }
}

const NextAuthGuard = createMiddlewareDecorator(
  async (req: NextApiRequest, res: NextApiResponse, next: NextFunction) => {
    const session = await getServerSession(req, res, authOptions);

    if (session == null || session.user == null) {
      throw new UnauthorizedException();
    }

    //@ts-ignore
    req.user = session.user;
    next();
  }
);
export default NextAuthGuard;
