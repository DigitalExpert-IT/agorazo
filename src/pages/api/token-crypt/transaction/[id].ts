import { NextApiRequest, NextApiResponse } from "next";
import { prisma } from "pages/api/prisma";
import { getToken } from "next-auth/jwt";

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  const { id } = req.query;

  const session = await getToken({ req });

      if (!session) {
        return res.status(401).json({ message: "Unauthorized" });
      }
    
      const user = await prisma.user.findUnique({
        where: { email: session?.email || undefined }
      });

  if (req.method === "GET") {
    try {

      const { role, id: userId } = user as {role: string; id: string};

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

  if (req.method === 'PUT') {
    const { role } = user as {role: string};
    console.log("role", role);
    const { id, status } = req.body;

    if (!id || !status) {
      return res.status(400).json({ error: 'Invalid withdrawId or status' });
    }

    if (role !== 'admin') {
      return res.status(403).json({ error: 'Unauthorized. Only admins can update withdrawal status.' });
    }

    const updatedWithdraw = await prisma.transaction.update({
      where: { id: id },
      data: {
        status,
      },
    });

    return res.status(200).json(updatedWithdraw);
  }

  res.setHeader("Allow", ["GET, PUT"]);
  return res.status(405).json({ message: `Method ${req.method} Not Allowed` });
}
