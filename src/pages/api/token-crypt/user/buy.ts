import { NextApiRequest, NextApiResponse } from "next";
import { getUserBalance } from "utils/balance";
import { getSession } from "next-auth/react";
import { prisma } from "../../prisma";

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  if (req.method === "POST") {
    try {
      const { amount } = req.body;
      const session = await getSession();
      if (!session?.user?.email)
        throw new Error("Missing required field: email");

      // Check the balance user meet amount
      const balance = await getUserBalance(session?.user?.email);
      if (balance < amount) throw new Error("Not enough balance");

      await prisma.transaction.create({
        data: {
          // @ts-expect-error"Should check id user available"
          userId: session?.user?.id as string,
          value: amount,
          type: "deposit",
          status: "success"
        },
      });

      res.status(200).json({ message: `success deposit token for: ${amount}` });
    } catch (error) {
      res.status(500).json({ error });
    }
  } else {
    res.status(405).json({ error: "Method Not Allowed" });
  }
}
