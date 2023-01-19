// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import type { NextApiRequest, NextApiResponse } from "next";
import dbConnect from "./auth/lib/connectdb";
import invoice from "./auth/lib/model/invoice";
import bcrypt from "bcrypt";
import { ObjectId } from "mongoose";
const sgMail = require("@sendgrid/mail");
sgMail.setApiKey(process.env.EMAIL_SERVER_PASSWORD);

interface ResponseData {
  error?: string;
  msg?: string;
}

const validateEmail = (email: string): boolean => {
  const regEx = /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i;
  console.log(email);
  return regEx.test(email);
};

const validateForm = async (
  username: string,
  email: string,
  payerEmail: string
) => {
  if (username.length < 3) {
    return { error: "Username must have 3 or more characters" };
  }
  if (!validateEmail(email)) {
    return { error: "Email is invalid" };
  }

  if (!validateEmail(payerEmail)) {
    return { error: "Payer Email is invalid" };
  }

  await dbConnect();
  const emailUser = await invoice.findOne({ email: email });
  
  return null;
};

const sendEmail = async ( 
  username: string,
  email: string,
  payerEmail: string,
  category: string,
  currency: string,
  amount: string, 
  invoiceId: ObjectId) => {
   //sendgrid
   const data = {
     to: payerEmail,
     from: email,//todo: replace with coinfella email
     subject: `${username} sent you an invoice from CoinFella.`,
     //text: `Email => ${email}`,
     html: `Dear ${payerEmail}, ${username} would like to be paid through Coinfella.<br> Payment Request Details: <br> Invoice Id: ${invoiceId} <br> Category: ${category} <br> Currency: ${currency} <br> Amount: ${amount} <br> <a href='http://nxtpay.vercel.app/invoice/${invoiceId}'>Pay</a>`,
   };
   console.log(data);
    try{
    await sgMail.send(data);
    } catch(err){
      console.log(JSON.stringify(err));
      return { error: `There was an error sending your message. ${err}` };
    }
}



export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse<ResponseData>
) {
  // validate if it is a POST
  if (req.method !== "POST") {
    return res
      .status(200)
      .json({ error: "This API call only accepts POST methods" });
  }

  // get and validate body variables
  const { username, email, payerEmail, walletAddress, preferredCrypto, category, amount } = req.body;

  const errorMessage = await validateForm(username, email, payerEmail);
  if (errorMessage) {
    return res.status(400).json(errorMessage as ResponseData);
  }

// create new Invoice on MongoDB
const newInvoice = new invoice({
    name: username,
    email: email,
    payerEmail: payerEmail,
    amount: amount,
    category: category, 
    preferredCrypto: preferredCrypto,
    walletAddress: walletAddress
});


newInvoice
    .save()
    .then(() =>
      res.status(200).json({ msg: "Successfuly created new Invoice: " + newInvoice })
    )
    .then(async()=>{
      const emailres = await sendEmail(username, email, payerEmail, category, preferredCrypto, amount, newInvoice._id);
      if(emailres){
        console.log({ error: "Error on '/api/createInvoice send Email': " + emailres })
      }
      })
    .catch((err: string) =>
    res.status(400).json({ error: "Error on '/api/createInvoice': " + err })
    );
  }

