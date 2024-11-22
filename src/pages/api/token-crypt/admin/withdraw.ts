import { NextApiRequest, NextApiResponse } from "next";
import { prisma } from "../../prisma";

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  if (req.method === "POST") {
    try {
      const { id } = req.body;

      // Check the balance user meet amount
      await prisma.transaction.update({
        where: {
          id
        },
        data: {
          status: "success"
        },
      });

      res.status(200).json({ message: `success process withdraw` });
    } catch (error) {
      res.status(500).json({ error });
    }
  } else {
    res.status(405).json({ error: "Method Not Allowed" });
  }
}
