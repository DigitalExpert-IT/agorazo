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
    
      const user = await prisma.user.findUnique({
        where: { email: session?.email || undefined }
      });

      if (!session) {
        return res.status(401).json({ message: "Unauthorized" });
      }

      const { id, role } = user as {id: string, role: string}

      const { page = 1, limit = 10, type = "DEPOSIT" } = req.query;
      const pageNumber = parseInt(page as string, 10);
      const pageLimit = parseInt(limit as string, 10);

      const whereClause = {
        ...(role === "admin" ? {} : { userId: id }),
        type: type as string,
      };

      const totalRecords = await prisma.transaction.count({ where: whereClause });
      const totalPages = Math.ceil(totalRecords / pageLimit);

      const transactions = await prisma.transaction.findMany({
        where: whereClause,
        include: {
          user: {
            select: {
              email: true,
            },
          },
        },
        skip: (pageNumber - 1) * pageLimit,
        take: pageLimit,
        orderBy: {
          createdAt: "desc",
        },
      });

      return res.status(200).json({
        transactions,
        totalPages,
        currentPage: pageNumber,
      });
    } catch (error) {
      console.error(error);
      return res.status(500).json({ message: "Internal Server Error" });
    }
  }

  res.setHeader("Allow", ["GET"]);
  return res.status(405).json({ message: `Method ${req.method} Not Allowed` });
}
