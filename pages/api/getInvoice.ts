// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import type { NextApiRequest, NextApiResponse } from "next";
import dbConnect from "@/lib/connectdb";
import invoice from "./auth/lib/model/invoice";
import bcrypt from "bcrypt";
import { ObjectId } from "mongodb";

interface ResponseData {
  error?: string;
  success?: boolean;
  msg?: string;
  data?: any[];
}
const getInvoice = async (Id: string) =>{
    await dbConnect();
    //console.log(Id);
    const myid = new ObjectId(Id);
    //console.log(myid);
    const Invoice = await invoice.findById({_id: myid});
    return Invoice;
}


export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse<ResponseData>
) {

  let id = "";
  if(req.query.invoiceId){
    id = req.query.invoiceId.toString();
  }

  // validate if it is a GET
  if (req.method !== "GET") {
    return res
      .status(200)
      .json({ error: "This API call only accepts GET methods" });
  }

    // get Invoice
    try{
      if(id){
        //console.log(id);
        var Invoice = await getInvoice(id.toString());
        //console.log('invoice');
        //console.log(Invoice);
        return res.status(200).json({ success: true, data: Invoice });
      }
       
    }catch(err: any){
      return res.status(400).json({ error: "Error on '/api/getInvoice': " + err })
    }
}