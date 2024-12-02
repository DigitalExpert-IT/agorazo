import { NextApiRequest, NextApiResponse } from "next";
import { prisma } from "pages/api/prisma";
import { getToken } from "next-auth/jwt";

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  const { id } = req.query;

  if (req.method === "GET") {
    try {
      const session = await getToken({ req })

      if (!session) {
        return res.status(401).json({ message: "Unauthorized" });
      }

      const { role, userId } = session;

      const transaction = await prisma.transaction.findUnique({
        where: { id: id as string },
      });

      if (!transaction) {
        return res.status(404).json({ message: "Transaction not found" });
      }

      if (role !== "admin" && transaction.userId !== userId) {
        return res.status(403).json({ message: "Forbidden" });
      }

      return res.status(200).json(transaction);
    } catch (error) {
      console.error(error);
      return res.status(500).json({ message: "Internal Server Error" });
    }
  }

  res.setHeader("Allow", ["GET"]);
  return res.status(405).json({ message: `Method ${req.method} Not Allowed` });
}
