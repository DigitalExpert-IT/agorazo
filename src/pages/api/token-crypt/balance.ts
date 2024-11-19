import { NextApiRequest, NextApiResponse } from "next";
import { getSession } from "next-auth/react";
import { getUserBalance } from "utils/balance";

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  if (req.method === "GET") {
    try {
      const session = await getSession();
      if (!session?.user?.email) throw new Error("Missing required field: email");

      const balance = await getUserBalance(session?.user?.email);
      
      res.status(200).json({ balance, message: "success" });
    } catch (error) {
      res.status(500).json({ error });
    }
  } else {
    res.status(405).json({ error: "Method Not Allowed" });
  }
}
