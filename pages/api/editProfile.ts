// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import type { NextApiRequest, NextApiResponse } from "next";
import dbConnect from "@/lib/connectdb";
import auth from "./auth/lib/model/auths";
import bcrypt from "bcrypt";

interface ResponseData {
  error?: string;
  msg?: string;
}

const validateEmail = (email: string): boolean => {
  const regEx = /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i;
  return regEx.test(email);
};

const validateForm = async (
  username: string,
  email: string,
  walletAddress: string, 
  preferredCrypto: string, 
  category: string
) => {
  if (username.length < 3) {
    return { error: "Username must have 3 or more characters" };
  }
  if (!validateEmail(email)) {
    return { error: "Email is invalid" };
  }

  await dbConnect();
  const emailUser = await auth.findOne({ email: email });

  if (emailUser) {
    return { error: "Email already exists" };
  }

  return null;
};

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse<ResponseData>
) {
  console.log(req.body)
  // validate if it is a POST
  if (req.method !== "PUT") {
    return res
      .status(200)
      .json({ error: "This API call only accepts PUT methods" });
  }

  // get and validate body variables
  const { username, email, walletAddress, preferredCrypto, category } = req.body;

  const errorMessage = await validateForm(username, email, walletAddress, preferredCrypto, category);
  if (errorMessage) {
    return res.status(400).json(errorMessage as ResponseData);
  }

      // create new User on MongoDB
    const newUser = {
        name: username,
        email: email,
        walletAddress: walletAddress,
        preferredCrypto: preferredCrypto,
        category: category
      };

      await auth.findOneAndUpdate({ email: email }, {set: newUser})
      .then(() =>
        res.status(200).json({ msg: "Successfuly edited profile " + newUser })
        )
        .catch((err: string) =>
        res.status(400).json({ error: "Error on '/api/editProfile': " + err })
        );
    }
  

