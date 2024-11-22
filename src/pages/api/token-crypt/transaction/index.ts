// /pages/api/transaction/index.ts (or /pages/api/admin/transaction/index.ts for admin routes)

import { NextApiRequest, NextApiResponse } from "next";
import { getToken } from "next-auth/jwt";
import { prisma } from "pages/api/prisma";

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  if (req.method === "GET") {
    try {
        const session = await getToken({ req });

      if (!session) {
        return res.status(401).json({ message: "Unauthorized" });
      }

      const { userId, role } = session;

      const transactions = await prisma.transaction.findMany({
        where: role === "admin" ? {} : { userId },
      });

      return res.status(200).json(transactions);
    } catch (error) {
      console.error(error);
      return res.status(500).json({ message: "Internal Server Error" });
    }
  }

  res.setHeader("Allow", ["GET"]);
  return res.status(405).json({ message: `Method ${req.method} Not Allowed` });
}
