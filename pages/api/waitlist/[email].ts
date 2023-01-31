import { NextApiRequest, NextApiResponse } from "next";
import axios from "axios";

const API_KEY = process.env.WAITLIST_API;
export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  const { query, method } = req;
  const email = query.email;

  switch (method) {
    case "GET":
      try {
        const response = await axios.post(
          "https://api.getwaitlist.com/api/v1/waiter",
          {
            email: email,
            api_key: API_KEY,
          }
        );
        return res.status(200).json({ success: true });
      } catch (error) {
        console.log(error);
        return res.status(200).json({ success: false });
      }

    default:
      res.setHeader("Allow", ["GET"]);
      res.status(405).end(`Method ${method} Not Allowed`);
  }
}
