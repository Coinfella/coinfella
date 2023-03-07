// // Next.js API route support: https://nextjs.org/docs/api-routes/introduction
// import type { NextApiRequest, NextApiResponse } from "next";
// import dbConnect from "./lib/connectdb";
// import auths from "./lib/model/auths";
// import bcrypt from "bcrypt";

// interface ResponseData {
//   error?: string;
//   msg?: string;
// }

// const validateEmail = (email: string): boolean => {
//   const regEx = /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i;
//   return regEx.test(email);
// };

// const validateForm = async (
//   username: string,
//   email: string,
//   password: string
// ) => {
//   if (username.length < 3) {
//     return { error: "Username must have 3 or more characters" };
//   }
//   if (!validateEmail(email)) {
//     return { error: "Email is invalid" };
//   }

//   await dbConnect();
//   const emailUser = await auths.findOne({ email: email });

//   if (emailUser) {
//     return { error: "Email already exists" };
//   }

//   if (password.length < 5) {
//     return { error: "Password must have 5 or more characters" };
//   }
//   return null;
// };

// export default async function handler(
//   req: NextApiRequest,
//   res: NextApiResponse<ResponseData>
// ) {
//   // validate if it is a POST
//   if (req.method !== "POST") {
//     return res
//       .status(200)
//       .json({ error: "This API call only accepts POST methods" });
//   }

//   // get and validate body variables
//   const { username, email, password } = req.body;

//   const errorMessage = await validateForm(username, email, password);
//   if (errorMessage) {
//     return res.status(400).json(errorMessage as ResponseData);
//   }

//   // hash password
// const hashedPassword = await bcrypt.hash(password, 12);
// if(hashedPassword){
//   console.log(hashedPassword);

//     // create new User on MongoDB
//   const newUser = new auths({
//       name: username,
//       email: email,
//       hashedPassword: hashedPassword,
//   });

//   newUser
//       .save()
//       .then(() =>
//       res.status(200).json({ msg: "Successfuly created new User: " + newUser })
//       )
//       .catch((err: string) =>
//       res.status(400).json({ error: "Error on '/api/register': " + err })
//       );
//     }
//   }

import {
  ApiExceptionHandler,
  BodyValidation,
} from '@/lib/middleware/zodApiValidator';
import {
  BadRequestException,
  Catch,
  createHandler,
  InternalServerErrorException,
  Post,
  UseMiddleware,
} from 'next-api-decorators';
import { z } from 'zod';
import bcrypt from 'bcrypt';
import UserModel from '@/models/user.model';
import { ConnectDB } from '@/lib/connectdb';

const credentialSchema = z.object({
  email: z.coerce.string().email(),
  name: z.string(),
  password: z.string(),
});

var Credentials = credentialSchema._type;

@Catch(ApiExceptionHandler)
@UseMiddleware(ConnectDB)
class AuthHandler {
  @Post()
  async register(
    @BodyValidation(credentialSchema) credentials: typeof Credentials
  ) {
    const emailUser = await UserModel.findOne({ email: credentials.email });

    if (emailUser) {
      throw new BadRequestException("Email is already registered");
    }

    const hashedPassword = await bcrypt.hash(credentials.password, 12);
    if (hashedPassword) {
      // create new User on MongoDB
      const newUser = new UserModel({
        name: credentials.name,
        email: credentials.email,
        password: hashedPassword,
      });
      return newUser
        .save()
        .then(() => {
          return { success: true, message: 'Successfuly created new User' };
        })
        .catch((err: string) => {
          console.log(err);

          throw new InternalServerErrorException('Something went wrong');
        });
    }
  }
}

export default createHandler(AuthHandler);
