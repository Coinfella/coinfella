// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import type { NextApiRequest, NextApiResponse } from "next";
import dbConnect from "./auth/lib/connectdb";
import invoice from "./auth/lib/model/invoice";
import bcrypt from "bcrypt";

interface ResponseData {
  error?: string;
  success?: boolean;
  msg?: string;
  data?: any[];
}
const getInvoices = async (userEmail: string) =>{
    await dbConnect();
    const Invoices = await invoice.find({email: userEmail});
    return Invoices;
}


export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse<ResponseData>
) {

  const { userEmail } = req.query;

  // validate if it is a GET
  if (req.method !== "GET") {
    return res
      .status(200)
      .json({ error: "This API call only accepts GET methods" });
  }

    // get invoices
    try{
      if(userEmail){
        //console.log(userEmail);
        var Invoices = await getInvoices(userEmail.toString());
        return res.status(200).json({ success: true, data: Invoices });
      }
       
    }catch(err: any){
      return res.status(400).json({ error: "Error on '/api/getInvoices': " + err })
    }
}